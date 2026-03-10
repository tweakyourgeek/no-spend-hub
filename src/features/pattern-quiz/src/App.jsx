import { useState, useEffect } from 'react'
import './App.css'

// Pattern definitions
const PATTERNS = {
  ambrosia: {
    name: 'Ambrosia',
    tagline: 'This purchase will fix how I feel',
    description: 'You tend to use shopping as emotional regulation. When you\'re stressed, sad, or anxious, buying something feels like it will make you feel better.',
    icon: '🍯',
    color: '#E8B4B8'
  },
  rainbows: {
    name: 'Rainbows',
    tagline: 'This resource will finally make it all work',
    description: 'You chase the perfect tool, system, or resource that will solve all your problems. "If I just had THIS planner/app/course, everything would click."',
    icon: '🌈',
    color: '#B4D4E8'
  },
  unicorns: {
    name: 'Unicorns',
    tagline: 'I need this to be who I\'m supposed to be',
    description: 'You buy things tied to an idealized version of yourself. "When I have this, I\'ll finally be that person I want to be."',
    icon: '🦄',
    color: '#D4B8E8'
  },
  stardust: {
    name: 'Stardust',
    tagline: 'This reflects who I am',
    description: 'Your purchases are deeply tied to your identity. You buy things that signal who you are to yourself and others.',
    icon: '✨',
    color: '#E8D4B8'
  },
  sunshine: {
    name: 'Sunshine',
    tagline: 'I\'ve earned this / I deserve a treat',
    description: 'You use purchases as rewards. After a hard day, week, or accomplishment, you treat yourself as a form of self-care.',
    icon: '☀️',
    color: '#F4E4A6'
  },
  moonbeams: {
    name: 'Moonbeams',
    tagline: 'Someday I\'ll use this',
    description: 'You buy for a vague, fantasy version of your future life. "Someday when I have time/energy/a different life, I\'ll use this."',
    icon: '🌙',
    color: '#C8D8E8'
  }
};

