const { Writable } = require("stream");
const fs = require("fs");

class FileWriteStream extends Writable {
	constructor({ highWaterMark, fileName }) {
		super({ highWaterMark });

		this.fileName = fileName;
		this.chunks = [];
		this.chunkSize = 0;
		this.numberOfWrites = 0;
		this.fileDescriptor = null;
	}

	_construct(callback) {
		fs.open(this.fileName, "w", (err, fd) => {
			if (err) {
				callback(err);
			} else {
				this.fileDescriptor = fd;
				/* Note: Never emit events from child classes like: "drain", "end", "drain",...etc. */
				callback();
			}
		});
	}

	_write(chunk, encoding, callback) {
		// Do our write operation

		fs.open(this.fileName, "w", (err) => {
			if (err) {
				callback(err);
			} else {
				this.chunks.push(chunk);
				this.chunkSize = chunk.length;
				++this.numberOfWrites;
				callback(); // when we call callback function, Node.js emits drain event that we can use.
			}
		});
	}

	_final(callback) {
		fs.write(this.fileDescriptor, Buffer.concat(this.chunks), (err) => {
			if (err) return callback(err);

			callback();
			this.chunks = [];
		});
	}

	_destroy(error, callback) {
		if (error) return callback(error);

		console.log("Number of writes:", this.numberOfWrites);

		if (this.fileDescriptor) {
			fs.close(this.fileDescriptor, (err) => callback(err || error));
		}
	}
}

module.exports = FileWriteStream;
