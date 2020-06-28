import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="description"
            content="As a software engineer, I'm interested in helping companies create excellent (reliable, maintainable, scalable) software"
          />
          <meta
            name="keywords"
            content="software, engineer, ovadia, shalom, chicago, nodejs, react, javascript, typescript, node, freelance, java, express, performant"
          />
          <meta name="title" content="Ovadia Shalom • Software Engineer" />
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://ovadiashalom.me/" />
          <meta
            property="og:title"
            content="Ovadia Shalom • Software Engineer"
          />
          <meta
            property="og:description"
            content="As a software engineer, I'm interested in helping companies create excellent (reliable, maintainable, scalable) software. "
          />
          <meta property="og:image" content="/homepage.png"></meta>
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://ovadiashalom.me/" />
          <meta
            property="twitter:title"
            content="Ovadia Shalom • Software Engineer"
          />
          <meta
            property="twitter:description"
            content="As a software engineer, I'm interested in helping companies create excellent (reliable, maintainable, scalable) software. "
          />
          <meta property="twitter:image" content="/homepage.png" />

          <link
            href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=PT+Serif&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" type="image/png" href="/Untitled16.png" />

          <script src="/script.js"></script>
          <script
            async
            src="https://www.google-analytics.com/analytics.js"
          ></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
