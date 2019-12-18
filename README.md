# Hoover Bot Simulator
This application is a simulator of the robotic vaccum, Hoover. It runs on command-line / terminal and it will show how Hoover would potentially function when given instruction. 

## Demo and Explanation
Your copy of the project may not look the same due to personalized terminal.
![demo](hoover-bot-demo.gif)

In the demo, you can see a grid with a "o" and some "x"s on it. The grid represents a room and each boxes represents the possible position that the hoover can go to. The "o" represents the hoover and the "x"s represent the dirt patches in the room. The hoover will navigate the room following the given directions. If the hoover lands on a box with dirt on it, it will clean up that box and the x will be remove from the grid. Once the hoover run through all the directions, it will stop moving and the application will tell you how many dirt patches the hoover cleaned and the final location of the hoover.
***

## Getting Started
You can get a copy of this project on your local machine for testing and development purpose by following the instruction below:

### Prerequisites
You will need to install these before running this application
- [NodeJS](https://nodejs.org/en/download/)
- [NPM](https://docs.npmjs.com/cli/install)

## Installing 
A step by step guide for you to get your development environment running

1. 
```
Clone this repository to your local machine
```
2.
```
# navigate into the directory that you just cloned down using your terminal
$ npm i
# this will install all dependencies

```
3.
```
# once all dependencies are installed
$ node bot
# this will start the application 
```

## Testing
To test out different senarios, edit the input.txt file:
- Required Lines:
    - line 1 =  room dimension
        - first number representing the length on the x axis and second number representing the length on the y axis
    - line 2 = initial location of the hoover
    - Last line = directions
        - each letter representing a direction that the hoover should move. N = go north, etc...
        - all letter must be capitalized
- optional line(s) 
    - any line between the second line and the last line will represent the location of the dirt patch(es)

## Technologies Used
- Javascript - scripting logics powering this application
- Node.js - JavaScript runtime environment that executes JavaScript code outside of a browser

## Node Packaged Used
- [cli-table2s](https://github.com/jamestalmage/cli-table2) - used for drawing grids and tables in terminal
- [cli-frames](https://github.com/IonicaBizau/node-cli-frames#) -  used for creating ASCII animations in Terminal


