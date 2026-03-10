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

const questions = [
  { id: 'item', type: 'text', question: 'What do you want to buy?', placeholder: 'e.g., New headphones, that sweater, a course...' },
  { id: 'price', type: 'number', question: 'How much is it?', placeholder: '0.00', prefix: '$' },
  { id: 'wanted48h', type: 'choice', question: 'Have you wanted this for more than 48 hours?', options: ['Yes', 'No', 'Just saw it'] },
  { id: 'alreadyOwn', type: 'choice', question: 'Do you already own something that does this?', options: ['Yes', 'No', 'Kind of'] },
  { id: 'need', type: 'select', question: 'What need is this actually meeting?', options: ['Boredom', 'Stress relief', 'Reward/treat', 'Practical need', 'Social pressure', 'FOMO', 'I honestly don\'t know'] },
  { id: 'consequence', type: 'text', question: 'If you don\'t buy this, what actually happens?', placeholder: 'Be honest with yourself...' },
  { id: 'care30days', type: 'slider', question: 'How much will you care about this in 30 days?', min: 1, max: 10 },
]

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true'
    }
    return false
  })

  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResult, setShowResult] = useState(false)

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
      padding: '14px 16px',
      borderRadius: '6px',
      border: `1px solid ${theme.border}`,
      backgroundColor: theme.surface,
      color: theme.text,
      fontSize: '16px',
      width: '100%',
      boxSizing: 'border-box',
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
    choiceButton: {
      padding: '14px 20px',
      borderRadius: '8px',
      border: `2px solid ${theme.border}`,
      backgroundColor: 'transparent',
      color: theme.text,
      fontSize: '15px',
      fontWeight: '500',
      cursor: 'pointer',
      transition: 'all 200ms ease-out',
      flex: 1,
      minWidth: '100px',
    },
  }

  const q = questions[currentQuestion]
  const progress = ((currentQuestion) / questions.length) * 100

  const handleAnswer = (value) => {
    setAnswers({ ...answers, [q.id]: value })
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const canProceed = () => {
    const answer = answers[q?.id]
    if (!answer) return false
    if (q.type === 'text' && !answer.trim()) return false
    if (q.type === 'number' && (!answer || answer <= 0)) return false
    return true
  }

  const calculateResult = () => {
    let score = 0
    const flags = []

    // Wanted for 48+ hours
    if (answers.wanted48h === 'Yes') score += 2
    else if (answers.wanted48h === 'Just saw it') {
      score -= 2
      flags.push('You just saw this')
    }

    // Already own something
    if (answers.alreadyOwn === 'Yes') {
      score -= 2
      flags.push('You already own something similar')
    } else if (answers.alreadyOwn === 'No') score += 1

    // Need type
    if (answers.need === 'Practical need') score += 2
    else if (answers.need === 'Boredom' || answers.need === 'Stress relief') {
      score -= 1
      flags.push(`This is "${answers.need}" spending`)
    } else if (answers.need === 'FOMO') {
      score -= 2
      flags.push('FOMO is driving this')
    } else if (answers.need === 'I honestly don\'t know') {
      score -= 1
      flags.push('You\'re not sure why you want it')
    }

    // Care in 30 days
    const care = parseInt(answers.care30days) || 5
    if (care >= 8) score += 2
    else if (care <= 3) {
      score -= 2
      flags.push(`You rated caring about this a ${care}/10 in 30 days`)
    }

    // Determine verdict
    let verdict, color, message
    if (score >= 3) {
      verdict = 'go'
      color = colors.success
      message = 'This seems like a considered purchase. If you have the budget, go for it.'
    } else if (score >= 0) {
      verdict = 'wait'
      color = colors.warning
      message = 'This might be emotional spending. Wait 48 hours and see if you still want it.'
    } else {
      verdict = 'stop'
      color = colors.danger
      message = 'This has impulse buy written all over it. Close the tab.'
    }

    return { verdict, color, message, flags, score }
  }

  const reset = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResult(false)
  }

  const result = showResult ? calculateResult() : null

  const getVerdictLabel = () => {
    if (result.verdict === 'go') return 'PROBABLY FINE'
    if (result.verdict === 'wait') return 'WAIT 48 HOURS'
    return 'CLOSE THE TAB'
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
          <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>Talk Me Out</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{ ...baseStyles.buttonSecondary, padding: '8px 12px', fontSize: '12px' }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <p style={{ color: theme.textMuted, marginBottom: '24px', fontSize: '14px' }}>
          Let's figure out if you actually need this, or if your brain is just bored.
        </p>

        {!showResult ? (
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
              <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0, lineHeight: 1.4 }}>
                {q.question}
              </h2>
            </div>

            {/* Input based on type */}
            <div style={{ marginBottom: '24px' }}>
              {q.type === 'text' && (
                <input
                  type="text"
                  value={answers[q.id] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  placeholder={q.placeholder}
                  style={baseStyles.input}
                  autoFocus
                />
              )}

              {q.type === 'number' && (
                <div style={{ position: 'relative' }}>
                  <span style={{
                    position: 'absolute',
                    left: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: theme.textMuted,
                    fontSize: '16px',
                  }}>$</span>
                  <input
                    type="number"
                    value={answers[q.id] || ''}
                    onChange={(e) => handleAnswer(e.target.value)}
                    placeholder={q.placeholder}
                    style={{ ...baseStyles.input, paddingLeft: '32px' }}
                    autoFocus
                  />
                </div>
              )}

              {q.type === 'choice' && (
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  {q.options.map(option => (
                    <button
                      key={option}
                      onClick={() => handleAnswer(option)}
                      style={{
                        ...baseStyles.choiceButton,
                        backgroundColor: answers[q.id] === option ? colors.primary + '20' : 'transparent',
                        borderColor: answers[q.id] === option ? colors.primary : theme.border,
                        color: answers[q.id] === option ? colors.primary : theme.text,
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}

              {q.type === 'select' && (
                <select
                  value={answers[q.id] || ''}
                  onChange={(e) => handleAnswer(e.target.value)}
                  style={{ ...baseStyles.input, cursor: 'pointer' }}
                >
                  <option value="">Select one...</option>
                  {q.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}

              {q.type === 'slider' && (
                <div>
                  <input
                    type="range"
                    min={q.min}
                    max={q.max}
                    value={answers[q.id] || 5}
                    onChange={(e) => handleAnswer(e.target.value)}
                    style={{ width: '100%', marginBottom: '12px' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                    <span style={{ color: theme.textMuted }}>Won't care at all</span>
                    <span style={{ fontWeight: '700', fontSize: '24px' }}>{answers[q.id] || 5}</span>
                    <span style={{ color: theme.textMuted }}>Still love it</span>
                  </div>
                </div>
              )}
            </div>

            {/* Next button */}
            <button
              onClick={nextQuestion}
              disabled={!canProceed()}
              style={{
                ...baseStyles.button,
                opacity: canProceed() ? 1 : 0.5,
                cursor: canProceed() ? 'pointer' : 'not-allowed',
              }}
            >
              {currentQuestion === questions.length - 1 ? 'See Verdict' : 'Next →'}
            </button>
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
                <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>Item</div>
                <div style={{ fontSize: '16px', fontWeight: '600', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {answers.item}
                </div>
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
                <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>Price</div>
                <div style={{ fontSize: '28px', fontWeight: '700' }}>${answers.price}</div>
              </div>
              <div style={{
                flex: 1,
                minWidth: '150px',
                padding: '20px',
                backgroundColor: result.color + '20',
                border: `2px solid ${result.color}`,
                borderRadius: '8px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '12px', color: result.color, marginBottom: '4px' }}>Verdict</div>
                <div style={{ fontSize: '18px', fontWeight: '700', color: result.color }}>
                  {getVerdictLabel()}
                </div>
              </div>
            </div>

            {/* Result message */}
            <div style={{
              padding: '16px',
              backgroundColor: result.color + '15',
              border: `1px solid ${result.color}`,
              borderRadius: '8px',
              marginBottom: '24px',
            }}>
              <p style={{ margin: 0, fontSize: '15px', lineHeight: 1.6 }}>
                {result.message}
              </p>
            </div>

            {/* Flags */}
            {result.flags.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>What flagged this:</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {result.flags.map((flag, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '16px',
                        backgroundColor: theme.surface,
                        borderRadius: '8px',
                        border: `1px solid ${theme.border}`,
                        borderLeft: `4px solid ${colors.warning}`,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                      }}
                    >
                      <span style={{
                        padding: '4px 10px',
                        borderRadius: '12px',
                        fontSize: '11px',
                        fontWeight: '700',
                        backgroundColor: colors.warning + '20',
                        color: colors.warningDark,
                      }}>
                        FLAG
                      </span>
                      <span style={{ fontSize: '14px' }}>{flag}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Coffee comparison */}
            <div style={{
              padding: '16px',
              backgroundColor: darkMode ? colors.primaryDark + '30' : colors.primary + '10',
              borderRadius: '8px',
              marginBottom: '24px',
            }}>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6 }}>
                ${answers.price} = {Math.round(answers.price / 5)} fancy coffees, if you're keeping score.
              </p>
            </div>

            <button onClick={reset} style={baseStyles.button}>
              Check Another Purchase
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
            Your purchase decisions are processed locally in your browser. This means your data
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
