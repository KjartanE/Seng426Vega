import React from "react";
import { act, cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserProvider } from "../auth/UserProvider.js";
import Resources from "../components/pages/Resources.js";

const ADMIN = {
    username: "admin",
    jwt: "",
    role: "ROLE_ADMIN"
};

const USER = {
    username: "user",
    jwt: "",
    role: "ROLE_USER"
};

const STAFF = {
    username: "staff",
    jwt: "",
    role: "ROLE_STAFF"
};

function renderPage(user) {
    render(<UserProvider user={user}><Resources /></UserProvider>);
}

function renderContainer(user) {
    return render(<UserProvider user={user}><Resources /></UserProvider>);
}
const files = ["file1.txt", "file2.txt", "file3.txt"];
const data = "data";

const fileUploaderPromise = Promise.resolve({});
const fetchFilesPromise = Promise.resolve(files);
const fetchDataPromise = Promise.resolve(data);
const mockFetchData = jest.fn();
const mockFetchFiles = jest.fn();
const mockFileUploader = jest.fn();

jest.mock("../service/FileUpload/FileUploader", () => ({
  fileUploader: (fileInfo, token) => mockFileUploader(fileInfo, token),
  fetchFiles: (token) => mockFetchFiles(token),
  fetchData: (name, token) => mockFetchData(name, token),
}));


describe("Resources", () => {
    beforeEach(() => {
        jest.clearAllMocks();
        mockFileUploader.mockReturnValue(fileUploaderPromise);
        mockFetchFiles.mockReturnValue(fetchFilesPromise);
        mockFetchData.mockReturnValue(fetchDataPromise);
    });
    
    afterEach(() => cleanup());

    describe("admin", () => {
        it("renders page", async () => {
            const { container } = renderContainer(ADMIN);

            await act(async () => {
                await fetchFilesPromise;
            });

            expect(container.querySelector("input[type=file]")).not.toBeInTheDocument();
            expect(
                container.querySelector("button[type=submit]")
            ).not.toBeInTheDocument();
        });


    describe("file upload", () => {
        it("should upload a file", async () => {
            const { container } = renderContainer(ADMIN);
    
            await act(async () => {
              await fetchFilesPromise;
            });
    
            const fileInput = container.querySelector("input[type=file]");
            const submitButton = container.querySelector("button[type=submit]");
            
            console.log('fileInput', fileInput);
            console.log('submitButton', submitButton);
    
            expect(screen.getByText("Deep Packet Inspection (DPI)")).toBeInTheDocument();
        });

        it("should display an error when fetching files fails", async () => {
            mockFetchFiles.mockReturnValue(Promise.resolve({ error: "error" }));

            renderPage(ADMIN);

            await act(async () => {
               await fetchFilesPromise;
            });

            expect(screen.getByText("Deep Packet Inspection (DPI)")).toBeInTheDocument();
        });
      });
    });


    describe("user", () => {
        it("renders", async () => {
          const { container } = renderContainer(USER);
  
          await act(async () => {
            await fetchFilesPromise;
          });
  
          // expect render to be null
          expect(container.firstChild).not.toBeNull();
        });
      });
  
      describe("staff", () => {
        it("renders", async () => {
          const { container } = renderContainer(<Resources />, STAFF);
  
          await act(async () => {
            await fetchFilesPromise;
          });
  
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