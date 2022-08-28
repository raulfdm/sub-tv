module.exports = {
  release: {
    branches: ['master', { name: 'setup-semantic-release', prerelease: true }],
  },
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    '@semantic-release/npm',
    '@semantic-release/git',
    [
      '@semantic-release/github',
      {
        assets: ['dist/**'],
      },
    ],
  ],
};
