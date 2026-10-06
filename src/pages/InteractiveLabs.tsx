import React, { useState } from 'react';
import { FlaskConical, CheckCircle2, XCircle, HelpCircle, ArrowRight, RotateCcw, Lightbulb } from 'lucide-react';
import { labChallengesBank } from '../data/sortingData';
import { UserStats } from '../types';

interface InteractiveLabsProps {
  stats: UserStats;
  onCompleteLab: (labId: string) => void;
}

export const InteractiveLabs: React.FC<InteractiveLabsProps> = ({ stats, onCompleteLab }) => {
  const [activeLabIdx, setActiveLabIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const currentLab = labChallengesBank[activeLabIdx];
  const isCorrect = selectedOption === currentLab.correctOptionIndex;
  const isLabAlreadyPassed = stats.labCompleted?.[currentLab.id];

  const handleSelectOption = (idx: number) => {
    if (submitted) return;
    setSelectedOption(idx);
  };

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setSubmitted(true);
    if (selectedOption === currentLab.correctOptionIndex) {
      onCompleteLab(currentLab.id);
    }
  };

  const handleNextLab = () => {
    if (activeLabIdx < labChallengesBank.length - 1) {
      setActiveLabIdx(activeLabIdx + 1);
      setSelectedOption(null);
      setSubmitted(false);
      setShowHint(false);
    }
  };

  const handlePrevLab = () => {
    if (activeLabIdx > 0) {
      setActiveLabIdx(activeLabIdx - 1);
      setSelectedOption(null);
      setSubmitted(false);
      setShowHint(false);
    }
  };

  const handleRetry = () => {
    setSelectedOption(null);
    setSubmitted(false);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-border pb-4 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
          <FlaskConical className="w-3.5 h-3.5" /> Hands-on Sorting Labs
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-text-main">
          แล็บทดลองปฏิบัติการ 8 ข้อ (Interactive Sorting Labs)
        </h2>
        <p className="text-xs md:text-sm text-muted">
          ฝึกวิเคราะห์และทำนายสถานะของอาร์เรย์ในแต่ละรอบจริงตามสไลด์
        </p>
      </div>

      {/* Lab Selector Carousel */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
        {labChallengesBank.map((lab, idx) => {
          const isPassed = stats.labCompleted?.[lab.id];
          const isCurrent = idx === activeLabIdx;
          return (
            <button
              key={lab.id}
              onClick={() => {
                setActiveLabIdx(idx);
                setSelectedOption(null);
                setSubmitted(false);
                setShowHint(false);
              }}
              className={`p-2.5 rounded-xl border text-center transition flex flex-col items-center gap-1 ${
                isCurrent
                  ? 'bg-primary text-white border-primary shadow-xs'
                  : isPassed
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
                  : 'bg-surface border-border text-muted hover:text-text-main hover:bg-surface-elevated'
              }`}
            >
              <span className="text-xs font-bold">Lab {idx + 1}</span>
              {isPassed ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              ) : (
                <span className="text-[9px] opacity-75">{lab.algorithm.slice(0, 4)}</span>
              )}
            </button>
          );
        })}
      </div>

      {/* Lab Workspace Card */}
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border pb-4">
          <div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
              โจทย์ข้อที่ {activeLabIdx + 1} จาก {labChallengesBank.length} • อ้างอิงสไลด์หน้า {currentLab.sourceSlide}
            </span>
            <h3 className="text-base md:text-lg font-bold text-text-main">{currentLab.title}</h3>
          </div>
          {isLabAlreadyPassed && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold self-start sm:self-auto">
              <CheckCircle2 className="w-3.5 h-3.5" /> ผ่านแล็บนี้แล้ว
            </span>
          )}
        </div>

        {/* Initial Data Display */}
        {currentLab.initialArray && currentLab.initialArray.length > 0 && (
          <div className="p-4 bg-surface-elevated/60 border border-border rounded-xl space-y-2">
            <span className="text-xs font-semibold text-muted">ชุดข้อมูลเริ่มต้นในโจทย์:</span>
            <div className="flex flex-wrap gap-2">
              {currentLab.initialArray.map((num, i) => (
                <div
                  key={i}
                  className="px-3 py-1.5 bg-surface border border-border rounded-lg font-mono font-bold text-xs text-text-main"
                >
                  <span className="text-[9px] text-muted block -mb-1">[{i}]</span>
                  {num}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Task Question */}
        <div className="space-y-3">
          <p className="text-xs md:text-sm font-semibold text-text-main leading-relaxed">
            {currentLab.taskPrompt}
          </p>

          {/* Options */}
          <div className="space-y-2">
            {currentLab.options?.map((option, optIdx) => {
              const isSelected = selectedOption === optIdx;
              let optionStyle = 'bg-surface border-border hover:bg-surface-elevated text-text-main';

              if (submitted) {
                if (optIdx === currentLab.correctOptionIndex) {
                  optionStyle = 'bg-emerald-500/15 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-semibold';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-rose-500/15 border-rose-500 text-rose-700 dark:text-rose-300';
                } else {
                  optionStyle = 'opacity-40 border-border bg-surface';
                }
              } else if (isSelected) {
                optionStyle = 'bg-primary-light-bg border-primary text-primary-dark dark:text-primary font-semibold';
              }

              return (
                <button
                  key={optIdx}
                  onClick={() => handleSelectOption(optIdx)}
                  disabled={submitted}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs md:text-sm transition flex items-center justify-between ${optionStyle}`}
                >
                  <span>{option}</span>
                  {submitted && optIdx === currentLab.correctOptionIndex && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 ml-2" />
                  )}
                  {submitted && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Hint Box */}
        {showHint && (
          <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p><strong>คำใบ้:</strong> {currentLab.hint}</p>
          </div>
        )}

        {/* Feedback after Submission */}
        {submitted && (
          <div
            className={`p-4 rounded-xl border text-xs md:text-sm space-y-1 ${
              isCorrect
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-800 dark:text-emerald-200'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-800 dark:text-rose-200'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>คำตอบถูกต้อง! บันทึกความสำเร็จเรียบร้อย</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 text-rose-600" />
                  <span>ยังไม่ถูกต้อง ลองทบทวนขั้นตอนและทดลองใหม่อีกครั้ง</span>
                </>
              )}
            </div>
            <p className="text-xs opacity-90 leading-relaxed pt-1">
              <strong>คำอธิบาย:</strong> {currentLab.explanation}
            </p>
          </div>
        )}

        {/* Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            {!submitted && (
              <button
                onClick={() => setShowHint(!showHint)}
                className="px-3 py-1.5 border border-border hover:bg-surface-elevated text-muted hover:text-text-main text-xs font-semibold rounded-xl transition inline-flex items-center gap-1"
              >
                <Lightbulb className="w-3.5 h-3.5" />
                <span>{showHint ? 'ซ่อนคำใบ้' : 'ดูคำใบ้'}</span>
              </button>
            )}
            {submitted && !isCorrect && (
              <button
                onClick={handleRetry}
                className="px-3 py-1.5 border border-border hover:bg-surface-elevated text-muted hover:text-text-main text-xs font-semibold rounded-xl transition inline-flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ลองตอบใหม่</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!submitted ? (
              <button
                onClick={handleSubmit}
                disabled={selectedOption === null}
                className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-hover disabled:opacity-40 transition shadow-xs"
              >
                ส่งคำตอบ
              </button>
            ) : (
              <button
                onClick={handleNextLab}
                disabled={activeLabIdx >= labChallengesBank.length - 1}
                className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-hover disabled:opacity-40 transition shadow-xs inline-flex items-center gap-1"
              >
                <span>โจทย์ข้อถัดไป</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
