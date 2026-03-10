import { useState, useEffect } from 'react'
import './App.css'

const SCENARIOS = [
  {
    id: 'no-idea',
    title: "I have no idea where to start",
    icon: '🤷',
    guidance: [
      "Open the Roadmap, go to \"Before You Start,\" and do just Section 1 of the Workbook (Financial Inventory).",
      "Write rough numbers. That's enough for today.",
      "You don't need to be perfect. You just need to start somewhere."
    ],
    action: "Do Section 1 of the Workbook"
  },
  {
    id: 'hate-this',
    title: "I'm halfway through and I hate this",
    icon: '😤',
    guidance: [
      "Open the Journal. Write one honest page about why you hate it.",
      "That still counts as doing the challenge.",
      "Then decide: do you want to keep going, or do you want to stop and come back later?",
      "Both choices are valid."
    ],
    action: "Write one honest page in the Journal"
  },
  {
    id: 'spent-money',
    title: "I spent money and now I feel like I failed",
    icon: '💸',
    guidance: [
      "You didn't fail.",
      "Spending during a no-spend challenge is data, not failure.",
      "Go to your current week in the Journal and answer just one prompt:",
      "\"What was I feeling right before I spent?\"",
      "That's the work. That's what this challenge is actually about."
    ],
    action: "Answer one prompt in the Journal"
  },
  {
    id: 'which-tool',
    title: "I don't know which tool to use when",
    icon: '🤔',
    guidance: null, // Will show tool selector
    action: "View Tool Guide"
  }
];

const TOOL_GUIDE = [
  {
    situation: "Need structure and decisions",
    tool: "Workbook",
    icon: '📋',
    description: "Step-by-step framework for setting up your challenge and making decisions"
  },
  {
    situation: "Need to process feelings",
    tool: "Journal",
    icon: '📓',
    description: "Daily prompts for reflection, emotional awareness, and pattern recognition"
  },
  {
    situation: "Need to see numbers visually",
    tool: "Spreadsheet Pack",
    icon: '📊',
    description: "Visual tracking of expenses, categories, and spending patterns"
  },
  {
    situation: "Need to talk it out",
    tool: "Skool Community",
    icon: '💬',
    description: "Connect with others, ask questions, share wins and struggles"
  }
];

const EXIT_OPTIONS = [
  "Skip to just the data check-ins (bottom 1/3 of each Journal page)",
  "Use only the Workbook and ignore the Journal",
  "Use only the Journal and ignore the Workbook",
  "Stop, put it down, and come back in a week",
  "Decide this challenge isn't for you right now"
];

function App() {
  const [view, setView] = useState('home'); // home, scenario, tool-guide, exit
  const [selectedScenario, setSelectedScenario] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('nospend_darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('nospend_darkMode', JSON.stringify(newMode));
  };

  const selectScenario = (scenario) => {
    setSelectedScenario(scenario);
    if (scenario.id === 'which-tool') {
      setView('tool-guide');
    } else {
      setView('scenario');
    }
  };

  const renderHome = () => (
    <div className="home-view">
      <header className="app-header">
        <div className="header-content">
          <h1>Feeling Stuck?</h1>
          <p className="tagline">You're in the right place. Let's figure this out together.</p>
        </div>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <div className="home-content">
        <div className="reassurance-box">
          <h2>First: You can't do this wrong.</h2>
          <p>Spending during the challenge doesn't mean failure—it means data.</p>
          <p>Feeling overwhelmed doesn't mean you're broken—it means you're human.</p>
        </div>

        <div className="scenarios-section">
          <h3>What's happening right now?</h3>
          <div className="scenarios-grid">
            {SCENARIOS.map(scenario => (
              <button
                key={scenario.id}
                className="scenario-card"
                onClick={() => selectScenario(scenario)}
              >
                <span className="scenario-icon">{scenario.icon}</span>
                <h4>{scenario.title}</h4>
              </button>
            ))}
          </div>
        </div>

        <div className="quick-links">
          <button
            className="link-button"
            onClick={() => setView('exit')}
          >
            💡 I need permission to do this differently
          </button>
        </div>
      </div>
    </div>
  );

  const renderScenario = () => {
    if (!selectedScenario) return null;

    return (
      <div className="scenario-view">
        <header className="app-header">
          <button className="back-button" onClick={() => setView('home')}>
            ← Back
          </button>
          <h1>Help is Here</h1>
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </header>

        <div className="scenario-content">
          <div className="scenario-hero">
            <span className="hero-icon">{selectedScenario.icon}</span>
            <h2>{selectedScenario.title}</h2>
          </div>

          <div className="guidance-section">
            <h3>Here's what to do:</h3>
            <div className="guidance-steps">
              {selectedScenario.guidance.map((step, index) => (
                <div key={index} className="guidance-step">
                  <span className="step-number">{index + 1}</span>
                  <p>{step}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="action-box">
            <h4>Next Action:</h4>
            <p className="action-text">{selectedScenario.action}</p>
          </div>

          <div className="breathing-room">
            <p>Take a breath. You've got this. One small step is enough.</p>
          </div>
        </div>
      </div>
    );
  };

  const renderToolGuide = () => (
    <div className="tool-guide-view">
      <header className="app-header">
        <button className="back-button" onClick={() => setView('home')}>
          ← Back
        </button>
        <h1>Which Tool When?</h1>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <div className="tool-guide-content">
        <div className="intro-text">
          <p>You don't need to use all the tools all the time. Use what serves you in the moment.</p>
        </div>

        <div className="tools-grid">
          {TOOL_GUIDE.map((item, index) => (
            <div key={index} className="tool-card">
              <div className="tool-header">
                <span className="tool-icon">{item.icon}</span>
                <h3>{item.tool}</h3>
              </div>
              <div className="tool-situation">
                <strong>When:</strong> {item.situation}
              </div>
              <p className="tool-description">{item.description}</p>
            </div>
          ))}
        </div>

        <div className="reminder-box">
          <p><strong>Remember:</strong> These are guidelines, not rules. If something isn't working, try a different tool or skip it entirely.</p>
        </div>
      </div>
    </div>
  );

  const renderExit = () => (
    <div className="exit-view">
      <header className="app-header">
        <button className="back-button" onClick={() => setView('home')}>
          ← Back
        </button>
        <h1>You Have Options</h1>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <div className="exit-content">
        <div className="permission-box">
          <h2>You can always:</h2>
        </div>

        <div className="exit-options">
          {EXIT_OPTIONS.map((option, index) => (
            <div key={index} className="exit-option">
              <span className="option-icon">✓</span>
              <p>{option}</p>
            </div>
          ))}
        </div>

        <div className="validation-box">
          <h3>All of those are valid.</h3>
          <p>There's no wrong way to engage with this work.</p>
        </div>

        <div className="breathing-space">
          <p>This challenge is a tool for you, not a test you need to pass.</p>
          <p>You get to decide what "doing it right" means.</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="app">
      {view === 'home' && renderHome()}
      {view === 'scenario' && renderScenario()}
      {view === 'tool-guide' && renderToolGuide()}
      {view === 'exit' && renderExit()}
    </div>
  );
}

export default App
