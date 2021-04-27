import { Box, Flex, Heading, Stack, Text } from "@chakra-ui/layout";
import { GetStaticPaths, GetStaticProps } from "next";
import { format, parseISO } from "date-fns";

import { FiPlay } from "react-icons/fi";
import Icon from "@chakra-ui/icon";
import { IconButton } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { IoChevronBack } from "react-icons/io5";
import Link from "next/link";
import React from "react";
import { api } from "../../services/api";
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
          borderBottom="1px"
          borderColor={isDarkMode ? "dark.orange" : "light.gray.100"}
        >
          <Heading fontSize="xl">{episode.title}</Heading>
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
  const response = await api.get(
    "/episodes?_limit=12&_sort=published_at&_order=desc"
  );

  const paths = response.data.map((episode) => ({
    params: { slug: episode.id },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const response = await api.get(`/episodes/${params.slug}`);
  const episode: Episode = {
    id: response.data.id,
    title: response.data.title,
    members: response.data.members,
    publishedAt: format(parseISO(response.data.published_at), "dd MMM yyyy", {
      locale: ptBR,
    }),
    thumbnail: response.data.thumbnail,
    description: response.data.description,
    url: response.data.file.url,
    duration: response.data.file.duration,
  };

  return { props: { episode } };
};
