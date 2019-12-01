/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');

const getWorkspaces = require('get-yarn-workspaces'); //eslint-disable-line
const blacklist = require('metro-config/src/defaults/blacklist'); //eslint-disable-line

const workspaces = getWorkspaces(__dirname);

module.exports = {
  projectRoot: path.resolve(__dirname, '.'),

  watchFolders: [path.resolve(__dirname, '../../node_modules')],

  resolver: {
    blacklistRE: blacklist(
      workspaces
        .filter(
          workspacePath => workspacePath.indexOf('packages/mobile') === -1
        )
        .map(
          workspacePath =>
            new RegExp(
              `^${escape(
                path.resolve(__dirname, workspacePath, 'node_modules')
              )}\\/.*$`
            )
        )
    ),
    // https://github.com/facebook/metro/issues/1#issuecomment-453450709
    extraNodeModules: new Proxy(
      {},
      {
        get: (target, name) => path.join(process.cwd(), `node_modules/${name}`),
      }
    ),
  },

  // http://facebook.github.io/react-native/blog/2019/03/12/releasing-react-native-059#faster-app-launches-with-inline-requires
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
