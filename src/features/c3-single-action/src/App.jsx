import React, { useState, useEffect } from 'react';

// ============================================
// C3 SINGLE ACTION TOOL
// Pick ONE: Cut, Cancel, or Combine
// ============================================

const App = () => {
  const [currentView, setCurrentView] = useState('select'); // select, cut, cancel, combine, celebration
  const [formData, setFormData] = useState({
    itemName: '',
    currentCost: '',
    newCost: '',
    frequency: 'monthly',
    lastUsed: '',
    actionStep: '',
    actionDate: '',
    combineWith: '',
    splitWith: '',
  });
  const [savings, setSavings] = useState({ monthly: 0, annual: 0 });
  const [completedAction, setCompletedAction] = useState(null);
  const [savedActions, setSavedActions] = useState([]);

  // Load saved actions from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('c3-completed-actions');
    if (saved) {
      setSavedActions(JSON.parse(saved));
    }
  }, []);

  // Calculate savings whenever form data changes
  useEffect(() => {
    const current = parseFloat(formData.currentCost) || 0;
    const newCost = parseFloat(formData.newCost) || 0;
    const monthlySavings = current - newCost;

    let annualMultiplier = 12;
    if (formData.frequency === 'weekly') annualMultiplier = 52;
    if (formData.frequency === 'yearly') annualMultiplier = 1;

    setSavings({
      monthly: formData.frequency === 'yearly' ? monthlySavings / 12 : monthlySavings,
      annual: formData.frequency === 'yearly' ? monthlySavings : monthlySavings * annualMultiplier,
    });
  }, [formData.currentCost, formData.newCost, formData.frequency]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleComplete = () => {
    const action = {
      type: currentView,
      itemName: formData.itemName,
      savings: savings,
      date: new Date().toISOString(),
    };
    setCompletedAction(action);

    const newSavedActions = [...savedActions, action];
    setSavedActions(newSavedActions);
    localStorage.setItem('c3-completed-actions', JSON.stringify(newSavedActions));

    setCurrentView('celebration');
  };

  const resetForm = () => {
    setFormData({
      itemName: '',
      currentCost: '',
      newCost: '',
      frequency: 'monthly',
      lastUsed: '',
      actionStep: '',
      actionDate: '',
      combineWith: '',
      splitWith: '',
    });
    setSavings({ monthly: 0, annual: 0 });
    setCompletedAction(null);
    setCurrentView('select');
  };

  const getTotalSavings = () => {
    return savedActions.reduce((total, action) => total + action.savings.annual, 0);
  };

  // ============================================
  // PATH SELECTOR VIEW
  // ============================================
  const PathSelector = () => (
    <div className="path-selector">
      <div className="header">
        <h1>One Action. One Win.</h1>
        <p className="subtitle">
          You tracked your spending. You saw the data.<br />
          Now pick <strong>ONE</strong> thing to change.
        </p>
      </div>

      <div className="paths">
        <button
          className="path-card cut"
          onClick={() => setCurrentView('cut')}
        >
          <div className="path-icon">✂️</div>
          <h2>CUT</h2>
          <p>Reduce a cost</p>
          <span className="path-description">
            Downgrade, find cheaper, do less often
          </span>
        </button>

        <button
          className="path-card cancel"
          onClick={() => setCurrentView('cancel')}
        >
          <div className="path-icon">🚫</div>
          <h2>CANCEL</h2>
          <p>Remove entirely</p>
          <span className="path-description">
            That thing you forgot you're paying for
          </span>
        </button>

        <button
          className="path-card combine"
          onClick={() => setCurrentView('combine')}
        >
          <div className="path-icon">🔗</div>
          <h2>COMBINE</h2>
          <p>Merge services</p>
          <span className="path-description">
            Family plans, bundles, shared accounts
          </span>
        </button>
      </div>

      {savedActions.length > 0 && (
        <div className="previous-wins">
          <h3>Your Wins So Far</h3>
          <p className="total-savings">
            Total Annual Savings: <strong>${getTotalSavings().toFixed(2)}</strong>
          </p>
          <div className="wins-list">
            {savedActions.map((action, index) => (
              <div key={index} className="win-item">
                <span className="win-type">{action.type.toUpperCase()}</span>
                <span className="win-name">{action.itemName}</span>
                <span className="win-amount">${action.savings.annual.toFixed(2)}/yr</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // ============================================
  // CUT PATH
  // ============================================
  const CutPath = () => (
    <div className="action-path cut-path">
      <button className="back-button" onClick={resetForm}>← Back</button>

      <div className="path-header">
        <span className="path-icon">✂️</span>
        <h1>CUT</h1>
        <p>Reduce something you're keeping</p>
      </div>

      <div className="form-section">
        <div className="form-group">
          <label>What are you cutting back on?</label>
          <input
            type="text"
            placeholder="e.g., Spotify Premium, gym membership, weekly takeout"
            value={formData.itemName}
            onChange={(e) => handleInputChange('itemName', e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Current cost</label>
            <div className="input-with-prefix">
              <span>$</span>
              <input
                type="number"
                placeholder="0.00"
                value={formData.currentCost}
                onChange={(e) => handleInputChange('currentCost', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>How often?</label>
            <select
              value={formData.frequency}
              onChange={(e) => handleInputChange('frequency', e.target.value)}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>New cost after cutting back</label>
          <div className="input-with-prefix">
            <span>$</span>
            <input
              type="number"
              placeholder="0.00"
              value={formData.newCost}
              onChange={(e) => handleInputChange('newCost', e.target.value)}
            />
          </div>
          <span className="hint">
            Downgrading to free tier? Enter 0. Doing it less often? Calculate the new monthly amount.
          </span>
        </div>

        {(formData.currentCost && formData.newCost) && (
          <div className="savings-display">
            <div className="savings-card">
              <span className="savings-label">You'll save</span>
              <span className="savings-amount">${savings.monthly.toFixed(2)}</span>
              <span className="savings-period">per month</span>
            </div>
            <div className="savings-card annual">
              <span className="savings-label">That's</span>
              <span className="savings-amount">${savings.annual.toFixed(2)}</span>
              <span className="savings-period">per year</span>
            </div>
          </div>
        )}

        <div className="form-group">
          <label>What's the ONE action you need to take?</label>
          <input
            type="text"
            placeholder="e.g., Downgrade to basic plan, switch to monthly instead of weekly"
            value={formData.actionStep}
            onChange={(e) => handleInputChange('actionStep', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>When will you do it?</label>
          <input
            type="date"
            value={formData.actionDate}
            onChange={(e) => handleInputChange('actionDate', e.target.value)}
          />
        </div>

        <button
          className="complete-button"
          onClick={handleComplete}
          disabled={!formData.itemName || !formData.currentCost || !formData.actionStep}
        >
          I Did It! 🎉
        </button>
      </div>

      <div className="examples">
        <h3>Common CUT Examples</h3>
        <ul>
          <li>Premium Spotify → Free tier</li>
          <li>Unlimited data → 5GB plan</li>
          <li>Weekly takeout → Twice a month</li>
          <li>Premium gym → Basic membership</li>
          <li>Daily coffee out → 3x per week</li>
        </ul>
      </div>
    </div>
  );

  // ============================================
  // CANCEL PATH
  // ============================================
  const CancelPath = () => (
    <div className="action-path cancel-path">
      <button className="back-button" onClick={resetForm}>← Back</button>

      <div className="path-header">
        <span className="path-icon">🚫</span>
        <h1>CANCEL</h1>
        <p>Remove something entirely</p>
      </div>

      <div className="form-section">
        <div className="form-group">
          <label>What are you canceling?</label>
          <input
            type="text"
            placeholder="e.g., Netflix, gym membership, magazine subscription"
            value={formData.itemName}
            onChange={(e) => handleInputChange('itemName', e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Current cost</label>
            <div className="input-with-prefix">
              <span>$</span>
              <input
                type="number"
                placeholder="0.00"
                value={formData.currentCost}
                onChange={(e) => {
                  handleInputChange('currentCost', e.target.value);
                  handleInputChange('newCost', '0');
                }}
              />
            </div>
          </div>

          <div className="form-group">
            <label>How often?</label>
            <select
              value={formData.frequency}
              onChange={(e) => handleInputChange('frequency', e.target.value)}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>When did you last actually use it?</label>
          <select
            value={formData.lastUsed}
            onChange={(e) => handleInputChange('lastUsed', e.target.value)}
          >
            <option value="">Select...</option>
            <option value="today">Today</option>
            <option value="this-week">This week</option>
            <option value="this-month">This month</option>
            <option value="months-ago">A few months ago</option>
            <option value="cant-remember">I can't remember 😬</option>
          </select>
          {formData.lastUsed === 'cant-remember' && (
            <span className="hint reality-check">
              If you can't remember when you last used it... you probably don't need it.
            </span>
          )}
        </div>

        {formData.currentCost && (
          <div className="savings-display">
            <div className="savings-card">
              <span className="savings-label">You'll save</span>
              <span className="savings-amount">${savings.monthly.toFixed(2)}</span>
              <span className="savings-period">per month</span>
            </div>
            <div className="savings-card annual">
              <span className="savings-label">That's</span>
              <span className="savings-amount">${savings.annual.toFixed(2)}</span>
              <span className="savings-period">per year</span>
            </div>
          </div>
        )}

        <div className="cancel-script">
          <h3>The Cancel Script</h3>
          <p className="script-text">
            "Hi, I'd like to cancel my subscription. No, I don't want to pause.
            No, I don't want a discount. I just want to cancel. Thank you."
          </p>
          <span className="hint">Copy this if you need to call. Stay strong.</span>
        </div>

        <div className="form-group">
          <label>What's your action step?</label>
          <input
            type="text"
            placeholder="e.g., Go to account settings and click Cancel"
            value={formData.actionStep}
            onChange={(e) => handleInputChange('actionStep', e.target.value)}
          />
        </div>

        <button
          className="complete-button"
          onClick={handleComplete}
          disabled={!formData.itemName || !formData.currentCost || !formData.actionStep}
        >
          I Canceled It! 🎉
        </button>
      </div>

      <div className="examples">
        <h3>Common CANCEL Targets</h3>
        <ul>
          <li>Streaming service #3, #4, #5...</li>
          <li>Apps with sneaky subscriptions</li>
          <li>Gym you haven't visited in months</li>
          <li>Magazines/newspapers you don't read</li>
          <li>Software you replaced with something else</li>
          <li>Free trials that converted to paid</li>
        </ul>
      </div>
    </div>
  );

  // ============================================
  // COMBINE PATH
  // ============================================
  const CombinePath = () => (
    <div className="action-path combine-path">
      <button className="back-button" onClick={resetForm}>← Back</button>

      <div className="path-header">
        <span className="path-icon">🔗</span>
        <h1>COMBINE</h1>
        <p>Merge services to reduce total cost</p>
      </div>

      <div className="form-section">
        <div className="form-group">
          <label>What service are you combining?</label>
          <input
            type="text"
            placeholder="e.g., Spotify, Netflix, phone plan"
            value={formData.itemName}
            onChange={(e) => handleInputChange('itemName', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>What are you combining it with?</label>
          <input
            type="text"
            placeholder="e.g., Family plan, bundle deal, friend's account"
            value={formData.combineWith}
            onChange={(e) => handleInputChange('combineWith', e.target.value)}
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Your current cost</label>
            <div className="input-with-prefix">
              <span>$</span>
              <input
                type="number"
                placeholder="0.00"
                value={formData.currentCost}
                onChange={(e) => handleInputChange('currentCost', e.target.value)}
              />
            </div>
          </div>

          <div className="form-group">
            <label>How often?</label>
            <select
              value={formData.frequency}
              onChange={(e) => handleInputChange('frequency', e.target.value)}
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Your new cost (your share of the combined plan)</label>
          <div className="input-with-prefix">
            <span>$</span>
            <input
              type="number"
              placeholder="0.00"
              value={formData.newCost}
              onChange={(e) => handleInputChange('newCost', e.target.value)}
            />
          </div>
          <span className="hint">
            Family plan of $16 split 4 ways = $4 each
          </span>
        </div>

        {(formData.currentCost && formData.newCost) && (
          <div className="savings-display">
            <div className="savings-card">
              <span className="savings-label">You'll save</span>
              <span className="savings-amount">${savings.monthly.toFixed(2)}</span>
              <span className="savings-period">per month</span>
            </div>
            <div className="savings-card annual">
              <span className="savings-label">That's</span>
              <span className="savings-amount">${savings.annual.toFixed(2)}</span>
              <span className="savings-period">per year</span>
            </div>
          </div>
        )}

        <div className="form-group">
          <label>Who do you need to coordinate with?</label>
          <input
            type="text"
            placeholder="e.g., Partner, roommates, family group chat"
            value={formData.splitWith}
            onChange={(e) => handleInputChange('splitWith', e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>What's your action step?</label>
          <input
            type="text"
            placeholder="e.g., Text Sarah about splitting the family plan"
            value={formData.actionStep}
            onChange={(e) => handleInputChange('actionStep', e.target.value)}
          />
        </div>

        <button
          className="complete-button"
          onClick={handleComplete}
          disabled={!formData.itemName || !formData.currentCost || !formData.actionStep}
        >
          We Combined It! 🎉
        </button>
      </div>

      <div className="examples">
        <h3>Common COMBINE Opportunities</h3>
        <ul>
          <li>Individual streaming → Family plan split</li>
          <li>Separate phone plans → Family plan</li>
          <li>Multiple cloud storage → One service</li>
          <li>Internet + cable → Bundle discount</li>
          <li>Individual Costco → Share with neighbor</li>
        </ul>
      </div>
    </div>
  );

  // ============================================
  // CELEBRATION VIEW
  // ============================================
  const Celebration = () => (
    <div className="celebration">
      <div className="confetti">🎉</div>

      <h1>You Did It!</h1>

      <div className="celebration-summary">
        <p>
          You <strong>{completedAction?.type.toUpperCase()}ed</strong> your{' '}
          <strong>{completedAction?.itemName}</strong>
        </p>

        <div className="savings-celebration">
          <div className="big-number">
            ${completedAction?.savings.monthly.toFixed(2)}
            <span>/month</span>
          </div>
          <div className="annual-number">
            ${completedAction?.savings.annual.toFixed(2)} per year
          </div>
        </div>

        {savedActions.length > 1 && (
          <div className="total-summary">
            <p>Total from all your C3 actions:</p>
            <div className="total-number">
              ${getTotalSavings().toFixed(2)}/year
            </div>
          </div>
        )}
      </div>

      <div className="next-steps">
        <h2>What's Next?</h2>

        <div className="next-options">
          <button
            className="next-button primary"
            onClick={resetForm}
          >
            Do Another C3 Action
          </button>

          <a
            href="#community"
            className="next-button secondary"
          >
            Share Your Win
          </a>

          <a
            href="#challenge"
            className="next-button tertiary"
          >
            Try the 30-Day Challenge
          </a>

          <button
            className="next-button quiet"
            onClick={() => {
              resetForm();
              alert("Nice work! Your savings have been recorded. Come back anytime.");
            }}
          >
            I'm Good For Now
          </button>
        </div>
      </div>

      <p className="encouragement">
        Most people never take action. You did. That matters.
      </p>
    </div>
  );

  // ============================================
  // RENDER
  // ============================================
  return (
    <div className="c3-app">
      {currentView === 'select' && <PathSelector />}
      {currentView === 'cut' && <CutPath />}
      {currentView === 'cancel' && <CancelPath />}
      {currentView === 'combine' && <CombinePath />}
      {currentView === 'celebration' && <Celebration />}

      <footer className="app-footer">
        <p>Part of the No Spend Challenge ecosystem</p>
      </footer>
    </div>
  );
};

export default App;
