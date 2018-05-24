// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'
import globalStyle from  './global.scss'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <link rel="stylesheet" href="/_next/static/style.css" />
          <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet"/>
        </Head>
        <body>
        <div className={globalStyle.wrapper}>

          <Main />
          <div className={globalStyle.wrapbg}></div>
          <div className={globalStyle.contentbg}></div>
          </div>
          <NextScript />
        </body>
      </html>
    )
  }
}