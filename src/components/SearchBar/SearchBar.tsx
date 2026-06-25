import './SearchBar.css'
import { FiSearch } from 'react-icons/fi';
import type { SearchBarProps } from './SearchBar.types';

export const SearchBar = ({
    value,
    onChange,
} : SearchBarProps) => {

    return (
        <div className="search-container">
            <FiSearch className="search-icon" />

            <input
                type="text"
                placeholder="Buscar..."
                value={value}
                onChange={event => onChange(event.target.value)}
                className="search-input"
            />
        </div>
    );
};
