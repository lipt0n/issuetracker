require("ts-node").register({
    compilerOptions: {
      module: "commonjs",
      jsx: "preserve"
    },
  })
  require('ignore-styles').default(['.sass', '.scss']);
