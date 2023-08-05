/*
Notes:

Node.js je napisan u C++
*/

/*
Ucenje ce ici:

Understanding a Concept
Reading a Source Code
Building an Application
*/

/*
komanda: node -v -> .nvmrc ce uzeti node verziju i upisati je u .nvmrc fajl
komanda: nvm use - ce uci u .nvmrc fajl ako postoji i setovati verziju node-a koju koristimo na tu verziju
*/

const http = require('http');
const fs = require('fs/promises');

const PORT = 8000;

const server = http.createServer(async (req, res) => {
  const contentBuffer = await fs.readFile(__dirname + '/text.txt');

  /*
  Buffer je data koju donbijemo kao jedinice i nule slicno je kao slice of byte u GO
  */

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end(contentBuffer.toString('utf-8'));
});

server.listen(PORT, () => console.log('Started on port: ' + PORT));
