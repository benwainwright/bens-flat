import { Action } from "../lib/action.ts";
import { Assertion } from "../lib/assertion.ts";
import { Automation } from "../lib/automation.ts";

export type AutomationSequenceEvents = Action | Assertion | Automation;
