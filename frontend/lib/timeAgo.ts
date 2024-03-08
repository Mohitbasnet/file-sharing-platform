import { formatDistanceToNow } from "date-fns";

export default function convertTime(timestamp: string): string {
  const date = new Date(timestamp);
  return formatDistanceToNow(date, { addSuffix: true });
}
