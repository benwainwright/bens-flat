export const setupMatchers = () => {
  class ExpectFailedError extends Error {
    public constructor(
      public readonly outputMessage: () => string,
      public readonly actual: string
    ) {
      super("Expect failed");
    }
  }

  expect.extend({
    async toHaveState(id: string, expectedState: string) {
      const diffMessage = (expected: string, actual: string) => {
        return () =>
          `Expected state of entity '${id}' to be ${this.utils.printExpected(expected)} but got ${this.utils.printReceived(actual)}`;
      };

      try {
        const state = await vi.waitFor(async () => {
          const { state } = await rawClient.getState(id);
          if (state !== expectedState) {
            throw new ExpectFailedError(
              diffMessage(expectedState, state),
              state
            );
          }
          return state;
        });

        return {
          pass: true,
          message: diffMessage(expectedState, state),
          expected: expectedState,
          actual: state,
        };
      } catch (error) {
        if (error instanceof ExpectFailedError) {
          return {
            pass: false,
            message: error.outputMessage,
            expected: expectedState,
            actual: error.actual,
          };
        }
        throw error;
      }
    },
  });
};
