import { useState, useEffect } from 'react'
import './App.css'

const PHASES = {
  chasing: {
    id: 'chasing',
    name: 'Chasing',
    subtitle: 'The Curiosity Phase',
    icon: '🌟',
    color: '#B375A0',
    description: 'Curiosity begins as motion. You chase an idea, a dream, or an image of what could be next.',
    question: 'What is moving me right now? What does this motion reveal?',
    guidance: [
      'Listen for what attracts your energy',
      'Study the impulse itself: Why this? What does it represent?',
      'Notice whether the chase points toward direction or distraction',
      'Both carry information'
    ],
    prompts: [
      'What am I chasing right now?',
      'What does this chase represent to me?',
      'Is this direction or distraction?',
      'What pattern is this revealing?'
    ],
    nextPhase: 'shadow'
  },
  shadow: {
    id: 'shadow',
    name: 'Shadow',
    subtitle: 'The Integration Phase',
    icon: '🌙',
    color: '#3B3B58',
    description: 'Every chase casts a shadow. Here you turn toward the parts of the pattern that have been running quietly beneath awareness.',
    question: 'What pattern is asking for inclusion? What does this pattern protect or value?',
    guidance: [
      'Meet resistance, fear, habit, and identity',
      'Approach with curiosity instead of critique',
      'Shadow is not punishment or pathology—it is material that wants inclusion',
      'Ask what this pattern protects or values'
    ],
    prompts: [
      'What resistance am I meeting?',
      'What does this pattern protect?',
      'What old data is being held here?',
      'What wants to be included?'
    ],
    nextPhase: 'getting'
  },
  getting: {
    id: 'getting',
    name: 'Getting',
    subtitle: 'The Application Phase',
    icon: '⚡',
    color: '#7A9B7A',
    description: 'After observation comes practice. Getting is where you translate awareness into movement.',
    question: 'What happens when I live what I have learned?',
    guidance: [
      'Launch the offer, set the boundary, change the schedule, rewrite the copy',
      'Collect data by doing, not waiting',
      'There are no perfect conditions, only feedback',
      'This is pragmatic inquiry'
    ],
    prompts: [
      'What am I testing?',
      'What action translates my awareness?',
      'What feedback am I collecting?',
      'What is the smallest next experiment?'
    ],
    nextPhase: 'reflection'
  },
  reflection: {
    id: 'reflection',
    name: 'Reflection',
    subtitle: 'The Assimilation Phase',
    icon: '💭',
    color: '#E8B4A0',
    description: 'Reflection closes and reopens the loop. Here you distill what the experiment taught you.',
    question: 'What changed, what steadied, what clarified?',
    guidance: [
      'Harvest the data, the patterns, the moments of coherence',
      'Reflection is for harvesting insight, not judgment',
      'When reflection settles, curiosity stirs again',
      'A new chase begins, informed by what you just learned'
    ],
    prompts: [
      'What did I learn from this cycle?',
      'What patterns became clear?',
      'What changed or steadied?',
      'What new curiosity is emerging?'
    ],
    nextPhase: 'chasing'
  }
};

