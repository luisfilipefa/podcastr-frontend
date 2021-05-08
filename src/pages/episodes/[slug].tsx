import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { GetStaticPaths, GetStaticProps } from "next";
import { getEpisode, getEpisodes } from "../../services/api";

import { FiPlay } from "react-icons/fi";
import Icon from "@chakra-ui/icon";
import { IconButton } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import React from "react";
import { ptBR } from "date-fns/locale";
import styles from "./episode.module.css";
import { useColorMode } from "@chakra-ui/react";
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

interface EpisodeProps {
  episode: Episode;
}

export default function Episode({ episode }: EpisodeProps) {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;
  const { play } = usePlayer();

  return (
    <>
      <Box position="relative" w="100vw">
        <Link href="/">
          <IconButton
            aria-label="Voltar"
            icon={
              <Icon
                as={IoChevronBack}
                color={isDarkMode ? "dark.gray.800" : "light.white"}
              />
            }
            bg={isDarkMode ? "dark.orange" : "light.purple.600"}
            position="absolute"
            top="50%"
            left="2"
            transform="translateY(-50%)"
          />
        </Link>
        <Image src={episode.thumbnail} alt={episode.title} />
        <IconButton
          aria-label="Tocar episódio"
          icon={
            <Icon
              as={FiPlay}
              color={isDarkMode ? "dark.orange" : "light.purple.600"}
            />
          }
          bg={isDarkMode ? "dark.gray.800" : "light.purple.100"}
          onClick={() => play(episode)}
          position="absolute"
          top="50%"
          right="2"
          transform="translateY(-50%)"
        />
      </Box>
      <header>
        <Stack
          direction="column"
          spacing="5"
          p="3"
          w="100vw"
          borderBottom="1px"
          borderColor={isDarkMode ? "dark.orange" : "light.gray.100"}
        >
          <Heading
            fontSize="xl"
            color={isDarkMode ? "dark.white" : "dark.gray.900"}
            align="justify"
          >
            {episode.title}
          </Heading>
          <Flex align="center" justifyContent="space-evenly">
            <Text fontSize="xs">{episode.members}</Text>
            <Text fontSize="xs">{episode.publishedAt}</Text>
            <Text fontSize="xs">{episode.duration}</Text>
          </Flex>
        </Stack>
      </header>
      <article>
        <Box
          dangerouslySetInnerHTML={{ __html: episode.description }}
          align="justify"
          p="5"
          className={styles.description}
        />
      </article>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const episodes = await getEpisodes();

  const paths = episodes.map((episode) => ({
    params: { slug: episode.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;

  const episode = await getEpisode(String(slug));

  return { props: { episode } };
};
