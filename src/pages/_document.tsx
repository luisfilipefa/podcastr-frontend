import Document, { Head, Html, Main, NextScript } from "next/document";

import { ColorModeScript } from "@chakra-ui/color-mode";
import { theme } from "../styles/theme";

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter&family=Lexend:wght@600&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.png" />
        </Head>
        <body>
          <ColorModeScript initialColorMode={"dark"} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
