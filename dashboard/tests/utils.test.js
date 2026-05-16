import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  escapeHtml,
  safeUrl,
  safeLoadJSON,
  getValidChecklistKeys,
  pruneStaleCheckedItems,
  computeProgress,
} from '../utils.js';

describe('escapeHtml', () => {
  it('escapes the five HTML-significant characters', () => {
    expect(escapeHtml('<script>"\'&')).toBe('&lt;script&gt;&quot;&#39;&amp;');
  });

  it('returns empty string for null and undefined', () => {
    expect(escapeHtml(null)).toBe('');
    expect(escapeHtml(undefined)).toBe('');
  });

  it('coerces numbers and booleans without throwing', () => {
    expect(escapeHtml(2026)).toBe('2026');
    expect(escapeHtml(true)).toBe('true');
  });

  it('escapes ampersand before other entities (no double-escape)', () => {
    expect(escapeHtml('&amp;')).toBe('&amp;amp;');
  });

  it('neutralises an event-handler payload', () => {
    const payload = '<img src=x onerror="alert(1)">';
    const out = escapeHtml(payload);
    expect(out).not.toContain('<');
    expect(out).not.toContain('"');
  });
});

describe('safeUrl', () => {
  it('passes through http(s) URLs', () => {
    expect(safeUrl('https://example.com/x?y=1')).toBe('https://example.com/x?y=1');
    expect(safeUrl('http://example.com')).toBe('http://example.com');
  });

  it('strips javascript: URLs', () => {
    expect(safeUrl('javascript:alert(1)')).toBe('#');
    expect(safeUrl('JaVaScRiPt:alert(1)')).toBe('#');
    expect(safeUrl('  javascript:void(0)')).toBe('#');
  });

  it('strips data: and vbscript: URLs', () => {
    expect(safeUrl('data:text/html,<script>1</script>')).toBe('#');
    expect(safeUrl('vbscript:msgbox(1)')).toBe('#');
  });

  it('returns # for falsy input', () => {
    expect(safeUrl('')).toBe('#');
    expect(safeUrl(null)).toBe('#');
    expect(safeUrl(undefined)).toBe('#');
  });

  it('allows fragments and relative URLs', () => {
    expect(safeUrl('#section')).toBe('#section');
    expect(safeUrl('/path/to/file.html')).toBe('/path/to/file.html');
  });
});

describe('safeLoadJSON', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  it('returns fallback when key is missing', () => {
    expect(safeLoadJSON('missing', { a: 1 })).toEqual({ a: 1 });
  });

  it('parses valid JSON objects', () => {
    localStorage.setItem('k', JSON.stringify({ foo: 'bar' }));
    expect(safeLoadJSON('k', {})).toEqual({ foo: 'bar' });
  });

  it('returns fallback for corrupted JSON and clears the key', () => {
    localStorage.setItem('k', 'not-json{{{');
    expect(safeLoadJSON('k', { ok: true })).toEqual({ ok: true });
    expect(localStorage.getItem('k')).toBeNull();
  });

  it('rejects arrays when an object is expected', () => {
    localStorage.setItem('k', '[1,2,3]');
    expect(safeLoadJSON('k', { default: true })).toEqual({ default: true });
  });

  it('rejects primitives when an object is expected', () => {
    localStorage.setItem('k', '42');
    expect(safeLoadJSON('k', {})).toEqual({});
    localStorage.setItem('k', '"hello"');
    expect(safeLoadJSON('k', {})).toEqual({});
    localStorage.setItem('k', 'null');
    expect(safeLoadJSON('k', {})).toEqual({});
  });
});

describe('getValidChecklistKeys', () => {
  it('builds ${sIdx}-${iIdx} keys for every item', () => {
    const checklist = [{ items: [{ text: 'a' }, { text: 'b' }] }, { items: [{ text: 'c' }] }];
    const keys = getValidChecklistKeys(checklist);
    expect(keys.has('0-0')).toBe(true);
    expect(keys.has('0-1')).toBe(true);
    expect(keys.has('1-0')).toBe(true);
    expect(keys.size).toBe(3);
  });

  it('returns an empty set for non-array input', () => {
    expect(getValidChecklistKeys(null).size).toBe(0);
    expect(getValidChecklistKeys(undefined).size).toBe(0);
    expect(getValidChecklistKeys({}).size).toBe(0);
  });

  it('skips sections without an items array', () => {
    const checklist = [
      { items: [{}] },
      {
        /* no items */
      },
      { items: null },
    ];
    expect(getValidChecklistKeys(checklist).size).toBe(1);
  });
});

describe('pruneStaleCheckedItems', () => {
  it('removes keys not present in current schema', () => {
    const checked = { '0-0': true, '0-1': true, '99-99': true };
    const checklist = [{ items: [{}, {}] }];
    const changed = pruneStaleCheckedItems(checked, checklist);
    expect(changed).toBe(true);
    expect(checked).toEqual({ '0-0': true, '0-1': true });
  });

  it('returns false when nothing changes', () => {
    const checked = { '0-0': true };
    const checklist = [{ items: [{}] }];
    expect(pruneStaleCheckedItems(checked, checklist)).toBe(false);
  });

  it('handles empty inputs', () => {
    const checked = {};
    expect(pruneStaleCheckedItems(checked, [])).toBe(false);
    expect(checked).toEqual({});
  });
});

describe('computeProgress', () => {
  const checklist = [
    { items: [{}, {}] }, // keys 0-0, 0-1
    { items: [{}] }, // key 1-0
  ];

  it('counts only valid keys', () => {
    const { checkedCount, totalItems, pct } = computeProgress(
      { '0-0': true, '99-99': true },
      checklist
    );
    expect(checkedCount).toBe(1);
    expect(totalItems).toBe(3);
    expect(pct).toBe(33);
  });

  it('caps at 100% even with stale keys', () => {
    const checked = { '0-0': true, '0-1': true, '1-0': true, '99-99': true };
    expect(computeProgress(checked, checklist).pct).toBe(100);
  });

  it('returns 0% on an empty checklist', () => {
    expect(computeProgress({}, [])).toEqual({ checkedCount: 0, totalItems: 0, pct: 0 });
  });

  it('handles missing checkedItems', () => {
    expect(computeProgress({}, checklist).pct).toBe(0);
  });
});
