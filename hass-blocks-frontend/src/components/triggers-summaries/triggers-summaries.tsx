"use client";

import { TriggersSummary } from "../trigger-summary/trigger-summary";
import styles from "./styles.module.css";
import { ExecutedEvent } from "@/types/executed-event";

interface TriggerSummarriesProps {
  automation: string;
  expand: boolean;
  executions: {
    triggerName: string;
    events: ExecutedEvent[];
  }[];
}

export const TriggersSummaries = ({
  automation,
  expand,
  executions,
}: TriggerSummarriesProps) => {
  const triggersString = executions.length === 1 ? "trigger" : "triggers";

  return (
    <div className={styles.container}>
      {!expand ? (
        <div>
          {executions.length} {triggersString}
        </div>
      ) : (
        executions.map((execution) => (
          <TriggersSummary
            automation={automation}
            events={execution.events}
            key={`trigger-summary-${execution.triggerName}`}
          />
        ))
      )}
    </div>
  );
};
