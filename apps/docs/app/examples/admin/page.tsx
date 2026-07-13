import type { Metadata } from "next";
import { AdminExamplePage } from "@/components/examples/admin-example-page";

export const metadata: Metadata = {
  title: "Admin Template",
};

export default function AdminExamplesRoutePage() {
  return <AdminExamplePage />;
}
