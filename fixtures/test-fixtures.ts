import { test as base } from "@playwright/test";
import { HotelDetailsPage } from "../pages/hotel-details.page";
import { HomePage } from "../pages/home.page";
import { ReservationPage } from "../pages/reservation.page";
import { SearchResultsPage } from "../pages/search-results.page";
import { sampleBooking, type BookingData } from "../test-data/booking-data";

interface TestFixtures {
  booking: BookingData;
  homePage: HomePage;
  reservationPage: ReservationPage;
  searchResultsPage: SearchResultsPage;
  hotelDetailsPage: HotelDetailsPage;
}

export const test = base.extend<TestFixtures>({
  booking: async ({}, use) => {
    await use(sampleBooking);
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  reservationPage: async ({ page }, use) => {
    await use(new ReservationPage(page));
  },
  searchResultsPage: async ({ page }, use) => {
    await use(new SearchResultsPage(page));
  },
  hotelDetailsPage: async ({ page }, use) => {
    await use(new HotelDetailsPage(page));
  }
});

export { expect } from "@playwright/test";
