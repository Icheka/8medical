const fs = require('fs');
const path = require('path');

exports.Disperse = (from, to) => {
    if (!from) throw "`from` key must be specified!";
    if (!to) throw "`to` key must be specified!";

    // 1. get path of types folder for this 'to'
    // 2. clear service types
    // 3. write new types to service types

    if (fs.existsSync(to)) fs.rm(to, { recursive: true }, err => { throw err });
    // if (fs.existsSync(to)) fs.rm(to, { recursive: true });
    fs.mkdirSync(to, { recursive: true });

    const fromDir = fs.readdirSync(from);

    for (let file of fromDir) {
        if (file === 'script.js') continue;

        const filePath = path.resolve(from, file);

        const rs = fs.createReadStream(filePath);

        rs.on("error", (err) => {
            throw 'RS::' + err;
        });

        const ws = fs.createWriteStream(path.resolve(to, file + '.ts'));

        ws.on("error", (err) => {
            throw 'WS::' + err;
        });

        ws.on("close", () => {
            console.log(`Copied types for ${file} successfully!`);
        });

        rs.pipe(ws);
    }
}