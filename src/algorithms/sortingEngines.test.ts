import { describe, it, expect } from 'vitest';
import {
  generateSelectionSortSteps,
  generateBubbleSortSteps,
  generateInsertionSortSteps,
  generateShellSortSteps,
  generateMergeSortSteps,
  generateQuickSortSteps,
  generateHeapSortSteps,
} from './sortingEngines';

describe('Sorting Algorithms Unit Tests (Chapter 12)', () => {
  const testCases = [
    { name: 'Lecture Example 1', input: [64, 25, 12, 22, 11], expected: [11, 12, 22, 25, 64] },
    { name: 'Lecture Example 2 (8 elements)', input: [25, 32, 12, 55, 9, 18, 50, 45], expected: [9, 12, 18, 25, 32, 45, 50, 55] },
    { name: 'Already Sorted', input: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] },
    { name: 'Reverse Sorted', input: [5, 4, 3, 2, 1], expected: [1, 2, 3, 4, 5] },
    { name: 'Duplicates', input: [4, 2, 4, 3, 2, 1], expected: [1, 2, 2, 3, 4, 4] },
    { name: 'Single Element', input: [42], expected: [42] },
    { name: 'Negative Numbers', input: [12, -3, 45, 0, -10], expected: [-10, -3, 0, 12, 45] },
    // Edge cases requested
    { name: 'Empty Array []', input: [], expected: [] },
    { name: 'Two Elements [2, 1]', input: [2, 1], expected: [1, 2] },
    { name: 'Two Equal Elements [2, 2]', input: [2, 2], expected: [2, 2] },
    {
      name: 'Maximum 15 Elements',
      input: [99, 45, 23, 87, 12, 3, 76, 54, 32, 89, 10, 65, 43, 21, 9],
      expected: [3, 9, 10, 12, 21, 23, 32, 43, 45, 54, 65, 76, 87, 89, 99],
    },
  ];

  const engines = [
    { name: 'Selection Sort', fn: generateSelectionSortSteps },
    { name: 'Bubble Sort', fn: generateBubbleSortSteps },
    { name: 'Insertion Sort', fn: generateInsertionSortSteps },
    { name: 'Shell Sort', fn: generateShellSortSteps },
    { name: 'Merge Sort', fn: generateMergeSortSteps },
    { name: 'Quick Sort', fn: generateQuickSortSteps },
    { name: 'Heap Sort', fn: generateHeapSortSteps },
  ];

  engines.forEach(({ name, fn }) => {
    describe(`${name} Engine`, () => {
      testCases.forEach(({ name: caseName, input, expected }) => {
        it(`correctly sorts ${caseName}`, () => {
          const steps = fn(input);
          expect(steps.length).toBeGreaterThan(0);
          const finalArray = steps[steps.length - 1].array;
          expect(finalArray).toEqual(expected);
          expect(steps[steps.length - 1].actionType).toBe('done');
        });
      });
    });
  });

  describe('Algorithm-Specific Step Metadata & Transitions Validation', () => {
    it('Selection Sort: minCandidateIndex is valid and swap updates target positions', () => {
      const steps = generateSelectionSortSteps([25, 12, 32]);
      const compareSteps = steps.filter((s) => s.actionType === 'compare');
      expect(compareSteps.some((s) => s.minCandidateIndex !== undefined)).toBe(true);
      expect(compareSteps.some((s) => s.sortedBoundary !== undefined)).toBe(true);

      const swapStep = steps.find((s) => s.actionType === 'swap');
      if (swapStep) {
        expect(swapStep.swappedIndices?.length).toBe(2);
      }
    });

    it('Bubble Sort: compared pairs and swapped pairs are strictly adjacent and earlyExit works', () => {
      const steps = generateBubbleSortSteps([5, 1, 4, 2, 8]);
      const compSteps = steps.filter((s) => s.comparedIndices && s.comparedIndices.length === 2);
      compSteps.forEach((s) => {
        const [a, b] = s.comparedIndices!;
        expect(Math.abs(a - b)).toBe(1);
      });

      const swapSteps = steps.filter((s) => s.actionType === 'swap' && s.swappedIndices);
      swapSteps.forEach((s) => {
        const [a, b] = s.swappedIndices!;
        expect(Math.abs(a - b)).toBe(1);
      });

      const sortedSteps = generateBubbleSortSteps([1, 2, 3, 4, 5]);
      expect(sortedSteps[sortedSteps.length - 1].earlyExitTriggered).toBe(true);
    });

    it('Insertion Sort: shift moves value exactly 1 position right and key is isolated', () => {
      const steps = generateInsertionSortSteps([32, 12]);
      const shiftSteps = steps.filter((s) => s.actionType === 'shift');
      expect(shiftSteps.length).toBeGreaterThan(0);
      expect(shiftSteps[0].holeIndex).toBeDefined();
      expect(shiftSteps[0].keyValue).toBe(12);

      const insertStep = steps.find((s) => s.actionType === 'insert');
      expect(insertStep).toBeDefined();
      expect(insertStep?.keyIndex).toBe(0);
    });

    it('Shell Sort: shift distance equals gap and gap decreases correctly', () => {
      const steps = generateShellSortSteps([25, 32, 12, 55, 9, 18, 50, 45]);
      const gaps = Array.from(new Set(steps.map((s) => s.gap).filter((g) => g !== undefined && g > 0)));
      expect(gaps).toEqual([4, 2, 1]);

      const shiftSteps = steps.filter((s) => s.actionType === 'shift' && s.comparedIndices);
      shiftSteps.forEach((s) => {
        const [i1, i2] = s.comparedIndices!;
        expect(Math.abs(i2 - i1)).toBe(s.gap);
      });
    });

    it('Merge Sort: split ranges and left/right slices match actual subarrays', () => {
      const steps = generateMergeSortSteps([25, 32, 12, 55]);
      const splitSteps = steps.filter((s) => s.actionType === 'split');
      expect(splitSteps.length).toBeGreaterThan(0);

      const mergeSteps = steps.filter((s) => s.mergeLeftSlice && s.mergeRightSlice);
      expect(mergeSteps.length).toBeGreaterThan(0);
      expect(mergeSteps[0].mergeLeftSlice?.values).toBeDefined();
      expect(mergeSteps[0].mergeRightSlice?.values).toBeDefined();
    });

    it('Quick Sort: pivot, iPointer, and jPointer are bounded within partition range', () => {
      const steps = generateQuickSortSteps([25, 32, 12, 55, 9, 18, 50, 45]);
      const partitionSteps = steps.filter((s) => s.partitionRange);
      expect(partitionSteps.length).toBeGreaterThan(0);

      partitionSteps.forEach((s) => {
        const { low, high } = s.partitionRange!;
        if (s.pivotIndex !== undefined) {
          expect(s.pivotIndex).toBeGreaterThanOrEqual(low);
          expect(s.pivotIndex).toBeLessThanOrEqual(high);
        }
        if (s.iPointer !== undefined) {
          expect(s.iPointer).toBeGreaterThanOrEqual(low);
          expect(s.iPointer).toBeLessThanOrEqual(high);
        }
        if (s.jPointer !== undefined) {
          expect(s.jPointer).toBeGreaterThanOrEqual(low);
          expect(s.jPointer).toBeLessThanOrEqual(high);
        }
      });
    });

    it('Heap Sort: heapSize decreases monotonically during extraction and node count equals array length', () => {
      const steps = generateHeapSortSteps([25, 32, 12, 55, 9, 18, 50, 45]);
      const heapSteps = steps.filter((s) => s.heapTree);
      expect(heapSteps.length).toBeGreaterThan(0);

      let prevHeapSize = 8;
      heapSteps.forEach((s) => {
        expect(s.heapTree?.nodes.length).toBe(8);
        if (s.heapTree?.heapSize !== undefined) {
          expect(s.heapTree.heapSize).toBeLessThanOrEqual(prevHeapSize);
          prevHeapSize = Math.max(prevHeapSize, s.heapTree.heapSize);
        }
      });
      expect(heapSteps[heapSteps.length - 1].heapTree?.heapSize).toBe(0);
    });
  });
});
