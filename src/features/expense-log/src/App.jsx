import { useState, useEffect } from 'react';
import './App.css';

// Configuration for each household type and vibe
const EXPENSE_CONFIGS = {
  singles: {
    irreverent: {
      title: 'The Receipts (Literal and Emotional)',
      columns: [
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'amount', label: 'The Damage', type: 'currency' },
        { key: 'description', label: 'What Happened', type: 'text' },
        { key: 'category', label: 'Category', type: 'select', options: ['Survival', 'Sanity', 'Shiny Thing'] },
        { key: 'notes', label: 'What Was Going On With Me', type: 'textarea' }
      ]
    },
    regular: {
      title: 'Expense Check-In',
      columns: [
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'amount', label: 'Amount', type: 'currency' },
        { key: 'description', label: 'Description', type: 'text' },
        { key: 'category', label: 'Category', type: 'select', options: ['Need', 'Gray Area', 'Want'] },
        { key: 'notes', label: 'Notes', type: 'textarea' }
      ]
    }
  },
  couples: {
    irreverent: {
      title: 'Who Spent What and Do We Need to Talk About It',
      columns: [
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'amount', label: 'The Damage', type: 'currency' },
        { key: 'who', label: 'Who Did It', type: 'text' },
        { key: 'discussed', label: 'Did We Discuss This?', type: 'select', options: ['Y', 'N', '"Technically"'] },
        { key: 'category', label: 'Category', type: 'select', options: ['Survival', 'Sanity', 'Shiny Thing'] },
        { key: 'notes', label: 'The Backstory', type: 'textarea' }
      ]
    },
    regular: {
      title: 'Household Expense Log',
      columns: [
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'amount', label: 'Amount', type: 'currency' },
        { key: 'description', label: 'Description', type: 'text' },
        { key: 'who', label: 'Who', type: 'text' },
        { key: 'planned', label: 'Planned?', type: 'select', options: ['Y', 'N'] },
        { key: 'category', label: 'Category', type: 'select', options: ['Need', 'Gray Area', 'Want'] },
        { key: 'notes', label: 'Notes', type: 'textarea' }
      ]
    }
  },
  families: {
    irreverent: {
      title: 'Money Left the Building',
      columns: [
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'amount', label: 'The Damage', type: 'currency' },
        { key: 'description', label: 'Who/What For', type: 'text' },
        { key: 'kidTax', label: 'Kid Tax?', type: 'select', options: ['Y', 'N'] },
        { key: 'category', label: 'Category', type: 'select', options: ['Survival', 'Sanity', 'Shiny Thing'] },
        { key: 'chaosLevel', label: 'Chaos Level', type: 'select', options: ['1', '2', '3', '4', '5'] }
      ]
    },
    regular: {
      title: 'Family Expense Tracker',
      columns: [
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'amount', label: 'Amount', type: 'currency' },
        { key: 'description', label: 'Description', type: 'text' },
        { key: 'forWhom', label: 'For Whom', type: 'text' },
        { key: 'planned', label: 'Planned?', type: 'select', options: ['Y', 'N'] },
        { key: 'category', label: 'Category', type: 'select', options: ['Need', 'Gray Area', 'Want'] },
        { key: 'notes', label: 'Notes', type: 'textarea' }
      ]
    }
  },
  petParents: {
    irreverent: {
      title: 'The Vet Will See Your Wallet Now',
      columns: [
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'amount', label: 'The Damage', type: 'currency' },
        { key: 'description', label: 'What/Who', type: 'text' },
        { key: 'category', label: 'Category', type: 'select', options: ['They Needed It', 'They Wanted It', 'I Wanted It For Them'] },
        { key: 'didTheyUse', label: 'Did They Even Use It?', type: 'select', options: ['Y', 'N', 'Pending'] },
        { key: 'guiltLevel', label: 'Guilt Level', type: 'select', options: ['1', '2', '3', '4', '5'] }
      ]
    },
    regular: {
      title: 'Pet Expense Log',
      columns: [
        { key: 'date', label: 'Date', type: 'date' },
        { key: 'amount', label: 'Amount', type: 'currency' },
        { key: 'description', label: 'Description', type: 'text' },
        { key: 'pet', label: 'Pet', type: 'text' },
        { key: 'category', label: 'Category', type: 'select', options: ['Need', 'Gray Area', 'Want'] },
        { key: 'notes', label: 'Notes', type: 'textarea' }
      ]
    }
  }
};

