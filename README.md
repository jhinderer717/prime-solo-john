## HandicApp

## Description

This application tracks a users golf handicap. A user can view, add, edit, and delete rounds with all of their own statistics. The app shows a graph breakdown of individual aspects of the game and their contributions to the overall round score. The app also tells a user some trends in their recent rounds.


## Screenshots

[!screenshot](src/components/ScreenShot.png)

## Prerequisites

- Node.js
- PostgreSQL

## Install

- run `npm install`
- run `npm run server`
- run `npm run client`


## Usage

Create a database table in Postgres named `prime_solo_john` or your own choice if you change the name in pool.js settings in the server fil. Use the database.sql file to create the necessary tables. At this point the app should be ready to use. The browser should open a window to localhost automatically where the app prompts you to login or register.