import { IFormatData } from "../types/socketType";

export function getRandomChartData(): IFormatData[] {
  const data: IFormatData[] = [];
  const now = Date.now();
  let currentValue = Math.random() * 40 + 30;

  for (let i = 30; i >= 0; i--) {
    const variation = (Math.random() - 0.5) * 10;
    currentValue = Math.min(100, Math.max(0, currentValue + variation));

    data.push({
      time: new Date(now - i * 60000).toLocaleTimeString(),
      value: Math.round(currentValue),
    });
  }

  return data;
}
