"use client";
import { useExecutions } from "@/hooks/use-executions";
import { TriggersSummaries } from "../triggers-summaries/triggers-summaries";
import styles from "./styles.module.css";
import { useState } from "react";

interface AutomationSummaryProps {
  name: string;
  triggerCount: number;
  id: string;
}

export const AutomationSummary = ({
  id,
  name,
  triggerCount,
}: AutomationSummaryProps) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Automation: {name}</h2>
        <p>Triggers: {triggerCount}</p>
        <button onClick={() => setShowDetail(!showDetail)}>Expand</button>
      </div>
      <TriggersSummaries
        automationId={id}
        automation={name}
        expand={showDetail}
      />
    </div>
  );
};
