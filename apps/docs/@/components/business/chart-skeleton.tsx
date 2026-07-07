import * as React from "react";
function ChartSkeleton(props: any) {
  return React.createElement("div", {
    "data-slot": "chart-skeleton",
    ...props,
  });
}
export { ChartSkeleton };
