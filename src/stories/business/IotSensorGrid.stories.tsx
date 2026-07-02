import type { Meta, StoryObj } from "@storybook/react";
import { IotSensorGrid } from "@/components/business/iot-sensor-grid";
import type { Sensor } from "@/components/business/iot-sensor-grid";

const meta = {
  title: "Business/IotSensorGrid",
  component: IotSensorGrid,
  tags: ["autodocs"],
} satisfies Meta<typeof IotSensorGrid>;
export default meta;
type Story = StoryObj<typeof meta>;

const sensors: Sensor[] = [
  { id: "s1", name: "Temp-A1", location: "Warehouse A — Zone 1", type: "temperature", value: 22.5, unit: "°C", minThreshold: 10, maxThreshold: 35, batteryLevel: 85, signalStrength: 92, lastUpdate: "2s ago" },
  { id: "s2", name: "Hum-B2", location: "Warehouse B — Zone 2", type: "humidity", value: 68, unit: "%", minThreshold: 30, maxThreshold: 70, batteryLevel: 45, signalStrength: 60, lastUpdate: "5s ago" },
  { id: "s3", name: "Press-L3", location: "Production Line 3", type: "pressure", value: 2.8, unit: "bar", minThreshold: 1.5, maxThreshold: 3.0, batteryLevel: 72, signalStrength: 85, lastUpdate: "1s ago" },
  { id: "s4", name: "CO2-OF1", location: "Office Floor 1", type: "co2", value: 1200, unit: "ppm", minThreshold: 0, maxThreshold: 1000, batteryLevel: 70, signalStrength: 80, lastUpdate: "3s ago" },
  { id: "s5", name: "Vib-PR", location: "Pump Room", type: "vibration", value: 0.5, unit: "mm/s", minThreshold: 0, maxThreshold: 2.0, batteryLevel: 90, signalStrength: 95, lastUpdate: "2s ago" },
  { id: "s6", name: "Flow-M1", location: "Main Pipe", type: "flow", value: 45.2, unit: "L/min", minThreshold: 20, maxThreshold: 80, batteryLevel: 55, signalStrength: 70, lastUpdate: "4s ago" },
  { id: "s7", name: "Volt-BU", location: "Backup Battery", type: "voltage", value: 12.1, unit: "V", minThreshold: 11.0, maxThreshold: 14.0, batteryLevel: 100, signalStrength: 88, lastUpdate: "1s ago" },
  { id: "s8", name: "Temp-C2", location: "Cold Storage 2", type: "temperature", value: -5.2, unit: "°C", minThreshold: -10, maxThreshold: 5, batteryLevel: 12, signalStrength: 25, lastUpdate: "1m ago" },
];

export const Default: Story = {
  args: { sensors, title: "Factory IoT Dashboard", refreshInterval: 5000 },
};

export const Alarms: Story = {
  args: {
    sensors: [
      { ...sensors[3]!, value: 1450 } as any,
      { ...sensors[6]!, value: 10.2 } as any,
      { ...sensors[2]!, value: 3.5 } as any,
      { ...sensors[7]!, value: -15, batteryLevel: 8 } as any,
      { ...sensors[4]!, status: "offline" as const } as any,
    ],
    title: "Active Alarms",
  },
};

export const Empty: Story = {
  args: { sensors: [], title: "No Sensors" },
};
