module.exports = {
  root: true,
  extends: ['@repo/eslint-config/library.js'],
  settings: {
    'import/resolver': {
      typescript: {
        project: ['apps/*/tsconfig.json', 'packages/*/tsconfig.json'],
      },
    },
  },
}
