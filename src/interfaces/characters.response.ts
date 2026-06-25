import type { Character } from "./character";

export interface CharacterResponse {
  results: Character[];
  info: {
    pages: number;
    count: number;
    next: string | null;
    prev: string | null;
  };
}