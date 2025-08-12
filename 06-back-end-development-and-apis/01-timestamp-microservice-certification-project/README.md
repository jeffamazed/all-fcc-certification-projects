# Backend Dev & API Timestamp Microservice

This project is a backend API timestamp microservice built using **Node.js** and **Express**.  
It handles date parsing and returns JSON responses with Unix and UTC timestamps.

## Features

- Accepts optional date parameters in the URL  
- Parses dates as Unix timestamps (milliseconds) or date strings  
- Returns JSON with `unix` (number) and `utc` (string) keys  
- Returns current date/time if no date parameter is provided  
- Handles invalid date inputs gracefully with error responses  

## Tech Stack

- Node.js  
- Express.js  

## Credits

This project is inspired by and part of the [freeCodeCamp Backend Development curriculum](https://www.freecodecamp.org/learn/back-end-development-and-apis/).  
Project structure and requirements provided by [freeCodeCamp](https://www.freecodecamp.org/).
