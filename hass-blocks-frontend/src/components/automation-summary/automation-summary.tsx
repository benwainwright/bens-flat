"use client"
import { TriggersSummaries } from "../triggers-summaries/triggers-summaries";
import styles from "./styles.module.css";
import { useState } from "react";

interface AutomationSummaryProps {
  name: string;
}

export const AutomationSummary = ({
  name,
}: AutomationSummaryProps) => {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>Automation: {name}</h2>
        <button onClick={() => setShowDetail(!showDetail)}>Expand</button>
      </div>
    </div>
  );
};
