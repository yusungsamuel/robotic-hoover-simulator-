var fs = require("fs")

readFile = () => {
    fs.readFile("input.txt", "utf8", (err, data)=>{
        if (err) throw err;
        
        //putting data read from input txt file into an array and separating them line by line
        let dataArr = data.split("\n")
        
        // the first line of data contain the dimension of the room
        let dimension = dataArr[0]

        //second line contains the hoover position
        let hooverPosition = dataArr[1]

        //last line contain the instruction
        let instruction = dataArr[dataArr.length - 1]
    })
}





readFile();