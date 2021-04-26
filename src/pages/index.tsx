import { Box, Flex, Heading, SimpleGrid, Stack, Text } from "@chakra-ui/layout";
import { FiMoon, FiPlay, FiSun } from "react-icons/fi";
import { format, parseISO } from "date-fns";

import { GetStaticProps } from "next";
import Head from "next/head";
import Icon from "@chakra-ui/icon";
import { IconButton } from "@chakra-ui/button";
import { Image } from "@chakra-ui/image";
import { api } from "../services/api";
import ptBR from "date-fns/locale/pt-BR";
import { useColorMode } from "@chakra-ui/color-mode";

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
  const { colorMode } = useColorMode();
  const darkMode = colorMode === "dark" ? true : false;

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Stack p="3" spacing="10">
        <section>
          <Heading fontSize="lg" align="center" mb="3">
            Últimos Lançamentos
          </Heading>
          <SimpleGrid columns={{ sm: 1 }} rowGap={{ sm: 2 }}>
            {latestEpisodes.map((episode) => (
              <Flex
                direction="column"
                align="center"
                justifyContent="space-between"
                bg="dark.gray.800"
                borderRadius="lg"
                p="2"
              >
                <Stack direction="column" spacing="2">
                  <Image
                    src={episode.thumbnail}
                    alt={episode.title}
                    borderTopRadius="lg"
                  />
                  <Heading fontSize="sm" fontWeight="semibold" align="justify">
                    {episode.title}
                  </Heading>
                  <Flex align="center" justifyContent="space-between">
                    <Box>
                      <Text
                        fontSize="xs"
                        color="dark.orange"
                        w="250px"
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                      >
                        {episode.members}
                      </Text>
                      <Text fontSize="xs" color="dark.orange">
                        {episode.publishedAt}
                      </Text>
                      <Text fontSize="xs" color="dark.orange">
                        {episode.duration}
                      </Text>
                    </Box>
                    <IconButton
                      aria-label="Tocar episódio"
                      icon={<Icon as={FiPlay} color="dark.green" />}
                      bg="dark.gray.900"
                    />
                  </Flex>
                </Stack>
              </Flex>
            ))}
          </SimpleGrid>
        </section>
        <section>
          <Heading fontSize="lg" align="center" mb="3">
            Todos os episódios
          </Heading>
          <SimpleGrid
            columns={{ sm: 2 }}
            rowGap={{ sm: 2 }}
            columnGap={{ sm: 2 }}
          >
            {allEpisodes.map((episode) => (
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
                    icon={<Icon as={FiPlay} color="dark.green" />}
                    bg="dark.gray.900"
                  />
                </Flex>
              </Flex>
            ))}
          </SimpleGrid>
        </section>
      </Stack>
      <Stack
        direction="row"
        h={{ sm: "80px" }}
        w="100vw"
        position="fixed"
        bottom="0"
        bg="dark.orange"
        align="center"
        spacing="2"
      >
        <Image
          src={allEpisodes[0].thumbnail}
          alt={allEpisodes[0].title}
          h="80px"
          w="80px"
          objectFit="cover"
        />
        <Flex align="center" justify="space-between" p="2">
          <Box>
            <Heading
              fontSize="sm"
              w="220px"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {allEpisodes[0].title}
            </Heading>
            <Text fontSize="x-small">{allEpisodes[0].members}</Text>
          </Box>
          <IconButton
            aria-label="Tocar episódio"
            icon={<Icon as={FiPlay} color="dark.green" />}
            bg="dark.gray.900"
          />
        </Flex>
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
