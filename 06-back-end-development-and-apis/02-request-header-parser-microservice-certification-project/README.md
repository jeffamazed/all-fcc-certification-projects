# Backend Dev & API Request Header Parser Microservice

This project is a backend API request header parser microservice built using **Node.js** and **Express**.  
It reads HTTP request headers and returns information about the client's IP address, language, and software.

## Features

- Returns client's IP address (`ipaddress`)
- Returns preferred language (`language`) from the `Accept-Language` header
- Returns client's software information (`software`) from the `User-Agent` header
- Handles requests with accurate JSON responses

## Tech Stack

- Node.js
- Express.js

## Credits

This project is inspired by and part of the [freeCodeCamp Backend Development curriculum](https://www.freecodecamp.org/learn/back-end-development-and-apis/).  
Project structure and requirements provided by [freeCodeCamp](https://www.freecodecamp.org/).
