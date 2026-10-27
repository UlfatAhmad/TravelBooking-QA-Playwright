import { expect, test } from "../fixtures/test-fixtures";
import { HomePage } from "../pages/home.page";
import { createFutureStayDates } from "../utils/date-utils";

test("hotel homepage loads and displays the rooms section", async ({
  homePage
}) => {
  await homePage.open();

  await expect(homePage.welcomeHeading).toBeVisible();
  await expect(homePage.roomsHeading).toBeVisible();

  for (const roomName of HomePage.roomNames) {
    await expect(homePage.roomHeading(roomName)).toBeVisible();
  }
});

test("each room exposes a booking action for its own reservation", async ({
  homePage,
  page
}) => {
  await homePage.open();

  const bookingLinks = page.getByRole("link", { name: "Book now", exact: true });
  await expect(bookingLinks).toHaveCount(HomePage.roomNames.length);

  for (const [index, roomName] of HomePage.roomNames.entries()) {
    const href = await homePage.roomBookingLink(index).getAttribute("href");
    expect(href, `${roomName} room should have a booking URL`).not.toBeNull();
    const bookingUrl = new URL(href!, page.url());
    expect(bookingUrl.pathname).toBe(`/reservation/${index + 1}`);
  }
});

test("selecting a room navigates to its reservation route", async ({
  homePage,
  page,
  reservationPage
}) => {
  await homePage.open();
  await reservationPage.openForRoom(homePage, 0);

  await expect(page).toHaveURL(/\/reservation\/1(?:\?.*)?$/);
});

test("future check-in and check-out dates are applied to each booking action", async ({
  homePage,
  page
}) => {
  const stayDates = createFutureStayDates();

  await homePage.open();
  await homePage.setStayDates(stayDates);
  await homePage.checkAvailabilityButton.click();

  const bookingLinks = page.getByRole("link", { name: "Book now", exact: true });
  await expect(bookingLinks).toHaveCount(HomePage.roomNames.length);

  for (const link of await bookingLinks.all()) {
    const href = await link.getAttribute("href");
    expect(href, "A room booking action should have a URL").not.toBeNull();

    const bookingUrl = new URL(href!, page.url());
    expect(bookingUrl.searchParams.get("checkin")).toBe(stayDates.checkInQuery);
    expect(bookingUrl.searchParams.get("checkout")).toBe(stayDates.checkOutQuery);
  }
});
