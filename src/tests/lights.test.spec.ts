import { getTestClient } from "@test-support";
import { registerAllAutomations } from "../automations/register-all.ts";
import { entities } from "../entities.ts";
import { assignAreas } from "../test-support/assign-areas.ts";

const { client, rawClient } = await getTestClient();
registerAllAutomations(client);

beforeAll(async () => {
  await assignAreas(rawClient);
});

describe("The living room motion sensor", () => {
  it("Should turn lights on if the tv mode is off and the living room motion sensor switch is on", async () => {
    await rawClient.callService({
      domain: "switch",
      service: "turn_off",
      service_data: {
        entity_id: entities.global.switch.tvMode,
      },
    });

    await rawClient.callService({
      domain: "switch",
      service: "turn_on",
      service_data: {
        entity_id: entities.global.switch.livingRoomMotionSensor,
      },
    });

    await rawClient.callService({
      domain: "virtual",
      service: "turn_on",
      service_data: {
        entity_id: entities.livingRoom.motionSensor,
      },
    });

    await vi.waitFor(
      async () => {
        const { state } = await rawClient.getState(entities.livingRoom.light);
        expect(state).toEqual("on");
      },
      { timeout: 30 * 1000 }
    );
  });
});
