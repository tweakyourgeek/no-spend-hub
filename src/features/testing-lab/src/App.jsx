import { useState, useEffect } from 'react';
import './App.css';

// Skool community URL
const SKOOL_URL = 'https://www.skool.com/nospend-8052/about';

// Base URL for deployed apps
const BASE_URL = 'https://tweakyourgeek.github.io/nospend-apps';

// Tool definitions with shelf categories
const TOOLS = {
  unsealed: [
    {
      id: 'pattern-quiz',
      name: 'Spending Patterns Quiz',
      description: 'Discover your emotional spending patterns through 18 revealing questions.',
      path: `${BASE_URL}/pattern-quiz/`,
      shelf: 'quick-checks',
      jarContents: 'Swirling iridescent smoke with tiny mirrors floating in lavender-silver liquid',
    },
    {
      id: 'impulse-brake',
      name: 'Impulse Brake',
      description: '7-question reality check before you buy something.',
      path: `${BASE_URL}/impulse-brake/`,
      shelf: 'quick-checks',
      jarContents: 'Glowing amber brake lights suspended in honey-colored liquid',
    },
    {
      id: 'marketing-decoder',
      name: 'Marketing Decoder',
      description: 'Paste sales copy, see manipulation tactics highlighted.',
      path: `${BASE_URL}/marketing-decoder/`,
      shelf: 'quick-checks',
      jarContents: 'A magnifying glass with x-ray glow, text layers peeling apart',
    },
    {
      id: 'decision-matrix',
      name: 'Decision Matrix',
      description: 'Weighted comparison tool for any decision.',
      path: `${BASE_URL}/decision-matrix/`,
      shelf: 'quick-checks',
      jarContents: 'Tiny brass scales with floating platforms finding balance',
    },
    {
      id: 'activity-generator',
      name: 'Activity Generator',
      description: 'Zero-cost activities based on mood, energy, and time.',
      path: `${BASE_URL}/activity-generator/`,
      shelf: 'daily-support',
      jarContents: 'Dice and playing cards tumbling in effervescent liquid with colored sparks',
    },
  ],
  sealed: [
    // The Challenge
    {
      id: 'challenge-roadmap',
      name: 'Challenge Roadmap',
      description: '30-day interactive guide with progress tracking.',
      path: `${BASE_URL}/challenge-roadmap/`,
      shelf: 'the-challenge',
      jarContents: 'A glowing compass with floating calendar pages and golden thread path',
    },
    {
      id: 'journal-30day',
      name: '30-Day Journal',
      description: 'Daily reflection prompts organized by weekly theme.',
      path: `${BASE_URL}/journal-30day/`,
      shelf: 'the-challenge',
      jarContents: 'Floating pages with self-writing text in twilight-purple ink',
    },
    {
      id: 'expense-log',
      name: 'Expense Log',
      description: 'Customizable spending tracker with persona options.',
      path: `${BASE_URL}/expense-log/`,
      shelf: 'the-challenge',
      jarContents: 'Receipts and coins organizing into neat columns',
    },
    {
      id: 'lab-loop-tracker',
      name: 'Lab Loop Tracker',
      description: 'Track learning cycles: Chasing, Shadow, Getting, Reflection.',
      path: `${BASE_URL}/lab-loop-tracker/`,
      shelf: 'the-challenge',
      jarContents: 'A four-colored spiral rotating like a DNA helix',
    },
    {
      id: 'commitment-builder',
      name: 'Commitment Builder',
      description: 'Create downloadable visual commitment for your 30-day challenge.',
      path: `${BASE_URL}/commitment-builder/`,
      shelf: 'the-challenge',
      jarContents: 'A crystal forming with wisps of intention drawn into its structure',
    },
    // Money Tools
    {
      id: 'savings-calculator',
      name: 'C3 Savings Calculator',
      description: 'Cut/Cancel/Combine savings projections with 12-month charts.',
      path: `${BASE_URL}/savings-calculator/`,
      shelf: 'money-tools',
      jarContents: 'Copper coins multiplying in champagne-gold liquid with rising bubbles',
    },
    {
      id: 'subscription-analyzer',
      name: 'Subscription Analyzer',
      description: 'Track recurring expenses and find family plan opportunities.',
      path: `${BASE_URL}/subscription-analyzer/`,
      shelf: 'money-tools',
      jarContents: 'Spinning wheels and tiny scissors with receipts dissolving into confetti',
    },
    {
      id: 'c3-single-action',
      name: 'C3 Single-Action',
      description: 'Pick ONE action and complete it with guidance.',
      path: `${BASE_URL}/c3-single-action/`,
      shelf: 'money-tools',
      jarContents: 'A single bright flame cutting through tangled threads',
    },
    // Pattern Work
    {
      id: 'trigger-quiz',
      name: 'Trigger Quiz',
      description: 'Decision-loop analysis for when you\'re stuck ruminating.',
      path: `${BASE_URL}/trigger-quiz/`,
      shelf: 'pattern-work',
      jarContents: 'A spiral unwinding from a tight knot into a straight line',
    },
    {
      id: 'four-lenses-diagnostic',
      name: 'Four Lenses Diagnostic',
      description: 'Being/Feeling/Acting/Showing Up alignment tool.',
      path: `${BASE_URL}/four-lenses-diagnostic/`,
      shelf: 'pattern-work',
      jarContents: 'Four colored lenses rotating to create kaleidoscope patterns',
    },
    {
      id: 'rumination-interrupter',
      name: 'Rumination Interrupter',
      description: 'Break "should have / what if" thought loops.',
      path: `${BASE_URL}/rumination-interrupter/`,
      shelf: 'pattern-work',
      jarContents: 'A hamster wheel slowing to rest with thought-threads unknotting',
    },
    {
      id: 'comfort-menu',
      name: 'Comfort Menu Builder',
      description: 'Personal menu of non-spending self-soothing options.',
      path: `${BASE_URL}/comfort-menu/`,
      shelf: 'daily-support',
      jarContents: 'Soft fabric scraps and comfort objects in warm rose-gold liquid',
    },
    {
      id: 'crisis-helper',
      name: 'Crisis Helper',
      description: 'Support for when you\'re struggling with the challenge.',
      path: `${BASE_URL}/crisis-helper/`,
      shelf: 'daily-support',
      jarContents: 'A soft glowing orb with gentle protective bubbles',
    },
    // Digital Life
    {
      id: 'digital-declutter',
      name: 'Digital Declutter',
      description: 'Progressive checklist through 7 digital categories.',
      path: `${BASE_URL}/digital-declutter/`,
      shelf: 'digital-life',
      jarContents: 'Digital debris being vacuumed toward a glowing center',
    },
    {
      id: 'meal-planner',
      name: 'Meal Planner',
      description: 'Find recipes based on ingredients you already have.',
      path: `${BASE_URL}/meal-planner/`,
      shelf: 'daily-support',
      jarContents: 'Vegetables and herbs swirling together in golden-brown liquid',
    },
  ],
};

