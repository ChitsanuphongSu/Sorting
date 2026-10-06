import { SortingStep } from '../types';

/**
 * 1. Selection Sort Engine (ตามสไลด์หน้า 4-12)
 * หาค่าน้อยที่สุดในส่วนที่ยังไม่เรียง แล้วสลับกับตัวแรกของส่วนนั้น
 * แสดง: Sorted Boundary, minCandidateIndex, currentScanIndex, Swap, Finalized
 */
export function generateSelectionSortSteps(initialArr: number[]): SortingStep[] {
  const arr = [...initialArr];
  const steps: SortingStep[] = [];
  let stepIndex = 0;
  const n = arr.length;
  const sorted: number[] = [];

  if (n === 0) {
    steps.push({
      stepIndex: 0,
      array: [],
      sortedIndices: [],
      sortedBoundary: 0,
      actionType: 'done',
      operationLabel: 'เสร็จสมบูรณ์ (Empty Array)',
      explanation: 'อาร์เรย์ว่าง ไม่มีข้อมูลที่ต้องจัดเรียง',
      sourceSlide: 5,
    });
    return steps;
  }

  steps.push({
    stepIndex: stepIndex++,
    round: 0,
    array: [...arr],
    sortedIndices: [],
    sortedBoundary: 0,
    actionType: 'compare',
    operationLabel: 'เริ่มต้น (Initial State)',
    explanation: `เริ่มต้น Selection Sort: ข้อมูลมี ${n} ตัว ส่วนที่เรียงแล้วมี 0 ตัว (Sorted Portion = 0)`,
    sourceSlide: 5,
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      stepIndex: stepIndex++,
      round: i + 1,
      array: [...arr],
      comparedIndices: [i],
      highlightIndices: [i],
      sortedIndices: [...sorted],
      sortedBoundary: i,
      minCandidateIndex: minIdx,
      currentScanIndex: i,
      actionType: 'compare',
      operationLabel: `รอบที่ ${i + 1}: ตั้งต้น min`,
      explanation: `รอบที่ ${i + 1}: เริ่มต้นค้นหาค่าน้อยที่สุดในส่วนที่ยังไม่เรียง (Index ${i}..${n - 1}) โดยสมมุติให้ Index ${i} (ค่า ${arr[i]}) เป็นค่าน้อยสุดชั่วคราว`,
      sourceSlide: 5,
    });

    for (let j = i + 1; j < n; j++) {
      const isNewMin = arr[j] < arr[minIdx];

      steps.push({
        stepIndex: stepIndex++,
        round: i + 1,
        array: [...arr],
        comparedIndices: [minIdx, j],
        highlightIndices: isNewMin ? [j] : [minIdx],
        sortedIndices: [...sorted],
        sortedBoundary: i,
        minCandidateIndex: minIdx,
        currentScanIndex: j,
        actionType: 'compare',
        operationLabel: `รอบที่ ${i + 1}: สแกน Index ${j}`,
        explanation: `เปรียบเทียบค่าที่สแกน Index ${j} (${arr[j]}) กับค่าน้อยสุดปัจจุบัน Index ${minIdx} (${arr[minIdx]})${isNewMin ? ` -> พบค่าน้อยกว่า! อัปเดต min candidate เป็น ${arr[j]} (Index ${j})` : ' -> ค่ามากกว่าเดิม ไม่เปลี่ยน min'}`,
        sourceSlide: 5,
      });

      if (isNewMin) {
        minIdx = j;
        steps.push({
          stepIndex: stepIndex++,
          round: i + 1,
          array: [...arr],
          comparedIndices: [minIdx],
          highlightIndices: [minIdx],
          sortedIndices: [...sorted],
          sortedBoundary: i,
          minCandidateIndex: minIdx,
          currentScanIndex: j,
          actionType: 'compare',
          operationLabel: `รอบที่ ${i + 1}: min ใหม่คือ ${arr[minIdx]}`,
          explanation: `อัปเดตตำแหน่งค่าน้อยสุดใหม่: min = ${arr[minIdx]} อยู่ที่ Index ${minIdx}`,
          sourceSlide: 5,
        });
      }
    }

    if (minIdx !== i) {
      const oldVal = arr[i];
      const minVal = arr[minIdx];
      const temp = arr[i];
      arr[i] = arr[minIdx];
      arr[minIdx] = temp;

      steps.push({
        stepIndex: stepIndex++,
        round: i + 1,
        array: [...arr],
        swappedIndices: [i, minIdx],
        sortedIndices: [...sorted, i],
        sortedBoundary: i + 1,
        minCandidateIndex: i,
        actionType: 'swap',
        operationLabel: `รอบที่ ${i + 1}: สลับ min กับตัวแรก`,
        explanation: `รอบที่ ${i + 1}: นำค่าน้อยที่สุดที่หาได้ (${minVal}) สลับตำแหน่งกับข้อมูลตัวแรกของส่วนที่ยังไม่เรียง (เดิมคือ ${oldVal} ที่ Index ${i})`,
        sourceSlide: 5,
      });
    } else {
      steps.push({
        stepIndex: stepIndex++,
        round: i + 1,
        array: [...arr],
        highlightIndices: [i],
        sortedIndices: [...sorted, i],
        sortedBoundary: i + 1,
        minCandidateIndex: i,
        actionType: 'insert',
        operationLabel: `รอบที่ ${i + 1}: อยู่ตำแหน่งเดิม`,
        explanation: `รอบที่ ${i + 1}: ค่าน้อยสุด (${arr[i]}) อยู่ที่ Index ${i} ถูกต้องแล้ว ไม่ต้องสลับ`,
        sourceSlide: 8,
      });
    }

    sorted.push(i);
  }

  sorted.push(n - 1);
  steps.push({
    stepIndex: stepIndex++,
    round: n - 1,
    array: [...arr],
    sortedIndices: Array.from({ length: n }, (_, k) => k),
    sortedBoundary: n,
    actionType: 'done',
    operationLabel: 'เสร็จสมบูรณ์ (Sorted)',
    explanation: 'จัดเรียงข้อมูลด้วย Selection Sort เสร็จสมบูรณ์แล้วทุกตำแหน่ง!',
    sourceSlide: 8,
  });

  return steps;
}

