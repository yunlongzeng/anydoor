const fs = require('fs');
const promisify = require('util').promisify;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

module.exports = async function(req,res,filePath){
    try {
        console.info(1);
        const stats = await stat(filePath);
        if(stats.isFile()){
            console.info(3);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            fs.createReadStream(filePath).pipe(res);
        }else if(stats.isDirectory()){
            console.info(2);
            const files = readdir(filePath);
            res.statusCode = 200;
            res.setHeader('Content-Type', 'text/plain');
            res.end(files.join(','))
        }
    }catch(ex){
        console.info(4);
        res.statusCode = 404;
        res.setHeader('Content-Type', 'text/plain');
        res.end(filePath + ' is not a directory or file!')
    }
}
