import { useState, useEffect } from 'react'
import './App.css'

// Default activities database
const DEFAULT_ACTIVITIES = [
  // 5-Minute Resets
  { id: 1, name: 'Deep breathing (4-7-8)', category: 'resets', time: '5min', energy: 'low', location: 'anywhere', social: 'solo', isDefault: true },
  { id: 2, name: 'Stretch break', category: 'resets', time: '5min', energy: 'low', location: 'anywhere', social: 'solo', isDefault: true },
  { id: 3, name: 'Drink a glass of water', category: 'resets', time: '5min', energy: 'low', location: 'anywhere', social: 'solo', isDefault: true },
  { id: 4, name: 'Pet your cat/dog', category: 'resets', time: '5min', energy: 'low', location: 'home', social: 'solo', isDefault: true },
  { id: 5, name: 'Look out the window', category: 'resets', time: '5min', energy: 'low', location: 'anywhere', social: 'solo', isDefault: true },
  { id: 6, name: 'Progressive muscle relaxation', category: 'resets', time: '5min', energy: 'low', location: 'anywhere', social: 'solo', isDefault: true },

  // Sensory Comfort
  { id: 7, name: 'Take a warm bath', category: 'sensory', time: '30min', energy: 'low', location: 'home', social: 'solo', isDefault: true },
  { id: 8, name: 'Listen to favorite music', category: 'sensory', time: '15min', energy: 'low', location: 'anywhere', social: 'solo', isDefault: true },
  { id: 9, name: 'Light a candle', category: 'sensory', time: '5min', energy: 'low', location: 'home', social: 'solo', isDefault: true },
  { id: 10, name: 'Make a cup of tea', category: 'sensory', time: '5min', energy: 'low', location: 'home', social: 'solo', isDefault: true },
  { id: 11, name: 'Wrap up in a cozy blanket', category: 'sensory', time: '5min', energy: 'low', location: 'home', social: 'solo', isDefault: true },
  { id: 12, name: 'Use essential oils', category: 'sensory', time: '5min', energy: 'low', location: 'home', social: 'solo', isDefault: true },

  // Movement
  { id: 13, name: 'Go for a walk', category: 'movement', time: '15min', energy: 'medium', location: 'outdoors', social: 'either', isDefault: true },
  { id: 14, name: 'Dance to one song', category: 'movement', time: '5min', energy: 'high', location: 'anywhere', social: 'solo', isDefault: true },
  { id: 15, name: 'Do some yoga', category: 'movement', time: '15min', energy: 'medium', location: 'home', social: 'solo', isDefault: true },
  { id: 16, name: 'Tidy one small area', category: 'movement', time: '15min', energy: 'medium', location: 'home', social: 'solo', isDefault: true },
  { id: 17, name: 'Do jumping jacks', category: 'movement', time: '5min', energy: 'high', location: 'anywhere', social: 'solo', isDefault: true },

  // Connection
  { id: 18, name: 'Text a friend', category: 'connection', time: '5min', energy: 'low', location: 'anywhere', social: 'social', isDefault: true },
  { id: 19, name: 'Call a family member', category: 'connection', time: '15min', energy: 'medium', location: 'anywhere', social: 'social', isDefault: true },
  { id: 20, name: 'Post in community', category: 'connection', time: '5min', energy: 'low', location: 'anywhere', social: 'social', isDefault: true },
  { id: 21, name: 'Send a voice memo', category: 'connection', time: '5min', energy: 'low', location: 'anywhere', social: 'social', isDefault: true },
  { id: 22, name: 'Hug someone you love', category: 'connection', time: '5min', energy: 'low', location: 'anywhere', social: 'social', isDefault: true },

  // Creative
  { id: 23, name: 'Journal for 5 minutes', category: 'creative', time: '5min', energy: 'low', location: 'anywhere', social: 'solo', isDefault: true },
  { id: 24, name: 'Doodle or draw', category: 'creative', time: '15min', energy: 'medium', location: 'anywhere', social: 'solo', isDefault: true },
  { id: 25, name: 'Take photos of something beautiful', category: 'creative', time: '15min', energy: 'medium', location: 'anywhere', social: 'solo', isDefault: true },
  { id: 26, name: 'Cook something simple', category: 'creative', time: '30min', energy: 'medium', location: 'home', social: 'either', isDefault: true },
  { id: 27, name: 'Write a gratitude list', category: 'creative', time: '5min', energy: 'low', location: 'anywhere', social: 'solo', isDefault: true },
  { id: 28, name: 'Rearrange something', category: 'creative', time: '15min', energy: 'medium', location: 'home', social: 'solo', isDefault: true },
];

