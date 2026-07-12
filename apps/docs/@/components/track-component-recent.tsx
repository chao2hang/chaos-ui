"use client";

import { useEffect } from "react";
import { pushRecentComponent } from "@/lib/component-recents";

/** Client island: record detail-page visits into localStorage recents. */
export function TrackComponentRecent({ slug }: { slug: string }) {
  useEffect(() => {
    if (slug) pushRecentComponent(slug);
  }, [slug]);
  return null;
}