// Quiz questions - each maps to a pattern
const QUESTIONS = [
  {
    id: 1,
    question: "When you're having a rough day, what sounds most appealing?",
    options: [
      { text: "Buying something small to cheer myself up", pattern: 'ambrosia' },
      { text: "Getting a new productivity tool to feel in control", pattern: 'rainbows' },
      { text: "Treating myself because I deserve it", pattern: 'sunshine' },
      { text: "Browsing online for things I might want someday", pattern: 'moonbeams' }
    ]
  },
  {
    id: 2,
    question: "Which statement resonates most with you?",
    options: [
      { text: "I have a closet full of things for 'someday'", pattern: 'moonbeams' },
      { text: "I keep buying new planners/systems hoping one will stick", pattern: 'rainbows' },
      { text: "My purchases reflect my values and who I am", pattern: 'stardust' },
      { text: "Shopping helps me cope with stress", pattern: 'ambrosia' }
    ]
  },
  {
    id: 3,
    question: "When you see an ad for something appealing, you think:",
    options: [
      { text: "That would make me feel so much better right now", pattern: 'ambrosia' },
      { text: "That's exactly what I need to finally get organized!", pattern: 'rainbows' },
      { text: "I could see myself using that... eventually", pattern: 'moonbeams' },
      { text: "That fits my aesthetic/brand perfectly", pattern: 'stardust' }
    ]
  },
  {
    id: 4,
    question: "You've had a win at work. How do you celebrate?",
    options: [
      { text: "Buy myself something nice - I earned it!", pattern: 'sunshine' },
      { text: "Finally get that thing I've been wanting", pattern: 'unicorns' },
      { text: "Treat myself to make up for all the stress", pattern: 'ambrosia' },
      { text: "Reward myself with something that reflects my success", pattern: 'stardust' }
    ]
  },
  {
    id: 5,
    question: "What's most true about your unused purchases?",
    options: [
      { text: "I bought them imagining a different lifestyle", pattern: 'moonbeams' },
      { text: "I bought them thinking they'd transform me", pattern: 'unicorns' },
      { text: "I bought them thinking they'd solve a problem", pattern: 'rainbows' },
      { text: "I bought them to feel better in the moment", pattern: 'ambrosia' }
    ]
  },
  {
    id: 6,
    question: "When describing your style, you think:",
    options: [
      { text: "My stuff says something about who I am", pattern: 'stardust' },
      { text: "I'm still figuring out my style", pattern: 'unicorns' },
      { text: "I buy what makes me happy in the moment", pattern: 'sunshine' },
      { text: "I buy for who I want to become", pattern: 'moonbeams' }
    ]
  },
  {
    id: 7,
    question: "Which purchase type do you relate to most?",
    options: [
      { text: "Comfort purchases when I'm feeling low", pattern: 'ambrosia' },
      { text: "Reward purchases when I've worked hard", pattern: 'sunshine' },
      { text: "Identity purchases that feel 'so me'", pattern: 'stardust' },
      { text: "Aspiration purchases for future-me", pattern: 'unicorns' }
    ]
  },
  {
    id: 8,
    question: "Your online shopping cart is full of:",
    options: [
      { text: "Things that would help me finally get my life together", pattern: 'rainbows' },
      { text: "Things I deserve after everything I've dealt with", pattern: 'sunshine' },
      { text: "Things for hobbies I want to start someday", pattern: 'moonbeams' },
      { text: "Things that feel emotionally comforting", pattern: 'ambrosia' }
    ]
  },
  {
    id: 9,
    question: "When you're anxious or stressed, you:",
    options: [
      { text: "Shop to distract and soothe myself", pattern: 'ambrosia' },
      { text: "Buy something to feel in control", pattern: 'rainbows' },
      { text: "Treat myself because I'm going through it", pattern: 'sunshine' },
      { text: "Browse for things that spark joy or hope", pattern: 'moonbeams' }
    ]
  },
  {
    id: 10,
    question: "You buy a new wardrobe item because:",
    options: [
      { text: "It's exactly the aesthetic I want to embody", pattern: 'stardust' },
      { text: "It makes me feel like the person I want to be", pattern: 'unicorns' },
      { text: "It'll work with the capsule wardrobe I'm building", pattern: 'rainbows' },
      { text: "I deserve something new and nice", pattern: 'sunshine' }
    ]
  },
  {
    id: 11,
    question: "When you think about past purchases you regret:",
    options: [
      { text: "I bought them thinking they'd change everything", pattern: 'rainbows' },
      { text: "I bought them for a life I don't actually live", pattern: 'moonbeams' },
      { text: "I bought them to cope with hard feelings", pattern: 'ambrosia' },
      { text: "I bought them thinking they'd make me complete", pattern: 'unicorns' }
    ]
  },
  {
    id: 12,
    question: "Your closet/home has a lot of:",
    options: [
      { text: "Things that reflect my personality and values", pattern: 'stardust' },
      { text: "Things I bought to feel better", pattern: 'ambrosia' },
      { text: "Things I haven't used but might someday", pattern: 'moonbeams' },
      { text: "Things I bought as treats or rewards", pattern: 'sunshine' }
    ]
  },
  {
    id: 13,
    question: "A new trend catches your eye. You think:",
    options: [
      { text: "Maybe this is the thing that'll finally work for me", pattern: 'rainbows' },
      { text: "That's so me - I need it!", pattern: 'stardust' },
      { text: "That looks fun - I'll save it for later", pattern: 'moonbeams' },
      { text: "I should try it - I could become that kind of person", pattern: 'unicorns' }
    ]
  },
  {
    id: 14,
    question: "Which feels most familiar?",
    options: [
      { text: "Buying supplies for hobbies you never start", pattern: 'moonbeams' },
      { text: "Buying systems/tools hoping THIS one sticks", pattern: 'rainbows' },
      { text: "Buying things because you've 'been so good'", pattern: 'sunshine' },
      { text: "Buying things when you're feeling low", pattern: 'ambrosia' }
    ]
  },
  {
    id: 15,
    question: "You justify a purchase by thinking:",
    options: [
      { text: "I work hard, I deserve this", pattern: 'sunshine' },
      { text: "This reflects my values/identity", pattern: 'stardust' },
      { text: "This will help me become who I want to be", pattern: 'unicorns' },
      { text: "I'll definitely use this... eventually", pattern: 'moonbeams' }
    ]
  },
  {
    id: 16,
    question: "When life feels chaotic, you're drawn to:",
    options: [
      { text: "Buying organizational tools or systems", pattern: 'rainbows' },
      { text: "Treating yourself to feel better", pattern: 'ambrosia' },
      { text: "Buying things that make you feel like 'you'", pattern: 'stardust' },
      { text: "Rewarding yourself for dealing with it all", pattern: 'sunshine' }
    ]
  },
  {
    id: 17,
    question: "Your Pinterest/saved items are full of:",
    options: [
      { text: "Dream life aesthetics I'm not living yet", pattern: 'moonbeams' },
      { text: "Transformation tools and perfect systems", pattern: 'rainbows' },
      { text: "Things that match my vibe perfectly", pattern: 'stardust' },
      { text: "Things I'd buy to become a better version of myself", pattern: 'unicorns' }
    ]
  },
  {
    id: 18,
    question: "The real reason you buy things is:",
    options: [
      { text: "To feel better emotionally", pattern: 'ambrosia' },
      { text: "To fix problems or get organized", pattern: 'rainbows' },
      { text: "To express who I am", pattern: 'stardust' },
      { text: "To close the gap between who I am and who I want to be", pattern: 'unicorns' }
    ]
  }
];

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [screen, setScreen] = useState('welcome'); // welcome, quiz, results
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState({
    ambrosia: 0,
    rainbows: 0,
    unicorns: 0,
    stardust: 0,
    sunshine: 0,
    moonbeams: 0
  });
  const [topPatterns, setTopPatterns] = useState([]);

  // Load dark mode from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('nospend_darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark-mode');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('nospend_darkMode', newMode);
    document.documentElement.classList.toggle('dark-mode');
  };

  // Handle answer selection
  const handleAnswer = (pattern) => {
    // Update scores
    const newScores = { ...scores, [pattern]: scores[pattern] + 1 };
    setScores(newScores);

    // Move to next question or results
    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate results
      calculateResults(newScores);
    }
  };

  // Calculate top patterns
  const calculateResults = (finalScores) => {
    // Sort patterns by score
    const sorted = Object.entries(finalScores)
      .sort(([, a], [, b]) => b - a)
      .map(([pattern, score]) => ({ pattern, score, ...PATTERNS[pattern] }));

    // Get top 2-3 patterns (those with highest scores, minimum 2)
    const top = sorted.filter((p, i) => i < 3 && p.score > 0);
    setTopPatterns(top.length >= 2 ? top : sorted.slice(0, 2));

    // Save to localStorage
    localStorage.setItem('nospend_patterns', JSON.stringify(top.map(p => p.pattern)));
    localStorage.setItem('nospend_patternScores', JSON.stringify(finalScores));

    setScreen('results');
  };

  // Restart quiz
  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScores({
      ambrosia: 0,
      rainbows: 0,
      unicorns: 0,
      stardust: 0,
      sunshine: 0,
      moonbeams: 0
    });
    setTopPatterns([]);
    setScreen('welcome');
  };

  // Calculate progress
  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <h1 className="logo">Pattern Discovery Quiz</h1>
          <button className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="main">
        {/* Welcome Screen */}
        {screen === 'welcome' && (
          <div className="welcome-screen">
            <div className="welcome-content">
              <h2>Discover Your Spending Patterns</h2>
              <p className="intro">
                Ever wonder <em>why</em> you buy what you buy? This quiz identifies your top 2-3
                "Chasing" patterns - the emotional drivers behind your spending habits.
              </p>

              <div className="patterns-preview">
                <h3>The 6 Patterns:</h3>
                <div className="pattern-grid">
                  {Object.values(PATTERNS).map((pattern) => (
                    <div key={pattern.name} className="pattern-preview-card">
                      <span className="pattern-icon">{pattern.icon}</span>
                      <h4>{pattern.name}</h4>
                      <p className="pattern-tagline">"{pattern.tagline}"</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="quiz-details">
                <p>📝 <strong>18 questions</strong> | ⏱️ <strong>5-7 minutes</strong> | 🔒 <strong>No right or wrong answers</strong></p>
                <p className="privacy-note">Your results are private and saved only on your device.</p>
              </div>

              <button className="start-btn" onClick={() => setScreen('quiz')}>
                Start Quiz ✨
              </button>

              <div className="related-tools">
                <p>Part of the <strong>No Spend Challenge</strong> ecosystem</p>
                <div className="tool-links">
                  <a href="https://tweakyourgeek.github.io/nospend-apps/" target="_blank" rel="noopener noreferrer">Challenge Roadmap</a>
                  <a href="https://tweakyourgeek.github.io/nospend-apps/savings-calculator/" target="_blank" rel="noopener noreferrer">Savings Calculator</a>
                  <a href="https://tweakyourgeek.github.io/nospend-apps/subscription-analyzer/" target="_blank" rel="noopener noreferrer">Subscription Analyzer</a>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Screen */}
        {screen === 'quiz' && (
          <div className="quiz-screen">
            <div className="quiz-progress">
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${progress}%` }}></div>
              </div>
              <p className="progress-text">Question {currentQuestion + 1} of {QUESTIONS.length}</p>
            </div>

            <div className="question-card">
              <h2 className="question">{QUESTIONS[currentQuestion].question}</h2>
              <div className="options">
                {QUESTIONS[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className="option-btn"
                    onClick={() => handleAnswer(option.pattern)}
                  >
                    <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                    <span className="option-text">{option.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Results Screen */}
        {screen === 'results' && (
          <div className="results-screen">
            <div className="results-header">
              <h2>Your Spending Patterns</h2>
              <p className="results-intro">Based on your answers, these are your top patterns:</p>
            </div>

            <div className="top-patterns">
              {topPatterns.map((pattern, index) => (
                <div key={pattern.pattern} className="pattern-result-card" style={{ borderColor: pattern.color }}>
                  <div className="pattern-rank">#{index + 1}</div>
                  <div className="pattern-header">
                    <span className="pattern-icon-large">{pattern.icon}</span>
                    <div>
                      <h3>{pattern.name}</h3>
                      <p className="pattern-tagline-result">"{pattern.tagline}"</p>
                    </div>
                  </div>
                  <p className="pattern-description">{pattern.description}</p>
                  <div className="pattern-score">
                    <div className="score-bar">
                      <div
                        className="score-fill"
                        style={{
                          width: `${(pattern.score / QUESTIONS.length) * 100}%`,
                          backgroundColor: pattern.color
                        }}
                      ></div>
                    </div>
                    <span className="score-text">{pattern.score} / {QUESTIONS.length}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="next-steps">
              <h3>What's Next?</h3>
              <p>Understanding your patterns is the first step. Now you can:</p>
              <ul>
                <li>✅ Recognize these patterns when they show up</li>
                <li>💭 Question purchases before you make them</li>
                <li>🔄 Find healthier alternatives to meet the same needs</li>
                <li>📅 Take the 30-Day No Spend Challenge</li>
              </ul>
            </div>

            <div className="community-cta">
              <h3>Share Your Patterns</h3>
              <p>Join the No Spend Challenge community and connect with others who share your patterns.</p>
              <a
                href="https://www.skool.com/nospend-8052/about?ref=0adbf3738783420ca19334d9caec2f0c"
                target="_blank"
                rel="noopener noreferrer"
                className="community-btn"
              >
                Join Skool Community 🌱
              </a>
            </div>

            <div className="related-tools-results">
              <h3>Continue Your Journey</h3>
              <div className="tools-grid">
                <a href="https://tweakyourgeek.github.io/nospend-apps/" className="tool-card" target="_blank" rel="noopener noreferrer">
                  <span className="tool-icon">📅</span>
                  <div>
                    <h4>Challenge Roadmap</h4>
                    <p>30-day guided journey</p>
                  </div>
                </a>
                <a href="https://tweakyourgeek.github.io/nospend-apps/savings-calculator/" className="tool-card" target="_blank" rel="noopener noreferrer">
                  <span className="tool-icon">💰</span>
                  <div>
                    <h4>Savings Calculator</h4>
                    <p>See your C3 savings potential</p>
                  </div>
                </a>
                <a href="https://tweakyourgeek.github.io/nospend-apps/subscription-analyzer/" className="tool-card" target="_blank" rel="noopener noreferrer">
                  <span className="tool-icon">📊</span>
                  <div>
                    <h4>Subscription Analyzer</h4>
                    <p>Track recurring expenses</p>
                  </div>
                </a>
              </div>
            </div>

            <button className="restart-btn" onClick={restartQuiz}>
              Take Quiz Again
            </button>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>Part of the <strong>No Spend Challenge</strong> ecosystem | Made with care 💜</p>
      </footer>
    </div>
  );
}

export default App;
