"use client";

import { useState } from "react";
import { TriggerSummary } from "../trigger-summary/trigger-summary";
import styles from "./styles.module.css";
import { useExecutions } from "@/hooks/use-executions";

interface TriggerSummarriesProps {
  automation: string;
  automationId: string;
  expand: boolean;
}

export const TriggersSummaries = ({
  automation,
  expand,
  automationId,
}: TriggerSummarriesProps) => {
  const [showDetail, setShowDetail] = useState(false);

  const { executions } = useExecutions({
    type: "trigger",
    parentId: automationId,
    page: 1,
    pageSize: 5,
  });

  return (
    <div className={styles.container}>
      {!expand
        ? null
        : executions?.map((execution) => (
            <TriggerSummary
              automation={automation}
              trigger={execution}
              key={`trigger-summary-${execution.id}`}
            />
          ))}
    </div>
  );
};
