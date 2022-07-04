import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AdminPanel from "../service/AdminPanel/AdminPanel.js";
import { UserProvider } from "../auth/UserProvider.js";

const ADMIN = {
    username: "admin",
    jwt: "asd",
    role: "ROLE_ADMIN",
};

const USER = {
    username: "user",
    jwt: "dsa",
    role: "ROLE_USER",
};

const ADMIN_INFO = {
    username: "admin",
    role: "ROLE_ADMIN",
    firstName: "Sam",
    lastName: "Warren",
};

const USER_INFO = {
    username: "user",
    role: "ROLE_USER",
    firstName: "Kjartan",
    lastName: "Einarsson",
};

function renderPage(user, users) {
    return render(
      <UserProvider user={user}>
        <AdminPanel users={users} />
      </UserProvider>
    );
}

const users = [ADMIN_INFO, USER_INFO];
const fetchuserPromise = Promise.resolve(fetchusersResult);


const fetchUserJest = jest.fn();
const enableAccountJest = jest.fn();
const updateAccountRoleJest = jest.fn();
jest.mock("../service/AdminPanel/AdminPanel", () => ({
  fetchuser: (jwt) => fetchUserJest(jwt),
  enableAccount: (username, jwt) => enableAccountJest(username, jwt),
  changeAccountRole: (username, role, jwt) =>
    updateAccountRoleJest(username, role, jwt),
}));

describe("AdminPanel", () => {
    beforeEach(() => {
      jest.resetAllMocks();
    });
  
    describe("List users", () => {
      it("renders list of users", async () => {
        renderPage(ADMIN, [...users, USER]);
        await act(async () => {
          await fetchuserPromise;
        });
        expect(
          screen.getByText(users[0].firstName)
        ).toBeInTheDocument();
        expect(
          screen.getByText(users[1].firstName)
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
        expect(updateAccountRoleJest).toBeCalledWith(
          users[0].username,
          "ROLE_USER",
          ADMIN.jwt
        );
      });
    });
  
    describe("Enable User", () => {
      it("allows Admin to enable user", async () => {
        enableAccountJest.mockReturnValue(enableAccountPromise);
  
        renderPage(ADMIN);
        await act(() => fetchuserPromise);
        expect(screen.getAllByText(/Enable User/i)[0]).toBeInTheDocument();

        act(() => {
          screen.getAllByText(/Enable User/i)[0].click();
        });

        await act(() => enableAccountPromise);
  
        expect(screen.getByText(/Enabled/i)).toBeInTheDocument();
      });
    });
  });