module.exports = {
    extends: [
        'plugin:vue/recommended',
    ],
    plugins: [
        'vuetify'
    ],
    rules: {
        'vuetify/no-deprecated-classes' : 'error',
        'vuetify/no-legacy-grid' : 'error',
        // "indent": ["error", 4],
    },
    parserOptions: {
        parser: "babel-eslint",
    }
}
