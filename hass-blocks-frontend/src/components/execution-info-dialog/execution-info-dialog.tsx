import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContents from "@mui/material/DialogContent";
import Container from "@mui/material/Container";
import { useEvents } from "@/hooks/use-events";
import List from "@mui/material/List";
import TableBody from "@mui/material/TableBody";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import humanDate from "human-date";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";

interface ExecutionInfoDialogProps {
  open: boolean;
  executionId: string;
  onClose: () => void;
}

export const ExecutionInfoDialog = ({
  open,
  executionId,
  onClose,
}: ExecutionInfoDialogProps) => {
  const { events } = useEvents({ executionId });
  const first = events?.[0];
  const finished = events?.find((event) => event.status === "finished");
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Box display="flex" gap="1rem">
          <Box>{first?.instanceOf.name}</Box>
          <Chip label={first?.type} />
        </Box>
      </DialogTitle>
      <DialogContents>
        <Box display="flex" gap="1rem">
          <Container>
            <Typography variant="h6">Events</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>When</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {events
                    ?.slice()
                    .sort((a, b) => (a.created > b.created ? 1 : -1))
                    .map((event) => {
                      return (
                        <TableRow>
                          <TableCell sx={{whiteSpace: "nowrap"}}>
                            {humanDate.relativeTime(event.created)}
                          </TableCell>
                          <TableCell>{event.status}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Container>
          {finished && (
          <Container>
            <Typography variant="h6">Result</Typography>
            <TableContainer>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>Continue</TableCell>
                  <TableCell>{String(finished?.output?.continue)}</TableCell>
                </TableRow>
                  {finished?.output?.outputType === "conditional" && 
                    <TableRow>
                  <TableCell sx={{ whiteSpace: "nowrap"}}>Condition Result</TableCell>
                    <TableCell>{String(finished?.output?.conditionResult)}</TableCell>
                    </TableRow>
                  }
              </TableBody>
              </Table>
            </TableContainer>
          </Container>)}
        </Box>
      </DialogContents>
    </Dialog>
  );
};
