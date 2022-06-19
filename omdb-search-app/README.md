# OMDB Search App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

This app allows the user to search the movie names and allows the user to nominate upto 5 movies.
The user can modify the selection by toggling the selection.
The selection is stored in the local storage.

# How to start the app

To begin the app, please run: `npm install && npm start`

# Run tests

To run the tests, please run: `npm run test`

# Versions

React: 18.2
Redux: 4.2 (react-redux v8.0.2 is used)

# Components

`src/index.js` is the starting point wrt the UI, which is wrapped with a store provider and calls the `App` component.

`App.js` is the parent component calling Header, SearchInput and Home components.

`Header`: A static component which just has a header.

`SearchInput`: A component which is responsible for the user to key in the movie names

`Home`: Component which contains the major chunk of content.

`Tile`: Component which is used to show the movie name, year and the nominate/remove nominate button.

`Banner`: Component which gives hint to users regarding the nominations and warning once the limit is reached.

`constants.js`: File which has all the static exportable content


