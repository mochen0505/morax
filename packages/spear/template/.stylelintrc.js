module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-prettier'
    ],
    rules: {
        'comment-empty-line-before': null,
        'declaration-empty-line-before': null,
        'function-name-case': 'lower',
        'no-descending-specificity': null,
        'no-invalid-double-slash-comments': null,
        'rule-empty-line-before': 'always',
    },
    ignoreFiles: ['node_modules/**/*', 'build/**/*'],
}
