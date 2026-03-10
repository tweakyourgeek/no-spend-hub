import { useState, useRef, useEffect } from 'react';
import './App.css';

// Nine Pillars of An Aligned Life
const PILLARS = [
  { id: 'self', name: 'Self', icon: '🧘', description: 'The awareness that organizes everything else' },
  { id: 'time', name: 'Time', icon: '⏳', description: 'How rhythm and capacity unfold through your day' },
  { id: 'money', name: 'Money', icon: '💰', description: 'How value circulates and sustains exchange' },
  { id: 'voice', name: 'Voice', icon: '🗣️', description: 'How expression carries meaning outward' },
  { id: 'systems', name: 'Systems', icon: '⚙️', description: 'How structure supports flow' },
  { id: 'relationships', name: 'Relationships', icon: '💞', description: 'How connection becomes mutual influence' },
  { id: 'community', name: 'Community', icon: '🤝', description: 'How shared purpose creates collective movement' },
  { id: 'creativity', name: 'Creativity', icon: '🎨', description: 'How imagination keeps it all porous and alive' },
  { id: 'belief', name: 'Belief', icon: '✨', description: 'What you hold as true and sacred' }
];

// Chasing Patterns
const CHASING_PATTERNS = [
  { id: 'rainbows', name: 'Chasing Rainbows', description: 'The consumption spiral' },
  { id: 'unicorns', name: 'Chasing Unicorns', description: 'The comparison spiral' },
  { id: 'stardust', name: 'Chasing Stardust', description: 'The perfection spiral' },
  { id: 'moonbeams', name: 'Chasing Moonbeams', description: 'The avoidance spiral' }
];

// Vibe Options
const VIBES = [
  { id: 'clean', name: 'Clean & Minimal', description: 'Just the facts, simple aesthetic' },
  { id: 'ritual', name: 'Ritual', description: 'A bit ceremonial, meaningful language' },
  { id: 'faith', name: 'Faith-Based', description: 'Incorporates spiritual elements' }
];

