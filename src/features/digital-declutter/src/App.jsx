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
  { id: 'subscriptions', name: 'Subscriptions & Memberships', emoji: '💳', prompt: 'Any subscriptions you\'re paying for but not using?', examples: 'Streaming services, apps, gym memberships, software', timeToFix: 5 },
  { id: 'apps', name: 'Phone Apps', emoji: '📱', prompt: 'Apps you haven\'t opened in months?', examples: 'Games you don\'t play, tools you tried once, duplicates', timeToFix: 10 },
  { id: 'tabs', name: 'Browser Tabs', emoji: '🌐', prompt: 'Tabs you\'ve had open for days/weeks "to read later"?', examples: 'Articles, shopping pages, research you\'re done with', timeToFix: 5 },
  { id: 'emails', name: 'Email Subscriptions', emoji: '📧', prompt: 'Newsletters you delete without reading?', examples: 'Marketing emails, old signups, daily digests you ignore', timeToFix: 15 },
  { id: 'social', name: 'Social Media Follows', emoji: '👤', prompt: 'Accounts that drain your energy or make you feel bad?', examples: 'Comparison triggers, inactive follows, brands you don\'t care about', timeToFix: 15 },
  { id: 'files', name: 'Files & Folders', emoji: '📁', prompt: 'Digital hoarding you\'re "saving for later"?', examples: 'Downloads folder, screenshots, old documents', timeToFix: 20 },
  { id: 'courses', name: 'Courses & Resources', emoji: '🎓', prompt: 'Things you bought but never used?', examples: 'Online courses, ebooks, templates, bundles', timeToFix: 10 },
]

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true'
    }
    return false
  })

  const [currentCategory, setCurrentCategory] = useState(0)
  const [items, setItems] = useState({})
  const [showResults, setShowResults] = useState(false)
  const [newItem, setNewItem] = useState('')

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode)
  }, [darkMode])

  useEffect(() => {
    const saved = localStorage.getItem('declutter-progress')
    if (saved) {
      setItems(JSON.parse(saved))
    }
  }, [])

  useEffect(() => {
    if (Object.keys(items).length > 0) {
      localStorage.setItem('declutter-progress', JSON.stringify(items))
    }
  }, [items])

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
    input: {
      padding: '12px 14px',
      borderRadius: '6px',
      border: `1px solid ${theme.border}`,
      backgroundColor: theme.surface,
      color: theme.text,
      fontSize: '14px',
      width: '100%',
      boxSizing: 'border-box',
    },
  }

  const category = categories[currentCategory]
  const categoryItems = items[category?.id] || []

  const addItem = (text, action) => {
    if (!text.trim()) return
    const newItems = {
      ...items,
      [category.id]: [...categoryItems, { text: text.trim(), action, done: false }]
    }
    setItems(newItems)
  }

  const toggleDone = (categoryId, index) => {
    const updated = items[categoryId].map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    )
    setItems({ ...items, [categoryId]: updated })
  }

  const nextCategory = () => {
    if (currentCategory < categories.length - 1) {
      setCurrentCategory(currentCategory + 1)
    } else {
      setShowResults(true)
    }
  }

  const prevCategory = () => {
    if (currentCategory > 0) {
      setCurrentCategory(currentCategory - 1)
    }
  }

  const reset = () => {
    setItems({})
    setCurrentCategory(0)
    setShowResults(false)
    localStorage.removeItem('declutter-progress')
  }

  const getAllItems = () => {
    const all = []
    categories.forEach(cat => {
      const catItems = items[cat.id] || []
      catItems.forEach(item => {
        all.push({ ...item, category: cat })
      })
    })
    return all
  }

  const getDeleteItems = () => getAllItems().filter(i => i.action === 'delete' && !i.done)
  const getTotalTime = () => {
    let time = 0
    categories.forEach(cat => {
      const catItems = items[cat.id] || []
      if (catItems.some(i => i.action === 'delete' && !i.done)) {
        time += cat.timeToFix
      }
    })
    return time
  }

  const progress = ((currentCategory) / categories.length) * 100

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
          <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>Digital Declutter</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{ ...baseStyles.buttonSecondary, padding: '8px 12px', fontSize: '12px' }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <p style={{ color: theme.textMuted, marginBottom: '24px', fontSize: '14px' }}>
          Let's audit your digital stuff, one category at a time.
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
                {currentCategory + 1} of {categories.length}
              </span>
            </div>

            {/* Category header */}
            <div style={{
              padding: '20px',
              backgroundColor: theme.surface,
              border: `1px solid ${theme.border}`,
              borderRadius: '8px',
              borderLeft: `4px solid ${colors.primary}`,
              marginBottom: '20px',
            }}>
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{category.emoji}</div>
              <h2 style={{ fontSize: '18px', fontWeight: '600', margin: '0 0 8px 0' }}>{category.name}</h2>
              <p style={{ margin: 0, fontSize: '15px' }}>{category.prompt}</p>
              <p style={{ margin: '8px 0 0 0', fontSize: '13px', color: theme.textMuted }}>
                Examples: {category.examples}
              </p>
            </div>

            {/* Add items */}
            <div style={{ marginBottom: '16px' }}>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                <input
                  type="text"
                  value={newItem}
                  onChange={(e) => setNewItem(e.target.value)}
                  placeholder="Type something to declutter..."
                  style={{ ...baseStyles.input, flex: 1 }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newItem.trim()) {
                      addItem(newItem, 'delete')
                      setNewItem('')
                    }
                  }}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => { addItem(newItem, 'delete'); setNewItem('') }}
                  disabled={!newItem.trim()}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: colors.danger + '20',
                    color: colors.danger,
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: newItem.trim() ? 'pointer' : 'not-allowed',
                    opacity: newItem.trim() ? 1 : 0.5,
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => { addItem(newItem, 'keep'); setNewItem('') }}
                  disabled={!newItem.trim()}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: 'none',
                    backgroundColor: colors.success + '20',
                    color: colors.successDark,
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: newItem.trim() ? 'pointer' : 'not-allowed',
                    opacity: newItem.trim() ? 1 : 0.5,
                  }}
                >
                  Keep
                </button>
                <button
                  onClick={() => { addItem(newItem, 'later'); setNewItem('') }}
                  disabled={!newItem.trim()}
                  style={{
                    padding: '8px 16px',
                    borderRadius: '6px',
                    border: `1px solid ${theme.border}`,
                    backgroundColor: 'transparent',
                    color: theme.textMuted,
                    fontSize: '13px',
                    fontWeight: '600',
                    cursor: newItem.trim() ? 'pointer' : 'not-allowed',
                    opacity: newItem.trim() ? 1 : 0.5,
                  }}
                >
                  Decide Later
                </button>
              </div>
            </div>

            {/* Current items */}
            {categoryItems.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{ fontSize: '13px', color: theme.textMuted, marginBottom: '12px' }}>Added:</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {categoryItems.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '12px 16px',
                        backgroundColor: theme.surface,
                        border: `1px solid ${theme.border}`,
                        borderRadius: '8px',
                        borderLeft: `4px solid ${item.action === 'delete' ? colors.danger : item.action === 'keep' ? colors.success : theme.border}`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        fontSize: '14px',
                      }}
                    >
                      <span>{item.text}</span>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '4px 10px',
                        borderRadius: '12px',
                        backgroundColor: item.action === 'delete' ? colors.danger + '20' : item.action === 'keep' ? colors.success + '20' : theme.border,
                        color: item.action === 'delete' ? colors.danger : item.action === 'keep' ? colors.successDark : theme.textMuted,
                        textTransform: 'uppercase',
                      }}>
                        {item.action}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px' }}>
              <button
                onClick={prevCategory}
                disabled={currentCategory === 0}
                style={{
                  ...baseStyles.buttonSecondary,
                  opacity: currentCategory === 0 ? 0.5 : 1,
                }}
              >
                ← Back
              </button>
              <button onClick={nextCategory} style={baseStyles.button}>
                {currentCategory === categories.length - 1 ? 'See Summary' : 'Next Category →'}
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
                <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>To Delete</div>
                <div style={{ fontSize: '28px', fontWeight: '700' }}>{getDeleteItems().length}</div>
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
                <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>Est. Time</div>
                <div style={{ fontSize: '28px', fontWeight: '700' }}>~{getTotalTime()}m</div>
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
                <div style={{ fontSize: '12px', color: colors.successDark, marginBottom: '4px' }}>Status</div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: colors.successDark }}>
                  PLAN READY
                </div>
              </div>
            </div>

            {/* Quick win */}
            {getDeleteItems().length > 0 && (
              <div style={{
                padding: '16px',
                backgroundColor: darkMode ? colors.primaryDark + '30' : colors.primary + '10',
                borderRadius: '8px',
                marginBottom: '24px',
              }}>
                <p style={{ margin: 0, fontSize: '14px' }}>
                  <strong>Start here:</strong> {categories.find(c => (items[c.id] || []).some(i => i.action === 'delete' && !i.done))?.name}
                  {' '}(~{categories.find(c => (items[c.id] || []).some(i => i.action === 'delete' && !i.done))?.timeToFix} min)
                </p>
              </div>
            )}

            {/* Items by category */}
            {categories.map(cat => {
              const catItems = items[cat.id] || []
              const deleteItems = catItems.filter(i => i.action === 'delete')
              if (deleteItems.length === 0) return null

              return (
                <div key={cat.id} style={{ marginBottom: '20px' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{cat.emoji}</span> {cat.name}
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {deleteItems.map((item, index) => (
                      <div
                        key={index}
                        onClick={() => toggleDone(cat.id, catItems.indexOf(item))}
                        style={{
                          padding: '12px 16px',
                          backgroundColor: theme.surface,
                          border: `1px solid ${item.done ? colors.success : theme.border}`,
                          borderRadius: '8px',
                          borderLeft: `4px solid ${item.done ? colors.success : colors.danger}`,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          cursor: 'pointer',
                          opacity: item.done ? 0.6 : 1,
                        }}
                      >
                        <div style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '4px',
                          border: `2px solid ${item.done ? colors.success : theme.border}`,
                          backgroundColor: item.done ? colors.success : 'transparent',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '12px',
                        }}>
                          {item.done && '✓'}
                        </div>
                        <span style={{ textDecoration: item.done ? 'line-through' : 'none' }}>{item.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}

            <button onClick={reset} style={{ ...baseStyles.button, width: '100%' }}>
              Start Fresh
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
            Your declutter list is processed locally in your browser. This means your data
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
