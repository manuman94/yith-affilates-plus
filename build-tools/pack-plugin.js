const fs = require("fs");
const archiver = require("archiver");
const path = require("path");

const PLUGIN_NAME = "yith-affiliates-plus";

const pluginPath = path.resolve(__dirname, "../");
const distPath = path.resolve(pluginPath, "dist/");
const outputPath = path.resolve(distPath, PLUGIN_NAME + ".zip");

// Ensure the 'dist' directory exists
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true });
}

// Check if the output ZIP file already exists and remove it if it does
if (fs.existsSync(outputPath)) {
  fs.unlinkSync(outputPath);
}

// Create a file to stream archive data to.
const output = fs.createWriteStream(path.resolve(outputPath));
const archive = archiver("zip", {
  zlib: { level: 9 }, // Sets the compression level.
});

output.on("close", function () {
  console.log(
    "Archive created successfully! Total bytes: " + archive.pointer()
  );
});

archive.on("warning", function (err) {
  if (err.code === "ENOENT") {
    console.warn("Warning:", err);
  } else {
    throw err;
  }
});

archive.on("error", function (err) {
  throw err;
});

// Pipe archive data to the file
archive.pipe(output);

// Correct usage of archive.glob to ensure proper file inclusion without recursion
archive.glob("**/*", {
  cwd: pluginPath,
  ignore: ["**/dist/**", "**/node_modules/**", "**/build-tools/**"], // Ensure the ignore paths are correct
});

// Finalize the archive (ie we are done appending files but streams have to finish yet)
archive.finalize();
