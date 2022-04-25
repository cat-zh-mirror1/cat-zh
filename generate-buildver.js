var fs = require("fs");
var buildFile = "build.version.json"
var publicFile = "./public/build.version.json"
var GitHub = "sw-GitHub.js"
var Netlify = "sw-Netlify.js"

console.log("Incrementing build number...");
var buildRevision = fs.readFileSync(buildFile)
metadata = JSON.parse(buildRevision);

try {
	var swRevision = fs.readFileSync(publicFile)
	swRevision = JSON.parse(swRevision).swRevision;
} catch (err) {
	swRevision = 0
}
swRevision = swRevision ? swRevision : 0

metadata.swRevision = swRevision + 1
fs.writeFile(publicFile, JSON.stringify(metadata), err => { if (err) throw err; })
console.log(`Current build number: ${metadata.swRevision}`);

var str = "const swRevision = " + metadata.swRevision
	+ "\nconst GHCDN = 'https://cdn.jsdelivr.net/gh/cat-zh-mirror1'"
var strGitHub = str + "\nconst BACKUP = ''"
fs.writeFile(GitHub, strGitHub, err => { if (err) throw err; })
//var strNetlify = str + "\nconst BACKUP = 'https://cat-zh-mirror1.github.io'"
//fs.writeFile(Netlify, strNetlify, err => { if (err) throw err; })