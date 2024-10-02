import Stack from "@mui/material/Stack";
import { AutomationSummary } from "../automation-summary/automation-summary";
import { initialise } from "@/data/initialise";
import Accordion from "@mui/material/Accordion";

export const AutomationSummaries = async () => {
  const api = await initialise();

  const automations = await api?.blocks.getAll({ type: "automation" });

  const summaries = automations?.map(async (automation) => {
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
  });

  return summaries;
};
