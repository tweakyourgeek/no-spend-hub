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

const questions = [
  { id: 'decision', type: 'text', question: 'What decision are you stuck on?', placeholder: 'Describe what you\'re second-guessing...' },
  { id: 'action', type: 'choice', question: 'What did you do?', options: [
    { value: 'bought', label: 'I bought it' },
    { value: 'didnt', label: 'I didn\'t buy it' },
    { value: 'other', label: 'Other decision' },
  ]},
  { id: 'when', type: 'choice', question: 'How long ago?', options: [
    { value: 'today', label: 'Today' },
    { value: 'yesterday', label: 'Yesterday' },
    { value: 'week', label: 'This week' },
    { value: 'longer', label: 'Longer ago' },
  ]},
  { id: 'loop', type: 'choice', question: 'What\'s the thought loop?', options: [
    { value: 'should', label: '"I should have..."' },
    { value: 'whatif', label: '"What if..."' },
    { value: 'stupid', label: '"I\'m so stupid for..."' },
    { value: 'compare', label: '"Other people would have..."' },
    { value: 'other', label: 'Something else' },
  ]},
  { id: 'changeable', type: 'choice', question: 'Can you change this decision?', options: [
    { value: 'easy', label: 'Yes, easily' },
    { value: 'hassle', label: 'Yes, but it\'s a hassle' },
    { value: 'no', label: 'No, it\'s done' },
  ]},
  { id: 'newinfo', type: 'choice', question: 'Do you have NEW information you didn\'t have before?', options: [
    { value: 'yes', label: 'Yes, something changed' },
    { value: 'no', label: 'No, same info, just doubt' },
  ]},
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
      fontSize: '15px',
      width: '100%',
      boxSizing: 'border-box',
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
      width: '100%',
      textAlign: 'left',
      transition: 'all 150ms ease-out',
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
      width: '100%',
    },
  }

  const q = questions[currentQuestion]
  const progress = (currentQuestion / questions.length) * 100

  const handleTextAnswer = (value) => {
    setAnswers({ ...answers, [q.id]: value })
  }

  const handleChoiceAnswer = (value) => {
    setAnswers({ ...answers, [q.id]: value })
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
      } else {
        setShowResult(true)
      }
    }, 150)
  }

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      setShowResult(true)
    }
  }

  const canProceed = answers[q?.id]

  const analyzeResult = () => {
    const { action, when, loop, changeable, newinfo } = answers

    let isRumination = true
    let message = ''
    let guidance = ''
    let nextStep = null

    const ruminationSigns = []
    const legitimateSigns = []

    if (newinfo === 'no') ruminationSigns.push('No new information')
    if (newinfo === 'yes') legitimateSigns.push('New information available')

    if (when === 'longer') ruminationSigns.push('This was a while ago')
    if (when === 'today') legitimateSigns.push('Recent decision')

    if (loop === 'stupid' || loop === 'compare') ruminationSigns.push('Self-critical thought pattern')
    if (loop === 'whatif' && changeable === 'no') ruminationSigns.push('"What if" about unchangeable situation')

    if (changeable === 'no') ruminationSigns.push('Can\'t change it anyway')
    if (changeable === 'easy' && newinfo === 'yes') legitimateSigns.push('Easy to change with good reason')

    if (changeable === 'no') {
      isRumination = true
      message = 'This decision is done. You\'re not reconsidering, you\'re just replaying.'
      guidance = action === 'bought'
        ? 'You bought it. It\'s bought. The mental energy you\'re spending on regret is worth more than whatever you spent on the thing.'
        : 'You didn\'t buy it. That tab is closed. The imaginary version of your life where you bought it doesn\'t exist.';
    } else if (newinfo === 'yes' && changeable !== 'no') {
      isRumination = false
      message = 'This might be worth revisiting.'
      guidance = 'You have new information, and you can change course. That\'s not rumination, that\'s responsiveness.';
      nextStep = changeable === 'easy'
        ? 'If you want to change it, do it now. Then stop thinking about it.'
        : 'Decide: is it worth the hassle to change? If yes, do it. If no, release it.';
    } else if (newinfo === 'no' && (changeable === 'easy' || changeable === 'hassle')) {
      isRumination = true
      message = 'You\'re ruminating, not reconsidering.'
      guidance = 'You could technically change this, but you don\'t have any new information. You\'re just anxious. The original decision was made with the same info you have now.';
    } else {
      isRumination = true
      message = 'This is rumination.'
      guidance = 'Your brain is doing the thing where it replays decisions looking for a different outcome. There isn\'t one.';
    }

    return { isRumination, message, guidance, nextStep, ruminationSigns, legitimateSigns }
  }

  const reset = () => {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResult(false)
  }

  const result = showResult ? analyzeResult() : null

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
          <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>Rumination Interrupter</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{ ...baseStyles.buttonSecondary, padding: '8px 12px', fontSize: '12px' }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <p style={{ color: theme.textMuted, marginBottom: '24px', fontSize: '14px' }}>
          Stuck in a thought loop about a decision? Let's figure out if this is worth revisiting.
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

            {/* Input */}
            {q.type === 'text' && (
              <div style={{ marginBottom: '24px' }}>
                <textarea
                  value={answers[q.id] || ''}
                  onChange={(e) => handleTextAnswer(e.target.value)}
                  placeholder={q.placeholder}
                  style={{ ...baseStyles.input, minHeight: '100px', resize: 'vertical', fontFamily: 'inherit' }}
                />
                <button
                  onClick={nextQuestion}
                  disabled={!canProceed}
                  style={{
                    ...baseStyles.primaryButton,
                    marginTop: '16px',
                    opacity: canProceed ? 1 : 0.5,
                  }}
                >
                  Next →
                </button>
              </div>
            )}

            {q.type === 'choice' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {q.options.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleChoiceAnswer(option.value)}
                    style={{
                      ...baseStyles.button,
                      backgroundColor: answers[q.id] === option.value ? colors.primary + '15' : 'transparent',
                      borderColor: answers[q.id] === option.value ? colors.primary : theme.border,
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
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
                <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>Can Change?</div>
                <div style={{ fontSize: '16px', fontWeight: '600', textTransform: 'capitalize' }}>{answers.changeable}</div>
              </div>
              <div style={{
                flex: 1,
                minWidth: '150px',
                padding: '20px',
                backgroundColor: result.isRumination ? colors.warning + '20' : colors.success + '20',
                border: `2px solid ${result.isRumination ? colors.warning : colors.success}`,
                borderRadius: '8px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '12px', color: result.isRumination ? colors.warningDark : colors.successDark, marginBottom: '4px' }}>Verdict</div>
                <div style={{ fontSize: '24px' }}>
                  {result.isRumination ? '🔄' : '💡'}
                </div>
              </div>
            </div>

            {/* Result message */}
            <div style={{
              padding: '16px',
              backgroundColor: theme.surface,
              border: `1px solid ${theme.border}`,
              borderRadius: '8px',
              borderLeft: `4px solid ${result.isRumination ? colors.warning : colors.success}`,
              marginBottom: '24px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: '700',
                  backgroundColor: result.isRumination ? colors.warning + '20' : colors.success + '20',
                  color: result.isRumination ? colors.warningDark : colors.successDark,
                }}>
                  {result.isRumination ? 'RUMINATION' : 'WORTH REVISITING'}
                </span>
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>
                {result.message}
              </h2>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6, color: theme.textMuted }}>
                {result.guidance}
              </p>
            </div>

            {/* Next step if applicable */}
            {result.nextStep && (
              <div style={{
                padding: '16px',
                backgroundColor: colors.success + '15',
                border: `1px solid ${colors.success}`,
                borderRadius: '8px',
                marginBottom: '24px',
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '8px', color: colors.successDark }}>Your one next step:</h3>
                <p style={{ margin: 0, fontSize: '14px' }}>{result.nextStep}</p>
              </div>
            )}

            {/* Closure ritual */}
            {result.isRumination && (
              <div style={{
                padding: '16px',
                backgroundColor: darkMode ? colors.primaryDark + '30' : colors.primary + '10',
                borderRadius: '8px',
                marginBottom: '24px',
              }}>
                <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '12px' }}>Closure ritual:</h3>
                <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: theme.textMuted }}>
                  Say this out loud (seriously, out loud):
                </p>
                <div style={{
                  padding: '16px',
                  backgroundColor: theme.surface,
                  borderRadius: '8px',
                  fontSize: '15px',
                  fontStyle: 'italic',
                  lineHeight: 1.6,
                }}>
                  "I made the best decision I could with what I knew at the time. It's done. I'm moving on."
                </div>
              </div>
            )}

            {/* Perspective */}
            <div style={{
              padding: '16px',
              backgroundColor: theme.surface,
              border: `1px solid ${theme.border}`,
              borderRadius: '8px',
              borderLeft: `4px solid ${theme.border}`,
              marginBottom: '24px',
              fontSize: '14px',
              lineHeight: 1.6,
              color: theme.textMuted,
            }}>
              {answers.action === 'bought' ? (
                <>No purchase is worth this much mental real estate. Even if it was a mistake, you've already paid for it. Don't pay again with your peace of mind.</>
              ) : answers.action === 'didnt' ? (
                <>The thing you didn't buy doesn't exist in your life. It never did. You're mourning a fantasy.</>
              ) : (
                <>Decisions feel bigger in hindsight than they actually are. Most of what we agonize over doesn't matter in a month.</>
              )}
            </div>

            <button onClick={reset} style={baseStyles.primaryButton}>
              Start Over
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
            Your thoughts and answers are processed locally in your browser. This means your data
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
