import { CircularProgress } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import PanToolIcon from "@mui/icons-material/PanTool";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import PendingIcon from '@mui/icons-material/Pending';
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import CheckCircle from "@mui/icons-material/CheckCircle";
import { Execution } from "@/hooks/use-executions";
interface StatusIconProps {
  size?: number;
  execution?: Execution;
}
export const StatusIcon = ({ execution, size }: StatusIconProps) => {
  const theSize = size ?? 20;

  const status = execution ? execution.status : "unknown"
  const output = execution ? execution.output : undefined


  switch (status) {
    case "failed":
      return <ErrorIcon sx={{ color: "red" }} />;
    case "aborted":
      return <DoDisturbAltIcon sx={{ color: "red" }} />;
    case "stopped":
      return <PanToolIcon sx={{ color: "red" }} />;
    case "started":
      return <CircularProgress size={theSize} />;
    case "finished":
      if (output && output.outputType === "conditional") {
        if (output.conditionResult) {
          return <ThumbUpIcon sx={{ color: "green" }} />;
        } else {
          return <PanToolIcon sx={{ color: "red" }} />;
        }
      }
      return <CheckCircle sx={{ color: "green" }} />;
    case "pending":

      return <PendingIcon sx={{ color: "grey"}}/>
    default:
      return <QuestionMarkIcon />;
  }
};
