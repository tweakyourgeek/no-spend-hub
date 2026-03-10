import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import './App.css';

// Utility functions
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

const formatDate = (dateString) => {
  if (!dateString) return 'Never';
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
};

// C3 Framework
const C3 = {
  CUT: {
    icon: '✂️',
    label: 'CUT',
    description: 'Reduce frequency',
    color: '#B375A0',
    explanation: "Cut means using it less often or downgrading to a cheaper tier. Keep what you love, just spend less on it."
  },
  CANCEL: {
    icon: '❌',
    label: 'CANCEL',
    description: 'Stop paying entirely',
    color: '#3B3B58',
    explanation: "Cancel means stopping a subscription you don't use or need anymore. No guilt, just freedom from recurring charges."
  },
  COMBINE: {
    icon: '🔗',
    label: 'COMBINE',
    description: 'Share costs',
    color: '#B375A0',
    explanation: "Combine means upgrading to a family plan and splitting the cost with others. Same service, lower cost per person."
  },
};

// Preset subscriptions
const PRESET_SUBSCRIPTIONS = {
  streaming: [
    { name: 'Netflix', category: 'streaming', defaultCost: 15.99, icon: '📺' },
    { name: 'Disney+', category: 'streaming', defaultCost: 10.99, icon: '🎬' },
    { name: 'Hulu', category: 'streaming', defaultCost: 14.99, icon: '📺' },
    { name: 'HBO Max', category: 'streaming', defaultCost: 15.99, icon: '🎭' },
    { name: 'Amazon Prime', category: 'streaming', defaultCost: 14.99, icon: '📦' },
    { name: 'Apple TV+', category: 'streaming', defaultCost: 9.99, icon: '🍎' },
    { name: 'YouTube Premium', category: 'streaming', defaultCost: 13.99, icon: '▶️' },
    { name: 'Spotify', category: 'streaming', defaultCost: 10.99, icon: '🎵' },
  ],
  software: [
    { name: 'Adobe Creative Cloud', category: 'software', defaultCost: 54.99, icon: '🎨' },
    { name: 'Microsoft 365', category: 'software', defaultCost: 9.99, icon: '💼' },
    { name: 'Canva Pro', category: 'software', defaultCost: 12.99, icon: '🎨' },
    { name: 'Grammarly', category: 'software', defaultCost: 12.00, icon: '✍️' },
    { name: 'Dropbox', category: 'software', defaultCost: 11.99, icon: '☁️' },
    { name: 'Google One', category: 'software', defaultCost: 9.99, icon: '☁️' },
  ],
  fitness: [
    { name: 'Gym Membership', category: 'fitness', defaultCost: 49.99, icon: '💪' },
    { name: 'Peloton', category: 'fitness', defaultCost: 44.00, icon: '🚴' },
    { name: 'ClassPass', category: 'fitness', defaultCost: 79.00, icon: '🧘' },
    { name: 'Strava', category: 'fitness', defaultCost: 5.00, icon: '🏃' },
  ],
  news: [
    { name: 'New York Times', category: 'news', defaultCost: 17.00, icon: '📰' },
    { name: 'Wall Street Journal', category: 'news', defaultCost: 39.00, icon: '📰' },
    { name: 'Medium', category: 'news', defaultCost: 5.00, icon: '📝' },
  ],
};

