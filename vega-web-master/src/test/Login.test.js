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

const BLANK_LOGIN = {
    username: "",
    password: "",
};

const loginPromise = Promise.resolve(USER_LOGIN);
const mockLogin = jest.fn();
jest.mock("../service/auth/AuthenticationManager", () => ({
    login: (userData) => mockLogin(userData),
}));
  

describe("Login", () => {
    describe("form", () => {
        beforeEach(() => {
            jest.clearAllMocks();
            mockLogin.mockReturnValue(loginPromise);
        });

        it("renders login page", () => {
            const { container } = renderPage(USER);

            expect(screen.getByText("Login/SignUp")).toBeInTheDocument();
        });


        it("renders login form", () => {
            const { container } = renderPage(USER);

            expect(screen.getByText("USERNAME")).toBeInTheDocument();
            expect(screen.getByText("PASSWORD")).toBeInTheDocument();
            expect(
                container.querySelector("button[type='submit']")
            ).toBeInTheDocument();
        });


        it("calls function when submitted", async () => {
            const { container } = renderPage(USER);


            const username = screen.getByText("USERNAME");
            const password = screen.getByText("PASSWORD");

            userEvent.type(username, USER_LOGIN.username);
            userEvent.type(password, USER_LOGIN.password);

            const submit = screen.getByText("Submit");

            await act(async () => {
                await userEvent.click(submit);  
            });

            expect(mockLogin).toHaveBeenCalledWith(BLANK_LOGIN);
        });
    });

});