import React from 'react';
import { Sparkles, CheckCircle2, ArrowRight, BookOpen, Layers, Zap, GitMerge, Binary, Repeat, ArrowUpDown, ArrowDownToLine } from 'lucide-react';
import { StudySection } from '../types';

interface QuickReviewProps {
  onNavigate: (section: StudySection) => void;
}

export const QuickReview: React.FC<QuickReviewProps> = ({ onNavigate }) => {
  const reviews = [
    {
      id: 'selection-sort' as StudySection,
      name: '1. Selection Sort (การเรียงแบบเลือก)',
      shortStep: 'หาค่าน้อยสุดในส่วนที่ยังไม่เรียง → สลับกับตัวแรกของส่วนนั้น',
      complexity: 'O(n²)',
      keyConcept: 'แบ่งเป็น 2 ส่วน (ส่วนที่เรียงแล้ว & ยังไม่เรียง) วนลูปหา min แล้วนำมาวางตัวแรก',
      advantage: 'ความเรียบง่าย เหมาะกับข้อมูลที่มีการเปลี่ยนแปลงน้อย',
      disadvantage: 'มีข้อจำกัดด้านประสิทธิภาพสำหรับข้อมูลขนาดใหญ่',
      slide: 'หน้า 4-12',
      icon: ArrowUpDown,
    },
    {
      id: 'bubble-sort' as StudySection,
      name: '2. Bubble Sort (การเรียงแบบฟองอากาศ)',
      shortStep: 'เปรียบเทียบคู่ติดกัน (ซ้าย > ขวา) → สลับตำแหน่ง → ตัวมากสุดลอยไปท้าย',
      complexity: 'O(n²)',
      keyConcept: 'สลับข้อมูล (Swaps) บ่อยกว่า Selection Sort แต่สามารถจบได้เร็วกว่าถ้าข้อมูลเรียงมาอยู่แล้ว (เมื่อไม่มีการสลับเลยในรอบนั้นจะหยุดทำงาน)',
      advantage: 'หยุดการทำงานได้เร็ว (Early Exit) เมื่อข้อมูลเรียงลำดับอยู่แล้ว',
      disadvantage: 'มีการสลับข้อมูลบ่อยครั้งในแต่ละรอบ',
      slide: 'หน้า 13-24',
      icon: Repeat,
    },
    {
      id: 'insertion-sort' as StudySection,
      name: '3. Insertion Sort (การเรียงแบบแทรก)',
      shortStep: 'หยิบ Key ทีละตัว → ถอยหลังเปรียบเทียบ → ขยับช่องว่าง → แทรกลงตำแหน่งถูกต้อง',
      complexity: 'O(n²)',
      keyConcept: 'เหมือน "การจัดเรียงไพ่ในมือ" เริ่มต้นส่วนที่เรียงแล้ว 1 ตัว แล้วแทรกสมาชิกที่เหลือทีละตัว',
      advantage: 'มีประสิทธิภาพสูงมากกับชุดข้อมูลขนาดเล็ก หรือชุดข้อมูลที่เกือบเรียงลำดับสมบูรณ์อยู่แล้ว',
      disadvantage: 'ถ้าข้อมูลตัวน้อยๆ อยู่ขวาสุด ต้องเสียเวลาขยับถอยหลังหลายรอบมาก',
      slide: 'หน้า 25-31',
      icon: ArrowDownToLine,
    },
    {
      id: 'shell-sort' as StudySection,
      name: '4. Shell Sort (การเรียงแบบเชลล์)',
      shortStep: 'กำหนด Gap (n/2) → สลับข้ามช่องด้วย Insertion Sort → ลด Gap ลงจนเป็น 1',
      complexity: 'O(n²) หรือ O(n^1.5)',
      keyConcept: 'Donald Shell คิดค้นเพื่อปรับปรุง Insertion Sort โดยเปรียบเทียบข้ามช่องระยะห่าง Gap ดึงตัวน้อยมาซ้ายอย่างรวดเร็ว',
      advantage: 'เร็วกว่า O(n²) ทั่วไปมาก โดยเฉพาะกับชุดข้อมูลขนาดปานกลาง และเขียนโค้ดง่ายโดยไม่ต้องใช้ Memory เพิ่ม',
      disadvantage: 'ความเร็วขึ้นอยู่กับลำดับชุดตัวเลข Gap ที่เลือกใช้',
      slide: 'หน้า 32-40',
      icon: Layers,
    },
    {
      id: 'merge-sort' as StudySection,
      name: '5. Merge Sort (การเรียงแบบผสาน)',
      shortStep: 'Divide (แบ่งครึ่งซ้ำๆ จนเหลือ 1) → Conquer → Combine/Merge (ผสานคู่ย่อย)',
      complexity: 'O(n log n) เสมอทุกกรณี',
      keyConcept: 'กลยุทธ์ Divide and Conquer แบ่งชุดข้อมูลเป็นครึ่งย่อยๆ แล้วนำกลับมารวมกันพร้อมจัดเรียงไปในตัว',
      advantage: 'ประสิทธิภาพคงที่ เสถียรสูง เหมาะกับชุดข้อมูลขนาดใหญ่มาก หรือ External Memory / Linked List',
      disadvantage: 'ต้องใช้หน่วยความจำชั่วคราวในการสร้างอาร์เรย์ย่อยสำหรับผสานข้อมูล',
      slide: 'หน้า 41-49',
      icon: GitMerge,
    },
    {
      id: 'quick-sort' as StudySection,
      name: '6. Quick Sort (การเรียงแบบเร็ว)',
      shortStep: 'เลือก Pivot → Partitioning (i หาตัว > Pivot, j หาตัว < Pivot) → สลับ Pivot กับ i → Recursion',
      complexity: 'Best/Average: O(n log n), Worst: O(n²)',
      keyConcept: 'Divide and Conquer ยอดนิยม แบ่งข้อมูลเป็น 2 ฝั่ง (น้อยกว่า Pivot ไปซ้าย มากกว่า Pivot ไปขวา)',
      advantage: 'ทำงานได้เร็วมากในสภาวะทั่วไป',
      disadvantage: 'Worst Case O(n²) เกิดขึ้นเมื่อเลือก Pivot ได้แย่ที่สุด เช่น ข้อมูลเรียงมาอยู่แล้วแต่เลือกตัวแรก/ตัวสุดท้ายเป็น Pivot เสมอ',
      slide: 'หน้า 50-62',
      icon: Zap,
    },
    {
      id: 'heap-sort' as StudySection,
      name: '7. Heap Sort (การเรียงแบบฮีป)',
      shortStep: 'Build Max-Heap → Swap Root (Max) ไปไว้ท้ายสุด → Heapify ปรับสมดุลใหม่ → ทำซ้ำ',
      complexity: 'O(n log n) เสมอทุกกรณี',
      keyConcept: 'ประยุกต์ใช้ Binary Max-Heap (โหนดพ่อ >= โหนดลูกเสมอ) ค่ามากที่สุดอยู่ที่ Root (Index 0)',
      advantage: 'Time Complexity O(n log n) เสมอทุกกรณี ไม่ขึ้นกับว่าข้อมูลจะเรียงมาแล้วหรือไม่',
      disadvantage: 'การ Heapify มีความซับซ้อนในการเข้าถึง index ในโครงสร้างต้นไม้',
      slide: 'หน้า 63-88',
      icon: Binary,
    },
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold mb-2">
            <Sparkles className="w-3.5 h-3.5" /> Quick Review Summary
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-text-main">
            สรุปหัวใจสำคัญ 7 Sorting Algorithms
          </h2>
          <p className="text-xs md:text-sm text-muted">
            ทบทวนสรุปขั้นตอนสั้น ๆ จุดเด่น ข้อเสีย และ Time Complexity ที่ระบุตามสไลด์
          </p>
        </div>
        <button
          onClick={() => onNavigate('quiz')}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white text-xs md:text-sm font-semibold rounded-xl hover:bg-primary-hover transition shadow-xs self-start md:self-auto"
        >
          ทำแบบทดสอบ 20 ข้อ <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 7 Review Cards */}
      <div className="grid grid-cols-1 gap-4">
        {reviews.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="bg-surface border border-border rounded-2xl p-5 shadow-xs hover:border-primary/40 transition space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-text-main text-sm md:text-base">{item.name}</h3>
                    <span className="text-[10px] text-muted">{item.slide}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 bg-surface-elevated border border-border rounded-lg text-xs font-mono font-bold text-primary-dark dark:text-primary">
                    {item.complexity}
                  </span>
                  <button
                    onClick={() => onNavigate(item.id)}
                    className="p-1.5 text-xs text-primary hover:text-primary-hover font-semibold inline-flex items-center gap-1"
                  >
                    <span>ดูบทเรียน</span> <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Workflow Flow Tag */}
              <div className="bg-primary-light-bg/60 border border-primary/20 rounded-xl px-3.5 py-2 text-xs font-mono text-primary-dark dark:text-primary flex items-center gap-2">
                <span className="font-bold text-xs">ขั้นตอนหลัก:</span>
                <span className="font-medium">{item.shortStep}</span>
              </div>

              {/* Detail Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
                <div className="p-3 bg-surface-elevated/40 border border-border rounded-xl space-y-1">
                  <div className="font-semibold text-text-main">หลักการสำคัญ</div>
                  <p className="text-muted leading-relaxed">{item.keyConcept}</p>
                </div>
                <div className="p-3 bg-surface-elevated/40 border border-border rounded-xl space-y-1">
                  <div className="font-semibold text-emerald-600 dark:text-emerald-400">จุดเด่น / ข้อดี</div>
                  <p className="text-muted leading-relaxed">{item.advantage}</p>
                </div>
                <div className="p-3 bg-surface-elevated/40 border border-border rounded-xl space-y-1">
                  <div className="font-semibold text-rose-500">ข้อจำกัด / ข้อเสีย</div>
                  <p className="text-muted leading-relaxed">{item.disadvantage}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
