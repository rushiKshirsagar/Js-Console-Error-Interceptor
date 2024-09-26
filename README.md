# JS Console Error Interceptor

Simple overview of use/purpose.

## Description

The AI-Driven Console Error Interceptor is a powerful JavaScript library designed to enhance developer productivity by providing real-time solutions to JavaScript errors directly in the browser console. When an error occurs in the console, this library automatically intercepts the error message and sends it to OpenAI's API for analysis. The library then retrieves an AI-generated solution and displays it beneath the original error message in the console, offering instant guidance to developers on how to resolve the issue.

## Getting Started

### Dependencies

* node 16

### Installing

* npm i @waba/js-console-error-interceptor

### Executing program

Import
````
import { overrideConsoleError } from "@waba/js-console-error-interceptor";
````

Usage
````
overrideConsoleError();
````

## Version History

* 0.1
    * Initial Release
