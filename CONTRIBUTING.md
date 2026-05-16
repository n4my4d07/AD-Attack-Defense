# Contributing to AD-Attack-Defense

Thanks for taking the time to contribute. This project is a static, single-page
AD Kill Chain reference dashboard — no backend, no build step. Everything ships
straight to the browser, so changes are easy to review and easy to break.

## Quick start

```bash
cd dashboard
npm install
npm start          # serves http://localhost:3000
```

Open `http://localhost:3000` and edit any of `index.html`, `app.js`, `data.js`,
`style.css`, `utils.js` — refresh the browser to see changes.

## Quality gates

Before opening a pull request, run all three locally:

```bash
cd dashboard
npm run lint          # ESLint (0 warnings expected)
npm run format:check  # Prettier
npm test              # Vitest unit tests
```

CI runs the same three commands on every PR that touches `dashboard/**`.
Auto-format with `npm run format` and auto-fix lint with `npm run lint:fix`.

## File layout

```
dashboard/
  index.html         Static markup, ARIA roles, script load order
  utils.js           Pure helpers (escapeHtml, safeUrl, safeLoadJSON, progress)
  data.js            All content: CATEGORIES, CVES, TOOLS, DETECTION_EVENTS,
                     DEFENSE_CHECKLIST, REFERENCES (read at runtime as globals)
  app.js             Application logic: i18n, render functions, event delegation
  style.css          Theme tokens + component styles
  tests/             Vitest unit tests for utils.js
```

`utils.js`, `data.js`, and `app.js` are loaded as classic browser scripts in
that order. `utils.js` also exports via CommonJS so the test suite can import
its pure helpers.

## Adding content

All user-facing strings are tri-lingual `{ zh, en, ja }` objects. New entries
must include all three languages.

### Add a CVE (`data.js → CVES`)

```js
{
  id: 'CVE-2024-XXXXX',
  name: 'Short vulnerability name',
  year: 2024,
  severity: 'critical',         // 'critical' | 'high' | 'medium'
  category: 'privesc',          // must match a CATEGORIES.id
  description: {
    zh: '中文描述',
    en: 'English description',
    ja: '日本語の説明',
  },
  tools: ['Tool1', 'Tool2'],
  url: 'https://msrc.microsoft.com/.../advisory',
}
```

### Add a tool (`data.js → TOOLS`)

```js
{
  name: 'ToolName',
  type: 'offensive',            // 'offensive' | 'defensive' | 'audit' | 'azure'
  description: { zh, en, ja },
  tags: ['kerberos', 'ldap'],
  url: 'https://github.com/.../...',
}
```

### Add a detection event (`data.js → DETECTION_EVENTS`)

```js
{
  attack: 'Kerberoasting',
  category: 'credential',
  eventIds: ['4769', '4624'],
  descriptions: [
    { zh: '描述', en: 'Description', ja: '説明' },
  ],
}
```

### Add a defense checklist item (`data.js → DEFENSE_CHECKLIST`)

```js
{
  category: { zh, en, ja },
  priority: 'critical',         // 'critical' | 'high' | 'medium'
  items: [
    {
      text: { zh, en, ja },
      detail: { zh, en, ja },   // optional
      steps: [                  // optional, shown under "Config Steps"
        { type: 'info', text: { zh, en, ja } },
        { type: 'cmd',  text: 'Set-ADAccount ...' },
        { type: 'warn', text: { zh, en, ja } },
      ],
    },
  ],
}
```

**Note**: `DEFENSE_CHECKLIST` items are tracked in `localStorage` by their
`${sectionIndex}-${itemIndex}` position. Reordering or removing items will
invalidate users' progress for those keys — `pruneStaleCheckedItems` cleans
this up on next load, but consider whether you want to preserve checkboxes
before doing a large reshuffle.

## Security guidelines

This dashboard renders `data.js` content via `innerHTML` template literals, so
every dynamic value must pass through one of:

- `escapeHtml(val)` — for plain text and HTML attribute values
- `de(val)` — for tri-lingual `{ zh, en, ja }` objects (resolves language + escapes)
- `safeUrl(url)` — for any URL inserted into `href=`

Never interpolate user / data values directly:

```js
// Bad — injection vector
container.innerHTML = `<div title="${cve.name}">${cve.description}</div>`;

// Good
container.innerHTML = `<div title="${escapeHtml(cve.name)}">${de(cve.description)}</div>`;
```

Inline `onclick="foo('${id}')"` is also forbidden — use event delegation with
`data-*` attributes instead (`data-event-id`, `data-checklist-key`, etc.) and
bind the listener once in `bindEvents()`.

## Accessibility expectations

- New interactive elements must be keyboard reachable. Use `<button>`, not
  `<div onclick>`.
- Tab panes follow the WAI-ARIA tabs pattern (`role="tab/tablist/tabpanel"`,
  `aria-selected`, `aria-controls`, roving `tabindex`).
- Buttons used as toggles get `aria-pressed`; checkbox-like controls get
  `role="checkbox" aria-checked`.
- Toast notifications use `role="status" aria-live="polite"`.
- All decorative `<i class="bi …">` icons get `aria-hidden="true"`.

## Commit messages

We follow the conventional-commit style loosely:

```
feat(a11y): add WAI-ARIA tab pattern
fix(security): escape CVE name in tooltip
docs: update CONTRIBUTING with detection event schema
```

Prefer one logical change per commit. Reformatting churn should live in its own
commit so review stays readable.

## Reporting issues

Open a GitHub issue with:

- A short reproduction (which tab, what you clicked, what you saw)
- Browser + OS
- Console output if any
- For data accuracy issues: include a citation (MSRC, vendor blog, CVE entry)
