import { useState, useEffect } from 'react'

const colors = {
  primary: '#B375A0',
  primaryDark: '#493751',
  success: '#A6C9BB',
  successDark: '#7BA396',
  warning: '#E8B4A0',
  warningDark: '#D49880',
  info: '#5DADE2',
  background: '#FDFCFB',
  backgroundDark: '#1a1a1a',
  surface: '#FFFFFF',
  surfaceDark: '#2d2d2d',
  text: '#2D2D2D',
  textDark: '#E8E8E8',
  textMuted: '#6B6B6B',
  textMutedDark: '#A0A0A0',
  border: '#E8E4E1',
  borderDark: '#404040',
  danger: '#E74C3C',
}

const categories = [
  'Streaming',
  'Software',
  'Food/Delivery',
  'Fitness',
  'News/Media',
  'Shopping/Memberships',
  'Other',
]

const lastUsedOptions = [
  'Today',
  'This week',
  'This month',
  'Can\'t remember',
  'Never',
]

const emptySubscription = () => ({
  id: Date.now(),
  name: '',
  cost: '',
  category: '',
  lastUsed: '',
  canLiveWithout: '',
})

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true'
    }
    return false
  })

  const [subscriptions, setSubscriptions] = useState([
    emptySubscription(),
    emptySubscription(),
    emptySubscription(),
  ])
  const [showResults, setShowResults] = useState(false)

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  const theme = {
    bg: darkMode ? colors.backgroundDark : colors.background,
    surface: darkMode ? colors.surfaceDark : colors.surface,
    text: darkMode ? colors.textDark : colors.text,
    textMuted: darkMode ? colors.textMutedDark : colors.textMuted,
    border: darkMode ? colors.borderDark : colors.border,
  }

  const baseStyles = {
    container: {
      minHeight: '100vh',
      backgroundColor: theme.bg,
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      color: theme.text,
      padding: '24px',
      transition: 'all 200ms ease-out',
    },
    card: {
      backgroundColor: theme.surface,
      borderRadius: '12px',
      padding: '24px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      border: `1px solid ${theme.border}`,
      maxWidth: '900px',
      margin: '0 auto',
    },
    input: {
      padding: '10px 12px',
      borderRadius: '6px',
      border: `1px solid ${theme.border}`,
      backgroundColor: theme.surface,
      color: theme.text,
      fontSize: '14px',
      width: '100%',
      boxSizing: 'border-box',
    },
    select: {
      padding: '10px 12px',
      borderRadius: '6px',
      border: `1px solid ${theme.border}`,
      backgroundColor: theme.surface,
      color: theme.text,
      fontSize: '14px',
      width: '100%',
      boxSizing: 'border-box',
      cursor: 'pointer',
    },
    button: {
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: colors.primary,
      color: '#FFFFFF',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 200ms ease-out',
    },
    buttonSecondary: {
      padding: '10px 16px',
      borderRadius: '6px',
      border: `1px solid ${theme.border}`,
      backgroundColor: 'transparent',
      color: theme.text,
      fontSize: '14px',
      fontWeight: '500',
      cursor: 'pointer',
    },
  }

  const updateSubscription = (id, field, value) => {
    setSubscriptions(subs =>
      subs.map(s => s.id === id ? { ...s, [field]: value } : s)
    )
  }

  const addSubscription = () => {
    setSubscriptions([...subscriptions, emptySubscription()])
  }

  const removeSubscription = (id) => {
    if (subscriptions.length > 1) {
      setSubscriptions(subscriptions.filter(s => s.id !== id))
    }
  }

  const getRecommendation = (sub) => {
    if (!sub.name || !sub.cost) return null

    let action = 'KEEP'
    let color = colors.success
    let reason = 'Used regularly, clear value'

    // CANCEL conditions
    if (sub.lastUsed === 'Never' || sub.lastUsed === 'Can\'t remember') {
      action = 'CANCEL'
      color = colors.danger
      reason = sub.lastUsed === 'Never' ? 'Never used' : 'Can\'t remember using it'
    } else if (sub.canLiveWithout === 'Yes') {
      action = 'CANCEL'
      color = colors.danger
      reason = 'You said you could live without it'
    }
    // CUT conditions
    else if (sub.canLiveWithout === 'Probably') {
      action = 'CUT'
      color = colors.warning
      reason = 'Consider downgrading or reducing usage'
    } else if (sub.lastUsed === 'This month' && parseFloat(sub.cost) > 15) {
      action = 'CUT'
      color = colors.warning
      reason = 'Infrequent use for the price'
    }
    // COMBINE conditions
    else if (sub.category === 'Streaming' && parseFloat(sub.cost) > 10) {
      action = 'COMBINE'
      color = colors.info
      reason = 'Could share with family/friends'
    }

    return { action, color, reason }
  }

  const validSubs = subscriptions.filter(s => s.name && s.cost)
  const totalMonthly = validSubs.reduce((sum, s) => sum + (parseFloat(s.cost) || 0), 0)
  const totalAnnual = totalMonthly * 12

  const cancelSubs = validSubs.filter(s => getRecommendation(s)?.action === 'CANCEL')
  const cutSubs = validSubs.filter(s => getRecommendation(s)?.action === 'CUT')
  const potentialSavings = cancelSubs.reduce((sum, s) => sum + (parseFloat(s.cost) || 0), 0)
    + (cutSubs.reduce((sum, s) => sum + (parseFloat(s.cost) || 0), 0) * 0.5) // Assume 50% savings from cuts

  const copyToClipboard = () => {
    const text = validSubs.map(s => {
      const rec = getRecommendation(s)
      return `${rec?.action || 'KEEP'}: ${s.name} - $${s.cost}/mo - ${rec?.reason || ''}`
    }).join('\n')
    navigator.clipboard.writeText(text)
    alert('Copied to clipboard!')
  }

  const reset = () => {
    setSubscriptions([emptySubscription(), emptySubscription(), emptySubscription()])
    setShowResults(false)
  }

  return (
    <div style={baseStyles.container}>
      <div style={baseStyles.card}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontSize: '28px', fontWeight: '700', color: colors.primary }}>
            🌿 No Spend Collective
          </div>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
          <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>Subscription Audit</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{ ...baseStyles.buttonSecondary, padding: '8px 12px', fontSize: '12px' }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <p style={{ color: theme.textMuted, marginBottom: '24px', fontSize: '14px' }}>
          List your subscriptions. Be honest about the last time you actually used them.
        </p>

        {!showResults ? (
          <>
            {/* Running total */}
            <div style={{
              display: 'flex',
              gap: '24px',
              padding: '16px',
              backgroundColor: darkMode ? colors.primaryDark + '30' : colors.primary + '10',
              borderRadius: '8px',
              marginBottom: '24px',
              flexWrap: 'wrap',
            }}>
              <div>
                <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>Monthly</div>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>${totalMonthly.toFixed(2)}</div>
              </div>
              <div>
                <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>Annual</div>
                <div style={{ fontSize: '24px', fontWeight: '700' }}>${totalAnnual.toFixed(2)}</div>
              </div>
            </div>

            {/* Subscription rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {subscriptions.map((sub, index) => (
                <div
                  key={sub.id}
                  style={{
                    padding: '16px',
                    backgroundColor: theme.surface,
                    border: `1px solid ${theme.border}`,
                    borderRadius: '8px',
                  }}
                >
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                    gap: '12px',
                    marginBottom: subscriptions.length > 1 ? '12px' : 0,
                  }}>
                    <div>
                      <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>
                        Name
                      </label>
                      <input
                        type="text"
                        value={sub.name}
                        onChange={(e) => updateSubscription(sub.id, 'name', e.target.value)}
                        placeholder="Netflix, Spotify..."
                        style={baseStyles.input}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>
                        Monthly Cost
                      </label>
                      <input
                        type="number"
                        value={sub.cost}
                        onChange={(e) => updateSubscription(sub.id, 'cost', e.target.value)}
                        placeholder="0.00"
                        style={baseStyles.input}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>
                        Category
                      </label>
                      <select
                        value={sub.category}
                        onChange={(e) => updateSubscription(sub.id, 'category', e.target.value)}
                        style={baseStyles.select}
                      >
                        <option value="">Select...</option>
                        {categories.map(c => <option key={c} value={c}>{c}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>
                        Last Used
                      </label>
                      <select
                        value={sub.lastUsed}
                        onChange={(e) => updateSubscription(sub.id, 'lastUsed', e.target.value)}
                        style={baseStyles.select}
                      >
                        <option value="">Select...</option>
                        {lastUsedOptions.map(o => <option key={o} value={o}>{o}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>
                        Could live without?
                      </label>
                      <select
                        value={sub.canLiveWithout}
                        onChange={(e) => updateSubscription(sub.id, 'canLiveWithout', e.target.value)}
                        style={baseStyles.select}
                      >
                        <option value="">Select...</option>
                        <option value="Yes">Yes</option>
                        <option value="Probably">Probably</option>
                        <option value="No">No</option>
                      </select>
                    </div>
                  </div>
                  {subscriptions.length > 1 && (
                    <button
                      onClick={() => removeSubscription(sub.id)}
                      style={{ ...baseStyles.buttonSecondary, padding: '6px 12px', fontSize: '12px' }}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <button onClick={addSubscription} style={baseStyles.buttonSecondary}>
                + Add another
              </button>
              <button
                onClick={() => setShowResults(true)}
                disabled={validSubs.length === 0}
                style={{
                  ...baseStyles.button,
                  opacity: validSubs.length > 0 ? 1 : 0.5,
                }}
              >
                See Recommendations
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Results summary */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '24px',
              flexWrap: 'wrap',
            }}>
              <div style={{
                flex: 1,
                minWidth: '150px',
                padding: '20px',
                backgroundColor: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: '8px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>Monthly Total</div>
                <div style={{ fontSize: '28px', fontWeight: '700' }}>${totalMonthly.toFixed(2)}</div>
              </div>
              <div style={{
                flex: 1,
                minWidth: '150px',
                padding: '20px',
                backgroundColor: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: '8px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>Annual Total</div>
                <div style={{ fontSize: '28px', fontWeight: '700' }}>${totalAnnual.toFixed(2)}</div>
              </div>
              <div style={{
                flex: 1,
                minWidth: '150px',
                padding: '20px',
                backgroundColor: colors.success + '20',
                border: `2px solid ${colors.success}`,
                borderRadius: '8px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '12px', color: colors.successDark, marginBottom: '4px' }}>Potential Savings</div>
                <div style={{ fontSize: '28px', fontWeight: '700', color: colors.successDark }}>
                  ${potentialSavings.toFixed(2)}/mo
                </div>
                <div style={{ fontSize: '12px', color: colors.successDark }}>
                  ${(potentialSavings * 12).toFixed(2)}/year
                </div>
              </div>
            </div>

            {/* Recommendations list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {validSubs.map(sub => {
                const rec = getRecommendation(sub)
                return (
                  <div
                    key={sub.id}
                    style={{
                      padding: '16px',
                      backgroundColor: theme.surface,
                      border: `1px solid ${theme.border}`,
                      borderRadius: '8px',
                      borderLeft: `4px solid ${rec?.color || colors.success}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '11px',
                          fontWeight: '700',
                          backgroundColor: rec?.color + '20',
                          color: rec?.color,
                        }}>
                          {rec?.action}
                        </span>
                        <span style={{ fontWeight: '600' }}>{sub.name}</span>
                      </div>
                      <div style={{ fontSize: '13px', color: theme.textMuted }}>{rec?.reason}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '700', fontSize: '18px' }}>${parseFloat(sub.cost).toFixed(2)}</div>
                      <div style={{ fontSize: '12px', color: theme.textMuted }}>/month</div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Actions */}
            <div style={{
              padding: '16px',
              backgroundColor: darkMode ? colors.primaryDark + '30' : colors.primary + '10',
              borderRadius: '8px',
              marginBottom: '24px',
            }}>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6 }}>
                Start with the cancels. They're the quickest wins. Then look at what you can cut or combine.
                Even one subscription a month adds up.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <button onClick={copyToClipboard} style={baseStyles.buttonSecondary}>
                Copy List
              </button>
              <button onClick={reset} style={baseStyles.button}>
                Start Over
              </button>
            </div>
          </>
        )}

        {/* Privacy Notice */}
        <div style={{
          marginTop: '48px',
          padding: '24px',
          backgroundColor: darkMode ? colors.primaryDark + '20' : colors.primary + '08',
          borderRadius: '12px',
          textAlign: 'center',
        }}>
          <div style={{ fontSize: '20px', fontWeight: '700', marginBottom: '16px' }}>
            📱 About Your Data
          </div>
          <p style={{ fontSize: '14px', lineHeight: 1.7, marginBottom: '16px', color: theme.text }}>
            Your subscriptions are stored locally in your browser using localStorage. This means your data
            never leaves your device and is completely private. Your subscription list will be saved between
            visits, unless you clear your browser's cache or browsing data.
          </p>
          <p style={{ fontSize: '14px', fontWeight: '600', color: colors.primary, margin: 0 }}>
            Privacy first: We don't collect, track, or send your subscription information anywhere.
            Everything stays on your device.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