// Background Templates
const BACKGROUNDS = [
  { id: 'mocha', name: 'Mocha Mousse', gradient: 'linear-gradient(135deg, #F5E6D3 0%, #E8D5C4 100%)' },
  { id: 'sage', name: 'Sage Garden', gradient: 'linear-gradient(135deg, #E8F3E8 0%, #D4E7D4 100%)' },
  { id: 'lavender', name: 'Lavender Dream', gradient: 'linear-gradient(135deg, #F0E6F6 0%, #E1D4EC 100%)' },
  { id: 'ocean', name: 'Ocean Calm', gradient: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)' },
  { id: 'sunset', name: 'Sunset Glow', gradient: 'linear-gradient(135deg, #FFE5E5 0%, #FFD6D6 100%)' },
  { id: 'forest', name: 'Forest Mist', gradient: 'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)' }
];

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('nospend_darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [step, setStep] = useState(1);
  const [commitment, setCommitment] = useState({
    pillars: [],
    being: '',
    feeling: '',
    acting: '',
    showingUp: '',
    vibe: 'clean',
    chasingPattern: '',
    toughReminder: '',
    uploadedImages: [],
    selectedBackground: 'mocha'
  });

  const [showPreview, setShowPreview] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    localStorage.setItem('nospend_darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const handlePillarToggle = (pillarId) => {
    setCommitment(prev => {
      const pillars = prev.pillars.includes(pillarId)
        ? prev.pillars.filter(p => p !== pillarId)
        : prev.pillars.length < 3
        ? [...prev.pillars, pillarId]
        : prev.pillars;
      return { ...prev, pillars };
    });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + commitment.uploadedImages.length <= 3) {
      const readers = files.map(file => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(file);
        });
      });

      Promise.all(readers).then(images => {
        setCommitment(prev => ({
          ...prev,
          uploadedImages: [...prev.uploadedImages, ...images].slice(0, 3)
        }));
      });
    }
  };

  const removeImage = (index) => {
    setCommitment(prev => ({
      ...prev,
      uploadedImages: prev.uploadedImages.filter((_, i) => i !== index)
    }));
  };

  const generateCommitment = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = 1080;
    canvas.height = 1920;

    // Background
    const bg = BACKGROUNDS.find(b => b.id === commitment.selectedBackground);
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

    if (bg.gradient.includes('linear-gradient')) {
      const colors = bg.gradient.match(/#[0-9A-F]{6}/gi);
      if (colors && colors.length >= 2) {
        gradient.addColorStop(0, colors[0]);
        gradient.addColorStop(1, colors[1]);
      }
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Title
    ctx.fillStyle = '#2C2C3E';
    ctx.font = 'bold 72px serif';
    ctx.textAlign = 'center';

    const title = commitment.vibe === 'faith'
      ? 'My Sacred Commitment'
      : commitment.vibe === 'ritual'
      ? 'My Intentional Pledge'
      : 'My 30-Day Commitment';

    ctx.fillText(title, canvas.width / 2, 150);

    // Pillars
    let yPos = 250;
    if (commitment.pillars.length > 0) {
      ctx.font = '32px sans-serif';
      ctx.fillText('Strengthening:', canvas.width / 2, yPos);
      yPos += 60;

      commitment.pillars.forEach(pillarId => {
        const pillar = PILLARS.find(p => p.id === pillarId);
        ctx.font = 'bold 48px sans-serif';
        ctx.fillText(`${pillar.icon} ${pillar.name}`, canvas.width / 2, yPos);
        yPos += 80;
      });
    }

    // Four Lenses
    yPos += 40;
    ctx.font = 'italic 28px serif';
    ctx.fillStyle = '#666680';

    if (commitment.being) {
      const lines = wrapText(ctx, `Being: ${commitment.being}`, canvas.width - 200);
      lines.forEach(line => {
        ctx.fillText(line, canvas.width / 2, yPos);
        yPos += 40;
      });
      yPos += 20;
    }

    if (commitment.toughReminder) {
      yPos += 60;
      ctx.fillStyle = '#2C2C3E';
      ctx.font = 'bold 32px sans-serif';
      ctx.fillText('When it gets tough:', canvas.width / 2, yPos);
      yPos += 50;

      ctx.font = 'italic 36px serif';
      ctx.fillStyle = '#B375A0';
      const reminderLines = wrapText(ctx, commitment.toughReminder, canvas.width - 200);
      reminderLines.forEach(line => {
        ctx.fillText(line, canvas.width / 2, yPos);
        yPos += 50;
      });
    }

    // Footer
    ctx.fillStyle = '#666680';
    ctx.font = '24px sans-serif';
    ctx.fillText('Part of The Alignment Lab™ 30-Day No-Spend Challenge', canvas.width / 2, canvas.height - 100);
  };

  const wrapText = (ctx, text, maxWidth) => {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
      const testLine = currentLine + word + ' ';
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && currentLine !== '') {
        lines.push(currentLine.trim());
        currentLine = word + ' ';
      } else {
        currentLine = testLine;
      }
    });
    lines.push(currentLine.trim());
    return lines;
  };

  const downloadPNG = () => {
    generateCommitment();
    setTimeout(() => {
      const canvas = canvasRef.current;
      const link = document.createElement('a');
      link.download = 'my-commitment.png';
      link.href = canvas.toDataURL();
      link.click();
    }, 100);
  };

  const downloadPDF = () => {
    alert('PDF generation coming soon! For now, download the PNG and print it.');
  };

  const nextStep = () => {
    if (step < 6) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1 className="logo">✨ Commitment Builder</h1>
          <button
            className="dark-mode-toggle"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle dark mode"
          >
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="main">
        <div className="builder-container">
          {/* Progress Indicator */}
          <div className="progress-indicator">
            <div className="progress-steps">
              {[1, 2, 3, 4, 5, 6].map(s => (
                <div
                  key={s}
                  className={`progress-step ${step >= s ? 'active' : ''} ${step === s ? 'current' : ''}`}
                  onClick={() => setStep(s)}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Step 1: Pillars */}
          {step === 1 && (
            <div className="step-content">
              <h2>Which pillar(s) are calling for this experiment?</h2>
              <p className="step-subtitle">Select 1-3 pillars this challenge will strengthen</p>

              <div className="pillars-grid">
                {PILLARS.map(pillar => (
                  <button
                    key={pillar.id}
                    className={`pillar-card ${commitment.pillars.includes(pillar.id) ? 'selected' : ''}`}
                    onClick={() => handlePillarToggle(pillar.id)}
                    disabled={!commitment.pillars.includes(pillar.id) && commitment.pillars.length >= 3}
                  >
                    <div className="pillar-icon">{pillar.icon}</div>
                    <div className="pillar-name">{pillar.name}</div>
                    <div className="pillar-desc">{pillar.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Four Lenses */}
          {step === 2 && (
            <div className="step-content">
              <h2>The Four Lenses</h2>
              <p className="step-subtitle">What's the deeper why?</p>

              <div className="lenses-form">
                <div className="lens-group">
                  <label>Being: Who do you want to be on Day 30?</label>
                  <textarea
                    value={commitment.being}
                    onChange={(e) => setCommitment({ ...commitment, being: e.target.value })}
                    placeholder="I want to be someone who..."
                    rows={3}
                  />
                </div>

                <div className="lens-group">
                  <label>Feeling: What do you want to feel more of?</label>
                  <textarea
                    value={commitment.feeling}
                    onChange={(e) => setCommitment({ ...commitment, feeling: e.target.value })}
                    placeholder="I want to feel..."
                    rows={3}
                  />
                </div>

                <div className="lens-group">
                  <label>Acting: What pattern are you ready to interrupt?</label>
                  <textarea
                    value={commitment.acting}
                    onChange={(e) => setCommitment({ ...commitment, acting: e.target.value })}
                    placeholder="I'm interrupting the pattern of..."
                    rows={3}
                  />
                </div>

                <div className="lens-group">
                  <label>Showing Up: How do you want to show up differently?</label>
                  <textarea
                    value={commitment.showingUp}
                    onChange={(e) => setCommitment({ ...commitment, showingUp: e.target.value })}
                    placeholder="I want to show up as..."
                    rows={3}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Vibe */}
          {step === 3 && (
            <div className="step-content">
              <h2>Choose Your Vibe</h2>
              <p className="step-subtitle">How do you want this to feel?</p>

              <div className="vibes-grid">
                {VIBES.map(vibe => (
                  <button
                    key={vibe.id}
                    className={`vibe-card ${commitment.vibe === vibe.id ? 'selected' : ''}`}
                    onClick={() => setCommitment({ ...commitment, vibe: vibe.id })}
                  >
                    <div className="vibe-name">{vibe.name}</div>
                    <div className="vibe-desc">{vibe.description}</div>
                  </button>
                ))}
              </div>

              {/* Optional Chasing Pattern */}
              <div className="chasing-section">
                <h3>Optional: Which pattern are you interrupting?</h3>
                <div className="chasing-grid">
                  <button
                    className={`chasing-card ${commitment.chasingPattern === '' ? 'selected' : ''}`}
                    onClick={() => setCommitment({ ...commitment, chasingPattern: '' })}
                  >
                    None / Skip
                  </button>
                  {CHASING_PATTERNS.map(pattern => (
                    <button
                      key={pattern.id}
                      className={`chasing-card ${commitment.chasingPattern === pattern.id ? 'selected' : ''}`}
                      onClick={() => setCommitment({ ...commitment, chasingPattern: pattern.id })}
                    >
                      <div className="chasing-name">{pattern.name}</div>
                      <div className="chasing-desc">{pattern.description}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Visual Anchor */}
          {step === 4 && (
            <div className="step-content">
              <h2>Add Your Visual Anchor</h2>
              <p className="step-subtitle">Upload 1-3 inspiration images or choose a background</p>

              <div className="visual-section">
                <div className="upload-section">
                  <h3>Upload Your Photos</h3>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="file-input"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="upload-btn">
                    📸 Choose Images ({commitment.uploadedImages.length}/3)
                  </label>

                  {commitment.uploadedImages.length > 0 && (
                    <div className="uploaded-images">
                      {commitment.uploadedImages.map((img, index) => (
                        <div key={index} className="uploaded-image">
                          <img src={img} alt={`Upload ${index + 1}`} />
                          <button className="remove-img" onClick={() => removeImage(index)}>✕</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="background-section">
                  <h3>Or Choose a Background</h3>
                  <div className="backgrounds-grid">
                    {BACKGROUNDS.map(bg => (
                      <button
                        key={bg.id}
                        className={`background-option ${commitment.selectedBackground === bg.id ? 'selected' : ''}`}
                        style={{ background: bg.gradient }}
                        onClick={() => setCommitment({ ...commitment, selectedBackground: bg.id })}
                      >
                        <span className="bg-name">{bg.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Tough Times Reminder */}
          {step === 5 && (
            <div className="step-content">
              <h2>When It Gets Tough</h2>
              <p className="step-subtitle">What will you remember?</p>

              <div className="reminder-form">
                <textarea
                  value={commitment.toughReminder}
                  onChange={(e) => setCommitment({ ...commitment, toughReminder: e.target.value })}
                  placeholder="When I want to quit, I'll remember..."
                  rows={6}
                  className="reminder-textarea"
                />
              </div>
            </div>
          )}

          {/* Step 6: Preview & Download */}
          {step === 6 && (
            <div className="step-content">
              <h2>Your Commitment</h2>
              <p className="step-subtitle">Preview and download your visual anchor</p>

              <div className="preview-section">
                <canvas ref={canvasRef} className="preview-canvas" />
                <button className="generate-btn" onClick={generateCommitment}>
                  Generate Preview
                </button>

                <div className="download-options">
                  <button className="download-btn primary" onClick={downloadPNG}>
                    📥 Download PNG (Wallpaper)
                  </button>
                  <button className="download-btn secondary" onClick={downloadPDF}>
                    📄 Download PDF (Print)
                  </button>
                </div>

                <div className="share-note">
                  <p>💡 Tip: Set this as your phone wallpaper or print it for your mirror!</p>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="step-navigation">
            <button
              className="nav-btn secondary"
              onClick={prevStep}
              disabled={step === 1}
            >
              ← Previous
            </button>
            <button
              className="nav-btn primary"
              onClick={nextStep}
              disabled={step === 6}
            >
              Next →
            </button>
          </div>
        </div>

        {/* Related Tools */}
        <section className="related-tools">
          <h3>Other No-Spend Tools</h3>
          <div className="tools-grid">
            <a href="../challenge-roadmap/index.html" className="tool-card">
              <span className="tool-icon">🗺️</span>
              <div>
                <h4>Challenge Roadmap</h4>
                <p>30-day guided journey</p>
              </div>
            </a>
            <a href="../journal-30day/index.html" className="tool-card">
              <span className="tool-icon">📔</span>
              <div>
                <h4>30-Day Journal</h4>
                <p>Daily reflection prompts</p>
              </div>
            </a>
            <a href="../pattern-quiz/index.html" className="tool-card">
              <span className="tool-icon">🎯</span>
              <div>
                <h4>Pattern Quiz</h4>
                <p>Identify spending patterns</p>
              </div>
            </a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Part of The Alignment Lab™ No-Spend Challenge ecosystem</p>
      </footer>
    </div>
  );
}

export default App;