// Shelf definitions
const SHELVES = {
  'quick-checks': { label: 'Quick Checks', icon: '🔍' },
  'the-challenge': { label: 'The Challenge', icon: '🗓️' },
  'money-tools': { label: 'Money Tools', icon: '💰' },
  'pattern-work': { label: 'Pattern Work', icon: '🧠' },
  'daily-support': { label: 'Daily Support', icon: '🌿' },
  'digital-life': { label: 'Digital Life', icon: '📱' },
};

// Jar component
function Jar({ tool, isSealed, onSealedClick }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (isSealed) {
      onSealedClick(tool);
    } else {
      window.location.href = tool.path;
    }
  };

  return (
    <div
      className={`jar ${isSealed ? 'sealed' : 'unsealed'} ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <div className="jar-lid">
        {isSealed && <span className="lock-icon">🔒</span>}
      </div>
      <div className="jar-body">
        <div className="jar-contents">
          <div className="jar-liquid"></div>
          <div className="jar-particles"></div>
        </div>
        <div className="jar-label">
          <h3>{tool.name}</h3>
          <p>{tool.description}</p>
          <span className={`jar-status ${isSealed ? 'sealed' : 'unsealed'}`}>
            {isSealed ? 'Members Only' : 'Open to Try'}
          </span>
        </div>
      </div>
      <div className="jar-glow"></div>
    </div>
  );
}

// Sealed modal component
function SealedModal({ tool, onClose }) {
  if (!tool) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>

        <div className="modal-jar-preview">
          <div className="preview-jar sealed">
            <div className="jar-lid">
              <span className="lock-icon">🔒</span>
            </div>
            <div className="jar-body">
              <div className="jar-contents">
                <div className="jar-liquid"></div>
              </div>
            </div>
          </div>
        </div>

        <h2>{tool.name}</h2>
        <p className="modal-description">{tool.description}</p>

        <div className="modal-sealed-message">
          <p>This specimen requires collective membership to unseal.</p>
        </div>

        <a href={SKOOL_URL} className="join-btn" target="_blank" rel="noopener noreferrer">
          Join the Collective
        </a>

        <p className="modal-hint">
          Already a member? Access this tool from the community.
        </p>
      </div>
    </div>
  );
}

// Shelf component
function Shelf({ shelfId, tools, isSealed, onSealedClick }) {
  const shelf = SHELVES[shelfId];

  return (
    <div className="shelf">
      <div className="shelf-header">
        <span className="shelf-icon">{shelf.icon}</span>
        <h2>{shelf.label}</h2>
      </div>
      <div className="shelf-surface">
        <div className="jars-row">
          {tools.map((tool) => (
            <Jar
              key={tool.id}
              tool={tool}
              isSealed={isSealed}
              onSealedClick={onSealedClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('nospend_darkMode');
    return saved === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('nospend_darkMode', darkMode);
  }, [darkMode]);

  // Group tools by shelf
  const groupByShelf = (tools) => {
    return tools.reduce((acc, tool) => {
      if (!acc[tool.shelf]) acc[tool.shelf] = [];
      acc[tool.shelf].push(tool);
      return acc;
    }, {});
  };

  const unsealedByShelf = groupByShelf(TOOLS.unsealed);
  const sealedByShelf = groupByShelf(TOOLS.sealed);

  // Merge shelves, unsealed first within each shelf
  const allShelves = {};
  Object.keys(SHELVES).forEach((shelfId) => {
    allShelves[shelfId] = {
      unsealed: unsealedByShelf[shelfId] || [],
      sealed: sealedByShelf[shelfId] || [],
    };
  });

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="header-top">
            <button
              className="dark-mode-toggle"
              onClick={() => setDarkMode(!darkMode)}
              title="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          <div className="logo-section">
            <div className="lab-icon">🧪</div>
            <h1>The Testing Lab</h1>
          </div>

          <p className="tagline">
            Specimen jars for your spending patterns.<br />
            Some are open for examination. Others require membership to unseal.
          </p>

          <div className="legend">
            <div className="legend-item">
              <div className="legend-jar unsealed"></div>
              <span>Open to Try</span>
            </div>
            <div className="legend-item">
              <div className="legend-jar sealed"></div>
              <span>Members Only</span>
            </div>
          </div>
        </header>

        {/* Apothecary Cabinet */}
        <div className="cabinet">
          {Object.entries(allShelves).map(([shelfId, { unsealed, sealed }]) => {
            // Skip empty shelves
            if (unsealed.length === 0 && sealed.length === 0) return null;

            return (
              <div key={shelfId} className="shelf-section">
                <div className="shelf-header">
                  <span className="shelf-icon">{SHELVES[shelfId].icon}</span>
                  <h2>{SHELVES[shelfId].label}</h2>
                </div>
                <div className="shelf-surface">
                  <div className="jars-row">
                    {unsealed.map((tool) => (
                      <Jar
                        key={tool.id}
                        tool={tool}
                        isSealed={false}
                        onSealedClick={() => {}}
                      />
                    ))}
                    {sealed.map((tool) => (
                      <Jar
                        key={tool.id}
                        tool={tool}
                        isSealed={true}
                        onSealedClick={setSelectedTool}
                      />
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Join CTA Section */}
        <div className="join-section">
          <h2>Ready to unlock the full apothecary?</h2>
          <p>
            Join the No Spend Collective for access to all 20 tools,
            plus community support, live sessions, and more.
          </p>
          <a href={SKOOL_URL} className="join-btn large" target="_blank" rel="noopener noreferrer">
            Join the Collective
          </a>
        </div>

        {/* Footer */}
        <footer className="footer">
          <p>You can't do this wrong. 💜</p>
          <p className="small">
            Part of the <a href={SKOOL_URL} target="_blank" rel="noopener noreferrer">No Spend Challenge</a> ecosystem
          </p>
        </footer>
      </div>

      {/* Sealed Tool Modal */}
      <SealedModal tool={selectedTool} onClose={() => setSelectedTool(null)} />
    </div>
  );
}

export default App;
