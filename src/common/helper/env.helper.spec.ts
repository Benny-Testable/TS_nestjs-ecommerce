import { resolve } from 'path';
import { getEnvPath } from './env.helper';

describe('getEnvPath', () => {
  const dest = resolve(__dirname, '../envs');
  const previousEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = previousEnv;
  });

  it('loads test.env while tests run', () => {
    process.env.NODE_ENV = 'test';
    expect(getEnvPath(dest)).toBe(resolve(dest, 'test.env'));
  });

  it('falls back to development.env when the env file is missing', () => {
    process.env.NODE_ENV = 'production';
    expect(getEnvPath(dest)).toBe(resolve(dest, 'development.env'));
  });
});
