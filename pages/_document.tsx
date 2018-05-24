// ./pages/_document.js
import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
    render() {
        return (
            <html>
                <Head>
                    <link rel="stylesheet" href="/static/style.css" />
                    <link
                        href="https://fonts.googleapis.com/css?family=Open+Sans"
                        rel="stylesheet"
                    />
                </Head>
                <body>
                    <div className={'wrapper'}>
                        <Main />
                        <div className={'wrapbg'} />
                        <div className={'contentbg'} />
                    </div>
                    <NextScript />
                </body>
            </html>
        )
    }
}