/**
 * 2. Bubble Sort Engine (ตามสไลด์หน้า 13-24)
 * เปรียบเทียบคู่ติดกัน สลับถ้าซ้ายมากกว่าขวา เมื่อจบ 1 รอบ ตัวมากสุดจะลอยไปท้ายสุด
 * แสดง: Pass, Adjacent Pair, Swaps Counter, Sorted Suffix, Early Exit
 */
export function generateBubbleSortSteps(initialArr: number[]): SortingStep[] {
  const arr = [...initialArr];
  const steps: SortingStep[] = [];
  let stepIndex = 0;
  const n = arr.length;
  const sorted: number[] = [];

  if (n === 0) {
    steps.push({
      stepIndex: 0,
      array: [],
      sortedIndices: [],
      actionType: 'done',
      operationLabel: 'เสร็จสมบูรณ์ (Empty Array)',
      explanation: 'อาร์เรย์ว่าง ไม่มีข้อมูลที่ต้องจัดเรียง',
      sourceSlide: 14,
    });
    return steps;
  }

  steps.push({
    stepIndex: stepIndex++,
    round: 0,
    pass: 0,
    array: [...arr],
    sortedIndices: [],
    actionType: 'compare',
    operationLabel: 'เริ่มต้น (Initial State)',
    explanation: `เริ่มต้น Bubble Sort: ข้อมูลมี ${n} ตัว เตรียมเปรียบเทียบข้อมูลคู่ที่อยู่ติดกันทีละคู่`,
    sourceSlide: 14,
  });

  for (let i = 0; i < n - 1; i++) {
    let swapsInPass = 0;

    steps.push({
      stepIndex: stepIndex++,
      round: i + 1,
      pass: i + 1,
      array: [...arr],
      sortedIndices: [...sorted],
      actionType: 'compare',
      operationLabel: `เริ่มต้น Pass ${i + 1}`,
      explanation: `--- เริ่มต้นรอบที่ ${i + 1} (Pass ${i + 1}/${n - 1}) ---`,
      sourceSlide: 15,
    });

    for (let j = 0; j < n - 1 - i; j++) {
      const needSwap = arr[j] > arr[j + 1];

      steps.push({
        stepIndex: stepIndex++,
        round: i + 1,
        pass: i + 1,
        array: [...arr],
        comparedIndices: [j, j + 1],
        sortedIndices: [...sorted],
        swapsInCurrentPass: swapsInPass,
        actionType: 'compare',
        operationLabel: `เปรียบเทียบ [${j}] & [${j + 1}]`,
        explanation: `เปรียบเทียบ Index ${j} (${arr[j]}) กับ Index ${j + 1} (${arr[j + 1]}): ${arr[j]} > ${arr[j + 1]} -> ${needSwap ? 'ค่าซ้ายมากกว่าขวา (ต้องสลับ)' : 'เรียงถูกต้องแล้ว (ไม่ต้องสลับ)'}`,
        sourceSlide: 16,
      });

      if (needSwap) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        swapsInPass++;

        steps.push({
          stepIndex: stepIndex++,
          round: i + 1,
          pass: i + 1,
          array: [...arr],
          swappedIndices: [j, j + 1],
          sortedIndices: [...sorted],
          swapsInCurrentPass: swapsInPass,
          actionType: 'swap',
          operationLabel: `สลับ [${j}] ↔ [${j + 1}]`,
          explanation: `สลับค่า: ${arr[j + 1]} ↔ ${arr[j]} -> ค่ามากจะค่อย ๆ ลอยไปทางขวา (Swaps ในรอบนี้: ${swapsInPass} ครั้ง)`,
          sourceSlide: 16,
        });
      }
    }

    const settledIndex = n - 1 - i;
    sorted.unshift(settledIndex);

    steps.push({
      stepIndex: stepIndex++,
      round: i + 1,
      pass: i + 1,
      array: [...arr],
      highlightIndices: [settledIndex],
      sortedIndices: [...sorted],
      swapsInCurrentPass: swapsInPass,
      actionType: 'compare',
      operationLabel: `จบ Pass ${i + 1}: ตัวมากสุดลอยถึงท้าย`,
      explanation: `จบรอบที่ ${i + 1}: ข้อมูลค่ามากที่สุดของรอบ (${arr[settledIndex]}) ถูกดันไปอยู่ที่ตำแหน่งท้ายสุด (Index ${settledIndex}) เรียบร้อย`,
      sourceSlide: 16,
    });

    if (swapsInPass === 0) {
      steps.push({
        stepIndex: stepIndex++,
        round: i + 1,
        pass: i + 1,
        array: [...arr],
        sortedIndices: Array.from({ length: n }, (_, k) => k),
        earlyExitTriggered: true,
        swapsInCurrentPass: 0,
        actionType: 'done',
        operationLabel: 'Early Exit Optimization',
        explanation: `ไม่มีการสลับตำแหน่งเกิดขึ้นเลยในรอบที่ ${i + 1} (Swaps = 0) -> หยุดการทำงานทันที (Early Exit ตามสไลด์หน้า 24)`,
        sourceSlide: 24,
      });
      return steps;
    }
  }

  steps.push({
    stepIndex: stepIndex++,
    round: n - 1,
    pass: n - 1,
    array: [...arr],
    sortedIndices: Array.from({ length: n }, (_, k) => k),
    actionType: 'done',
    operationLabel: 'เสร็จสมบูรณ์ (Sorted)',
    explanation: 'จัดเรียงข้อมูลด้วย Bubble Sort เสร็จสมบูรณ์แล้ว!',
    sourceSlide: 18,
  });

  return steps;
}