const HOUSEHOLD_LABELS = {
  singles: 'Singles',
  couples: 'Couples',
  families: 'Families',
  petParents: 'Pet Parents'
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('nospend_darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [householdType, setHouseholdType] = useState(() => {
    return localStorage.getItem('nospend_expense_householdType') || null;
  });

  const [vibe, setVibe] = useState(() => {
    return localStorage.getItem('nospend_expense_vibe') || null;
  });

  const [expenses, setExpenses] = useState(() => {
    const saved = localStorage.getItem('nospend_expenses');
    return saved ? JSON.parse(saved) : [];
  });

  const [editingId, setEditingId] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({});
  const [showExportModal, setShowExportModal] = useState(false);
  const [filterPeriod, setFilterPeriod] = useState('all'); // all, today, week, month

  // Apply dark mode to html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    localStorage.setItem('nospend_darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Save expenses to localStorage
  useEffect(() => {
    localStorage.setItem('nospend_expenses', JSON.stringify(expenses));
  }, [expenses]);

  // Save household type and vibe
  useEffect(() => {
    if (householdType) {
      localStorage.setItem('nospend_expense_householdType', householdType);
    }
    if (vibe) {
      localStorage.setItem('nospend_expense_vibe', vibe);
    }
  }, [householdType, vibe]);

  const config = householdType && vibe ? EXPENSE_CONFIGS[householdType][vibe] : null;

  const resetSetup = () => {
    setHouseholdType(null);
    setVibe(null);
    localStorage.removeItem('nospend_expense_householdType');
    localStorage.removeItem('nospend_expense_vibe');
  };

  const initializeFormData = () => {
    const data = { date: new Date().toISOString().split('T')[0] };
    config.columns.forEach(col => {
      if (col.type === 'currency') data[col.key] = '';
      else if (col.type === 'select') data[col.key] = col.options[0];
      else data[col.key] = '';
    });
    return data;
  };

  const handleAdd = () => {
    setFormData(initializeFormData());
    setEditingId(null);
    setShowAddForm(true);
  };

  const handleEdit = (expense) => {
    setFormData({ ...expense });
    setEditingId(expense.id);
    setShowAddForm(true);
  };

  const handleSave = () => {
    if (!formData.amount || !formData.date) {
      alert('Please fill in at least the date and amount');
      return;
    }

    if (editingId) {
      setExpenses(expenses.map(e => e.id === editingId ? { ...formData, id: editingId } : e));
    } else {
      setExpenses([...expenses, { ...formData, id: Date.now() }]);
    }
    setShowAddForm(false);
    setFormData({});
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this expense?')) {
      setExpenses(expenses.filter(e => e.id !== id));
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setFormData({});
    setEditingId(null);
  };

  // Filter expenses by period
  const getFilteredExpenses = () => {
    const now = new Date();
    const today = now.toISOString().split('T')[0];

    return expenses.filter(expense => {
      if (filterPeriod === 'all') return true;

      const expenseDate = new Date(expense.date);

      if (filterPeriod === 'today') {
        return expense.date === today;
      }

      if (filterPeriod === 'week') {
        const weekAgo = new Date(now);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return expenseDate >= weekAgo;
      }

      if (filterPeriod === 'month') {
        const monthAgo = new Date(now);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return expenseDate >= monthAgo;
      }

      return true;
    }).sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  // Calculate totals
  const calculateTotals = () => {
    const filtered = getFilteredExpenses();
    const total = filtered.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);

    const byCategory = {};
    filtered.forEach(e => {
      const cat = e.category || 'Uncategorized';
      byCategory[cat] = (byCategory[cat] || 0) + (parseFloat(e.amount) || 0);
    });

    return { total, byCategory, count: filtered.length };
  };

  const exportToCSV = () => {
    const filtered = getFilteredExpenses();
    if (filtered.length === 0) {
      alert('No expenses to export');
      return;
    }

    const headers = config.columns.map(col => col.label);
    const rows = filtered.map(expense =>
      config.columns.map(col => expense[col.key] || '')
    );

    const csv = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `expense-log-${householdType}-${vibe}-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    setShowExportModal(false);
  };

  const totals = calculateTotals();

  // Setup Screen
  if (!householdType || !vibe) {
    return (
      <div className="app">
        <header className="header">
          <div className="header-content">
            <h1 className="logo">💸 Expense Log</h1>
            <button
              className="dark-mode-toggle"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </header>

        <main className="main">
          <div className="setup-screen">
            <h2>Choose Your Expense Log</h2>
            <p className="setup-subtitle">Select the version that fits your household and vibe</p>

            <div className="setup-step">
              <h3>1. Household Type</h3>
              <div className="household-grid">
                {Object.entries(HOUSEHOLD_LABELS).map(([key, label]) => (
                  <button
                    key={key}
                    className={`household-btn ${householdType === key ? 'selected' : ''}`}
                    onClick={() => setHouseholdType(key)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {householdType && (
              <div className="setup-step">
                <h3>2. Choose Your Vibe</h3>
                <div className="vibe-grid">
                  <button
                    className={`vibe-btn ${vibe === 'regular' ? 'selected' : ''}`}
                    onClick={() => setVibe('regular')}
                  >
                    <div className="vibe-title">📊 Regular</div>
                    <div className="vibe-desc">Professional & straightforward</div>
                    <div className="vibe-preview">{EXPENSE_CONFIGS[householdType].regular.title}</div>
                  </button>
                  <button
                    className={`vibe-btn ${vibe === 'irreverent' ? 'selected' : ''}`}
                    onClick={() => setVibe('irreverent')}
                  >
                    <div className="vibe-title">😄 Irreverent</div>
                    <div className="vibe-desc">Casual & funny</div>
                    <div className="vibe-preview">{EXPENSE_CONFIGS[householdType].irreverent.title}</div>
                  </button>
                </div>
              </div>
            )}

            {householdType && vibe && (
              <div className="setup-actions">
                <button className="btn-primary" onClick={() => {}}>
                  Let's Go! 🚀
                </button>
              </div>
            )}
          </div>

          <section className="related-tools">
            <h3>Other No-Spend Tools</h3>
            <div className="tools-grid">
              <a href="../challenge-roadmap/index.html" className="tool-card">
                <span className="tool-icon">🗺️</span>
                <div>
                  <h4>Challenge Roadmap</h4>
                  <p>30-day guided journey</p>
                </div>
              </a>
              <a href="../savings-calculator/index.html" className="tool-card">
                <span className="tool-icon">💰</span>
                <div>
                  <h4>C3 Savings Calculator</h4>
                  <p>Calculate potential savings</p>
                </div>
              </a>
              <a href="../journal-30day/index.html" className="tool-card">
                <span className="tool-icon">📔</span>
                <div>
                  <h4>30-Day Journal</h4>
                  <p>Daily reflection prompts</p>
                </div>
              </a>
            </div>
          </section>
        </main>

        <footer className="footer">
          <p>Part of the No Spend Challenge ecosystem by Tweak Your Geek</p>
        </footer>
      </div>
    );
  }

  // Main Expense Tracker
  const filteredExpenses = getFilteredExpenses();

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">💸 {config.title}</h1>
          <div className="header-actions">
            <button
              className="change-setup-btn"
              onClick={resetSetup}
              title="Change household type or vibe"
            >
              ⚙️ Change Setup
            </button>
            <button
              className="dark-mode-toggle"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      <main className="main">
        {/* Analytics Section */}
        <section className="analytics-section">
          <div className="analytics-grid">
            <div className="stat-card">
              <div className="stat-label">Total Spent</div>
              <div className="stat-value">${totals.total.toFixed(2)}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Entries</div>
              <div className="stat-value">{totals.count}</div>
            </div>
            <div className="stat-card">
              <div className="stat-label">Average</div>
              <div className="stat-value">
                ${totals.count > 0 ? (totals.total / totals.count).toFixed(2) : '0.00'}
              </div>
            </div>
          </div>

          {Object.keys(totals.byCategory).length > 0 && (
            <div className="category-breakdown">
              <h3>By Category</h3>
              <div className="category-bars">
                {Object.entries(totals.byCategory).map(([cat, amount]) => (
                  <div key={cat} className="category-bar-item">
                    <div className="category-bar-label">
                      <span>{cat}</span>
                      <span>${amount.toFixed(2)}</span>
                    </div>
                    <div className="category-bar-bg">
                      <div
                        className="category-bar-fill"
                        style={{ width: `${(amount / totals.total) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Action Buttons */}
        <section className="action-bar">
          <button className="btn-primary" onClick={handleAdd}>
            ➕ Add Expense
          </button>
          <div className="filter-controls">
            <select
              value={filterPeriod}
              onChange={(e) => setFilterPeriod(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">Last 7 Days</option>
              <option value="month">Last 30 Days</option>
            </select>
            <button
              className="btn-secondary"
              onClick={() => setShowExportModal(true)}
              disabled={filteredExpenses.length === 0}
            >
              📥 Export CSV
            </button>
          </div>
        </section>

        {/* Expenses List */}
        <section className="expenses-section">
          {filteredExpenses.length === 0 ? (
            <div className="empty-state">
              <p>No expenses yet. Click "Add Expense" to get started!</p>
            </div>
          ) : (
            <div className="expenses-list">
              {filteredExpenses.map(expense => (
                <div key={expense.id} className="expense-card">
                  <div className="expense-header">
                    <div className="expense-date">{new Date(expense.date).toLocaleDateString()}</div>
                    <div className="expense-amount">${parseFloat(expense.amount || 0).toFixed(2)}</div>
                  </div>
                  <div className="expense-details">
                    {config.columns.slice(2).map(col => (
                      expense[col.key] && (
                        <div key={col.key} className="expense-detail">
                          <strong>{col.label}:</strong> {expense[col.key]}
                        </div>
                      )
                    ))}
                  </div>
                  <div className="expense-actions">
                    <button className="btn-edit" onClick={() => handleEdit(expense)}>✏️ Edit</button>
                    <button className="btn-delete" onClick={() => handleDelete(expense.id)}>🗑️ Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Add/Edit Form Modal */}
        {showAddForm && (
          <div className="modal-overlay" onClick={handleCancel}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>{editingId ? 'Edit Expense' : 'Add Expense'}</h3>
                <button className="close-btn" onClick={handleCancel}>✕</button>
              </div>
              <div className="modal-body">
                <div className="form-grid">
                  {config.columns.map(col => (
                    <div key={col.key} className="form-group">
                      <label>{col.label}</label>
                      {col.type === 'textarea' ? (
                        <textarea
                          value={formData[col.key] || ''}
                          onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })}
                          rows={3}
                        />
                      ) : col.type === 'select' ? (
                        <select
                          value={formData[col.key] || col.options[0]}
                          onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })}
                        >
                          {col.options.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={col.type === 'currency' ? 'number' : col.type}
                          step={col.type === 'currency' ? '0.01' : undefined}
                          value={formData[col.key] || ''}
                          onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={handleCancel}>Cancel</button>
                <button className="btn-primary" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        )}

        {/* Export Modal */}
        {showExportModal && (
          <div className="modal-overlay" onClick={() => setShowExportModal(false)}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3>Export to CSV</h3>
                <button className="close-btn" onClick={() => setShowExportModal(false)}>✕</button>
              </div>
              <div className="modal-body">
                <p>Export {filteredExpenses.length} expense{filteredExpenses.length !== 1 ? 's' : ''} to CSV?</p>
                <p className="export-note">
                  The CSV file will include all expenses in the current filter period ({filterPeriod}).
                </p>
              </div>
              <div className="modal-footer">
                <button className="btn-secondary" onClick={() => setShowExportModal(false)}>Cancel</button>
                <button className="btn-primary" onClick={exportToCSV}>Download CSV</button>
              </div>
            </div>
          </div>
        )}

        {/* Related Tools */}
        <section className="related-tools">
          <h3>Other No-Spend Tools</h3>
          <div className="tools-grid">
            <a href="../challenge-roadmap/index.html" className="tool-card">
              <span className="tool-icon">🗺️</span>
              <div>
                <h4>Challenge Roadmap</h4>
                <p>30-day guided journey</p>
              </div>
            </a>
            <a href="../savings-calculator/index.html" className="tool-card">
              <span className="tool-icon">💰</span>
              <div>
                <h4>C3 Savings Calculator</h4>
                <p>Calculate potential savings</p>
              </div>
            </a>
            <a href="../pattern-quiz/index.html" className="tool-card">
              <span className="tool-icon">🎯</span>
              <div>
                <h4>Pattern Quiz</h4>
                <p>Identify spending patterns</p>
              </div>
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Part of the No Spend Challenge ecosystem by Tweak Your Geek</p>
      </footer>
    </div>
  );
}

export default App;
