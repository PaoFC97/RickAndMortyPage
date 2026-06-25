
import { SearchBar } from "@/components/SearchBar/SearchBar"
import { FavoritesHeader } from "@/components/FavoriteHeader/FavoriteHeader"
import './HomePage.css'
import { Pagination } from "@/components/Pagination/Pagination"
import { CharacterList } from "@/components/Character/CharacterList/CharacterList"
import { useHomePage } from "@/pages/HomePage/useHomePage"
import { CharacterModal } from "@/components/Character/CharacterModal/CharacterModal"

export const HomePage = () => {
    const {
        loading,
        error,
        totalPages,

        search,
        currentPage,

        favorites,
        displayCharacters,
        
        showFavorites,
        setShowFavorites,

        setCurrentPage,

        handleSearch,
        handleFavorite,

        setSelectedCharacter,
        selectedCharacter,
    } = useHomePage();

    return(
        <>
            <h1 className="title center topMd">
                Wubba lubba dub dub!
            </h1>

            <h2 className="subtitle center topMd">
                Base de datos de personajes de Rick y Morty
            </h2>

            <div className="container">
                <div className="topMd topBar">
                    <SearchBar 
                        value={search}
                        onChange={handleSearch}
                    />
                    <FavoritesHeader 
                        showFavorites={ showFavorites }
                        onToggle={() => setShowFavorites(!showFavorites)}
                    />
                </div>

                {!loading && !error && (
                    <div className="topMd characterListContainer">
                        <CharacterList 
                        characters={displayCharacters}
                        favorites={favorites}
                        onFavorite={handleFavorite}
                        onSelect={setSelectedCharacter}
                        />
                    </div>
                )}
                <div className="paginationContainer topMd">
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={setCurrentPage}
                    />
                </div>

                <CharacterModal
                    character={selectedCharacter!}
                    onClose={() => setSelectedCharacter(null)}
                />
            </div>
        
        </>
    )
}