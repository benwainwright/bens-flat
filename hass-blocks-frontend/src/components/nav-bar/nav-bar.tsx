import { NavBarItem } from "./nav-bar-item";
import styles from "./nav-bar.module.css";

export const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <NavBarItem href="/" label="Home" />
        <NavBarItem href="/log" label="Log" />
        <NavBarItem href="/automations" label="Automations" />
      </ul>
    </nav>
  );
};
