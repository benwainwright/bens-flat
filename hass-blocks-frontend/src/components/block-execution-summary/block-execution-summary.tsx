import styles from "./styles.module.css";
import { StatusIcon } from "../status-icon/status-icon";
import { ExecutedEvent } from "@/types/executed-event";

interface BlockExecutionSummaryProps {
  events: ExecutedEvent[];
}

export const BlockExecutionSummary = ({
  events,
}: BlockExecutionSummaryProps) => {
  const now = events
    .slice()
    .sort((a, b) => (new Date(a.timestamp) > new Date(b.timestamp) ? 1 : -1));

  const last = now[now.length - 1];

  return (
    <tr className={styles.container}>
      <td>
        <StatusIcon events={events} />
      </td>
      <td>{last.type}</td>
      <td>{last.name}</td>
    </tr>
  );
};
