import { BlockExecutionSummary } from "../block-execution-summary/block-execution-summary";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { Execution, useExecutions } from "@/hooks/use-executions";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import List from "@mui/material/List";
import Accordion from "@mui/material/Accordion";
import humanDate from "human-date";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionActions from "@mui/material/AccordionActions";
import { Button } from "../button/button";
import { StatusIcon } from "../status-icon/status-icon";
import { Suspense } from "react";
import CircularProgress from "@mui/material/CircularProgress";

interface TriggerSummaryProps {
  trigger: Execution;
  automation: string;
}
export const TriggerSummary = ({ trigger }: TriggerSummaryProps) => {
  const { executions } = useExecutions({
    triggerId: trigger.id,
  });

  const runningAutomation = executions?.find(
    (execution) => execution.type === "automation",
  );

  return (
    <Accordion slotProps={{ transition: { unmountOnExit: true } }}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box gap="1rem" display="flex" alignItems="center">
          <StatusIcon execution={runningAutomation} />
          <Box title={trigger.triggerId}>{trigger.instanceOf.name}</Box>
          <Chip label={humanDate.relativeTime(trigger.created)} />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        <Suspense fallback={<Box sx={{ padding: "1rem" }}><CircularProgress size={20} /></Box>}>
          <List>
            {executions
              ?.filter(
                (execution) =>
                  !["automation", "trigger"].includes(execution.type),
              )
              .slice()
              .sort((a, b) => (a.created > b.created ? 1 : -1))
              .map((execution) => {
                return (
                  <BlockExecutionSummary
                    key={`block-execution-summary-${execution.id}`}
                    execution={execution}
                  />
                );
              })}
          </List>
        </Suspense>
      </AccordionDetails>
      <AccordionActions>
        <Button href={`executions?triggerId=${trigger.id}`}>Executions</Button>
        <Button href={`events?triggerId=${trigger.id}`}>Events</Button>
      </AccordionActions>
    </Accordion>
  );
};
