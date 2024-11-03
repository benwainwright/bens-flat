"use client";

import { Suspense } from "react";
import { TriggerSummary } from "../trigger-summary/trigger-summary";
import { useTriggers } from "@/hooks/use-triggers";
import { Box, CircularProgress } from "@mui/material";

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

  const summaries = triggers?.map((trigger) => (
    <TriggerSummary
      automation={automation}
      trigger={trigger}
      key={`trigger-summary-${trigger.id}`}
    />
  ));

  return <Suspense fallback={<Box sx={{ padding: "1rem" }}><CircularProgress size={20} /></Box>}>{summaries}</Suspense>
};
