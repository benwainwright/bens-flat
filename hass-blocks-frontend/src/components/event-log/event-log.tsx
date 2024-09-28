"use client";

import styles from "./styles.module.css";
import { useLegoEvents } from "@/hooks/use-lego-events";

export const EventLog = () => {
  const [log] = useLegoEvents();

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Type</th>
          <th>Status</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {log.map((event) => (
          <tr key={`${"id" in event && event.id}-log-row`}>
            <td>{event.type}</td>
            <td>{"status" in event && event.status}</td>
            <td>{"name" in event && event.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
