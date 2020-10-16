import { format } from "date-fns";
import isAfter from "date-fns/isAfter";
import isBefore from "date-fns/isBefore";
import isSameDay from "date-fns/isSameDay";
import { getDateFromKey } from "./getDateKey";

type arg = string | Date;

const f = (d) => format(d, "yyyy-MMM-dd");

const isDateWithinRange = (date: arg, minDate: arg, maxDate: arg) => {
  const compare = typeof date === "string" ? getDateFromKey(date) : date;
  const min = typeof minDate === "string" ? getDateFromKey(minDate) : minDate;
  const max = typeof maxDate === "string" ? getDateFromKey(maxDate) : maxDate;
  return (
    (isSameDay(compare, min) || isAfter(compare, min)) &&
    (isSameDay(compare, max) || isBefore(compare, max))
  );
};

export default isDateWithinRange;
