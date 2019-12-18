//use for nodeJS built-in function to read file content
var fs = require("fs")

//library for creating ASCII animations in Terminal
var CliFrames = require("cli-frames");

var Table = require('cli-table2');

//function to map out the dirt patches in the room
dirtDistribution = (arr) => {
    let dirtObj = {}
    //check to see if there are dirt patches
    if (arr.length) {
        arr.forEach((data) => {
            let position = data.split(" ")
            if (dirtObj[position[0]]) {
                dirtObj[position[0]][position[1]] = true
            }
            else {
                dirtObj[position[0]] = {}
                dirtObj[position[0]][position[1]] = true
            }

        })
    }
    return (dirtObj)
}

//function to create the room grid, where it takes two parameter w = width and l = length
createRoom = (hX, hY, l, w, dirtMap) => {
    //create  new table object using cli-table2
    let table = new Table()

    for (let i = w-1; i > -1; i--) {
        let row = []
        for (let j = 0; j < l; j++) {
            if (dirtMap[j] && dirtMap[j][i]) {

                row.push("x")

            }
            else {
                row.push(" ")
            }
        }
        table.push(row)
    }

    if(hY || hX){
        table[hY][hX] = "o"
    }
    
    return table.toString()
}

followInstruction = (ins, dirtMap, hoover, rmDim) => {
    let hooverX = parseInt(hoover.split(" ")[0])
    let hooverY = parseInt(hoover.split(" ")[1])
    let roomX = parseInt(rmDim[0])
    let roomY = parseInt(rmDim[1])
    let dirtCleaned = 0

    let frame = []
    frame.push(createRoom(null, null, roomX, roomY, dirtMap))
    if(dirtMap[hooverX] && dirtMap[hooverX][Math.abs(hooverY-roomY+1)]){
        dirtMap[hooverX][Math.abs(hooverY-roomY+1)] = false
        dirtCleaned ++
    }
    frame.push(createRoom(hooverX, hooverY, roomX, roomY, dirtMap))

    for (let i = 0; i < ins.length; i ++){
        if(ins[i] === "S"){
            hooverY = Math.min(roomY, hooverY + 1)
        }
        else if(ins[i] === "N"){
            hooverY = Math.max(0, hooverY - 1)
        }
        else if(ins[i] === "W"){
            hooverX = Math.max(0, hooverX - 1)
        }
        else {
            hooverX = Math.min(roomX, hooverX + 1)
        }

        if(dirtMap[hooverX] && dirtMap[hooverX][Math.abs(hooverY-roomY+1)]){
            dirtMap[hooverX][Math.abs(hooverY-roomY+1)] = false
            dirtCleaned ++
        }
        frame.push(createRoom(hooverX, hooverY, roomX, roomY, dirtMap))
    }
        frame[frame.length-1] += ("\n" +`Your Hoover Bot have cleaned ${dirtCleaned} dirt patch(es)!`)
        frame[frame.length-1] += ("\n" + `Your Hoover Bot final location is  ${hooverX} ${Math.abs(hooverY-roomY+1)}`)
        
    
    return  frame
}


readFile = () => {
    fs.readFile("input.txt", "utf8", (err, data) => {
        if (err) throw err;

        //putting data read from input txt file into an array and separating them line by line
        let dataArr = data.split("\n")

        // the first line of data contain the dimension of the room
        const dimension = dataArr[0].split(" ")


        //second line contains the hoover position
        let hooverPosition = dataArr[1]

        let dirtPatchObject = dirtDistribution(dataArr.slice(2, dataArr.length - 1))

        //last line contain the instruction
        let instruction = dataArr[dataArr.length - 1]

        let result = followInstruction(instruction, dirtPatchObject, hooverPosition, dimension)
        

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
