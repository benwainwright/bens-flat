"use client";

import { TriggerSummary } from "../trigger-summary/trigger-summary";
import { useTriggers } from "@/hooks/use-triggers";
import Stack from "@mui/material/Stack";

interface TriggerSummarriesProps {
  automation: string;
  automationId: string;
}

export const TriggersSummaries = ({
  automation,
  automationId,
}: TriggerSummarriesProps) => {
  const { triggers } = useTriggers({
    parentId: automationId,
    page: 0,
    pageSize: 5,
  });

  console.log("triggers", triggers);

  return triggers?.map((trigger) => (
    <TriggerSummary
      automation={automation}
      trigger={trigger}
      key={`trigger-summary-${trigger.id}`}
    />
  ));
};
