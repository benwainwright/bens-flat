"use client";

import { TriggersSummaries } from "../triggers-summaries/triggers-summaries";
import Box from "@mui/material/Box";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { useExecutions } from "@/hooks/use-executions";
import { StatusIcon } from "../status-icon/status-icon";

interface AutomationSummaryProps {
  name: string;
  id: string;
}

export const AutomationSummary = ({ id, name }: AutomationSummaryProps) => {
  const { executions } = useExecutions({
    blockId: id,
    type: "automation",
  });

  const execution =
    !executions || executions.length === 0 ? undefined : executions[0];

  return (
    <Accordion
      disabled={!execution}
      slotProps={{
        heading: { component: "h4" },
        transition: { unmountOnExit: true },
      }}
    >
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box alignItems="center" display="flex" gap="1rem" title={id}>
          <StatusIcon execution={execution} />
          {name}
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <TriggersSummaries automationId={id} automation={name} />
      </AccordionDetails>
    </Accordion >
  );
};
