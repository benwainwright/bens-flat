import { HasKey } from "@/utils/filter-without";
import { TransmittedHassLegoEvent } from "./transmitted-hass-lego-event";

export type ExecutedEvent = HasKey<
  TransmittedHassLegoEvent,
  "executeId" | "name"
>;
