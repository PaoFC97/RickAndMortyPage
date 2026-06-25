import './CharacterModal.css';
import type { CharacterModalProps } from './CharacterModal.types';

export const CharacterModal = ({ character, onClose }: CharacterModalProps) => {
    if (!character) {
        return null;
    }

    return (
        <>
            <div className="modalOverlay" onClick={onClose} >
                <div className="modalContainer" onClick={(e) => e.stopPropagation()}>
                    <div className="modalHeader">
                        <button className="closeButton" onClick={onClose} >
                            CERRAR ✕
                        </button>
                    </div>

                    <img className="modalImage" src={character.image} alt={character.name} />

                    <h2 className="modalTitle">
                        {character.name}
                    </h2>

                    <div className="tagsContainer">

                        <span className="tag tagBlue">
                            <strong>Estado:</strong> {' '} {character.status}
                        </span>

                        <span className="tag tagPurple">
                            <strong>Género:</strong> {' '} {character.gender}
                        </span>

                        <span className="tag tagGreen"> 
                            <strong>Especie:</strong> {' '} {character.species}
                        </span>

                        <span className="tag tagYellow">
                            <strong>Origen:</strong> {' '} {character.origin.name}
                        </span>

                        <span className="tag tagOrange">
                            <strong>Ubicación:</strong> {' '} {character.location.name}
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};