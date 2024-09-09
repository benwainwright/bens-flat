export interface Logger {
  warning: (message: string) => void;
  info: (message: string) => void;
  success: (message: string) => void;
  fail: (message: string) => void;
  debug: (message: string) => void;
  trace: (message: string) => void;
  error: (message: string) => void;
}
