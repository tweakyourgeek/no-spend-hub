import { useState, useEffect, useRef } from 'react'
import './App.css'

const STEPS = [
  {
    id: 'before-start',
    title: 'Before You Start',
    subtitle: 'Prep & Setup',
    icon: '📋',
    days: 'Pre-Challenge',
    summary: "Setting up the experiment. You're not committing to perfection, you're choosing what to test.",
    workbook: [
      {
        section: 'Section 1 (Financial Inventory)',
        task: 'Do a light pass. Rough numbers are fine. You\'re getting a snapshot, not building a detailed budget.'
      },
      {
        section: 'Section 2 (Your Direction)',
        task: 'Name what you want to learn and what you\'re willing to test for 30 days.'
      },
      {
        section: 'Section 3 (Rules & Boundaries)',
        task: 'Pick 2-4 rules that feel like experiments, not punishments. Remember: you can adjust these mid-challenge if needed.'
      }
    ],
    journal: [
      {
        section: '"Before You Begin" section',
        task: 'Complete the initial prompts to establish your starting point.'
      },
      {
        section: 'Money Feelings Mind Map',
        task: 'Map out how you feel about money right now. This is your emotional baseline.'
      },
      {
        section: 'First Word Cloud + Word of the Week',
        task: 'Choose your anchor word for Week 1.'
      }
    ],
    important: "You don't need to complete every page to get value from this challenge. If a prompt doesn't land, skip it. If spreadsheets make you want to throw your laptop, ignore them. The challenge works because you're paying attention, not because you filled in every blank.",
    reminder: "Spending during a no-spend challenge doesn't mean you failed. It means you have data to work with."
  },
  {
    id: 'week-1',
    title: 'Week 1',
    subtitle: 'Noticing & Naming',
    icon: '👀',
    days: 'Days 1-7',
    summary: "Observing without judgment. You're learning what your spending patterns look like in real time.",
    journal: [
      {
        section: 'Week 1 daily pages',
        task: 'Use these to track urges, surprises, and first patterns. Notice what comes up when you interrupt familiar spending habits.'
      },
      {
        section: 'Week 1 Wrap-Up',
        task: 'End-of-week reflection to identify what you learned in the first seven days.'
      }
    ],
    workbook: [
      {
        section: 'First Weekly Check-in',
        task: 'Log your week. Keep numbers approximate if you need to. Precision matters less than participation.'
      }
    ],
    reminder: "If you spend money this week: That's data, not failure. Write down what happened, what you were feeling, what triggered it. That's the work."
  },
  {
    id: 'weeks-2-3',
    title: 'Weeks 2-3',
    subtitle: 'Urges & Patterns',
    icon: '🔍',
    days: 'Days 8-21',
    summary: "Going deeper. This is where patterns start to reveal themselves, and where the challenge might feel harder.",
    journal: [
      {
        section: 'Week 2 (Urges & Alternatives)',
        task: 'Work through daily pages focused on identifying spending triggers and building non-spending alternatives.'
      },
      {
        section: 'Week 3 (Patterns & Pressure Points)',
        task: 'Daily pages explore your specific patterns and where external/internal pressure shows up.'
      },
      {
        section: 'Weekly Wrap-Ups',
        task: 'Complete end-of-week reflections for both weeks.'
      }
    ],
    workbook: [
      {
        section: 'Weekly Check-ins',
        task: 'Continue tracking each week\'s spending and patterns.'
      },
      {
        section: 'Optional: Spreadsheet Pack',
        task: 'If you\'re a numbers person, use the weekly overview and before/after comparison tabs to see visual progress.'
      }
    ],
    important: "This is the heavy section. If it feels overwhelming:",
    tips: [
      'Focus on the Journal OR the Workbook, not both.',
      'Use voice memos instead of writing if that\'s easier.',
      'Skip days that don\'t serve you. You can still get value from partial participation.'
    ]
  },
  {
    id: 'week-4',
    title: 'Week 4 & Beyond',
    subtitle: 'Integration & Next Steps',
    icon: '✨',
    days: 'Days 22-30+',
    summary: "Deciding what to keep. Not all of it, not none of it. Just what actually serves you.",
    journal: [
      {
        section: 'Week 4 (Integration & Self-Respect)',
        task: 'Daily pages focused on consolidating what you\'ve learned and practicing self-respect around money.'
      },
      {
        section: 'End-of-Challenge Reflection',
        task: 'Big-picture review of the full 30 days.'
      }
    ],
    workbook: [
      {
        section: 'Section 5 (Debrief)',
        task: 'Review your before/after, name what shifted, identify what you want to carry forward.'
      },
      {
        section: 'Section 6 (Spreadsheet Tie-ins) - if applicable',
        task: 'If you used the Spreadsheet Pack, review your dashboards and freed-up money allocation.'
      }
    ],
    reminder: "After the challenge: You don't need to have all the answers yet. Pick 1-2 gentle experiments to try in the next 30 days. That's enough."
  }
];

