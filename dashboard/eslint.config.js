// ESLint 9 flat config for the dashboard.
// Lint targets: utils.js (CommonJS), data.js / app.js (classic browser scripts), tests/ (ESM).

const globals = require('globals');

module.exports = [
  {
    ignores: ['node_modules/**', 'bootstrap-icons.min.css', 'fonts/**', 'coverage/**'],
  },

  // data.js — top-level consts are read by app.js as cross-script globals.
  {
    files: ['data.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: { ...globals.browser },
    },
    rules: {
      eqeqeq: ['error', 'smart'],
      'no-var': 'error',
      'prefer-const': 'warn',
      // Data tables are intentionally not "used" in their own file
      'no-unused-vars': 'off',
    },
  },

  // Browser scripts: app.js
  {
    files: ['app.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        ...globals.browser,
        // Cross-script globals declared elsewhere
        CATEGORIES: 'readonly',
        CVES: 'readonly',
        TOOLS: 'readonly',
        DETECTION_EVENTS: 'readonly',
        DEFENSE_CHECKLIST: 'readonly',
        REFERENCES: 'readonly',
        // From utils.js
        escapeHtml: 'readonly',
        safeUrl: 'readonly',
        safeLoadJSON: 'readonly',
        getValidChecklistKeys: 'readonly',
        pruneStaleCheckedItems: 'readonly',
        computeProgress: 'readonly',
      },
    },
    rules: {
      eqeqeq: ['error', 'smart'],
      'no-var': 'error',
      'prefer-const': 'warn',
      'no-implicit-globals': 'off', // classic scripts intentionally use globals
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          // Functions referenced from inline onclick handlers in index.html
          // / dynamic templates appear "unused" to ESLint.
          varsIgnorePattern:
            '^(_|toggleCategory|toggleTechnique|toggleSteps|exportChecklist|expandAllCategories|collapseAllCategories|copyEventId|exportRedTeamReport)$',
          caughtErrors: 'none',
        },
      ],
      'no-undef': 'error',
    },
  },

  // utils.js — dual-target (browser globals + CJS export)
  {
    files: ['utils.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'script',
      globals: {
        ...globals.browser,
        module: 'readonly',
      },
    },
    rules: {
      eqeqeq: ['error', 'smart'],
      'no-var': 'error',
      'prefer-const': 'warn',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
        },
      ],
      'no-undef': 'error',
    },
  },

  // Vitest test files
  {
    files: ['tests/**/*.js', 'tests/**/*.mjs'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      eqeqeq: ['error', 'smart'],
      'no-var': 'error',
      'prefer-const': 'warn',
      'no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrors: 'none',
        },
      ],
    },
  },
];
