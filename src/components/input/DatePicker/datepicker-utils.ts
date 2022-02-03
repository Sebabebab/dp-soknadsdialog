import { DayPickerProps } from "react-day-picker";
import { DateUtils } from "react-day-picker";
import dateFnsParse from "date-fns/parse";
import dateFnsFormat from "date-fns/format";

const modifiers = {
  sundays: { daysOfWeek: [0] },
};

const modifiersStyles = {
  sundays: { color: "#C30000" },
  selected: { color: "#FFFFFF" },
};

export const dayPickerProps: DayPickerProps = {
  showOutsideDays: true,
  firstDayOfWeek: 1,
  modifiers,
  modifiersStyles,
};

export function parseDate(str: string, format: string) {
  const parsed = dateFnsParse(str, format, new Date());
  if (DateUtils.isDate(parsed)) {
    return parsed;
  }
  return undefined;
}

export function formatDate(date: Date, format: string) {
  return dateFnsFormat(date, format);
}