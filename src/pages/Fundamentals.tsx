import React from 'react';
import { BookOpen, CheckCircle2, ArrowRight, Layers, Cpu, Database, ExternalLink } from 'lucide-react';
import { StudySection } from '../types';

interface FundamentalsProps {
  onNavigate: (section: StudySection) => void;
  onMarkComplete?: () => void;
  isCompleted?: boolean;
}

export const Fundamentals: React.FC<FundamentalsProps> = ({
  onNavigate,
  onMarkComplete,
  isCompleted,
}) => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-border pb-4 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" /> ภาพรวม & ความรู้พื้นฐาน
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-text-main">
          เทคนิคการจัดเรียงข้อมูล (Sorting Algorithms)
        </h2>
        <p className="text-xs md:text-sm text-muted leading-relaxed">
          การจัดเรียงข้อมูลเป็นหนึ่งในกระบวนการพื้นฐานที่สำคัญที่สุดในวิทยาการคอมพิวเตอร์และโครงสร้างข้อมูล
          เพื่อช่วยให้การค้นหา (Searching) และการประมวลผลข้อมูลชุดใหญ่ทำได้อย่างรวดเร็วและมีประสิทธิภาพสูงสุด
        </p>
      </div>

      {/* 7 Algorithms Summary Table Card */}
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-text-main flex items-center gap-2">
            <Layers className="w-4 h-4 text-primary" /> สรุป 7 อัลกอริทึมที่เรียนใน Chapter 12
          </h3>
          <a
            href="/lecture.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-primary hover:underline inline-flex items-center gap-1"
          >
            <span>ดูสไลด์ PDF</span> <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-surface-elevated text-muted uppercase font-bold border-b border-border">
              <tr>
                <th className="px-4 py-3">ลำดับ</th>
                <th className="px-4 py-3">ชื่ออัลกอริทึม</th>
                <th className="px-4 py-3">ชื่อภาษาไทย</th>
                <th className="px-4 py-3">หลักการทำงานหลัก</th>
                <th className="px-4 py-3">Time Complexity ในสไลด์</th>
                <th className="px-4 py-3">หน้าสไลด์</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-surface-elevated/40">
                <td className="px-4 py-3 font-bold text-primary">1</td>
                <td className="px-4 py-3 font-semibold text-text-main">Selection Sort</td>
                <td className="px-4 py-3 text-muted">การเรียงลำดับแบบเลือก</td>
                <td className="px-4 py-3 text-text-main">หาค่าน้อยสุดในส่วนยังไม่เรียง สลับกับตัวแรก</td>
                <td className="px-4 py-3 font-mono text-primary-dark dark:text-primary">O(n²)</td>
                <td className="px-4 py-3 text-muted">3–12</td>
              </tr>
              <tr className="hover:bg-surface-elevated/40">
                <td className="px-4 py-3 font-bold text-primary">2</td>
                <td className="px-4 py-3 font-semibold text-text-main">Bubble Sort</td>
                <td className="px-4 py-3 text-muted">การเรียงลำดับแบบฟองอากาศ</td>
                <td className="px-4 py-3 text-text-main">เปรียบเทียบคู่ติดกัน สลับตัวมากให้ลอยไปท้าย</td>
                <td className="px-4 py-3 font-mono text-primary-dark dark:text-primary">O(n²)</td>
                <td className="px-4 py-3 text-muted">13–24</td>
              </tr>
              <tr className="hover:bg-surface-elevated/40">
                <td className="px-4 py-3 font-bold text-primary">3</td>
                <td className="px-4 py-3 font-semibold text-text-main">Insertion Sort</td>
                <td className="px-4 py-3 text-muted">การเรียงลำดับแบบแทรก</td>
                <td className="px-4 py-3 text-text-main">จัดเรียงไพ่ในมือ ขยับสร้างช่องว่างแล้วแทรก Key</td>
                <td className="px-4 py-3 font-mono text-primary-dark dark:text-primary">O(n²)</td>
                <td className="px-4 py-3 text-muted">25–31</td>
              </tr>
              <tr className="hover:bg-surface-elevated/40">
                <td className="px-4 py-3 font-bold text-primary">4</td>
                <td className="px-4 py-3 font-semibold text-text-main">Shell Sort</td>
                <td className="px-4 py-3 text-muted">การเรียงลำดับแบบเชลล์</td>
                <td className="px-4 py-3 text-text-main">ปรับปรุง Insertion Sort โดยข้ามช่องตามระยะ Gap</td>
                <td className="px-4 py-3 font-mono text-primary-dark dark:text-primary">O(n²) หรือ O(n^1.5)</td>
                <td className="px-4 py-3 text-muted">32–40</td>
              </tr>
              <tr className="hover:bg-surface-elevated/40">
                <td className="px-4 py-3 font-bold text-primary">5</td>
                <td className="px-4 py-3 font-semibold text-text-main">Merge Sort</td>
                <td className="px-4 py-3 text-muted">การเรียงลำดับแบบผสาน</td>
                <td className="px-4 py-3 text-text-main">Divide and Conquer แบ่งครึ่งย่อยๆ จนเหลือ 1 แล้วรวมกลับ</td>
                <td className="px-4 py-3 font-mono text-primary-dark dark:text-primary">O(n log n) เสมอ</td>
                <td className="px-4 py-3 text-muted">41–49</td>
              </tr>
              <tr className="hover:bg-surface-elevated/40">
                <td className="px-4 py-3 font-bold text-primary">6</td>
                <td className="px-4 py-3 font-semibold text-text-main">Quick Sort</td>
                <td className="px-4 py-3 text-muted">การเรียงลำดับแบบเร็ว</td>
                <td className="px-4 py-3 text-text-main">Divide and Conquer เลือก Pivot จัดกลุ่มซ้าย-ขวาด้วย i, j</td>
                <td className="px-4 py-3 font-mono text-primary-dark dark:text-primary">Best O(n log n), Worst O(n²)</td>
                <td className="px-4 py-3 text-muted">50–62</td>
              </tr>
              <tr className="hover:bg-surface-elevated/40">
                <td className="px-4 py-3 font-bold text-primary">7</td>
                <td className="px-4 py-3 font-semibold text-text-main">Heap Sort</td>
                <td className="px-4 py-3 text-muted">การเรียงลำดับแบบฮีป</td>
                <td className="px-4 py-3 text-text-main">ประยุกต์ Max-Heap สลับตัวมากสุดที่ Root ไปไว้ท้าย แล้ว Heapify</td>
                <td className="px-4 py-3 font-mono text-primary-dark dark:text-primary">O(n log n) เสมอ</td>
                <td className="px-4 py-3 text-muted">63–88</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Two Paradigms: Simple O(n^2) vs Divide and Conquer / Tree-based */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-surface border border-border rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Cpu className="w-4 h-4" /> กลุ่มอัลกอริทึมพื้นฐาน (Iterative / Simple)
          </div>
          <p className="text-xs text-muted leading-relaxed">
            ประกอบด้วย <strong>Selection Sort, Bubble Sort, และ Insertion Sort</strong> (รวมถึงการปรับปรุงเป็น <strong>Shell Sort</strong>)
            ทำงานโดยการวนลูปซ้ำ ๆ เหมาะสำหรับข้อมูลขนาดเล็ก หรือเขียนโปรแกรมแบบเข้าใจง่าย
          </p>
        </div>

        <div className="bg-surface border border-border rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-primary font-bold text-sm">
            <Database className="w-4 h-4" /> กลุ่มแบ่งแยกเอาชนะ & โครงสร้างต้นไม้
          </div>
          <p className="text-xs text-muted leading-relaxed">
            ประกอบด้วย <strong>Merge Sort, Quick Sort (Divide and Conquer)</strong> และ <strong>Heap Sort (Binary Tree)</strong>
            ให้ประสิทธิภาพสูงระดับ <strong>O(n log n)</strong> เหมาะสำหรับข้อมูลขนาดใหญ่ และการประมวลผลข้อมูลในระดับอุตสาหกรรม
          </p>
        </div>
      </div>

      {/* Mark Complete & Next Action */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-5 bg-surface border border-border rounded-2xl">
        <div className="flex items-center gap-2 text-xs text-muted">
          {isCompleted ? (
            <span className="text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> คุณเรียนหัวข้อนี้แล้ว
            </span>
          ) : (
            <span>คลิกเพื่อบันทึกความก้าวหน้า</span>
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
            onClick={() => onNavigate('selection-sort')}
            className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-hover transition shadow-xs inline-flex items-center gap-1.5"
          >
            <span>เริ่มบทที่ 1: Selection Sort</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
