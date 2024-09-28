import Link from "next/link";
import styles from "./nav-bar.module.css";

interface NavBarItemProps {
  href: string;
  label: string;
}
export const NavBarItem = ({ href, label }: NavBarItemProps) => {
  return (
    <li className={styles.item}>
      <Link href={href}>{label}</Link>
    </li>
  );
};
