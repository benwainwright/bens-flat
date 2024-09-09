import { Logger } from "../types/logger.ts";

export class SimpleLogger implements Logger {
  warning(message: string) {
    console.log(message);
  }
  trace(message: string) {
    //console.log(message);
  }
  info(message: string) {
    console.log(message);
  }
  success(message: string) {
    console.log(message);
  }
  debug(message: string) {
    console.log(message);
  }
  error(message: string) {
    console.log(message);
  }
}
