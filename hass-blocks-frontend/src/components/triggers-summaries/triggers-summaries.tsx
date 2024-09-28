"use client";

import { TriggersSummary } from "../trigger-summary/trigger-summary";
import styles from "./styles.module.css";
import { ExecutedEvent } from "@/types/executed-event";

interface TriggerSummarriesProps {
  events: ExecutedEvent[];
  automation: string;
  expand: boolean;
}

export const TriggersSummaries = ({
  events,
  automation,
  expand,
}: TriggerSummarriesProps) => {
  const data = Object.entries(
    events.reduce<Record<string, ExecutedEvent[]>>((accum, event) => {
      const id = event.triggerId;
      if (id) {
        accum[id] = [...(accum[id] ?? []), event];
      }
      return accum;
    }, {})
  );

  const triggersString = data.length === 1 ? "trigger" : "triggers";

  return (
    <div className={styles.container}>
      {!expand ? (
        <div>
          {data.length} {triggersString}
        </div>
      ) : (
        data.map(([key, value]) => (
          <TriggersSummary
            automation={automation}
            events={value}
            key={`trigger-summary-${key}`}
          />
        ))
      )}
    </div>
  );
};
