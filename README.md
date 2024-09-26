# JS Console Error Interceptor

## Description

The AI-Driven Console Error Interceptor is a powerful JavaScript library designed to enhance developer productivity by providing real-time solutions to JavaScript errors directly in the browser console. When an error occurs in the console, this library automatically intercepts the error message and sends it to OpenAI's API for analysis. The library then retrieves an AI-generated solution and displays it beneath the original error message in the console, offering instant guidance to developers on how to resolve the issue.

## Getting Started

### Dependencies

- node 16

### Installing

```
npm i @waba/js-console-error-interceptor
```

### Executing program

Import and execute the library as shown below in a file that is the starting point of the application.

##### Examples:

- index.js/App.js in React
- main.ts in Angular
- main.js in Vite, etc

Import

```
import { overrideConsoleError } from "@waba/js-console-error-interceptor";
```

Usage

```
overrideConsoleError();
```

Full main.jsx - Vite

```
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { overrideConsoleError } from "@waba/js-console-error-interceptor";

overrideConsoleError();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

```

## Version History

- 0.1
  - Initial Release