const CATEGORIES = {
  resets: { name: '5-Minute Resets', icon: '⚡', color: '#E8B4B8' },
  sensory: { name: 'Sensory Comfort', icon: '🌸', color: '#B4D4E8' },
  movement: { name: 'Movement', icon: '💪', color: '#D4B8E8' },
  connection: { name: 'Connection', icon: '💚', color: '#7A9B7A' },
  creative: { name: 'Creative', icon: '🎨', color: '#E8D4B8' }
};

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activities, setActivities] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [usageLog, setUsageLog] = useState({});
  const [filters, setFilters] = useState({
    category: 'all',
    time: 'all',
    energy: 'all',
    location: 'all',
    social: 'all',
    favoritesOnly: false
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showRandomModal, setShowRandomModal] = useState(false);
  const [randomActivity, setRandomActivity] = useState(null);
  const [newActivity, setNewActivity] = useState({
    name: '',
    category: 'resets',
    time: '5min',
    energy: 'low',
    location: 'anywhere',
    social: 'solo'
  });

  // Load data from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('nospend_darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark-mode');
    }

    const savedActivities = localStorage.getItem('nospend_comfort_activities');
    if (savedActivities) {
      setActivities(JSON.parse(savedActivities));
    } else {
      setActivities(DEFAULT_ACTIVITIES);
    }

    const savedFavorites = localStorage.getItem('nospend_comfort_favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const savedUsage = localStorage.getItem('nospend_comfort_usage');
    if (savedUsage) {
      setUsageLog(JSON.parse(savedUsage));
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (activities.length > 0) {
      localStorage.setItem('nospend_comfort_activities', JSON.stringify(activities));
    }
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('nospend_comfort_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('nospend_comfort_usage', JSON.stringify(usageLog));
  }, [usageLog]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('nospend_darkMode', newMode);
    document.documentElement.classList.toggle('dark-mode');
  };

  // Add new activity
  const addActivity = () => {
    if (!newActivity.name.trim()) return;

    const activity = {
      id: Date.now(),
      ...newActivity,
      isDefault: false
    };

    setActivities([...activities, activity]);
    setNewActivity({
      name: '',
      category: 'resets',
      time: '5min',
      energy: 'low',
      location: 'anywhere',
      social: 'solo'
    });
    setShowAddModal(false);
  };

  // Delete activity
  const deleteActivity = (id) => {
    setActivities(activities.filter(a => a.id !== id));
    setFavorites(favorites.filter(fId => fId !== id));
    const newUsage = { ...usageLog };
    delete newUsage[id];
    setUsageLog(newUsage);
  };

  // Toggle favorite
  const toggleFavorite = (id) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(fId => fId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };

  // Log usage
  const logUsage = (id) => {
    const newUsage = { ...usageLog };
    if (!newUsage[id]) {
      newUsage[id] = [];
    }
    newUsage[id].push(new Date().toISOString());
    setUsageLog(newUsage);
  };

  // Get random activity
  const getRandomActivity = () => {
    const filtered = getFilteredActivities();
    if (filtered.length === 0) {
      setRandomActivity(null);
      return;
    }
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    setRandomActivity(random);
    setShowRandomModal(true);
  };

  // Filter activities
  const getFilteredActivities = () => {
    return activities.filter(activity => {
      // Search filter
      if (searchTerm && !activity.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters.category !== 'all' && activity.category !== filters.category) {
        return false;
      }

      // Time filter
      if (filters.time !== 'all' && activity.time !== filters.time) {
        return false;
      }

      // Energy filter
      if (filters.energy !== 'all' && activity.energy !== filters.energy) {
        return false;
      }

      // Location filter
      if (filters.location !== 'all' && activity.location !== filters.location) {
        return false;
      }

      // Social filter
      if (filters.social !== 'all') {
        if (filters.social === 'solo' && activity.social !== 'solo') return false;
        if (filters.social === 'social' && activity.social !== 'social') return false;
      }

      // Favorites filter
      if (filters.favoritesOnly && !favorites.includes(activity.id)) {
        return false;
      }

      return true;
    });
  };

  // Reset filters
  const resetFilters = () => {
    setFilters({
      category: 'all',
      time: 'all',
      energy: 'all',
      location: 'all',
      social: 'all',
      favoritesOnly: false
    });
    setSearchTerm('');
  };

  const filteredActivities = getFilteredActivities();
  const groupedActivities = {};
  filteredActivities.forEach(activity => {
    if (!groupedActivities[activity.category]) {
      groupedActivities[activity.category] = [];
    }
    groupedActivities[activity.category].push(activity);
  });

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Comfort Menu Builder</h1>
          <button className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="main">
        {/* Hero Section */}
        <section className="hero">
          <h2>Build Your Personal Comfort Menu</h2>
          <p className="hero-subtitle">
            Non-spending ways to cope with stress, regulate emotions, and find comfort.
            Build your personalized list and use it when spending urges hit.
          </p>
          <div className="hero-actions">
            <button className="hero-btn primary" onClick={getRandomActivity}>
              🎲 Need Comfort Now?
            </button>
            <button className="hero-btn secondary" onClick={() => setShowAddModal(true)}>
              ➕ Add Custom Activity
            </button>
          </div>
        </section>

        {/* Filters */}
        <section className="filters-section">
          <div className="search-bar">
            <input
              type="text"
              placeholder="🔍 Search activities..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters">
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="filter-select"
            >
              <option value="all">All Categories</option>
              {Object.entries(CATEGORIES).map(([key, cat]) => (
                <option key={key} value={key}>{cat.icon} {cat.name}</option>
              ))}
            </select>

            <select
              value={filters.time}
              onChange={(e) => setFilters({ ...filters, time: e.target.value })}
              className="filter-select"
            >
              <option value="all">Any Time</option>
              <option value="5min">5 minutes</option>
              <option value="15min">15 minutes</option>
              <option value="30min">30 minutes</option>
              <option value="1hour">1+ hour</option>
            </select>

            <select
              value={filters.energy}
              onChange={(e) => setFilters({ ...filters, energy: e.target.value })}
              className="filter-select"
            >
              <option value="all">Any Energy</option>
              <option value="low">Low Energy</option>
              <option value="medium">Medium Energy</option>
              <option value="high">High Energy</option>
            </select>

            <select
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
              className="filter-select"
            >
              <option value="all">Any Location</option>
              <option value="home">Home</option>
              <option value="outdoors">Outdoors</option>
              <option value="anywhere">Anywhere</option>
            </select>

            <select
              value={filters.social}
              onChange={(e) => setFilters({ ...filters, social: e.target.value })}
              className="filter-select"
            >
              <option value="all">Solo or Social</option>
              <option value="solo">Solo</option>
              <option value="social">Social</option>
            </select>

            <label className="favorites-toggle">
              <input
                type="checkbox"
                checked={filters.favoritesOnly}
                onChange={(e) => setFilters({ ...filters, favoritesOnly: e.target.checked })}
              />
              <span>⭐ Favorites Only</span>
            </label>

            <button onClick={resetFilters} className="reset-filters-btn">
              Reset Filters
            </button>
          </div>

          <p className="results-count">
            Showing {filteredActivities.length} of {activities.length} activities
          </p>
        </section>

        {/* Activities by Category */}
        <section className="activities-section">
          {Object.entries(CATEGORIES).map(([categoryKey, category]) => {
            const categoryActivities = groupedActivities[categoryKey] || [];
            if (categoryActivities.length === 0) return null;

            return (
              <div key={categoryKey} className="category-group">
                <h3 className="category-title" style={{ borderColor: category.color }}>
                  <span className="category-icon">{category.icon}</span>
                  {category.name}
                  <span className="category-count">({categoryActivities.length})</span>
                </h3>

                <div className="activities-grid">
                  {categoryActivities.map(activity => (
                    <div key={activity.id} className="activity-card">
                      <div className="activity-header">
                        <h4 className="activity-name">{activity.name}</h4>
                        <div className="activity-actions">
                          <button
                            className={`favorite-btn ${favorites.includes(activity.id) ? 'active' : ''}`}
                            onClick={() => toggleFavorite(activity.id)}
                            title="Favorite"
                          >
                            ⭐
                          </button>
                          {!activity.isDefault && (
                            <button
                              className="delete-btn"
                              onClick={() => deleteActivity(activity.id)}
                              title="Delete"
                            >
                              🗑️
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="activity-tags">
                        <span className="tag">⏱️ {activity.time}</span>
                        <span className="tag">⚡ {activity.energy}</span>
                        <span className="tag">📍 {activity.location}</span>
                        <span className="tag">{activity.social === 'solo' ? '🧘' : activity.social === 'social' ? '👥' : '🔄'} {activity.social}</span>
                      </div>

                      <div className="activity-footer">
                        <button
                          className="use-btn"
                          onClick={() => logUsage(activity.id)}
                        >
                          ✓ I Used This
                        </button>
                        {usageLog[activity.id] && (
                          <span className="usage-count">
                            Used {usageLog[activity.id].length}x
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {filteredActivities.length === 0 && (
            <div className="empty-state">
              <p>No activities match your filters.</p>
              <button onClick={resetFilters} className="reset-btn-large">
                Reset Filters
              </button>
            </div>
          )}
        </section>

        {/* Related Tools */}
        <section className="related-tools">
          <h3>Continue Your Journey</h3>
          <div className="tools-grid">
            <a href="https://tweakyourgeek.github.io/nospend-apps/" className="tool-card" target="_blank" rel="noopener noreferrer">
              <span className="tool-icon">📅</span>
              <div>
                <h4>Challenge Roadmap</h4>
                <p>30-day guided journey</p>
              </div>
            </a>
            <a href="https://tweakyourgeek.github.io/nospend-apps/pattern-quiz/" className="tool-card" target="_blank" rel="noopener noreferrer">
              <span className="tool-icon">🎯</span>
              <div>
                <h4>Pattern Quiz</h4>
                <p>Discover your spending patterns</p>
              </div>
            </a>
            <a href="https://tweakyourgeek.github.io/nospend-apps/savings-calculator/" className="tool-card" target="_blank" rel="noopener noreferrer">
              <span className="tool-icon">💰</span>
              <div>
                <h4>Savings Calculator</h4>
                <p>See your C3 savings potential</p>
              </div>
            </a>
          </div>
        </section>
      </main>

      {/* Add Activity Modal */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Add Custom Activity</h3>
              <button className="close-btn" onClick={() => setShowAddModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Activity Name *</label>
                <input
                  type="text"
                  value={newActivity.name}
                  onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                  placeholder="e.g., Read a book chapter"
                  className="form-input"
                  autoFocus
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <select
                    value={newActivity.category}
                    onChange={(e) => setNewActivity({ ...newActivity, category: e.target.value })}
                    className="form-select"
                  >
                    {Object.entries(CATEGORIES).map(([key, cat]) => (
                      <option key={key} value={key}>{cat.icon} {cat.name}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>Time Required</label>
                  <select
                    value={newActivity.time}
                    onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                    className="form-select"
                  >
                    <option value="5min">5 minutes</option>
                    <option value="15min">15 minutes</option>
                    <option value="30min">30 minutes</option>
                    <option value="1hour">1+ hour</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Energy Level</label>
                  <select
                    value={newActivity.energy}
                    onChange={(e) => setNewActivity({ ...newActivity, energy: e.target.value })}
                    className="form-select"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Location</label>
                  <select
                    value={newActivity.location}
                    onChange={(e) => setNewActivity({ ...newActivity, location: e.target.value })}
                    className="form-select"
                  >
                    <option value="home">Home</option>
                    <option value="outdoors">Outdoors</option>
                    <option value="anywhere">Anywhere</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Social</label>
                  <select
                    value={newActivity.social}
                    onChange={(e) => setNewActivity({ ...newActivity, social: e.target.value })}
                    className="form-select"
                  >
                    <option value="solo">Solo</option>
                    <option value="social">Social</option>
                    <option value="either">Either</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={addActivity} disabled={!newActivity.name.trim()}>
                Add Activity
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Random Activity Modal */}
      {showRandomModal && randomActivity && (
        <div className="modal-overlay" onClick={() => setShowRandomModal(false)}>
          <div className="modal random-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>🎲 Try This!</h3>
              <button className="close-btn" onClick={() => setShowRandomModal(false)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="random-activity">
                <span className="random-icon">{CATEGORIES[randomActivity.category].icon}</span>
                <h2 className="random-name">{randomActivity.name}</h2>
                <p className="random-category">{CATEGORIES[randomActivity.category].name}</p>

                <div className="random-tags">
                  <span className="tag">⏱️ {randomActivity.time}</span>
                  <span className="tag">⚡ {randomActivity.energy}</span>
                  <span className="tag">📍 {randomActivity.location}</span>
                  <span className="tag">
                    {randomActivity.social === 'solo' ? '🧘' : randomActivity.social === 'social' ? '👥' : '🔄'} {randomActivity.social}
                  </span>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={getRandomActivity}>
                🎲 Pick Another
              </button>
              <button className="btn-primary" onClick={() => {
                logUsage(randomActivity.id);
                setShowRandomModal(false);
              }}>
                ✓ I'll Do This
              </button>
            </div>
          </div>
        </div>
      )}

      <footer className="footer">
        <p>Part of the <strong>No Spend Challenge</strong> ecosystem | Made with care 💜</p>
      </footer>
    </div>
  );
}

export default App;
