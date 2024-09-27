import {
  defaultConsoleStyle,
  errorConsoleStyle,
  libraryFailedToLoadMessage,
  libraryLoadedMessage,
} from "../constants/console-styling";
import {
  agentSetup,
  gptEndpoint,
  prompt,
  successMessage,
} from "../constants/gpt-constants";

async function fetchSolutionFromOpenAI(errorMessage, apiKey) {
  const apiEndpoint = gptEndpoint;

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
  if (apiKey) {
    console.log(libraryLoadedMessage, defaultConsoleStyle);
    const originalConsoleError = console.error;

    console.error = async function (...args) {
      originalConsoleError(...args);

      let errorMessage = "";
      if (args.length > 1) {
        let formattedString = args[0];
        let count = 0;

        formattedString = formattedString.replace(/%s/g, () => args[++count]);
        errorMessage = formattedString;
      } else {
        errorMessage = args[0];
      }

      try {
        const solution = await fetchSolutionFromOpenAI(
          errorMessage.slice(0, 1000),
          apiKey
        );

        console.log(`%c${successMessage} ${solution}`, defaultConsoleStyle);
      } catch (err) {
        console.log(errorMessage);
      }
    };
  } else {
    console.log(libraryFailedToLoadMessage, errorConsoleStyle);
  }
}

export default overrideConsoleError;
