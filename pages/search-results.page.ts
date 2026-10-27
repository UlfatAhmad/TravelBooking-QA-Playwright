import { BasePage } from "./base.page";

export class SearchResultsPage extends BasePage {
  async open(path: string): Promise<void> {
    await this.navigateTo(path);
  }
}
