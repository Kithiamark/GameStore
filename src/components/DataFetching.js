import React, { useState, useEffect } from 'react';
import Navbar from './NavBar';
import GameCard from './GameCard';
import GameDetails from './GameDetails';

const DataFetching = () => {
  const [fullData, setFullData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('mmorpg');
  const [selectedGame, setSelectedGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['mmorpg', 'shooter', 'strategy', 'moba', 'racing', 'sports', 'social', 'sandbox', 'open-world'];

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    const filtered = fullData.filter(game => game.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredData(filtered);
  }, [searchTerm, fullData]);

  const getAll = async (category = 'mmorpg') => {
    setLoading(true);
    const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': process.env.REACT_APP_RAPIDAPI_KEY,
          'X-RapidAPI-Host': process.env.REACT_APP_RAPIDAPI_HOST,
        },
      });
      const data = await response.json();
      setFullData(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    getAll(category);
  };

  const handleGameClick = (game) => {
    setSelectedGame(game);
  };

  const handleCloseDetails = () => {
    setSelectedGame(null);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <Navbar categories={categories} activeCategory={activeCategory} onChangeCategory={handleCategoryChange} />
      
      <div className="container">
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
            placeholder="Search for games..."
          />
        </div>
      
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
            <h3>Loading Games...</h3>
          </div>
        ) : (
          <div className="grid-layout">
            {filteredData.length > 0 ? (
              filteredData.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onClick={() => handleGameClick(game)}
                />
              ))
            ) : (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '40px' }}>
                <h3>No games found matching "{searchTerm}"</h3>
              </div>
            )}
          </div>
        )}
      </div>
      
      {selectedGame && <GameDetails details={selectedGame} onClose={handleCloseDetails} />}
    </div>
  );
};

export default DataFetching;