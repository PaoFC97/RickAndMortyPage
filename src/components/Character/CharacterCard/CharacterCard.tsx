import './CharacterCard.css';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';
import type { CharacterCardProps } from './CharacterCard.types';

export const CharacterCard = ({
  character,
  isFavorite,
  onFavorite,
  onSelect,
}: CharacterCardProps) => {

  return (
    <article className="card" onClick={onSelect} aria-label='character-card' role='button'>

      <img
        src={character.image}
        alt={character.name}
        className="image"
        loading="lazy"
      />

      <div className="footer">

        <h3 className="name">
          {character.name}
        </h3>

        <button 
          type="button" 
          className="favoriteButton" 
          aria-label='favorite-button'
          onClick={(e) => {
            e.stopPropagation();
            onFavorite();
          }}
          >
          {isFavorite ? 
          (
            <TiStarFullOutline className="favoriteIcon" />
          ) : (
            <TiStarOutline className="favoriteIcon" />
          )
          } 
          
        </button>

      </div>

    </article>
  );
};