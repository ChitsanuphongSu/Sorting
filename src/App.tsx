import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { QuickReview } from './pages/QuickReview';
import { Fundamentals } from './pages/Fundamentals';
import { SortingLessonPage } from './pages/SortingLessonPage';
import { Comparison } from './pages/Comparison';
import { InteractiveLabs } from './pages/InteractiveLabs';
import { Quiz } from './pages/Quiz';
import { MockExam } from './pages/MockExam';
import { CommonMistakes } from './pages/CommonMistakes';
import { Reference } from './pages/Reference';
import { useUserData } from './hooks/useUserData';
import { StudySection } from './types';
import {
  selectionSortLesson,
  bubbleSortLesson,
  insertionSortLesson,
  shellSortLesson,
  mergeSortLesson,
  quickSortLesson,
  heapSortLesson,
} from './data/sortingLessons';
import { Menu, X } from 'lucide-react';

export const App: React.FC = () => {
  const [currentSection, setCurrentSection] = useState<StudySection>('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const {
    stats,
    markLessonComplete,
    recordQuizAttempt,
    recordMockExamAttempt,
    markLabComplete,
    resetAllProgress,
    setTheme,
  } = useUserData();

  const handleNavigate = (section: StudySection) => {
    setCurrentSection(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex h-screen w-full bg-bg text-text-main overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full">
        <Sidebar
          currentSection={currentSection}
          onSelectSection={handleNavigate}
          theme={stats.theme}
          onThemeChange={setTheme}
        />
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-72 h-full bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-3 flex justify-end border-b border-border">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-lg text-muted hover:text-text-main"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <Sidebar
              currentSection={currentSection}
              onSelectSection={handleNavigate}
              theme={stats.theme}
              onThemeChange={setTheme}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden p-3.5 bg-surface border-b border-border flex items-center justify-between shadow-xs">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 rounded-xl border border-border text-muted hover:text-text-main"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="font-bold text-sm text-text-main">
            Chapter 12 — Sorting Algorithms
          </div>
          <div className="w-8" />
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          {currentSection === 'dashboard' && (
            <Dashboard
              stats={stats}
              onNavigate={handleNavigate}
              onResetProgress={resetAllProgress}
            />
          )}
          {currentSection === 'quick-review' && (
            <QuickReview onNavigate={handleNavigate} />
          )}
          {currentSection === 'fundamentals' && (
            <Fundamentals
              onNavigate={handleNavigate}
              onMarkComplete={() => markLessonComplete('fundamentals')}
              isCompleted={stats.completedLessons.includes('fundamentals')}
            />
          )}

          {/* 7 Algorithm Lessons */}
          {currentSection === 'selection-sort' && (
            <SortingLessonPage
              config={selectionSortLesson}
              onNavigate={handleNavigate}
              onMarkComplete={() => markLessonComplete('selection-sort')}
              isCompleted={stats.completedLessons.includes('selection-sort')}
            />
          )}
          {currentSection === 'bubble-sort' && (
            <SortingLessonPage
              config={bubbleSortLesson}
              onNavigate={handleNavigate}
              onMarkComplete={() => markLessonComplete('bubble-sort')}
              isCompleted={stats.completedLessons.includes('bubble-sort')}
            />
          )}
          {currentSection === 'insertion-sort' && (
            <SortingLessonPage
              config={insertionSortLesson}
              onNavigate={handleNavigate}
              onMarkComplete={() => markLessonComplete('insertion-sort')}
              isCompleted={stats.completedLessons.includes('insertion-sort')}
            />
          )}
          {currentSection === 'shell-sort' && (
            <SortingLessonPage
              config={shellSortLesson}
              onNavigate={handleNavigate}
              onMarkComplete={() => markLessonComplete('shell-sort')}
              isCompleted={stats.completedLessons.includes('shell-sort')}
            />
          )}
          {currentSection === 'merge-sort' && (
            <SortingLessonPage
              config={mergeSortLesson}
              onNavigate={handleNavigate}
              onMarkComplete={() => markLessonComplete('merge-sort')}
              isCompleted={stats.completedLessons.includes('merge-sort')}
            />
          )}
          {currentSection === 'quick-sort' && (
            <SortingLessonPage
              config={quickSortLesson}
              onNavigate={handleNavigate}
              onMarkComplete={() => markLessonComplete('quick-sort')}
              isCompleted={stats.completedLessons.includes('quick-sort')}
            />
          )}
          {currentSection === 'heap-sort' && (
            <SortingLessonPage
              config={heapSortLesson}
              onNavigate={handleNavigate}
              onMarkComplete={() => markLessonComplete('heap-sort')}
              isCompleted={stats.completedLessons.includes('heap-sort')}
            />
          )}

          {/* Tools & Practice */}
          {currentSection === 'comparison' && (
            <Comparison onNavigate={handleNavigate} />
          )}
          {currentSection === 'interactive-labs' && (
            <InteractiveLabs stats={stats} onCompleteLab={markLabComplete} />
          )}
          {currentSection === 'quiz' && (
            <Quiz stats={stats} onRecordQuizAttempt={recordQuizAttempt} />
          )}
          {currentSection === 'mock-exam' && (
            <MockExam stats={stats} onRecordMockExamAttempt={recordMockExamAttempt} />
          )}

          {/* Reference */}
          {currentSection === 'common-mistakes' && (
            <CommonMistakes onNavigate={handleNavigate} />
          )}
          {currentSection === 'reference' && <Reference />}
        </main>
      </div>
    </div>
  );
};
