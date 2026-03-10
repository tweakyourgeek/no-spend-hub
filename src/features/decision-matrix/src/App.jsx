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

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true'
    }
    return false
  })

  const [step, setStep] = useState(1)
  const [options, setOptions] = useState(['', ''])
  const [criteria, setCriteria] = useState([{ name: '', weight: 5 }, { name: '', weight: 5 }, { name: '', weight: 5 }])
  const [scores, setScores] = useState({})
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
      outline: 'none',
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

  const addOption = () => {
    if (options.length < 5) {
      setOptions([...options, ''])
    }
  }

  const removeOption = (index) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== index))
    }
  }

  const updateOption = (index, value) => {
    const newOptions = [...options]
    newOptions[index] = value
    setOptions(newOptions)
  }

  const addCriterion = () => {
    if (criteria.length < 6) {
      setCriteria([...criteria, { name: '', weight: 5 }])
    }
  }

  const removeCriterion = (index) => {
    if (criteria.length > 3) {
      setCriteria(criteria.filter((_, i) => i !== index))
    }
  }

  const updateCriterion = (index, field, value) => {
    const newCriteria = [...criteria]
    newCriteria[index] = { ...newCriteria[index], [field]: value }
    setCriteria(newCriteria)
  }

  const updateScore = (optionIndex, criterionIndex, value) => {
    setScores({
      ...scores,
      [`${optionIndex}-${criterionIndex}`]: parseInt(value) || 0
    })
  }

  const getScore = (optionIndex, criterionIndex) => {
    return scores[`${optionIndex}-${criterionIndex}`] || 0
  }

  const calculateResults = () => {
    const validOptions = options.filter(o => o.trim())
    const validCriteria = criteria.filter(c => c.name.trim())

    const results = validOptions.map((option, optionIndex) => {
      let totalScore = 0
      let totalWeight = 0

      validCriteria.forEach((criterion, criterionIndex) => {
        const score = getScore(optionIndex, criterionIndex)
        totalScore += score * criterion.weight
        totalWeight += criterion.weight
      })

      return {
        name: option,
        score: totalWeight > 0 ? totalScore / totalWeight : 0,
        rawScore: totalScore
      }
    })

    return results.sort((a, b) => b.score - a.score)
  }

  const canProceedStep1 = options.filter(o => o.trim()).length >= 2
  const canProceedStep2 = criteria.filter(c => c.name.trim()).length >= 3

  const validOptions = options.filter(o => o.trim())
  const validCriteria = criteria.filter(c => c.name.trim())

  const handleShowResults = () => {
    setShowResults(true)
    setStep(4)
  }

  const reset = () => {
    setStep(1)
    setOptions(['', ''])
    setCriteria([{ name: '', weight: 5 }, { name: '', weight: 5 }, { name: '', weight: 5 }])
    setScores({})
    setShowResults(false)
  }

  const results = showResults ? calculateResults() : []
  const winner = results[0]
  const runnerUp = results[1]
  const isCloseCall = winner && runnerUp && (winner.score - runnerUp.score) < 1

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
          <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>Decision Matrix</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{ ...baseStyles.buttonSecondary, padding: '8px 12px', fontSize: '12px' }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>

        <p style={{ color: theme.textMuted, marginBottom: '24px', fontSize: '14px' }}>
          Stop overthinking. Score your options systematically and let the numbers decide.
        </p>

        {/* Progress indicator */}
        {!showResults && (
          <div style={{
            display: 'flex',
            gap: '16px',
            padding: '16px',
            backgroundColor: darkMode ? colors.primaryDark + '30' : colors.primary + '10',
            borderRadius: '8px',
            marginBottom: '24px',
          }}>
            {[
              { num: 1, label: 'Options' },
              { num: 2, label: 'Criteria' },
              { num: 3, label: 'Score' },
            ].map(s => (
              <div key={s.num} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: step >= s.num ? colors.primary : theme.border,
                  color: step >= s.num ? '#FFFFFF' : theme.textMuted,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  transition: 'all 200ms ease-out',
                }}>
                  {s.num}
                </div>
                <span style={{
                  fontSize: '13px',
                  fontWeight: step === s.num ? '600' : '400',
                  color: step === s.num ? theme.text : theme.textMuted,
                }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Step 1: Options */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>What are you deciding between?</h2>
            <p style={{ color: theme.textMuted, fontSize: '14px', marginBottom: '24px' }}>
              Enter 2-5 options you're considering.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {options.map((option, index) => (
                <div key={index} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    style={baseStyles.input}
                  />
                  {options.length > 2 && (
                    <button
                      onClick={() => removeOption(index)}
                      style={{ ...baseStyles.buttonSecondary, padding: '8px 12px' }}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            {options.length < 5 && (
              <button
                onClick={addOption}
                style={{ ...baseStyles.buttonSecondary, marginBottom: '24px' }}
              >
                + Add option
              </button>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                style={{
                  ...baseStyles.button,
                  opacity: canProceedStep1 ? 1 : 0.5,
                  cursor: canProceedStep1 ? 'pointer' : 'not-allowed',
                }}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Criteria */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>What matters to you?</h2>
            <p style={{ color: theme.textMuted, fontSize: '14px', marginBottom: '24px' }}>
              Add 3-6 criteria. Adjust the weight slider if some matter more than others.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
              {criteria.map((c, index) => (
                <div key={index} style={{ display: 'flex', gap: '12px', alignItems: 'center', flexWrap: 'wrap' }}>
                  <input
                    type="text"
                    value={c.name}
                    onChange={(e) => updateCriterion(index, 'name', e.target.value)}
                    placeholder={`Criterion ${index + 1} (e.g., Cost, Time, Quality)`}
                    style={{ ...baseStyles.input, flex: '1', minWidth: '200px' }}
                  />
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: '150px' }}>
                    <span style={{ fontSize: '12px', color: theme.textMuted }}>Weight:</span>
                    <input
                      type="range"
                      min="1"
                      max="10"
                      value={c.weight}
                      onChange={(e) => updateCriterion(index, 'weight', parseInt(e.target.value))}
                      style={{ width: '80px' }}
                    />
                    <span style={{ fontSize: '12px', fontWeight: '600', minWidth: '20px' }}>{c.weight}</span>
                  </div>
                  {criteria.length > 3 && (
                    <button
                      onClick={() => removeCriterion(index)}
                      style={{ ...baseStyles.buttonSecondary, padding: '8px 12px' }}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>

            {criteria.length < 6 && (
              <button
                onClick={addCriterion}
                style={{ ...baseStyles.buttonSecondary, marginBottom: '24px' }}
              >
                + Add criterion
              </button>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(1)} style={baseStyles.buttonSecondary}>
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!canProceedStep2}
                style={{
                  ...baseStyles.button,
                  opacity: canProceedStep2 ? 1 : 0.5,
                  cursor: canProceedStep2 ? 'pointer' : 'not-allowed',
                }}
              >
                Next →
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Scoring */}
        {step === 3 && (
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Score each option</h2>
            <p style={{ color: theme.textMuted, fontSize: '14px', marginBottom: '24px' }}>
              Rate each option on each criterion (1-10). Don't overthink it.
            </p>

            <div style={{ overflowX: 'auto', marginBottom: '24px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '400px' }}>
                <thead>
                  <tr>
                    <th style={{ padding: '12px', textAlign: 'left', borderBottom: `1px solid ${theme.border}`, fontSize: '14px', fontWeight: '600' }}>
                      Option
                    </th>
                    {validCriteria.map((c, i) => (
                      <th key={i} style={{ padding: '12px', textAlign: 'center', borderBottom: `1px solid ${theme.border}`, fontSize: '12px', fontWeight: '500' }}>
                        {c.name}
                        <br />
                        <span style={{ color: theme.textMuted, fontSize: '10px' }}>wt: {c.weight}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {validOptions.map((option, optionIndex) => (
                    <tr key={optionIndex}>
                      <td style={{ padding: '12px', borderBottom: `1px solid ${theme.border}`, fontSize: '14px', fontWeight: '500' }}>
                        {option}
                      </td>
                      {validCriteria.map((_, criterionIndex) => (
                        <td key={criterionIndex} style={{ padding: '8px', textAlign: 'center', borderBottom: `1px solid ${theme.border}` }}>
                          <select
                            value={getScore(optionIndex, criterionIndex)}
                            onChange={(e) => updateScore(optionIndex, criterionIndex, e.target.value)}
                            style={{
                              ...baseStyles.input,
                              width: '60px',
                              padding: '8px',
                              textAlign: 'center',
                            }}
                          >
                            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                              <option key={n} value={n}>{n}</option>
                            ))}
                          </select>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => setStep(2)} style={baseStyles.buttonSecondary}>
                ← Back
              </button>
              <button onClick={handleShowResults} style={baseStyles.button}>
                Show Results
              </button>
            </div>
          </div>
        )}

        {/* Results */}
        {step === 4 && showResults && (
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '24px' }}>Your Decision</h2>

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
                <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>Options Compared</div>
                <div style={{ fontSize: '28px', fontWeight: '700' }}>{results.length}</div>
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
                <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>Criteria Weighted</div>
                <div style={{ fontSize: '28px', fontWeight: '700' }}>{validCriteria.length}</div>
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
                <div style={{ fontSize: '12px', color: colors.successDark, marginBottom: '4px' }}>Winner</div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: colors.successDark }}>
                  {winner?.name}
                </div>
              </div>
            </div>

            {/* Results list */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {results.map((result, index) => {
                const isWinner = index === 0
                const isRunnerUp = index === 1 && isCloseCall
                const borderColor = isWinner ? colors.success : isRunnerUp ? colors.warning : theme.border

                return (
                  <div
                    key={index}
                    style={{
                      padding: '16px',
                      backgroundColor: theme.surface,
                      border: `1px solid ${theme.border}`,
                      borderRadius: '8px',
                      borderLeft: `4px solid ${borderColor}`,
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: '12px',
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                        {isWinner && (
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '700',
                            backgroundColor: colors.success + '20',
                            color: colors.successDark,
                          }}>
                            WINNER
                          </span>
                        )}
                        {isRunnerUp && (
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: '700',
                            backgroundColor: colors.warning + '20',
                            color: colors.warningDark,
                          }}>
                            CLOSE CALL
                          </span>
                        )}
                        <span style={{ fontWeight: '600' }}>{result.name}</span>
                      </div>
                      <div style={{ fontSize: '13px', color: theme.textMuted }}>
                        Weighted score across {validCriteria.length} criteria
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: '700', fontSize: '24px' }}>{result.score.toFixed(1)}</div>
                      <div style={{ fontSize: '12px', color: theme.textMuted }}>/ 10</div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Advice callout */}
            <div style={{
              padding: '16px',
              backgroundColor: darkMode ? colors.primaryDark + '30' : colors.primary + '10',
              borderRadius: '8px',
              marginBottom: '24px',
            }}>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6 }}>
                {isCloseCall
                  ? `It's close between "${winner?.name}" and "${runnerUp?.name}". Trust your gut on this one, or add another criterion that matters.`
                  : `The decision is clear: ${winner?.name}. More thinking is just noise at this point. Act now.`
                }
              </p>
            </div>

            <button onClick={reset} style={baseStyles.button}>
              Start New Decision
            </button>
          </div>
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
            Your decisions are processed locally in your browser. This means your data
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
