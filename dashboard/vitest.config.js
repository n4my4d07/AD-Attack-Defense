// Vitest config — jsdom env so DOM-dependent helpers (safeLoadJSON via localStorage)
// can run unmodified.
module.exports = {
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.test.js'],
    globals: false,
    reporters: 'default',
  },
};
