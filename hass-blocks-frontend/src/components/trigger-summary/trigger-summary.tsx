import { useState } from "react";
import { BlockExecutionSummary } from "../block-execution-summary/block-execution-summary";
import styles from "./styles.module.css";
import { StatusIcon } from "../status-icon/status-icon";
import { ExecutedEvent } from "@/types/executed-event";

interface TriggerSummaryProps {
  events: ExecutedEvent[];
  automation: string;
}
export const TriggersSummary = ({
  automation,
  events,
}: TriggerSummaryProps) => {
  const trigger = events.find((item) => item.type === "trigger");
  const [showDetail, setShowDetail] = useState(false);

  const groupedByExecutionId = Object.entries(
    events.reduce<Record<string, ExecutedEvent[]>>((accum, item) => {
      accum[item.executeId] = [...(accum[item.executeId] ?? []), item];
      return accum;
    }, {})
  );

  const thisAutomation = groupedByExecutionId
    .map(([, item]) => item)
    .find(
      (events) =>
        events[0].type === "automation" && events[0].name === automation
    );

  return (
    <div className={styles.container}>
      <h3 className={styles.header}>
        <StatusIcon events={thisAutomation ?? []} />
        <span>Trigger: {trigger?.name}</span>
        <button onClick={() => setShowDetail(!showDetail)}>Expand</button>
      </h3>
      {showDetail && (
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
      )}
    </div>
  );
};
