"use client";

import { Suspense } from "react";
import { TriggerSummary } from "../trigger-summary/trigger-summary";
import { useTriggers } from "@/hooks/use-triggers";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

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
    suspense: false
  });

  return triggers?.map((trigger) => (
    <TriggerSummary
      automation={automation}
      trigger={trigger}
      key={`trigger-summary-${trigger.id}`}
    />
  ));
};
