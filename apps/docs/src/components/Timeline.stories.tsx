import type { Meta, StoryObj } from "@storybook/react";
import {
  Timeline,
  TimelineItem,
  TimelineDot,
  TimelineConnector,
  TimelineContent,
} from "@chaos_team/chaos-ui/ui";
import { Avatar, AvatarFallback } from "@chaos_team/chaos-ui/ui";
import { CheckCircle2Icon, ClockIcon, XCircleIcon } from "lucide-react";

const meta: Meta<typeof Timeline> = {
  title: "Components/Timeline",
  component: Timeline,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Timeline>
      <TimelineItem
        icon={CheckCircle2Icon}
        title="Order placed"
        description="Order #12345 placed successfully"
        time="2 hours ago"
        status="completed"
      />
      <TimelineItem
        icon={ClockIcon}
        title="Processing"
        description="Your order is being prepared"
        time="1 hour ago"
        status="current"
      />
      <TimelineItem
        icon={XCircleIcon}
        title="Cancelled"
        description="This step was cancelled"
        time="-"
        status="pending"
      />
    </Timeline>
  ),
};

export const Activity: Story = {
  render: () => (
    <Timeline>
      <TimelineItem
        title="User signed up"
        description="New user registered"
        time="10 minutes ago"
      />
      <TimelineItem
        title="Profile updated"
        description="User changed avatar"
        time="5 minutes ago"
      />
      <TimelineItem
        title="Logged in"
        description="User logged in from Chrome"
        time="2 minutes ago"
      />
    </Timeline>
  ),
};

export const Compound: Story = {
  render: () => (
    <Timeline>
      <TimelineItem>
        <div className="flex flex-col items-center self-stretch">
          <TimelineDot variant="success">
            <Avatar className="size-6">
              <AvatarFallback>AC</AvatarFallback>
            </Avatar>
          </TimelineDot>
          <TimelineConnector />
        </div>
        <TimelineContent>
          <p className="text-sm">
            <span className="font-medium">Alice</span>{" "}
            <span className="text-muted-foreground">created a new project</span>
          </p>
          <time className="text-muted-foreground text-xs">10:24</time>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <div className="flex flex-col items-center self-stretch">
          <TimelineDot variant="info">
            <Avatar className="size-6">
              <AvatarFallback>BO</AvatarFallback>
            </Avatar>
          </TimelineDot>
          <TimelineConnector />
        </div>
        <TimelineContent>
          <p className="text-sm">
            <span className="font-medium">Bob</span>{" "}
            <span className="text-muted-foreground">
              commented on the project
            </span>
          </p>
          <time className="text-muted-foreground text-xs">11:02</time>
        </TimelineContent>
      </TimelineItem>
      <TimelineItem>
        <div className="flex flex-col items-center self-stretch">
          <TimelineDot>
            <Avatar className="size-6">
              <AvatarFallback>EV</AvatarFallback>
            </Avatar>
          </TimelineDot>
          <TimelineConnector />
        </div>
        <TimelineContent>
          <p className="text-sm">
            <span className="font-medium">Eve</span>{" "}
            <span className="text-muted-foreground">closed the project</span>
          </p>
          <time className="text-muted-foreground text-xs">12:45</time>
        </TimelineContent>
      </TimelineItem>
    </Timeline>
  ),
};
