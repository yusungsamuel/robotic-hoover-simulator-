//use for nodeJS built-in function to read file content
var fs = require("fs")

//library for creating ASCII animations in terminal
var CliFrames = require("cli-frames");

//library for making tables in terminal
var Table = require('cli-table2');

//function to map out the dirt patches in the room
dirtDistribution = (arr) => {
    let dirtObj = {}
    //check to see if there are dirt patches
    if (arr.length) {
        arr.forEach((data) => {
            //parsing data from a string into a array
            let position = data.split(" ")

            //if key is found, add nested object to it
            if (dirtObj[position[0]]) {
                dirtObj[position[0]][position[1]] = true
            }
            //if not, create new key and nested object
            else {
                dirtObj[position[0]] = {}
                dirtObj[position[0]][position[1]] = true
            }

        })
    }

    //return an object with key values pairs corresponded to the x, y position of the dirt patches
    return (dirtObj)
}

//function to create the room grid, where it takes two parameter w = width and l = length
createRoom = (hX, hY, l, w, dirtMap) => {
    //create  new table object using cli-table2
    let table = new Table()

    //looping to create each row of the room. Start looping from back because cli-table2 create table object with number as key indicating the row number starting from 0 as the top row
    for (let i = w - 1; i > -1; i--) {
        //creating a new row in each loop
        let row = []

        //looping through the row
        for (let j = 0; j < l; j++) {
            //referencing the object with dirt patches location and filling out table with dirt where they are 
            if (dirtMap[j] && dirtMap[j][i]) {

                row.push("x")

            }
            //if no dirt patch in that box, put in blank space
            else {
                row.push(" ")
            }
        }
        //push row to table once done filling it up
        table.push(row)
    }

    //if hoover is placed in room, add to table.
    if (hY || hX) {
        table[hY][hX] = "o"
    }

    //cli table-2 creates a object. parse it into string to be presentable in terminal
    return table.toString()
}

//function for executing the instructions and creating each screenshot for creating animation
followInstruction = (ins, dirtMap, hoover, rmDim) => {
    //stores the hoover position, x coordinate
    let hooverX = parseInt(hoover.split(" ")[0])

    //stores the hoover position, y coordinate
    let hooverY = parseInt(hoover.split(" ")[1])

    //stores the room length in x direction
    let roomX = parseInt(rmDim[0])

    //stores the room length in y direction
    let roomY = parseInt(rmDim[1])

    //keep counts of dirt cleaned by hoover
    let dirtCleaned = 0

    //holds the frames of the animation to be presented in terminal
    let frame = []

    //initial picture of room before hoover was placed
    frame.push(createRoom(null, null, roomX, roomY, dirtMap))

    //if hoover was initially placed on a spot where there is dirt
    //the y coordinate needs to be calculated due to the nature of the cli-table2 format where the top row is row 0. This is also the case for all the other hoover Y position for the rest of the function
    if (dirtMap[hooverX] && dirtMap[hooverX][Math.abs(hooverY - roomY + 1)]) {
        dirtMap[hooverX][Math.abs(hooverY - roomY + 1)] = false
        dirtCleaned++
    }

    //creating the frame once the hoover is placed
    frame.push(createRoom(hooverX, hooverY, roomX, roomY, dirtMap))

    //loop through instructions
    for (let i = 0; i < ins.length; i++) {
        //the math function is used to account for when the hoover is already on the edge so that it will not go beyond the room border, N is -1 since top row is 0 according to the cli-table2 format
        if (ins[i] === "S") {
            hooverY = Math.min(roomY, hooverY + 1)
        }
        else if (ins[i] === "N") {
            hooverY = Math.max(0, hooverY - 1)
        }
        else if (ins[i] === "W") {
            hooverX = Math.max(0, hooverX - 1)
        }
        else {
            hooverX = Math.min(roomX, hooverX + 1)
        }

        //check to see if the hoover landed on a dirt patch
        if (dirtMap[hooverX] && dirtMap[hooverX][Math.abs(hooverY - roomY + 1)]) {
            dirtMap[hooverX][Math.abs(hooverY - roomY + 1)] = false
            dirtCleaned++
        }

        //create a new frame with new hoover position and dirt patches distribution
        frame.push(createRoom(hooverX, hooverY, roomX, roomY, dirtMap))
    }

    //Adding final location of hoover to last frame
    frame[frame.length - 1] += ("\n" + `Your Hoover Bot final location is  ${hooverX} ${Math.abs(hooverY - roomY + 1)}`)

    //add statistic to the last frame 
    frame[frame.length - 1] += ("\n" + `Your Hoover Bot have cleaned ${dirtCleaned} dirt patch(es)!`)


    //return an array of strings of grids
    return frame
}

//function to read and parse data from input.txt and initiate the application
readFile = () => {

    //reading the content in input.txt
    fs.readFile("input.txt", "utf8", (err, data) => {
        if (err) throw err;

        //putting data read from input txt file into an array and separating them line by line
        let dataArr = data.split("\n")

        // the first line of data contain the dimension of the room
        const dimension = dataArr[0].split(" ")


        //second line contains the hoover position
        let hooverPosition = dataArr[1]

        //stores the dirt patches distribution object
        let dirtPatchObject = dirtDistribution(dataArr.slice(2, dataArr.length - 1))

        //last line contain the instruction
        let instruction = dataArr[dataArr.length - 1]

        //stores the array containing each frame after the hoover has moved
        let result = followInstruction(instruction, dirtPatchObject, hooverPosition, dimension)

        //animation object
        new CliFrames({
            frames: ["Hoover Simulator", "READY             ", "SET             ", "GO!             "]
            , autostart: {
                delay: 1000
                , end: function (err, data) {
                    // Create another animation
                    var animation = new CliFrames();
                    animation.load(result);
                    animation.start({
                        repeat: false
                        , delay: 700
                    });

                }
            }
        });

    })
}


readFile()
