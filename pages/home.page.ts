import { BasePage } from "./base.page";
import type { Locator } from "@playwright/test";
import type { FutureStayDates } from "../utils/date-utils";

export class HomePage extends BasePage {
  static readonly roomNames = ["Single", "Double", "Suite"] as const;

  readonly bookingSection = this.page.locator("#booking");
  readonly welcomeHeading = this.page.getByRole("heading", {
    name: "Welcome to Shady Meadows B&B"
  });
  readonly roomsHeading = this.page.getByRole("heading", { name: "Our Rooms" });
  readonly checkAvailabilityButton = this.page.getByRole("button", {
    name: "Check Availability"
  });
  readonly stayDateInputs = this.bookingSection.locator("input.form-control");

  async open(): Promise<void> {
    await this.navigateTo("/");
  }

  async setStayDates(dates: FutureStayDates): Promise<void> {
    await this.stayDateInputs.nth(0).fill(dates.checkInDisplay);
    await this.stayDateInputs.nth(1).fill(dates.checkOutDisplay);
  }

  roomHeading(name: string): Locator {
    return this.page.getByRole("heading", { name, exact: true });
  }

  roomBookingLink(index: number): Locator {
    return this.page.getByRole("link", { name: "Book now", exact: true }).nth(index);
  }

  async selectRoom(index: number): Promise<void> {
    if (!Number.isInteger(index) || index < 0 || index >= HomePage.roomNames.length) {
      throw new RangeError(`Room index must be between 0 and ${HomePage.roomNames.length - 1}.`);
    }

    await this.roomBookingLink(index).click();
  }
}
