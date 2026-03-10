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

const tactics = [
  {
    id: 'urgency',
    name: 'Urgency/Scarcity',
    color: '#E74C3C',
    patterns: [
      /only \d+ left/gi,
      /limited (time|quantity|spots|availability)/gi,
      /ends (tonight|today|soon|tomorrow|in \d+)/gi,
      /hurry/gi,
      /act (now|fast|quickly)/gi,
      /don't (wait|miss|delay)/gi,
      /last chance/gi,
      /final (hours|day|chance)/gi,
      /closing (soon|today)/gi,
      /expires/gi,
      /running out/gi,
      /while (supplies|stocks?) last/gi,
      /deadline/gi,
    ],
    description: 'Creates pressure to act immediately by suggesting limited availability or time.',
  },
  {
    id: 'social_proof',
    name: 'Social Proof',
    color: '#3498DB',
    patterns: [
      /\d+[,\d]*\+?\s*(customers|users|people|members|subscribers|downloads|sales)/gi,
      /join(ing)?\s*\d+/gi,
      /as seen (on|in)/gi,
      /featured (in|on)/gi,
      /trusted by/gi,
      /(best ?sell(er|ing)|top.rated)/gi,
      /everyone('s| is)/gi,
      /thousands of/gi,
      /millions of/gi,
      /community of/gi,
    ],
    description: 'Uses numbers or popularity to suggest you should follow the crowd.',
  },
  {
    id: 'authority',
    name: 'Authority',
    color: '#9B59B6',
    patterns: [
      /expert[s]?\s*(recommend|approved|endorsed)/gi,
      /doctor[s]?\s*(recommend|approved)/gi,
      /scientifically (proven|backed)/gi,
      /research (shows|proves|confirms)/gi,
      /studies (show|prove)/gi,
      /award.winning/gi,
      /certified/gi,
      /official/gi,
      /endorsed by/gi,
      /recommended by/gi,
      /approved by/gi,
    ],
    description: 'Leverages expertise or credentials to build trust.',
  },
  {
    id: 'fomo',
    name: 'FOMO',
    color: '#E67E22',
    patterns: [
      /don't miss (out|this)/gi,
      /missing out/gi,
      /before (it's gone|they're gone|you miss)/gi,
      /others are (already|buying|joining)/gi,
      /everyone else/gi,
      /left behind/gi,
      /exclusive (access|offer|deal)/gi,
      /get (in|access) (before|while)/gi,
      /be (the first|among the first)/gi,
    ],
    description: 'Triggers fear of missing out on something valuable.',
  },
  {
    id: 'anchoring',
    name: 'Price Anchoring',
    color: '#1ABC9C',
    patterns: [
      /\$\d+[,\d]*\s*(value|worth)/gi,
      /was \$\d+/gi,
      /originally \$\d+/gi,
      /regular(ly)? \$\d+/gi,
      /save \$?\d+/gi,
      /\d+%\s*off/gi,
      /compare (at|to) \$\d+/gi,
      /valued at/gi,
      /normally \$\d+/gi,
      /retail \$\d+/gi,
    ],
    description: 'Shows a higher price first to make the actual price seem like a deal.',
  },
  {
    id: 'future_pacing',
    name: 'Future Pacing',
    color: '#2ECC71',
    patterns: [
      /imagine (yourself|your|if|when|having)/gi,
      /picture (yourself|this|your)/gi,
      /think about (how|what|when)/gi,
      /in (just )?\d+ (days|weeks|months)/gi,
      /what if you could/gi,
      /you('ll| will) (be|have|feel|see)/gi,
      /finally (be|have|feel)/gi,
      /wake up (to|with|feeling)/gi,
      /this time (next|tomorrow)/gi,
    ],
    description: 'Gets you to visualize a better future self to create emotional attachment.',
  },
  {
    id: 'pain_agitation',
    name: 'Pain Point Agitation',
    color: '#C0392B',
    patterns: [
      /tired of/gi,
      /sick of/gi,
      /frustrated (with|by)/gi,
      /struggling (with|to)/gi,
      /suffering from/gi,
      /stuck (in|with|on)/gi,
      /overwhelmed/gi,
      /stress(ed|ing)/gi,
      /problem(s)? (with|like)/gi,
      /pain (of|from)/gi,
      /hate (having to|when|that)/gi,
      /fed up/gi,
    ],
    description: 'Amplifies your current problems to make the solution feel more necessary.',
  },
  {
    id: 'exclusivity',
    name: 'False Exclusivity',
    color: '#8E44AD',
    patterns: [
      /not for everyone/gi,
      /only for (serious|dedicated|committed)/gi,
      /exclusive (to|for|access)/gi,
      /invitation only/gi,
      /private (access|group|community)/gi,
      /vip/gi,
      /elite/gi,
      /hand.?picked/gi,
      /select (few|group)/gi,
      /inner circle/gi,
    ],
    description: 'Makes you feel special or part of an elite group.',
  },
  {
    id: 'bandwagon',
    name: 'Bandwagon Effect',
    color: '#16A085',
    patterns: [
      /everyone (is|loves|wants)/gi,
      /trending/gi,
      /viral/gi,
      /most popular/gi,
      /best.?selling/gi,
      /people (are|love|can't stop)/gi,
      /going crazy/gi,
      /taking over/gi,
      /sweeping the/gi,
      /the new/gi,
    ],
    description: 'Suggests something is popular to trigger herd mentality.',
  },
  {
    id: 'risk_reversal',
    name: 'Risk Reversal',
    color: '#27AE60',
    patterns: [
      /money.?back guarantee/gi,
      /risk.?free/gi,
      /no.?risk/gi,
      /full refund/gi,
      /cancel (anytime|any time)/gi,
      /no (questions asked|strings attached)/gi,
      /try (it )?(for )?free/gi,
      /free trial/gi,
      /satisfaction guaranteed/gi,
      /nothing to lose/gi,
      /\d+.?day (guarantee|refund|return)/gi,
    ],
    description: 'Removes perceived risk to make saying yes feel safer.',
  },
  {
    id: 'reciprocity',
    name: 'Reciprocity Trigger',
    color: '#F39C12',
    patterns: [
      /free (gift|bonus|guide|ebook|resource)/gi,
      /bonus(es)? (included|worth)/gi,
      /we('ll| will) (give|include|throw in)/gi,
      /yours free/gi,
      /complimentary/gi,
      /on (the house|us)/gi,
      /no (charge|cost)/gi,
      /as (a|our) (gift|thank you)/gi,
      /added bonus/gi,
    ],
    description: 'Offers something "free" to create obligation to reciprocate.',
  },
]

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true'
    }
    return false
  })

  const [inputText, setInputText] = useState('')
  const [results, setResults] = useState(null)

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
    textarea: {
      padding: '16px',
      borderRadius: '6px',
      border: `1px solid ${theme.border}`,
      backgroundColor: theme.surface,
      color: theme.text,
      fontSize: '14px',
      width: '100%',
      minHeight: '200px',
      boxSizing: 'border-box',
      resize: 'vertical',
      fontFamily: 'inherit',
      lineHeight: '1.6',
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

  const analyzeText = () => {
    if (!inputText.trim()) return

    const foundTactics = []

    tactics.forEach(tactic => {
      const tacticMatches = []
      tactic.patterns.forEach(pattern => {
        const found = inputText.match(pattern)
        if (found) {
          tacticMatches.push(...found)
        }
      })
      if (tacticMatches.length > 0) {
        foundTactics.push({
          ...tactic,
          matches: [...new Set(tacticMatches)],
        })
      }
    })

    const primaryPurpose = foundTactics.length > 0
      ? getPrimaryPurpose(foundTactics)
      : 'No obvious manipulation tactics detected.'

    setResults({
      tactics: foundTactics,
      count: foundTactics.length,
      primaryPurpose,
      totalMatches: foundTactics.reduce((sum, t) => sum + t.matches.length, 0),
    })
  }

  const getPrimaryPurpose = (foundTactics) => {
    const purposes = []
    if (foundTactics.find(t => t.id === 'urgency' || t.id === 'fomo')) {
      purposes.push('create urgency')
    }
    if (foundTactics.find(t => t.id === 'social_proof' || t.id === 'bandwagon')) {
      purposes.push('leverage social proof')
    }
    if (foundTactics.find(t => t.id === 'pain_agitation')) {
      purposes.push('amplify your pain points')
    }
    if (foundTactics.find(t => t.id === 'future_pacing')) {
      purposes.push('make you visualize results')
    }
    if (foundTactics.find(t => t.id === 'anchoring')) {
      purposes.push('make the price seem like a steal')
    }
    if (foundTactics.find(t => t.id === 'risk_reversal')) {
      purposes.push('remove your objections')
    }
    if (foundTactics.find(t => t.id === 'exclusivity')) {
      purposes.push('make you feel special')
    }
    if (foundTactics.find(t => t.id === 'reciprocity')) {
      purposes.push('create a sense of obligation')
    }

    if (purposes.length === 0) return 'influence your decision'
    if (purposes.length === 1) return purposes[0]
    if (purposes.length === 2) return purposes.join(' and ')
    return purposes.slice(0, -1).join(', ') + ', and ' + purposes.slice(-1)
  }

  const reset = () => {
    setInputText('')
    setResults(null)
  }

  const getManipulationLevel = () => {
    if (results.count === 0) return { label: 'CLEAN', color: colors.success }
    if (results.count <= 2) return { label: 'LIGHT', color: colors.info }
    if (results.count <= 4) return { label: 'MODERATE', color: colors.warning }
    return { label: 'HEAVY', color: colors.danger }
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
          <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>Marketing Decoder</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{ ...baseStyles.buttonSecondary, padding: '8px 12px', fontSize: '12px' }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <p style={{ color: theme.textMuted, marginBottom: '24px', fontSize: '14px' }}>
          Paste marketing copy to see what persuasion tactics are being used on you.
        </p>

        {!results ? (
          <>
            {/* Intro callout */}
            <div style={{
              padding: '16px',
              backgroundColor: darkMode ? colors.primaryDark + '30' : colors.primary + '10',
              borderRadius: '8px',
              marginBottom: '24px',
            }}>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6 }}>
                Emails, ads, sales pages, anywhere someone wants your money.
                We'll show you exactly what psychological triggers they're pulling.
              </p>
            </div>

            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste the marketing text here..."
              style={baseStyles.textarea}
            />

            <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={analyzeText}
                disabled={!inputText.trim()}
                style={{
                  ...baseStyles.button,
                  opacity: inputText.trim() ? 1 : 0.5,
                  cursor: inputText.trim() ? 'pointer' : 'not-allowed',
                }}
              >
                Decode This
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Stats summary */}
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
                <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>Tactics Found</div>
                <div style={{ fontSize: '28px', fontWeight: '700' }}>{results.count}</div>
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
                <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>Total Triggers</div>
                <div style={{ fontSize: '28px', fontWeight: '700' }}>{results.totalMatches}</div>
              </div>
              <div style={{
                flex: 1,
                minWidth: '150px',
                padding: '20px',
                backgroundColor: getManipulationLevel().color + '20',
                border: `2px solid ${getManipulationLevel().color}`,
                borderRadius: '8px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '12px', color: getManipulationLevel().color, marginBottom: '4px' }}>Manipulation Level</div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: getManipulationLevel().color }}>
                  {getManipulationLevel().label}
                </div>
              </div>
            </div>

            {/* Primary purpose */}
            {results.count > 0 && (
              <div style={{
                padding: '16px',
                backgroundColor: colors.warning + '15',
                border: `1px solid ${colors.warning}`,
                borderRadius: '8px',
                marginBottom: '24px',
              }}>
                <p style={{ margin: 0, fontSize: '14px' }}>
                  <span style={{ fontWeight: '600' }}>Primary goal:</span> {results.primaryPurpose}
                </p>
              </div>
            )}

            {/* Found tactics */}
            {results.tactics.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>What they're doing:</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {results.tactics.map(tactic => (
                    <div
                      key={tactic.id}
                      style={{
                        padding: '16px',
                        backgroundColor: theme.surface,
                        borderRadius: '8px',
                        border: `1px solid ${theme.border}`,
                        borderLeft: `4px solid ${tactic.color}`,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                        <span
                          style={{
                            backgroundColor: tactic.color + '20',
                            color: tactic.color,
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '700',
                          }}
                        >
                          {tactic.name}
                        </span>
                        <span style={{
                          fontSize: '12px',
                          color: theme.textMuted,
                        }}>
                          {tactic.matches.length} instance{tactic.matches.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: theme.textMuted }}>
                        {tactic.description}
                      </p>
                      <div style={{ fontSize: '13px' }}>
                        <span style={{ fontWeight: '500' }}>Found: </span>
                        <span style={{ color: theme.textMuted, fontStyle: 'italic' }}>
                          "{tactic.matches.slice(0, 3).join('", "')}"
                          {tactic.matches.length > 3 && ` +${tactic.matches.length - 3} more`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Closure */}
            <div style={{
              padding: '16px',
              backgroundColor: darkMode ? colors.primaryDark + '30' : colors.primary + '10',
              borderRadius: '8px',
              marginBottom: '24px',
            }}>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6 }}>
                {results.count === 0
                  ? "No obvious manipulation tactics detected. Either it's straightforward, or they're being subtle."
                  : "Now you see it. The question isn't whether they're trying to persuade you. The question is whether what they're selling actually solves a real problem you have."
                }
              </p>
            </div>

            <button onClick={reset} style={baseStyles.button}>
              Decode Another
            </button>
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
            The marketing text you paste is analyzed locally in your browser. This means your data
            never leaves your device and is completely private.
          </p>
          <p style={{ fontSize: '14px', fontWeight: '600', color: colors.primary, margin: 0 }}>
            Privacy first: We don't collect, track, or send your information anywhere.
            Everything stays on your device.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
