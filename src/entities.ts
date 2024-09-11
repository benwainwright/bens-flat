export const entities = {
  livingRoom: {
    restoreState: "scene.restore_after_tv_mode",
    light: "light.living_room",
    motionSensor: "binary_sensor.living_room_sensor_sensor_state_motion",
    blinds: "cover.living_room_blinds",
    speaker: "media_player.living_room_speaker",
    adaptiveLighting: "switch.adaptive_lighting_living_room",
    xbox: "binary_sensor.sordidhydra4706_in_game",
    appleTv: "media_player.apple_tv",
  },
  bedroom: {
    speaker: "media_player.bedroom_speaker",
    motionSensor: "binary_sensor.bedroom_sensor_sensor_state_motion",
  },
  bathroom: {
    motionSensor: "binary_sensor.bathroom_motion_sensor_occupancy",
  },
  hallway: {
    motionSensor: "binary_sensor.hallway_motion_sensor_occupancy",
  },
  global: {
    mediaPlayer: {
      spotify: "media_player.spotify_ben_wainwright",
    },
    switch: {
      blindsDefaultPositionOpen: "switch.living_room_blinds_default_to_open",
      tvMode: "switch.tv_mode",
      sleepMode: "switch.sleep_mode",
      livingRoomMotionSensor: "switch.living_room_motion_sensor",
      bedroomMotionSensor: "switch.bedroom_motion_sensor",
      hallwayMotionSensor: "switch.hallway_motion_sensor",
      bathroomMotionSensor: "switch.bathroom_motion_sensor",
      goodMorningPlayed: "switch.good_morning_message_played",
    },
  },
};
