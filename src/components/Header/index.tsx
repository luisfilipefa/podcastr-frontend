import {
  Box,
  Flex,
  IconButton,
  Image,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FiMoon, FiSun } from "react-icons/fi";

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
    <Box
      bg={isDarkMode ? "dark.gray.800" : "light.white"}
      borderBottom="1px"
      borderColor="dark.orange"
    >
      <Flex
        align="center"
        justifyContent="space-between"
        p="3"
        w="100%"
        maxW="1024px"
        mx="auto"
      >
        <Image
          src={isDarkMode ? "/logo-dark.svg" : "/logo-light.svg"}
          alt="Podcastr"
        />
        <IconButton
          aria-label="Mudar tema"
          icon={isDarkMode ? <FiSun /> : <FiMoon />}
          bg="inherit"
          onClick={toggleColorMode}
        />
        <Text textTransform="capitalize" fontSize="xs">
          {currentDate}
        </Text>
      </Flex>
    </Box>
  );
}
