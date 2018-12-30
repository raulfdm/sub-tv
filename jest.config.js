module.exports = {
  verbose: true,
  testEnvironment: 'node',
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  coverageReporters: ['none'],
};
