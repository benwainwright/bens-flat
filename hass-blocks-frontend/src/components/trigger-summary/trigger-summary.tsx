import { useState } from "react";
import { BlockExecutionSummary } from "../block-execution-summary/block-execution-summary";
import styles from "./styles.module.css";
import { StatusIcon } from "../status-icon/status-icon";
import { ExecutedEvent } from "@/types/executed-event";
import { schema, SchemaTypes } from "@/data/schema";
import { Execution, useExecutions } from "@/hooks/use-executions";

interface TriggerSummaryProps {
  trigger: Execution;
  automation: string;
}
export const TriggerSummary = ({ trigger }: TriggerSummaryProps) => {
  const [showDetail, setShowDetail] = useState(false);

  const { executions } = useExecutions({
    triggerId: trigger.id,
  });

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>
        <span>Trigger: {trigger.instanceOf.name}</span>
        <button onClick={() => setShowDetail(!showDetail)}>Expand</button>
      </h3>
      {showDetail && (
        <table className={styles.executionDetailsTable}>
          <tbody>
            {executions?.map((execution) => {
              return (
                <BlockExecutionSummary
                  key={`block-execution-summary-${execution.id}`}
                  execution={execution}
                />
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};
