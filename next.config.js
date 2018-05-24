const withAwesomeTypescript = require("next-awesome-typescript")
const withSass = require('@zeit/next-sass')

module.exports = withAwesomeTypescript(
  withSass({
    cssModules: true,
    cssLoaderOptions: {
      importLoaders: 1,
      webpack(config, options) {
        return config
      }
    }
  })
)