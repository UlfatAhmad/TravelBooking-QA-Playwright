import { BasePage } from "./base.page";

export class HotelDetailsPage extends BasePage {
  async open(path: string): Promise<void> {
    await this.navigateTo(path);
  }
}
