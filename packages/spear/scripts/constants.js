const path = require('path');

const MOMULA_PATH = path.resolve(__dirname, '../');
const PROJECT_PATH = process.cwd();
const PROJECT_NODE_VERSION = process.version;
const SERVER_HOST = '127.0.0.1';
const SERVER_PORT = 8888;
const isDev = process.env.NODE_ENV !== 'production';

const NPM_VERSION_URL = 'https://registry.npmjs.org/@morax/spear/latest';

module.exports = {
    MOMULA_PATH,
    PROJECT_PATH,
    PROJECT_NODE_VERSION,
    SERVER_HOST,
    SERVER_PORT,
    isDev,
    NPM_VERSION_URL,
}
