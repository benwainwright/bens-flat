import { useState } from "react";
import { BlockExecutionSummary } from "../block-execution-summary/block-execution-summary";
import styles from "./styles.module.css";
import { StatusIcon } from "../status-icon/status-icon";
import { ExecutedEvent } from "@/types/executed-event";
import { schema, SchemaTypes } from "@/data/schema";
import { Execution } from "@/hooks/use-executions";

interface TriggerSummaryProps {
  trigger: Execution;
  automation: string;
}
export const TriggerSummary = ({ trigger }: TriggerSummaryProps) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.header}>
        <span>Trigger: {trigger.instanceOf.name}</span>
        {/* <button onClick={() => setShowDetail(!showDetail)}>Expand</button> */}
      </h3>
      {/* {showDetail && (
        <table className={styles.executionDetailsTable}>
          <tbody>
            {groupedByExecutionId.map(([execution, executionEvents]) => {
              if (executionEvents[0].name === automation) {
                return null;
              }
              return (
                <BlockExecutionSummary
                  key={`block-execution-summary-${execution}`}
                  events={executionEvents}
                />
              );
            })}
          </tbody>
        </table>
      )} */}
    </div>
  );
};
