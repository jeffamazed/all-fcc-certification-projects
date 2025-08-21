# Exercise Tracker Microservice

This project is a backend Exercise Tracker microservice built using **Node.js**, **Express**, and **MongoDB**.  
It allows users to create accounts, log exercises, and retrieve their exercise logs with optional filters.

## Features

- Create a new user via POST request
- Add exercises with description, duration, and date via POST request
- Retrieve a user's exercise log via GET request
- Supports optional query parameters `from`, `to`, and `limit`
- Returns JSON responses with `username`, `_id`, `count`, and `log`

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose

## Credits

This project is inspired by and part of the [freeCodeCamp Backend Development curriculum](https://www.freecodecamp.org/learn/back-end-development-and-apis/).  
Project structure and requirements provided by [freeCodeCamp](https://www.freecodecamp.org/).
