import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ExternalLink,
  Code2,
  Clock,
  ThumbsUp,
  AlertTriangle,
  Lightbulb,
  Sparkles,
} from 'lucide-react';
import { SortingVisualizer } from '../components/SortingVisualizer';
import { StudySection, SortingAlgorithmType } from '../types';

export interface SortingLessonConfig {
  id: StudySection;
  algoType: SortingAlgorithmType;
  titleEn: string;
  titleTh: string;
  slidePages: string;
  shortDesc: string;
  concept: string[];
  howItWorksSteps: string[];
  lectureExample: {
    initial: number[];
    rounds: { round: string; explanation: string; arrayAfter: number[] }[];
  };
  pseudocode: string;
  timeComplexity: {
    best?: string;
    average?: string;
    worst?: string;
    summary: string;
    explanation: string;
  };
  keyTakeaways: {
    pros: string[];
    cons: string[];
  };
  commonMistake: string;
  prevSection?: StudySection;
  nextSection: StudySection;
}

interface SortingLessonPageProps {
  config: SortingLessonConfig;
  onNavigate: (section: StudySection) => void;
  onMarkComplete?: () => void;
  isCompleted?: boolean;
}

export const SortingLessonPage: React.FC<SortingLessonPageProps> = ({
  config,
  onNavigate,
  onMarkComplete,
  isCompleted,
}) => {
  const [activeTab, setActiveTab] = useState<'concept' | 'visualizer' | 'example' | 'code'>('concept');

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-border pb-4 space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" /> Sorting Algorithm • สไลด์ {config.slidePages}
          </div>
          <a
            href="/lecture.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-primary hover:underline inline-flex items-center gap-1"
          >
            <span>เปิดดูสไลด์ PDF</span> <ExternalLink className="w-3 h-3" />
          </a>
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-text-main">
          {config.titleEn} ({config.titleTh})
        </h2>
        <p className="text-xs md:text-sm text-muted leading-relaxed">
          {config.shortDesc}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-border pb-2 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab('concept')}
          className={`px-3 py-1.5 rounded-lg transition ${
            activeTab === 'concept'
              ? 'bg-primary text-white shadow-xs'
              : 'text-muted hover:text-text-main hover:bg-surface-elevated'
          }`}
        >
          หลักการ & ขั้นตอน
        </button>
        <button
          onClick={() => setActiveTab('visualizer')}
          className={`px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
            activeTab === 'visualizer'
              ? 'bg-primary text-white shadow-xs'
              : 'text-muted hover:text-text-main hover:bg-surface-elevated'
          }`}
        >
          <span>Interactive Visualizer</span>
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
        </button>
        <button
          onClick={() => setActiveTab('example')}
          className={`px-3 py-1.5 rounded-lg transition ${
            activeTab === 'example'
              ? 'bg-primary text-white shadow-xs'
              : 'text-muted hover:text-text-main hover:bg-surface-elevated'
          }`}
        >
          ตัวอย่างจริงในสไลด์
        </button>
        <button
          onClick={() => setActiveTab('code')}
          className={`px-3 py-1.5 rounded-lg transition ${
            activeTab === 'code'
              ? 'bg-primary text-white shadow-xs'
              : 'text-muted hover:text-text-main hover:bg-surface-elevated'
          }`}
        >
          โค้ด & Time Complexity
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'concept' && (
        <div className="space-y-6">
          {/* Concept Card */}
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-text-main flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" /> หลักการทำงาน (Concept)
            </h3>
            <div className="space-y-2.5 text-xs md:text-sm text-text-main/90 leading-relaxed">
              {config.concept.map((c, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  <p>{c}</p>
                </div>
              ))}
            </div>
          </div>

          {/* How It Works Steps */}
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-text-main flex items-center gap-2">
              <Code2 className="w-5 h-5 text-primary" /> ขั้นตอนการทำงานทีละสเต็ป (Step-by-Step)
            </h3>
            <div className="space-y-3 text-xs md:text-sm">
              {config.howItWorksSteps.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 bg-surface-elevated/50 border border-border/80 rounded-xl"
                >
                  <span className="w-6 h-6 rounded-lg bg-primary/15 text-primary font-bold text-xs flex items-center justify-center flex-shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-text-main font-medium leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Key Takeaways */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-surface border border-border rounded-2xl p-5 shadow-xs space-y-2">
              <h4 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <ThumbsUp className="w-4 h-4" /> ข้อดี / จุดเด่น (ตามสไลด์)
              </h4>
              <ul className="text-xs text-muted space-y-1.5 list-disc list-inside">
                {config.keyTakeaways.pros.map((p, i) => (
                  <li key={i} className="leading-relaxed">{p}</li>
                ))}
              </ul>
            </div>

            <div className="bg-surface border border-border rounded-2xl p-5 shadow-xs space-y-2">
              <h4 className="text-xs font-bold text-rose-500 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> ข้อจำกัด / ข้อควรระวัง
              </h4>
              <ul className="text-xs text-muted space-y-1.5 list-disc list-inside">
                {config.keyTakeaways.cons.map((c, i) => (
                  <li key={i} className="leading-relaxed">{c}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Common Mistake Alert */}
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 md:p-5 flex items-start gap-3 text-xs md:text-sm text-text-main">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <span className="font-bold text-amber-600 dark:text-amber-400">จุดที่มักเข้าใจผิดหรือออกข้อสอบบ่อย:</span>
              <p className="text-muted leading-relaxed">{config.commonMistake}</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'visualizer' && (
        <div className="space-y-6">
          <SortingVisualizer
            algorithm={config.algoType}
            defaultArray={config.lectureExample.initial}
            title={`จำลองการทำงาน: ${config.titleEn}`}
          />
        </div>
      )}

      {activeTab === 'example' && (
        <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs space-y-5">
          <div>
            <h3 className="text-base font-bold text-text-main">
              ตัวอย่างการทำงานจากสไลด์ (Lecture Walkthrough)
            </h3>
            <p className="text-xs text-muted">
              ชุดข้อมูลเริ่มต้น: [{config.lectureExample.initial.join(', ')}]
            </p>
          </div>

          <div className="space-y-3">
            {config.lectureExample.rounds.map((r, i) => (
              <div
                key={i}
                className="p-4 bg-surface-elevated/60 border border-border rounded-xl space-y-2 text-xs"
              >
                <div className="flex items-center justify-between font-bold text-text-main">
                  <span>{r.round}</span>
                </div>
                <p className="text-muted leading-relaxed">{r.explanation}</p>
                <div className="flex items-center gap-2 pt-1 font-mono">
                  <span className="text-[11px] text-muted">อาร์เรย์ผลลัพธ์:</span>
                  <div className="flex items-center gap-1.5">
                    {r.arrayAfter.map((val, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded bg-surface border border-border text-primary-dark dark:text-primary font-bold text-xs"
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'code' && (
        <div className="space-y-6">
          {/* Complexity Box */}
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-text-main flex items-center gap-2">
              <Clock className="w-5 h-5 text-primary" /> การวิเคราะห์ประสิทธิภาพ (Time Complexity)
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-surface-elevated border border-border rounded-xl space-y-1 text-center">
                <span className="text-muted">Best Case</span>
                <div className="text-base font-mono font-bold text-primary-dark dark:text-primary">
                  {config.timeComplexity.best || config.timeComplexity.summary}
                </div>
              </div>
              <div className="p-3 bg-surface-elevated border border-border rounded-xl space-y-1 text-center">
                <span className="text-muted">Average Case</span>
                <div className="text-base font-mono font-bold text-primary-dark dark:text-primary">
                  {config.timeComplexity.average || config.timeComplexity.summary}
                </div>
              </div>
              <div className="p-3 bg-surface-elevated border border-border rounded-xl space-y-1 text-center">
                <span className="text-muted">Worst Case</span>
                <div className="text-base font-mono font-bold text-primary-dark dark:text-primary">
                  {config.timeComplexity.worst || config.timeComplexity.summary}
                </div>
              </div>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              <strong>คำอธิบาย:</strong> {config.timeComplexity.explanation}
            </p>
          </div>

          {/* Pseudocode Box */}
          <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-text-main flex items-center gap-2">
                <Code2 className="w-5 h-5 text-primary" /> ขั้นตอนและโค้ดตัวอย่าง (Algorithm Implementation)
              </h3>
              <span className="text-[10px] text-muted font-mono">TypeScript / JavaScript</span>
            </div>
            <pre className="p-4 bg-surface-elevated border border-border rounded-xl text-xs font-mono overflow-x-auto text-text-main custom-scrollbar">
              <code>{config.pseudocode}</code>
            </pre>
          </div>
        </div>
      )}

      {/* Lesson Navigation Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-surface border border-border rounded-2xl">
        <div className="flex items-center gap-2 text-xs">
          {config.prevSection && (
            <button
              onClick={() => onNavigate(config.prevSection!)}
              className="px-3.5 py-2 border border-border hover:bg-surface-elevated text-muted hover:text-text-main font-semibold rounded-xl transition inline-flex items-center gap-1.5"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>บทก่อนหน้า</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          {onMarkComplete && !isCompleted && (
            <button
              onClick={onMarkComplete}
              className="px-4 py-2 border border-border hover:bg-surface-elevated text-xs font-semibold rounded-xl transition"
            >
              ทำเครื่องหมายว่าเรียนแล้ว
            </button>
          )}
          <button
            onClick={() => onNavigate(config.nextSection)}
            className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-hover transition shadow-xs inline-flex items-center gap-1.5"
          >
            <span>บทถัดไป</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
