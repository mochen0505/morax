const OFF = 0
const WARN = 1
const ERROR = 2

module.exports = {
    "env": {
        "browser": true,
        "es2020": true,
        "node": true
    },
    "extends": [
        "airbnb",
        "airbnb/hooks",
        "plugin:react/recommended",
        "plugin:unicorn/recommended",
        "plugin:promise/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
        "prettier/@typescript-eslint",
        "prettier/react",
        "prettier/unicorn",
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "unicorn",
        "promise",
        "@typescript-eslint"
    ],
    "settings": {
        "import/resolver": {
            "node": {
                "extensions": [".tsx", ".ts", ".js", ".json"],
            },
            "typescript": {},
        },
    },
    "rules": {
        "import/extensions": [
            ERROR,
            "ignorePackages",
            {
                ts: "never",
                tsx: "never",
                json: "never",
                js: "never",
            },
        ],
        "import/no-extraneous-dependencies": [ERROR, { devDependencies: true }],
        "import/prefer-default-export": OFF,
        "import/no-unresolved": ERROR,

        "unicorn/better-regex": ERROR,
        "unicorn/prevent-abbreviations": OFF,
        "unicorn/filename-case": [
            ERROR,
            {
                cases: {
                    // 中划线
                    kebabCase: true,
                    // 小驼峰
                    camelCase: true,
                    // 下划线
                    snakeCase: false,
                    // 大驼峰
                    pascalCase: true,
                },
            },
        ],
        "unicorn/no-array-instanceof": WARN,
        "unicorn/no-for-loop": WARN,
        "unicorn/prefer-add-event-listener": [
            ERROR,
            {
                excludedPackages: ['koa', 'sax'],
            },
        ],
        "unicorn/prefer-query-selector": ERROR,
        "unicorn/no-null": OFF,

        "@typescript-eslint/no-useless-constructor": ERROR,
        "@typescript-eslint/no-empty-function": WARN,
        "@typescript-eslint/no-var-requires": OFF,
        "@typescript-eslint/explicit-function-return-type": OFF,
        "@typescript-eslint/explicit-module-boundary-types": OFF,
        "@typescript-eslint/no-explicit-any": OFF,

        "react/jsx-filename-extension": [ERROR, { extensions: ['.tsx', 'ts', '.jsx', 'js'] }],
        "react/jsx-one-expression-per-line": OFF,
        "react/destructuring-assignment": OFF,
        "react/state-in-constructor": OFF,
        "react/jsx-props-no-spreading": OFF,

        "jsx-a11y/click-events-have-key-events": OFF,
        "jsx-a11y/no-noninteractive-element-interactions": OFF,

        "lines-between-class-members": [ERROR, 'always'],
        "quotes": OFF,
        "semi": OFF,
        "no-unused-expressions": WARN,
        "no-plusplus": OFF,
        "no-console": WARN,
        "jsx-quotes": OFF,
        "global-require": OFF,
    }
};
