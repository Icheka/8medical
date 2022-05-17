const fs = require('fs');
const path = require('path');
const Disperser = require('../code-disperser')

function Disperse(to) {
    if (!to) throw "`to` key must be specified!";
    to = to.toLowerCase();

    // 1. get path of types folder for this 'to'
    // 2. clear service types
    // 3. write new types to service types

    // 1.
    const typesDir = fs.readdirSync(__dirname);
    let serviceTypesDir = getServiceTypesDir(to);

    if (serviceTypesDir.length === 0) throw `No service types directory specified for \`${to}\``;
    serviceTypesDir = path.resolve(process.cwd(), ...serviceTypesDir);

    return Disperser.Disperse(__dirname, serviceTypesDir);
}

function getServiceTypesDir(to) {
    switch (to) {
        case "website-ui":
            return ["website-ui", "types", "service-types"];
        case "admin-backend":
            return ["admin-backend", "src", "types", "service-types"];
        case "mobile-app":
            return ["mobile-app", "src", "types", "service-types"];

        default:
            return [];
    }
}


const args = process.argv;

// find the --to flag
let to = args.find((arg) => arg.split("=")[0] === "--to");
if (!to) throw "--to flag must be provided!";
to = to.split('=')[1];

Disperse(to);
