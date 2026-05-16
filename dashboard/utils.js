// AD Kill Chain Dashboard — Pure utility helpers
// Loaded as a classic script in the browser (functions become window globals);
// also exports for Node/Vitest tests via the CommonJS guard at the bottom.

function escapeHtml(str) {
  if (str == null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeUrl(url) {
  if (!url) return '#';
  const s = String(url).trim();
  if (/^(javascript|data|vbscript):/i.test(s)) return '#';
  return s;
}

function safeLoadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw == null) return fallback;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : fallback;
  } catch (err) {
    console.warn(`[safeLoadJSON] localStorage key "${key}" corrupted, resetting:`, err);
    try {
      localStorage.removeItem(key);
    } catch (_) {
      /* ignore */
    }
    return fallback;
  }
}

function getValidChecklistKeys(checklist) {
  const valid = new Set();
  if (!Array.isArray(checklist)) return valid;
  checklist.forEach((section, sIdx) => {
    if (!section || !Array.isArray(section.items)) return;
    section.items.forEach((_, iIdx) => valid.add(`${sIdx}-${iIdx}`));
  });
  return valid;
}

function pruneStaleCheckedItems(checkedItems, checklist) {
  const valid = getValidChecklistKeys(checklist);
  let changed = false;
  Object.keys(checkedItems).forEach((k) => {
    if (!valid.has(k)) {
      delete checkedItems[k];
      changed = true;
    }
  });
  return changed;
}

function computeProgress(checkedItems, checklist) {
  const totalItems = (checklist || []).reduce(
    (s, c) => s + (c && Array.isArray(c.items) ? c.items.length : 0),
    0
  );
  const valid = getValidChecklistKeys(checklist);
  const checkedCount = Object.keys(checkedItems || {}).filter((k) => valid.has(k)).length;
  const pct =
    totalItems > 0 ? Math.min(100, Math.max(0, Math.round((checkedCount / totalItems) * 100))) : 0;
  return { checkedCount, totalItems, pct };
}

// CommonJS export so Vitest can `import { ... } from '../utils.js'`.
// In the browser this block is inert (no `module` global).
if (typeof module === 'object' && module.exports) {
  module.exports = {
    escapeHtml,
    safeUrl,
    safeLoadJSON,
    getValidChecklistKeys,
    pruneStaleCheckedItems,
    computeProgress,
  };
}
