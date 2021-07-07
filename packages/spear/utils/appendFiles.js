const fs = require('fs');

const htmlTemp = (projectName) => `<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${projectName}</title>
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>
`

const packageTemp = (projectName) => `{
    "name": "${projectName}",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {},
    "husky": {
        "hooks": {
            "pre-commit": "lint-staged",
            "commit-msg": "commitlint --config .commitlintrc.js -E HUSKY_GIT_PARAMS"
        }
    },
    "lint-staged": {
        "*.{ts,tsx,js}": [
            "eslint --config .eslintrc.js"
        ],
        "*.{css,less,scss}": [
            "stylelint --config .stylelintrc.js"
        ],
        "*.{ts,tsx,js,json,html,yml,css,less,scss,md}": [
            "prettier --write"
        ]
    },
    "browserslist": [
        ">0.2%",
        "not dead",
        "ie >= 9",
        "not op_mini all"
    ],
    "license": "MIT",
    "devDependencies": {
        "@commitlint/cli": "^12.1.4",
        "@commitlint/config-conventional": "^12.1.4",
        "@typescript-eslint/eslint-plugin": "^4.28.1",
        "@typescript-eslint/parser": "^4.28.1",
        "conventional-changelog-cli": "^2.1.1",
        "eslint": "^7.30.0",
        "eslint-config-airbnb": "^18.2.1",
        "eslint-config-prettier": "^8.3.0",
        "eslint-import-resolver-typescript": "^2.4.0",
        "eslint-plugin-import": "^2.23.4",
        "eslint-plugin-jsx-a11y": "^6.4.1",
        "eslint-plugin-promise": "^5.1.0",
        "eslint-plugin-react": "^7.24.0",
        "eslint-plugin-react-hooks": "^4.2.0",
        "eslint-plugin-unicorn": "^34.0.1",
        "husky": "^7.0.0",
        "lint-staged": "^11.0.0",
        "prettier": "^2.3.2",
        "stylelint": "^13.13.1",
        "stylelint-config-prettier": "^8.0.2",
        "stylelint-config-standard": "^22.0.0",
        "typescript": "^4.3.5"
    },
    "dependencies": {
        "@morax/shield": "^0.1.0",
        "@morax/shield-guid": "^0.0.4",
        "react": "^17.0.1",
        "react-dom": "^17.0.1"
    }
}
`

const readmeTemp = (projectName) => `
# README #

${projectName}
`

const configList = (projectName) => ([
    {
        dest: `./${projectName}/public/index.html`,
        temp: htmlTemp(projectName),
    },
    {
        dest: `./${projectName}/package.json`,
        temp: packageTemp(projectName),
    },
    {
        dest: `./${projectName}/README.md`,
        temp: readmeTemp(projectName),
    }
]);

function appendFiles(projectName) {

    const confList = configList(projectName)

    confList.forEach(item => {
        fs.appendFileSync(
            item.dest,
            item.temp,
        );
    });
}

module.exports = appendFiles
