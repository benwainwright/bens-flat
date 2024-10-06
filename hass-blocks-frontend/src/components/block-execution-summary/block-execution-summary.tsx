import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { StatusIcon } from "../status-icon/status-icon";
import ListItem from "@mui/material/ListItem";
import { Execution } from "@/hooks/use-executions";

interface BlockExecutionSummaryProps {
  execution: Execution;
}

export const BlockExecutionSummary = ({
  execution,
}: BlockExecutionSummaryProps) => {
  return (
    <ListItem>
      <ListItemAvatar sx={{ minWidth: "40px" }}>
        <StatusIcon execution={execution} />
      </ListItemAvatar>
      <ListItemText
        primary={execution.instanceOf.name}
        secondary={execution.type}
      />
    </ListItem>
  );
};
