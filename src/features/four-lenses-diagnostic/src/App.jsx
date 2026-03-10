import { useState, useEffect } from 'react'
import './App.css'

const LENSES = [
  {
    id: 'being',
    name: 'Being',
    icon: '🧘',
    prompt: 'Who am I being in this?',
    description: 'Identity and posture shaping action'
  },
  {
    id: 'feeling',
    name: 'Feeling',
    icon: '💭',
    prompt: 'What sensations or emotions are here?',
    description: 'Messages in your body and energy'
  },
  {
    id: 'acting',
    name: 'Acting',
    icon: '⚡',
    prompt: 'What am I doing, and how am I doing it?',
    description: 'Habits and systems that show belief in motion'
  },
  {
    id: 'showing-up',
    name: 'Showing Up',
    icon: '🌟',
    prompt: 'How does this expression land?',
    description: 'The relational layer, communication, boundaries, reception'
  }
];

const THREE_DS = [
  {
    id: 'dissonance',
    name: 'Dissonance',
    icon: '〰️',
    description: 'Subtle tension or expansion, evidence of change in motion'
  },
  {
    id: 'disconnect',
    name: 'Disconnect',
    icon: '⚡',
    description: 'When action drifts from intention'
  },
  {
    id: 'discord',
    name: 'Discord',
    icon: '🌀',
    description: 'Friction in interaction, an invitation to retune'
  }
];

const PILLARS = [
  { id: 'self', name: 'Self', icon: '🧘' },
  { id: 'time', name: 'Time', icon: '⏳' },
  { id: 'money', name: 'Money', icon: '💰' },
  { id: 'voice', name: 'Voice', icon: '🗣️' },
  { id: 'systems', name: 'Systems', icon: '⚙️' },
  { id: 'relationships', name: 'Relationships', icon: '💞' },
  { id: 'community', name: 'Community', icon: '🤝' },
  { id: 'creativity', name: 'Creativity', icon: '🎨' },
  { id: 'belief', name: 'Belief', icon: '✨' }
];

