import React from 'react';
import {
  BookOpen,
  CheckCircle2,
  HelpCircle,
  FlaskConical,
  ArrowRight,
  Sparkles,
  Zap,
  ArrowUpDown,
  Repeat,
  ArrowDownToLine,
  Layers,
  GitMerge,
  Binary,
  GitCompare,
  RotateCcw,
} from 'lucide-react';
import { UserStats, StudySection } from '../types';
import { practiceQuestionsBank, labChallengesBank } from '../data/sortingData';

interface DashboardProps {
  stats: UserStats;
  onNavigate: (section: StudySection) => void;
  onResetProgress?: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats, onNavigate, onResetProgress }) => {
  const totalLessons = 7;
  const completedCount = stats.completedLessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100);

  const practiceAnswered = Object.keys(stats.practiceAttempts || {}).length;
  const practiceCorrect = Object.values(stats.practiceAttempts || {}).filter((a) => a.isCorrect).length;

  const quizCount = (stats.quizHistory || []).length;
  const latestQuiz = quizCount > 0 ? stats.quizHistory[quizCount - 1] : null;

  const labsCompletedCount = Object.keys(stats.labCompleted || {}).length;

  const hasActivity = completedCount > 0 || practiceAnswered > 0 || quizCount > 0 || labsCompletedCount > 0;

  const algorithmCards: { id: StudySection; title: string; titleTh: string; complexity: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
    {
      id: 'selection-sort',
      title: 'Selection Sort',
      titleTh: 'การเรียงลำดับแบบเลือก',
      complexity: 'O(n²)',
      icon: ArrowUpDown,
      desc: 'หาค่าน้อยที่สุดในส่วนที่ยังไม่เรียง แล้วสลับกับตัวแรกของส่วนนั้น ทำซ้ำจนครบ',
    },
    {
      id: 'bubble-sort',
      title: 'Bubble Sort',
      titleTh: 'การเรียงลำดับแบบฟองอากาศ',
      complexity: 'O(n²)',
      icon: Repeat,
      desc: 'เปรียบเทียบคู่ติดกันแล้วสลับถ้าไม่ถูกต้อง ตัวมากสุดจะลอยไปท้ายสุดเหมือนฟองอากาศ',
    },
    {
      id: 'insertion-sort',
      title: 'Insertion Sort',
      titleTh: 'การเรียงลำดับแบบแทรก',
      complexity: 'O(n²)',
      icon: ArrowDownToLine,
      desc: 'เสมือนการจัดเรียงไพ่ในมือ หยิบทีละใบแล้วนำไปแทรกลงในตำแหน่งที่ถูกต้อง',
    },
    {
      id: 'shell-sort',
      title: 'Shell Sort',
      titleTh: 'การเรียงลำดับแบบเชลล์',
      complexity: 'O(n²) หรือ O(n^1.5)',
      icon: Layers,
      desc: 'ปรับปรุงจาก Insertion Sort โดยเปรียบเทียบข้ามช่องตามระยะ Gap แล้วลด Gap ลงจนเป็น 1',
    },
    {
      id: 'merge-sort',
      title: 'Merge Sort',
      titleTh: 'การเรียงลำดับแบบผสาน',
      complexity: 'O(n log n) เสมอ',
      icon: GitMerge,
      desc: 'ใช้กลยุทธ์ Divide and Conquer แบ่งครึ่งย่อยๆ จนเหลือ 1 แล้วผสานกลับอย่างมีระเบียบ',
    },
    {
      id: 'quick-sort',
      title: 'Quick Sort',
      titleTh: 'การเรียงลำดับแบบเร็ว',
      complexity: 'Best O(n log n), Worst O(n²)',
      icon: Zap,
      desc: 'Divide and Conquer ยอดนิยม เลือก Pivot แล้วแบ่งกลุ่มย่อยซ้าย-ขวาด้วยตัวชี้ i และ j',
    },
    {
      id: 'heap-sort',
      title: 'Heap Sort',
      titleTh: 'การเรียงลำดับแบบฮีป',
      complexity: 'O(n log n) เสมอ',
      icon: Binary,
      desc: 'ประยุกต์ใช้ Binary Max-Heap ดึงตัวมากสุดที่ Root ไปไว้ท้าย แล้ว Heapify ปรับสมดุลใหม่',
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary-dark via-primary to-primary-hover rounded-3xl p-6 md:p-8 text-white shadow-md">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/15 rounded-full text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" /> Data Structures Chapter 12
          </div>
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">
            เทคนิคการจัดเรียงข้อมูล (Sorting Algorithms)
          </h2>
          <p className="text-white/90 text-xs md:text-sm leading-relaxed">
            เรียนรู้หลักการและขั้นตอนของอัลกอริทึมสำหรับการจัดเรียงข้อมูล 7 อัลกอริทึมหลักตามเอกสารประกอบการสอน
            ผศ. ดร. สิลดา อินทรโสธรฉันท์ มหาวิทยาลัยขอนแก่น พร้อมแอนิเมชันทีละขั้นตอน ตัวอย่างอาร์เรย์จริง และแบบทดสอบครบครัน
          </p>

          <div className="pt-3 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('fundamentals')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-primary-dark font-bold rounded-xl text-xs md:text-sm hover:bg-white/90 transition shadow-xs"
            >
              เริ่มต้นบทเรียน <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('quick-review')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl text-xs md:text-sm transition"
            >
              สรุปหัวใจสำคัญ
            </button>
            <button
              onClick={() => onNavigate('interactive-labs')}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 text-white font-semibold rounded-xl text-xs md:text-sm transition"
            >
              แล็บทดลอง (8 Labs)
            </button>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-surface border border-border p-4 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-muted text-xs">
            <span>บทเรียนหลัก</span>
            <BookOpen className="w-4 h-4 text-primary" />
          </div>
          <div className="text-xl md:text-2xl font-extrabold text-text-main">
            {completedCount} / {totalLessons}
          </div>
          <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-primary h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="text-[10px] text-muted">{progressPercent}% เสร็จสิ้น</div>
        </div>

        <div className="bg-surface border border-border p-4 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-muted text-xs">
            <span>แล็บทดลอง</span>
            <FlaskConical className="w-4 h-4 text-primary" />
          </div>
          <div className="text-xl md:text-2xl font-extrabold text-text-main">
            {labsCompletedCount} / 8
          </div>
          <p className="text-[10px] text-muted">ผ่านการทดสอบ {labsCompletedCount} หัวข้อ</p>
        </div>

        <div className="bg-surface border border-border p-4 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-muted text-xs">
            <span>แบบฝึกหัดย่อย</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          </div>
          <div className="text-xl md:text-2xl font-extrabold text-text-main">
            {practiceAnswered > 0 ? `${practiceCorrect}/${practiceAnswered}` : 'ยังไม่มีผล'}
          </div>
          <p className="text-[10px] text-muted">
            {practiceAnswered > 0 ? `ความแม่นยำ ${Math.round((practiceCorrect / practiceAnswered) * 100)}%` : 'ยังไม่ได้ฝึกทำ'}
          </p>
        </div>

        <div className="bg-surface border border-border p-4 rounded-2xl shadow-xs space-y-1">
          <div className="flex items-center justify-between text-muted text-xs">
            <span>แบบทดสอบรวม</span>
            <HelpCircle className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl md:text-2xl font-extrabold text-text-main">
            {latestQuiz ? `${latestQuiz.score}/${latestQuiz.total}` : 'ยังไม่มีผล'}
          </div>
          <p className="text-[10px] text-muted">
            {latestQuiz ? `ทำล่าสุดเมื่อ ${new Date(latestQuiz.timestamp).toLocaleDateString('th-TH')}` : 'จากทั้งหมด 20 ข้อ'}
          </p>
        </div>
      </div>

      {/* 7 Sorting Algorithms Quick Access */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base md:text-lg font-bold text-text-main flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" /> 7 อัลกอริทึมการจัดเรียงในบทเรียนนี้
          </h3>
          <button
            onClick={() => onNavigate('comparison')}
            className="text-xs text-primary font-semibold hover:underline flex items-center gap-1"
          >
            <GitCompare className="w-3.5 h-3.5" /> ดูตารางเปรียบเทียบ
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {algorithmCards.map((algo, index) => {
            const Icon = algo.icon;
            const isCompleted = stats.completedLessons.includes(algo.id);
            return (
              <div
                key={algo.id}
                onClick={() => onNavigate(algo.id)}
                className="bg-surface hover:bg-surface-elevated border border-border hover:border-primary/40 rounded-2xl p-4 md:p-5 transition shadow-xs cursor-pointer flex flex-col justify-between group space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                        {index + 1}
                      </span>
                      <h4 className="font-bold text-text-main text-sm group-hover:text-primary transition">
                        {algo.title}
                      </h4>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-elevated border border-border text-muted">
                      {algo.complexity}
                    </span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed line-clamp-2">
                    {algo.desc}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/60 text-xs">
                  <span className="text-[11px] text-muted">{algo.titleTh}</span>
                  <div className="flex items-center gap-1 text-primary font-semibold group-hover:translate-x-0.5 transition">
                    <span>เรียนรู้</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Reset & Study Actions */}
      <div className="p-4 bg-surface-elevated/60 border border-border rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
        <div className="flex items-center gap-2">
          <span>ความคืบหน้าทั้งหมดบันทึกอัตโนมัติใน Browser (localStorage)</span>
        </div>
        {hasActivity && onResetProgress && (
          <button
            onClick={() => {
              if (confirm('คุณต้องการรีเซ็ตประวัติการเรียนและความคืบหน้าทั้งหมดใช่หรือไม่?')) {
                onResetProgress();
              }
            }}
            className="inline-flex items-center gap-1 text-xs text-rose-500 hover:text-rose-600 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" /> รีเซ็ตข้อมูลการเรียน
          </button>
        )}
      </div>
    </div>
  );
};
