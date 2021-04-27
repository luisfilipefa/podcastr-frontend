import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  SimpleGrid,
  Text,
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

interface AllEpisodesProps {
  episodes: Episode[];
}

export default function AllEpisodes({ episodes }: AllEpisodesProps) {
  const { play } = usePlayer();

  return (
    <SimpleGrid columns={{ sm: 2 }} rowGap={{ sm: 2 }} columnGap={{ sm: 2 }}>
      {episodes.map((episode) => (
        <Flex
          direction="column"
          justifyContent="space-between"
          bg="dark.gray.800"
          borderRadius="lg"
          p="2"
        >
          <Image
            src={episode.thumbnail}
            alt={episode.title}
            w="100%"
            objectFit="contain"
            borderTopRadius="lg"
          />
          <Heading
            fontSize="xs"
            fontWeight="semibold"
            align="justify"
            mt="2"
            mb="2"
          >
            {episode.title}
          </Heading>
          <Flex align="center" justifyContent="space-between">
            <Box>
              <Text
                fontSize="x-small"
                color="dark.orange"
                w="100px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
              >
                {episode.members}
              </Text>
              <Text fontSize="x-small" color="dark.orange">
                {episode.publishedAt}
              </Text>
              <Text fontSize="x-small" color="dark.orange">
                {episode.duration}
              </Text>
            </Box>
            <IconButton
              aria-label="Tocar episódio"
              icon={<Icon as={FiPlay} color="dark.orange" />}
              bg="dark.gray.900"
              onClick={() => play(episode)}
            />
          </Flex>
        </Flex>
      ))}
    </SimpleGrid>
  );
}