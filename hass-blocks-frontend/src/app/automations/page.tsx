import { AutomationSummaries } from "@/components/automation-summaries/automation-summaries";
import styles from "./styles.module.css";

const Automation = async () => {
  return (
    <div className={styles.container}>
      <h1>Hass Lego Automation Summaries</h1>
      <AutomationSummaries />
    </div>
  );
};

export default Automation;
