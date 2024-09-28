import { entities } from "../entities.ts";
import { turnOnScene } from "./hass/turn-on-scene.ts";

const { tvLights } = entities.scene;

export const turnOnTvLightsScene = turnOnScene(tvLights.id);
