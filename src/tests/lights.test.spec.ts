import { getTestClient, setStates } from "@test-support";
import { registerAllAutomations } from "../automations/register-all.ts";
import { entities } from "../entities.ts";
import { assignAreas } from "../test-support/assign-areas.ts";
import { resetStatesToInitialValues } from "../test-support/reset-states.ts";

const { client, rawClient, bus } = await getTestClient();
registerAllAutomations(client);

beforeAll(async () => {
  await assignAreas(rawClient);
});

afterEach(async () => {
  await resetStatesToInitialValues(rawClient);
});

describe("The living room motion sensor", () => {
  it("Should turn lights on if the tv mode is off and the living room motion sensor switch is on", async () => {
    await setStates(rawClient, [
      [entities.switch.tvMode.id, "off"],
      [entities.switch.livingRoomMotionSensor.id, "on"],
    ]);

    await setStates(rawClient, [
      [entities.binary_sensor.livingRoomMotionSensor.id, "on"],
    ]);

    await vi.waitFor(
      async () => {
        const { state } = await rawClient.getState(
          entities.light.livingRoomLights.id
        );
        expect(state).toEqual("on");
      },
      { timeout: 30 * 1000 }
    );
  });

  it("Should leave lights off if the tv mode is on", async () => {
    await setStates(rawClient, [
      [entities.switch.tvMode.id, "on"],
      [entities.switch.livingRoomMotionSensor.id, "on"],
    ]);

    await setStates(rawClient, [
      [entities.binary_sensor.livingRoomMotionSensor.id, "on"],
    ]);

    await vi.waitFor(
      async () => {
        const { state } = await rawClient.getState(
          entities.light.livingRoomLights.id
        );
        expect(state).toEqual("off");
      },
      { timeout: 30 * 1000 }
    );
  });

  it("Should leave lights off if the motion sensor switch is off", async () => {
    await setStates(rawClient, [
      [entities.switch.tvMode.id, "off"],
      [entities.switch.livingRoomMotionSensor.id, "off"],
    ]);

    await setStates(rawClient, [
      [entities.binary_sensor.livingRoomMotionSensor.id, "on"],
    ]);

    await vi.waitFor(
      async () => {
        const { state } = await rawClient.getState(
          entities.light.livingRoomLights.id
        );
        expect(state).toEqual("off");
      },
      { timeout: 30 * 1000 }
    );
  });
});
