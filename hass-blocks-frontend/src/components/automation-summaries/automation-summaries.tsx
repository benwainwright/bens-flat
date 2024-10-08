import { AutomationSummary } from "../automation-summary/automation-summary";
import { initialise } from "@/data/initialise";
import { LoadingContainer } from "../loading-container/loading-container";

export const AutomationSummaries = async () => {
  const api = await initialise();

  const automations = await api?.blocks.getAll({ type: "automation" });

  const summaries = await Promise.all(
    automations?.map(async (automation) => {
      const numberOfTriggers = await api?.executions.countAll({
        type: "trigger",
        parent: { id: automation.id, collection: "blocks" },
      });

      return (
          <AutomationSummary
            id={automation.id}
            key={`automation-summary-${automation.name}`}
            name={automation.name}
            triggerCount={numberOfTriggers}
          />
      );
    }),
  );

  return <LoadingContainer>{summaries}</LoadingContainer>
};
