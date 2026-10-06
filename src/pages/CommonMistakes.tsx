import React from 'react';
import { AlertTriangle, CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { StudySection } from '../types';

interface CommonMistakesProps {
  onNavigate: (section: StudySection) => void;
}

export const CommonMistakes: React.FC<CommonMistakesProps> = ({ onNavigate }) => {
  const mistakes = [
    {
      title: 'สับสนจำนวนครั้งในการสลับ (Swaps) ระหว่าง Selection Sort กับ Bubble Sort',
      wrong: 'คิดว่า Selection Sort มีการสลับตำแหน่งตลอดเวลาเหมือน Bubble Sort',
      correct: 'Selection Sort จะวนลูปหาค่าน้อยที่สุดก่อน แล้วจึง "สลับเพียงครั้งเดียวต่อหนึ่งรอบ" ส่วน Bubble Sort จะสลับทันทีที่พบคู่ติดกันที่ซ้ายมากกว่าขวา',
      slide: 'สไลด์หน้า 4, 14',
      section: 'selection-sort' as StudySection,
    },
    {
      title: 'ลืมเงื่อนไข Early Exit ของ Bubble Sort',
      wrong: 'คิดว่า Bubble Sort ต้องรันครบ n-1 รอบเสมอทุกกรณี',
      correct: 'สไลด์หน้า 24 ระบุชัดเจนว่า "เมื่อไม่มีการสลับตำแหน่งเลยทั้งรอบ จะหยุดการทำงานทันที" ทำให้ทำงานเร็วมากใน Best Case O(n)',
      slide: 'สไลด์หน้า 24',
      section: 'bubble-sort' as StudySection,
    },
    {
      title: 'ทิศทางการเปรียบเทียบใน Insertion Sort',
      wrong: 'นำ Key ไปเปรียบเทียบจากซ้ายไปขวา (จากน้อยไปมาก)',
      correct: 'สไลด์หน้า 27 ข้อ 3 ระบุว่า: "นำ Key ไปเปรียบเทียบกับข้อมูลในส่วนที่เรียงลำดับแล้ว โดยไล่เปรียบเทียบจาก ขวาไปซ้าย (จากค่ามากไปน้อย)" แล้วขยับตัวที่มากกว่า Key ไปทางขวา',
      slide: 'สไลด์หน้า 27',
      section: 'insertion-sort' as StudySection,
    },
    {
      title: 'เข้าใจผิดเรื่องการคิดค่า Gap ใน Shell Sort',
      wrong: 'คิดว่า Gap คือระยะห่างคงที่ หรือใช้เลขสุ่ม',
      correct: 'ตามสไลด์หน้า 34: เริ่มต้นด้วย Gap = ⌊n/2⌋ และในรอบถัดไปลดค่า Gap ลงครึ่งหนึ่ง ⌊Gap/2⌋ จนกระทั่งรอบสุดท้าย Gap = 1',
      slide: 'สไลด์หน้า 34',
      section: 'shell-sort' as StudySection,
    },
    {
      title: 'การดึงข้อมูลในขั้นตอน Merge ของ Merge Sort',
      wrong: 'นำข้อมูลทั้งหมดมาเปรียบเทียบหาตัวน้อยสุดเหมือน Selection Sort',
      correct: 'สไลด์หน้า 45-46: ในการ Merge จะเปรียบเทียบเฉพาะ "ตัวหน้าสุด (i และ j)" ของสองกลุ่มย่อยที่เรียงแล้วเท่านั้น แล้วดึงตัวที่น้อยกว่าลงมาวาง',
      slide: 'สไลด์หน้า 45-46',
      section: 'merge-sort' as StudySection,
    },
    {
      title: 'จุดสิ้นสุดของ Partition ใน Quick Sort (การวาง Pivot)',
      wrong: 'สลับ Pivot กับตัวสุดท้าย หรือสลับกับค่า j',
      correct: 'สไลด์หน้า 54 ข้อ 2.4: เมื่อ i และ j หยุดแล้ว "ถ้า i > j ให้หยุด แล้วทำการสลับค่า pivot กับค่าที่ตำแหน่ง i และจบรอบการทำงาน" Pivot จะอยู่ในตำแหน่งที่ถูกต้องสมบูรณ์',
      slide: 'สไลด์หน้า 54',
      section: 'quick-sort' as StudySection,
    },
    {
      title: 'ชนิดของ Heap ในการเรียงจากน้อยไปมาก (Heap Sort)',
      wrong: 'คิดว่าการเรียงจาก "น้อยไปมาก" ต้องใช้ Min-Heap',
      correct: 'สไลด์หน้า 64-65 ระบุชัดเจนว่า "ในการเรียงลำดับจากน้อยไปมาก เราจะใช้ Max-Heap" เพราะเมื่อดึงตัวมากสุดที่ Root ไปไว้ท้ายสุด อาร์เรย์จะเรียงจากน้อยไปมาก',
      slide: 'สไลด์หน้า 64-65',
      section: 'heap-sort' as StudySection,
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-border pb-4 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full text-xs font-semibold">
          <AlertTriangle className="w-3.5 h-3.5" /> Common Pitfalls & Traps
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-text-main">
          ข้อควรระวัง & จุดที่มักสับสนในข้อสอบ
        </h2>
        <p className="text-xs md:text-sm text-muted">
          รวบรวมประเด็นสำคัญที่นักศึกษามักจำสลับหรือทำผิดบ่อย พร้อมคำอธิบายที่ถูกต้องตามสไลด์
        </p>
      </div>

      {/* Mistake Cards */}
      <div className="space-y-4">
        {mistakes.map((m, idx) => (
          <div
            key={idx}
            className="bg-surface border border-border rounded-2xl p-5 shadow-xs space-y-3"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-text-main text-xs md:text-sm flex items-center gap-2">
                <span className="w-6 h-6 rounded-lg bg-amber-500/15 text-amber-600 font-bold text-xs flex items-center justify-center">
                  {idx + 1}
                </span>
                {m.title}
              </h3>
              <span className="text-[10px] text-muted">{m.slide}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl space-y-1">
                <div className="font-bold text-rose-600 flex items-center gap-1">
                  <XCircle className="w-3.5 h-3.5" /> สิ่งที่มักเข้าใจผิด
                </div>
                <p className="text-muted leading-relaxed">{m.wrong}</p>
              </div>

              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl space-y-1">
                <div className="font-bold text-emerald-600 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> สิ่งที่ถูกต้องตามสไลด์
                </div>
                <p className="text-text-main font-medium leading-relaxed">{m.correct}</p>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                onClick={() => onNavigate(m.section)}
                className="text-xs text-primary hover:text-primary-hover font-semibold inline-flex items-center gap-1"
              >
                <span>ทบทวนในบทเรียน</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
