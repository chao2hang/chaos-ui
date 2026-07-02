import type { Meta, StoryObj } from "@storybook/react";
import { ContractTemplate } from "@/components/business/contract-template";
import type { ContractField, ContractMetadata } from "@/components/business/contract-template";

const meta = {
  title: "Business/ContractTemplate",
  component: ContractTemplate,
  tags: ["autodocs"],
} satisfies Meta<typeof ContractTemplate>;

export default meta;
type Story = StoryObj;

const sampleFields: ContractField[] = [
  {
    name: "partyA",
    label: "Party A",
    category: "party",
    type: "text",
  },
  {
    name: "partyB",
    label: "Party B",
    category: "party",
    type: "text",
  },
  {
    name: "contactA",
    label: "Contact A",
    category: "party",
    type: "text",
    description: "Primary contact for Party A",
  },
  {
    name: "amount",
    label: "Total Amount",
    category: "financial",
    type: "currency",
    defaultValue: "50000",
  },
  {
    name: "deposit",
    label: "Deposit",
    category: "financial",
    type: "currency",
    defaultValue: "10000",
  },
  {
    name: "startDate",
    label: "Start Date",
    category: "date",
    type: "date",
  },
  {
    name: "endDate",
    label: "End Date",
    category: "date",
    type: "date",
  },
  {
    name: "paymentTerms",
    label: "Payment Terms",
    category: "terms",
    type: "text",
    description: "Payment terms and conditions",
  },
  {
    name: "deliveryTerms",
    label: "Delivery Terms",
    category: "terms",
    type: "text",
  },
  {
    name: "projectName",
    label: "Project Name",
    category: "custom",
    type: "text",
  },
];

const sampleTemplate = `SERVICE AGREEMENT

This Service Agreement (the "Agreement") is entered into as of {{startDate}} by and between {{partyA}} ("Client") and {{partyB}} ("Provider").

1. PROJECT DESCRIPTION
The Provider agrees to deliver services for the project "{{projectName}}" as described in the attached Statement of Work.

2. COMPENSATION
The Client agrees to pay the Provider a total amount of {{amount}} for the services rendered. A deposit of {{deposit}} is due upon signing this Agreement.

3. PAYMENT TERMS
{{paymentTerms}}

4. DELIVERY TERMS
{{deliveryTerms}}

5. TERM
This Agreement shall commence on {{startDate}} and continue until {{endDate}}, unless terminated earlier in accordance with the provisions herein.

IN WITNESS WHEREOF, the parties have executed this Agreement as of {{startDate}}.

{{partyA}}                          {{partyB}}
(Client)                            (Provider)`;

const sampleValues: Record<string, string | number> = {
  partyA: "Acme Corporation",
  partyB: "TechSolutions Ltd.",
  contactA: "John Smith",
  amount: 75000,
  deposit: 15000,
  startDate: "2025-07-01",
  endDate: "2026-06-30",
  paymentTerms: "Net 30 days from invoice date. Late payments subject to 1.5% monthly interest.",
  deliveryTerms: "All deliverables to be provided within 90 days of project kickoff.",
  projectName: "Digital Transformation Initiative",
};

const sampleMetadata: ContractMetadata = {
  contractNo: "SA-2025-0042",
  contractType: "service",
  effectiveDate: "2025-07-01",
  expiryDate: "2026-06-30",
  partyA: "Acme Corporation",
  partyB: "TechSolutions Ltd.",
  amount: 75000,
  status: "draft",
};

export const Default: Story = {
  args: {
    template: sampleTemplate,
    fields: sampleFields,
    metadata: sampleMetadata,
    sampleValues,
  },
};

export const WithMetadata: Story = {
  args: {
    template: sampleTemplate,
    fields: sampleFields,
    metadata: {
      ...sampleMetadata,
      status: "review",
    },
    sampleValues,
    activeTab: "metadata",
  },
};

export const PreviewMode: Story = {
  args: {
    template: sampleTemplate,
    fields: sampleFields,
    metadata: sampleMetadata,
    sampleValues,
    activeTab: "preview",
  },
};

export const ReadOnly: Story = {
  args: {
    template: sampleTemplate,
    fields: sampleFields,
    metadata: {
      ...sampleMetadata,
      status: "signed",
    },
    sampleValues,
    readOnly: true,
    activeTab: "preview",
  },
};

export const DarkMode: Story = {
  args: {
    template: sampleTemplate,
    fields: sampleFields,
    metadata: sampleMetadata,
    sampleValues,
  },
  parameters: {
    backgrounds: { default: "dark" },
  },
  decorators: [
    (Story) => (
      <div className="dark">
        <Story />
      </div>
    ),
  ],
};
