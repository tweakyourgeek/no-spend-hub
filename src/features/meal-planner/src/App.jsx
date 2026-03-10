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

const ingredientCategories = {
  proteins: ['Eggs', 'Chicken', 'Ground beef', 'Bacon', 'Sausage', 'Tuna', 'Beans', 'Tofu', 'Deli meat'],
  veggies: ['Onion', 'Garlic', 'Tomatoes', 'Lettuce', 'Spinach', 'Bell pepper', 'Carrots', 'Broccoli', 'Mushrooms'],
  carbs: ['Rice', 'Pasta', 'Bread', 'Tortillas', 'Potatoes', 'Oats', 'Ramen'],
  dairy: ['Cheese', 'Milk', 'Butter', 'Yogurt', 'Cream cheese', 'Sour cream'],
  pantry: ['Olive oil', 'Soy sauce', 'Hot sauce', 'Mayo', 'Mustard', 'Peanut butter', 'Jam', 'Honey'],
}

const mealDatabase = [
  { name: 'Scrambled Eggs', time: 5, effort: 'zero', meal: ['breakfast', 'lunch', 'dinner'], required: ['Eggs'], optional: ['Cheese', 'Butter'], steps: ['Crack eggs in bowl, whisk', 'Melt butter in pan', 'Pour in eggs, stir gently', 'Add cheese if you have it', 'Done when barely set'] },
  { name: 'Egg Sandwich', time: 5, effort: 'zero', meal: ['breakfast', 'lunch'], required: ['Eggs', 'Bread'], optional: ['Cheese', 'Bacon', 'Mayo'], steps: ['Fry or scramble an egg', 'Toast bread if you want', 'Stack it up', 'Add cheese/bacon/mayo if available'] },
  { name: 'Quesadilla', time: 10, effort: 'some', meal: ['lunch', 'dinner', 'snack'], required: ['Tortillas', 'Cheese'], optional: ['Chicken', 'Bell pepper', 'Onion', 'Sour cream'], steps: ['Lay tortilla flat', 'Add cheese and any extras to half', 'Fold in half', 'Cook both sides until golden', 'Cut into triangles'] },
  { name: 'Fried Rice', time: 15, effort: 'some', meal: ['lunch', 'dinner'], required: ['Rice', 'Eggs', 'Soy sauce'], optional: ['Onion', 'Garlic', 'Carrots', 'Chicken'], steps: ['Use cold leftover rice if possible', 'Scramble eggs, set aside', 'Fry any veggies you have', 'Add rice, soy sauce, stir', 'Mix in eggs'] },
  { name: 'Pasta with Garlic Oil', time: 15, effort: 'some', meal: ['lunch', 'dinner'], required: ['Pasta', 'Garlic', 'Olive oil'], optional: ['Cheese', 'Hot sauce', 'Butter'], steps: ['Boil pasta', 'Slice garlic thin', 'Warm garlic in olive oil until fragrant', 'Toss with drained pasta', 'Add cheese if you have it'] },
  { name: 'Grilled Cheese', time: 10, effort: 'zero', meal: ['lunch', 'dinner', 'snack'], required: ['Bread', 'Cheese', 'Butter'], optional: ['Tomatoes', 'Bacon', 'Mayo'], steps: ['Butter outside of bread', 'Put cheese between slices', 'Cook in pan until golden each side'] },
  { name: 'Tuna Melt', time: 10, effort: 'zero', meal: ['lunch', 'dinner'], required: ['Tuna', 'Bread', 'Cheese'], optional: ['Mayo', 'Onion'], steps: ['Mix tuna with mayo', 'Put on bread with cheese', 'Toast in pan or oven until melted'] },
  { name: 'Bean Tacos', time: 10, effort: 'zero', meal: ['lunch', 'dinner'], required: ['Tortillas', 'Beans'], optional: ['Cheese', 'Sour cream', 'Hot sauce', 'Lettuce'], steps: ['Warm beans', 'Warm tortillas', 'Fill and top with whatever you have'] },
  { name: 'Oatmeal', time: 5, effort: 'zero', meal: ['breakfast', 'snack'], required: ['Oats'], optional: ['Milk', 'Honey', 'Peanut butter', 'Butter'], steps: ['Cook oats with water or milk', 'Top with whatever sounds good'] },
  { name: 'PB&J', time: 2, effort: 'zero', meal: ['breakfast', 'lunch', 'snack'], required: ['Bread', 'Peanut butter', 'Jam'], optional: [], steps: ['Spread peanut butter on one slice', 'Spread jam on the other', 'Combine'] },
  { name: 'Ramen Upgrade', time: 10, effort: 'some', meal: ['lunch', 'dinner'], required: ['Ramen'], optional: ['Eggs', 'Spinach', 'Mushrooms', 'Hot sauce', 'Soy sauce'], steps: ['Cook ramen', 'Add egg in last 2 minutes', 'Throw in any veggies', 'Top with hot sauce'] },
  { name: 'Loaded Baked Potato', time: 30, effort: 'actual', meal: ['lunch', 'dinner'], required: ['Potatoes'], optional: ['Cheese', 'Sour cream', 'Butter', 'Bacon', 'Broccoli'], steps: ['Microwave potato 5-8 min or bake', 'Split open', 'Load up with toppings'] },
  { name: 'Yogurt Bowl', time: 2, effort: 'zero', meal: ['breakfast', 'snack'], required: ['Yogurt'], optional: ['Honey', 'Oats'], steps: ['Put yogurt in bowl', 'Top with whatever you have'] },
  { name: 'Simple Salad', time: 5, effort: 'zero', meal: ['lunch', 'dinner'], required: ['Lettuce'], optional: ['Tomatoes', 'Cheese', 'Chicken', 'Carrots', 'Olive oil'], steps: ['Chop lettuce', 'Add whatever else you have', 'Dress with olive oil or whatever'] },
  { name: 'Breakfast Burrito', time: 15, effort: 'some', meal: ['breakfast', 'lunch'], required: ['Tortillas', 'Eggs'], optional: ['Cheese', 'Bacon', 'Sausage', 'Bell pepper', 'Onion', 'Hot sauce'], steps: ['Scramble eggs with any extras', 'Warm tortilla', 'Fill and roll', 'Optional: crisp in pan'] },
  { name: 'Toast with Toppings', time: 5, effort: 'zero', meal: ['breakfast', 'snack'], required: ['Bread'], optional: ['Butter', 'Peanut butter', 'Cream cheese', 'Jam', 'Honey'], steps: ['Toast bread', 'Add whatever spread you have'] },
  { name: 'Stir Fry', time: 15, effort: 'some', meal: ['lunch', 'dinner'], required: ['Rice', 'Soy sauce'], optional: ['Chicken', 'Broccoli', 'Bell pepper', 'Carrots', 'Garlic', 'Onion'], steps: ['Cook rice', 'Stir fry protein first, set aside', 'Stir fry veggies', 'Combine, add soy sauce'] },
]

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('darkMode') === 'true'
    }
    return false
  })

  const [selectedIngredients, setSelectedIngredients] = useState([])
  const [mealType, setMealType] = useState('any')
  const [timeAvailable, setTimeAvailable] = useState('any')
  const [effort, setEffort] = useState('any')
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
    chip: {
      padding: '8px 14px',
      borderRadius: '20px',
      border: `1px solid ${theme.border}`,
      backgroundColor: 'transparent',
      color: theme.text,
      fontSize: '13px',
      cursor: 'pointer',
      transition: 'all 150ms ease-out',
    },
    select: {
      padding: '10px 14px',
      borderRadius: '6px',
      border: `1px solid ${theme.border}`,
      backgroundColor: theme.surface,
      color: theme.text,
      fontSize: '14px',
      cursor: 'pointer',
      width: '100%',
    },
  }

  const toggleIngredient = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter(i => i !== ingredient))
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient])
    }
  }

  const findMeals = () => {
    let matches = mealDatabase.filter(meal => {
      const hasRequired = meal.required.every(req =>
        selectedIngredients.some(sel => sel.toLowerCase() === req.toLowerCase())
      )
      if (!hasRequired) return false
      if (mealType !== 'any' && !meal.meal.includes(mealType)) return false
      if (timeAvailable !== 'any') {
        const maxTime = parseInt(timeAvailable)
        if (meal.time > maxTime) return false
      }
      if (effort !== 'any' && meal.effort !== effort) return false
      return true
    })

    matches = matches.map(meal => {
      const optionalCount = meal.optional.filter(opt =>
        selectedIngredients.some(sel => sel.toLowerCase() === opt.toLowerCase())
      ).length
      return { ...meal, optionalCount }
    }).sort((a, b) => b.optionalCount - a.optionalCount)

    const almostMatches = mealDatabase.filter(meal => {
      const missing = meal.required.filter(req =>
        !selectedIngredients.some(sel => sel.toLowerCase() === req.toLowerCase())
      )
      return missing.length === 1
    }).slice(0, 3).map(meal => {
      const missing = meal.required.find(req =>
        !selectedIngredients.some(sel => sel.toLowerCase() === req.toLowerCase())
      )
      return { ...meal, missing }
    })

    setResults({ meals: matches.slice(0, 5), almostMatches })
  }

  const reset = () => {
    setSelectedIngredients([])
    setMealType('any')
    setTimeAvailable('any')
    setEffort('any')
    setResults(null)
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
          <h1 style={{ fontSize: '24px', fontWeight: '700', margin: 0 }}>Meal Planner</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            style={{ ...baseStyles.buttonSecondary, padding: '8px 12px', fontSize: '12px' }}
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
        <p style={{ color: theme.textMuted, marginBottom: '24px', fontSize: '14px' }}>
          What's actually in your kitchen? Let's figure out what you can make.
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
                Select the ingredients you have, and we'll show you what you can make.
                No shopping required.
              </p>
            </div>

            {/* Ingredient selection */}
            {Object.entries(ingredientCategories).map(([category, items]) => (
              <div key={category} style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '12px', fontWeight: '600', marginBottom: '10px', textTransform: 'uppercase', color: theme.textMuted, letterSpacing: '0.5px' }}>
                  {category}
                </h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {items.map(item => (
                    <button
                      key={item}
                      onClick={() => toggleIngredient(item)}
                      style={{
                        ...baseStyles.chip,
                        backgroundColor: selectedIngredients.includes(item) ? colors.primary + '20' : 'transparent',
                        borderColor: selectedIngredients.includes(item) ? colors.primary : theme.border,
                        color: selectedIngredients.includes(item) ? colors.primary : theme.text,
                      }}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {/* Filters */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px', marginBottom: '24px', paddingTop: '16px', borderTop: `1px solid ${theme.border}` }}>
              <div>
                <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '6px' }}>Meal type</label>
                <select value={mealType} onChange={(e) => setMealType(e.target.value)} style={baseStyles.select}>
                  <option value="any">Any</option>
                  <option value="breakfast">Breakfast</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                  <option value="snack">Snack</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '6px' }}>Time available</label>
                <select value={timeAvailable} onChange={(e) => setTimeAvailable(e.target.value)} style={baseStyles.select}>
                  <option value="any">Any</option>
                  <option value="5">5 minutes</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '6px' }}>Effort level</label>
                <select value={effort} onChange={(e) => setEffort(e.target.value)} style={baseStyles.select}>
                  <option value="any">Any</option>
                  <option value="zero">Zero effort</option>
                  <option value="some">Some effort</option>
                  <option value="actual">Actual cooking</option>
                </select>
              </div>
            </div>

            <button
              onClick={findMeals}
              disabled={selectedIngredients.length < 2}
              style={{ ...baseStyles.button, width: '100%', opacity: selectedIngredients.length >= 2 ? 1 : 0.5 }}
            >
              Find Meals ({selectedIngredients.length} ingredients selected)
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
                <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>Ingredients</div>
                <div style={{ fontSize: '28px', fontWeight: '700' }}>{selectedIngredients.length}</div>
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
                <div style={{ fontSize: '12px', color: theme.textMuted, marginBottom: '4px' }}>Recipes Found</div>
                <div style={{ fontSize: '28px', fontWeight: '700' }}>{results.meals.length}</div>
              </div>
              <div style={{
                flex: 1,
                minWidth: '150px',
                padding: '20px',
                backgroundColor: results.meals.length > 0 ? colors.success + '20' : colors.warning + '20',
                border: `2px solid ${results.meals.length > 0 ? colors.success : colors.warning}`,
                borderRadius: '8px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: '12px', color: results.meals.length > 0 ? colors.successDark : colors.warningDark, marginBottom: '4px' }}>Status</div>
                <div style={{ fontSize: '16px', fontWeight: '700', color: results.meals.length > 0 ? colors.successDark : colors.warningDark }}>
                  {results.meals.length > 0 ? 'OPTIONS FOUND' : 'KEEP LOOKING'}
                </div>
              </div>
            </div>

            {/* Results */}
            {results.meals.length > 0 ? (
              <div style={{ marginBottom: '24px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>You can make:</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {results.meals.map((meal, index) => (
                    <div
                      key={index}
                      style={{
                        padding: '16px',
                        backgroundColor: theme.surface,
                        border: `1px solid ${theme.border}`,
                        borderRadius: '8px',
                        borderLeft: `4px solid ${colors.success}`,
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>{meal.name}</h3>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            padding: '4px 10px',
                            backgroundColor: colors.success + '20',
                            color: colors.successDark,
                            borderRadius: '12px',
                          }}>
                            {meal.time} min
                          </span>
                          <span style={{
                            fontSize: '11px',
                            fontWeight: '700',
                            padding: '4px 10px',
                            backgroundColor: theme.border,
                            borderRadius: '12px',
                          }}>
                            {meal.effort}
                          </span>
                        </div>
                      </div>
                      <ol style={{ margin: '0', paddingLeft: '20px', fontSize: '14px', lineHeight: 1.8, color: theme.textMuted }}>
                        {meal.steps.map((step, i) => <li key={i}>{step}</li>)}
                      </ol>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ padding: '32px', textAlign: 'center', marginBottom: '24px' }}>
                <p style={{ fontSize: '16px', marginBottom: '8px' }}>No exact matches with those ingredients.</p>
                <p style={{ color: theme.textMuted, fontSize: '14px' }}>Try selecting more pantry staples, or check "missing one thing" below.</p>
              </div>
            )}

            {/* Almost matches */}
            {results.almostMatches.length > 0 && (
              <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '16px' }}>Missing one thing?</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {results.almostMatches.map((meal, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '16px',
                        backgroundColor: theme.surface,
                        border: `1px solid ${theme.border}`,
                        borderRadius: '8px',
                        borderLeft: `4px solid ${colors.warning}`,
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span style={{ fontWeight: '600' }}>{meal.name}</span>
                      <span style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '4px 10px',
                        backgroundColor: colors.warning + '20',
                        color: colors.warningDark,
                        borderRadius: '12px',
                      }}>
                        Need: {meal.missing}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Acknowledgment */}
            <div style={{
              padding: '16px',
              backgroundColor: darkMode ? colors.primaryDark + '30' : colors.primary + '10',
              borderRadius: '8px',
              marginBottom: '24px',
            }}>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.6 }}>
                Look, sometimes you're going to order food anyway. That's fine. But now you know you had options.
              </p>
            </div>

            <button onClick={reset} style={baseStyles.button}>
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
            Your ingredient selections are processed locally in your browser. This means your data
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
