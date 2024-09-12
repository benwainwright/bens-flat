import { switchLight } from "./hass/switch-light.ts";

export const turnBedroomLightsOn = switchLight({ area_id: "bedroom" }, "on");