const QUICK_NAV = [
  { id: 'before-start', label: "Haven't started yet", icon: '📋' },
  { id: 'week-1', label: 'Days 1-7', icon: '👀' },
  { id: 'weeks-2-3', label: 'Days 8-21', icon: '🔍' },
  { id: 'week-4', label: 'Days 22-30+', icon: '✨' },
  { id: 'stuck', label: 'Stuck/Overwhelmed', icon: '🆘' }
];

function App() {
  const [expandedStep, setExpandedStep] = useState(null);
  const [currentDay, setCurrentDay] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const stepRefs = useRef({});

  useEffect(() => {
    const savedDay = localStorage.getItem('challenge_current_day');
    if (savedDay) {
      setCurrentDay(parseInt(savedDay));
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

  const updateDay = (day) => {
    setCurrentDay(day);
    localStorage.setItem('challenge_current_day', day.toString());
  };

  const toggleStep = (stepId) => {
    setExpandedStep(expandedStep === stepId ? null : stepId);
  };

  const scrollToStep = (stepId) => {
    if (stepId === 'stuck') {
      // Link to Crisis Helper app
      alert('Opening Crisis Helper... (In production, this would link to the Crisis Helper app)');
      return;
    }

    setExpandedStep(stepId);
    setTimeout(() => {
      stepRefs.current[stepId]?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const getCurrentStepId = () => {
    if (currentDay === 0) return 'before-start';
    if (currentDay <= 7) return 'week-1';
    if (currentDay <= 21) return 'weeks-2-3';
    return 'week-4';
  };

  return (
    <div className="app">
      <div className="sticky-banner">
        You can't do this wrong. Spending during the challenge doesn't mean failure—it means data.
      </div>

      <header className="app-header">
        <div className="header-content">
          <h1>Your 30-Day Challenge Roadmap</h1>
          <p className="tagline">This is your map through the Workbook, Journal, and Spreadsheet Pack</p>
        </div>
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? '☀️' : '🌙'}
        </button>
      </header>

      <div className="progress-tracker">
        <div className="day-selector">
          <label htmlFor="day-input">Current Day:</label>
          <input
            id="day-input"
            type="number"
            min="0"
            max="30"
            value={currentDay}
            onChange={(e) => updateDay(parseInt(e.target.value) || 0)}
          />
          <span className="day-label">of 30</span>
        </div>
        {currentDay > 0 && (
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(currentDay / 30) * 100}%` }} />
          </div>
        )}
      </div>

      <div className="quick-nav">
        <h2>Where Am I?</h2>
        <p>Choose the option that matches where you are right now:</p>
        <div className="nav-buttons">
          {QUICK_NAV.map(nav => (
            <button
              key={nav.id}
              className={`nav-button ${getCurrentStepId() === nav.id ? 'current' : ''}`}
              onClick={() => scrollToStep(nav.id)}
            >
              <span className="nav-icon">{nav.icon}</span>
              <span className="nav-label">{nav.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="roadmap-steps">
        {STEPS.map(step => (
          <div
            key={step.id}
            ref={el => stepRefs.current[step.id] = el}
            className={`step-card ${expandedStep === step.id ? 'expanded' : ''} ${getCurrentStepId() === step.id ? 'current-step' : ''}`}
          >
            <div className="step-header" onClick={() => toggleStep(step.id)}>
              <div className="step-title-area">
                <span className="step-icon">{step.icon}</span>
                <div className="step-titles">
                  <h3>{step.title}</h3>
                  <p className="step-subtitle">{step.subtitle}</p>
                </div>
              </div>
              <div className="step-meta">
                <span className="step-days">{step.days}</span>
                <span className="expand-icon">{expandedStep === step.id ? '−' : '+'}</span>
              </div>
            </div>

            {expandedStep === step.id && (
              <div className="step-content">
                <p className="step-summary">{step.summary}</p>

                {step.workbook && (
                  <div className="task-section">
                    <h4>📋 In the Workbook:</h4>
                    <ul className="task-list">
                      {step.workbook.map((task, i) => (
                        <li key={i}>
                          <strong>{task.section}:</strong> {task.task}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {step.journal && (
                  <div className="task-section">
                    <h4>📓 In the Journal:</h4>
                    <ul className="task-list">
                      {step.journal.map((task, i) => (
                        <li key={i}>
                          <strong>{task.section}:</strong> {task.task}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {step.important && (
                  <div className="important-note">
                    <strong>Important:</strong> {step.important}
                    {step.tips && (
                      <ul className="tip-list">
                        {step.tips.map((tip, i) => (
                          <li key={i}>{tip}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}

                {step.reminder && (
                  <div className="reminder-note">
                    💡 {step.reminder}
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App