function App() {
  const [view, setView] = useState('home'); // home, active-cycle, history
  const [currentPhase, setCurrentPhase] = useState('chasing');
  const [cycles, setCycles] = useState([]);
  const [activeCycle, setActiveCycle] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedCycles = localStorage.getItem('lab_loop_cycles');
    if (savedCycles) {
      setCycles(JSON.parse(savedCycles));
    }
    const savedActiveCycle = localStorage.getItem('lab_loop_active_cycle');
    if (savedActiveCycle) {
      const cycle = JSON.parse(savedActiveCycle);
      setActiveCycle(cycle);
      setCurrentPhase(cycle.currentPhase);
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

  const startNewCycle = () => {
    const newCycle = {
      id: Date.now(),
      startDate: Date.now(),
      currentPhase: 'chasing',
      phases: {
        chasing: { entered: Date.now(), notes: '', completed: false },
        shadow: { entered: null, notes: '', completed: false },
        getting: { entered: null, notes: '', completed: false },
        reflection: { entered: null, notes: '', completed: false }
      }
    };
    setActiveCycle(newCycle);
    setCurrentPhase('chasing');
    localStorage.setItem('lab_loop_active_cycle', JSON.stringify(newCycle));
    setView('active-cycle');
  };

  const updatePhaseNotes = (phase, notes) => {
    const updated = {
      ...activeCycle,
      phases: {
        ...activeCycle.phases,
        [phase]: {
          ...activeCycle.phases[phase],
          notes
        }
      }
    };
    setActiveCycle(updated);
    localStorage.setItem('lab_loop_active_cycle', JSON.stringify(updated));
  };

  const transitionToNextPhase = () => {
    const phase = PHASES[currentPhase];
    const nextPhaseId = phase.nextPhase;

    // Mark current phase as completed
    const updated = {
      ...activeCycle,
      currentPhase: nextPhaseId,
      phases: {
        ...activeCycle.phases,
        [currentPhase]: {
          ...activeCycle.phases[currentPhase],
          completed: true
        },
        [nextPhaseId]: {
          ...activeCycle.phases[nextPhaseId],
          entered: Date.now()
        }
      }
    };

    setCurrentPhase(nextPhaseId);
    setActiveCycle(updated);
    localStorage.setItem('lab_loop_active_cycle', JSON.stringify(updated));

    // If we've completed a full cycle (reflection → chasing transition)
    if (currentPhase === 'reflection') {
      const completedCycle = {
        ...updated,
        endDate: Date.now(),
        completed: true
      };
      const updatedCycles = [completedCycle, ...cycles];
      setCycles(updatedCycles);
      localStorage.setItem('lab_loop_cycles', JSON.stringify(updatedCycles));
    }
  };

  const jumpToPhase = (phaseId) => {
    const updated = {
      ...activeCycle,
      currentPhase: phaseId,
      phases: {
        ...activeCycle.phases,
        [phaseId]: {
          ...activeCycle.phases[phaseId],
          entered: activeCycle.phases[phaseId].entered || Date.now()
        }
      }
    };
    setCurrentPhase(phaseId);
    setActiveCycle(updated);
    localStorage.setItem('lab_loop_active_cycle', JSON.stringify(updated));
  };

  const deleteCycle = (id) => {
    const updated = cycles.filter(c => c.id !== id);
    setCycles(updated);
    localStorage.setItem('lab_loop_cycles', JSON.stringify(updated));
  };

  const renderHome = () => (
    <div className="home-view">
      <header className="app-header">
        <div className="header-content">
          <h1>Lab Loop Tracker</h1>
          <p className="tagline">Navigate the rhythm of alignment</p>
        </div>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <div className="home-content">
        <div className="intro-section">
          <h2>The Lab Loop follows a rhythm more than a formula</h2>
          <p>A full conversation with your life: noticing, engaging, integrating, continuing.</p>
        </div>

        <div className="loop-diagram">
          <div className="loop-circle">
            {Object.values(PHASES).map((phase, index) => (
              <div
                key={phase.id}
                className="phase-node"
                style={{ '--phase-color': phase.color, '--index': index }}
              >
                <div className="phase-icon">{phase.icon}</div>
                <div className="phase-name">{phase.name}</div>
              </div>
            ))}
          </div>
          <div className="loop-center">
            <div className="loop-arrow">↻</div>
          </div>
        </div>

        <div className="phases-overview">
          {Object.values(PHASES).map(phase => (
            <div key={phase.id} className="phase-card">
              <div className="phase-header" style={{ borderLeftColor: phase.color }}>
                <span className="phase-icon">{phase.icon}</span>
                <div>
                  <h3>{phase.name}</h3>
                  <p className="phase-subtitle">{phase.subtitle}</p>
                </div>
              </div>
              <p className="phase-description">{phase.description}</p>
            </div>
          ))}
        </div>

        <div className="action-buttons">
          {activeCycle ? (
            <button className="primary-button" onClick={() => setView('active-cycle')}>
              Continue Current Cycle
            </button>
          ) : (
            <button className="primary-button" onClick={startNewCycle}>
              Start New Cycle
            </button>
          )}
          <button
            className="secondary-button"
            onClick={() => setView('history')}
            disabled={cycles.length === 0}
          >
            View History ({cycles.length})
          </button>
        </div>
      </div>
    </div>
  );

  const renderActiveCycle = () => {
    if (!activeCycle) return null;
    const phase = PHASES[currentPhase];

    return (
      <div className="active-cycle-view">
        <header className="app-header">
          <button className="back-button" onClick={() => setView('home')}>
            ← Home
          </button>
          <div className="cycle-info">
            <span className="cycle-label">Active Cycle</span>
            <span className="cycle-date">
              Started {new Date(activeCycle.startDate).toLocaleDateString()}
            </span>
          </div>
          <button className="dark-mode-toggle" onClick={toggleDarkMode}>
            {darkMode ? '☀️' : '🌙'}
          </button>
        </header>

        <div className="phase-navigation">
          {Object.values(PHASES).map(p => (
            <button
              key={p.id}
              className={`phase-nav-button ${currentPhase === p.id ? 'active' : ''} ${activeCycle.phases[p.id].completed ? 'completed' : ''}`}
              onClick={() => jumpToPhase(p.id)}
              style={{ '--phase-color': p.color }}
            >
              <span className="nav-icon">{p.icon}</span>
              <span className="nav-name">{p.name}</span>
              {activeCycle.phases[p.id].completed && <span className="check">✓</span>}
            </button>
          ))}
        </div>

        <div className="phase-content">
          <div className="phase-hero" style={{ backgroundColor: `${phase.color}15`, borderColor: phase.color }}>
            <div className="hero-icon">{phase.icon}</div>
            <div className="hero-text">
              <h2>{phase.name}</h2>
              <p className="hero-subtitle">{phase.subtitle}</p>
            </div>
          </div>

          <div className="phase-main">
            <div className="phase-section">
              <h3>About This Phase</h3>
              <p className="phase-description">{phase.description}</p>
              <blockquote className="phase-question">{phase.question}</blockquote>
            </div>

            <div className="phase-section">
              <h3>Guidance</h3>
              <ul className="guidance-list">
                {phase.guidance.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="phase-section">
              <h3>Reflection Prompts</h3>
              <div className="prompts-grid">
                {phase.prompts.map((prompt, i) => (
                  <div key={i} className="prompt-card">
                    <span className="prompt-number">{i + 1}</span>
                    <p>{prompt}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="phase-section">
              <h3>Phase Notes</h3>
              <textarea
                value={activeCycle.phases[currentPhase].notes}
                onChange={(e) => updatePhaseNotes(currentPhase, e.target.value)}
                placeholder="Capture your observations, insights, and data from this phase..."
                rows="8"
              />
            </div>
          </div>

          <div className="phase-actions">
            <button
              className="transition-button"
              onClick={transitionToNextPhase}
              style={{ backgroundColor: phase.color }}
            >
              Move to {PHASES[phase.nextPhase].name} {PHASES[phase.nextPhase].icon}
            </button>
            {currentPhase === 'reflection' && (
              <p className="completion-note">
                Completing this phase will close the cycle and start a new one
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderHistory = () => (
    <div className="history-view">
      <header className="app-header">
        <button className="back-button" onClick={() => setView('home')}>
          ← Home
        </button>
        <h1>Cycle History</h1>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <div className="history-content">
        {cycles.length === 0 ? (
          <div className="empty-state">
            <p>No completed cycles yet. Start your first cycle to begin tracking your rhythm.</p>
            <button className="primary-button" onClick={startNewCycle}>
              Start New Cycle
            </button>
          </div>
        ) : (
          <div className="cycles-list">
            {cycles.map(cycle => {
              const duration = cycle.endDate - cycle.startDate;
              const days = Math.floor(duration / (1000 * 60 * 60 * 24));

              return (
                <div key={cycle.id} className="cycle-card">
                  <div className="cycle-header">
                    <div className="cycle-dates">
                      <span>{new Date(cycle.startDate).toLocaleDateString()}</span>
                      {cycle.endDate && (
                        <>
                          <span> → </span>
                          <span>{new Date(cycle.endDate).toLocaleDateString()}</span>
                        </>
                      )}
                    </div>
                    <div className="cycle-duration">{days} days</div>
                  </div>

                  <div className="cycle-phases">
                    {Object.entries(cycle.phases).map(([phaseId, phaseData]) => {
                      const phase = PHASES[phaseId];
                      return (
                        <div key={phaseId} className="cycle-phase-summary">
                          <div className="phase-summary-header">
                            <span>{phase.icon} {phase.name}</span>
                            {phaseData.completed && <span className="check">✓</span>}
                          </div>
                          {phaseData.notes && (
                            <p className="phase-notes-preview">
                              {phaseData.notes.substring(0, 100)}
                              {phaseData.notes.length > 100 ? '...' : ''}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <button
                    className="delete-cycle-button"
                    onClick={() => {
                      if (confirm('Delete this cycle?')) {
                        deleteCycle(cycle.id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="app">
      {view === 'home' && renderHome()}
      {view === 'active-cycle' && renderActiveCycle()}
      {view === 'history' && renderHistory()}
    </div>
  );
}

export default App
