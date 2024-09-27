## ⚠️ JS Console Error Interceptor

## 📝 Description

The AI-Driven Console Error Interceptor is a powerful JavaScript library designed to enhance developer productivity by providing real-time solutions to JavaScript errors directly in the browser console. When an error occurs in the console, this library automatically intercepts the error message and sends it to OpenAI's API for analysis. The library then retrieves an AI-generated solution and displays it beneath the original error message in the console, offering instant guidance to developers on how to resolve the issue.

This library is still in beta and hasn't been thoroughly tested with all Js frameworks/libraries. If you would like to contribute, writing tests, documentation, handling scenarios, please don't hesitate to raise PRs. 

![EF587FAD-DDD3-42AE-8F29-B3008B4F533B_1_201_a](https://github.com/user-attachments/assets/599249c5-081d-4bd9-8635-b39fc901ee1e)

## Getting Started

### 😐 Prerequisites

- node >= 18
- BYO OpenAI API key

### Installing

```
npm i @waba/js-console-error-interceptor
```

### 🎬 Executing

Import and execute the library as shown below in a file that is the starting point of the application.

##### Examples:

- index.js/App.js/index.html in React
- main.ts in Angular
- main.js/index.html in Vite, etc

Import

```
import { overrideConsoleError } from "@waba/js-console-error-interceptor";
```

Usage

```
overrideConsoleError(apiKey);
```

main.jsx - Vite

```
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { overrideConsoleError } from "@waba/js-console-error-interceptor";

overrideConsoleError(apiKey);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);

```
index.html - Vite

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite + React</title>
    <script type="module">
      import { overrideConsoleError } from "@waba/js-console-error-interceptor";
      const apiKey = "YOUR_API_KEY"
      overrideConsoleError(apiKey);
    </script>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>

```

## 😮‍💨 Common issues

1. This utility only identifies errors on the console logged by "console.error()". If you want to see the error messages in the console (and allow the custom console.error override to work), you'll need to disable the framework's (Vite, React, etc) error overlay during development as shown below
  
```
// vite.config.js
export default {
  server: {
    hmr: {
      overlay: false, // Disable Vite's error overlay
    },
  },
};

```

## 🤓 Version History
- 1.0.0
  - Initial Release
- 1.0.3
  - Added console styling + QoL improvements
