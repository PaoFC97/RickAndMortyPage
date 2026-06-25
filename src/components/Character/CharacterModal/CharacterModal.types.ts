import type { Character } from "@/interfaces/character";

export interface CharacterModalProps {
    character: Character;
    onClose: () => void;
}