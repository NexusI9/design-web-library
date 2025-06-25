// Define entries path for html-modules

const outdir = (moduleName, fileName) =>
  `static-modules/glm/${moduleName}/scripts/${fileName}`;
const indir = (moduleName, fileName) =>
  `./src/components/Modules/glm/${moduleName}/${fileName}`;

module.exports.html_modules_entries = {
  /*
      main entries
  */
  [outdir("carousel", "index")]: indir("carousel", "index.js"),
  [outdir("slideshow", "index")]: indir("slideshow", "index.js"),
  /*
      message entries (temporaries)
  */
  [outdir("carousel", "delete.me")]: indir("carousel", "message-handler.ts"),
  [outdir("slideshow", "delete.me")]: indir("slideshow", "message-handler.ts"),
};
