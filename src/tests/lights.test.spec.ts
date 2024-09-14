import { setStates } from "@test-support";
import { entities } from "../entities.ts";
import { resetStatesToInitialValues } from "../test-support/reset-states.ts";
import { livingRoomMotionSensor } from "@automations";

afterEach(async () => {
  await resetStatesToInitialValues();
});

describe("The living room motion sensor", () => {
  it.each`
    tvMode   | livingRoomMotionSensor | livingRoomLights
    ${"off"} | ${"on"}                | ${"on"}
    ${"off"} | ${"off"}               | ${"off"}
    ${"on"}  | ${"on"}                | ${"off"}
    ${"on"}  | ${"off"}               | ${"off"}
  `(
    "If TV mode is $tvMode and the living room motion sensor switch is $livingRoomMotionSensor then after triggering the motion sensor, the lights in the living room should be $livingRoomLights",
    async ({ tvMode, livingRoomMotionSensor, livingRoomLights }) => {
      await setStates(
        [entities.switch.tvMode.id, tvMode],
        [entities.switch.livingRoomMotionSensor.id, livingRoomMotionSensor]
      );

      await setStates([entities.binary_sensor.livingRoomMotionSensor.id, "on"]);

      await expect(entities.light.livingRoomLights.id).toHaveState(
        livingRoomLights
      );
    }
  );
});

describe("The bedroom motion sensor", () => {
  it.each`
    sleepMode | bedroomMotionSensor | bedroomLights
    ${"off"}  | ${"on"}             | ${"on"}
    ${"off"}  | ${"off"}            | ${"off"}
    ${"on"}   | ${"on"}             | ${"off"}
    ${"on"}   | ${"off"}            | ${"off"}
  `(
    "If sleep mode is $sleepMode and the bedroom room motion sensor switch is $bedroomMotionSensor then after triggering the motion sensor, the lights in the bedroom should be $bedroomLights",
    async ({ sleepMode, bedroomMotionSensor, bedroomLights }) => {
      await setStates(
        [entities.switch.sleepMode.id, sleepMode],
        [entities.switch.bedroomMotionSensor.id, bedroomMotionSensor]
      );

      await setStates([entities.binary_sensor.bedroomMotionSensor.id, "on"]);

      await expect(entities.light.bedroomLights.id).toHaveState(bedroomLights);
    }
  );
});

describe("The hallway motion sensor", () => {
  it.each`
    hallwayMotionSensor | hallwayLights
    ${"on"}             | ${"on"}
    ${"off"}            | ${"off"}
  `(
    "If the hallway motion sensor switch is $hallwayMotionSensor then after triggering the motion sensor, the lights in the hallway should be $hallwayLights",
    async ({ hallwayMotionSensor, hallwayLights }) => {
      await setStates([entities.switch.sleepMode.id, hallwayMotionSensor]);

      await setStates([entities.binary_sensor.hallwayMotionSensor.id, "on"]);

      await expect(entities.light.hallwayLights.id).toHaveState(hallwayLights);
    }
  );
});

describe("The bathroom motion sensor", () => {
  it.each`
    bathroomMotionSensor | bathroomLights
    ${"on"}              | ${"on"}
    ${"off"}             | ${"off"}
  `(
    "If the bathroom motion sensor switch is $bathroomMotionSensor then after triggering the motion sensor, the lights in the bathroom should be $bathroomLights",
    async ({ bathroomMotionSensor, bathroomLights }) => {
      await setStates([entities.switch.sleepMode.id, bathroomMotionSensor]);

      await setStates([entities.binary_sensor.bathroomMotionSensor.id, "on"]);

      await expect(entities.light.bathroomLights.id).toHaveState(
        bathroomLights
      );
    }
  );
});
