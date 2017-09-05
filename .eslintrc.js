module.exports = {
    "extends": "airbnb",
    "plugins": [
        "import",
        "html"
    ],
    "rules": {
      "one-var": 0,
      "no-underscore-dangle": 0,
      "import/prefer-default-export": 0
    },
    "globals": {
      "document": 1,
      "localStorage": 1,
      "window": 1,
      "location": 1,
      "XMLHttpRequest": 1,
      "fetch": 1,
      "JSHINT": 1,
      "Headers": 1,
      "describe": 1,
      "it": 1,
      "beforeEach": 1,
    }
};
