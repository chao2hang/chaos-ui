/**
 * Pure helpers for lightweight pure-SVG chart hover (CUI-DASH-07 / #22).
 * Maps pointer X into a discrete data index using the rendered plot box and viewBox.
 */

/** Clamp `n` into [min, max]. */
export function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

/**
 * Map a client X coordinate to the nearest data index for evenly spaced points.
 *
 * @param clientX Pointer clientX
 * @param plotLeft getBoundingClientRect().left of the plot element
 * @param plotWidth getBoundingClientRect().width of the plot element
 * @param pad Horizontal padding used when building the viewBox paths
 * @param chartWidth ViewBox width (same units as pad / step)
 * @param len Number of data points (>= 1)
 */
export function indexFromClientX(
  clientX: number,
  plotLeft: number,
  plotWidth: number,
  pad: number,
  chartWidth: number,
  len: number,
): number {
  if (len <= 1) return 0;
  if (plotWidth <= 0 || chartWidth <= 0) return 0;
  const ratio = (clientX - plotLeft) / plotWidth;
  const viewX = ratio * chartWidth;
  const stepX = (chartWidth - pad * 2) / Math.max(1, len - 1);
  if (stepX <= 0) return 0;
  const raw = (viewX - pad) / stepX;
  return clamp(Math.round(raw), 0, len - 1);
}

/**
 * Map a client X coordinate to the nearest bar index for fixed bar width + gap layouts.
 * ViewBox uses absolute bar positions: `gap + i * (barW + gap)`.
 */
export function barIndexFromClientX(
  clientX: number,
  plotLeft: number,
  plotWidth: number,
  viewWidth: number,
  barCount: number,
  barW: number,
  gap: number,
): number {
  if (barCount <= 1) return 0;
  if (plotWidth <= 0 || viewWidth <= 0) return 0;
  const ratio = (clientX - plotLeft) / plotWidth;
  const viewX = ratio * viewWidth;
  const slot = barW + gap;
  const raw = (viewX - gap - barW / 2) / slot;
  return clamp(Math.round(raw), 0, barCount - 1);
}

export interface ChartTooltipItem {
  name: string;
  value: number;
  color: string;
}
