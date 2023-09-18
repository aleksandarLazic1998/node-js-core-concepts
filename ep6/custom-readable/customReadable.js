const { Readable } = require("stream");
const fs = require("fs");

class FileStreamRead extends Readable {
	constructor({ highWaterMark, filename }) {
		super({ highWaterMark });
		this.filename = filename;
		this.fileDescriptor = null;
	}

	_construct(callback) {
		fs.open(this.filename, (err, fd) => {
			if (err) return callback(err);

			this.fileDescriptor = fd;
			callback();
		});
	}

	_read(size) {
		const buffer = Buffer.alloc(size);

		fs.read(this.fileDescriptor, buffer, 0, size, null, (err, bytesRead) => {
			if (err) return this.destroy(err);

			// null is to indicate the end of the stream
			this.push(bytesRead > 0 ? buffer.subarray(0, bytesRead) : null);
		});
	}
	_destroy(err, callback) {
		if (this.fileDescriptor) {
			fs.close(this.fileDescriptor, (er) => callback(er || err));
			return;
		}

		callback(err);
	}
}

module.exports = FileStreamRead;
