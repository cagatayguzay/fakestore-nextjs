module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  collectCoverage: true,                // Coverage topla
  coverageDirectory: 'coverage',        // Klasör
  coverageThreshold: {                   // Minimum coverage hedefi
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
  },
  collectCoverageFrom: [                 // Hangi dosyalardan coverage alınsın
    'src/**/*.{ts,tsx,js,jsx}',
    '!src/**/*.d.ts',
    '!src/**/index.{ts,tsx,js,jsx}',
    '!src/**/__tests__/**',
    '!src/**/test-utils.{ts,tsx,js,jsx}',
  ],
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': ['babel-jest', { configFile: './.babelrc' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
