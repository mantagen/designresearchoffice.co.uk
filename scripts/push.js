require("dotenv").config();
const path = require("path");
const ftp = require("basic-ftp");
(async function push() {
  const client = new ftp.Client();
  // client.ftp.verbose = true;
  try {
    await client.access({
      host: process.env.FTP_HOST,
      user: process.env.FTP_USER,
      password: process.env.FTP_PASSWORD,
      secure: false,
    });

    const remoteDirPath = "/dro-static-site";
    // await client.removeDir(remoteDirPath);
    await client.uploadFromDir(
      path.join(__dirname, "../public"),
      remoteDirPath
    );

    console.log("Done.");
  } catch (err) {
    console.log(err);
  }
  client.close();
})();
