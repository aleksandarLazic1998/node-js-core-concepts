const FileWriteStream = require("../createCustomWriter/createCustomWriter");

(async () => {
	const numberOfWrites = 1_000_000;

	const customWritableStream = new FileWriteStream({ fileName: "src.txt" });

	let index = 0;

	function myWrites() {
		while (index < numberOfWrites) {
			const buffer = Buffer.from(` ${index} `, "utf-8");

			if (!customWritableStream.write(buffer)) break;

			if (index === numberOfWrites - 1) {
				return customWritableStream.end(buffer);
			}

			index++;
		}
	}

	myWrites();

	customWritableStream.on("drain", () => {
		myWrites();
	});

	customWritableStream.on("finish", () => {
		console.log("Stream has finished.");
	});
})();
