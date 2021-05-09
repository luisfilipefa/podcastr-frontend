import { Heading, Stack } from "@chakra-ui/layout";

import AllEpisodes from "../components/EpisodesSections/AllEpisodes";
import { Episode } from "../types";
import { GetStaticProps } from "next";
import Head from "next/head";
import LatestEpisodes from "../components/EpisodesSections/LatestEpisodes";
import { getEpisodes } from "../services/api";

interface HomeProps {
  latestEpisodes: Episode[];
  allEpisodes: Episode[];
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Podcastr</title>
      </Head>

      <Stack p="3" spacing="10" w="100%" maxW="1024px" mx="auto">
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
  const episodes = await getEpisodes();

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return { props: { latestEpisodes, allEpisodes } };
};
