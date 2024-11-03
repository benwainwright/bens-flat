"use client"

import { useAutomations } from "@/hooks/use-automations";
import { AutomationSummary } from "../automation-summary/automation-summary";
import { LoadingContainer } from "../loading-container/loading-container";

export const AutomationSummaries = () => {

  const { automations } = useAutomations({ refetchInterval: 10_000 })

  const summaries = automations?.map(automation => (
    <AutomationSummary
      id={automation.id}
      key={`automation-summary-${automation.name}`}
      name={automation.name}
    />
  ))

  return <LoadingContainer>{summaries}</LoadingContainer>
};
