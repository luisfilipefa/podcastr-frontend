import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { FiPause, FiPlay } from "react-icons/fi";
import React, { useEffect, useRef } from "react";

import { usePlayer } from "../../contexts/PlayerContext";

export default function Player() {
  const { colorMode } = useColorMode();
  const isDarkMode = colorMode === "dark" ? true : false;
  const {
    currentEpisodeIndex,
    episodeList,
    isPlaying,
    setPlayingState,
    togglePlay,
  } = usePlayer();
  const episode = episodeList[currentEpisodeIndex];
  const audioRef = useRef<HTMLAudioElement>();

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  return (
    <>
      {episode && (
        <Flex
          direction="row"
          align="center"
          justifyContent="space-between"
          h={{ sm: "80px" }}
          w="100vw"
          position="fixed"
          bottom="0"
          bg={isDarkMode ? "dark.orange" : "light.purple.600"}
          spacing="2"
        >
          <Image
            src={episode.thumbnail}
            alt={episode.title}
            h="80px"
            w="80px"
            objectFit="cover"
          />
          <Box>
            <Heading
              fontSize="sm"
              w="200px"
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              color={isDarkMode ? "dark.gray.900" : "light.white"}
            >
              {episode.title}
            </Heading>
            <Text
              fontSize="x-small"
              color={isDarkMode ? "dark.gray.900" : "light.white"}
            >
              {episode.members}
            </Text>
          </Box>
          <IconButton
            aria-label="Tocar episódio"
            icon={
              isPlaying ? (
                <Icon
                  as={FiPause}
                  color={isDarkMode ? "dark.orange" : "light.purple.600"}
                />
              ) : (
                <Icon
                  as={FiPlay}
                  color={isDarkMode ? "dark.orange" : "light.purple.600"}
                />
              )
            }
            bg={isDarkMode ? "dark.gray.900" : "light.purple.100"}
            onClick={togglePlay}
            mr="2"
          />
          <audio
            ref={audioRef}
            src={episode.url}
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          />
        </Flex>
      )}
    </>
  );
}
