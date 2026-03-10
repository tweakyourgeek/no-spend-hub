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

const activities = [
  { name: 'Take a 10-minute walk around the block', category: 'movement', energy: ['low', 'medium', 'high'], mood: ['bored', 'stressed', 'restless', 'overwhelmed'], time: 15, location: 'outdoor', social: 'solo' },
  { name: 'Do a quick stretch routine', category: 'movement', energy: ['depleted', 'low', 'medium'], mood: ['stressed', 'restless', 'overwhelmed'], time: 10, location: 'indoor', social: 'solo' },
  { name: 'Dance to 3 songs', category: 'movement', energy: ['medium', 'high'], mood: ['bored', 'stressed', 'need reward'], time: 15, location: 'indoor', social: 'solo' },
  { name: 'Do jumping jacks until you can\'t', category: 'movement', energy: ['high'], mood: ['restless', 'stressed'], time: 5, location: 'indoor', social: 'solo' },
  { name: 'Go for a bike ride', category: 'movement', energy: ['medium', 'high'], mood: ['bored', 'restless'], time: 30, location: 'outdoor', social: 'both' },
  { name: 'Doodle whatever comes to mind', category: 'creative', energy: ['depleted', 'low', 'medium'], mood: ['bored', 'stressed', 'avoiding'], time: 15, location: 'indoor', social: 'solo' },
  { name: 'Write a haiku about your day', category: 'creative', energy: ['low', 'medium'], mood: ['bored', 'lonely', 'overwhelmed'], time: 5, location: 'indoor', social: 'solo' },
  { name: 'Rearrange a shelf or corner', category: 'creative', energy: ['medium', 'high'], mood: ['bored', 'restless', 'avoiding'], time: 15, location: 'indoor', social: 'solo' },
  { name: 'Make a playlist for your current mood', category: 'creative', energy: ['depleted', 'low', 'medium'], mood: ['bored', 'stressed', 'lonely'], time: 15, location: 'indoor', social: 'solo' },
  { name: 'Write a letter you\'ll never send', category: 'creative', energy: ['low', 'medium'], mood: ['stressed', 'lonely', 'overwhelmed'], time: 15, location: 'indoor', social: 'solo' },
  { name: 'Clean out one drawer', category: 'organizing', energy: ['medium', 'high'], mood: ['bored', 'restless', 'avoiding', 'overwhelmed'], time: 15, location: 'indoor', social: 'solo' },
  { name: 'Delete 20 photos from your phone', category: 'organizing', energy: ['depleted', 'low', 'medium'], mood: ['bored', 'avoiding'], time: 10, location: 'indoor', social: 'solo' },
  { name: 'Unsubscribe from 5 emails', category: 'organizing', energy: ['depleted', 'low'], mood: ['bored', 'avoiding', 'overwhelmed'], time: 10, location: 'indoor', social: 'solo' },
  { name: 'Clear off one surface completely', category: 'organizing', energy: ['medium', 'high'], mood: ['restless', 'avoiding', 'overwhelmed'], time: 15, location: 'indoor', social: 'solo' },
  { name: 'Sort through one pile of papers', category: 'organizing', energy: ['medium'], mood: ['avoiding', 'overwhelmed'], time: 20, location: 'indoor', social: 'solo' },
  { name: 'Watch one TED talk', category: 'learning', energy: ['depleted', 'low', 'medium'], mood: ['bored', 'avoiding'], time: 20, location: 'indoor', social: 'solo' },
  { name: 'Read one article you bookmarked ages ago', category: 'learning', energy: ['low', 'medium'], mood: ['bored', 'avoiding'], time: 15, location: 'indoor', social: 'solo' },
  { name: 'Learn 5 words in a new language', category: 'learning', energy: ['medium'], mood: ['bored', 'restless'], time: 15, location: 'indoor', social: 'solo' },
  { name: 'Look up how something you use every day works', category: 'learning', energy: ['low', 'medium'], mood: ['bored'], time: 15, location: 'indoor', social: 'solo' },
  { name: 'Text someone you haven\'t talked to in a while', category: 'social', energy: ['depleted', 'low', 'medium'], mood: ['bored', 'lonely'], time: 5, location: 'indoor', social: 'social' },
  { name: 'Call a friend just to say hi', category: 'social', energy: ['medium', 'high'], mood: ['bored', 'lonely', 'need reward'], time: 15, location: 'both', social: 'social' },
  { name: 'Send a voice memo to someone', category: 'social', energy: ['low', 'medium'], mood: ['bored', 'lonely'], time: 5, location: 'both', social: 'social' },
  { name: 'Write a nice comment on a friend\'s post', category: 'social', energy: ['depleted', 'low'], mood: ['lonely'], time: 5, location: 'indoor', social: 'social' },
  { name: 'Lie down and do nothing for 10 minutes', category: 'rest', energy: ['depleted', 'low'], mood: ['stressed', 'overwhelmed'], time: 10, location: 'indoor', social: 'solo' },
  { name: 'Take a shower (not productive, just nice)', category: 'rest', energy: ['depleted', 'low', 'medium'], mood: ['stressed', 'overwhelmed', 'need reward'], time: 15, location: 'indoor', social: 'solo' },
  { name: 'Sit outside and just exist', category: 'rest', energy: ['depleted', 'low'], mood: ['stressed', 'overwhelmed'], time: 15, location: 'outdoor', social: 'solo' },
  { name: 'Stare out the window like you\'re in a music video', category: 'rest', energy: ['depleted', 'low'], mood: ['stressed', 'lonely', 'overwhelmed'], time: 10, location: 'indoor', social: 'solo' },
  { name: 'Take a nap (seriously)', category: 'rest', energy: ['depleted'], mood: ['stressed', 'overwhelmed'], time: 30, location: 'indoor', social: 'solo' },
  { name: 'Play a game on your phone (but set a timer)', category: 'play', energy: ['depleted', 'low', 'medium'], mood: ['bored', 'stressed', 'need reward'], time: 15, location: 'indoor', social: 'solo' },
  { name: 'Do a puzzle (even just a few pieces)', category: 'play', energy: ['low', 'medium'], mood: ['bored', 'stressed', 'avoiding'], time: 20, location: 'indoor', social: 'solo' },
  { name: 'Play with a pet (yours or a neighbor\'s)', category: 'play', energy: ['medium', 'high'], mood: ['bored', 'stressed', 'lonely', 'need reward'], time: 15, location: 'both', social: 'both' },
  { name: 'Build something with whatever\'s around', category: 'play', energy: ['medium', 'high'], mood: ['bored', 'restless'], time: 20, location: 'indoor', social: 'solo' },
  { name: 'Have a solo dance party', category: 'play', energy: ['medium', 'high'], mood: ['bored', 'stressed', 'need reward'], time: 15, location: 'indoor', social: 'solo' },
]

