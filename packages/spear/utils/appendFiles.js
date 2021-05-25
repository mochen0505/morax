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
        "@commitlint/cli": "^9.1.2",
        "@commitlint/config-conventional": "^9.1.2",
        "@typescript-eslint/eslint-plugin": "^3.10.1",
        "@typescript-eslint/parser": "^3.10.1",
        "conventional-changelog-cli": "^2.1.0",
        "eslint": "^7.7.0",
        "eslint-config-airbnb": "^18.2.0",
        "eslint-config-prettier": "^6.11.0",
        "eslint-import-resolver-typescript": "^2.2.1",
        "eslint-plugin-import": "^2.22.0",
        "eslint-plugin-jsx-a11y": "^6.3.1",
        "eslint-plugin-promise": "^4.2.1",
        "eslint-plugin-react": "^7.20.6",
        "eslint-plugin-react-hooks": "^4.1.0",
        "eslint-plugin-unicorn": "^21.0.0",
        "husky": "^4.2.5",
        "lint-staged": "^10.2.13",
        "prettier": "^2.0.5",
        "stylelint": "^13.6.1",
        "stylelint-config-prettier": "^8.0.2",
        "stylelint-config-standard": "^20.0.0",
        "typescript": "^4.0.2"
    },
    "dependencies": {
        "@morax/shield": "^0.1.0",
        "@morax/shield-guid": "^0.0.1",
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
