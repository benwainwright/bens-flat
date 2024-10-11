import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { ReactNode } from "react";

interface CodeBlockProps {
  children: ReactNode;
}

export const CodeBlock = ({ children }: CodeBlockProps) => {
  return (
    <Paper>
      <Box padding="0.1rem 1rem" margin="1rem">
        <pre>{children}</pre>
      </Box>
    </Paper>
  );
};
