import styles from "./styles.module.css";
import { TriggersSummaries } from "../triggers-summaries/triggers-summaries";
import { useState } from "react";
import { ExecutedEvent } from "@/types/executed-event";

interface AutomationSummaryProps {
  name: string;
  executions: {
    triggerName: string;
    events: ExecutedEvent[];
  }[];
}

export const AutomationSummary = ({
  name,
  executions,
}: AutomationSummaryProps) => {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Automation: {name}</h2>
        <button onClick={() => setShowDetail(!showDetail)}>Expand</button>
      </div>
      <TriggersSummaries
        executions={executions}
        automation={name}
        expand={showDetail}
      />
    </div>
  );
};
