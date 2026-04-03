import React, { useState, useRef, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import { 
  Upload, 
  Image as ImageIcon, 
  Settings, 
  Download, 
  CheckCircle, 
  RotateCcw,
  LayoutGrid,
  Loader2,
  ArrowRight,
  Shield,
  Zap,
  Globe,
  Moon,
  Sun,
  User,
  Heart
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';

const API_KEY = import.meta.env.VITE_REMOVE_BG_API_KEY;

// --- Main Layout Wrapper for Theme ---
const Layout = ({ children, isDarkMode, toggleTheme }) => {
  const navigate = useNavigate();
  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <header className="corporate-header">
        <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
          <span style={{ fontSize: '28px', letterSpacing: '-1.5px', fontWeight: 800 }}>Passly<span style={{color: 'var(--primary-color)'}}>.</span></span>
        </Link>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <button 
            onClick={toggleTheme} 
            className="btn btn-secondary" 
            style={{ width: 44, height: 44, padding: 0, borderRadius: '12px' }}
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>
      <main>{children}</main>

      <footer style={{ 
        padding: '24px 0', 
        textAlign: 'center', 
        fontSize: '12px', 
        color: 'var(--text-muted)',
        borderTop: '1px solid var(--border-color)',
        marginTop: 'auto',
        background: 'var(--bg-color)',
        backdropFilter: 'blur(10px)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
          Made with <Heart size={14} fill="var(--primary-color)" color="var(--primary-color)" /> by 
          <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>Avighna</span>
        </div>
      </footer>
    </div>
  );
};

// --- Landing Page Component ---
const LandingPage = ({ isDarkMode, toggleTheme }) => {
    const navigate = useNavigate();
    const landingRef = useRef();

    useEffect(() => {
      const ctx = gsap.context(() => {
        gsap.from(".hero-text", { y: 100, opacity: 0, duration: 1.2, ease: "power4.out", stagger: 0.2 });
        gsap.from(".feature-card", { scale: 0.8, opacity: 0, duration: 1, delay: 0.5, stagger: 0.1, ease: "back.out(1.7)" });
        gsap.from(".glass-cta", { y: 50, opacity: 0, duration: 1, delay: 0.8, ease: "power3.out" });
      }, landingRef);
      return () => ctx.revert();
    }, []);

  return (
    <Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
      <main className="main-container" ref={landingRef}>
        <section style={{ padding: '100px 0 60px', textAlign: 'center' }}>
            <div style={{ marginBottom: 30 }} className="hero-text">
                <span className="status-badge" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', color: 'var(--text-main)', backdropFilter: 'blur(8px)' }}>
                   ✨ AI-Powered bio-metrics
                </span>
            </div>
            <h1 className="hero-text">
              Professional Passport Photos, <br/>
              <span style={{ 
                background: 'linear-gradient(90deg, var(--primary-color), #6366f1)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'inline-block'
              }}>Created in Seconds.</span>
            </h1>
            <p style={{ marginTop: 24, padding: '0 20px' }} className="hero-text">
              Generate high-quality portrait sheets automatically. 
              No login required. Just upload and print.
            </p>
            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', marginTop: 48, flexWrap: 'wrap', padding: '0 20px' }} className="glass-cta">
               <button onClick={() => navigate('/app')} className="btn btn-primary" style={{ padding: '18px 40px', fontSize: '18px', borderRadius: '18px' }}>
                  Start Generator <ArrowRight size={20} />
               </button>
            </div>
        </section>

        <section style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '30px', 
          marginTop: '60px',
          paddingBottom: '80px'
        }}>
           {[
             { icon: Zap, title: "AI Background Clean", desc: "Instantly removes shadows and background color for bio-metric compliance." },
             { icon: Shield, title: "Privacy First", desc: "No sign-ups or permanent storage. Everything happens in your browser session." },
             { icon: Globe, title: "Global ISO Grid", desc: "Strictly follows 35mm x 45mm ISO/IEC standards for official documents." }
           ].map((feature, i) => (
             <div 
               key={i} 
               className="panel feature-card" 
               style={{ border: 'var(--glass-border)' }}
             >
                <div style={{ width: 50, height: 50, background: 'var(--primary-glow)', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                   <feature.icon size={24} color="var(--primary-color)" />
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: 700 }}>{feature.title}</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: 12, fontSize: '14px' }}>{feature.desc}</p>
             </div>
           ))}
        </section>

        <section style={{ 
          maxWidth: '800px', 
          margin: '100px auto 140px', 
          padding: '0 20px',
          textAlign: 'left'
        }}>
          <div className="panel" style={{ padding: '60px', border: 'var(--glass-border)', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: 'var(--primary-glow)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.5 }}></div>
            
            <h2 style={{ fontSize: '32px', fontWeight: 800, marginBottom: 30, letterSpacing: '-0.5px' }}>
               Why I made this? <span style={{ color: 'var(--primary-color)' }}>.</span>
            </h2>
            
            <div style={{ fontSize: '18px', color: 'var(--text-main)', lineHeight: 1.8, opacity: 0.9 }}>
              <p style={{ marginBottom: 20 }}>
                This is a real-world problem that many people face when they need passport-size photos.
                Usually, when we go to a photo shop, the process involves clicking a photo, removing the background, 
                and then creating multiple copies of the same image on a single page for printing. This takes time 
                and also requires visiting a shop.
              </p>
              
              <p style={{ marginBottom: 20 }}>
                I wanted to build a website that automates this entire process. With <strong>Passly</strong>, 
                the user will upload a photo, and the website will automatically remove the background and convert 
                it into a standard passport-size image.
              </p>
              
              <p style={{ marginBottom: 20 }}>
                Then, the user can select how many copies they need, and the system will arrange those photos on a 
                single page and generate a PDF. The user will also have the option to preview and download the PDF, 
                which can be directly printed.
              </p>
              
              <p style={{ fontWeight: 700, marginTop: 40, borderLeft: '4px solid var(--primary-color)', paddingLeft: 20 }}>
                The main goal of this project is to make passport photo creation simple, fast, and accessible 
                so that users can do it easily from home without going to a shop.
              </p>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
};

// --- Generator App Component ---
const GeneratorApp = ({ isDarkMode, toggleTheme }) => {
  const appRef = useRef();
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".app-panel", { x: 50, opacity: 0, duration: 1, stagger: 0.2, ease: "power3.out" });
    }, appRef);
    return () => ctx.revert();
  }, []);

  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [copies, setCopies] = useState(8);
  const [paperSize, setPaperSize] = useState('A4');
  const [isBgRemoved, setIsBgRemoved] = useState(false);
  const [userName, setUserName] = useState('');
  const [showNameModal, setShowNameModal] = useState(false);
  
  // New states for Name/Date on photo
  const [addNameDate, setAddNameDate] = useState(false);
  const [photoName, setPhotoName] = useState('');
  const [photoDate, setPhotoDate] = useState(new Date().toISOString().split('T')[0]);

  // Enhancements
  const [brightness, setBrightness] = useState(100);
  const [contrast, setContrast] = useState(100);
  const [smoothing, setSmoothing] = useState(0);

  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const removeBackground = async (file) => {
    setIsProcessing(true);
    const formData = new FormData();
    formData.append('image_file', file);
    formData.append('size', 'auto');

    try {
      const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
        headers: { 'X-Api-Key': API_KEY },
        responseType: 'blob',
      });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        setIsBgRemoved(true);
        setIsProcessing(false);
      };
      reader.readAsDataURL(response.data);
    } catch (error) {
      console.error('BG Removal Error:', error.message);
      setIsProcessing(false);
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImage(e.target.result);
        removeBackground(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadProcessedImage = () => {
    const link = document.createElement('a');
    link.href = image;
    link.download = `Passly_${photoName || 'image'}_bg_removed.png`;
    link.click();
  };

  const startPdfGeneration = () => {
    setShowNameModal(true);
  };

  const generatePDF = () => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = image;
    
    img.onload = () => {
      const targetRatio = 35 / 45;
      let sourceWidth = img.width;
      let sourceHeight = img.height;
      let sourceX = 0;
      let sourceY = 0;

      const imgRatio = sourceWidth / sourceHeight;

      if (imgRatio > targetRatio) {
        sourceWidth = sourceHeight * targetRatio;
        sourceX = (img.width - sourceWidth) / 2;
      } else {
        sourceHeight = sourceWidth / targetRatio;
        sourceY = (img.height - sourceHeight) / 2;
      }

      canvas.width = 700; // Even higher res for overlay text clarity
      canvas.height = 900;
      
      // Draw base image
      // Apply Filters / Enhancements
      ctx.filter = `brightness(${brightness}%) contrast(${contrast}%) blur(${smoothing * 0.5}px)`;
      ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, canvas.width, canvas.height);
      
      // Reset filter for Name/Date or it will be blurry
      ctx.filter = "none";
      
      // Add Name/Date Overlay if enabled
      if (addNameDate) {
        const barHeight = 180;
        ctx.fillStyle = "white";
        ctx.fillRect(0, canvas.height - barHeight, canvas.width, barHeight);
        
        // Border for the white bar
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.strokeRect(1, canvas.height - barHeight, canvas.width - 2, barHeight - 1);

        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        
        // Dynamic Font Scaling for Name
        let nameFontSize = 65;
        ctx.font = `bold ${nameFontSize}px Roboto, Arial`;
        const maxWidth = canvas.width - 40;
        
        while (ctx.measureText(photoName.toUpperCase()).width > maxWidth && nameFontSize > 30) {
          nameFontSize -= 5;
          ctx.font = `bold ${nameFontSize}px Roboto, Arial`;
        }

        ctx.fillText(photoName.toUpperCase(), canvas.width / 2, canvas.height - 100);
        
        // DOB
        ctx.font = "45px Roboto, Arial";
        const formattedDate = photoDate.split('-').reverse().join('-');
        ctx.fillText(`D.O.B: ${formattedDate}`, canvas.width / 2, canvas.height - 40);
      }

      const croppedImage = canvas.toDataURL('image/png');

      const doc = new jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: paperSize === 'A4' ? 'a4' : [102, 152],
      });

      const imgWidth = 35;
      const imgHeight = 45;
      const spacing = 5;
      const topMargin = 15;
      const pageWidth = paperSize === 'A4' ? 210 : 102;

      const colsPerRow = paperSize === 'A4' ? 4 : 2;
      const gridWidth = (colsPerRow * imgWidth) + ((colsPerRow - 1) * spacing);
      const startX = (pageWidth - gridWidth) / 2;

      let x = startX;
      let y = topMargin;
      let colCount = 0;
      
      for (let i = 0; i < copies; i++) {
        doc.addImage(croppedImage, 'PNG', x, y, imgWidth, imgHeight);
        x += imgWidth + spacing;
        colCount++;

        if (colCount >= colsPerRow) {
          x = startX;
          y += imgHeight + spacing;
          colCount = 0;
        }
      }
      
      const fileName = `${userName || 'User'}_${copies}_Passport_Photos.pdf`;
      doc.save(fileName);
      setShowNameModal(false);
    };
  };

  return (
    <Layout isDarkMode={isDarkMode} toggleTheme={toggleTheme}>
      <main className="main-container" ref={appRef}>
        <AnimatePresence>
          {showNameModal && (
            <div className="modal-overlay">
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="modal-content">
                <h3 style={{ marginBottom: 12 }}>Save Document</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '14px', marginBottom: 20 }}>Enter the name to be used for your PDF file.</p>
                <div style={{ position: 'relative', marginBottom: 24 }}>
                   <User size={18} style={{ position: 'absolute', left: 14, top: 14, color: 'var(--text-muted)' }} />
                   <input 
                    autoFocus
                    type="text" 
                    placeholder="Enter full name" 
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    style={{ 
                      width: '100%', 
                      padding: '14px 14px 14px 44px', 
                      borderRadius: '12px', 
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-color)',
                      color: 'var(--text-main)',
                      outline: 'none'
                    }}
                   />
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setShowNameModal(false)}>Cancel</button>
                  <button className="btn btn-primary" style={{ flex: 1 }} onClick={generatePDF}>Download</button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {!image ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="upload-card" 
            onClick={() => fileInputRef.current.click()}
            style={{ marginTop: 40 }}
          >
            <div style={{ 
              width: 70, 
              height: 70, 
              background: 'var(--primary-glow)', 
              borderRadius: '20px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              margin: '0 auto 20px'
            }}>
              <Upload size={28} color="var(--primary-color)" />
            </div>
            <h3>Upload Portrait</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>AI will handle background & sizing.</p>
            <input type="file" hidden ref={fileInputRef} onChange={handleFileUpload} accept="image/*" />
          </motion.div>
        ) : (
          <div className="grid-preview">
            <div className="panel app-panel">
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 28 }}>
                <Settings size={20} color="var(--primary-color)" />
                <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Options</h3>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 10 }}>Copies</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                  {[4, 8, 12, 24].map((num) => (
                    <button key={num} onClick={() => setCopies(num)} className={`btn ${copies === num ? 'btn-primary' : 'btn-secondary'}`} style={{ padding: '10px 0', fontSize: '13px', borderRadius: '10px' }}>{num}</button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: 'var(--text-muted)', marginBottom: 10 }}>Paper Size</label>
                <select style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '14px' }} value={paperSize} onChange={(e) => setPaperSize(e.target.value)}>
                  <option value="A4">A4 Sheet</option>
                  <option value="4x6">4" x 6" Photo Paper</option>
                </select>
              </div>

              <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '20px 0' }} />

              <div style={{ marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={() => setAddNameDate(!addNameDate)}>
                  <div style={{ 
                    width: 20, 
                    height: 20, 
                    borderRadius: '5px', 
                    border: '2px solid var(--primary-color)', 
                    background: addNameDate ? 'var(--primary-color)' : 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: '0.2s'
                  }}>
                    {addNameDate && <div style={{ width: 8, height: 8, borderRadius: '2px', background: 'white' }} />}
                  </div>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>Enable Name & Date (D.O.P)</span>
                </div>
              </div>

              {addNameDate && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}>
                  <div style={{ marginBottom: 15 }}>
                    <input 
                      type="text" 
                      placeholder="Enter Full Name" 
                      value={photoName}
                      onChange={(e) => setPhotoName(e.target.value)}
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        borderRadius: '10px', 
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-color)',
                        color: 'var(--text-main)',
                        fontSize: '13px'
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: 20 }}>
                    <label style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', marginBottom: 5 }}>Date of Birth (D.O.B)</label>
                    <input 
                      type="date" 
                      value={photoDate}
                      onChange={(e) => setPhotoDate(e.target.value)}
                      style={{ 
                        width: '100%', 
                        padding: '12px', 
                        borderRadius: '10px', 
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-color)',
                        color: 'var(--text-main)',
                        fontSize: '13px',
                        cursor: 'text'
                      }}
                    />
                  </div>
                </motion.div>
              )}

              <div style={{ marginTop: 'auto' }}>
                <button className="btn btn-primary" style={{ width: '100%', marginBottom: 12, padding: '14px' }} onClick={startPdfGeneration} disabled={isProcessing}>
                   <Download size={18} /> Save & Download
                </button>

                {isBgRemoved && (
                  <button 
                    className="btn" 
                    style={{ 
                      width: '100%', 
                      padding: '14px', 
                      borderRadius: '14px', 
                      background: 'rgba(37, 99, 235, 0.1)', 
                      color: 'var(--primary-color)',
                      border: '1px solid rgba(37, 99, 235, 0.2)',
                      marginTop: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      fontWeight: 700
                    }} 
                    onClick={downloadProcessedImage}
                  >
                    <ImageIcon size={18} /> Download PNG Only
                  </button>
                )}

                <button className="btn btn-secondary" style={{ width: '100%', padding: '14px', marginTop: 12 }} onClick={() => setImage(null)}>
                   <RotateCcw size={18} /> New Photo
                </button>
              </div>
            </div>

            <div className="panel app-panel" style={{ position: 'relative' }}>
              <AnimatePresence>
                {isProcessing && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="processing-overlay">
                    <div style={{ textAlign: 'center' }}>
                      <Loader2 size={32} className="animate-spin" color="var(--primary-color)" />
                      <p style={{ marginTop: 16, fontWeight: 600 }}>AI is working...</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <LayoutGrid size={18} color="var(--primary-color)" />
                  <h3 style={{ fontSize: '18px', fontWeight: 700 }}>Preview</h3>
                </div>
                <span className={isBgRemoved ? 'status-badge' : ''}>{isBgRemoved ? 'AI Cleaned' : ''}</span>
              </div>
              <div style={{ flex: 1, background: 'rgba(0,0,0,0.02)', borderRadius: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                <div style={{ 
                  width: '180px', 
                  aspectRatio: '3.5/4.5', 
                  background: 'white', 
                  borderRadius: '4px', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.08)', 
                  overflow: 'hidden',
                  position: 'relative',
                  border: '1px solid #ddd'
                }}>
                  <img 
                    src={image} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      filter: `brightness(${brightness}%) contrast(${contrast}%) blur(${smoothing * 0.2}px)` // Real-time preview
                    }} 
                    alt="passport" 
                  />
                  {addNameDate && (
                    <div style={{ 
                      position: 'absolute', 
                      bottom: 0, 
                      left: 0, 
                      right: 0, 
                      background: 'white', 
                      textAlign: 'center', 
                      padding: '5px 2px',
                      borderTop: '1px solid #ddd',
                      lineHeight: 1.1
                    }}>
                      <div style={{ fontWeight: 800, fontSize: '10px', color: 'black' }}>{photoName || 'YOUR NAME'}</div>
                      <div style={{ fontSize: '8px', color: 'black', marginTop: '2px' }}>D.O.B: {photoDate.split('-').reverse().join('-')}</div>
                    </div>
                  )}
                </div>
                <p style={{ marginTop: 20, fontWeight: 700, color: 'var(--text-main)' }}>35mm x 45mm</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </Layout>
  );
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
        <Route path="/app" element={<GeneratorApp isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
        <Route path="*" element={<LandingPage isDarkMode={isDarkMode} toggleTheme={toggleTheme} />} />
      </Routes>
    </Router>
  );
}

export default App;
