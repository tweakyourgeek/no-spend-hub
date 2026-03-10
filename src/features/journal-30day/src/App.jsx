import { useState, useEffect } from 'react'
import './App.css'
import { DEFAULT_PROMPTS } from './prompts'

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [entries, setEntries] = useState({});
  const [prompts, setPrompts] = useState(DEFAULT_PROMPTS);
  const [editMode, setEditMode] = useState(false);
  const [editingPrompt, setEditingPrompt] = useState(null);
  const [showExport, setShowExport] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('nospend_darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark-mode');
    }

    const savedEntries = localStorage.getItem('nospend_journal_entries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }

    const savedPrompts = localStorage.getItem('nospend_journal_prompts');
    if (savedPrompts) {
      setPrompts(JSON.parse(savedPrompts));
    }

    const savedDay = localStorage.getItem('nospend_journal_currentDay');
    if (savedDay) {
      setCurrentDay(parseInt(savedDay));
    }
  }, []);

  // Save entries to localStorage
  useEffect(() => {
    if (Object.keys(entries).length > 0) {
      localStorage.setItem('nospend_journal_entries', JSON.stringify(entries));
    }
  }, [entries]);

  // Save prompts to localStorage
  useEffect(() => {
    localStorage.setItem('nospend_journal_prompts', JSON.stringify(prompts));
  }, [prompts]);

  // Save current day
  useEffect(() => {
    localStorage.setItem('nospend_journal_currentDay', currentDay);
  }, [currentDay]);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('nospend_darkMode', newMode);
    document.documentElement.classList.toggle('dark-mode');
  };

  // Update entry
  const updateEntry = (day, content) => {
    setEntries({ ...entries, [day]: content });
  };

  // Edit prompt
  const savePromptEdit = () => {
    if (editingPrompt) {
      setPrompts({
        ...prompts,
        [editingPrompt.day]: editingPrompt.data
      });
      setEditingPrompt(null);
    }
  };

  // Reset prompts to default
  const resetToDefaults = () => {
    if (window.confirm('Reset all prompts to defaults? Your journal entries will NOT be affected.')) {
      setPrompts(DEFAULT_PROMPTS);
      localStorage.setItem('nospend_journal_prompts', JSON.stringify(DEFAULT_PROMPTS));
    }
  };

  // Export to markdown
  const exportToMarkdown = () => {
    let markdown = '# 30-Day No-Spend Challenge Journal\n\n';
    markdown += `Exported: ${new Date().toLocaleDateString()}\n\n`;

    for (let day = 1; day <= 30; day++) {
      const prompt = prompts[day];
      const entry = entries[day] || '';

      markdown += `## Day ${day}: ${prompt.title}\n\n`;
      markdown += `**Week ${prompt.week}**: ${prompt.weekTheme}\n\n`;
      markdown += `### Prompt\n${prompt.question}\n\n`;
      if (entry) {
        markdown += `### My Response\n${entry}\n\n`;
      }
      markdown += '---\n\n';
    }

    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nospend-journal-${new Date().toISOString().split('T')[0]}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const currentPrompt = prompts[currentDay];
  const completedDays = Object.keys(entries).filter(day => entries[day]?.trim()).length;
  const progress = (completedDays / 30) * 100;

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="logo">30-Day Journal</h1>
          <div className="header-actions">
            <button
              className={`edit-mode-btn ${editMode ? 'active' : ''}`}
              onClick={() => setEditMode(!editMode)}
              title="Toggle edit mode for prompts"
            >
              {editMode ? '✓ Done Editing' : '✏️ Edit Prompts'}
            </button>
            <button className="dark-mode-toggle" onClick={toggleDarkMode}>
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      <main className="main">
        {/* Progress Bar */}
        <div className="progress-section">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <p className="progress-text">
            {completedDays} of 30 days completed ({Math.round(progress)}%)
          </p>
        </div>

        {/* Day Navigation */}
        <div className="day-nav">
          <button
            className="nav-btn"
            onClick={() => setCurrentDay(Math.max(1, currentDay - 1))}
            disabled={currentDay === 1}
          >
            ← Previous
          </button>
          <div className="day-selector">
            {[1, 2, 3, 4].map(week => (
              <div key={week} className="week-group">
                <span className="week-label">Week {week}</span>
                <div className="day-dots">
                  {Array.from({ length: 7 }, (_, i) => {
                    const day = (week - 1) * 7 + i + 1;
                    if (day > 30) return null;
                    return (
                      <button
                        key={day}
                        className={`day-dot ${currentDay === day ? 'active' : ''} ${entries[day]?.trim() ? 'completed' : ''}`}
                        onClick={() => setCurrentDay(day)}
                        title={`Day ${day}`}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
            <div className="week-group">
              <span className="week-label">Week 4</span>
              <div className="day-dots">
                {[29, 30].map(day => (
                  <button
                    key={day}
                    className={`day-dot ${currentDay === day ? 'active' : ''} ${entries[day]?.trim() ? 'completed' : ''}`}
                    onClick={() => setCurrentDay(day)}
                    title={`Day ${day}`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <button
            className="nav-btn"
            onClick={() => setCurrentDay(Math.min(30, currentDay + 1))}
            disabled={currentDay === 30}
          >
            Next →
          </button>
        </div>

        {/* Journal Entry */}
        <div className="journal-entry">
          <div className="prompt-header">
            <div>
              <h2 className="day-title">Day {currentDay}: {currentPrompt.title}</h2>
              <p className="week-info">
                Week {currentPrompt.week}: {currentPrompt.weekTheme}
              </p>
            </div>
            {editMode && (
              <button
                className="edit-prompt-btn"
                onClick={() => setEditingPrompt({ day: currentDay, data: { ...currentPrompt } })}
              >
                ✏️ Edit This Prompt
              </button>
            )}
          </div>

          <div className="prompt-content">
            <p className="prompt-question">{currentPrompt.question}</p>
          </div>

          <div className="writing-area">
            <label htmlFor="entry">Your Response:</label>
            <textarea
              id="entry"
              className="entry-textarea"
              value={entries[currentDay] || ''}
              onChange={(e) => updateEntry(currentDay, e.target.value)}
              placeholder="Start writing..."
              rows={15}
            />
            <p className="auto-save-note">✓ Auto-saved</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="action-buttons">
          <button className="action-btn secondary" onClick={() => setShowExport(true)}>
            📥 Export Journal
          </button>
          {editMode && (
            <button className="action-btn warning" onClick={resetToDefaults}>
              🔄 Reset All Prompts to Defaults
            </button>
          )}
        </div>

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
            <a href="https://tweakyourgeek.github.io/nospend-apps/comfort-menu/" className="tool-card" target="_blank" rel="noopener noreferrer">
              <span className="tool-icon">🍵</span>
              <div>
                <h4>Comfort Menu</h4>
                <p>Non-spending coping strategies</p>
              </div>
            </a>
            <a href="https://tweakyourgeek.github.io/nospend-apps/pattern-quiz/" className="tool-card" target="_blank" rel="noopener noreferrer">
              <span className="tool-icon">🎯</span>
              <div>
                <h4>Pattern Quiz</h4>
                <p>Discover your spending patterns</p>
              </div>
            </a>
          </div>
        </section>
      </main>

      {/* Edit Prompt Modal */}
      {editingPrompt && (
        <div className="modal-overlay" onClick={() => setEditingPrompt(null)}>
          <div className="modal large-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Edit Day {editingPrompt.day} Prompt</h3>
              <button className="close-btn" onClick={() => setEditingPrompt(null)}>✕</button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingPrompt.data.title}
                  onChange={(e) => setEditingPrompt({
                    ...editingPrompt,
                    data: { ...editingPrompt.data, title: e.target.value }
                  })}
                />
              </div>

              <div className="form-group">
                <label>Week Theme</label>
                <input
                  type="text"
                  className="form-input"
                  value={editingPrompt.data.weekTheme}
                  onChange={(e) => setEditingPrompt({
                    ...editingPrompt,
                    data: { ...editingPrompt.data, weekTheme: e.target.value }
                  })}
                />
              </div>

              <div className="form-group">
                <label>Prompt Question</label>
                <textarea
                  className="form-textarea"
                  rows={8}
                  value={editingPrompt.data.question}
                  onChange={(e) => setEditingPrompt({
                    ...editingPrompt,
                    data: { ...editingPrompt.data, question: e.target.value }
                  })}
                />
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setEditingPrompt(null)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={savePromptEdit}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExport && (
        <div className="modal-overlay" onClick={() => setShowExport(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Export Your Journal</h3>
              <button className="close-btn" onClick={() => setShowExport(false)}>✕</button>
            </div>

            <div className="modal-body">
              <p>Export your journal entries and prompts to a markdown file.</p>
              <p className="export-note">
                • Includes all 30 days (entries and prompts)<br/>
                • Compatible with note-taking apps<br/>
                • Easy to print or archive
              </p>
            </div>

            <div className="modal-footer">
              <button className="btn-secondary" onClick={() => setShowExport(false)}>
                Cancel
              </button>
              <button className="btn-primary" onClick={() => {
                exportToMarkdown();
                setShowExport(false);
              }}>
                Download Markdown
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
