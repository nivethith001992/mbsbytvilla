"use client";

import { useEffect } from "react";
import { keepCleanUrl } from "@/lib/scroll";
import { IntroLoader } from "./IntroLoader";
import { ScrollProgress } from "./ScrollProgress";
import { SmoothScroll } from "./SmoothScroll";

export function SiteChrome() {
  // Nuclear /?r= redirect on reload; beforeunload + short Lenis pin; soft ScrollTo works
  useEffect(() => keepCleanUrl(), []);

  return (
    <>
      <SmoothScroll />
      <IntroLoader />
      <ScrollProgress />
    </>
  );
}
