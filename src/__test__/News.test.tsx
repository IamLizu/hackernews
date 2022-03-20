import { render } from "@testing-library/react";
import axios from "axios";
import { act } from "react-dom/test-utils";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import News from "../components/News";
import { NewsProvider } from "../context/NewsContext";
import {
  buttonClickerAsync,
  elementFinder,
  renderWithMemoryRouter,
  textExpecter,
} from "../utils/testUtil";

describe("News", () => {
  beforeEach(async () => {
    jest.spyOn(axios, "get").mockResolvedValue({
      data: {
        hits: [
          {
            created_at: "2022-02-12T12:10:12.000Z",
            title: "Can GPT-3 AI write comedy?",
            url: "https://robmanuelfuckyeah.substack.com/p/someone-needs-to-stop-me-playing",
            author: "rossvor",
            created_at_i: 1644667812,
            objectID: "30312182",
          },
        ],
      },
    });
  });

  test("should initially render Loading component", () => {
    render(<News />);

    textExpecter("Loading...");
  });

  test("should render actual news list upon data arrival", async () => {
    await act(async () => {
      render(
        <NewsProvider>
          <MemoryRouter>
            <News />
          </MemoryRouter>
        </NewsProvider>
      );
    });
    await elementFinder("news-block");
  });

  test("should render raw JSON if clicked on a news", async () => {
    renderWithMemoryRouter("/", <App />);

    await buttonClickerAsync("Can GPT-3 AI write comedy?", 0);
    await elementFinder("news-details");
  });

  test("should check if pagination exists", async () => {
    await act(async () => {
      render(
        <NewsProvider>
          <MemoryRouter>
            <News />
          </MemoryRouter>
        </NewsProvider>
      );
    });

    await elementFinder("pagination");
  });
});
