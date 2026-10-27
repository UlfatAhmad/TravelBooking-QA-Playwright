export function isValidDateRange(checkIn: string, checkOut: string): boolean {
  const checkInTime = Date.parse(checkIn);
  const checkOutTime = Date.parse(checkOut);

  return (
    Number.isFinite(checkInTime) &&
    Number.isFinite(checkOutTime) &&
    checkOutTime > checkInTime
  );
}

export interface FutureStayDates {
  checkInDisplay: string;
  checkOutDisplay: string;
  checkInQuery: string;
  checkOutQuery: string;
}

export function createFutureStayDates(
  daysUntilCheckIn = 7,
  stayLengthInDays = 2,
  today = new Date()
): FutureStayDates {
  if (
    !Number.isInteger(daysUntilCheckIn) ||
    daysUntilCheckIn < 1 ||
    !Number.isInteger(stayLengthInDays) ||
    stayLengthInDays < 1
  ) {
    throw new RangeError("Future stay dates require positive whole-day offsets.");
  }

  const checkIn = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate() + daysUntilCheckIn
  );
  const checkOut = new Date(
    checkIn.getFullYear(),
    checkIn.getMonth(),
    checkIn.getDate() + stayLengthInDays
  );

  return {
    checkInDisplay: formatDate(checkIn, "display"),
    checkOutDisplay: formatDate(checkOut, "display"),
    checkInQuery: formatDate(checkIn, "query"),
    checkOutQuery: formatDate(checkOut, "query")
  };
}

function formatDate(date: Date, format: "display" | "query"): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return format === "display"
    ? `${day}/${month}/${year}`
    : `${year}-${month}-${day}`;
}
