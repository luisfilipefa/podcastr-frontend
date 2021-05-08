import { format, parseISO } from "date-fns";

import { Episode } from "../types";
import axios from "axios";
import { ptBR } from "date-fns/locale";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";

const api = axios.create({ baseURL: API_URL });

export const getEpisodes = async () => {
  const response = await api.get("/episodes");

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

  return episodes;
};

export const getEpisode = async (id: string) => {
  const response = await api.get(`/episodes/${id}`);

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

  return episode;
};
