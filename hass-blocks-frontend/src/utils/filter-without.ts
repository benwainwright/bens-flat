import { TransmittedHassLegoEvent } from "@/types/transmitted-hass-lego-event";

export type HasKey<T, K extends PropertyKey> =
  T extends Record<K, unknown> ? T : never;

const hasKey = <T extends object, K extends PropertyKey>(
  obj: T,
  key: K,
): obj is HasKey<T, K> => {
  return key in obj;
};

export const filterWithout = <
  T extends TransmittedHassLegoEvent,
  S extends PropertyKey,
>(
  events: T[],
  ...key: S[]
): HasKey<T, S>[] => {
  return events.flatMap((item) => {
    const objects = key.flatMap((k) => (hasKey(item, k) ? item : []));
    return objects.length > 0 ? objects[0] : [];
  });
};
