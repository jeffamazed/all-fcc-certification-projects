# URL Shortener Microservice

This project is a backend URL shortening microservice built using **Node.js** and **Express**.  
It allows users to submit a URL and receive a shortened version, which can then be used to redirect to the original URL.

## Features

- Accepts a valid URL via POST request
- Generates a unique short URL identifier
- Redirects short URLs to the original URL
- Returns JSON responses with `original_url` and `short_url`
- Handles duplicate URLs by returning the existing short URL

## Tech Stack

- Node.js
- Express.js

## Credits

This project is inspired by and part of the [freeCodeCamp Backend Development curriculum](https://www.freecodecamp.org/learn/back-end-development-and-apis/).  
Project structure and requirements provided by [freeCodeCamp](https://www.freecodecamp.org/).
