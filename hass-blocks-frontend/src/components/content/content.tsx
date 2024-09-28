import { ReactNode } from "react";
import styles from "./content.module.css";

interface ContentProps {
  children: ReactNode;
}
export const Content = ({ children }: ContentProps) => {
  return <div className={styles.content}>{children}</div>;
};
