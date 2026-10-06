import React from 'react';
import { FileText, Download, ExternalLink, BookOpen, Layers } from 'lucide-react';

export const Reference: React.FC = () => {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-border pb-4 space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" /> Lecture Notes & Sources
        </div>
        <h2 className="text-2xl md:text-3xl font-bold text-text-main">
          เอกสารอ้างอิง & แหล่งที่มา (Reference)
        </h2>
        <p className="text-xs md:text-sm text-muted leading-relaxed">
          เนื้อหา อัลกอริทึม ลำดับขั้นตอน และตัวอย่างอาร์เรย์ทั้งหมดในเว็บไซต์นี้ อ้างอิงตรงจากเอกสารประกอบการสอน
          วิชา Data Structure มหาวิทยาลัยขอนแก่น
        </p>
      </div>

      {/* PDF Download / View Card */}
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-bold text-text-main text-sm md:text-base">
              Chapter 12 Sorting Algorithm.pdf
            </h3>
            <p className="text-xs text-muted">
              ผศ. ดร. สิลดา อินทรโสธรฉันท์ • วิทยาการคอมพิวเตอร์ มหาวิทยาลัยขอนแก่น (88 หน้า)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/lecture.pdf"
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-primary text-white text-xs font-semibold rounded-xl hover:bg-primary-hover transition shadow-xs inline-flex items-center gap-1.5"
          >
            <span>เปิดอ่านในแท็บใหม่</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Mapping Outline Card */}
      <div className="bg-surface border border-border rounded-2xl p-6 shadow-xs space-y-4">
        <h3 className="text-base font-bold text-text-main flex items-center gap-2">
          <Layers className="w-4 h-4 text-primary" /> สารบัญและโครงสร้างเนื้อหาตามสไลด์
        </h3>
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-surface-elevated rounded-xl flex items-center justify-between">
            <span className="font-bold text-text-main">1. การเรียงลำดับแบบเลือก (Selection Sort)</span>
            <span className="text-muted font-mono">สไลด์หน้า 3–12</span>
          </div>
          <div className="p-3 bg-surface-elevated rounded-xl flex items-center justify-between">
            <span className="font-bold text-text-main">2. การเรียงลำดับแบบฟองอากาศ (Bubble Sort)</span>
            <span className="text-muted font-mono">สไลด์หน้า 13–24</span>
          </div>
          <div className="p-3 bg-surface-elevated rounded-xl flex items-center justify-between">
            <span className="font-bold text-text-main">3. การเรียงลำดับแบบแทรก (Insertion Sort)</span>
            <span className="text-muted font-mono">สไลด์หน้า 25–31</span>
          </div>
          <div className="p-3 bg-surface-elevated rounded-xl flex items-center justify-between">
            <span className="font-bold text-text-main">4. การเรียงลำดับแบบเชลล์ (Shell Sort)</span>
            <span className="text-muted font-mono">สไลด์หน้า 32–40</span>
          </div>
          <div className="p-3 bg-surface-elevated rounded-xl flex items-center justify-between">
            <span className="font-bold text-text-main">5. การเรียงลำดับแบบผสาน (Merge Sort)</span>
            <span className="text-muted font-mono">สไลด์หน้า 41–49</span>
          </div>
          <div className="p-3 bg-surface-elevated rounded-xl flex items-center justify-between">
            <span className="font-bold text-text-main">6. การเรียงลำดับแบบเร็ว (Quick Sort)</span>
            <span className="text-muted font-mono">สไลด์หน้า 50–62</span>
          </div>
          <div className="p-3 bg-surface-elevated rounded-xl flex items-center justify-between">
            <span className="font-bold text-text-main">7. การเรียงลำดับแบบฮีป (Heap Sort)</span>
            <span className="text-muted font-mono">สไลด์หน้า 63–88</span>
          </div>
        </div>
      </div>
    </div>
  );
};
