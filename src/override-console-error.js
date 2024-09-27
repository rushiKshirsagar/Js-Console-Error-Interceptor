import { defaultConsoleStyle } from "../constants/console-styling";
import { agentSetup, prompt, successMessage } from "../constants/gpt-constants";

async function fetchSolutionFromOpenAI(errorMessage, apiKey) {
  const apiEndpoint = "https://api.openai.com/v1/chat/completions"; // Endpoint for GPT-3.5 turbo

  const messages = [
    {
      role: "system",
      content: agentSetup,
    },
    {
      role: "user",
      content: `${prompt} ${errorMessage}`,
    },
  ];

  const response = await fetch(apiEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 150,
    }),
  });

  const data = await response.json();
  return data.choices && data.choices[0] && data.choices[0].message.content
    ? data.choices[0].message.content.trim()
    : "No solution found.";
}

function overrideConsoleError(apiKey) {
  console.log(
    "%cError interceptor library has been loaded and is now monitoring console errors.",
    defaultConsoleStyle
  );
  const originalConsoleError = console.error;

  console.error = async function (...args) {
    // Log the original error
    originalConsoleError(...args);

    let errorMessage = "";
    if (args.length > 1) {
      let formattedString = args[0]; // This is the string with %s placeholders
      let count = 0; // To keep track of replacements

      // Replace %s in the string with corresponding elements from the array
      formattedString = formattedString.replace(/%s/g, () => args[++count]);
      errorMessage = formattedString;
    } else {
      errorMessage = args[0];
    }

    try {
      // Fetch the solution from OpenAI API
      const solution = await fetchSolutionFromOpenAI(
        errorMessage.slice(0, 1000),
        apiKey
      );

      // Log the solution after the error

      console.log(`%c${successMessage} ${solution}`, defaultConsoleStyle);
    } catch (err) {
      // In case of an error fetching the solution, log a default message
      console.log(errorMessage);
    }
  };
}

export default overrideConsoleError;