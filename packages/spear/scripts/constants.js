const path = require('path');

const SPEAR_PATH = path.resolve(__dirname, '../');
const PROJECT_PATH = process.cwd();
const PROJECT_NODE_VERSION = process.version;
const SERVER_HOST = '127.0.0.1';
const SERVER_PORT = 8888;
const isDev = process.env.NODE_ENV !== 'production';

const NPM_VERSION_URL = 'https://registry.npmjs.org/@morax/spear/latest';

const TEMPLATES = [
  'morax-template'
];

const GITHUB = {
  host: 'github.com/mochen0505'
}

const PLUGINS = {
  guid: {
    name: 'guid',
    dependencies: '@morax/shield-guid', // 用作index.js import
    checked: true, // inquirer 交互的时候是否默认选中
    appUse: 'i18n', // 生成index.js app.use(i18n)使用
  },
};

module.exports = {
    SPEAR_PATH,
    PROJECT_PATH,
    PROJECT_NODE_VERSION,
    SERVER_HOST,
    SERVER_PORT,
    isDev,
    NPM_VERSION_URL,
    TEMPLATES,
    GITHUB,
    PLUGINS,
}