function App() {
  const [view, setView] = useState('home'); // home, new-diagnostic, history, detail
  const [currentStep, setCurrentStep] = useState(1);
  const [diagnostics, setDiagnostics] = useState([]);
  const [selectedDiagnostic, setSelectedDiagnostic] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const [currentDiagnostic, setCurrentDiagnostic] = useState({
    detect: '',
    lenses: {
      being: '',
      feeling: '',
      acting: '',
      'showing-up': ''
    },
    activeD: '',
    design: '',
    pillar: '',
    timestamp: null,
    reflection: ''
  });

  useEffect(() => {
    const savedDiagnostics = localStorage.getItem('alignment_diagnostics');
    if (savedDiagnostics) {
      setDiagnostics(JSON.parse(savedDiagnostics));
    }
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

  const startNewDiagnostic = () => {
    setCurrentDiagnostic({
      detect: '',
      lenses: {
        being: '',
        feeling: '',
        acting: '',
        'showing-up': ''
      },
      activeD: '',
      design: '',
      pillar: '',
      timestamp: null,
      reflection: ''
    });
    setCurrentStep(1);
    setView('new-diagnostic');
  };

  const saveDiagnostic = () => {
    const diagnostic = {
      ...currentDiagnostic,
      timestamp: Date.now(),
      id: Date.now()
    };

    const updated = [diagnostic, ...diagnostics];
    setDiagnostics(updated);
    localStorage.setItem('alignment_diagnostics', JSON.stringify(updated));

    setView('home');
    setCurrentStep(1);
  };

  const updateReflection = (id, reflection) => {
    const updated = diagnostics.map(d =>
      d.id === id ? { ...d, reflection } : d
    );
    setDiagnostics(updated);
    localStorage.setItem('alignment_diagnostics', JSON.stringify(updated));
  };

  const deleteDiagnostic = (id) => {
    const updated = diagnostics.filter(d => d.id !== id);
    setDiagnostics(updated);
    localStorage.setItem('alignment_diagnostics', JSON.stringify(updated));
    setView('history');
  };

  const exportDiagnostics = () => {
    const dataStr = JSON.stringify(diagnostics, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'alignment-diagnostics.json';
    link.click();
  };

  const canProceed = (step) => {
    switch(step) {
      case 1: return currentDiagnostic.detect.trim().length > 0;
      case 2: return Object.values(currentDiagnostic.lenses).every(v => v.trim().length > 0);
      case 3: return currentDiagnostic.activeD.length > 0;
      case 4: return currentDiagnostic.design.trim().length > 0;
      default: return true;
    }
  };

  const renderHome = () => (
    <div className="home-view">
      <header className="app-header">
        <div className="header-content">
          <h1>Four Lenses Diagnostic</h1>
          <p className="tagline">A tool for noticing what is happening in real time</p>
        </div>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <div className="home-content">
        <div className="intro-section">
          <h2>The Diagnostic gives each experiment a way to gather meaningful data.</h2>
          <p>It is not a test but a set of lenses—four ways to look at what is happening in real time.</p>
        </div>

        <div className="lenses-preview">
          {LENSES.map(lens => (
            <div key={lens.id} className="lens-card">
              <span className="lens-icon">{lens.icon}</span>
              <h3>{lens.name}</h3>
              <p>{lens.description}</p>
            </div>
          ))}
        </div>

        <div className="action-buttons">
          <button className="primary-button" onClick={startNewDiagnostic}>
            Start New Diagnostic
          </button>
          <button
            className="secondary-button"
            onClick={() => setView('history')}
            disabled={diagnostics.length === 0}
          >
            View History ({diagnostics.length})
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="diagnostic-step">
      <div className="step-header">
        <h2>Step 1: Detect</h2>
        <p>Notice a pulse of movement or friction</p>
      </div>

      <div className="step-content">
        <label htmlFor="detect">What are you noticing right now?</label>
        <textarea
          id="detect"
          value={currentDiagnostic.detect}
          onChange={(e) => setCurrentDiagnostic({...currentDiagnostic, detect: e.target.value})}
          placeholder="A moment of tension, a recurring pattern, a question that won't settle, an impulse you don't understand yet..."
          rows="6"
        />

        <div className="pillar-selector">
          <label>Which pillar does this relate to? (optional)</label>
          <div className="pillar-grid">
            {PILLARS.map(pillar => (
              <button
                key={pillar.id}
                className={`pillar-option ${currentDiagnostic.pillar === pillar.id ? 'selected' : ''}`}
                onClick={() => setCurrentDiagnostic({...currentDiagnostic, pillar: pillar.id})}
              >
                <span>{pillar.icon}</span>
                <span>{pillar.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="diagnostic-step">
      <div className="step-header">
        <h2>Step 2: Observe</h2>
        <p>Look through the four lenses and record what you see</p>
      </div>

      <div className="step-content">
        <div className="lenses-grid">
          {LENSES.map(lens => (
            <div key={lens.id} className="lens-input">
              <div className="lens-header">
                <span className="lens-icon">{lens.icon}</span>
                <h3>{lens.name}</h3>
              </div>
              <p className="lens-prompt">{lens.prompt}</p>
              <textarea
                value={currentDiagnostic.lenses[lens.id]}
                onChange={(e) => setCurrentDiagnostic({
                  ...currentDiagnostic,
                  lenses: { ...currentDiagnostic.lenses, [lens.id]: e.target.value }
                })}
                placeholder={`Observe through the lens of ${lens.name}...`}
                rows="4"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="diagnostic-step">
      <div className="step-header">
        <h2>Step 3: Describe</h2>
        <p>Name the active D — these are signals carrying data, not flaws</p>
      </div>

      <div className="step-content">
        <div className="three-ds-selector">
          {THREE_DS.map(d => (
            <button
              key={d.id}
              className={`d-option ${currentDiagnostic.activeD === d.id ? 'selected' : ''}`}
              onClick={() => setCurrentDiagnostic({...currentDiagnostic, activeD: d.id})}
            >
              <span className="d-icon">{d.icon}</span>
              <div className="d-content">
                <h3>{d.name}</h3>
                <p>{d.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="diagnostic-step">
      <div className="step-header">
        <h2>Step 4: Design</h2>
        <p>Choose one variable to shift</p>
      </div>

      <div className="step-content">
        <label htmlFor="design">What is one small thing you could shift or test?</label>
        <textarea
          id="design"
          value={currentDiagnostic.design}
          onChange={(e) => setCurrentDiagnostic({...currentDiagnostic, design: e.target.value})}
          placeholder="Not a complete solution—just the next smallest experiment. What could you try, adjust, or explore to see what changes?"
          rows="6"
        />

        <div className="design-note">
          <p>💡 This is your hypothesis line. Keep it small, specific, and testable.</p>
        </div>
      </div>
    </div>
  );

  const renderStep5 = () => (
    <div className="diagnostic-step">
      <div className="step-header">
        <h2>Step 5: Document</h2>
        <p>Review and save your diagnostic</p>
      </div>

      <div className="step-content">
        <div className="diagnostic-summary">
          <div className="summary-section">
            <h3>🔍 Detection</h3>
            <p>{currentDiagnostic.detect}</p>
            {currentDiagnostic.pillar && (
              <p className="pillar-tag">
                {PILLARS.find(p => p.id === currentDiagnostic.pillar)?.icon}{' '}
                {PILLARS.find(p => p.id === currentDiagnostic.pillar)?.name}
              </p>
            )}
          </div>

          <div className="summary-section">
            <h3>👁️ Observation</h3>
            <div className="lenses-summary">
              {LENSES.map(lens => (
                <div key={lens.id} className="lens-summary">
                  <strong>{lens.icon} {lens.name}:</strong>
                  <p>{currentDiagnostic.lenses[lens.id]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="summary-section">
            <h3>📊 Active Signal</h3>
            <p className="active-d">
              {THREE_DS.find(d => d.id === currentDiagnostic.activeD)?.icon}{' '}
              {THREE_DS.find(d => d.id === currentDiagnostic.activeD)?.name}
            </p>
          </div>

          <div className="summary-section">
            <h3>🔬 Design Variable</h3>
            <p>{currentDiagnostic.design}</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDiagnosticWizard = () => (
    <div className="diagnostic-wizard">
      <header className="wizard-header">
        <button className="back-button" onClick={() => setView('home')}>
          ← Back
        </button>
        <div className="step-indicator">
          Step {currentStep} of 5
        </div>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <div className="wizard-content">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
      </div>

      <div className="wizard-navigation">
        {currentStep > 1 && (
          <button
            className="nav-button secondary"
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Previous
          </button>
        )}

        {currentStep < 5 ? (
          <button
            className="nav-button primary"
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={!canProceed(currentStep)}
          >
            Continue
          </button>
        ) : (
          <button
            className="nav-button primary"
            onClick={saveDiagnostic}
          >
            Save Diagnostic
          </button>
        )}
      </div>
    </div>
  );

  const renderHistory = () => (
    <div className="history-view">
      <header className="app-header">
        <button className="back-button" onClick={() => setView('home')}>
          ← Back
        </button>
        <h1>Diagnostic History</h1>
        <div className="header-actions">
          {diagnostics.length > 0 && (
            <button className="export-button" onClick={exportDiagnostics}>
              Export
            </button>
          )}
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <div className="history-content">
        {diagnostics.length === 0 ? (
          <div className="empty-state">
            <p>No diagnostics yet. Start your first one to begin gathering data.</p>
            <button className="primary-button" onClick={startNewDiagnostic}>
              Start New Diagnostic
            </button>
          </div>
        ) : (
          <div className="diagnostics-list">
            {diagnostics.map(diagnostic => (
              <div
                key={diagnostic.id}
                className="diagnostic-card"
                onClick={() => {
                  setSelectedDiagnostic(diagnostic);
                  setView('detail');
                }}
              >
                <div className="card-header">
                  <div className="card-date">
                    {new Date(diagnostic.timestamp).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                  <div className="card-d">
                    {THREE_DS.find(d => d.id === diagnostic.activeD)?.icon}{' '}
                    {THREE_DS.find(d => d.id === diagnostic.activeD)?.name}
                  </div>
                </div>
                <div className="card-detect">
                  {diagnostic.detect.substring(0, 120)}
                  {diagnostic.detect.length > 120 ? '...' : ''}
                </div>
                {diagnostic.pillar && (
                  <div className="card-pillar">
                    {PILLARS.find(p => p.id === diagnostic.pillar)?.icon}{' '}
                    {PILLARS.find(p => p.id === diagnostic.pillar)?.name}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  const renderDetail = () => {
    if (!selectedDiagnostic) return null;

    return (
      <div className="detail-view">
        <header className="app-header">
          <button className="back-button" onClick={() => setView('history')}>
            ← Back to History
          </button>
          <h1>Diagnostic Detail</h1>
          <div className="header-actions">
            <button
              className="delete-button"
              onClick={() => {
                if (confirm('Delete this diagnostic?')) {
                  deleteDiagnostic(selectedDiagnostic.id);
                }
              }}
            >
              Delete
            </button>
            <button className="dark-mode-toggle" onClick={toggleDarkMode}>
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        <div className="detail-content">
          <div className="detail-meta">
            <div className="detail-date">
              {new Date(selectedDiagnostic.timestamp).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            {selectedDiagnostic.pillar && (
              <div className="detail-pillar">
                {PILLARS.find(p => p.id === selectedDiagnostic.pillar)?.icon}{' '}
                {PILLARS.find(p => p.id === selectedDiagnostic.pillar)?.name}
              </div>
            )}
          </div>

          <div className="detail-section">
            <h3>🔍 Detection</h3>
            <p>{selectedDiagnostic.detect}</p>
          </div>

          <div className="detail-section">
            <h3>👁️ Four Lenses Observation</h3>
            <div className="lenses-detail">
              {LENSES.map(lens => (
                <div key={lens.id} className="lens-detail">
                  <h4>{lens.icon} {lens.name}</h4>
                  <p>{selectedDiagnostic.lenses[lens.id]}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="detail-section">
            <h3>📊 Active Signal</h3>
            <div className="active-d-detail">
              {THREE_DS.find(d => d.id === selectedDiagnostic.activeD)?.icon}{' '}
              <strong>{THREE_DS.find(d => d.id === selectedDiagnostic.activeD)?.name}</strong>
              <p>{THREE_DS.find(d => d.id === selectedDiagnostic.activeD)?.description}</p>
            </div>
          </div>

          <div className="detail-section">
            <h3>🔬 Design Variable</h3>
            <p>{selectedDiagnostic.design}</p>
          </div>

          <div className="detail-section">
            <h3>💭 Reflection</h3>
            <p className="reflection-note">What changed, what steadied, what clarified?</p>
            <textarea
              value={selectedDiagnostic.reflection || ''}
              onChange={(e) => updateReflection(selectedDiagnostic.id, e.target.value)}
              placeholder="Add your reflection here... What happened when you tested this? What did you learn?"
              rows="6"
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="app">
      {view === 'home' && renderHome()}
      {view === 'new-diagnostic' && renderDiagnosticWizard()}
      {view === 'history' && renderHistory()}
      {view === 'detail' && renderDetail()}
    </div>
  );
}

export default App
