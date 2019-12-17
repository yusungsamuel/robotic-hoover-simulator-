var fs = require("fs")

readFile = () => {
    fs.readFile("input.txt", "utf8", (err, data)=>{
        if (err) throw err;
        console.log(data)
    })
}

readFile();