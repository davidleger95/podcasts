const withPlugins = require('next-compose-plugins');
const withSvgr = require('next-svgr');
const withYAML = require('next-yaml');

module.exports = withPlugins([[withSvgr], [withYAML]], {
  // global config
});
