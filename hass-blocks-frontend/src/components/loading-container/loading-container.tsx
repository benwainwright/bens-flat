"use client";

import { CircularProgress } from "@mui/material"
import { ReactNode, Suspense } from "react"

interface LoadingContainerProps {
  children: ReactNode
}
export const LoadingContainer = ({children}: LoadingContainerProps) => {
  return <Suspense fallback={<CircularProgress/>}>{children}</Suspense>
}
