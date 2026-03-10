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
}

const patterns = {
  rainbows: {
    name: 'Chasing Rainbows',
    emoji: '🌈',
    color: '#9B59B6',
    description: 'You buy the next fix, the next solution, the next thing that will finally make it all work.',
    belief: '"This course/tool/resource will finally make it work."',
    strategy: 'CANCEL the collecting. Work with what you already have before buying more.',
    watchFor: [
      'Cart full of "potential"',
      'Unused courses and tools',
      'Saying "this one is different"',
      'Research spirals before buying',
    ],
  },
  unicorns: {
    name: 'Chasing Unicorns',
    emoji: '🦄',
    color: '#3498DB',
    description: 'You research endlessly trying to find the perfect option. You buy to become who you think you should be.',
    belief: '"I need this to be the version of myself I\'m supposed to be."',
    strategy: 'CUT the comparison shopping. Choose "enough" instead of perfect.',
    watchFor: [
      '47 browser tabs of options',
      'Waiting for the "right" one',
      'Buying for aspirational self',
      'Never feeling ready without the thing',
    ],
  },
  ambrosia: {
    name: 'Chasing Ambrosia',
    emoji: '🍷',
    color: '#E74C3C',
    description: 'You buy to change how you feel. Shopping is soothing, numbing, or regulating.',
    belief: '"This purchase will fix how I feel."',
    strategy: 'CUT the frequency. Build a comfort menu of non-spending ways to regulate.',
    watchFor: [
      'Shopping when stressed or sad',
      'The cart as emotional support',
      'Buying to feel in control',
      'Purchase highs followed by guilt',
    ],
  },
  stardust: {
    name: 'Chasing Stardust',
    emoji: '✨',
    color: '#F39C12',
    description: 'You buy to look more professional, organized, or legitimate. Aesthetic over function.',
    belief: '"I need this to be taken seriously / be who I already am."',
    strategy: 'CANCEL the upgrades. You do not need new tools to be who you already are.',
    watchFor: [
      'Buying "professional" versions',
      'Aesthetic-driven purchases',
      'Upgrading perfectly good things',
      'Spending to match an image',
    ],
  },
  sunshine: {
    name: 'Chasing Sunshine',
    emoji: '☀️',
    color: '#E67E22',
    description: 'You buy small treats and rewards. "I deserve this" is your mantra. They add up.',
    belief: '"I\'ve earned this. I deserve a treat."',
    strategy: 'CUT to 1-2 treats per week. Change the state, not the cart.',
    watchFor: [
      'Small frequent purchases',
      'Rewarding yourself after hard days',
      '"Just this one thing"',
      'Surprise at monthly totals',
    ],
  },
  moonbeams: {
    name: 'Chasing Moonbeams',
    emoji: '🌙',
    color: '#1ABC9C',
    description: 'You buy for an imagined future life. Fantasy purchases for "when I..." thinking.',
    belief: '"When I have this, then I\'ll finally..."',
    strategy: 'CANCEL the fantasy buys. Keep a "someday" list but don\'t purchase.',
    watchFor: [
      'Buying for imagined scenarios',
      '"When I lose weight / move / get organized"',
      'Items with tags still on',
      'Closet full of unused potential',
    ],
  },
}

