import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminPanel from "../components/pages/AdminPanel.js";
import { UserProvider } from "../auth/UserProvider.js";

const ADMIN = {
    username: "admin",
    jwt: "",
    role: "ROLE_ADMIN",
};

const USER = {
    username: "user",
    jwt: "dsa",
    role: "ROLE_USER",
};

const ADMIN_INFO = {
    username: "admin",
    role: { authority: "ROLE_STAFF"},
    enabled: true,
    firstName: "Sam",
    lastName: "Warren",
};

const USER_INFO = {
    username: "user",
    role: { authority: "ROLE_USER" },
    enabled: false,
    firstName: "Kjartan",
    lastName: "Einarsson",
};

const usersDetails = [ADMIN_INFO, USER_INFO];
const fetchuserPromise = Promise.resolve(usersDetails);

const enableAccountPromise = Promise.resolve();
const mockChangeAccountRolePromise = Promise.resolve();

const mockFetchUser = jest.fn();
const mockEnableAccount = jest.fn();
const mockUpdateAccountRole = jest.fn();
jest.mock("../service/AdminPanel/AdminPanel", () => ({
  fetchuser: (jwt) => mockFetchUser(jwt),
  enableAccount: (username, jwt) => mockEnableAccount(username, jwt),
  changeAccountRole: (username, role, jwt) =>
    mockUpdateAccountRole(username, role, jwt),
}));

async function renderPage(user, users = usersDetails) {
    render(
      <UserProvider user={user}>
        <AdminPanel users={users} />
      </UserProvider>
    );

    return await act(async () => {
        await fetchuserPromise;
    });
}

describe("AdminPanel", () => {
    beforeEach(() => {
        jest.resetAllMocks();
        mockFetchUser.mockReturnValue(fetchuserPromise);
        mockEnableAccount.mockReturnValue(enableAccountPromise);
        mockUpdateAccountRole.mockReturnValue(mockChangeAccountRolePromise);
        jest.spyOn(React, "useEffect").mockImplementation((f) => f());
    });
  
    describe("List users", () => {
      it("renders list of users", async () => {
        renderPage(ADMIN, [...usersDetails, USER]);
        await act(async () => {
          await fetchuserPromise;
        });
        expect(
          screen.getByText(usersDetails[0].firstName)
        ).toBeInTheDocument();
        expect(
          screen.getByText(usersDetails[1].firstName)
        ).toBeInTheDocument();
      });
    });
  
    describe("Change Role", () => {
      it("Admin able to change user roles", async () => {
        jest.spyOn(React, "useEffect").mockImplementation((f) => f());
  
        renderPage(ADMIN);
        await act(() => fetchuserPromise);
  
        const select = screen.getAllByDisplayValue("Open this select menu")[0];
  
        userEvent.selectOptions(select, "ROLE_USER");
        expect(mockUpdateAccountRole).toBeCalledWith(
            usersDetails[0].username,
            "ROLE_USER",
            ADMIN.jwt
        );
      });
    });
  
    describe("Enable User", () => {
      it("allows Admin to enable user", async () => {
        mockEnableAccount.mockReturnValue(enableAccountPromise);
  
        await renderPage(ADMIN, usersDetails);

        expect(screen.getAllByText(/Enable User/i)[0]).toBeInTheDocument();

        act(() => {
          screen.getAllByText(/Enable User/i)[0].click();
        });

        await act(() => enableAccountPromise);
  
        expect(screen.getByText(/Kjartan/i)).toBeInTheDocument();
      });
    });
  });