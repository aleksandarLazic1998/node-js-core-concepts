const { pipeline } = require("stream");
const fsPromises = require("fs/promises");

(async () => {
	const readFile = await fsPromises.open("src.txt", "r");
	const readableStream = readFile.createReadStream();

	const writeFile = await fsPromises.open("dist.txt", "w");
	const writableStream = writeFile.createWriteStream();

	pipeline(readableStream, writableStream, (err) => {
		if (err) console.log(err);
		console.log("finished coping");
	});
})();
