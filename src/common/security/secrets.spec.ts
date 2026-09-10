import { resolveSecret } from './secrets';

describe('resolveSecret', () => {
  const previousEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.NODE_ENV = previousEnv;
  });

  it('allows local defaults outside production', () => {
    process.env.NODE_ENV = 'test';
    expect(resolveSecret('JWT_SECRET', undefined, 'secret')).toBe('secret');
  });

  it('rejects default secrets in production', () => {
    process.env.NODE_ENV = 'production';
    expect(() => resolveSecret('JWT_SECRET', 'secret', 'secret')).toThrow(
      /JWT_SECRET/,
    );
  });

  it('accepts a non-default production secret', () => {
    process.env.NODE_ENV = 'production';
    expect(
      resolveSecret('JWT_SECRET', 'rotated-production-secret', 'secret'),
    ).toBe('rotated-production-secret');
  });
});
