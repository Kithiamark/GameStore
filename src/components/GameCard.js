import React from "react"; 

//Define a functional component called GameCard
const GameCard = ({ game, onClick, onMouseEnter, onMouseLeave }) => {
    const { title, genre, platform, short_description: description, thumbnail, freetogame_profile_url } = game;

    return (
        <div className="game-card fade-in" role="button" onClick={onClick} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
          <div className="card-image-wrapper">
            <img src={thumbnail} className="card-image" alt={title} loading="lazy" />
          </div>
          
          <div className="card-content">
            <div className="card-header">
              <h3 className="card-title">{title}</h3>
              <span className="badge-free">Free</span>
            </div>
            
            <p className="card-description">{description}</p>
            
            <div className="card-footer">
              <span className="badge-info">{genre}</span>
              <a href={freetogame_profile_url} className="btn-get" onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer">GET</a>
            </div>
          </div>
        </div>
      );
  };

  export default GameCard;