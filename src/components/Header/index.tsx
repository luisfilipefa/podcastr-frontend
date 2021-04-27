import { FiMoon, FiSun } from "react-icons/fi";
import { Flex, IconButton, Image, Text, useColorMode } from "@chakra-ui/react";

import React from "react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;
  const currentDate = format(new Date(), "EEEEEE, dd 'de' MMM", {
    locale: ptBR,
  });

  return (
    <Flex
      align="center"
      justifyContent="space-between"
      p={{ sm: "3" }}
      bg={isDarkMode ? "dark.gray.800" : "light.white"}
      borderBottom="1px"
      borderColor="dark.orange"
    >
      <Image
        src={isDarkMode ? "/logo-dark.svg" : "/logo-light.svg"}
        alt="Podcastr"
      />
      <IconButton
        aria-label="Mudar tema"
        icon={isDarkMode ? <FiSun /> : <FiMoon />}
        variant="link"
        onClick={toggleColorMode}
      />
      <Text textTransform="capitalize" fontSize="xs">
        {currentDate}
      </Text>
    </Flex>
  );
}
