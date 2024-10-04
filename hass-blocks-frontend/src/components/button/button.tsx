import MaterialButton from "@mui/material/Button";
import { ReactNode } from "react";
import { Link } from "../link/link";

interface ButtonProps {
  href: string;
  color?: "primary" | "secondary" | "inherit";
  children: ReactNode;
}

export const Button = (props: ButtonProps) => {
  return <MaterialButton {...props} LinkComponent={Link} />;
};
