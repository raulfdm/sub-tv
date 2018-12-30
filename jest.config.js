module.exports = {
  testEnvironment: 'node',
  verbose: true,
  collectCoverageFrom: 'src/**/*.js',
  transform: {
    '^.+\\.js?$': 'babel-jest',
  },
  coverageReporters: ['none'],
};
