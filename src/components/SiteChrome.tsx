"use client";

import { useEffect } from "react";
import { keepCleanUrl } from "@/lib/scroll";
import { IntroLoader } from "./IntroLoader";
import { ScrollProgress } from "./ScrollProgress";

export function SiteChrome() {
  useEffect(() => keepCleanUrl(), []);

  return (
    <>
      <IntroLoader />
      <ScrollProgress />
    </>
  );
}
