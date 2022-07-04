import React from "react";
import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../components/pages/Login.js";
import { UserProvider } from "../auth/UserProvider.js";

function renderPage(user) {
    return render(
        <UserProvider user={user}>
            <Login />
        </UserProvider>
    );
}

const USER = {
    username: "",
    jwt: "",
    role: "",
};

const USER_LOGIN = {
    username: "samwarren@gmail.com",
    password: "pass",
};

const loginPromise = Promise.resolve(USER_LOGIN);
const loginJest = jest.fn();
jest.mock("../service/auth/AuthenticationManager", () => ({
login: (userData) => loginJest(userData),
}));
  

describe("Login", () => {
    describe("form", () => {
        beforeEach(() => {
            jest.clearAllMocks();
            loginJest.mockReturnValue(loginPromise);
        });

        it("renders login page", () => {
            const { container } = renderPage(USER);

            expect(screen.getByText("Login")).toBeInTheDocument();
            expect(
                container.querySelector("a[role='button'][href='/signup']")
            ).toBeInTheDocument();
        });


        it("renders login form", () => {
            const { container } = renderPage(USER);

            expect(screen.getByLabelText("USERNAME")).toBeInTheDocument();
            expect(screen.getByLabelText("PASSWORD")).toBeInTheDocument();
            expect(
                container.querySelector("button[type='submit']")
            ).toBeInTheDocument();
        });


        it("calls function when submitted", async () => {
            renderPage(USER);

            const username = screen.getByLabelText("USERNAME");
            const password = screen.getByLabelText("PASSWORD");

            userEvent.type(username, USER_LOGIN.username);
            userEvent.type(password, USER_LOGIN.password);

            const submit = screen.getByText("Submit");

            await act(async () => {
                await userEvent.click(submit);  
            });

            expect(loginJest).toHaveBeenCalledWith(USER_LOGIN);
        });
    });

});