import { switchLight } from "./hass/switch-light.ts";

export const turnHallwayLightsOn = switchLight({ area_id: "hallway" }, "on");
