import { Automation, when } from "hass-lego";

import {
  ifBlindsDefaultPositionIsSetToOpen,
  ifHomeModeIsOn,
} from "@assertions";
import { whenBlindsDefaultPositionChanges } from "@triggers";
import { closeLivingRoomBlinds, openLivingRoomBlinds } from "@actions";

export const openAndCloseBlinds = new Automation({
  name: "Open and close the blinds",
  trigger: whenBlindsDefaultPositionChanges,
  actions: [
    when({
      assertion: ifBlindsDefaultPositionIsSetToOpen,
      then: when({
        assertion: ifHomeModeIsOn,
        then: openLivingRoomBlinds,
        else: closeLivingRoomBlinds,
      }),
      else: closeLivingRoomBlinds,
    }),
  ],
});
