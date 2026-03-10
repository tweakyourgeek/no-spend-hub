import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Import brand utilities (inline for now - could import from shared later)
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// C3 Framework - Core philosophy
const C3 = {
  CUT: {
    icon: '✂️',
    label: 'CUT',
    description: 'Reduce frequency',
    color: '#B375A0',
    message: "Cutting doesn't mean deprivation!",
    explanation: "Cut means doing it less often, not giving it up completely. Instead of daily, maybe weekly. Instead of weekly, maybe monthly. You decide what feels right."
  },
  CANCEL: {
    icon: '❌',
    label: 'CANCEL',
    description: 'Stop paying entirely',
    color: '#3B3B58',
    message: "Canceling unused services is empowering",
    explanation: "Cancel means stopping something you're paying for that you don't really use or need anymore. No guilt, just freedom from recurring charges."
  },
  COMBINE: {
    icon: '🔗',
    label: 'COMBINE',
    description: 'Consolidate & share costs',
    color: '#B375A0',
    message: "Sharing costs is smart living",
    explanation: "Combine means splitting expenses with family, friends, or roommates. Same service, lower cost per person. Community savings at its best."
  },
};

// Tips for each preset
const presetTips = {
  cut: {
    rideshare: "Try carpooling with coworkers or using public transit a few days a week. Many cities offer transit passes that save money on frequent trips.",
    streaming: "Rotate your streaming services! Watch one service for a few months, then switch. You can always come back when new shows premiere.",
    shopping: "Try the 30-day rule: Wait 30 days before buying non-essentials. You'll often find you don't want it anymore, or discover a better deal.",
    takeout: "Meal prep on Sundays can save you from weeknight takeout temptation. Make extra portions and freeze them for easy meals later.",
  },
  cancel: {
    streaming: "Check which streaming services you actually used last month. Most people only watch 1-2 regularly but pay for 3-4.",
    gym: "Many gyms won't let you cancel online. Call during business hours or send a certified letter. Some credit cards let you block recurring charges.",
    magazine: "Most magazine subscriptions auto-renew. Check your email for renewal notices and cancel before they charge you again.",
    app: "Review your phone's subscription settings monthly. We often forget about $3-10/month apps that add up to hundreds per year.",
  },
  combine: {
    streaming: "Streaming family plans (Netflix, Spotify, YouTube Premium) split between 3-6 people can save everyone 50-80% per month.",
    storage: "Cloud storage family plans give everyone more space for less. Google One and iCloud family plans are much cheaper per person.",
    wholesale: "Warehouse clubs like Costco or Sam's Club let you share a membership. Split the cost and shop together to save on bulk items.",
    internet: "If you live in an apartment or duplex, consider splitting high-speed internet with a neighbor. Many plans are fast enough for multiple households.",
  },
};

