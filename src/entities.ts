export const areas = {
  livingRoom: "living_room",
  bedroom: "bedroom",
  bathroom: "main_bathroom",
  none: "none",
  hallway: "hallway",
} as const;

type Area = (typeof areas)[keyof typeof areas];

export const domains = {
  person: {
    supportedByVirtual: false,
    states: ["away", "home"],
  },
  media_player: {
    supportedByVirtual: false,
    states: ["playing", "paused", "standby", "off"],
  },
  switch: {
    supportedByVirtual: true,
    states: ["on", "off"],
  },
  binary_sensor: {
    supportedByVirtual: true,
    states: ["on", "off"],
  },
  light: {
    supportedByVirtual: true,
    states: ["on", "off"],
  },
  cover: {
    supportedByVirtual: true,
    states: ["open", "closed"],
  },
  scene: {
    supportedByVirtual: false,
    states: ["on", "off"],
  },
} as const;

export type Domain = keyof typeof domains;

export type DomainEntities = {
  [K in Domain]: Record<string, Entity<K>>;
};

export type Entity<S extends Domain = Domain> = {
  area: Area;
  id: string;
  initial_state: (typeof domains)[S]["states"][number];
};

export const entities = {
  person: {
    me: {
      id: "person.ben_wainwright",
      area: "none",
      initial_state: "away",
    },
  },
  scene: {
    tvLights: {
      id: "scene.tv_lights",
      area: "living_room",
      initial_state: "off",
    },
    restoreState: {
      id: "scene.restore_after_tv_mode",
      area: "none",
      initial_state: "off",
    },
  },
  switch: {
    livingRoomAdaptiveLighting: {
      id: "switch.adaptive_lighting_living_room",
      area: "living_room",
      initial_state: "off",
    },
    blindsDefaultOpen: {
      id: "switch.living_room_blinds_default_to_open",
      area: "living_room",
      initial_state: "off",
    },
    visitorMode: {
      id: "switch.visitor_mode",
      area: "none",
      initial_state: "off",
    },
    homeMode: {
      id: "switch.home_mode",
      area: "none",
      initial_state: "off",
    },
    tvMode: {
      id: "switch.tv_mode",
      area: "living_room",
      initial_state: "off",
    },
    sleepMode: {
      id: "switch.sleep_mode",
      area: "none",
      initial_state: "off",
    },
    livingRoomMotionSensor: {
      id: "switch.living_room_motion_sensor",
      area: "living_room",
      initial_state: "on",
    },
    bedroomMotionSensor: {
      id: "switch.bedroom_motion_sensor",
      area: "bedroom",
      initial_state: "on",
    },
    hallwayMotionSensor: {
      id: "switch.hallway_motion_sensor",
      area: "hallway",
      initial_state: "on",
    },
    bathroomMotionSensor: {
      id: "switch.bathroom_motion_sensor",
      area: "main_bathroom",
      initial_state: "on",
    },
    goodMorningPlayed: {
      id: "switch.good_morning_message_played",
      area: "none",
      initial_state: "off",
    },
  },
  light: {
    livingRoomLights: {
      id: "light.living_room",
      area: "living_room",
      initial_state: "off",
    },
    bedroomLights: {
      id: "light.bedroom",
      area: "bedroom",
      initial_state: "off",
    },
    hallwayLights: {
      id: "light.hallway",
      area: "hallway",
      initial_state: "off",
    },
    bathroomLights: {
      id: "light.main_bathroom",
      area: "main_bathroom",
      initial_state: "off",
    },
  },
  media_player: {
    spotify: {
      id: "media_player.spotify_ben_wainwright",
      area: "living_room",
      initial_state: "standby",
    },
    livingRoomSpeaker: {
      id: "media_player.living_room_speaker",
      area: "living_room",
      initial_state: "standby",
    },
    bedroomSpeaker: {
      id: "media_player.bedroom_speaker",
      area: "bedroom",
      initial_state: "standby",
    },
    appleTv: {
      id: "media_player.apple_tv",
      area: "living_room",
      initial_state: "standby",
    },
    tv: {
      id: "media_player.lg_webos_smart_tv",
      area: "living_room",
      initial_state: "standby",
    },
  },
  binary_sensor: {
    xboxPlaying: {
      id: "binary_sensor.sordidhydra4706_in_game",
      area: "living_room",
      initial_state: "off",
    },
    livingRoomMotionSensor: {
      id: "binary_sensor.living_room_sensor_sensor_state_motion",
      area: "living_room",
      initial_state: "off",
    },
    bedroomMotionSensor: {
      id: "binary_sensor.bedroom_sensor_sensor_state_motion",
      area: "bedroom",
      initial_state: "off",
    },
    hallwayMotionSensor: {
      id: "binary_sensor.hallway_motion_sensor_occupancy",
      area: "hallway",
      initial_state: "off",
    },
    bathroomMotionSensor: {
      id: "binary_sensor.bathroom_motion_sensor_occupancy",
      area: "main_bathroom",
      initial_state: "off",
    },
  },
  cover: {
    livingRoomBlinds: {
      id: "cover.living_room_blinds",
      area: "living_room",
      initial_state: "closed",
    },
  },
} as const satisfies DomainEntities;
