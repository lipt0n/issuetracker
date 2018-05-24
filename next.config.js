const withAwesomeTypescript = require("next-awesome-typescript")
const withSass = require('@zeit/next-sass')

module.exports = withAwesomeTypescript({
  webpack: (config, { dev }) => {
    config.module.rules.push(
      {
        test: /\.test.tsx$/,
        loader: 'ignore-loader'
      }
    );
    return config
  }
})
