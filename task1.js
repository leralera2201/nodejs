const fs = require('fs');
const path = require('path');

let folder18 = path.join(process.cwd(), '1800');
let folder20 = path.join(process.cwd(), '2000');


const moveFiles = (oldPath, newPath) => {
    fs.writeFile(newPath, '', function (err) {
        if (err) {
            console.error(err)
        }
    });
    const readStream = fs.createReadStream(oldPath);
    const writeStream = fs.createWriteStream(newPath);
    readStream.pipe(writeStream);
    fs.unlink(oldPath, (err) => {
        if(err){
            console.log(err)
        }
    });
}

const readFiles = (oldDir, newdir) => {
    fs.readdir(oldDir, (err, files) => {
        if (err) {
            console.log(err);
        } else {
            files.forEach(file =>{
                moveFiles(path.join(oldDir, file), path.join(newdir, file))
            })
        }

    })
}

readFiles(folder18, folder20)
readFiles(folder20, folder18)

