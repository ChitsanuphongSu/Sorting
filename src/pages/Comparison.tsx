import React, { useState } from 'react';
import { GitCompare, Sparkles, Check, X, ArrowRight, ExternalLink } from 'lucide-react';
import { StudySection } from '../types';

interface ComparisonProps {
  onNavigate: (section: StudySection) => void;
}

export const Comparison: React.FC<ComparisonProps> = ({ onNavigate }) => {
  const [filter, setFilter] = useState<'all' | 'n2' | 'nlogn'>('all');

  const comparisonData = [
    {
      id: 'selection-sort' as StudySection,
      name: 'Selection Sort',
      nameTh: 'การเรียงลำดับแบบเลือก',
      paradigm: 'Iterative / Selection',
      best: 'O(n²)*',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1) In-place',
      slideComplexityNote: 'สไลด์ระบุ O(n²) เพราะต้องวนลูปค้นหาค่าน้อยที่สุดซ้ำๆ',
      highlight: 'หาค่าน้อยสุดในส่วนที่ยังไม่เรียง สลับกับตัวแรก',
      slide: 'หน้า 4',
      tag: 'n2',
    },
    {
      id: 'bubble-sort' as StudySection,
      name: 'Bubble Sort',
      nameTh: 'การเรียงลำดับแบบฟองอากาศ',
      paradigm: 'Iterative / Exchange',
      best: 'O(n) (หากไม่สลับ)*',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1) In-place',
      slideComplexityNote: 'สไลด์ระบุ O(n²) แต่จบเร็วกว่าถ้าข้อมูลเรียงมาแล้ว (สไลด์หน้า 14, 24)',
      highlight: 'เปรียบเทียบคู่ติดกัน สลับตัวมากให้ลอยไปท้าย',
      slide: 'หน้า 14',
      tag: 'n2',
    },
    {
      id: 'insertion-sort' as StudySection,
      name: 'Insertion Sort',
      nameTh: 'การเรียงลำดับแบบแทรก',
      paradigm: 'Iterative / Insertion',
      best: 'O(n)*',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1) In-place',
      slideComplexityNote: 'สไลด์ระบุ O(n²) จุดเด่นคือมีประสิทธิภาพสูงมากกับข้อมูลที่เกือบเรียงแล้ว',
      highlight: 'เหมือนเรียงไพ่ในมือ ขยับสร้างช่องว่างแล้วแทรก Key',
      slide: 'หน้า 26',
      tag: 'n2',
    },
    {
      id: 'shell-sort' as StudySection,
      name: 'Shell Sort',
      nameTh: 'การเรียงลำดับแบบเชลล์',
      paradigm: 'Diminishing Increment',
      best: 'ไม่ได้ระบุในสไลด์',
      average: 'O(n²) หรือ O(n^1.5)',
      worst: 'O(n²)',
      space: 'O(1) In-place',
      slideComplexityNote: 'สไลด์ระบุ: "Time Complexity O(n^2) หรือ O(n^1.5) ขึ้นอยู่กับชุดตัวเลข Gap ที่เลือกใช้"',
      highlight: 'ปรับปรุง Insertion Sort โดยเปรียบเทียบข้ามช่องตามระยะ Gap',
      slide: 'หน้า 33',
      tag: 'n2',
    },
    {
      id: 'merge-sort' as StudySection,
      name: 'Merge Sort',
      nameTh: 'การเรียงลำดับแบบผสาน',
      paradigm: 'Divide and Conquer',
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'ต้องใช้ Memory ชั่วคราว',
      slideComplexityNote: 'สไลด์ระบุ: "O(n log n) เสมอทุกกรณี ไม่ว่าข้อมูลจะเรียงมาแล้วหรือไม่ก็ตาม"',
      highlight: 'แบ่งครึ่งย่อยๆ จนเหลือ 1 แล้วผสาน (Merge) กลับ',
      slide: 'หน้า 42',
      tag: 'nlogn',
    },
    {
      id: 'quick-sort' as StudySection,
      name: 'Quick Sort',
      nameTh: 'การเรียงลำดับแบบเร็ว',
      paradigm: 'Divide and Conquer',
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)',
      space: 'O(1) In-place',
      slideComplexityNote: 'สไลด์ระบุ: Best/Avg: O(n log n), Worst: O(n²) เกิดเมื่อเลือก Pivot ได้แย่ที่สุด',
      highlight: 'เลือก Pivot แล้วแบ่งกลุ่มย่อยซ้าย-ขวาด้วยตัวชี้ i, j',
      slide: 'หน้า 51',
      tag: 'nlogn',
    },
    {
      id: 'heap-sort' as StudySection,
      name: 'Heap Sort',
      nameTh: 'การเรียงลำดับแบบฮีป',
      paradigm: 'Binary Heap / Selection',
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(1) In-place',
      slideComplexityNote: 'สไลด์ระบุ: "O(n log n) เสมอทุกกรณี ไม่ขึ้นกับว่าข้อมูลจะเรียงมาแล้วหรือไม่"',
      highlight: 'ประยุกต์ Binary Max-Heap ดึงตัวมากสุดที่ Root ไปไว้ท้าย แล้ว Heapify',
      slide: 'หน้า 65',
      tag: 'nlogn',
    },
  ];

  const filteredData = filter === 'all'
    ? comparisonData
    : comparisonData.filter((item) => item.tag === filter);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-border pb-4 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
          <GitCompare className="w-3.5 h-3.5" /> Comprehensive Algorithm Comparison
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-text-main">
          ตารางเปรียบเทียบ 7 Sorting Algorithms
        </h2>
        <p className="text-xs md:text-sm text-muted leading-relaxed">
          เปรียบเทียบแนวคิดหลัก Time Complexity ตามที่ระบุในสไลด์ และความเหมาะสมในการนำไปใช้งาน
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
            filter === 'all'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-surface border border-border text-muted hover:text-text-main'
          }`}
        >
          ทั้งหมด (7 Algorithms)
        </button>
        <button
          onClick={() => setFilter('n2')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
            filter === 'n2'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-surface border border-border text-muted hover:text-text-main'
          }`}
        >
          กลุ่ม O(n²) / Iterative
        </button>
        <button
          onClick={() => setFilter('nlogn')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
            filter === 'nlogn'
              ? 'bg-primary text-white shadow-xs'
              : 'bg-surface border border-border text-muted hover:text-text-main'
          }`}
        >
          กลุ่ม O(n log n) / Divide & Conquer & Tree
        </button>
      </div>

      {/* Comparison Table */}
      <div className="bg-surface border border-border rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-surface-elevated text-muted uppercase font-bold border-b border-border">
              <tr>
                <th className="px-4 py-3.5">อัลกอริทึม</th>
                <th className="px-4 py-3.5">หลักการสำคัญ</th>
                <th className="px-3 py-3.5 text-center">Best Case</th>
                <th className="px-3 py-3.5 text-center">Average Case</th>
                <th className="px-3 py-3.5 text-center">Worst Case</th>
                <th className="px-4 py-3.5">หมายเหตุตามสไลด์</th>
                <th className="px-3 py-3.5 text-center">การกระทำ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredData.map((row) => (
                <tr key={row.id} className="hover:bg-surface-elevated/40 transition">
                  <td className="px-4 py-3.5 font-bold text-text-main whitespace-nowrap">
                    <div>{row.name}</div>
                    <div className="text-[11px] font-normal text-muted">{row.nameTh}</div>
                  </td>
                  <td className="px-4 py-3.5 text-text-main max-w-xs leading-relaxed">
                    {row.highlight}
                  </td>
                  <td className="px-3 py-3.5 text-center font-mono font-semibold text-emerald-600 dark:text-emerald-400">
                    {row.best}
                  </td>
                  <td className="px-3 py-3.5 text-center font-mono font-bold text-primary-dark dark:text-primary">
                    {row.average}
                  </td>
                  <td className="px-3 py-3.5 text-center font-mono font-semibold text-rose-500">
                    {row.worst}
                  </td>
                  <td className="px-4 py-3.5 text-[11px] text-muted max-w-xs leading-relaxed">
                    <span className="font-semibold text-text-main">({row.slide})</span> {row.slideComplexityNote}
                  </td>
                  <td className="px-3 py-3.5 text-center whitespace-nowrap">
                    <button
                      onClick={() => onNavigate(row.id)}
                      className="px-2.5 py-1 bg-primary/10 hover:bg-primary/20 text-primary-dark dark:text-primary font-semibold rounded-lg text-xs transition"
                    >
                      ดูบทเรียน
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Note Callout */}
      <div className="p-4 bg-primary-light-bg/50 border border-primary/20 rounded-2xl text-xs text-text-main space-y-1">
        <div className="font-bold text-primary-dark dark:text-primary">
          💡 สรุปเกณฑ์การเลือกใช้อัลกอริทึมจากสไลด์:
        </div>
        <p className="text-muted leading-relaxed">
          • <strong>ข้อมูลขนาดเล็ก หรือเกือบเรียงแล้ว:</strong> เลือก <strong>Insertion Sort</strong> มีประสิทธิภาพสูงมาก<br />
          • <strong>ต้องการความเสถียรและแน่นอน O(n log n) เสมอ หรือใช้กับ External Storage:</strong> เลือก <strong>Merge Sort</strong><br />
          • <strong>ต้องการความเร็วเฉลี่ยสูงและใช้พื้นที่ In-place:</strong> เลือก <strong>Quick Sort</strong> หรือ <strong>Heap Sort</strong>
        </p>
      </div>
    </div>
  );
};
