"use client"

import NextLink from "next/link";

import { ReactNode } from "react";

interface LinkProps {
  href: string;
  title: string;
  children: ReactNode;
}

export const Link = (props: LinkProps) => {
  return <NextLink {...props} href={href} />;
};
