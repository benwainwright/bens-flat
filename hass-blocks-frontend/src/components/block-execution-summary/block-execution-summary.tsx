import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import { StatusIcon } from "../status-icon/status-icon";
import ListItem from "@mui/material/ListItem";
import { Execution } from "@/hooks/use-executions";
import { ExecutionInfoDialog } from "../execution-info-dialog/execution-info-dialog";
import { useState } from "react";

interface BlockExecutionSummaryProps {
  execution: Execution;
}

export const BlockExecutionSummary = ({
  execution,
}: BlockExecutionSummaryProps) => {
  const [showInfo, setShowInfo] = useState(false);
  return (
    <>
      <ListItem>
        <ListItemButton onClick={() => setShowInfo(!showInfo)}>
          <ListItemAvatar sx={{ minWidth: "40px" }}>
            <StatusIcon execution={execution} />
          </ListItemAvatar>
          <ListItemText
            primary={execution.instanceOf.name}
            secondary={execution.type}
          />
        </ListItemButton>
      </ListItem>
      <ExecutionInfoDialog
        executionId={execution.id}
        open={showInfo}
        onClose={() => setShowInfo(false)}
      />
    </>
  );
};
