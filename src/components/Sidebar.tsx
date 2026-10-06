import React from 'react';
import {
  LayoutDashboard,
  Sparkles,
  BookOpen,
  ArrowUpDown,
  Repeat,
  ArrowDownToLine,
  Layers,
  GitMerge,
  Zap,
  Binary,
  GitCompare,
  FlaskConical,
  HelpCircle,
  Award,
  AlertTriangle,
  FileText,
  Sun,
  Moon,
  Laptop,
} from 'lucide-react';
import { StudySection } from '../types';

interface SidebarProps {
  currentSection: StudySection;
  onSelectSection: (section: StudySection) => void;
  theme: 'light' | 'dark' | 'system';
  onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
}

interface NavItem {
  id: StudySection;
  label: string;
  labelEn: string;
  icon: React.ComponentType<{ className?: string }>;
  group?: string;
  badge?: string;
}

const navItems: NavItem[] = [
  // Overview
  { id: 'dashboard', label: 'แดชบอร์ดบทเรียน', labelEn: 'Dashboard', icon: LayoutDashboard, group: 'OVERVIEW' },
  { id: 'quick-review', label: 'สรุปหัวใจสำคัญ', labelEn: 'Quick Review', icon: Sparkles, group: 'OVERVIEW', badge: 'Fast' },
  { id: 'fundamentals', label: 'ภาพรวมการจัดเรียง', labelEn: 'Sorting Fundamentals', icon: BookOpen, group: 'OVERVIEW' },

  // 7 Sorting Algorithms
  { id: 'selection-sort', label: '1. การเรียงแบบเลือก', labelEn: 'Selection Sort', icon: ArrowUpDown, group: 'ALGORITHMS (7 ALGORITHMS)' },
  { id: 'bubble-sort', label: '2. การเรียงแบบฟองสบู่', labelEn: 'Bubble Sort', icon: Repeat, group: 'ALGORITHMS (7 ALGORITHMS)' },
  { id: 'insertion-sort', label: '3. การเรียงแบบแทรก', labelEn: 'Insertion Sort', icon: ArrowDownToLine, group: 'ALGORITHMS (7 ALGORITHMS)' },
  { id: 'shell-sort', label: '4. การเรียงแบบเชลล์', labelEn: 'Shell Sort', icon: Layers, group: 'ALGORITHMS (7 ALGORITHMS)' },
  { id: 'merge-sort', label: '5. การเรียงแบบผสาน', labelEn: 'Merge Sort', icon: GitMerge, group: 'ALGORITHMS (7 ALGORITHMS)' },
  { id: 'quick-sort', label: '6. การเรียงแบบเร็ว', labelEn: 'Quick Sort', icon: Zap, group: 'ALGORITHMS (7 ALGORITHMS)' },
  { id: 'heap-sort', label: '7. การเรียงแบบฮีป', labelEn: 'Heap Sort', icon: Binary, group: 'ALGORITHMS (7 ALGORITHMS)' },

  // Interactive Tools & Practice
  { id: 'comparison', label: 'ตารางเปรียบเทียบ', labelEn: 'Algorithm Comparison', icon: GitCompare, group: 'TOOLS & PRACTICE' },
  { id: 'interactive-labs', label: 'แล็บทดลอง 8 ข้อ', labelEn: 'Interactive Labs', icon: FlaskConical, group: 'TOOLS & PRACTICE', badge: '8 Labs' },
  { id: 'quiz', label: 'แบบทดสอบย่อย 20 ข้อ', labelEn: 'Chapter Quiz', icon: HelpCircle, group: 'TOOLS & PRACTICE', badge: '20 Q' },
  { id: 'mock-exam', label: 'จำลองสอบเสมือนจริง', labelEn: 'Mock Exam', icon: Award, group: 'TOOLS & PRACTICE' },

  // Additional Reference
  { id: 'common-mistakes', label: 'ข้อควรระวัง & กับดักสอบ', labelEn: 'Common Mistakes', icon: AlertTriangle, group: 'REFERENCE' },
  { id: 'reference', label: 'อ้างอิงสไลด์ & สรุปสูตร', labelEn: 'Lecture Slides & Notes', icon: FileText, group: 'REFERENCE' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentSection,
  onSelectSection,
  theme,
  onThemeChange,
}) => {
  // Group navigation items
  const groups: { [key: string]: NavItem[] } = {};
  navItems.forEach((item) => {
    const g = item.group || 'GENERAL';
    if (!groups[g]) groups[g] = [];
    groups[g].push(item);
  });

  return (
    <aside className="w-64 md:w-72 bg-surface border-r border-border flex flex-col h-full flex-shrink-0 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-border flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold shadow-xs">
          <ArrowUpDown className="w-5 h-5" />
        </div>
        <div className="min-w-0">
          <h1 className="font-bold text-text-main text-sm md:text-base leading-tight truncate">
            Chapter 12 — Sorting
          </h1>
          <p className="text-xs text-muted truncate">เทคนิคการจัดเรียงข้อมูล • KKU</p>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-4 custom-scrollbar">
        {Object.entries(groups).map(([groupName, items]) => (
          <div key={groupName} className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-muted/70 uppercase">
              {groupName}
            </div>
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = currentSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectSection(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${
                    isActive
                      ? 'bg-primary text-white font-semibold shadow-xs'
                      : 'text-muted hover:text-text-main hover:bg-surface-elevated font-medium'
                  }`}
                >
                  <Icon className={`w-4 h-4 flex-shrink-0 ${isActive ? 'text-white' : 'text-primary'}`} />
                  <div className="flex flex-col min-w-0 flex-1">
                    <span className="text-xs md:text-sm truncate leading-snug">{item.label}</span>
                    <span className={`text-[10px] truncate ${isActive ? 'text-white/80' : 'text-muted'}`}>
                      {item.labelEn}
                    </span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-md font-semibold ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-primary-light-bg text-primary-dark dark:text-primary'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer / Theme Selector */}
      <div className="p-4 border-t border-border flex items-center justify-between text-xs text-muted bg-surface-elevated/40">
        <span className="text-xs font-medium">ธีมการแสดงผล</span>
        <div className="flex items-center gap-1 bg-surface border border-border p-1 rounded-lg">
          <button
            onClick={() => onThemeChange('light')}
            className={`p-1.5 rounded transition ${theme === 'light' ? 'bg-primary text-white' : 'hover:text-text-main text-muted'}`}
            title="Light Mode"
            aria-label="Light theme"
          >
            <Sun className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onThemeChange('dark')}
            className={`p-1.5 rounded transition ${theme === 'dark' ? 'bg-primary text-white' : 'hover:text-text-main text-muted'}`}
            title="Dark Mode"
            aria-label="Dark theme"
          >
            <Moon className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onThemeChange('system')}
            className={`p-1.5 rounded transition ${theme === 'system' ? 'bg-primary text-white' : 'hover:text-text-main text-muted'}`}
            title="System Mode"
            aria-label="System theme"
          >
            <Laptop className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
