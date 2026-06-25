import { getAllCharactersApi } from  "@/api/RickMorty.api"
import type { CharacterResponse } from "@/interfaces/characters.response"

export const getCharacters = async(
    page: number = 1,
    search?: string,
): Promise<CharacterResponse> => {
    try {
        const { data } = await getAllCharactersApi.get<CharacterResponse>('/',
        {
            params: {
                page,
                ...(search ? { name: search } : {})
            }
        }
    );
    return data
    } catch{
        return {
            info: {
                count: 0,
                pages: 0,
                next: null,
                prev: null
            },
            results: []
        };
    }
}