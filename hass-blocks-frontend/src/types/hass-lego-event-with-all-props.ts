import { HassLegoEvent, StateChanged } from "hass-lego";

export type HassLegoEventWithAllProps = Exclude<HassLegoEvent, StateChanged> & {
  id: string;
  executeId: string;
  triggerId: string;
  parentName: string;
  timestamp: string;
  status: string;
  name: string;
};
