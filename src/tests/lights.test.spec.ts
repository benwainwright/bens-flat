import { setStates } from "@test-support";
import { entities } from "../entities.ts";
import { resetStatesToInitialValues } from "../test-support/reset-states.ts";

afterEach(async () => {
  await resetStatesToInitialValues(rawClient);
});

describe("The living room motion sensor", () => {
  it("Should turn lights on if the tv mode is off and the living room motion sensor switch is on", async () => {
    await setStates(
      [entities.switch.tvMode.id, "off"],
      [entities.switch.livingRoomMotionSensor.id, "on"]
    );

    await setStates([entities.binary_sensor.livingRoomMotionSensor.id, "on"]);

    await expect(entities.light.livingRoomLights.id).toHaveState("on");
  });

  it("Should leave lights off if the tv mode is on", async () => {
    await setStates(
      [entities.switch.tvMode.id, "on"],
      [entities.switch.livingRoomMotionSensor.id, "on"]
    );

    await setStates([entities.binary_sensor.livingRoomMotionSensor.id, "on"]);

    await expect(entities.light.livingRoomLights.id);
  });

  it("Should leave lights off if the motion sensor switch is off", async () => {
    await setStates(
      [entities.switch.tvMode.id, "off"],
      [entities.switch.livingRoomMotionSensor.id, "off"]
    );

    await setStates([entities.binary_sensor.livingRoomMotionSensor.id, "on"]);

    await expect(entities.light.livingRoomLights.id).toHaveState("off");
  });
});
