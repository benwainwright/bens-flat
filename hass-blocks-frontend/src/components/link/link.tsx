"use client";

import NextLink from "next/link";
import MuiLink from "@mui/material/Link";

import { ReactNode } from "react";

interface LinkProps {
  href: string;
  title?: string;
  children: ReactNode;
}

export const Link = (props: LinkProps) => {
  return <MuiLink {...props} component={NextLink} />;
};
