const path = require("path")
const ftp = require("basic-ftp");

(async function push() {
  const client = new ftp.Client();
  client.ftp.verbose = true;
  try {
    await client.access({
      host: "ftp.ibscy.com",
      user: "dro",
      password: "eBPyfU",
      secure: false,
    });

    await client.uploadFromDir(path.join(__dirname, "../public"));

    console.log("Done.");
  } catch (err) {
    console.log(err);
  }
  client.close();
})();
