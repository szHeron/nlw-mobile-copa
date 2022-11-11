module.exports = function(api) {
  api.cache(true);
  return {
    presets: [
     'babel-preset-expo'
    ],
    plugins: [
      ["module:react-native-dotenv", {
        "envName": "APP_ENV",
        "moduleName": "@env",
        "path": ".env",
        "blocklist": null,
        "allowlist": [
          "CLIENT_ID"
        ],
        "safe": false,
        "allowUndefined": true,
        "verbose": false
      }]
   ]
  };
};
