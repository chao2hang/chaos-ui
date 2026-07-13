import type { Metadata } from "next";
import { PublicExamplePage } from "@/components/examples/public-example-page";

export const metadata: Metadata = {
  title: "Public Template",
};

export default function PublicExamplesRoutePage() {
  return <PublicExamplePage />;
}