/**
 * 3. Insertion Sort Engine (ตามสไลด์หน้า 25-31)
 * เสมือนการจัดเรียงไพ่ในมือ
 * แสดง: Sorted vs Unsorted, KEY card, Right-to-Left scanning, Hole Slot, Insert
 */
export function generateInsertionSortSteps(initialArr: number[]): SortingStep[] {
  const arr = [...initialArr];
  const steps: SortingStep[] = [];
  let stepIndex = 0;
  const n = arr.length;

  if (n === 0) {
    steps.push({
      stepIndex: 0,
      array: [],
      sortedIndices: [],
      sortedBoundary: 0,
      actionType: 'done',
      operationLabel: 'เสร็จสมบูรณ์ (Empty Array)',
      explanation: 'อาร์เรย์ว่าง ไม่มีข้อมูลที่ต้องจัดเรียง',
      sourceSlide: 27,
    });
    return steps;
  }

  steps.push({
    stepIndex: stepIndex++,
    round: 0,
    array: [...arr],
    sortedIndices: [0],
    sortedBoundary: 1,
    actionType: 'compare',
    operationLabel: 'เริ่มต้น (ไพ่ใบแรกในมือ)',
    explanation: `เริ่มต้น Insertion Sort: ไพ่ใบแรกในมือคือ ${arr[0]} (Index 0) ถือเป็นส่วนที่เรียงแล้ว 1 ใบ`,
    sourceSlide: 27,
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let hole = i;

    steps.push({
      stepIndex: stepIndex++,
      round: i,
      array: [...arr],
      keyIndex: i,
      keyValue: key,
      holeIndex: hole,
      sortedIndices: Array.from({ length: i }, (_, k) => k),
      sortedBoundary: i,
      actionType: 'compare',
      operationLabel: `รอบที่ ${i}: หยิบ Key = ${key}`,
      explanation: `รอบที่ ${i}: หยิบไพ่ Key = ${key} (จาก Index ${i}) ออกมาถือไว้ เตรียมนำไปแทรกลงในส่วนที่เรียงแล้ว`,
      sourceSlide: 28,
    });

    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      steps.push({
        stepIndex: stepIndex++,
        round: i,
        array: [...arr],
        comparedIndices: [j],
        keyIndex: i,
        keyValue: key,
        holeIndex: hole,
        sortedIndices: Array.from({ length: i }, (_, k) => k),
        sortedBoundary: i,
        actionType: 'compare',
        operationLabel: `เปรียบเทียบ Key กับ [${j}]`,
        explanation: `เปรียบเทียบถอยหลังจากขวาไปซ้าย: Key (${key}) < ${arr[j]} (Index ${j}) -> ค่ามากกว่า Key ต้องขยับไปทางขวา 1 ช่อง`,
        sourceSlide: 28,
      });

      arr[j + 1] = arr[j];
      hole = j;

      steps.push({
        stepIndex: stepIndex++,
        round: i,
        array: [...arr],
        shiftIndices: [j, j + 1],
        keyIndex: i,
        keyValue: key,
        holeIndex: hole,
        sortedIndices: Array.from({ length: i }, (_, k) => k),
        sortedBoundary: i,
        actionType: 'shift',
        operationLabel: `ขยับ ${arr[j]} ไปทางขวา`,
        explanation: `ขยับ ${arr[j]} ไปขวา 1 ช่อง -> เกิดช่องว่าง (Hole) ที่ Index ${hole}`,
        sourceSlide: 28,
      });

      j--;
    }

    if (j >= 0) {
      steps.push({
        stepIndex: stepIndex++,
        round: i,
        array: [...arr],
        comparedIndices: [j],
        keyIndex: i,
        keyValue: key,
        holeIndex: hole,
        sortedBoundary: i,
        actionType: 'compare',
        operationLabel: `พบตำแหน่งแทรกที่ [${j + 1}]`,
        explanation: `เปรียบเทียบ Key (${key}) >= ${arr[j]} (Index ${j}) -> ไม่ต้องขยับแล้ว พบตำแหน่งที่เหมาะสมคือช่องว่าง Index ${j + 1}`,
        sourceSlide: 28,
      });
    }

    arr[j + 1] = key;

    steps.push({
      stepIndex: stepIndex++,
      round: i,
      array: [...arr],
      highlightIndices: [j + 1],
      keyIndex: j + 1,
      keyValue: key,
      holeIndex: null,
      sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
      sortedBoundary: i + 1,
      actionType: 'insert',
      operationLabel: `แทรก Key = ${key} ลงช่อง [${j + 1}]`,
      explanation: `แทรก Key = ${key} ลงในช่องว่าง Index ${j + 1} เรียบร้อย! ส่วนที่เรียงแล้วขยายเป็น: [${arr.slice(0, i + 1).join(', ')}]`,
      sourceSlide: 28,
    });
  }

  steps.push({
    stepIndex: stepIndex++,
    round: n - 1,
    array: [...arr],
    sortedIndices: Array.from({ length: n }, (_, k) => k),
    sortedBoundary: n,
    keyValue: null,
    holeIndex: null,
    actionType: 'done',
    operationLabel: 'เสร็จสมบูรณ์ (Sorted)',
    explanation: 'จัดเรียงข้อมูลด้วย Insertion Sort เสร็จสมบูรณ์แล้ว!',
    sourceSlide: 31,
  });

  return steps;
}

