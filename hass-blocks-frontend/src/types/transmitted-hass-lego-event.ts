import { HassLegoEvent } from "hass-lego";

export type TransmittedHassLegoEvent = HassLegoEvent & {
  timestamp: string;
  id: string;
};
