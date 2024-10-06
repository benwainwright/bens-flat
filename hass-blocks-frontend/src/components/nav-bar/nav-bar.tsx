import Toolbar from "@mui/material/Toolbar";
import { NavBarItem } from "./nav-bar-item";
import AppBar from "@mui/material/AppBar";

export const NavBar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <NavBarItem href="./" label="Home" />
        <NavBarItem href="./automations" label="Automations" />
        <NavBarItem href="./executions" label="Executions" />
        <NavBarItem href="./events" label="Events" />
      </Toolbar>
    </AppBar>
  );
};