/**
 * 4. Shell Sort Engine (ตามสไลด์หน้า 32-40)
 * Gap = n/2, แล้ว Gap = Gap/2 จนถึง Gap = 1
 * แสดง: GAP ชัดเจน, Gap Group, Shift/Insert (ไม่เรียก shift ว่า swap)
 */
export function generateShellSortSteps(initialArr: number[]): SortingStep[] {
  const arr = [...initialArr];
  const steps: SortingStep[] = [];
  let stepIndex = 0;
  const n = arr.length;

  if (n === 0) {
    steps.push({
      stepIndex: 0,
      array: [],
      gap: 0,
      sortedIndices: [],
      actionType: 'done',
      operationLabel: 'เสร็จสมบูรณ์ (Empty Array)',
      explanation: 'อาร์เรย์ว่าง ไม่มีข้อมูลที่ต้องจัดเรียง',
      sourceSlide: 34,
    });
    return steps;
  }

  let gap = Math.floor(n / 2);
  let round = 1;

  steps.push({
    stepIndex: stepIndex++,
    round: 0,
    array: [...arr],
    gap,
    actionType: 'compare',
    operationLabel: `ตั้งค่าเริ่มต้น Gap = ${gap}`,
    explanation: `เริ่มต้น Shell Sort: กำหนดระยะห่างเริ่มต้น Gap = ⌊n/2⌋ = ⌊${n}/2⌋ = ${gap}`,
    sourceSlide: 34,
  });

  while (gap > 0) {
    steps.push({
      stepIndex: stepIndex++,
      round,
      array: [...arr],
      gap,
      actionType: 'compare',
      operationLabel: `รอบที่ ${round}: Gap = ${gap}`,
      explanation: `--- รอบที่ ${round}: กำหนด Gap = ${gap} ขยับและเรียงลำดับข้อมูลข้ามช่องตามระยะ Gap ---`,
      sourceSlide: 35,
    });

    for (let i = gap; i < n; i++) {
      const temp = arr[i];
      let j = i;

      // Identify the indices in this specific gap chain
      const gapGroup: number[] = [];
      for (let k = i % gap; k < n; k += gap) {
        gapGroup.push(k);
      }

      steps.push({
        stepIndex: stepIndex++,
        round,
        array: [...arr],
        comparedIndices: [j - gap, j],
        gapGroupIndices: gapGroup,
        gap,
        actionType: 'compare',
        operationLabel: `เทียบ [${j - gap}] กับ [${j}] (Gap=${gap})`,
        explanation: `เปรียบเทียบข้ามช่อง: Index ${j - gap} (${arr[j - gap]}) กับ Index ${j} (${arr[j]}) ด้วยระยะห่าง Gap = ${gap}`,
        sourceSlide: 35,
      });

      let didShift = false;
      while (j >= gap && arr[j - gap] > temp) {
        didShift = true;
        steps.push({
          stepIndex: stepIndex++,
          round,
          array: [...arr],
          comparedIndices: [j - gap, j],
          gapGroupIndices: gapGroup,
          gap,
          actionType: 'shift',
          operationLabel: `ขยับข้อมูลข้ามช่องด้วยระยะ Gap = ${gap}`,
          explanation: `${arr[j - gap]} > ${temp} -> ขยับข้อมูลข้ามช่องด้วยระยะ Gap = ${gap}: เลื่อน ${arr[j - gap]} ไปแทนที่ Index ${j}`,
          sourceSlide: 35,
        });

        arr[j] = arr[j - gap];
        j -= gap;
      }

      arr[j] = temp;

      if (didShift) {
        steps.push({
          stepIndex: stepIndex++,
          round,
          array: [...arr],
          highlightIndices: [j],
          gapGroupIndices: gapGroup,
          gap,
          actionType: 'insert',
          operationLabel: `Shift / Insert: วาง ${temp} ที่ [${j}]`,
          explanation: `Shift / Insert ตาม Gap: แทรกค่า ${temp} ลงในตำแหน่ง Index ${j} ผลลัพธ์กลุ่ม Gap=${gap}: [${arr.join(', ')}]`,
          sourceSlide: 35,
        });
      }
    }

    steps.push({
      stepIndex: stepIndex++,
      round,
      array: [...arr],
      gap,
      actionType: 'compare',
      operationLabel: `จบรอบที่ ${round} ที่ Gap = ${gap}`,
      explanation: `จบการทำงานรอบที่ ${round} ที่ Gap = ${gap} : อาร์เรย์ปัจจุบันคือ [${arr.join(', ')}]`,
      sourceSlide: 35,
    });

    gap = Math.floor(gap / 2);
    round++;
  }

  steps.push({
    stepIndex: stepIndex++,
    round,
    array: [...arr],
    gap: 0,
    sortedIndices: Array.from({ length: n }, (_, k) => k),
    actionType: 'done',
    operationLabel: 'เสร็จสมบูรณ์ (Sorted)',
    explanation: 'จัดเรียงข้อมูลด้วย Shell Sort เสร็จสมบูรณ์แล้ว!',
    sourceSlide: 39,
  });

  return steps;
}

/**
 * 5. Merge Sort Engine (ตามสไลด์หน้า 41-49)
 * Divide and Conquer: แบ่งครึ่งย่อยๆ จนเหลือ 1 แล้วผสานกลับ
 * แสดง: Subarrays, Left/Right Slices, Target Placement, Divide Tree
 */