// Tips for each subscription
const SUBSCRIPTION_TIPS = {
  'Netflix': "Check when you last logged in. Most people only watch 1-2 streaming services regularly but pay for 3-4. Consider rotating services or upgrading to a family plan to split costs.",
  'Disney+': "Perfect for families with kids, but if you're not watching regularly, pause it and reactivate when new shows premiere. Disney+ allows easy pausing.",
  'Hulu': "Hulu often bundles with Disney+ and ESPN+ for savings. Check if you can downgrade to the ad-supported tier to cut costs in half.",
  'HBO Max': "Great for binge-watching new releases, then canceling until the next show you want drops. No penalty for pausing and reactivating.",
  'Amazon Prime': "Remember this includes shipping benefits! If you mainly use it for streaming, consider if the shipping alone justifies the cost.",
  'Apple TV+': "One of the cheapest streaming options. If you bought an Apple device recently, check if you have free months included.",
  'YouTube Premium': "Family plans can be shared with up to 5 people. Split the cost and save 80%. Also removes ads across all devices.",
  'Spotify': "Family and student plans offer significant savings. Consider sharing a family plan with 5 friends and split the cost.",
  'Adobe Creative Cloud': "Expensive! If you only use 1-2 apps, consider single-app plans instead of the full suite. Students get 60% off.",
  'Microsoft 365': "Family plan covers 6 people with 1TB storage each. Split with family or friends to save significantly.",
  'Canva Pro': "Great for teams! The team plan can be split between multiple people. Free version might be enough for casual users.",
  'Grammarly': "Check if your company or school offers free access. Many universities provide Grammarly Premium to students.",
  'Dropbox': "Family plans offer better value. Also check Google One and iCloud - they might be cheaper for your needs.",
  'Google One': "Family plans give everyone storage for one price. 200GB plan can be shared with 5 family members.",
  'Gym Membership': "Visit frequency matters! If you go less than 2x/week, pay-per-class or home workouts might be cheaper. Always negotiate - gyms have flexibility.",
  'Peloton': "App-only membership is much cheaper than the full package. You can use it with any bike or for floor workouts.",
  'ClassPass': "Great if you want variety, but check the math. Sometimes individual class packages at your favorite studio are cheaper.",
  'Strava': "Free version is excellent! Premium mainly adds detailed analytics. Most runners and cyclists don't need it.",
  'New York Times': "Look for special promotions - they often run $1/week deals for new subscribers. Check if your library offers free access.",
  'Wall Street Journal': "Student rates are much cheaper. Also check if your company provides free access through corporate programs.",
  'Medium': "Friend of Medium membership gives you access plus credits. You can also read 3 free articles per month by opening in incognito.",
};



