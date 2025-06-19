// Define entries path for html-modules

const outdir = (name) => `static-modules/glm/${name}/scripts/index`;
const indir = (name) => `./src/components/Modules/glm/${name}/index.js`;

const entry = (name) => ({ [outdir(name)]: indir(name) });

module.exports.html_modules_entries = {
  ...entry("carousel"),
  ...entry("slideshow"),
};