export function generateMergeSortSteps(initialArr: number[]): SortingStep[] {
  const arr = [...initialArr];
  const steps: SortingStep[] = [];
  let stepIndex = 0;
  const n = arr.length;

  if (n === 0) {
    steps.push({
      stepIndex: 0,
      array: [],
      sortedIndices: [],
      mergeStage: 'done',
      actionType: 'done',
      operationLabel: 'เสร็จสมบูรณ์ (Empty Array)',
      explanation: 'อาร์เรย์ว่าง ไม่มีข้อมูลที่ต้องจัดเรียง',
      sourceSlide: 42,
    });
    return steps;
  }

  steps.push({
    stepIndex: stepIndex++,
    array: [...arr],
    mergeStage: 'initial',
    actionType: 'compare',
    operationLabel: 'เริ่มต้น Divide & Conquer',
    explanation: 'เริ่มต้น Merge Sort (Divide and Conquer): 1. Divide (แบ่งครึ่งย่อยๆ จนเหลือ 1 ตัว), 2. Conquer, 3. Combine/Merge',
    sourceSlide: 42,
  });

  function merge(mainArr: number[], start: number, mid: number, end: number) {
    const left = mainArr.slice(start, mid + 1);
    const right = mainArr.slice(mid + 1, end + 1);

    steps.push({
      stepIndex: stepIndex++,
      array: [...mainArr],
      subarrays: [
        { start, end: mid, color: 'blue', label: 'ฝั่งซ้าย (Left)' },
        { start: mid + 1, end, color: 'purple', label: 'ฝั่งขวา (Right)' },
      ],
      mergeStage: 'merge',
      mergeLeftSlice: { values: [...left] },
      mergeRightSlice: { values: [...right] },
      actionType: 'merge',
      operationLabel: `ผสานช่วง [${start}..${mid}] กับ [${mid + 1}..${end}]`,
      explanation: `Combine / Merge: เตรียมผสานกลุ่มย่อยฝั่งซ้าย [${left.join(', ')}] กับฝั่งขวา [${right.join(', ')}]`,
      sourceSlide: 45,
    });

    let i = 0;
    let j = 0;
    let k = start;

    while (i < left.length && j < right.length) {
      const pickLeft = left[i] <= right[j];
      const chosenVal = pickLeft ? left[i] : right[j];

      steps.push({
        stepIndex: stepIndex++,
        array: [...mainArr],
        comparedIndices: [start + i, mid + 1 + j],
        highlightIndices: [k],
        subarrays: [
          { start, end: mid, color: 'blue', label: 'Left' },
          { start: mid + 1, end, color: 'purple', label: 'Right' },
        ],
        mergeStage: 'merge',
        mergeLeftSlice: { values: [...left], activeIdx: i },
        mergeRightSlice: { values: [...right], activeIdx: j },
        mergeTargetIndex: k,
        actionType: 'compare',
        operationLabel: `เทียบซ้าย (${left[i]}) vs ขวา (${right[j]})`,
        explanation: `เปรียบเทียบตัวหน้าสุด: ฝั่งซ้าย [i=${i}] คือ ${left[i]} กับฝั่งขวา [j=${j}] คือ ${right[j]} -> เลือกค่าน้อยกว่าคือ ${chosenVal} วางลง Index ${k}`,
        sourceSlide: 46,
      });

      if (pickLeft) {
        mainArr[k] = left[i];
        i++;
      } else {
        mainArr[k] = right[j];
        j++;
      }
      k++;

      steps.push({
        stepIndex: stepIndex++,
        array: [...mainArr],
        highlightIndices: [k - 1],
        subarrays: [{ start, end: k - 1, color: 'emerald', label: 'กำลังสร้าง' }],
        mergeStage: 'merge',
        mergeLeftSlice: { values: [...left], activeIdx: i },
        mergeRightSlice: { values: [...right], activeIdx: j },
        mergeTargetIndex: k - 1,
        actionType: 'insert',
        operationLabel: `วาง ${chosenVal} ที่ Index ${k - 1}`,
        explanation: `วางค่า ${chosenVal} ลงตำแหน่ง Index ${k - 1} ในอาร์เรย์ผลลัพธ์`,
        sourceSlide: 46,
      });
    }

    while (i < left.length) {
      const val = left[i];
      mainArr[k] = val;
      steps.push({
        stepIndex: stepIndex++,
        array: [...mainArr],
        highlightIndices: [k],
        subarrays: [{ start, end: k, color: 'emerald' }],
        mergeStage: 'merge',
        mergeLeftSlice: { values: [...left], activeIdx: i },
        mergeRightSlice: { values: [...right] },
        mergeTargetIndex: k,
        actionType: 'insert',
        operationLabel: `ดึงฝั่งซ้ายที่เหลือ (${val})`,
        explanation: `นำข้อมูลฝั่งซ้ายที่เหลือ (${val}) ใส่ลงในอาร์เรย์ Index ${k}`,
        sourceSlide: 46,
      });
      i++;
      k++;
    }

    while (j < right.length) {
      const val = right[j];
      mainArr[k] = val;
      steps.push({
        stepIndex: stepIndex++,
        array: [...mainArr],
        highlightIndices: [k],
        subarrays: [{ start, end: k, color: 'emerald' }],
        mergeStage: 'merge',
        mergeLeftSlice: { values: [...left] },
        mergeRightSlice: { values: [...right], activeIdx: j },
        mergeTargetIndex: k,
        actionType: 'insert',
        operationLabel: `ดึงฝั่งขวาที่เหลือ (${val})`,
        explanation: `นำข้อมูลฝั่งขวาที่เหลือ (${val}) ใส่ลงในอาร์เรย์ Index ${k}`,
        sourceSlide: 46,
      });
      j++;
      k++;
    }

    steps.push({
      stepIndex: stepIndex++,
      array: [...mainArr],
      highlightIndices: Array.from({ length: end - start + 1 }, (_, idx) => start + idx),
      subarrays: [{ start, end: colorEnd(end), color: 'emerald', label: 'ผสานสำเร็จ' }],
      mergeStage: 'merge',
      actionType: 'merge',
      operationLabel: `ผสานช่วง [${start}..${end}] เรียบร้อย`,
      explanation: `ผลลัพธ์หลังผสานช่วง [${start}..${end}]: [${mainArr.slice(start, end + 1).join(', ')}]`,
      sourceSlide: 48,
    });
  }

  function colorEnd(end: number) {
    return end;
  }

  function mergeSortHelper(mainArr: number[], start: number, end: number) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);

    steps.push({
      stepIndex: stepIndex++,
      array: [...mainArr],
      subarrays: [
        { start, end: mid, color: 'blue', label: `ซ้าย [${start}..${mid}]` },
        { start: mid + 1, end, color: 'purple', label: `ขวา [${mid + 1}..${end}]` },
      ],
      mergeStage: 'split',
      actionType: 'split',
      operationLabel: `Divide แบ่งครึ่งช่วง [${start}..${end}]`,
      explanation: `Divide: แบ่งข้อมูลช่วง [${start}..${end}] ตรงกึ่งกลาง (${mid}) ออกเป็น 2 ฝั่งย่อย`,
      sourceSlide: 44,
    });

    mergeSortHelper(mainArr, start, mid);
    mergeSortHelper(mainArr, mid + 1, end);
    merge(mainArr, start, mid, end);
  }

  mergeSortHelper(arr, 0, arr.length - 1);

  steps.push({
    stepIndex: stepIndex++,
    array: [...arr],
    sortedIndices: Array.from({ length: arr.length }, (_, k) => k),
    mergeStage: 'done',
    actionType: 'done',
    operationLabel: 'เสร็จสมบูรณ์ (Sorted)',
    explanation: 'จัดเรียงข้อมูลด้วย Merge Sort เสร็จสมบูรณ์แล้ว!',
    sourceSlide: 49,
  });

  return steps;
}

