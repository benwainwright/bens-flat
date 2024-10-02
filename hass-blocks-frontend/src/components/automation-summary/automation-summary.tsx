"use client";
import { useAutomations } from "@/hooks/use-automations";
import { TriggersSummaries } from "../triggers-summaries/triggers-summaries";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

interface AutomationSummaryProps {
  name: string;
  triggerCount: number;
  id: string;
}

export const AutomationSummary = ({ id, name }: AutomationSummaryProps) => {
  const [showDetail, setShowDetail] = useState(false);
  const { automations } = useAutomations({
    blockId: id,
  });

  if (automations?.length === 0) {
    return null;
  }

  const automation = automations?.[0];

  return (
    <Accordion slotProps={{ heading: { component: "h4" } }}>
      <AccordionSummary expandIcon={<ExpandMore />}>{name}</AccordionSummary>
      <AccordionDetails>
        <TriggersSummaries automationId={id} automation={name} />
      </AccordionDetails>
    </Accordion>
  );
};
