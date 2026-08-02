"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { scrollToId } from "@/lib/scroll";

type ScrollToProps = {
  to: string;
  children: ReactNode;
  className?: string;
  /** Called before scrolling (e.g. close mobile menu + unlock body). */
  onNavigate?: () => void;
} & Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "onClick" | "className" | "children"
>;

/** Button that scrolls to a section id without putting # in the URL. */
export const ScrollTo = forwardRef<HTMLButtonElement, ScrollToProps>(
  function ScrollTo({ to, children, className, onNavigate, ...rest }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        className={["scroll-to", className].filter(Boolean).join(" ")}
        onClick={() => {
          // Close overlays / unlock body first so scroll isn't blocked by overflow:hidden
          onNavigate?.();
          scrollToId(to);
        }}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
