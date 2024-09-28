import { Action, Assertion } from "hass-lego";

export const zoneExitChecks = () => {
  let checksOn = false;

  return {
    ifZoneExitChecksAreOn: new Assertion({
      name: "If zone exit checks are on",
      predicate: () => checksOn,
    }),

    turnOffZoneExitChecks: new Action({
      name: "Turn off zone exit checks",
      callback: () => {
        checksOn = false;
      },
    }),

    turnOnZoneExitChecks: new Action({
      name: "Turn on zone exit checks",
      callback: () => {
        checksOn = true;
      },
    }),
  };
};
