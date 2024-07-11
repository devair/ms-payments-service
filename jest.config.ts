/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type {Config} from 'jest';

const config: Config = {
  preset: "ts-jest",
  testEnvironment: 'node',  
  setupFilesAfterEnv: ['<rootDir>/src/test/setup.ts'],
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.ts$': 'ts-jest'
  },  
  coverageProvider: "v8",
  testMatch: ["**/*.spec.ts"],  
  testTimeout: 180000, 
  globalSetup: '<rootDir>/src/test/globalSetup.ts',
  globalTeardown: '<rootDir>/src/test/globalTeardown.ts',
  collectCoverage: true, // Habilita a coleta de cobertura de código
  collectCoverageFrom: ['src/**/*.{ts,js}', '!src/**/*.d.ts'], // Arquivos para coletar cobertura
  coverageDirectory: 'reports/coverage', // Diretório para salvar o relatório de cobertura    
};

export default config;
