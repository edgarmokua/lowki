# Lowki
Lowki is a chat app that is built in React Native and Firebase.
## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [How I worked on this project](#how-i-worked-on-this-project)
* [How to navigate on this project](#how-to-navigate-on-this-project)
* [Why I built the project this way](#why-i-built-the-project-this-way)
* [If I had more time i would change this](#if-i-had-more-time-i-would-change-this)
* [Available Scripts](#available-scripts)
## General Info
Lowki is a chat app that is built in React Native and Firebase.\
Download Expo Go on your device and scan the QR code from here https://expo.dev/@jmokua/lowki in order to use Lowki Application\
Sign in or Log in to access the chats and create chat rooms.
## Technologies
Project is created with:
- @react-native-community/masked-view version: 0.1.1
- @react-navigation/native version: 5.9.4
- @react-navigation/stack version: 5.14.5
- expo version: 41.0.1
- expo-status-bar version: 1.0.4
- firebase version: 8.2.3
- react version: 16.13.1
- react-dom version: 16.13.1
- react-native version: 0.63.4
- react-native-elements version: 3.4.2
- react-native-gesture-handler version: 1.10.3
- react-native-reanimated version: 2.1.0
- react-native-safe-area-context version: 3.2.0
- react-native-screens version: 3.0.0
- react-native-web version: 0.13.12
- expo-splash-screen version: 0.10.2
- expo-updates version: 0.5.4
- react-native-unimodules version: 0.13.3

## How I worked on this project
My goal was to simulate a professional work environment:
- I built this app based on the application Signal Designs.
- I worked with tasks on my personal to do list that i created.
## How to navigate on this project
The application uses Firebase authentication to sign up or Log in users.\
Users can then create chat rooms where they can communicate freely.
## Why I built the project this way
I didn't use state management library such as Redux on purpose. For this app simple ```useState``` is sufficient. I realised that more and more projects don't use Redux since GraphQL or react-query are often used to manage data.\
React Native Elements is a great library for styling when using React Native. It performs the same functions as Material-UI and provides styling for various components.\
My plan is to become a Full Stack Developer eventually but for now i am focusing on Front End and that is why i chose to use an existing API rather than create a custom server. I have basic Backend knowledge as well.
## If I had more time i would change this
- Create more precise commits
- Create branches and use pull requests to generate a good workflow
- Use Trello to handle my tasks during development
- Add End to End encryption
- Allow for personal chat rooms to be created
- Improve on the UI
- Integrate the use of GIFs
## Available Scripts
```
$npm start
```
