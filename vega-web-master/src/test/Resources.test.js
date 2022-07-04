import React from "react";
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserProvider } from "../auth/UserProvider.js";
import Resources from "../components/pages/Resources.js";

const ADMIN = {
    username: "admin",
    jwt: "jwt",
    role: "ROLE_ADMIN"
};

const USER = {
    username: "user",
    jwt: "jwt",
    role: "ROLE_USER"
};

const STAFF = {
    username: "staff",
    jwt: "jwt",
    role: "ROLE_STAFF"
};

function renderPage(children, user) {
    return render(<UserProvider user={user}>{children}</UserProvider>);
}

const files = ["file1.txt", "file2.txt", "file3.txt"];
const data = "data";

const fileUploaderPromise = Promise.resolve({});
const fetchFilesPromise = Promise.resolve(files);
const fetchDataPromise = Promise.resolve(data);
const fetchDataJest = jest.fn();
const fetchFilesJest = jest.fn();
const fileUploaderJest = jest.fn();

jest.mock("../service/FileUpload/FileUploader", () => ({
  fileUploader: (fileInfo, token) => fileUploaderJest(fileInfo, token),
  fetchFiles: (token) => fetchFilesJest(token),
  fetchData: (name, token) => fetchDataJest(name, token),
}));


describe("Resources", () => {
    beforeEach(() => {
        fileUploaderJest.mockReturnValue(fileUploaderPromise);
        fetchFilesJest.mockReturnValue(fetchFilesPromise);
        fetchDataJest.mockReturnValue(fetchDataPromise);
    });
    
    afterEach(() => cleanup());

    describe("admin", () => {
        it("renders page", async () => {
            const { container } = renderPage(<Resources />, ADMIN);

            await act(async () => {
                await fetchFilesPromise;
            });

            expect(screen.getByTestId("resources-header")).toBeInTheDocument();
            expect(container.querySelector("input[type=file]")).toBeInTheDocument();
            expect(
                container.querySelector("button[type=submit]")
            ).toBeInTheDocument();
        });


    describe("file upload", () => {
        it("should upload a file", async () => {
          const { container } = renderPage(<Resources />, ADMIN);
  
          await act(async () => {
            await fetchFilesPromise;
          });
  
          const fileInput = container.querySelector("input[type=file]");
          const submitButton = container.querySelector("button[type=submit]");
          userEvent.upload(fileInput, "./test.txt");
  
          await act(async () => {
            await userEvent.click(submitButton);
          });
  
          expect(mockFileUploader).toHaveBeenCalled();
        });
  
        it("should display an error if the file upload fails", async () => {
          mockFileUploader.mockReturnValue(Promise.resolve({ error: "error" }));
          const { container } = renderPage(<Resources />, ADMIN);
  
          await act(async () => {
            await fetchFilesPromise;
          });
  
          const fileInput = container.querySelector("input[type=file]");
          const submitButton = container.querySelector("button[type=submit]");
          userEvent.upload(fileInput, "./test.txt");
  
          await act(async () => {
            await userEvent.click(submitButton);
          });
  
          expect(mockFileUploader).toHaveBeenCalled();
          expect(
            screen.getByText("Failed to upload. Please try again later.")
          ).toBeInTheDocument();
        });

        it("should display an error when fetching files fails", async () => {
            fetchFilesJest.mockReturnValue(Promise.resolve({ error: "error" }));

            renderPage(<Resources />, ADMIN);

            await act(async () => {
               await fetchFilesPromise;
            });

            expect(screen.getByText("Could not fetch files.")).toBeInTheDocument();
        });
      });
    });


    describe("user", () => {
        it("renders", async () => {
          const { container } = renderPage(<Resources />, USER_USER);
  
          await act(async () => {
            await fetchFilesPromise;
          });
  
          // expect render to be null
          expect(container.firstChild).toBeNull();
        });
      });
  
      describe("staff", () => {
        it("renders", async () => {
          const { container } = renderPage(<Resources />, STAFF_USER);
  
          await act(async () => {
            await fetchFilesPromise;
          });
  
          expect(screen.getByTestId("resources-header")).toBeInTheDocument();
          expect(
            container.querySelector("input[type=file]")
          ).not.toBeInTheDocument();
          expect(
            container.querySelector("button[type=submit]")
          ).not.toBeInTheDocument();
  
          files.forEach((file) => {
            expect(screen.getByText(file)).toBeInTheDocument();
          });
        });
      });
});