function App() {
  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('nospend_darkMode');
    return saved === 'true';
  });

  // Apply dark mode class to body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    localStorage.setItem('nospend_darkMode', darkMode);
  }, [darkMode]);

  // Modal state
  const [showC3Modal, setShowC3Modal] = useState(false);
  const [showDecisionQuiz, setShowDecisionQuiz] = useState(false);

  // Tip display state
  const [activeTip, setActiveTip] = useState(null);

  // Decision quiz state
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({
    usage: '',
    enjoyment: '',
    sharing: '',
  });

  // CUT scenarios (reduce frequency)
  const [cutAmount, setCutAmount] = useState(5);
  const [cutFrequency, setCutFrequency] = useState(7); // times per week
  const [cutPreset, setCutPreset] = useState('');
  const [showCutCustom, setShowCutCustom] = useState(false);
  const [cutCustomLabel, setCutCustomLabel] = useState('');

  // CANCEL scenarios (stop paying)
  const [cancelAmount, setCancelAmount] = useState(15);
  const [cancelPeriod, setCancelPeriod] = useState('month'); // month or year
  const [cancelPreset, setCancelPreset] = useState('');
  const [showCancelCustom, setShowCancelCustom] = useState(false);
  const [cancelCustomLabel, setCancelCustomLabel] = useState('');

  // COMBINE scenarios (share costs)
  const [combineOriginal, setCombineOriginal] = useState(50);
  const [combineSplit, setCombineSplit] = useState(2); // number of people sharing
  const [combinePreset, setCombinePreset] = useState('');
  const [showCombineCustom, setShowCombineCustom] = useState(false);
  const [combineCustomLabel, setCombineCustomLabel] = useState('');

  // Presets for each C3 category (diverse examples, not food-focused)
  const cutPresets = {
    rideshare: { amount: 15, frequency: 5, label: '🚗 Rideshare/Uber' },
    streaming: { amount: 8, frequency: 4, label: '📺 Movie Rentals' },
    shopping: { amount: 25, frequency: 3, label: '🛍️ Online Shopping' },
    takeout: { amount: 30, frequency: 2, label: '🍕 Takeout Dinner' },
  };

  const cancelPresets = {
    streaming: { amount: 15, period: 'month', label: '📺 Streaming Service' },
    gym: { amount: 50, period: 'month', label: '💪 Gym Membership' },
    magazine: { amount: 120, period: 'year', label: '📰 Magazine Subscription' },
    app: { amount: 10, period: 'month', label: '📱 Premium App' },
  };

  const combinePresets = {
    streaming: { original: 45, split: 3, label: '📺 Family Streaming Plan' },
    storage: { original: 20, split: 4, label: '☁️ Cloud Storage Family' },
    wholesale: { original: 120, split: 2, label: '🛒 Warehouse Club Membership' },
    internet: { original: 80, split: 2, label: '📡 High-Speed Internet' },
  };

  // Apply presets and show tips
  const applyCutPreset = (key) => {
    const preset = cutPresets[key];
    setCutAmount(preset.amount);
    setCutFrequency(preset.frequency);
    setCutPreset(key);
    setShowCutCustom(false);
    setActiveTip({ category: 'cut', key });
  };

  const applyCancelPreset = (key) => {
    const preset = cancelPresets[key];
    setCancelAmount(preset.amount);
    setCancelPeriod(preset.period);
    setCancelPreset(key);
    setShowCancelCustom(false);
    setActiveTip({ category: 'cancel', key });
  };

  const applyCombinePreset = (key) => {
    const preset = combinePresets[key];
    setCombineOriginal(preset.original);
    setCombineSplit(preset.split);
    setCombinePreset(key);
    setShowCombineCustom(false);
    setActiveTip({ category: 'combine', key });
  };

  // Apply custom expense
  const applyCustomCut = () => {
    setCutPreset('custom');
    setActiveTip(null);
  };

  const applyCustomCancel = () => {
    setCancelPreset('custom');
    setActiveTip(null);
  };

  const applyCustomCombine = () => {
    setCombinePreset('custom');
    setActiveTip(null);
  };

  // Calculate savings
  const calculateCutSavings = () => {
    const weekly = cutAmount * cutFrequency;
    const monthly = (weekly * 52) / 12;
    const yearly = weekly * 52;
    return { weekly, monthly, yearly };
  };

  const calculateCancelSavings = () => {
    const monthly = cancelPeriod === 'month' ? cancelAmount : cancelAmount / 12;
    const yearly = cancelPeriod === 'month' ? cancelAmount * 12 : cancelAmount;
    return { monthly, yearly };
  };

  const calculateCombineSavings = () => {
    const yourShare = combineOriginal / combineSplit;
    const savings = combineOriginal - yourShare;
    const monthly = savings;
    const yearly = savings * 12;
    return { yourShare, savings, monthly, yearly };
  };

  const cutResults = calculateCutSavings();
  const cancelResults = calculateCancelSavings();
  const combineResults = calculateCombineSavings();

  // Total potential savings
  const totalMonthlySavings = cutResults.monthly + cancelResults.monthly + combineResults.monthly;
  const totalYearlySavings = cutResults.yearly + cancelResults.yearly + combineResults.yearly;

  // Generate chart data
  const generateChartData = () => {
    const data = [];
    for (let month = 0; month <= 12; month++) {
      data.push({
        month: month === 0 ? 'Start' : `Month ${month}`,
        cut: cutResults.monthly * month,
        cancel: cancelResults.monthly * month,
        combine: combineResults.monthly * month,
      });
    }
    return data;
  };

  const chartData = generateChartData();

  // Scroll to local storage explanation
  const scrollToStorageInfo = () => {
    document.getElementById('storage-info')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Decision quiz logic
  const getRecommendation = () => {
    const { usage, enjoyment, sharing } = quizAnswers;

    // CANCEL: Don't use it or don't enjoy it
    if (usage === 'rarely' || enjoyment === 'no') {
      return 'CANCEL';
    }

    // COMBINE: Use it regularly and could share
    if (sharing === 'yes' && usage !== 'rarely') {
      return 'COMBINE';
    }

    // CUT: Use it too much or trying to reduce
    if (usage === 'tooMuch' || enjoyment === 'reduce') {
      return 'CUT';
    }

    // Default to CUT
    return 'CUT';
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({ usage: '', enjoyment: '', sharing: '' });
    setShowDecisionQuiz(false);
  };

  const applyRecommendation = () => {
    const recommendation = getRecommendation();
    resetQuiz();

    // Scroll to the recommended section
    setTimeout(() => {
      const sectionMap = {
        'CUT': 'cut',
        'CANCEL': 'cancel',
        'COMBINE': 'combine'
      };
      const element = document.querySelector(`.c3-${sectionMap[recommendation]}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  // Export calculations to CSV
  const exportToCSV = () => {
    const cutLabel = cutPreset && cutPresets[cutPreset]?.label ? cutPresets[cutPreset].label.replace(/[^\w\s]/g, '') : (cutCustomLabel || 'CUT scenario');
    const cancelLabel = cancelPreset && cancelPresets[cancelPreset]?.label ? cancelPresets[cancelPreset].label.replace(/[^\w\s]/g, '') : (cancelCustomLabel || 'CANCEL scenario');
    const combineLabel = combinePreset && combinePresets[combinePreset]?.label ? combinePresets[combinePreset].label.replace(/[^\w\s]/g, '') : (combineCustomLabel || 'COMBINE scenario');

    const cutSavings = cutSavingsCalculator();
    const cancelSavings = cancelSavingsCalculator();
    const combineSavings = combineSavingsCalculator();

    const csvContent = [
      ['C3 Framework - Savings Calculator Export'],
      ['Generated on', new Date().toLocaleDateString()],
      [''],
      ['Strategy', 'Item', 'Details', 'Monthly Savings', 'Yearly Savings'],
      ['CUT', cutLabel, `$${cutAmount} × ${cutFrequency}/week → ${Math.max(1, Math.floor(cutFrequency/2))}/week`, cutSavings.monthly.toFixed(2), cutSavings.yearly.toFixed(2)],
      ['CANCEL', cancelLabel, `${formatCurrency(cancelAmount)}/${cancelPeriod}`, cancelSavings.monthly.toFixed(2), cancelSavings.yearly.toFixed(2)],
      ['COMBINE', combineLabel, `${formatCurrency(combineOriginal)} split ${combineSplit} ways`, combineSavings.monthly.toFixed(2), combineSavings.yearly.toFixed(2)],
      [''],
      ['TOTAL SAVINGS', '', '', (cutSavings.monthly + cancelSavings.monthly + combineSavings.monthly).toFixed(2), (cutSavings.yearly + cancelSavings.yearly + combineSavings.yearly).toFixed(2)]
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `c3-savings-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <header className="header">
          <div className="header-top">
            <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)} title="Toggle dark mode">
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>

          <h1>C3 Savings Calculator</h1>
          <p>Cut, Cancel, or Combine  You choose what works for you</p>
          <p className="tagline">This isn't deprivation, it's empowerment</p>

          {/* Action Buttons */}
          <div className="header-actions">
            <button className="what-is-c3-btn" onClick={() => setShowC3Modal(true)}>
              ❓ What is C3?
            </button>
            <button className="decision-quiz-btn" onClick={() => setShowDecisionQuiz(true)}>
              🤔 Need help choosing?
            </button>
          </div>
        </header>

        {/* Local Storage Notice */}
        <div className="storage-notice">
          <p>
            💾 Your calculations are saved locally*{' '}
            <button className="info-link" onClick={scrollToStorageInfo}>
              Learn more
            </button>
          </p>
        </div>

        {/* C3 Framework Intro */}
        <div className="c3-intro">
          <p>The C3 framework gives you <strong>three ways</strong> to take control of your spending. Pick what feels right  there's no wrong choice!</p>
          <p className="pick-one-message"><strong>💡 Pro tip:</strong> Pick ONE item per category to start. Don't overwhelm yourself!</p>
        </div>

        {/* Calculator Grid */}
        <div className="calculator-grid">
          {/* CUT Section */}
          <div className="scenario-card c3-cut">
            <h3>
              <span className="c3-icon">{C3.CUT.icon}</span> {C3.CUT.label}
            </h3>
            <p className="c3-description">{C3.CUT.description}</p>
            <p className="c3-message">{C3.CUT.message}</p>

            <div className="preset-buttons">
              {Object.entries(cutPresets).map(([key, preset]) => (
                <button
                  key={key}
                  className={`preset-btn ${cutPreset === key ? 'active' : ''}`}
                  onClick={() => applyCutPreset(key)}
                >
                  {preset.label}
                </button>
              ))}
              <button
                className={`preset-btn custom-btn ${cutPreset === 'custom' ? 'active' : ''}`}
                onClick={() => {
                  setShowCutCustom(!showCutCustom);
                  if (!showCutCustom) applyCustomCut();
                }}
              >
                ✏️ Custom
              </button>
            </div>

            {showCutCustom && (
              <div className="custom-input-section">
                <input
                  type="text"
                  placeholder="What do you want to cut? (e.g., Coffee runs)"
                  value={cutCustomLabel}
                  onChange={(e) => setCutCustomLabel(e.target.value)}
                  className="custom-label-input"
                />
              </div>
            )}

            <div className="slider-group">
              <label>
                Cost per time:
                <span className="slider-value">{formatCurrency(cutAmount)}</span>
              </label>
              <input
                type="range"
                min="1"
                max="50"
                value={cutAmount}
                onChange={(e) => { setCutAmount(Number(e.target.value)); if (cutPreset !== 'custom') setCutPreset(''); }}
              />
            </div>

            <div className="slider-group">
              <label>
                Times per week:
                <span className="slider-value">{cutFrequency}x</span>
              </label>
              <input
                type="range"
                min="1"
                max="14"
                value={cutFrequency}
                onChange={(e) => { setCutFrequency(Number(e.target.value)); if (cutPreset !== 'custom') setCutPreset(''); }}
              />
            </div>

            <div className="results cut-results">
              <h4>Savings if you CUT this</h4>
              <div className="result-grid">
                <div className="result-item">
                  <div className="result-label">Per Month</div>
                  <div className="result-amount">{formatCurrency(cutResults.monthly)}</div>
                </div>
                <div className="result-item">
                  <div className="result-label">Per Year</div>
                  <div className="result-amount">{formatCurrency(cutResults.yearly)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* CANCEL Section */}
          <div className="scenario-card c3-cancel">
            <h3>
              <span className="c3-icon">{C3.CANCEL.icon}</span> {C3.CANCEL.label}
            </h3>
            <p className="c3-description">{C3.CANCEL.description}</p>
            <p className="c3-message">{C3.CANCEL.message}</p>

            <div className="preset-buttons">
              {Object.entries(cancelPresets).map(([key, preset]) => (
                <button
                  key={key}
                  className={`preset-btn ${cancelPreset === key ? 'active' : ''}`}
                  onClick={() => applyCancelPreset(key)}
                >
                  {preset.label}
                </button>
              ))}
              <button
                className={`preset-btn custom-btn ${cancelPreset === 'custom' ? 'active' : ''}`}
                onClick={() => {
                  setShowCancelCustom(!showCancelCustom);
                  if (!showCancelCustom) applyCustomCancel();
                }}
              >
                ✏️ Custom
              </button>
            </div>

            {showCancelCustom && (
              <div className="custom-input-section">
                <input
                  type="text"
                  placeholder="What do you want to cancel? (e.g., Unused subscription)"
                  value={cancelCustomLabel}
                  onChange={(e) => setCancelCustomLabel(e.target.value)}
                  className="custom-label-input"
                />
              </div>
            )}

            <div className="slider-group">
              <label>
                Subscription cost:
                <span className="slider-value">{formatCurrency(cancelAmount)}</span>
              </label>
              <input
                type="range"
                min="5"
                max="200"
                step="5"
                value={cancelAmount}
                onChange={(e) => { setCancelAmount(Number(e.target.value)); if (cancelPreset !== 'custom') setCancelPreset(''); }}
              />
            </div>

            <div className="slider-group">
              <label>Billing period:</label>
              <div className="toggle-group">
                <button
                  className={`toggle-btn ${cancelPeriod === 'month' ? 'active' : ''}`}
                  onClick={() => { setCancelPeriod('month'); if (cancelPreset !== 'custom') setCancelPreset(''); }}
                >
                  Monthly
                </button>
                <button
                  className={`toggle-btn ${cancelPeriod === 'year' ? 'active' : ''}`}
                  onClick={() => { setCancelPeriod('year'); if (cancelPreset !== 'custom') setCancelPreset(''); }}
                >
                  Yearly
                </button>
              </div>
            </div>

            <div className="results cancel-results">
              <h4>Savings if you CANCEL this</h4>
              <div className="result-grid">
                <div className="result-item">
                  <div className="result-label">Per Month</div>
                  <div className="result-amount">{formatCurrency(cancelResults.monthly)}</div>
                </div>
                <div className="result-item">
                  <div className="result-label">Per Year</div>
                  <div className="result-amount">{formatCurrency(cancelResults.yearly)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* COMBINE Section */}
          <div className="scenario-card c3-combine">
            <h3>
              <span className="c3-icon">{C3.COMBINE.icon}</span> {C3.COMBINE.label}
            </h3>
            <p className="c3-description">{C3.COMBINE.description}</p>
            <p className="c3-message">{C3.COMBINE.message}</p>

            <div className="preset-buttons">
              {Object.entries(combinePresets).map(([key, preset]) => (
                <button
                  key={key}
                  className={`preset-btn ${combinePreset === key ? 'active' : ''}`}
                  onClick={() => applyCombinePreset(key)}
                >
                  {preset.label}
                </button>
              ))}
              <button
                className={`preset-btn custom-btn ${combinePreset === 'custom' ? 'active' : ''}`}
                onClick={() => {
                  setShowCombineCustom(!showCombineCustom);
                  if (!showCombineCustom) applyCustomCombine();
                }}
              >
                ✏️ Custom
              </button>
            </div>

            {showCombineCustom && (
              <div className="custom-input-section">
                <input
                  type="text"
                  placeholder="What do you want to combine? (e.g., Netflix family plan)"
                  value={combineCustomLabel}
                  onChange={(e) => setCombineCustomLabel(e.target.value)}
                  className="custom-label-input"
                />
              </div>
            )}

            <div className="slider-group">
              <label>
                Original monthly cost:
                <span className="slider-value">{formatCurrency(combineOriginal)}</span>
              </label>
              <input
                type="range"
                min="10"
                max="300"
                step="10"
                value={combineOriginal}
                onChange={(e) => { setCombineOriginal(Number(e.target.value)); if (combinePreset !== 'custom') setCombinePreset(''); }}
              />
            </div>

            <div className="slider-group">
              <label>
                Split between:
                <span className="slider-value">{combineSplit} people</span>
              </label>
              <input
                type="range"
                min="2"
                max="6"
                value={combineSplit}
                onChange={(e) => { setCombineSplit(Number(e.target.value)); if (combinePreset !== 'custom') setCombinePreset(''); }}
              />
            </div>

            <div className="results combine-results">
              <h4>Savings if you COMBINE this</h4>
              <div className="result-grid">
                <div className="result-item">
                  <div className="result-label">Your Share</div>
                  <div className="result-amount">{formatCurrency(combineResults.yourShare)}</div>
                </div>
                <div className="result-item">
                  <div className="result-label">You Save/Month</div>
                  <div className="result-amount">{formatCurrency(combineResults.savings)}</div>
                </div>
                <div className="result-item">
                  <div className="result-label">Yearly Savings</div>
                  <div className="result-amount">{formatCurrency(combineResults.yearly)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Helpful Tip Section */}
        {activeTip && (
          <div className="tip-section">
            <h4>💡 Helpful Tip</h4>
            <p>{presetTips[activeTip.category][activeTip.key]}</p>
          </div>
        )}

        {/* Total Savings Summary */}
        <div className="total-savings">
          <h3>Your Total Potential Savings</h3>
          <p>By using all three C3 strategies together:</p>
          <div className="total-grid">
            <div className="total-item">
              <div className="total-label">Per Month</div>
              <div className="total-amount">{formatCurrency(totalMonthlySavings)}</div>
            </div>
            <div className="total-item">
              <div className="total-label">Per Year</div>
              <div className="total-amount">{formatCurrency(totalYearlySavings)}</div>
            </div>
            <div className="total-item">
              <div className="total-label">In 5 Years</div>
              <div className="total-amount">{formatCurrency(totalYearlySavings * 5)}</div>
            </div>
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="chart-section">
          <h3>📊 See Your C3 Savings Grow</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                <XAxis dataKey="month" stroke="#3B3B58" />
                <YAxis stroke="#3B3B58" tickFormatter={(value) => `$${value}`} />
                <Tooltip
                  formatter={(value) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: '#FFF',
                    border: '2px solid #B375A0',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="cut"
                  stroke="#B375A0"
                  strokeWidth={3}
                  name="✂️ CUT Savings"
                  dot={{ fill: '#B375A0', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="cancel"
                  stroke="#3B3B58"
                  strokeWidth={3}
                  name="❌ CANCEL Savings"
                  dot={{ fill: '#3B3B58', r: 4 }}
                />
                <Line
                  type="monotone"
                  dataKey="combine"
                  stroke="#B375A0"
                  strokeWidth={3}
                  name="🔗 COMBINE Savings"
                  dot={{ fill: '#B375A0', r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Export Button */}
        <div className="export-section">
          <button className="export-btn" onClick={exportToCSV}>
            📊 Export Calculations to CSV
          </button>
          <p className="export-hint">Download your savings calculations to track or share</p>
        </div>

        {/* Related Tools */}
        <div className="related-tools-section">
          <h3>🔗 Related Tools</h3>
          <p>Make the most of your No Spend Challenge with these companion tools:</p>
          <div className="tools-grid">
            <a href="https://tweakyourgeek.github.io/nospend-apps/" className="tool-card" target="_blank" rel="noopener noreferrer">
              <div className="tool-icon">📅</div>
              <div className="tool-info">
                <h4>Challenge Roadmap</h4>
                <p>Your 30-day interactive guide to the full No Spend Challenge</p>
              </div>
            </a>
            <a href="../subscription-analyzer/" className="tool-card">
              <div className="tool-icon">💰</div>
              <div className="tool-info">
                <h4>Subscription Analyzer</h4>
                <p>Track and analyze your recurring expenses with smart C3 recommendations</p>
              </div>
            </a>
          </div>
        </div>

        {/* Encouraging Message */}
        <div className="encouraging-message">
          <p>You're making intentional choices about what matters most! 💜</p>
          <p className="small">Remember: Pick what works for YOU. You can't do this wrong.</p>
        </div>

        {/* Local Storage Explanation */}
        <div className="storage-explanation" id="storage-info">
          <h4>📱 About Your Data</h4>
          <p>
            Your calculations are stored locally in your browser using localStorage.
            This means your data never leaves your device and is completely private.
            Your savings calculations will be saved between visits, unless you clear
            your browser's cache or browsing data.
          </p>
          <p className="small-text">
            <strong>Privacy first:</strong> We don't collect, track, or send your financial
            information anywhere. Everything stays on your device.
          </p>
        </div>

        {/* C3 Modal */}
        {showC3Modal && (
          <div className="modal-overlay" onClick={() => setShowC3Modal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowC3Modal(false)}>×</button>

              <h2>What is the C3 Framework?</h2>

              <div className="c3-explanation">
                <div className="c3-explanation-item">
                  <h3>{C3.CUT.icon} CUT</h3>
                  <p className="c3-def">{C3.CUT.description}</p>
                  <p>{C3.CUT.explanation}</p>
                </div>

                <div className="c3-explanation-item">
                  <h3>{C3.CANCEL.icon} CANCEL</h3>
                  <p className="c3-def">{C3.CANCEL.description}</p>
                  <p>{C3.CANCEL.explanation}</p>
                </div>

                <div className="c3-explanation-item">
                  <h3>{C3.COMBINE.icon} COMBINE</h3>
                  <p className="c3-def">{C3.COMBINE.description}</p>
                  <p>{C3.COMBINE.explanation}</p>
                </div>
              </div>

              <div className="video-placeholder">
                <p>🎥 <strong>Video explanation coming soon!</strong></p>
                <p className="small-text">We'll add a helpful video here to walk you through the C3 framework.</p>
              </div>

              <button className="modal-cta" onClick={() => setShowC3Modal(false)}>
                Got it! Let's calculate my savings
              </button>
            </div>
          </div>
        )}

        {/* Decision Quiz Modal */}
        {showDecisionQuiz && (
          <div className="modal-overlay" onClick={resetQuiz}>
            <div className="modal-content quiz-modal" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={resetQuiz}>×</button>

              <h2>🤔 Which C3 Strategy Is Right for You?</h2>
              <p className="quiz-intro">Answer 3 quick questions to find your best approach:</p>

              <div className="quiz-progress">
                <div className="quiz-progress-bar" style={{ width: `${(quizStep / 3) * 100}%` }}></div>
              </div>

              {/* Question 1: Usage */}
              {quizStep === 0 && (
                <div className="quiz-question">
                  <h3>How often do you use this expense/service?</h3>
                  <div className="quiz-options">
                    <button
                      className="quiz-option"
                      onClick={() => {
                        setQuizAnswers({...quizAnswers, usage: 'tooMuch'});
                        setQuizStep(1);
                      }}
                    >
                      <span className="option-icon">📈</span>
                      <span className="option-text">Too much / Very frequently</span>
                    </button>
                    <button
                      className="quiz-option"
                      onClick={() => {
                        setQuizAnswers({...quizAnswers, usage: 'regular'});
                        setQuizStep(1);
                      }}
                    >
                      <span className="option-icon">✅</span>
                      <span className="option-text">Regularly (weekly or more)</span>
                    </button>
                    <button
                      className="quiz-option"
                      onClick={() => {
                        setQuizAnswers({...quizAnswers, usage: 'rarely'});
                        setQuizStep(1);
                      }}
                    >
                      <span className="option-icon">❌</span>
                      <span className="option-text">Rarely or never</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Question 2: Enjoyment */}
              {quizStep === 1 && (
                <div className="quiz-question">
                  <h3>Do you still enjoy or need it?</h3>
                  <div className="quiz-options">
                    <button
                      className="quiz-option"
                      onClick={() => {
                        setQuizAnswers({...quizAnswers, enjoyment: 'yes'});
                        setQuizStep(2);
                      }}
                    >
                      <span className="option-icon">💜</span>
                      <span className="option-text">Yes, I love it</span>
                    </button>
                    <button
                      className="quiz-option"
                      onClick={() => {
                        setQuizAnswers({...quizAnswers, enjoyment: 'reduce'});
                        setQuizStep(2);
                      }}
                    >
                      <span className="option-icon">🤷</span>
                      <span className="option-text">Yes, but I'd like to cut back</span>
                    </button>
                    <button
                      className="quiz-option"
                      onClick={() => {
                        setQuizAnswers({...quizAnswers, enjoyment: 'no'});
                        setQuizStep(2);
                      }}
                    >
                      <span className="option-icon">😐</span>
                      <span className="option-text">Not really / Don't use it</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Question 3: Sharing */}
              {quizStep === 2 && (
                <div className="quiz-question">
                  <h3>Could you share this with others?</h3>
                  <div className="quiz-options">
                    <button
                      className="quiz-option"
                      onClick={() => {
                        setQuizAnswers({...quizAnswers, sharing: 'yes'});
                        setQuizStep(3);
                      }}
                    >
                      <span className="option-icon">👨‍👩‍👧‍👦</span>
                      <span className="option-text">Yes, with family/friends</span>
                    </button>
                    <button
                      className="quiz-option"
                      onClick={() => {
                        setQuizAnswers({...quizAnswers, sharing: 'no'});
                        setQuizStep(3);
                      }}
                    >
                      <span className="option-icon">🙅</span>
                      <span className="option-text">No, it's just for me</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Results */}
              {quizStep === 3 && (
                <div className="quiz-result">
                  <div className="result-icon">
                    {getRecommendation() === 'CUT' && '✂️'}
                    {getRecommendation() === 'CANCEL' && '❌'}
                    {getRecommendation() === 'COMBINE' && '🔗'}
                  </div>
                  <h3>We recommend: {getRecommendation()}</h3>
                  <p className="result-explanation">
                    {getRecommendation() === 'CUT' && "You're using this regularly but want to reduce. Try cutting back the frequency instead of giving it up completely."}
                    {getRecommendation() === 'CANCEL' && "You're not using this enough to justify the cost. Consider canceling it and freeing up that money."}
                    {getRecommendation() === 'COMBINE' && "You could save by sharing this with others! Look for family plans or split the cost with friends."}
                  </p>
                  <button className="modal-cta" onClick={applyRecommendation}>
                    Show me the {getRecommendation()} calculator
                  </button>
                  <button className="quiz-restart" onClick={() => setQuizStep(0)}>
                    ↻ Start over
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