/**
 * 6. Quick Sort Engine (ตามสไลด์หน้า 50-62)
 * Pivot ตัวสุดท้าย, i วิ่งซ้ายหาตัว > pivot, j วิ่งขวาหาตัว < pivot
 * ถ้า i < j สลับ i กับ j, ถ้า j <= i สลับ pivot กับ i
 * แสดง: Pivot ชัดเจน, i pointer, j pointer, Partition Range
 */
export function generateQuickSortSteps(initialArr: number[]): SortingStep[] {
  const arr = [...initialArr];
  const steps: SortingStep[] = [];
  let stepIndex = 0;
  let roundCount = 1;
  const n = arr.length;
  const sorted: number[] = [];

  if (n === 0) {
    steps.push({
      stepIndex: 0,
      array: [],
      sortedIndices: [],
      actionType: 'done',
      operationLabel: 'เสร็จสมบูรณ์ (Empty Array)',
      explanation: 'อาร์เรย์ว่าง ไม่มีข้อมูลที่ต้องจัดเรียง',
      sourceSlide: 51,
    });
    return steps;
  }

  steps.push({
    stepIndex: stepIndex++,
    round: 0,
    array: [...arr],
    actionType: 'compare',
    operationLabel: 'เริ่มต้น Quick Sort',
    explanation: 'เริ่มต้น Quick Sort (Divide and Conquer): 1. เลือก Pivot, 2. จัดกลุ่ม (Partitioning) ด้วยตัวชี้ i และ j, 3. Recursion',
    sourceSlide: 51,
  });

  function partition(low: number, high: number): number {
    const pivotVal = arr[high];
    const pivotIdx = high;
    const currentRound = roundCount++;

    steps.push({
      stepIndex: stepIndex++,
      round: currentRound,
      array: [...arr],
      pivotIndex: pivotIdx,
      pivotValue: pivotVal,
      partitionRange: { low, high },
      sortedIndices: [...sorted],
      actionType: 'partition',
      operationLabel: `รอบที่ ${currentRound}: เลือก Pivot = ${pivotVal}`,
      explanation: `รอบที่ ${currentRound}: เลือก Pivot = ${pivotVal} (ตำแหน่ง Index ${pivotIdx} ตัวสุดท้ายตามสไลด์หน้า 55)`,
      sourceSlide: 55,
    });

    let i = low;
    let j = high - 1;

    while (true) {
      // 2.2 Scan i to the right
      while (i <= high - 1 && arr[i] < pivotVal) {
        steps.push({
          stepIndex: stepIndex++,
          round: currentRound,
          array: [...arr],
          comparedIndices: [i, pivotIdx],
          pivotIndex: pivotIdx,
          pivotValue: pivotVal,
          iPointer: i,
          jPointer: j >= low ? j : undefined,
          partitionRange: { low, high },
          sortedIndices: [...sorted],
          actionType: 'compare',
          operationLabel: `i เลื่อนขวา: [${i}] < Pivot`,
          explanation: `ตำแหน่ง i (Index ${i} ค่า ${arr[i]}) < Pivot (${pivotVal}) -> เลื่อน i ไปข้างหน้า (+1)`,
          sourceSlide: 55,
        });
        i++;
      }

      if (i <= high - 1) {
        steps.push({
          stepIndex: stepIndex++,
          round: currentRound,
          array: [...arr],
          comparedIndices: [i, pivotIdx],
          pivotIndex: pivotIdx,
          pivotValue: pivotVal,
          iPointer: i,
          jPointer: j >= low ? j : undefined,
          partitionRange: { low, high },
          sortedIndices: [...sorted],
          actionType: 'compare',
          operationLabel: `i หยุดที่ [${i}] (ค่า >= Pivot)`,
          explanation: `ตำแหน่ง i (Index ${i} ค่า ${arr[i]}) >= Pivot (${pivotVal}) -> หยุด i แล้วไปพิจารณา j`,
          sourceSlide: 55,
        });
      }

      // 2.3 Scan j to the left
      while (j >= low && arr[j] >= pivotVal && j >= i) {
        steps.push({
          stepIndex: stepIndex++,
          round: currentRound,
          array: [...arr],
          comparedIndices: [j, pivotIdx],
          pivotIndex: pivotIdx,
          pivotValue: pivotVal,
          iPointer: i,
          jPointer: j,
          partitionRange: { low, high },
          sortedIndices: [...sorted],
          actionType: 'compare',
          operationLabel: `j เลื่อนซ้าย: [${j}] >= Pivot`,
          explanation: `ตำแหน่ง j (Index ${j} ค่า ${arr[j]}) >= Pivot (${pivotVal}) -> เลื่อน j ลดลง (-1)`,
          sourceSlide: 56,
        });
        j--;
      }

      if (j >= low && arr[j] < pivotVal && j >= i) {
        steps.push({
          stepIndex: stepIndex++,
          round: currentRound,
          array: [...arr],
          comparedIndices: [j, pivotIdx],
          pivotIndex: pivotIdx,
          pivotValue: pivotVal,
          iPointer: i,
          jPointer: j,
          partitionRange: { low, high },
          sortedIndices: [...sorted],
          actionType: 'compare',
          operationLabel: `j หยุดที่ [${j}] (ค่า < Pivot)`,
          explanation: `ตำแหน่ง j (Index ${j} ค่า ${arr[j]}) < Pivot (${pivotVal}) -> หยุด j`,
          sourceSlide: 56,
        });
      }

      // 2.4 If i < j swap them
      if (i < j) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        steps.push({
          stepIndex: stepIndex++,
          round: currentRound,
          array: [...arr],
          swappedIndices: [i, j],
          pivotIndex: pivotIdx,
          pivotValue: pivotVal,
          iPointer: i,
          jPointer: j,
          partitionRange: { low, high },
          sortedIndices: [...sorted],
          actionType: 'swap',
          operationLabel: `i < j -> สลับ [${i}] ↔ [${j}]`,
          explanation: `i < j -> สลับค่าตำแหน่ง i (${arr[j]}) และ j (${arr[i]}) แล้วเพิ่มค่า i ไป 1`,
          sourceSlide: 56,
        });
        i++;
        j--;
      } else {
        break;
      }
    }

    // สลับ pivot กับ i
    const tempP = arr[i];
    arr[i] = arr[high];
    arr[high] = tempP;
    sorted.push(i);

    steps.push({
      stepIndex: stepIndex++,
      round: currentRound,
      array: [...arr],
      swappedIndices: [i, high],
      pivotIndex: i,
      pivotValue: pivotVal,
      iPointer: i,
      jPointer: j >= low ? j : undefined,
      sortedIndices: [...sorted],
      partitionRange: { low, high },
      actionType: 'swap',
      operationLabel: `สลับ Pivot ไปวางที่ Index ${i}`,
      explanation: `ตอนนี้ j <= i -> สลับ Pivot (${pivotVal}) กับตำแหน่ง i (${tempP}) (จบรอบที่ ${currentRound}) Pivot อยู่ตำแหน่งถูกต้องสมบูรณ์แล้ว!`,
      sourceSlide: 56,
    });

    return i;
  }

  function quickSortHelper(low: number, high: number) {
    if (low < high) {
      const pi = partition(low, high);
      quickSortHelper(low, pi - 1);
      quickSortHelper(pi + 1, high);
    } else if (low === high) {
      sorted.push(low);
    }
  }

  quickSortHelper(0, arr.length - 1);

  steps.push({
    stepIndex: stepIndex++,
    array: [...arr],
    sortedIndices: Array.from({ length: arr.length }, (_, k) => k),
    actionType: 'done',
    operationLabel: 'เสร็จสมบูรณ์ (Sorted)',
    explanation: 'จัดเรียงข้อมูลด้วย Quick Sort เสร็จสมบูรณ์แล้ว!',
    sourceSlide: 62,
  });

  return steps;
}

