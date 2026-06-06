import { useState, useEffect, useRef } from 'react';

function SearchOverlay({ isOpen, onClose, products = [], onSelectProduct }) {
  const [query, setQuery] = useState('');
  const inputRef = useRef(null);

  // Auto-focus search input when overlay opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
        setQuery(''); // Reset query on open
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter items
  const results = query.trim() === '' 
    ? [] 
    : products.filter(p => 
        p.name.toLowerCase().includes(query.toLowerCase()) || 
        p.category.toLowerCase().includes(query.toLowerCase())
      );

  const handleItemClick = (id) => {
    onSelectProduct(id);
    onClose();
  };

  return (
    <div className={`search-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="search-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Search Input Bar */}
        <div className="search-input-header">
          <input
            ref={inputRef}
            type="text"
            placeholder="TYPE TO SEARCH ARCHIVE..."
            className="search-main-field"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search items"
          />
          <button className="search-close-btn" onClick={onClose} aria-label="Close search">
            ✕
          </button>
        </div>

        {/* Results List */}
        <div className="search-results-grid">
          {results.map((item) => (
            <div 
              key={item.id} 
              className="search-result-item"
              onClick={() => handleItemClick(item.id)}
            >
              <div className="search-item-thumb">
                <img src={item.src} alt={item.name} />
              </div>
              <div className="search-item-details">
                <span className="search-item-name">{item.name}</span>
                <span className="search-item-price">{item.price}</span>
              </div>
            </div>
          ))}
          
          {query.trim() !== '' && results.length === 0 && (
            <div className="search-empty">
              [ System: No matching articles found ]
            </div>
          )}
          
          {query.trim() === '' && (
            <div className="search-empty" style={{ color: '#222' }}>
              [ Waiting for client input... ]
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default SearchOverlay;
