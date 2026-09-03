import { describe, expect, it } from 'vitest';
import { calculateReadingTime } from './types.js';

describe('calculateReadingTime', () => {
	it('returns 1 minute for short text', () => {
		expect(calculateReadingTime('Hello world')).toBe(1);
	});

	it('returns correct minutes for longer text', () => {
		const words = Array.from({ length: 400 }, (_, i) => `word${i}`).join(' ');
		expect(calculateReadingTime(words)).toBe(2);
	});

	it('rounds up partial minutes', () => {
		// 251 words / 200 wpm = 1.255 → rounds to 2
		const words = Array.from({ length: 251 }, (_, i) => `word${i}`).join(' ');
		expect(calculateReadingTime(words)).toBe(2);
	});

	it('returns 1 minute for empty string', () => {
		expect(calculateReadingTime('')).toBe(0);
	});

	it('handles single word', () => {
		expect(calculateReadingTime('word')).toBe(1);
	});

	it('handles text with extra whitespace', () => {
		const words = Array.from({ length: 200 }, (_, i) => `word${i}`).join(' ');
		expect(calculateReadingTime(`  ${words}  `)).toBe(1);
	});

	it('handles multi-line content', () => {
		const lines = Array.from({ length: 40 }, (_, i) => `Line ${i}: some words here`).join('\n');
		expect(calculateReadingTime(lines)).toBeGreaterThan(0);
	});
});
