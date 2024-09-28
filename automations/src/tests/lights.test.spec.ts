import { setStates } from "@test-support";
import { entities } from "../entities.ts";
import { resetStatesToInitialValues } from "../test-support/reset-states.ts";
import { delay } from "../test-support/delay.ts";

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
  it("if it triggers, it should turn back off after 30 minutes", async () => {
    await setStates(
      [entities.switch.tvMode.id, "off"],
      [entities.switch.livingRoomMotionSensor.id, "on"]
    );

    await setStates([entities.binary_sensor.livingRoomMotionSensor.id, "on"]);

    await expect(entities.light.livingRoomLights.id).toHaveState("on");

    advanceTime(1000 * 60 * 30 + 1000 * 10);

    await expect(entities.light.livingRoomLights.id).toHaveState("off");
  });
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

  it("if it triggers, it should turn back off after 10 minutes", async () => {
    await setStates(
      [entities.switch.sleepMode.id, "off"],
      [entities.switch.bedroomMotionSensor.id, "on"]
    );

    await setStates([entities.binary_sensor.bedroomMotionSensor.id, "on"]);

    await expect(entities.light.bedroomLights.id).toHaveState("on");

    advanceTime(1000 * 60 * 11);

    await expect(entities.light.bedroomLights.id).toHaveState("off");
  });
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

  it("if it triggers, it should turn back off after 2 minutes", async () => {
    await setStates([entities.switch.hallwayMotionSensor.id, "on"]);

    await setStates([entities.binary_sensor.hallwayMotionSensor.id, "on"]);

    await expect(entities.light.hallwayLights.id).toHaveState("on");

    advanceTime(1000 * 60 * 3);

    await expect(entities.light.hallwayLights.id).toHaveState("off");
  });
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

  it("if it triggers, it should turn back off after 5 minutes", async () => {
    await setStates([entities.switch.bathroomMotionSensor.id, "on"]);

    await expect(entities.binary_sensor.bathroomMotionSensor.id).toHaveState(
      "off"
    );
    await setStates([entities.binary_sensor.bathroomMotionSensor.id, "on"]);

    await expect(entities.light.bathroomLights.id).toHaveState("on");

    advanceTime(1000 * 60 * 6);

    await expect(entities.light.bathroomLights.id).toHaveState("off");
  });
});
