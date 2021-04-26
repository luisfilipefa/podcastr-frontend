import { Box, Flex, Text } from "@chakra-ui/layout";
import { FiMoon, FiSun } from "react-icons/fi";

import Head from "next/head";
import Icon from "@chakra-ui/icon";
import { IconButton } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { useColorMode } from "@chakra-ui/color-mode";

export default function Home() {
  const { colorMode } = useColorMode();
  const darkMode = colorMode === "dark" ? true : false;

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
}
