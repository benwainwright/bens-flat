import styles from "./styles.module.css";
import { Execution } from "@/hooks/use-executions";

interface BlockExecutionSummaryProps {
  execution: Execution;
}

export const BlockExecutionSummary = ({
  execution,
}: BlockExecutionSummaryProps) => {
  return (
    <tr className={styles.container}>
      <td>{execution.type}</td>
      <td>{execution.instanceOf.name}</td>
    </tr>
  );
};
