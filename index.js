
/** *********************************************************
 * Load all files in a npm directory as object
 * Only supporting ES6 modules for now
 ***********************************************************/

const _ = require('lodash');
const path = require('path');
const debug = require('debug')('loader');
const glob = require('glob-promise');


/**
 * Loader function
 * @param  {String} directory [path of the directory]
 * @param  {Object} opts [override the default]
 * @return {Object} [the loaded object]
 */
module.exports = function loader(directory) {
  debug('Loading.. ', directory);

  // get all the files
  return glob('**/*.js', {
    cwd: directory,
  })
  .then((files) => {
    debug('Files.. ', files);
    const root = {};
    files.forEach((fileName) => {
      const filePath = path.resolve(directory, fileName);
      const base = path.relative(directory, filePath);
      _.set(root, path.basename(_.replace(base, /\//g, '.'), '.js'), require(filePath)); // eslint-disable-line
    });
    return root;
  });
};
