import { describe, it, expect, beforeEach } from 'vitest';
import { practiceQuestionsBank, labChallengesBank } from './sortingData';

describe('Sorting Questions Bank & Labs Validation', () => {
  it('contains at least 20 questions in quiz bank', () => {
    expect(practiceQuestionsBank.length).toBeGreaterThanOrEqual(20);
  });

  it('covers all 7 sorting algorithms in questions', () => {
    const requiredAlgos = ['selection', 'bubble', 'insertion', 'shell', 'merge', 'quick', 'heap'];
    const presentAlgos = new Set(practiceQuestionsBank.map((q) => q.algorithm));
    requiredAlgos.forEach((algo) => {
      expect(presentAlgos.has(algo as any)).toBe(true);
    });
  });

  it('ensures all questions have valid options and correct answer index within bounds', () => {
    practiceQuestionsBank.forEach((q) => {
      expect(q.options.length).toBeGreaterThanOrEqual(2);
      expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
      expect(q.correctAnswer).toBeLessThan(q.options.length);
      expect(q.explanation.length).toBeGreaterThan(10);
      expect(q.sourceSlide.length).toBeGreaterThan(0);
    });
  });

  it('contains 8 comprehensive interactive labs', () => {
    expect(labChallengesBank.length).toBe(8);
    labChallengesBank.forEach((lab) => {
      expect(lab.title.length).toBeGreaterThan(0);
      expect(lab.taskPrompt.length).toBeGreaterThan(0);
      expect(lab.correctOptionIndex).toBeDefined();
      expect(lab.options?.length).toBeGreaterThanOrEqual(2);
    });
  });
});
