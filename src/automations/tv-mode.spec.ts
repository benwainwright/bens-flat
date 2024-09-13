import { EventBus, LegoClient } from "hass-lego";
import { IClient } from "homeassistant-typescript";
import { mock } from "vitest-mock-extended";
import {
  triggerTvModeOff,
  triggerTvModeOn,
  tvModeOff,
  tvModeOn,
} from "./tv-mode.ts";



const setupAutomations = () => {
  const mockHassClient = mock<IClient>();
  mockHassClient.subscribeToEvents.mockImplementation(() => {
    
  })
  const bus = new EventBus();

  const lego = new LegoClient(mockHassClient, bus);
  lego.registerAutomation(tvModeOn);
  lego.registerAutomation(tvModeOff);
  lego.registerAutomation(triggerTvModeOn);
  lego.registerAutomation(triggerTvModeOff);

  return { lego, mockHassClient };
};

describe("TV mode", () => {
  it("turning it on should result in the temporary scene being restored and deleted if its already been saved", () => {});
  const lego = setupAutomations();
  
  
});
