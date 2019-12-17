var fs = require("fs")

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
createRoom = (hoover, w, l, dirt) => {
    //create  new table object using cli-table2
    let table = new Table()

    let dirtMap = dirtDistribution(dirt)

    for (let i = 0; i < w; i++) {
        let row = []
        for (let j = 0; j < l; j++) {
            if (dirtMap[i] && dirtMap[i][j]) {

                row.push("x")

            }
            else {
                row.push("")
            }
        }
        table.push(row)
    }
    let hooverX = hoover.split(" ")[0]
    let hooverY = hoover.split(" ")[1]

    table[hooverX][hooverY] += "O"
    console.log(table.toString())
}


readFile = () => {
    fs.readFile("input.txt", "utf8", (err, data) => {
        if (err) throw err;

        //putting data read from input txt file into an array and separating them line by line
        let dataArr = data.split("\n")

        // the first line of data contain the dimension of the room
        const dimension = dataArr[0].split(" ")

        //extracting the length and width of the room and converting the data to a number
        const x = parseInt(dimension[0])
        const y = parseInt(dimension[1])


        //second line contains the hoover position
        let hooverPosition = dataArr[1]

        let dirtPatch = dataArr.slice(2, dataArr.length - 1)

        // dirtDistribution(dirtPatch)
        createRoom(hooverPosition, x, y, dirtPatch)


        //last line contain the instruction
        let instruction = dataArr[dataArr.length - 1]
    })
}


readFile()


