import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, ArrowRight, RotateCcw, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { practiceQuestionsBank } from '../data/sortingData';
import { UserStats } from '../types';

interface QuizProps {
  stats: UserStats;
  onRecordQuizAttempt: (attempt: {
    quizId: string;
    score: number;
    total: number;
    percentage: number;
    categoryBreakdown: Record<string, { correct: number; total: number }>;
  }) => void;
}

export const Quiz: React.FC<QuizProps> = ({ stats, onRecordQuizAttempt }) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showOnlyWrong, setShowOnlyWrong] = useState<boolean>(false);

  const totalQuestions = practiceQuestionsBank.length;
  const answeredCount = Object.keys(userAnswers).length;

  const handleSelectAnswer = (qIndex: number, optIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleSubmitQuiz = () => {
    if (answeredCount < totalQuestions) {
      if (!confirm(`คุณยังตอบไม่ครบ (${answeredCount}/${totalQuestions} ข้อ) ต้องการส่งคำตอบเลยใช่หรือไม่?`)) {
        return;
      }
    }

    let correctCount = 0;
    const categoryBreakdown: Record<string, { correct: number; total: number }> = {};

    practiceQuestionsBank.forEach((q, idx) => {
      const isCorrect = userAnswers[idx] === q.correctAnswer;
      if (isCorrect) correctCount++;

      if (!categoryBreakdown[q.category]) {
        categoryBreakdown[q.category] = { correct: 0, total: 0 };
      }
      categoryBreakdown[q.category].total += 1;
      if (isCorrect) {
        categoryBreakdown[q.category].correct += 1;
      }
    });

    const percentage = Math.round((correctCount / totalQuestions) * 100);

    onRecordQuizAttempt({
      quizId: 'quiz-20-standard',
      score: correctCount,
      total: totalQuestions,
      percentage,
      categoryBreakdown,
    });

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (percentage >= 80) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setShowOnlyWrong(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const score = practiceQuestionsBank.filter(
    (q, idx) => userAnswers[idx] === q.correctAnswer
  ).length;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-border pb-4 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" /> Comprehensive Chapter Quiz
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-text-main">
          แบบทดสอบความเข้าใจ 20 ข้อ (Chapter Quiz)
        </h2>
        <p className="text-xs md:text-sm text-muted">
          ครอบคลุมทั้ง 7 อัลกอริทึม อ้างอิงคำถามและตัวเลือกจากสไลด์ Chapter 12 Sorting 100%
        </p>
      </div>

      {/* Result Score Banner */}
      {isSubmitted && (
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 rounded-2xl flex items-center justify-center font-extrabold text-2xl ${
                  score >= 16
                    ? 'bg-emerald-500/15 text-emerald-600 border border-emerald-500/30'
                    : score >= 10
                    ? 'bg-amber-500/15 text-amber-600 border border-amber-500/30'
                    : 'bg-rose-500/15 text-rose-600 border border-rose-500/30'
                }`}
              >
                {Math.round((score / totalQuestions) * 100)}%
              </div>
              <div>
                <h3 className="text-lg font-bold text-text-main">
                  คุณได้คะแนน {score} จาก {totalQuestions} คะแนน
                </h3>
                <p className="text-xs text-muted">
                  {score >= 16
                    ? 'ยอดเยี่ยมมาก! คุณเข้าใจหลักการของทั้ง 7 อัลกอริทึมเป็นอย่างดี'
                    : score >= 10
                    ? 'ผ่านเกณฑ์มาตรฐาน แนะนำให้ทบทวนข้อที่ตอบผิดด้านล่าง'
                    : 'ควรกลับไปทบทวนบทเรียนในสไลด์และฝึกทำแล็บเพิ่มเติม'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowOnlyWrong(!showOnlyWrong)}
                className="px-3.5 py-2 border border-border hover:bg-surface-elevated text-xs font-semibold rounded-xl text-text-main transition"
              >
                {showOnlyWrong ? 'แสดงคำถามทั้งหมด' : 'ดูเฉพาะข้อที่ตอบผิด'}
              </button>
              <button
                onClick={handleResetQuiz}
                className="px-3.5 py-2 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-hover transition shadow-xs inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>ทำแบบทดสอบใหม่</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-4">
        {practiceQuestionsBank.map((q, idx) => {
          const userAnswer = userAnswers[idx];
          const isCorrect = userAnswer === q.correctAnswer;
          const isWrong = isSubmitted && userAnswer !== undefined && !isCorrect;

          if (isSubmitted && showOnlyWrong && isCorrect) {
            return null;
          }

          return (
            <div
              key={q.id}
              className={`bg-surface border rounded-2xl p-5 shadow-xs space-y-4 transition ${
                isSubmitted
                  ? isCorrect
                    ? 'border-emerald-500/40 bg-emerald-500/5'
                    : 'border-rose-500/40 bg-rose-500/5'
                  : 'border-border'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-xl bg-surface-elevated border border-border flex items-center justify-center font-bold text-xs text-primary flex-shrink-0">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold text-muted uppercase tracking-wider">
                      {q.category} • {q.sourceSlide}
                    </span>
                    <h3 className="text-xs md:text-sm font-semibold text-text-main leading-relaxed mt-0.5">
                      {q.question}
                    </h3>
                  </div>
                </div>

                {isSubmitted && (
                  <div className="flex-shrink-0">
                    {isCorrect ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-bold text-xs">
                        <CheckCircle2 className="w-4 h-4" /> ถูกต้อง
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-rose-500 font-bold text-xs">
                        <XCircle className="w-4 h-4" /> ไม่ถูกต้อง
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Options */}
              <div className="space-y-2 pl-10">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userAnswer === optIdx;
                  let optStyle = 'bg-surface border-border hover:bg-surface-elevated text-text-main';

                  if (isSubmitted) {
                    if (optIdx === q.correctAnswer) {
                      optStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-900 dark:text-emerald-200 font-semibold';
                    } else if (isSelected && !isCorrect) {
                      optStyle = 'bg-rose-500/20 border-rose-500 text-rose-900 dark:text-rose-200';
                    } else {
                      optStyle = 'opacity-50 border-border bg-surface text-muted';
                    }
                  } else if (isSelected) {
                    optStyle = 'bg-primary-light-bg border-primary text-primary-dark dark:text-primary font-semibold';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectAnswer(idx, optIdx)}
                      disabled={isSubmitted}
                      className={`w-full p-3 rounded-xl border text-left text-xs md:text-sm transition flex items-center justify-between ${optStyle}`}
                    >
                      <span>{opt}</span>
                      {isSubmitted && optIdx === q.correctAnswer && (
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      )}
                      {isSubmitted && isSelected && !isCorrect && (
                        <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submission */}
              {isSubmitted && (
                <div className="ml-10 p-3 bg-surface-elevated/70 border border-border rounded-xl text-xs space-y-1">
                  <div className="font-bold text-primary-dark dark:text-primary">เฉลยและคำอธิบาย:</div>
                  <p className="text-muted leading-relaxed">{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Submit Action */}
      {!isSubmitted && (
        <div className="sticky bottom-4 bg-surface border border-border p-4 rounded-2xl shadow-md flex items-center justify-between gap-4">
          <div className="text-xs text-muted">
            ตอบแล้ว <span className="font-bold text-text-main">{answeredCount}</span> จาก {totalQuestions} ข้อ
          </div>
          <button
            onClick={handleSubmitQuiz}
            className="px-5 py-2.5 bg-primary text-white text-xs md:text-sm font-semibold rounded-xl hover:bg-primary-hover transition shadow-xs"
          >
            ส่งคำตอบแบบทดสอบ
          </button>
        </div>
      )}
    </div>
  );
};
