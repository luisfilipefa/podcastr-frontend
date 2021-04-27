import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FiPause, FiPlay } from "react-icons/fi";
import React, { useEffect, useRef } from "react";

import { usePlayer } from "../../contexts/PlayerContext";

export default function Player() {
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
            src={episode.thumbnail}
            alt={episode.title}
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
                color="dark.gray.900"
              >
                {episode.title}
              </Heading>
              <Text fontSize="x-small" color="gray.800">
                {episode.members}
              </Text>
            </Box>
            <IconButton
              aria-label="Tocar episódio"
              icon={
                isPlaying ? (
                  <Icon as={FiPause} color="dark.orange" />
                ) : (
                  <Icon as={FiPlay} color="dark.orange" />
                )
              }
              bg="dark.gray.900"
              onClick={togglePlay}
            />
          </Flex>
          <audio
            ref={audioRef}
            src={episode.url}
            autoPlay
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
          ></audio>
        </Stack>
      )}
    </>
  );
}
