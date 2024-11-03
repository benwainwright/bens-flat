import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContents from "@mui/material/DialogContent";
import Container from "@mui/material/Container";
import { useEvents } from "@/hooks/use-events";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import humanDate from "human-date";
import Chip from "@mui/material/Chip";
import Typography from "@mui/material/Typography";
import { Suspense } from "react";
import { CircularProgress } from "@mui/material";
import { CodeBlock } from "../code-block/code-block";

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
  const { events } = useEvents({ executionId, suspense: true });
  const first = events?.[0];
  const finished = events?.find((event) => event.status === "finished");
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg">
      <Suspense fallback={<CircularProgress />}>
        <DialogTitle>
          <Box display="flex" gap="1rem">
            <Box>{first?.instanceOf.name}</Box>
            <Chip label={first?.type} />
          </Box>
        </DialogTitle>
        <DialogContents>
          <Box display="flex" flexDirection="column" gap="1rem">
            <Box display="flex" gap="1rem" flexDirection="row">
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
                              <TableCell sx={{ whiteSpace: "nowrap" }}>
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
                          <TableCell>
                            {String(finished?.output?.continue)}
                          </TableCell>
                        </TableRow>
                        {finished?.output?.outputType === "conditional" && (
                          <TableRow>
                            <TableCell
                              sx={{
                                whiteSpace: "nowrap",
                                borderBottom: "none",
                              }}
                            >
                              Condition Result
                            </TableCell>
                            <TableCell sx={{ borderBottom: "none" }}>
                              {String(finished?.output?.conditionResult)}
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Container>
              )}
            </Box>

            <Box>
              {finished && finished.type === "service-call" && (
                <Container>
                  <Typography variant="h6">Params</Typography>
                  <CodeBlock>{finished?.instanceOf?.params}</CodeBlock>
                  <Typography variant="h6">Response</Typography>
                  <CodeBlock>
                    {JSON.stringify(finished?.output?.output, null, 2)}
                  </CodeBlock>
                </Container>
              )}
            </Box>
          </Box>
        </DialogContents>
      </Suspense>
    </Dialog>
  );
};
