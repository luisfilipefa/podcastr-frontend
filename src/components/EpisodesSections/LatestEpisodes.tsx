import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  SimpleGrid,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";

import { FiPlay } from "react-icons/fi";
import React from "react";
import { usePlayer } from "../../contexts/PlayerContext";

interface Episode {
  id: string;
  title: string;
  members: string;
  publishedAt: string;
  thumbnail: string;
  description: string;
  url: string;
  duration: number;
}

interface LatestEpisodesProps {
  episodes: Episode[];
}

export default function LatestEpisodes({ episodes }: LatestEpisodesProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;
  const { play } = usePlayer();

  return (
    <SimpleGrid columns={{ sm: 1 }} rowGap={{ sm: 2 }}>
      {episodes.map((episode) => (
        <Flex
          direction="column"
          align="center"
          justifyContent="space-between"
          bg={isDarkMode ? "dark.gray.800" : "light.white"}
          borderRadius="lg"
          p="2"
        >
          <Stack direction="column" spacing="2">
            <Image
              src={episode.thumbnail}
              alt={episode.title}
              borderTopRadius="lg"
            />
            <Heading fontSize="sm" align="justify">
              {episode.title}
            </Heading>
            <Flex align="center" justifyContent="space-between">
              <Box>
                <Text
                  fontSize="xs"
                  color={isDarkMode ? "dark.orange" : "light.gray.600"}
                  w="250px"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                >
                  {episode.members}
                </Text>
                <Text
                  fontSize="xs"
                  color={isDarkMode ? "dark.orange" : "light.gray.600"}
                >
                  {episode.publishedAt}
                </Text>
                <Text
                  fontSize="xs"
                  color={isDarkMode ? "dark.orange" : "light.gray.600"}
                >
                  {episode.duration}
                </Text>
              </Box>
              <IconButton
                aria-label="Tocar episódio"
                icon={
                  <Icon
                    as={FiPlay}
                    color={isDarkMode ? "dark.orange" : "light.purple.600"}
                  />
                }
                bg={isDarkMode ? "dark.gray.900" : "light.gray.50"}
                onClick={() => play(episode)}
              />
            </Flex>
          </Stack>
        </Flex>
      ))}
    </SimpleGrid>
  );
}
