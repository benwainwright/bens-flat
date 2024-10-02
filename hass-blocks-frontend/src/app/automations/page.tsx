import { AutomationSummaries } from "@/components/automation-summaries/automation-summaries";
import Typography from "@mui/material/Typography";

const Automation = async () => {
  return (
    <>
      <Typography variant="h4" component="h2" gutterBottom>
        Automations
      </Typography>
      <AutomationSummaries />
    </>
  );
};

export default Automation;
