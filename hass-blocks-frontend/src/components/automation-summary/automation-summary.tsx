"use client";
import { useAutomations } from "@/hooks/use-automations";
import { TriggersSummaries } from "../triggers-summaries/triggers-summaries";
import Box from "@mui/material/Box";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useExecutions } from "@/hooks/use-executions";
import { StatusIcon } from "../status-icon/status-icon";

interface AutomationSummaryProps {
  name: string;
  triggerCount: number;
  id: string;
}

export const AutomationSummary = ({ id, name }: AutomationSummaryProps) => {
  const { executions } = useExecutions({
    parentId: id,
    type: "automation",
  });

  const status =
    !executions || executions.length === 0 ? "unknown" : executions[0].status;

  return (
    <Accordion slotProps={{ heading: { component: "h4" } }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box alignItems="center" display="flex" gap="1rem">
          <StatusIcon status={status} />
          {name}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <TriggersSummaries automationId={id} automation={name} />
      </AccordionDetails>
    </Accordion>
  );
};
