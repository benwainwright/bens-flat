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
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Box gap="1rem" display="flex" alignItems="center">
          <StatusIcon status={runningAutomation?.status ?? ""} />
          <Box>{trigger.instanceOf.name}</Box>
          <Chip label={humanDate.relativeTime(trigger.created)} />
        </Box>
      </AccordionSummary>
      <AccordionDetails>
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
      </AccordionDetails>
      <AccordionActions>
        <Button href={`log?triggerId=${trigger.id}`}>Logs</Button>
      </AccordionActions>
    </Accordion>
  );
};
