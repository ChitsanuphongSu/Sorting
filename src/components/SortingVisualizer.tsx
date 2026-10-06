import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  SkipForward,
  SkipBack,
  Shuffle,
  Info,
  GitMerge,
  Network,
  Tag,
  Split,
  Layers,
} from 'lucide-react';
import { SortingStep, SortingAlgorithmType } from '../types';
import {
  generateSelectionSortSteps,
  generateBubbleSortSteps,
  generateInsertionSortSteps,
  generateShellSortSteps,
  generateMergeSortSteps,
  generateQuickSortSteps,
  generateHeapSortSteps,
} from '../algorithms/sortingEngines';

interface SortingVisualizerProps {
  algorithm: SortingAlgorithmType;
  defaultArray?: number[];
  title?: string;
}

const DEFAULT_LECTURE_ARRAY = [25, 32, 12, 55, 9, 18, 50, 45]; // ตัวอย่างสไลด์หน้า 9, 19, 28, 35, 44, 55, 68

export const SortingVisualizer: React.FC<SortingVisualizerProps> = ({
  algorithm,
  defaultArray = DEFAULT_LECTURE_ARRAY,
  title,
}) => {
  const [arrayInput, setArrayInput] = useState<string>(defaultArray.join(', '));
  const [currentArray, setCurrentArray] = useState<number[]>(defaultArray);
  const [steps, setSteps] = useState<SortingStep[]>([]);
  const [currentStepIdx, setCurrentStepIdx] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(800);
  const timerRef = useRef<number | null>(null);

  const generateStepsForAlgorithm = (type: SortingAlgorithmType, arr: number[]) => {
    switch (type) {
      case 'selection':
        return generateSelectionSortSteps(arr);
      case 'bubble':
        return generateBubbleSortSteps(arr);
      case 'insertion':
        return generateInsertionSortSteps(arr);
      case 'shell':
        return generateShellSortSteps(arr);
      case 'merge':
        return generateMergeSortSteps(arr);
      case 'quick':
        return generateQuickSortSteps(arr);
      case 'heap':
        return generateHeapSortSteps(arr);
      default:
        return generateSelectionSortSteps(arr);
    }
  };

  const initAlgorithm = (arr: number[]) => {
    const generated = generateStepsForAlgorithm(algorithm, arr);
    setSteps(generated);
    setCurrentStepIdx(0);
    setIsPlaying(false);
  };

  useEffect(() => {
    initAlgorithm(currentArray);
  }, [algorithm]);

  // Play / Pause loop
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        setCurrentStepIdx((prev) => {
          if (prev >= steps.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, steps.length, playbackSpeed]);

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  const handleRandomize = () => {
    setIsPlaying(false);
    const randomArr = Array.from({ length: 8 }, () => Math.floor(Math.random() * 80) + 10);
    setCurrentArray(randomArr);
    setArrayInput(randomArr.join(', '));
    initAlgorithm(randomArr);
  };

  const handleResetToSlideExample = () => {
    setIsPlaying(false);
    setCurrentArray(defaultArray);
    setArrayInput(defaultArray.join(', '));
    initAlgorithm(defaultArray);
  };

  const handleApplyCustomArray = () => {
    try {
      const parsed = arrayInput
        .split(/[, ]+/)
        .map((n) => parseInt(n.trim(), 10))
        .filter((n) => !isNaN(n));
      if (parsed.length >= 2 && parsed.length <= 15) {
        setIsPlaying(false);
        setCurrentArray(parsed);
        initAlgorithm(parsed);
      } else {
        alert('กรุณากรอกตัวเลข 2 ถึง 15 ตัว โดยคั่นด้วยเครื่องหมายจุลภาค');
      }
    } catch {
      alert('ข้อมูลตัวเลขไม่ถูกต้อง');
    }
  };

  const currentStep = steps[currentStepIdx] || steps[0] || {
    array: currentArray,
    explanation: 'พร้อมเริ่มการทำงาน',
    actionType: 'compare',
    stepIndex: 0,
  };

  // Safe normalized min/max calculation supporting negative numbers
  const arrValues = currentStep.array && currentStep.array.length > 0 ? currentStep.array : [0];
  const minVal = Math.min(...arrValues, 0);
  const maxVal = Math.max(...arrValues, 10);
  const valRange = Math.max(maxVal - minVal, 1);

  const calculateBarHeight = (val: number, isHole: boolean) => {
    if (isHole) return 15;
    const normalized = (val - minVal) / valRange;
    return Math.max(20, Math.round(normalized * 80) + 15);
  };

  // Render Dynamic Heap Binary Tree supporting up to 15 nodes
  const renderDynamicHeapTree = () => {
    if (!currentStep.heapTree || !currentStep.heapTree.nodes || currentStep.heapTree.nodes.length === 0) {
      return null;
    }

    const nodes = currentStep.heapTree.nodes;
    const totalNodes = nodes.length;
    const numLevels = Math.ceil(Math.log2(totalNodes + 1));

    // Group nodes by levels
    const levels: typeof nodes[] = [];
    for (let l = 0; l < numLevels; l++) {
      const startIdx = Math.pow(2, l) - 1;
      const endIdx = Math.min(Math.pow(2, l + 1) - 1, totalNodes);
      if (startIdx < totalNodes) {
        levels.push(nodes.slice(startIdx, endIdx));
      }
    }

    return (
      <div className="border-t border-border pt-4 mt-2">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-bold text-text-main flex items-center gap-1.5">
            <Network className="w-4 h-4 text-primary" /> โครงสร้าง Binary Max-Heap Tree (ไดนามิก {totalNodes} โหนด):
          </span>
          <span className="text-[11px] text-muted">
            แม่: ⌊(i-1)/2⌋ | ลูกซ้าย: 2i+1 | ลูกขวา: 2i+2
          </span>
        </div>

        <div className="flex flex-col items-center gap-4 py-2 overflow-x-auto custom-scrollbar">
          {levels.map((levelNodes, levelIdx) => (
            <div key={levelIdx} className="flex justify-around w-full max-w-2xl px-2 gap-2">
              {levelNodes.map((node) => {
                const isRoot = node.index === 0 && (currentStep.heapSize || 0) > 0;
                let nodeStyle = 'bg-surface border-border text-text-main';

                if (node.isSorted) {
                  nodeStyle = 'bg-emerald-500 text-white border-emerald-600 opacity-60';
                } else if (node.isSwapped) {
                  nodeStyle = 'bg-rose-500 text-white border-rose-600 ring-2 ring-rose-300';
                } else if (node.isComparing) {
                  nodeStyle = 'bg-blue-500 text-white border-blue-600 ring-2 ring-blue-300';
                } else if (isRoot) {
                  nodeStyle = 'bg-primary text-white border-primary-dark ring-2 ring-primary/30';
                } else if (node.isInHeap) {
                  nodeStyle = 'bg-surface border-primary/60 text-primary-dark dark:text-primary';
                }

                return (
                  <div
                    key={node.index}
                    className="flex flex-col items-center transition-all duration-300 min-w-8"
                  >
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border-2 flex flex-col items-center justify-center font-bold text-xs shadow-xs ${nodeStyle}`}
                    >
                      <span>{node.value}</span>
                      <span className="text-[7px] opacity-75">
                        {isRoot ? 'Root' : `[${node.index}]`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-surface border border-border rounded-2xl p-4 md:p-6 shadow-xs space-y-5">
      {/* Header & Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-text-main text-base md:text-lg">
              {title || `Interactive Visualizer: ${algorithm.toUpperCase()}`}
            </h3>
            {currentStep.operationLabel && (
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-primary-light-bg text-primary-dark dark:text-primary font-semibold border border-primary/20">
                {currentStep.operationLabel}
              </span>
            )}
          </div>
          <p className="text-xs text-muted mt-0.5">
            ขั้นตอนที่ <span className="font-bold text-text-main">{currentStepIdx + 1}</span> จาก {steps.length} ขั้นตอน
            {currentStep.round !== undefined && ` • รอบที่ (Round): ${currentStep.round}`}
            {currentStep.pass !== undefined && ` • Pass: ${currentStep.pass}`}
            {currentStep.gap !== undefined && currentStep.gap > 0 && ` • GAP = ${currentStep.gap}`}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-1.5 md:gap-2">
          <button
            onClick={() => setCurrentStepIdx((p) => Math.max(0, p - 1))}
            disabled={currentStepIdx === 0 || isPlaying}
            className="p-2 rounded-xl border border-border text-muted hover:text-text-main hover:bg-surface-elevated disabled:opacity-30 transition"
            title="ก่อนหน้า"
          >
            <SkipBack className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            disabled={currentStepIdx >= steps.length - 1}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs md:text-sm font-semibold transition shadow-xs ${
              isPlaying
                ? 'bg-amber-500 hover:bg-amber-600 text-white'
                : 'bg-primary hover:bg-primary-hover text-white'
            }`}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span>{isPlaying ? 'หยุดชั่วคราว' : 'เล่นต่อเนื่อง'}</span>
          </button>
          <button
            onClick={() => setCurrentStepIdx((p) => Math.min(steps.length - 1, p + 1))}
            disabled={currentStepIdx >= steps.length - 1 || isPlaying}
            className="p-2 rounded-xl border border-border text-muted hover:text-text-main hover:bg-surface-elevated disabled:opacity-30 transition"
            title="ถัดไป"
          >
            <SkipForward className="w-4 h-4" />
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl border border-border text-muted hover:text-text-main hover:bg-surface-elevated transition"
            title="เริ่มใหม่ตั้งแต่ต้น"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
          <button
            onClick={handleRandomize}
            className="flex items-center gap-1 px-2.5 py-2 rounded-xl border border-border text-xs text-muted hover:text-text-main hover:bg-surface-elevated transition"
            title="สุ่มชุดข้อมูล"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">สุ่มข้อมูล</span>
          </button>
        </div>
      </div>

      {/* Progress & Speed Slider */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
        <div className="w-full sm:w-2/3 flex items-center gap-2">
          <span className="whitespace-nowrap">ความคืบหน้า:</span>
          <input
            type="range"
            min="0"
            max={Math.max(0, steps.length - 1)}
            value={currentStepIdx}
            onChange={(e) => {
              setIsPlaying(false);
              setCurrentStepIdx(parseInt(e.target.value, 10));
            }}
            className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
        <div className="flex items-center gap-2">
          <span>ความเร็ว:</span>
          <select
            value={playbackSpeed}
            onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
            className="bg-surface-elevated border border-border rounded-lg px-2 py-1 text-text-main text-xs outline-none"
          >
            <option value={1500}>0.5x ช้า</option>
            <option value={800}>1.0x ปกติ</option>
            <option value={400}>2.0x เร็ว</option>
          </select>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* ALGORITHM-SPECIFIC TOP BADGE / BANNER OVERLAYS                            */}
      {/* ========================================================================= */}

      {/* 1. Selection Sort Status Bar */}
      {algorithm === 'selection' && (
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-surface-elevated/80 border border-border rounded-xl text-xs">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-muted">ส่วนที่เรียงแล้ว: </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                Index 0..{(currentStep.sortedBoundary || 0) > 0 ? (currentStep.sortedBoundary || 0) - 1 : 0} ({currentStep.sortedBoundary || 0} ตัว)
              </span>
            </div>
            <div>
              <span className="text-muted">min candidate: </span>
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {currentStep.minCandidateIndex !== undefined
                  ? `${currentStep.array[currentStep.minCandidateIndex]} (Index ${currentStep.minCandidateIndex})`
                  : '-'}
              </span>
            </div>
          </div>
          <div className="text-[11px] text-muted">
            {currentStep.actionType === 'swap' ? '🔄 ทำการสลับ min กับตัวแรก' : '🔍 กำลังวนลูปสแกนหาค่าน้อยที่สุด'}
          </div>
        </div>
      )}

      {/* 2. Bubble Sort Status Bar */}
      {algorithm === 'bubble' && (
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-surface-elevated/80 border border-border rounded-xl text-xs">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-muted">Pass ปัจจุบัน: </span>
              <span className="font-bold text-primary-dark dark:text-primary">
                {currentStep.pass || 1}
              </span>
            </div>
            <div>
              <span className="text-muted">การสลับใน Pass นี้ (Swaps): </span>
              <span className="font-bold text-rose-600 dark:text-rose-400">
                {currentStep.swapsInCurrentPass || 0} ครั้ง
              </span>
            </div>
          </div>
          {currentStep.earlyExitTriggered && (
            <div className="px-2 py-0.5 bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 font-bold rounded-lg border border-emerald-500/30">
              ⚡ Early Exit: ไม่มี swap จบการทำงานทันที
            </div>
          )}
        </div>
      )}

      {/* 3. Insertion Sort Status Bar */}
      {algorithm === 'insertion' && (
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-surface-elevated/80 border border-border rounded-xl text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-muted">ไพ่ Key ในมือ: </span>
              {currentStep.keyValue !== null && currentStep.keyValue !== undefined ? (
                <span className="px-2.5 py-0.5 bg-amber-500 text-white font-extrabold rounded-md shadow-xs ring-2 ring-amber-300/60 scale-105 transition-transform">
                  🃏 Key = {currentStep.keyValue}
                </span>
              ) : (
                <span className="font-bold text-muted">-</span>
              )}
            </div>
            <div>
              <span className="text-muted">ตำแหน่งช่องว่าง (Hole): </span>
              <span className="font-mono font-bold text-primary">
                {currentStep.holeIndex !== null && currentStep.holeIndex !== undefined ? `[${currentStep.holeIndex}]` : 'ไม่มี'}
              </span>
            </div>
          </div>
          <div className="text-[11px] text-muted">
            การเปรียบเทียบ: ขวาไปซ้าย (ขยับตัวที่มากกว่า Key)
          </div>
        </div>
      )}

      {/* 4. Shell Sort Status Bar */}
      {algorithm === 'shell' && (
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-surface-elevated/80 border border-border rounded-xl text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-muted">ระยะห่างปัจจุบัน: </span>
              <span className="px-2.5 py-0.5 bg-primary text-white font-bold rounded-lg">
                GAP = {currentStep.gap || 1}
              </span>
            </div>
            {currentStep.gapGroupIndices && (
              <div>
                <span className="text-muted">กลุ่มที่กำลังเปรียบเทียบ: </span>
                <span className="font-mono font-semibold text-text-main">
                  [{currentStep.gapGroupIndices.join(', ')}]
                </span>
              </div>
            )}
          </div>
          <div className="text-[11px] text-muted">
            {currentStep.gap === 1 ? 'รอบสุดท้าย: Insertion Sort ปกติ' : 'ขยับข้อมูลข้ามช่องด้วยระยะ Gap'}
          </div>
        </div>
      )}

      {/* 5. Merge Sort Views: Compact Divide Breadcrumb + Subarrays Merge */}
      {algorithm === 'merge' && (
        <div className="p-3 bg-surface-elevated/80 border border-border rounded-xl space-y-2 text-xs">
          {/* Lightweight Divide Flow Breadcrumb */}
          <div className="flex items-center justify-between border-b border-border pb-2 text-[11px]">
            <span className="font-bold text-text-main flex items-center gap-1">
              <Split className="w-3.5 h-3.5 text-primary" /> ลำดับขั้นตอน Divide & Conquer:
            </span>
            <div className="flex items-center gap-1 text-muted">
              <span className={currentStep.mergeStage === 'initial' ? 'text-primary font-bold' : ''}>Original</span>
              <span>→</span>
              <span className={currentStep.mergeStage === 'split' ? 'text-primary font-bold' : ''}>Divide (แบ่งครึ่ง)</span>
              <span>→</span>
              <span className={currentStep.mergeStage === 'merge' ? 'text-primary font-bold' : ''}>Merge (ผสานคู่ย่อย)</span>
              <span>→</span>
              <span className={currentStep.mergeStage === 'done' ? 'text-emerald-600 font-bold' : ''}>Sorted</span>
            </div>
          </div>

          {/* Merge slices if in merge stage */}
          {currentStep.mergeLeftSlice && currentStep.mergeRightSlice && (
            <div className="grid grid-cols-2 gap-3 pt-1">
              {/* Left Subarray */}
              <div className="p-2.5 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mb-1">ฝั่งซ้าย (Left Subarray)</div>
                <div className="flex gap-1.5 flex-wrap">
                  {currentStep.mergeLeftSlice.values.map((v, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                        currentStep.mergeLeftSlice?.activeIdx === idx
                          ? 'bg-blue-600 text-white ring-2 ring-blue-400'
                          : 'bg-surface border border-blue-200 text-text-main'
                      }`}
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
              {/* Right Subarray */}
              <div className="p-2.5 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <div className="text-[11px] font-bold text-purple-600 dark:text-purple-400 mb-1">ฝั่งขวา (Right Subarray)</div>
                <div className="flex gap-1.5 flex-wrap">
                  {currentStep.mergeRightSlice.values.map((v, idx) => (
                    <span
                      key={idx}
                      className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                        currentStep.mergeRightSlice?.activeIdx === idx
                          ? 'bg-purple-600 text-white ring-2 ring-purple-400'
                          : 'bg-surface border border-purple-200 text-text-main'
                      }`}
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 6. Quick Sort Status Bar */}
      {algorithm === 'quick' && (
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-surface-elevated/80 border border-border rounded-xl text-xs">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span className="text-muted">Pivot ปัจจุบัน: </span>
              <span className="px-2 py-0.5 bg-amber-500 text-white font-extrabold rounded-md shadow-xs">
                Pivot = {currentStep.pivotValue !== undefined ? currentStep.pivotValue : (currentStep.pivotIndex !== undefined ? currentStep.array[currentStep.pivotIndex] : '-')}
              </span>
            </div>
            <div>
              <span className="text-muted">ตัวชี้: </span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                i = {currentStep.iPointer !== undefined ? currentStep.iPointer : '-'}
              </span>
              <span className="text-muted mx-1.5">|</span>
              <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
                j = {currentStep.jPointer !== undefined ? currentStep.jPointer : '-'}
              </span>
            </div>
          </div>
          {currentStep.partitionRange && (
            <div className="text-[11px] text-muted">
              ช่วง Partition: [{currentStep.partitionRange.low}..{currentStep.partitionRange.high}]
            </div>
          )}
        </div>
      )}

      {/* 7. Heap Sort Status Bar */}
      {algorithm === 'heap' && (
        <div className="flex flex-wrap items-center justify-between gap-2 p-3 bg-surface-elevated/80 border border-border rounded-xl text-xs">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-muted">ขนาด Heap ที่ยังทำงาน (Heap Size): </span>
              <span className="font-bold text-primary-dark dark:text-primary">
                {currentStep.heapSize !== undefined ? currentStep.heapSize : (currentStep.heapTree?.heapSize || 0)} ตัว
              </span>
            </div>
            <div>
              <span className="text-muted">เรียงสมบูรณ์แล้ว (Sorted Suffix): </span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                {currentStep.array.length - (currentStep.heapSize !== undefined ? currentStep.heapSize : (currentStep.heapTree?.heapSize || 0))} ตัว
              </span>
            </div>
          </div>
          <div className="text-[11px] text-muted">
            Max-Heap: Root (Index 0) คือค่ามากสุดเสมอ
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MAIN ARRAY VISUAL ARENA (BARS + SEMANTIC POINTERS)                        */}
      {/* ========================================================================= */}
      <div className="bg-surface-elevated/60 border border-border/80 rounded-xl p-4 md:p-6 min-h-[260px] flex flex-col justify-end space-y-4">
        {/* Bars Container */}
        <div className="flex items-end justify-center gap-2 md:gap-3.5 h-44 w-full pt-6">
          {currentStep.array.map((val, idx) => {
            const isComparing = currentStep.comparedIndices?.includes(idx);
            const isSwapped = currentStep.swappedIndices?.includes(idx);
            const isSorted = currentStep.sortedIndices?.includes(idx);
            const isHighlight = currentStep.highlightIndices?.includes(idx);
            const isPivot = currentStep.pivotIndex === idx;
            const isHole = algorithm === 'insertion' && currentStep.holeIndex === idx && currentStep.actionType === 'shift';
            const isMinCandidate = algorithm === 'selection' && currentStep.minCandidateIndex === idx;
            const isScan = algorithm === 'selection' && currentStep.currentScanIndex === idx;
            const isInGapGroup = algorithm === 'shell' && currentStep.gapGroupIndices?.includes(idx);

            let barColor = 'bg-primary/25 border-primary/35 text-primary-dark dark:text-primary';
            if (isSorted) {
              barColor = 'bg-emerald-500 border-emerald-600 text-white';
            } else if (isSwapped) {
              barColor = 'bg-rose-500 border-rose-600 text-white';
            } else if (isPivot) {
              barColor = 'bg-amber-500 border-amber-600 text-white ring-2 ring-amber-400';
            } else if (isHole) {
              barColor = 'bg-surface border-2 border-dashed border-amber-400 text-muted opacity-60';
            } else if (isComparing || isHighlight) {
              barColor = 'bg-blue-500 border-blue-600 text-white';
            } else if (isInGapGroup) {
              barColor = 'bg-primary/50 border-primary text-text-main';
            }

            const heightPercent = calculateBarHeight(val, isHole);

            return (
              <div key={idx} className="flex-1 max-w-14 flex flex-col items-center gap-1.5 transition-all duration-300">
                {/* Value on top of bar */}
                <span className={`text-xs font-bold ${isHole ? 'text-amber-500 italic' : 'text-text-main'}`}>
                  {isHole ? '🕳️' : val}
                </span>

                {/* Bar */}
                <div
                  style={{ height: `${heightPercent}%` }}
                  className={`w-full rounded-t-lg border flex items-end justify-center pb-1 text-xs font-semibold shadow-xs transition-all duration-300 ${barColor}`}
                >
                  {isPivot && <span className="text-[10px] font-extrabold uppercase">P</span>}
                  {isHole && <span className="text-[9px] text-amber-600 font-bold">Hole</span>}
                </div>

                {/* Index label */}
                <div className="flex flex-col items-center text-center">
                  <span className="text-[10px] font-mono text-muted">[{idx}]</span>

                  {/* Algorithm specific pointer badges below index */}
                  {algorithm === 'quick' && (
                    <div className="flex gap-0.5 mt-0.5">
                      {currentStep.iPointer === idx && (
                        <span className="px-1 py-0.2 bg-blue-500 text-white font-mono text-[9px] rounded font-bold">i</span>
                      )}
                      {currentStep.jPointer === idx && (
                        <span className="px-1 py-0.2 bg-purple-500 text-white font-mono text-[9px] rounded font-bold">j</span>
                      )}
                    </div>
                  )}

                  {algorithm === 'selection' && isMinCandidate && (
                    <span className="text-[9px] font-bold text-amber-500">min</span>
                  )}
                  {algorithm === 'selection' && isScan && !isMinCandidate && (
                    <span className="text-[9px] font-bold text-blue-500">scan</span>
                  )}

                  {isSorted && <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400">เรียงแล้ว</span>}
                  {isSwapped && <span className="text-[9px] font-bold text-rose-500">สลับ</span>}
                  {isComparing && !isSwapped && !isSorted && (
                    <span className="text-[9px] font-bold text-blue-500">เทียบ</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Dynamic Binary Heap Tree Rendering */}
        {algorithm === 'heap' && renderDynamicHeapTree()}
      </div>

      {/* Step Explanation Card */}
      <div className="bg-primary-light-bg/50 border border-primary/20 rounded-xl p-4 text-xs md:text-sm space-y-1.5">
        <div className="flex items-center justify-between font-bold text-primary-dark dark:text-primary text-xs">
          <span className="flex items-center gap-1.5">
            <Info className="w-4 h-4" /> คำอธิบายขั้นตอนปัจจุบัน:
          </span>
          {currentStep.sourceSlide && (
            <span className="text-[10px] bg-white/70 dark:bg-surface border border-primary/20 px-2 py-0.5 rounded-full">
              อ้างอิงสไลด์หน้า {currentStep.sourceSlide}
            </span>
          )}
        </div>
        <p className="text-text-main font-medium leading-relaxed">{currentStep.explanation}</p>
      </div>

      {/* Custom Array Input */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-1 border-t border-border">
        <span className="text-xs text-muted whitespace-nowrap">ปรับแต่งชุดข้อมูล:</span>
        <input
          type="text"
          value={arrayInput}
          onChange={(e) => setArrayInput(e.target.value)}
          placeholder="เช่น 25, 32, 12, 55, 9, 18, 50, 45"
          className="flex-1 bg-surface-elevated border border-border rounded-xl px-3 py-1.5 text-xs text-text-main outline-none focus:border-primary font-mono"
        />
        <button
          onClick={handleApplyCustomArray}
          className="px-3 py-1.5 bg-primary/15 hover:bg-primary/25 text-primary-dark dark:text-primary font-semibold rounded-xl text-xs transition"
        >
          ทดลองกับชุดนี้
        </button>
        <button
          onClick={handleResetToSlideExample}
          className="px-3 py-1.5 border border-border hover:bg-surface-elevated text-muted hover:text-text-main rounded-xl text-xs transition"
        >
          กลับสู่ตัวอย่างสไลด์
        </button>
      </div>
    </div>
  );
};
