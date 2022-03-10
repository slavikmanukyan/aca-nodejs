const { Readable, Transform } = require("stream");
const moment = require("moment");

const readableStream = new Readable({
  read() {
    setTimeout(() => {
      this.push(new Date().getTime() + '');
    }, 1000);
  },
});

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    const formattedDate = moment(+chunk.toString()).format(
      "YYYY-MM-DD HH:mm:ss"
    );
    callback(null, formattedDate + "\n");
  },
});

readableStream.pipe(transformStream).pipe(process.stdout);
