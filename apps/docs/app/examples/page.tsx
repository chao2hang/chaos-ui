import type { Metadata } from "next";
import { ExamplesOverview } from "@/components/examples/examples-overview";

export const metadata: Metadata = {
  title: "Examples",
};

export default function ExamplesPage() {
  return <ExamplesOverview />;
}