// Categories for organization
const CATEGORIES = {
  streaming: { label: 'Streaming & Entertainment', icon: '📺', color: '#B375A0' },
  software: { label: 'Software & Cloud', icon: '💻', color: '#3B3B58' },
  fitness: { label: 'Fitness & Wellness', icon: '💪', color: '#7A9B7A' },
  news: { label: 'News & Media', icon: '📰', color: '#5A5A7A' },
  other: { label: 'Other', icon: '📦', color: '#6B6B6B' },
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

  const [subscriptions, setSubscriptions] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showC3Modal, setShowC3Modal] = useState(false);
  const [activeCategory, setActiveCategory] = useState('streaming');
  const [customMode, setCustomMode] = useState(false);
  const [activeTip, setActiveTip] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    cost: '',
    billingPeriod: 'month',
    category: 'streaming',
    lastUsed: new Date().toISOString().split('T')[0],
    nextBillingDate: new Date().toISOString().split('T')[0],
    sharingWith: 1,
    icon: '📦',
  });

  // Load subscriptions from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('nospend_subscriptions');
    if (saved) {
      setSubscriptions(JSON.parse(saved));
    }
  }, []);

  // Save subscriptions to localStorage whenever they change
  useEffect(() => {
    if (subscriptions.length > 0) {
      localStorage.setItem('nospend_subscriptions', JSON.stringify(subscriptions));
    }
  }, [subscriptions]);

  // Add subscription from preset
  const addPresetSubscription = (preset) => {
    const today = new Date();
    const nextBilling = new Date(today);
    nextBilling.setMonth(nextBilling.getMonth() + 1); // Default to next month

    const newSub = {
      id: Date.now(),
      name: preset.name,
      cost: preset.defaultCost,
      billingPeriod: 'month',
      category: preset.category,
      lastUsed: new Date().toISOString().split('T')[0],
      nextBillingDate: nextBilling.toISOString().split('T')[0],
      sharingWith: 1,
      icon: preset.icon,
    };
    setSubscriptions([...subscriptions, newSub]);
    setShowAddModal(false);
    // Show tip after adding
    if (SUBSCRIPTION_TIPS[preset.name]) {
      setActiveTip({name: preset.name, tip: SUBSCRIPTION_TIPS[preset.name]});
    }
  };

  // Add custom subscription
  const addCustomSubscription = (e) => {
    e.preventDefault();
    const newSub = {
      id: Date.now(),
      ...formData,
      cost: parseFloat(formData.cost),
      sharingWith: parseInt(formData.sharingWith),
    };
    setSubscriptions([...subscriptions, newSub]);
    setShowAddModal(false);
    setFormData({
      name: '',
      cost: '',
      billingPeriod: 'month',
      category: 'streaming',
      lastUsed: new Date().toISOString().split('T')[0],
      nextBillingDate: new Date().toISOString().split('T')[0],
      sharingWith: 1,
      icon: '📦',
    });
  };

  // Delete subscription
  const deleteSubscription = (id) => {
    setSubscriptions(subscriptions.filter(sub => sub.id !== id));
  };

  // Calculate totals
  const calculateTotals = () => {
    let monthlyTotal = 0;
    subscriptions.forEach(sub => {
      const monthlyCost = sub.billingPeriod === 'month'
        ? sub.cost
        : sub.cost / 12;
      monthlyTotal += monthlyCost;
    });
    return {
      monthly: monthlyTotal,
      yearly: monthlyTotal * 12,
    };
  };

  // Get C3 Recommendations
  const getC3Recommendations = () => {
    const recommendations = [];
    const now = new Date();

    subscriptions.forEach(sub => {
      const lastUsedDate = new Date(sub.lastUsed);
      const daysSinceUse = Math.floor((now - lastUsedDate) / (1000 * 60 * 60 * 24));

      // CANCEL recommendations
      if (daysSinceUse > 60) {
        recommendations.push({
          type: 'CANCEL',
          subscription: sub,
          reason: `Last used ${formatDate(sub.lastUsed)}. Consider canceling if you're not using it.`,
          savings: sub.billingPeriod === 'month' ? sub.cost * 12 : sub.cost,
        });
      }
      // CUT recommendations
      else if (daysSinceUse > 30) {
        recommendations.push({
          type: 'CUT',
          subscription: sub,
          reason: `Used occasionally. Consider downgrading to a cheaper tier or using less.`,
          savings: sub.cost * 0.3 * 12, // Estimate 30% savings
        });
      }
      // COMBINE recommendations
      else if (sub.sharingWith === 1 && (sub.name.includes('Netflix') || sub.name.includes('Spotify') || sub.name.includes('YouTube') || sub.name.includes('Dropbox') || sub.name.includes('Google One'))) {
        recommendations.push({
          type: 'COMBINE',
          subscription: sub,
          reason: `You're not sharing this. Consider a family plan split with others.`,
          savings: sub.cost * 0.5 * 12, // Estimate 50% savings
        });
      }
    });

    return recommendations;
  };

  // Group subscriptions by category
  const groupedSubscriptions = subscriptions.reduce((acc, sub) => {
    if (!acc[sub.category]) acc[sub.category] = [];
    acc[sub.category].push(sub);
    return acc;
  }, {});

  // Prepare chart data
  const chartData = Object.keys(groupedSubscriptions).map(category => ({
    name: CATEGORIES[category]?.label || category,
    cost: groupedSubscriptions[category].reduce((sum, sub) => {
      const monthlyCost = sub.billingPeriod === 'month' ? sub.cost : sub.cost / 12;
      return sum + monthlyCost;
    }, 0),
  }));

  const pieColors = ['#B375A0', '#3B3B58', '#7A9B7A', '#5A5A7A', '#6B6B6B'];

  const totals = calculateTotals();
  const recommendations = getC3Recommendations();

  // Get upcoming renewals (next 90 days)
  const getUpcomingRenewals = () => {
    const today = new Date();
    const in90Days = new Date(today);
    in90Days.setDate(in90Days.getDate() + 90);

    return subscriptions
      .filter(sub => sub.nextBillingDate) // Only subs with billing dates
      .map(sub => ({
        ...sub,
        billingDate: new Date(sub.nextBillingDate),
        daysUntil: Math.ceil((new Date(sub.nextBillingDate) - today) / (1000 * 60 * 60 * 24)),
      }))
      .filter(sub => sub.daysUntil >= 0 && sub.daysUntil <= 90)
      .sort((a, b) => a.daysUntil - b.daysUntil);
  };

  const upcomingRenewals = getUpcomingRenewals();

  // Get family plan opportunities
  const getFamilyPlanOpportunities = () => {
    // Services known to have family plans
    const familyPlanServices = ['Netflix', 'Spotify', 'YouTube', 'Disney+', 'Hulu', 'Apple TV+',
                                'Dropbox', 'Google One', 'Microsoft 365', 'Canva'];

    return subscriptions
      .filter(sub => sub.sharingWith === 1) // Not currently sharing
      .filter(sub => familyPlanServices.some(service => sub.name.includes(service)))
      .map(sub => {
        // Estimate family plan cost (usually 1.5-2x individual)
        const estimatedFamilyPlanCost = sub.cost * 1.7;
        const splitBetween = sub.name.includes('Netflix') || sub.name.includes('Spotify') ? 5 : 4;
        const costPerPerson = estimatedFamilyPlanCost / splitBetween;
        const yearlySavings = (sub.cost - costPerPerson) * 12;

        return {
          ...sub,
          estimatedFamilyPlanCost,
          splitBetween,
          costPerPerson,
          yearlySavings,
        };
      })
      .filter(sub => sub.yearlySavings > 0)
      .sort((a, b) => b.yearlySavings - a.yearlySavings);
  };

  const familyPlanOpportunities = getFamilyPlanOpportunities();

  // Scroll to storage explanation
  const scrollToStorageInfo = () => {
    document.getElementById('storage-info')?.scrollIntoView({ behavior: 'smooth' });
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

          <h1>💰 Subscription Analyzer</h1>
          <p>Track, analyze, and optimize your recurring expenses</p>
          <p className="tagline">Your subscriptions, under control</p>

          <button className="what-is-c3-btn" onClick={() => setShowC3Modal(true)}>
            ❓ What is C3?
          </button>
        </header>

        {/* Storage Notice */}
        <div className="storage-notice">
          <p>
            💾 Your subscriptions are saved locally*{' '}
            <button className="info-link" onClick={scrollToStorageInfo}>
              Learn more
            </button>
          </p>
        </div>

        {/* Helpful Guidance */}
        <div className="guidance-section">
          <p><strong>💡 Pro tip:</strong> Start by adding your most expensive subscriptions first to see where your money is going!</p>
        </div>

        {/* Annual Total Projection - Big Callout */}
        {subscriptions.length > 0 && (
          <div className="annual-total-hero">
            <div className="annual-total-label">Your Annual Subscription Spending</div>
            <div className="annual-total-amount">{formatCurrency(totals.yearly)}</div>
            <div className="annual-total-subtitle">
              That's {formatCurrency(totals.monthly)}/month across {subscriptions.length} {subscriptions.length === 1 ? 'subscription' : 'subscriptions'}
            </div>
          </div>
        )}

        {/* Dashboard Summary */}
        <div className="dashboard-summary">
          <div className="summary-card">
            <div className="summary-label">Total Subscriptions</div>
            <div className="summary-value">{subscriptions.length}</div>
          </div>
          <div className="summary-card highlight">
            <div className="summary-label">Monthly Cost</div>
            <div className="summary-value">{formatCurrency(totals.monthly)}</div>
          </div>
          <div className="summary-card">
            <div className="summary-label">Yearly Cost</div>
            <div className="summary-value">{formatCurrency(totals.yearly)}</div>
          </div>
          <div className="summary-card accent">
            <div className="summary-label">Potential Savings</div>
            <div className="summary-value">
              {formatCurrency(recommendations.reduce((sum, rec) => sum + rec.savings, 0))}
            </div>
          </div>
        </div>

        {/* Add Subscription Button */}
        <div className="add-subscription-section">
          <button className="add-btn" onClick={() => setShowAddModal(true)}>
            ➕ Add Subscription
          </button>
        </div>

        {/* C3 Recommendations */}
        {recommendations.length > 0 && (
          <div className="recommendations-section">
            <h2>💡 C3 Recommendations</h2>
            <p className="rec-intro">Based on your usage patterns, here's how you could save:</p>

            <div className="recommendations-grid">
              {recommendations.map((rec, idx) => (
                <div key={idx} className={`recommendation-card c3-${rec.type.toLowerCase()}`}>
                  <div className="rec-header">
                    <span className="rec-icon">{C3[rec.type].icon}</span>
                    <span className="rec-type">{rec.type}</span>
                  </div>
                  <h4>{rec.subscription.icon} {rec.subscription.name}</h4>
                  <p className="rec-reason">{rec.reason}</p>
                  <div className="rec-savings">
                    Potential savings: <strong>{formatCurrency(rec.savings)}/year</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Renewal Calendar */}
        {upcomingRenewals.length > 0 && (
          <div className="renewal-calendar-section">
            <h2>📅 Upcoming Renewals (Next 90 Days)</h2>
            <p className="renewal-intro">Mark your calendar! These subscriptions will renew soon:</p>

            <div className="renewal-timeline">
              {upcomingRenewals.map((sub) => (
                <div
                  key={sub.id}
                  className={`renewal-item ${sub.daysUntil <= 7 ? 'urgent' : sub.daysUntil <= 30 ? 'soon' : ''}`}
                >
                  <div className="renewal-left">
                    <span className="renewal-icon">{sub.icon}</span>
                    <div className="renewal-info">
                      <h4>{sub.name}</h4>
                      <div className="renewal-date">
                        {sub.billingDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                    </div>
                  </div>
                  <div className="renewal-right">
                    <div className="renewal-cost">{formatCurrency(sub.cost)}</div>
                    <div className={`renewal-badge ${sub.daysUntil <= 7 ? 'urgent' : sub.daysUntil <= 30 ? 'soon' : ''}`}>
                      {sub.daysUntil === 0 ? 'Today!' :
                       sub.daysUntil === 1 ? 'Tomorrow' :
                       sub.daysUntil <= 7 ? `${sub.daysUntil} days` :
                       sub.daysUntil <= 30 ? `${sub.daysUntil} days` :
                       `${Math.ceil(sub.daysUntil / 7)} weeks`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Family Plan Opportunities */}
        {familyPlanOpportunities.length > 0 && (
          <div className="family-plan-section">
            <h2>🔗 Family Plan Savings Opportunities</h2>
            <p className="family-plan-intro">
              You're paying for individual plans. Here's how much you could save by splitting family plans:
            </p>

            <div className="family-plan-grid">
              {familyPlanOpportunities.map((sub) => (
                <div key={sub.id} className="family-plan-card">
                  <div className="family-plan-header">
                    <span className="family-plan-icon">{sub.icon}</span>
                    <h4>{sub.name}</h4>
                  </div>
                  <div className="family-plan-calc">
                    <div className="calc-row">
                      <span className="calc-label">You pay now:</span>
                      <span className="calc-value current">{formatCurrency(sub.cost)}/month</span>
                    </div>
                    <div className="calc-row">
                      <span className="calc-label">Family plan cost:</span>
                      <span className="calc-value">{formatCurrency(sub.estimatedFamilyPlanCost)}/month</span>
                    </div>
                    <div className="calc-row">
                      <span className="calc-label">Split {sub.splitBetween} ways:</span>
                      <span className="calc-value split">{formatCurrency(sub.costPerPerson)}/month</span>
                    </div>
                    <div className="calc-divider"></div>
                    <div className="calc-row savings-row">
                      <span className="calc-label"><strong>Your savings:</strong></span>
                      <span className="calc-value savings">
                        <strong>{formatCurrency(sub.yearlySavings)}/year</strong>
                      </span>
                    </div>
                  </div>
                  <div className="family-plan-tip">
                    💡 Split with {sub.splitBetween - 1} {sub.splitBetween === 2 ? 'person' : 'people'} (family, friends, or roommates)
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Subscriptions List */}
        {subscriptions.length > 0 ? (
          <>
            <div className="subscriptions-section">
              <h2>📋 Your Subscriptions</h2>

              {Object.keys(groupedSubscriptions).map(category => (
                <div key={category} className="category-group">
                  <h3 className="category-header">
                    {CATEGORIES[category]?.icon} {CATEGORIES[category]?.label || category}
                  </h3>

                  <div className="subscriptions-list">
                    {groupedSubscriptions[category].map(sub => (
                      <div key={sub.id} className="subscription-card">
                        <div className="sub-main">
                          <div className="sub-icon">{sub.icon}</div>
                          <div className="sub-info">
                            <h4>{sub.name}</h4>
                            <div className="sub-meta">
                              <span>Last used: {formatDate(sub.lastUsed)}</span>
                              {sub.sharingWith > 1 && (
                                <span>• Shared with {sub.sharingWith} {sub.sharingWith === 2 ? 'person' : 'people'}</span>
                              )}
                            </div>
                          </div>
                          <div className="sub-cost">
                            <div className="cost-amount">{formatCurrency(sub.cost)}</div>
                            <div className="cost-period">/{sub.billingPeriod}</div>
                          </div>
                          <button
                            className="delete-btn"
                            onClick={() => deleteSubscription(sub.id)}
                            title="Delete subscription"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Charts */}
            <div className="charts-section">
              <h2>📊 Spending Breakdown</h2>

              <div className="charts-grid">
                <div className="chart-container">
                  <h3>By Category</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={(entry) => `${entry.name}: ${formatCurrency(entry.cost)}`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="cost"
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="chart-container">
                  <h3>Monthly Costs</h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `$${value}`} />
                      <Tooltip formatter={(value) => formatCurrency(value)} />
                      <Bar dataKey="cost" fill="#B375A0" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="empty-state">
            <p className="empty-icon">📭</p>
            <h3>No subscriptions yet</h3>
            <p>Click "Add Subscription" to start tracking your recurring expenses</p>
          </div>
        )}

        {/* Add Subscription Modal */}
        {showAddModal && (
          <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>×</button>

              <h2>Add Subscription</h2>

              <div className="modal-tabs">
                <button
                  className={`tab-btn ${!customMode ? 'active' : ''}`}
                  onClick={() => setCustomMode(false)}
                >
                  📋 Choose from Presets
                </button>
                <button
                  className={`tab-btn ${customMode ? 'active' : ''}`}
                  onClick={() => setCustomMode(true)}
                >
                  ✏️ Custom
                </button>
              </div>

              {!customMode ? (
                <div className="presets-section">
                  <div className="category-tabs">
                    {Object.keys(PRESET_SUBSCRIPTIONS).map(cat => (
                      <button
                        key={cat}
                        className={`category-tab ${activeCategory === cat ? 'active' : ''}`}
                        onClick={() => setActiveCategory(cat)}
                      >
                        {CATEGORIES[cat]?.icon} {CATEGORIES[cat]?.label}
                      </button>
                    ))}
                  </div>

                  <div className="presets-grid">
                    {PRESET_SUBSCRIPTIONS[activeCategory].map((preset, idx) => (
                      <button
                        key={idx}
                        className="preset-card"
                        onClick={() => addPresetSubscription(preset)}
                      >
                        <div className="preset-icon">{preset.icon}</div>
                        <div className="preset-name">{preset.name}</div>
                        <div className="preset-cost">{formatCurrency(preset.defaultCost)}/mo</div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <form onSubmit={addCustomSubscription} className="custom-form">
                  <div className="form-group">
                    <label>Subscription Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="e.g., Netflix, Gym Membership"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Cost *</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        value={formData.cost}
                        onChange={(e) => setFormData({...formData, cost: e.target.value})}
                        placeholder="0.00"
                      />
                    </div>

                    <div className="form-group">
                      <label>Billing Period *</label>
                      <select
                        value={formData.billingPeriod}
                        onChange={(e) => setFormData({...formData, billingPeriod: e.target.value})}
                      >
                        <option value="month">Monthly</option>
                        <option value="year">Yearly</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                    >
                      {Object.keys(CATEGORIES).map(cat => (
                        <option key={cat} value={cat}>{CATEGORIES[cat].label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Last Used</label>
                    <input
                      type="date"
                      value={formData.lastUsed}
                      onChange={(e) => setFormData({...formData, lastUsed: e.target.value})}
                    />
                  </div>

                  <div className="form-group">
                    <label>Sharing With (including you)</label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.sharingWith}
                      onChange={(e) => setFormData({...formData, sharingWith: e.target.value})}
                    />
                  </div>

                  <button type="submit" className="submit-btn">
                    Add Subscription
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

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
                Got it! Let's analyze my subscriptions
              </button>
            </div>
          </div>
        )}

        {/* Helpful Tip Section */}
        {activeTip && (
          <div className="tip-section">
            <h4>💡 Smart Tip for {activeTip.name}</h4>
            <p>{activeTip.tip}</p>
            <button className="tip-close" onClick={() => setActiveTip(null)}>Got it!</button>
          </div>
        )}

        {/* Related Tools */}
        <div className="related-tools-section">
          <h2>🔗 Related Tools</h2>
          <p>Make the most of your No Spend Challenge with these companion tools:</p>
          <div className="tools-grid">
            <a href="https://tweakyourgeek.github.io/nospend-apps/" className="tool-card" target="_blank" rel="noopener noreferrer">
              <div className="tool-icon">📅</div>
              <div className="tool-info">
                <h4>Challenge Roadmap</h4>
                <p>Your 30-day interactive guide to the full No Spend Challenge</p>
              </div>
            </a>
            <a href="../savings-calculator/" className="tool-card">
              <div className="tool-icon">✂️</div>
              <div className="tool-info">
                <h4>C3 Savings Calculator</h4>
                <p>Model Cut, Cancel, and Combine scenarios to see your potential savings</p>
              </div>
            </a>
          </div>
        </div>

        {/* Encouraging Message */}
        <div className="encouraging-message">
          <p>You're taking control of your subscriptions! 💜</p>
          <p className="small">Track what you actually use. Cancel what you don't. Share what you can. You've got this!</p>
        </div>

        {/* Local Storage Explanation */}
        <div className="storage-explanation" id="storage-info">
          <h4>📱 About Your Data</h4>
          <p>
            Your subscriptions are stored locally in your browser using localStorage.
            This means your data never leaves your device and is completely private.
            Your subscription list will be saved between visits, unless you clear
            your browser's cache or browsing data.
          </p>
          <p className="small-text">
            <strong>Privacy first:</strong> We don't collect, track, or send your subscription
            information anywhere. Everything stays on your device.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
