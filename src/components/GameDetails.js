import React from 'react';

const GameDetails = ({ details, onClose }) => {
  if (!details) return null;

  const {
    title,
    thumbnail,
    short_description,
    description,
    genre,
    platform,
    publisher,
    developer,
    release_date,
    game_url,
    freetogame_profile_url
  } = details;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        <img src={thumbnail} className="modal-header-img" alt={title} />
        
        <div className="modal-body">
          <h2 className="modal-title">{title}</h2>
          
          <div className="modal-meta">
            <span className="meta-tag">{genre}</span>
            <span className="meta-tag">{platform}</span>
            {publisher && <span className="meta-tag">Pub: {publisher}</span>}
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', color: 'var(--text-light)', fontSize: '0.9rem' }}>
            {developer && <span><strong>Developer:</strong> {developer}</span>}
            {release_date && <span><strong>Released:</strong> {release_date}</span>}
          </div>

          <p className="modal-description">
            {description || short_description}
          </p>

          <a 
            href={game_url || freetogame_profile_url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary"
          >
            Play Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default GameDetails;