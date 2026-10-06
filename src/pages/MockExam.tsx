import React, { useState } from 'react';
import { Award, Timer, CheckCircle2, XCircle, RotateCcw, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { practiceQuestionsBank } from '../data/sortingData';
import { UserStats, QuizQuestion } from '../types';

interface MockExamProps {
  stats: UserStats;
  onRecordMockExamAttempt: (attempt: {
    score: number;
    total: number;
    percentage: number;
    answers: Record<number, number>;
  }) => void;
}

export const MockExam: React.FC<MockExamProps> = ({ stats, onRecordMockExamAttempt }) => {
  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examQuestions, setExamQuestions] = useState<QuizQuestion[]>([]);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const startExam = () => {
    // Shuffle questions
    const shuffled = [...practiceQuestionsBank].sort(() => Math.random() - 0.5);
    setExamQuestions(shuffled);
    setUserAnswers({});
    setIsSubmitted(false);
    setExamStarted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAnswer = (qIndex: number, optIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({ ...prev, [qIndex]: optIndex }));
  };

  const handleSubmitExam = () => {
    const total = examQuestions.length;
    const answeredCount = Object.keys(userAnswers).length;

    if (answeredCount < total) {
      if (!confirm(`คุณยังตอบไม่ครบ (${answeredCount}/${total} ข้อ) ต้องการส่งข้อสอบเพื่อตรวจคะแนนเลยหรือไม่?`)) {
        return;
      }
    }

    let score = 0;
    examQuestions.forEach((q, idx) => {
      if (userAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });

    const percentage = Math.round((score / total) * 100);

    onRecordMockExamAttempt({
      score,
      total,
      percentage,
      answers: userAnswers,
    });

    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (percentage >= 80) {
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.5 } });
    }
  };

  const latestExam = stats.mockExamHistory && stats.mockExamHistory.length > 0
    ? stats.mockExamHistory[stats.mockExamHistory.length - 1]
    : null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-border pb-4 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
          <Award className="w-3.5 h-3.5" /> Examination Simulation
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-text-main">
          จำลองการสอบเสมือนจริง (Mock Exam)
        </h2>
        <p className="text-xs md:text-sm text-muted leading-relaxed">
          แบบทดสอบแบบสุ่มข้อและซ่อนเฉลยจนกว่าจะส่งคำตอบ พร้อมบันทึกสถิติคะแนนจริง
        </p>
      </div>

      {/* Pre-Exam Intro Screen */}
      {!examStarted && (
        <div className="bg-surface border border-border rounded-2xl p-6 md:p-8 shadow-xs space-y-6">
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-text-main">คำแนะนำในการทำข้อสอบจำลอง</h3>
            <ul className="text-xs md:text-sm text-muted space-y-2 list-disc list-inside leading-relaxed">
              <li>ข้อสอบมีทั้งหมด <strong>20 ข้อ</strong> สุ่มจากทุกอัลกอริทึมใน Chapter 12</li>
              <li>ระบบจะไม่แสดงเฉลยหรือบอกข้อถูก-ผิดในระหว่างทำข้อสอบ</li>
              <li>เมื่อกด "ส่งข้อสอบ" ระบบจะคำนวณคะแนนและแสดงคำอธิบายทุกข้ออย่างละเอียด</li>
              <li>คะแนนจะถูกบันทึกลงในประวัติการสอบของคุณอัตโนมัติ</li>
            </ul>
          </div>

          {/* Past Result History */}
          <div className="p-4 bg-surface-elevated border border-border rounded-xl space-y-2">
            <span className="text-xs font-bold text-text-main">ประวัติการสอบล่าสุด:</span>
            {latestExam ? (
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted">
                  ทำเมื่อ: {new Date(latestExam.timestamp).toLocaleString('th-TH')}
                </span>
                <span className="font-bold text-primary-dark dark:text-primary">
                  คะแนนที่ได้: {latestExam.score}/{latestExam.total} ({latestExam.percentage}%)
                </span>
              </div>
            ) : (
              <div className="text-xs text-muted">ยังไม่มีผลการสอบจำลอง</div>
            )}
          </div>

          <button
            onClick={startExam}
            className="w-full sm:w-auto px-6 py-3 bg-primary text-white font-bold rounded-xl text-xs md:text-sm hover:bg-primary-hover transition shadow-xs inline-flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            <span>เริ่มทำข้อสอบจำลอง (Start Exam)</span>
          </button>
        </div>
      )}

      {/* In-Exam Screen */}
      {examStarted && (
        <div className="space-y-6">
          {/* Top Result if submitted */}
          {isSubmitted && (
            <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/30 flex items-center justify-center text-primary-dark dark:text-primary font-extrabold text-2xl">
                    {Math.round(
                      (examQuestions.filter((q, idx) => userAnswers[idx] === q.correctAnswer).length /
                        examQuestions.length) *
                        100
                    )}
                    %
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-main">
                      ส่งข้อสอบสำเร็จ! ได้คะแนน{' '}
                      {examQuestions.filter((q, idx) => userAnswers[idx] === q.correctAnswer).length} /{' '}
                      {examQuestions.length}
                    </h3>
                    <p className="text-xs text-muted">ตรวจทานเฉลยและคำอธิบายแต่ละข้อได้ด้านล่าง</p>
                  </div>
                </div>
                <button
                  onClick={startExam}
                  className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-hover transition shadow-xs inline-flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>สอบใหม่อีกครั้ง</span>
                </button>
              </div>
            </div>
          )}

          {/* Questions */}
          <div className="space-y-4">
            {examQuestions.map((q, idx) => {
              const userAnswer = userAnswers[idx];
              const isCorrect = userAnswer === q.correctAnswer;

              return (
                <div
                  key={idx}
                  className={`bg-surface border rounded-2xl p-5 shadow-xs space-y-4 transition ${
                    isSubmitted
                      ? isCorrect
                        ? 'border-emerald-500/40 bg-emerald-500/5'
                        : 'border-rose-500/40 bg-rose-500/5'
                      : 'border-border'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <span className="w-7 h-7 rounded-xl bg-surface-elevated border border-border flex items-center justify-center font-bold text-xs text-primary flex-shrink-0">
                        {idx + 1}
                      </span>
                      <div>
                        <span className="text-[10px] font-bold text-muted uppercase">
                          {q.category}
                        </span>
                        <h4 className="text-xs md:text-sm font-semibold text-text-main leading-relaxed mt-0.5">
                          {q.question}
                        </h4>
                      </div>
                    </div>
                    {isSubmitted && (
                      <span className="text-xs font-bold flex-shrink-0">
                        {isCorrect ? (
                          <span className="text-emerald-600 flex items-center gap-1">
                            <CheckCircle2 className="w-4 h-4" /> ถูก
                          </span>
                        ) : (
                          <span className="text-rose-500 flex items-center gap-1">
                            <XCircle className="w-4 h-4" /> ผิด
                          </span>
                        )}
                      </span>
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

                  {/* Explanation when submitted */}
                  {isSubmitted && (
                    <div className="ml-10 p-3 bg-surface-elevated/70 border border-border rounded-xl text-xs space-y-1">
                      <div className="font-bold text-primary-dark dark:text-primary">เฉลยละเอียด:</div>
                      <p className="text-muted leading-relaxed">{q.explanation}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Sticky Submit Button */}
          {!isSubmitted && (
            <div className="sticky bottom-4 bg-surface border border-border p-4 rounded-2xl shadow-md flex items-center justify-between gap-4">
              <div className="text-xs text-muted">
                ทำแล้ว{' '}
                <span className="font-bold text-text-main">
                  {Object.keys(userAnswers).length}
                </span>{' '}
                จาก {examQuestions.length} ข้อ
              </div>
              <button
                onClick={handleSubmitExam}
                className="px-5 py-2.5 bg-primary text-white text-xs md:text-sm font-semibold rounded-xl hover:bg-primary-hover transition shadow-xs"
              >
                ส่งข้อสอบเพื่อตรวจคะแนน
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