const categoryEmoji = {
  movement: '🏃',
  creative: '🎨',
  organizing: '📦',
  learning: '📚',
  social: '💬',
  rest: '😴',
  play: '🎮',
}

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true'
    }
    return false
  })

  const [mood, setMood] = useState('')
  const [energy, setEnergy] = useState('')
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('both')
  const [results, setResults] = useState(null)
  const [completed, setCompleted] = useState([])

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
      padding: '12px 24px',
      borderRadius: '8px',
      border: 'none',
      backgroundColor: colors.primary,
      color: '#FFFFFF',
      fontSize: '14px',
      fontWeight: '600',
      cursor: 'pointer',
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
    select: {
      padding: '12px 14px',
      borderRadius: '6px',
      border: `1px solid ${theme.border}`,
      backgroundColor: theme.surface,
      color: theme.text,
      fontSize: '14px',
      width: '100%',
      cursor: 'pointer',
    },
  }

  const generateActivities = () => {
    let filtered = activities.filter(a => {
      if (mood && !a.mood.includes(mood)) return false
      if (energy && !a.energy.includes(energy)) return false
      if (time && a.time > parseInt(time)) return false
      if (location !== 'both' && a.location !== 'both' && a.location !== location) return false
      return true
    })
    const shuffled = filtered.sort(() => Math.random() - 0.5)
    setResults(shuffled.slice(0, 5))
  }

  const regenerate = () => {
    generateActivities()
  }

  const markComplete = (activityName) => {
    if (!completed.includes(activityName)) {
      setCompleted([...completed, activityName])
    }
  }

  const reset = () => {
    setMood('')
    setEnergy('')
    setTime('')
    setLocation('both')
    setResults(null)
  }

  const canGenerate = mood && energy && time

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
          <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>Activity Generator</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{ ...baseStyles.buttonSecondary, padding: '8px 12px', fontSize: '12px' }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <p style={{ color: theme.textMuted, marginBottom: '24px', fontSize: '14px' }}>
          Bored? Restless? Need something to do that doesn't cost money?
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
                Tell us how you're feeling and we'll suggest activities that don't require spending.
              </p>
            </div>

            {/* Mood */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '8px' }}>How are you feeling?</label>
              <select value={mood} onChange={(e) => setMood(e.target.value)} style={baseStyles.select}>
                <option value="">Select...</option>
                <option value="bored">Bored</option>
                <option value="stressed">Stressed</option>
                <option value="restless">Restless</option>
                <option value="lonely">Lonely</option>
                <option value="overwhelmed">Overwhelmed</option>
                <option value="need reward">Need a reward</option>
                <option value="avoiding">Avoiding something</option>
              </select>
            </div>

            {/* Energy */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Energy level?</label>
              <select value={energy} onChange={(e) => setEnergy(e.target.value)} style={baseStyles.select}>
                <option value="">Select...</option>
                <option value="depleted">Depleted (barely functioning)</option>
                <option value="low">Low (can do simple things)</option>
                <option value="medium">Medium (up for something)</option>
                <option value="high">High (let's go)</option>
              </select>
            </div>

            {/* Time */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Time available?</label>
              <select value={time} onChange={(e) => setTime(e.target.value)} style={baseStyles.select}>
                <option value="">Select...</option>
                <option value="5">5 minutes</option>
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="60">1 hour</option>
              </select>
            </div>

            {/* Location */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '13px', fontWeight: '500', display: 'block', marginBottom: '8px' }}>Indoor or outdoor?</label>
              <select value={location} onChange={(e) => setLocation(e.target.value)} style={baseStyles.select}>
                <option value="both">Either</option>
                <option value="indoor">Indoor only</option>
                <option value="outdoor">Outdoor only</option>
              </select>
            </div>

            <button
              onClick={generateActivities}
              disabled={!canGenerate}
              style={{ ...baseStyles.button, width: '100%', opacity: canGenerate ? 1 : 0.5 }}
            >
              Generate Activities
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
                <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>Mood</div>
                <div style={{ fontSize: '16px', fontWeight: '600', textTransform: 'capitalize' }}>{mood}</div>
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
                <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>Activities Found</div>
                <div style={{ fontSize: '28px', fontWeight: '700' }}>{results.length}</div>
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
                <div style={{ fontSize: '12px', color: colors.successDark, marginBottom: '4px' }}>Cost</div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: colors.successDark }}>$0</div>
              </div>
            </div>

            {/* Featured suggestion */}
            {results.length > 0 && (
              <div style={{
                padding: '16px',
                backgroundColor: theme.surface,
                border: `1px solid ${theme.border}`,
                borderRadius: '8px',
                borderLeft: `4px solid ${colors.success}`,
                marginBottom: '20px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '11px',
                    fontWeight: '700',
                    backgroundColor: colors.success + '20',
                    color: colors.successDark,
                  }}>
                    TRY THIS ONE
                  </span>
                </div>
                <div style={{ fontSize: '18px', fontWeight: '600', marginBottom: '12px' }}>{results[0].name}</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '4px 10px',
                    backgroundColor: theme.border,
                    borderRadius: '12px',
                  }}>
                    {categoryEmoji[results[0].category]} {results[0].category}
                  </span>
                  <span style={{
                    fontSize: '11px',
                    fontWeight: '700',
                    padding: '4px 10px',
                    backgroundColor: theme.border,
                    borderRadius: '12px',
                  }}>
                    ~{results[0].time} min
                  </span>
                </div>
                {!completed.includes(results[0].name) && (
                  <button
                    onClick={() => markComplete(results[0].name)}
                    style={{ ...baseStyles.button, backgroundColor: colors.success }}
                  >
                    I did it!
                  </button>
                )}
                {completed.includes(results[0].name) && (
                  <div style={{ color: colors.successDark, fontWeight: '600' }}>Nice work!</div>
                )}
              </div>
            )}

            {/* Other options */}
            {results.length > 1 && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Other ideas:</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {results.slice(1).map((activity, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '14px 16px',
                        backgroundColor: theme.surface,
                        border: `1px solid ${theme.border}`,
                        borderRadius: '8px',
                        borderLeft: `4px solid ${theme.border}`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        opacity: completed.includes(activity.name) ? 0.6 : 1,
                      }}
                    >
                      <div>
                        <span style={{ marginRight: '8px' }}>{categoryEmoji[activity.category]}</span>
                        <span style={{ textDecoration: completed.includes(activity.name) ? 'line-through' : 'none' }}>
                          {activity.name}
                        </span>
                      </div>
                      <span style={{ fontSize: '12px', color: theme.textMuted }}>{activity.time}m</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {results.length === 0 && (
              <div style={{ textAlign: 'center', padding: '24px', marginBottom: '24px' }}>
                <p>No activities match those filters. Try adjusting your options.</p>
              </div>
            )}

            {/* Rest acknowledgment */}
            {(mood === 'overwhelmed' || mood === 'stressed' || energy === 'depleted') && (
              <div style={{
                padding: '16px',
                backgroundColor: darkMode ? colors.primaryDark + '30' : colors.primary + '10',
                borderRadius: '8px',
                marginBottom: '24px',
              }}>
                <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6 }}>
                  Hey. Sometimes the right activity is rest. If none of these feel right, lying down and doing nothing is a valid choice.
                </p>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={regenerate} style={{ ...baseStyles.buttonSecondary, flex: 1 }}>
                Try Different Ones
              </button>
              <button onClick={reset} style={{ ...baseStyles.button, flex: 1 }}>
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
            Your activity preferences are processed locally in your browser. This means your data
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
