import { render, screen } from "@testing-library/react";
import Home from "../app/page";
import fetchMock from "jest-fetch-mock";
import * as api from "../lib/api";

import { BackendUnavailableError } from "../lib/backend-error";

test("renders the login page with heading", async () => {
  fetchMock.resetMocks();
  // 1回目: getInventoryStats, 2回目: getSampleUser
  fetchMock.mockResponseOnce(JSON.stringify([]));
  fetchMock.mockResponseOnce(
    JSON.stringify({
      employeeId: "U0001",
      name: "テストユーザー",
      department: "開発部"
    })
  );

  render(await Home());

  // Check if the heading is rendered
  const heading = screen.getByRole("heading", {
    name: /ノートPCやモニタの予約から返却までを/i,
  });
  expect(heading).toBeInTheDocument();

  // Check if the login section exists
  const loginText = screen.getByText(/Login/i);
  expect(loginText).toBeInTheDocument();
});

test("shows BackendUnavailablePage when backend is unavailable (fetch rejects)", async () => {
  fetchMock.resetMocks();
  // 1回目: getInventoryStats, 2回目: getSampleUser
  fetchMock.mockRejectOnce(new BackendUnavailableError("/api/stats"));
  fetchMock.mockResponseOnce(
    JSON.stringify({
      employeeId: "U0001",
      name: "テストユーザー",
      department: "開発部"
    })
  );

  render(await Home());
  // BackendUnavailablePage の文言が出ること
  expect(
    screen.getByRole("heading", { name: /現在、ページの表示処理に問題があります。/ })
  ).toBeInTheDocument();
});

test("throws non-backend errors (getInventoryStats throws other error)", async () => {
  fetchMock.resetMocks();
  // getInventoryStatsは rejected Promise を返して allSettled の経路を通す
  jest.spyOn(api, "getInventoryStats").mockImplementationOnce(() =>
    Promise.reject(new Error("Some other error"))
  );
  // getSampleUserは正常レスポンス
  fetchMock.mockResponseOnce(
    JSON.stringify({
      employeeId: "U0001",
      name: "テストユーザー",
      department: "開発部"
    })
  );

  // Home() を呼ぶと throw されることを検証
  await expect(Home()).rejects.toThrow("Some other error");
});