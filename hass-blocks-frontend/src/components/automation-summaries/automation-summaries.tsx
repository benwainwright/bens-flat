import { AutomationSummary } from "../automation-summary/automation-summary";
import { initialise } from "@/data/initialise";

export const AutomationSummaries = async () => {

  const api = await initialise();
  const automations = await api?.blocks.getAll({type: "automation"})

  return automations?.map((automation) => (
    <AutomationSummary
      key={`automation-summary-${automation.name}`}
      name={automation.name}
    />
  ));
};
