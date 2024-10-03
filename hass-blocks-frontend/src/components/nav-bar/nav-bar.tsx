import Toolbar from "@mui/material/Toolbar";
import { NavBarItem } from "./nav-bar-item";
import styles from "./nav-bar.module.css";
import AppBar from "@mui/material/AppBar";

export const NavBar = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <NavBarItem href="/" label="Home" />
        <NavBarItem href="/automations" label="Automations" />
        <NavBarItem href="/log" label="Log" />
        <NavBarItem href="/edit" label="Edit" />
      </Toolbar>
    </AppBar>
  );
};
