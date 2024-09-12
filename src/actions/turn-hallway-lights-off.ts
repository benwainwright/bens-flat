import { switchLight } from "./hass/switch-light.ts";

export const turnHallwayLightsOff = switchLight({ area_id: "hallway" }, "off");
