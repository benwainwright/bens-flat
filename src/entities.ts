export const entities = {
  livingRoom: {
    motionSensor: "binary_sensor.living_room_sensor_sensor_state_motion",
  },
  bedroom: {
    motionSensor: "binary_sensor.bedroom_sensor_sensor_state_motion",
  },
  global: {
    switch: {
      tvMode: "switch.tv_mode",
      sleepMode: "switch.sleep_mode",
      livingRoomMotionSensor: "switch.living_room_motion_sensor",
      bedroomMotionSensor: "switch.bedroom_motion_sensor",
      goodMorningPlayed: "switch.good_morning_message_played",
    },
  },
};
