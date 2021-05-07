import { Box, Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/layout";
import { FiMoon, FiPlay, FiSun } from "react-icons/fi";
import { format, parseISO } from "date-fns";

import AllEpisodes from "../components/EpisodesSections/AllEpisodes";
import { GetStaticProps } from "next";
import Head from "next/head";
import Icon from "@chakra-ui/icon";
import { IconButton } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import LatestEpisodes from "../components/EpisodesSections/LatestEpisodes";
import { api } from "../services/api";
import ptBR from "date-fns/locale/pt-BR";
import { useColorMode } from "@chakra-ui/color-mode";
import { usePlayer } from "../contexts/PlayerContext";

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

interface HomeProps {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home({ latestEpisodes, allEpisodes }) {
  return (
    <>
      <Head>
        <title>Home | Podcastr</title>
      </Head>

      <Stack p="3" spacing="10">
        <section>
          <Heading fontSize="lg" align="center" mb="3">
            Últimos Lançamentos
          </Heading>
          <LatestEpisodes episodes={latestEpisodes} />
        </section>
        <section>
          <Heading fontSize="lg" align="center" mb="3">
            Todos os episódios
          </Heading>
          <AllEpisodes episodes={allEpisodes} />
        </section>
      </Stack>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await api.get("/episodes?_sort=published_at&_order=desc");

  const episodes: Episode[] = response.data.map((episode) => ({
    id: episode.id,
    title: episode.title,
    members: episode.members,
    publishedAt: format(parseISO(episode.published_at), "dd MMM yyyy", {
      locale: ptBR,
    }),
    thumbnail: episode.thumbnail,
    description: episode.description,
    url: episode.file.url,
    duration: episode.file.duration,
  }));

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return { props: { latestEpisodes, allEpisodes } };
};
