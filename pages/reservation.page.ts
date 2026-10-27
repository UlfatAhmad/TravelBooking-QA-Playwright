import { BasePage } from "./base.page";
import { HomePage } from "./home.page";

export class ReservationPage extends BasePage {
  async openForRoom(homePage: HomePage, roomIndex: number): Promise<void> {
    await homePage.selectRoom(roomIndex);
  }
}
