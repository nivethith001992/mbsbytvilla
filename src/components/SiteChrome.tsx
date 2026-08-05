"use client";

import { useEffect } from "react";
import { keepCleanUrl } from "@/lib/scroll";
import { IntroLoader } from "./IntroLoader";
import { ScrollProgress } from "./ScrollProgress";
import { SmoothScroll } from "./SmoothScroll";

export function SiteChrome() {
  // Refresh / first load → `/` at top; in-page ScrollTo still works after
  useEffect(() => keepCleanUrl(), []);

  return (
    <>
      <SmoothScroll />
      <IntroLoader />
      <ScrollProgress />
    </>
  );
}
