export type StudySection =
  | 'dashboard'
  | 'quick-review'
  | 'fundamentals'
  | 'selection-sort'
  | 'bubble-sort'
  | 'insertion-sort'
  | 'shell-sort'
  | 'merge-sort'
  | 'quick-sort'
  | 'heap-sort'
  | 'comparison'
  | 'interactive-labs'
  | 'quiz'
  | 'mock-exam'
  | 'weakness'
  | 'common-mistakes'
  | 'reference';

export interface UserStats {
  completedLessons: string[];
  practiceAttempts: Record<string, {
    answered: any;
    isCorrect: boolean;
    timestamp: number;
  }>;
  quizHistory: Array<{
    quizId: string;
    score: number;
    total: number;
    percentage: number;
    timestamp: number;
    categoryBreakdown: Record<string, { correct: number; total: number }>;
  }>;
  mockExamHistory: Array<{
    score: number;
    total: number;
    percentage: number;
    timestamp: number;
    answers: Record<number, number>;
  }>;
  labCompleted: Record<string, boolean>;
  theme: 'light' | 'dark' | 'system';
}

export type SortingAlgorithmType =
  | 'selection'
  | 'bubble'
  | 'insertion'
  | 'shell'
  | 'merge'
  | 'quick'
  | 'heap';

export interface MergeTreeLevel {
  level: number;
  groups: {
    id: string;
    array: number[];
    start: number;
    end: number;
    status: 'idle' | 'splitting' | 'split_done' | 'merging' | 'merged';
    isLeft?: boolean;
  }[];
}

export interface SortingStep {
  stepIndex: number;
  round?: number;
  pass?: number;
  array: number[];
  comparedIndices?: number[];
  swappedIndices?: number[];
  sortedIndices?: number[];
  highlightIndices?: number[];
  
  // Selection Sort specific
  currentScanIndex?: number;
  minCandidateIndex?: number;
  sortedBoundary?: number; // index up to which elements are fully sorted

  // Bubble Sort specific
  earlyExitTriggered?: boolean;
  swapsInCurrentPass?: number;
  
  // Insertion Sort specific
  keyIndex?: number;
  keyValue?: number | null;
  holeIndex?: number | null; // index representing the empty slot/hole during right shifts
  shiftIndices?: number[];

  // Shell Sort specific
  gap?: number;
  gapGroupIndices?: number[]; // all indices in the active gap chain (e.g. 0, 4 or 1, 3, 5, 7)

  // Merge Sort specific
  subarrays?: { start: number; end: number; color?: string; label?: string }[];
  mergeStage?: 'split' | 'merge' | 'initial' | 'done';
  mergeLeftSlice?: { values: number[]; activeIdx?: number };
  mergeRightSlice?: { values: number[]; activeIdx?: number };
  mergeTargetIndex?: number;

  // Quick Sort specific
  pivotIndex?: number;
  pivotValue?: number;
  iPointer?: number;
  jPointer?: number;
  partitionRange?: { low: number; high: number };

  // Heap Sort specific
  heapTree?: {
    nodes: {
      value: number;
      index: number;
      isRoot?: boolean;
      isMax?: boolean;
      isComparing?: boolean;
      isSwapped?: boolean;
      isSorted?: boolean;
      isInHeap?: boolean;
    }[];
    heapSize: number;
  };
  heapSize?: number;

  actionType: 'compare' | 'swap' | 'shift' | 'insert' | 'partition' | 'split' | 'merge' | 'heapify' | 'done';
  operationLabel?: string;
  explanation: string;
  ruleOrCodeSnippet?: string;
  sourceSlide?: number;
}

export interface QuizQuestion {
  id: string;
  category: string;
  algorithm: SortingAlgorithmType | 'general';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  codeSnippet?: string;
  arrayVisual?: number[];
  options: string[];
  correctAnswer: number;
  explanation: string;
  sourceSlide: string;
}

export interface LabChallenge {
  id: string;
  title: string;
  algorithm: SortingAlgorithmType | 'comparison';
  description: string;
  initialArray: number[];
  taskPrompt: string;
  options?: string[];
  correctOptionIndex?: number;
  expectedArray?: number[];
  expectedValue?: any;
  validationType: 'array-state' | 'mcq' | 'pointer-select' | 'gap-sequence';
  hint: string;
  sourceSlide: number;
  explanation: string;
}
