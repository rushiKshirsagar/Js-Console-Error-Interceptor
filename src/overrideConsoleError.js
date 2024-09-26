function overrideConsoleError() {
  const originalConsoleError = console.error;

  console.error = function (...args) {
    originalConsoleError.apply(console, args);

    console.log("Solution: This is where the solution will be provided.");
  };
}

export default overrideConsoleError;
