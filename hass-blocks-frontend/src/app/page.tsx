import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <>
      <Typography variant="h2">Home</Typography>
      <Typography variant="body1">
        Welcome to hass blocks! Use the navbar above to navigate.
      </Typography>
    </>
  );
}
