import './FavoriteHeader.css';
import type { FavoriteHeaderProps } from './FavoriteHeader.types';
import { TiStarFullOutline, TiStarOutline } from 'react-icons/ti';

export const FavoritesHeader = ({
  showFavorites,
  onToggle,
}: FavoriteHeaderProps) => {
  return (
    <div className="containerFavorite">
      <div className="titleFavorite">
        Mis favoritos
      </div>

      <button className="buttonFavorite" onClick={onToggle}>
        {showFavorites ? 
          (
            <TiStarFullOutline />
          ) : (
            <TiStarOutline/>
          )}
      </button>
    </div>
  );
};