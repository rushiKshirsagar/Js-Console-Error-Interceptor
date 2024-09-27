const {
  fetchSolutionFromOpenAI,
  overrideConsoleError,
} = require("../src/override-console-error");

jest.mock("../src/override-console-error", () => ({
  fetchSolutionFromOpenAI: jest.fn(),
}));

describe("fetchSolutionFromOpenAI", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("should return solution from OpenAI", async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: "This is a solution.",
          },
        },
      ],
    };

    fetch.mockResponseOnce(JSON.stringify(mockResponse));

    const apiKey = "dummy-api-key";
    const result = await fetchSolutionFromOpenAI("Sample error", apiKey);

    expect(result).toBe("This is a solution.");
    expect(fetch).toHaveBeenCalledWith(
      "https://api.openai.com/v1/chat/completions",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          Authorization: `Bearer ${apiKey}`,
        }),
      })
    );
  });

  it('should return "No solution found." if no choices are returned', async () => {
    const mockResponse = { choices: [] };
    fetch.mockResponseOnce(JSON.stringify(mockResponse));

    const apiKey = "dummy-api-key";
    const result = await fetchSolutionFromOpenAI("Sample error", apiKey);

    expect(result).toBe("No solution found.");
  });

  it('should return "No solution found." if the message content is empty', async () => {
    const mockResponse = {
      choices: [
        {
          message: {
            content: "",
          },
        },
      ],
    };
    fetch.mockResponseOnce(JSON.stringify(mockResponse));

    const apiKey = "dummy-api-key";
    const result = await fetchSolutionFromOpenAI("Sample error", apiKey);

    expect(result).toBe("No solution found.");
  });
});

describe("overrideConsoleError", () => {
  let originalConsoleError;
  let originalConsoleLog;

  beforeEach(() => {
    originalConsoleError = console.error;
    originalConsoleLog = console.log;
    console.error = jest.fn();
    console.log = jest.fn();
  });

  afterEach(() => {
    console.error = originalConsoleError;
    console.log = originalConsoleLog;
  });

  it("should log a message when the library is loaded", () => {
    const apiKey = "dummy-api-key";
    overrideConsoleError(apiKey);

    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining("Error interceptor library has been loaded"),
      expect.anything()
    );
  });

  it("should override console.error and fetch solution from OpenAI", async () => {
    const mockSolution = "This is a solution.";
    fetchSolutionFromOpenAI.mockResolvedValue(mockSolution);

    const apiKey = "dummy-api-key";
    overrideConsoleError(apiKey);

    console.error("Test error");

    await new Promise(setImmediate); // Wait for promises to resolve

    expect(fetchSolutionFromOpenAI).toHaveBeenCalledWith("Test error", apiKey);
    expect(console.log).toHaveBeenCalledWith(
      expect.stringContaining(mockSolution),
      expect.anything()
    );
  });

  it("should log the original error and not crash if fetchSolutionFromOpenAI fails", async () => {
    fetchSolutionFromOpenAI.mockRejectedValue(new Error("API Failure"));

    const apiKey = "dummy-api-key";
    overrideConsoleError(apiKey);

    console.error("Test error");

    await new Promise(setImmediate); // Wait for promises to resolve

    expect(console.error).toHaveBeenCalledWith("Test error");
    expect(fetchSolutionFromOpenAI).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith("Test error");
  });
});
