import "vitest";

interface CustomMatchers<R = unknown> {
  toHaveState(expectedState: string);
}

declare module "vitest" {
  interface Assertion<T = any> extends CustomMatchers<T> {}
  interface AsymmetricMatchersContaining extends CustomMatchers {}
}
