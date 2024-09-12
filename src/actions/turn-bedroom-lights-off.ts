import { switchLight } from "./hass/switch-light.ts";

export const turnBedroomLightsOff = switchLight({ area_id: "bedroom" }, "off");
