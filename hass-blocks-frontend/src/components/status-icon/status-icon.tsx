import { CircularProgress } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import PanToolIcon from "@mui/icons-material/PanTool";
import DoDisturbAltIcon from "@mui/icons-material/DoDisturbAlt";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
interface StatusIconProps {
  size?: number;
  status: string;
}
export const StatusIcon = ({ status, size }: StatusIconProps) => {
  const theSize = size ?? 20;

  switch (status) {
    case "failed":
      return <ErrorIcon />;
    case "aborted":
      return <DoDisturbAltIcon />;
    case "stopped":
      return <PanToolIcon />;
    case "started":
      return <CircularProgress size={theSize} />;
    case "finished":
      return <CheckCircleOutlineIcon sx={{ color: "green" }} />;
    default:
      return <QuestionMarkIcon />;
  }
};
