import { waitFor } from "@testing-library/react";
import axios from "axios";
import App from "../App";
import {
  elementFinder,
  renderWithMemoryRouter,
  textExpecter,
  textFinderRx,
} from "../utils/testUtil";

describe("App Router", () => {
  beforeEach(() => {
    jest.spyOn(axios, "get").mockResolvedValue({
      data: { hits: 0 },
    });
  });

  test("should render News page '/'", async () => {
    renderWithMemoryRouter("/", <App />);

    textExpecter("HackerNews");
    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
  });

  test("should render News details page with news id", async () => {
    renderWithMemoryRouter("/news/1", <App />);

    await elementFinder("news-details");
  });

  test("should render NotFound page on invalid route", async () => {
    renderWithMemoryRouter("/invalid", <App />);

    await textFinderRx("404");
  });
});
