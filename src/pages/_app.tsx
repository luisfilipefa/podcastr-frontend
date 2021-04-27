import { ChakraProvider } from "@chakra-ui/react";
import Header from "../components/Header";
import Player from "../components/Player";
import { PlayerProvider } from "../contexts/PlayerContext";
import { theme } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <PlayerProvider>
        <Header />
        <Component {...pageProps} />
        <Player />
      </PlayerProvider>
    </ChakraProvider>
  );
}

export default MyApp;