const questions = [
  {
    question: 'When I\'m stressed, I\'m most likely to:',
    options: [
      { text: 'Browse for something that might help me feel better', pattern: 'ambrosia' },
      { text: 'Research a new tool or course that could solve my problem', pattern: 'rainbows' },
      { text: 'Treat myself to something small as a reward for getting through it', pattern: 'sunshine' },
      { text: 'Window shop for things I\'d buy "someday"', pattern: 'moonbeams' },
    ],
  },
  {
    question: 'My browser history probably shows:',
    options: [
      { text: 'Multiple tabs comparing very similar products', pattern: 'unicorns' },
      { text: 'Courses, tools, and resources I\'ve bookmarked', pattern: 'rainbows' },
      { text: 'Aesthetic inspiration and "upgrade" ideas', pattern: 'stardust' },
      { text: 'Daydream purchases for a future version of my life', pattern: 'moonbeams' },
    ],
  },
  {
    question: 'The purchases I regret most are usually:',
    options: [
      { text: 'Courses or tools I never used', pattern: 'rainbows' },
      { text: 'Things I bought to look more professional or put together', pattern: 'stardust' },
      { text: 'Emotional purchases made when I was stressed or sad', pattern: 'ambrosia' },
      { text: 'Items for hobbies or projects I never started', pattern: 'moonbeams' },
    ],
  },
  {
    question: 'I tell myself "this is different because...":',
    options: [
      { text: 'This one will actually work / is the right solution', pattern: 'rainbows' },
      { text: 'This is the best option after all my research', pattern: 'unicorns' },
      { text: 'I really need this for my image / business / credibility', pattern: 'stardust' },
      { text: 'I\'ve earned it / I deserve something nice', pattern: 'sunshine' },
    ],
  },
  {
    question: 'After buying something, I usually feel:',
    options: [
      { text: 'Hopeful that this will be the thing that changes everything', pattern: 'rainbows' },
      { text: 'Relieved that the decision is finally made', pattern: 'unicorns' },
      { text: 'A brief high followed by mild guilt', pattern: 'ambrosia' },
      { text: 'Excited about who I\'ll become when I use it', pattern: 'moonbeams' },
    ],
  },
  {
    question: 'If I\'m honest, I often buy things:',
    options: [
      { text: 'To regulate my emotions or change my mood', pattern: 'ambrosia' },
      { text: 'To feel more legitimate or professional', pattern: 'stardust' },
      { text: 'As small rewards throughout the day or week', pattern: 'sunshine' },
      { text: 'For a future life I\'m not living yet', pattern: 'moonbeams' },
    ],
  },
  {
    question: 'When I see something I want, I typically:',
    options: [
      { text: 'Research extensively to find the perfect version', pattern: 'unicorns' },
      { text: 'Justify it as an investment in myself or my work', pattern: 'stardust' },
      { text: 'Buy it quickly before I talk myself out of it', pattern: 'sunshine' },
      { text: 'Add it to a list and dream about having it', pattern: 'moonbeams' },
    ],
  },
  {
    question: 'My spending increases when:',
    options: [
      { text: 'I feel behind or like I\'m not where I should be', pattern: 'unicorns' },
      { text: 'I\'m emotionally depleted or need comfort', pattern: 'ambrosia' },
      { text: 'I feel like I\'ve worked hard and deserve rewards', pattern: 'sunshine' },
      { text: 'I\'m daydreaming about a different life', pattern: 'moonbeams' },
    ],
  },
  {
    question: 'My closet/office/home contains:',
    options: [
      { text: 'Courses, books, and tools I bought but haven\'t used', pattern: 'rainbows' },
      { text: 'Carefully researched "best" versions of things', pattern: 'unicorns' },
      { text: 'Professional or aesthetic items that upgrade my image', pattern: 'stardust' },
      { text: 'Things for hobbies or phases that never happened', pattern: 'moonbeams' },
    ],
  },
  {
    question: 'The phrase that resonates most:',
    options: [
      { text: '"This will finally be the solution"', pattern: 'rainbows' },
      { text: '"I just need to find the right one"', pattern: 'unicorns' },
      { text: '"I need this to be taken seriously"', pattern: 'stardust' },
      { text: '"I\'ve earned a little treat"', pattern: 'sunshine' },
    ],
  },
]

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true'
    }
    return false
  })

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState([])
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
    button: {
      padding: '14px 20px',
      borderRadius: '8px',
      border: `2px solid ${theme.border}`,
      backgroundColor: 'transparent',
      color: theme.text,
      fontSize: '15px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 200ms ease-out',
      width: '100%',
      textAlign: 'left',
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
    primaryButton: {
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: colors.primary,
      color: '#FFFFFF',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
    },
  }

  const handleAnswer = (pattern) => {
    const newAnswers = [...answers, pattern]
    setAnswers(newAnswers)

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResults(true)
    }
  }

  const calculateResults = () => {
    const counts = {}
    answers.forEach(pattern => {
      counts[pattern] = (counts[pattern] || 0) + 1
    })

    const sorted = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .map(([pattern, count]) => ({
        pattern,
        count,
        percentage: Math.round((count / answers.length) * 100),
        ...patterns[pattern],
      }))

    return sorted
  }

  const reset = () => {
    setCurrentQuestion(0)
    setAnswers([])
    setShowResults(false)
  }

  const progress = ((currentQuestion) / questions.length) * 100
  const results = showResults ? calculateResults() : []
  const primaryPattern = results[0]
  const secondaryPattern = results[1]

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
          <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>Trigger Decoder</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{ ...baseStyles.buttonSecondary, padding: '8px 12px', fontSize: '12px' }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <p style={{ color: theme.textMuted, marginBottom: '24px', fontSize: '14px' }}>
          Discover which of the 6 Chasing Patterns drives your spending.
        </p>

        {!showResults ? (
          <>
            {/* Progress indicator */}
            <div style={{
              display: 'flex',
              gap: '16px',
              padding: '16px',
              backgroundColor: darkMode ? colors.primaryDark + '30' : colors.primary + '10',
              borderRadius: '8px',
              marginBottom: '24px',
              alignItems: 'center',
            }}>
              <div style={{
                flex: 1,
                height: '4px',
                backgroundColor: theme.border,
                borderRadius: '2px',
                overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%',
                  width: `${progress}%`,
                  backgroundColor: colors.primary,
                  transition: 'width 300ms ease-out',
                }} />
              </div>
              <span style={{ fontSize: '13px', color: theme.textMuted, whiteSpace: 'nowrap' }}>
                {currentQuestion + 1} of {questions.length}
              </span>
            </div>

            {/* Question */}
            <div style={{ marginBottom: '24px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, lineHeight: 1.5 }}>
                {questions[currentQuestion].question}
              </h2>
            </div>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option.pattern)}
                  style={baseStyles.button}
                  onMouseEnter={(e) => {
                    e.target.style.borderColor = colors.primary
                    e.target.style.backgroundColor = colors.primary + '10'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.borderColor = theme.border
                    e.target.style.backgroundColor = 'transparent'
                  }}
                >
                  {option.text}
                </button>
              ))}
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
                <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>Questions</div>
                <div style={{ fontSize: '28px', fontWeight: '700' }}>{questions.length}</div>
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
                <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>Patterns Found</div>
                <div style={{ fontSize: '28px', fontWeight: '700' }}>{results.length}</div>
              </div>
              <div style={{
                flex: 1,
                minWidth: '150px',
                padding: '20px',
                backgroundColor: primaryPattern.color + '20',
                border: `2px solid ${primaryPattern.color}`,
                borderRadius: '8px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '12px', color: primaryPattern.color, marginBottom: '4px' }}>Primary Pattern</div>
                <div style={{ fontSize: '24px' }}>{primaryPattern.emoji}</div>
              </div>
            </div>

            {/* Primary pattern card */}
            <div style={{
              padding: '16px',
              backgroundColor: theme.surface,
              borderRadius: '8px',
              border: `1px solid ${theme.border}`,
              borderLeft: `4px solid ${primaryPattern.color}`,
              marginBottom: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '700',
                  backgroundColor: primaryPattern.color + '20',
                  color: primaryPattern.color,
                }}>
                  PRIMARY
                </span>
                <span style={{ fontWeight: '600', fontSize: '16px' }}>{primaryPattern.name}</span>
                <span style={{ marginLeft: 'auto', fontSize: '14px', color: theme.textMuted }}>{primaryPattern.percentage}%</span>
              </div>
              <p style={{ margin: '0 0 16px 0', fontSize: '14px', lineHeight: 1.6, color: theme.textMuted }}>
                {primaryPattern.description}
              </p>
              <p style={{
                margin: '0 0 16px 0',
                fontSize: '13px',
                fontStyle: 'italic',
                color: theme.textMuted,
              }}>
                Core belief: {primaryPattern.belief}
              </p>
              <div style={{
                padding: '12px 16px',
                backgroundColor: colors.success + '15',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                color: colors.successDark,
              }}>
                C3 Strategy: {primaryPattern.strategy}
              </div>
            </div>

            {/* Watch for */}
            <div style={{ marginBottom: '24px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Watch for:</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {primaryPattern.watchFor.map((item, i) => (
                  <div
                    key={i}
                    style={{
                      padding: '12px 16px',
                      backgroundColor: theme.surface,
                      borderRadius: '8px',
                      border: `1px solid ${theme.border}`,
                      borderLeft: `4px solid ${colors.warning}`,
                      fontSize: '14px',
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Secondary pattern if significant */}
            {secondaryPattern && secondaryPattern.percentage >= 20 && (
              <div style={{
                padding: '16px',
                backgroundColor: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: '8px',
                borderLeft: `4px solid ${secondaryPattern.color}`,
                marginBottom: '24px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '700',
                    backgroundColor: secondaryPattern.color + '20',
                    color: secondaryPattern.color,
                  }}>
                    SECONDARY
                  </span>
                  <span style={{ fontWeight: '600' }}>{secondaryPattern.name}</span>
                  <span style={{ fontSize: '18px' }}>{secondaryPattern.emoji}</span>
                  <span style={{ marginLeft: 'auto', fontSize: '14px', color: theme.textMuted }}>{secondaryPattern.percentage}%</span>
                </div>
                <p style={{ margin: 0, fontSize: '13px', color: theme.textMuted }}>
                  {secondaryPattern.description}
                </p>
              </div>
            )}

            {/* All results breakdown */}
            <div style={{
              padding: '16px',
              backgroundColor: darkMode ? colors.primaryDark + '30' : colors.primary + '10',
              borderRadius: '8px',
              marginBottom: '24px',
            }}>
              <p style={{ margin: '0 0 12px 0', fontSize: '13px', fontWeight: '600' }}>Your pattern breakdown:</p>
              {results.map(r => (
                <div key={r.pattern} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '14px', width: '24px' }}>{r.emoji}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      height: '8px',
                      backgroundColor: theme.border,
                      borderRadius: '4px',
                      overflow: 'hidden',
                    }}>
                      <div style={{
                        height: '100%',
                        width: `${r.percentage}%`,
                        backgroundColor: r.color,
                        borderRadius: '4px',
                      }} />
                    </div>
                  </div>
                  <span style={{ fontSize: '12px', color: theme.textMuted, minWidth: '36px', textAlign: 'right' }}>{r.percentage}%</span>
                </div>
              ))}
            </div>

            <button onClick={reset} style={baseStyles.primaryButton}>
              Take Again
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
            Your quiz results are processed locally in your browser. This means your data
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
