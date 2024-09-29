"use client";

import { AutomationSummary } from "../automation-summary/automation-summary";
import { useAutomations } from "@/hooks/use-automations";

export const AutomationSummaries = () => {
  const { automations } = useAutomations();

  return automations.map((automation) => (
    <AutomationSummary
      key={`automation-summary-${automation.name}`}
      name={automation.name}
      executions={automation.executions}
    />
  ));
};