/**
 * 7. Heap Sort Engine (ตามสไลด์หน้า 63-88)
 * Binary Max-Heap:
 * 1. Build Max-Heap
 * 2. Swap Root (Max) ไปไว้ท้ายสุด
 * 3. Heapify ปรับสมดุล Heap ใหม่
 * 4. ทำซ้ำจนเหลือสมาชิก 1 ตัว
 */
export function generateHeapSortSteps(initialArr: number[]): SortingStep[] {
  const arr = [...initialArr];
  const steps: SortingStep[] = [];
  let stepIndex = 0;
  const n = arr.length;
  const sorted: number[] = [];

  function getHeapTree(currentArr: number[], heapSize: number, compIdxs?: number[], swapIdxs?: number[]) {
    return {
      heapSize,
      nodes: currentArr.map((val, idx) => ({
        value: val,
        index: idx,
        isRoot: idx === 0 && heapSize > 0,
        isMax: idx === 0 && heapSize > 0,
        isComparing: compIdxs?.includes(idx),
        isSwapped: swapIdxs?.includes(idx),
        isSorted: idx >= heapSize,
        isInHeap: idx < heapSize,
      })),
    };
  }

  if (n === 0) {
    steps.push({
      stepIndex: 0,
      array: [],
      heapTree: { nodes: [], heapSize: 0 },
      heapSize: 0,
      sortedIndices: [],
      actionType: 'done',
      operationLabel: 'เสร็จสมบูรณ์ (Empty Array)',
      explanation: 'อาร์เรย์ว่าง ไม่มีข้อมูลที่ต้องจัดเรียง',
      sourceSlide: 66,
    });
    return steps;
  }

  steps.push({
    stepIndex: stepIndex++,
    round: 0,
    array: [...arr],
    heapTree: getHeapTree(arr, n),
    heapSize: n,
    actionType: 'heapify',
    operationLabel: 'ขั้นตอนที่ 1: Build Max-Heap',
    explanation: 'เริ่มต้น Heap Sort: ขั้นตอนที่ 1 สร้าง Max-Heap (Build Max-Heap) จากอาร์เรย์เดิม',
    sourceSlide: 66,
  });

  function heapify(size: number, i: number, roundNum: number) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < size && arr[left] > arr[largest]) {
      largest = left;
    }

    if (right < size && arr[right] > arr[largest]) {
      largest = right;
    }

    if (largest !== i) {
      steps.push({
        stepIndex: stepIndex++,
        round: roundNum,
        array: [...arr],
        comparedIndices: [i, largest],
        heapTree: getHeapTree(arr, size, [i, largest]),
        heapSize: size,
        actionType: 'compare',
        operationLabel: `Heapify: เทียบพ่อ [${i}] กับลูก [${largest}]`,
        explanation: `เปรียบเทียบโหนดพ่อ Index ${i} (${arr[i]}) กับโหนดลูก Index ${largest} (${arr[largest]}) -> โหนดลูกมีค่ามากกว่า ต้อง Heapify สลับค่า`,
        sourceSlide: 67,
      });

      const temp = arr[i];
      arr[i] = arr[largest];
      arr[largest] = temp;

      steps.push({
        stepIndex: stepIndex++,
        round: roundNum,
        array: [...arr],
        swappedIndices: [i, largest],
        heapTree: getHeapTree(arr, size, undefined, [i, largest]),
        heapSize: size,
        actionType: 'swap',
        operationLabel: `Heapify: สลับค่าให้พ่อ [${i}] มากกว่าลูก`,
        explanation: `สลับค่าให้พ่อมากกว่าลูก: ตอนนี้ Index ${i} = ${arr[i]}, Index ${largest} = ${arr[largest]}`,
        sourceSlide: 67,
      });

      heapify(size, largest, roundNum);
    }
  }

  // 1. Build Max-Heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i, 0);
  }

  steps.push({
    stepIndex: stepIndex++,
    round: 1,
    array: [...arr],
    heapTree: getHeapTree(arr, n),
    heapSize: n,
    actionType: 'heapify',
    operationLabel: 'Build Max-Heap สำเร็จ',
    explanation: `สร้าง Max-Heap เสร็จสิ้น! ค่าที่มากที่สุดในอาร์เรย์ (${arr[0]}) อยู่ที่ Root (Index 0) ทันที`,
    sourceSlide: 66,
  });

  // 2. Extract elements from heap
  let round = 1;
  for (let i = n - 1; i > 0; i--) {
    steps.push({
      stepIndex: stepIndex++,
      round,
      array: [...arr],
      comparedIndices: [0, i],
      heapTree: getHeapTree(arr, i + 1, [0, i]),
      heapSize: i + 1,
      actionType: 'compare',
      operationLabel: `รอบที่ ${round}: สลับ Root กับท้าย Heap`,
      explanation: `รอบที่ ${round}: สลับค่า Root (ค่ามากที่สุดคือ ${arr[0]}) กับตำแหน่งท้ายสุดของ Heap (Index ${i} คือ ${arr[i]})`,
      sourceSlide: 66,
    });

    const temp = arr[0];
    arr[0] = arr[i];
    arr[i] = temp;
    sorted.unshift(i);

    steps.push({
      stepIndex: stepIndex++,
      round,
      array: [...arr],
      swappedIndices: [0, i],
      sortedIndices: [...sorted],
      heapTree: getHeapTree(arr, i, undefined, [0, i]),
      heapSize: i,
      actionType: 'swap',
      operationLabel: `ตัด Index ${i} (${arr[i]}) ออกจาก Heap`,
      explanation: `สลับค่าแล้ว! ตัดตำแหน่ง ${i} (${arr[i]}) ออกจาก Heap (ถือว่าเรียงสมบูรณ์แล้ว)`,
      sourceSlide: 66,
    });

    steps.push({
      stepIndex: stepIndex++,
      round,
      array: [...arr],
      heapTree: getHeapTree(arr, i),
      heapSize: i,
      actionType: 'heapify',
      operationLabel: `รอบที่ ${round}: Heapify ปรับสมดุลใหม่`,
      explanation: `ขั้นตอนที่ 3: ปรับสมดุล Heap ใหม่ (Heapify) เพื่อให้ตัวมากที่สุดในส่วนที่เหลือกลับมาอยู่ที่ Root (Index 0)`,
      sourceSlide: 67,
    });

    heapify(i, 0, round);
    round++;
  }

  sorted.unshift(0);

  steps.push({
    stepIndex: stepIndex++,
    round,
    array: [...arr],
    sortedIndices: Array.from({ length: n }, (_, k) => k),
    heapTree: getHeapTree(arr, 0),
    heapSize: 0,
    actionType: 'done',
    operationLabel: 'เสร็จสมบูรณ์ (Sorted)',
    explanation: `เหลือสมาชิก 1 ตัว จบการทำงาน! ข้อมูลจัดเรียงเรียบร้อย: [${arr.join(', ')}] (อ่านจาก Root ไล่ระดับตาม Complete Binary Tree)`,
    sourceSlide: 88,
  });

  return steps;
}
