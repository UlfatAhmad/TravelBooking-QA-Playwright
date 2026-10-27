import { expect, test } from "../fixtures/test-fixtures";
import { isValidDateRange } from "../utils/date-utils";

test("provides valid synthetic booking data", async ({ booking }) => {
  expect(booking.destination).toBe("Lisbon");
  expect(booking.hotelName).toBe("Synthetic Riverside Hotel");
  expect(booking.adults).toBeGreaterThan(0);
  expect(booking.rooms).toBeGreaterThan(0);
  expect(isValidDateRange(booking.checkIn, booking.checkOut)).toBe(true);
});
