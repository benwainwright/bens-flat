"use client";

import { ConnectionStatus, useLegoEvents } from "@/hooks/use-lego-events";
import { AutomationSummary } from "../automation-summary/automation-summary";
import styles from "./styles.module.css";
import { ClassicSpinner } from "react-spinners-kit";
import { filterWithout } from "@/utils/filter-without";

export const AutomationSummaries = () => {
  const [events, connectionStatus] = useLegoEvents();

  const log = filterWithout(events, "triggerId", "name");

  const automationsMap = new Map<string, typeof log>();

  const groupedByTriggerId = Object.entries(
    log.reduce<Record<string, typeof log>>((accum, event) => {
      const id = event.triggerId;
      if (id) {
        accum[id] = [...(accum[id] ?? []), event];
      }
      return accum;
    }, {})
  );

  groupedByTriggerId.forEach(([, events]) => {
    const automations = events.filter((event) => event.type === "automation");
    if (automations.length > 0) {
      const first = automations[0];

      automationsMap.set(first.name, [
        ...(automationsMap.get(first.name) ?? []),
        ...events,
      ]);
    }
  });

  const automations = Array.from(automationsMap.entries());

  if (automations.length === 0) {
  }

  return (
    <div className={styles.container}>
      {connectionStatus === ConnectionStatus.NotConnected ? (
        <div className={styles.statusMessage}>
          <ClassicSpinner />
          Trying to connect to lego...
        </div>
      ) : (
        automations.length === 0 && (
          <p>
            Connection successful! This page will start to fill up once lego
            starts emitting some events...
          </p>
        )
      )}
      {automations.map(([name, events]) => (
        <AutomationSummary
          key={`automation-summary-${name}`}
          name={name}
          events={filterWithout(events, "executeId")}
        />
      ))}
    </div>
  );
};
