import { DateTime } from "luxon";

type TimeoutCallback<TArgs extends any[]> = (...args: TArgs) => void;

interface Timeouts<TArgs extends any[] = any[]> {
  callback: TimeoutCallback<TArgs>;
  executeTime: DateTime;
  args?: TArgs[];
}

interface Offset {
  at: DateTime;
  milliseconds: number;
}

const getRealDelay = (offset: Offset | undefined, milliseconds: number) => {
  if (!offset) {
    return milliseconds;
  }

  const elapsed = DateTime.now().toMillis() - offset.at.toMillis();
  const newMillis = milliseconds - (offset.milliseconds - elapsed);
  return newMillis > 0 ? newMillis : milliseconds;
};

export const patchSettimeout = () => {
  const allTimeouts = new Map<number, Timeouts>();
  let currentOffset: Offset | undefined = undefined;

  const originalSetTimeout = globalThis.setTimeout;

  const setTimeoutPatched = <TArgs extends any[]>(
    callback: TimeoutCallback<TArgs>,
    ms?: number,
    ...args: TArgs
  ): NodeJS.Timeout => {
    const delay = getRealDelay(currentOffset, ms ?? 0);

    return setTimeoutWithCache(callback, delay, ...args);
  };

  const setTimeoutWithCache = <TArgs extends any[]>(
    callback: TimeoutCallback<TArgs>,
    ms?: number,
    ...args: TArgs
  ): NodeJS.Timeout => {
    const identifier = originalSetTimeout(callback, ms, ...args);

    allTimeouts.set(Number(identifier), {
      callback,
      executeTime: DateTime.now().plus(ms ?? 0),
      args,
    });

    return identifier;
  };

  globalThis.setTimeout = setTimeoutPatched;

  const advanceTime = (milliseconds: number) => {
    currentOffset = {
      at: DateTime.now(),
      milliseconds,
    };

    Array.from(allTimeouts.entries()).forEach(([identifier, timeout]) => {
      const { executeTime, args, callback } = timeout;
      if (executeTime > DateTime.now()) {
        clearTimeout(identifier);
        const newExecuteTime = executeTime.minus(milliseconds);

        const newInterval =
          newExecuteTime.toMillis() - DateTime.now().toMillis();

        setTimeoutWithCache(callback, newInterval, args);
      }

      allTimeouts.delete(identifier);
    });
  };

  setTimeoutPatched.__promisify__ = originalSetTimeout.__promisify__;

  return { advanceTime };
};
