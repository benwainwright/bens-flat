import { AddonsResponse } from "./addon";
import { AddonInfoResponse } from "./addon-info";

export interface HassRequestApiMap {
  "/addons": AddonsResponse;
  "/addons/self/info": AddonInfoResponse;
}
