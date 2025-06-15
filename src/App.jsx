import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { QRCodeSVG } from 'qrcode.react';
import { LawIcons } from './components/Icons';
import { ScalesOfJustice, Gavel, LawBook, JusticeRing } from './components/3DModels';
import { translations } from './translations';
import './App.css';

function Scene() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight 
        position={[5, 5, 5]} 
        intensity={1.5} 
        color="#FFD700"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <pointLight position={[-5, 3, 5]} intensity={0.8} color="#FFD700" />
      <spotLight
        position={[0, 8, 0]}
        intensity={1.0}
        angle={0.8}
        penumbra={0.3}
        color="#FFD700"
        castShadow
      />
      
      <ScalesOfJustice position={[-3, 0, 2]} scale={0.8} />
      <Gavel position={[3, 0, 2]} scale={0.8} />
      <LawBook position={[0, -1, 3]} scale={0.8} />
      <JusticeRing position={[0, 2, 1]} scale={0.6} />
      
      <OrbitControls 
        enableZoom={true}
        enablePan={false}
        maxDistance={15}
        minDistance={8}
        maxPolarAngle={Math.PI / 1.8}
        minPolarAngle={Math.PI / 4}
        autoRotate
        autoRotateSpeed={1}
      />
      <PerspectiveCamera makeDefault position={[0, 3, 10]} fov={60} />
    </>
  );
}

function LanguageSelector({ language, setLanguage }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 text-white hover:text-amber-400 transition-colors duration-300 font-medium"
      >
        <LawIcons.Globe className="w-5 h-5" />
        <span className="hidden sm:inline">{language === 'en' ? 'English' : 'ગુજરાતી'}</span>
        <LawIcons.ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-slate-800 border border-slate-700 rounded-lg shadow-xl z-50 min-w-[120px]">
          <button
            onClick={() => {
              setLanguage('en');
              setIsOpen(false);
            }}
            className={`w-full px-4 py-2 text-left hover:bg-slate-700 transition-colors ${
              language === 'en' ? 'text-amber-400' : 'text-white'
            }`}
          >
            English
          </button>
          <button
            onClick={() => {
              setLanguage('gu');
              setIsOpen(false);
            }}
            className={`w-full px-4 py-2 text-left hover:bg-slate-700 transition-colors rounded-b-lg ${
              language === 'gu' ? 'text-amber-400' : 'text-white'
            }`}
          >
            ગુજરાતી
          </button>
        </div>
      )}
    </div>
  );
}

function Navbar({ isScrolled, language, setLanguage, t }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-slate-900/95 backdrop-blur-lg shadow-2xl border-b border-amber-400/20' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <div className="text-xl sm:text-2xl font-bold text-amber-400 tracking-wide">
            {t.brandName}
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            <a href="#home" className="text-white hover:text-amber-400 transition-colors duration-300 font-medium">{t.nav.home}</a>
            <a href="#about" className="text-white hover:text-amber-400 transition-colors duration-300 font-medium">{t.nav.about}</a>
            <a href="#practice" className="text-white hover:text-amber-400 transition-colors duration-300 font-medium">{t.nav.practice}</a>
            <a href="#contact" className="text-white hover:text-amber-400 transition-colors duration-300 font-medium">{t.nav.contact}</a>
            <LanguageSelector language={language} setLanguage={setLanguage} />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <LanguageSelector language={language} setLanguage={setLanguage} />
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-amber-400 hover:text-amber-300 transition-colors"
            >
              <LawIcons.Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-900/95 backdrop-blur-lg border-t border-amber-400/20">
            <div className="px-4 py-4 space-y-4">
              <a href="#home" className="block text-white hover:text-amber-400 transition-colors duration-300 font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.home}</a>
              <a href="#about" className="block text-white hover:text-amber-400 transition-colors duration-300 font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.about}</a>
              <a href="#practice" className="block text-white hover:text-amber-400 transition-colors duration-300 font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.practice}</a>
              <a href="#contact" className="block text-white hover:text-amber-400 transition-colors duration-300 font-medium" onClick={() => setIsMobileMenuOpen(false)}>{t.nav.contact}</a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function App() {
  const [currentUrl, setCurrentUrl] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [language, setLanguage] = useState('en');

  const t = translations[language];

  useEffect(() => {
    setCurrentUrl(window.location.href);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-gray-100">
      <Navbar isScrolled={isScrolled} language={language} setLanguage={setLanguage} t={t} />
      
      {/* Hero Section with 3D Background */}
      <section id="home" className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800">
          <Canvas className="w-full h-full" shadows>
            <Suspense fallback={null}>
              <Scene />
            </Suspense>
          </Canvas>
        </div>
        
        <div className="relative z-10 container mx-auto px-4 sm:px-6 py-20 pt-24 sm:pt-32 h-full flex items-center">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-6xl md:text-8xl font-bold mb-6 text-white leading-tight">
              {t.hero.title}
              <span className="block text-amber-400 bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent">
                {t.hero.subtitle}
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl leading-relaxed">
              {t.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-amber-400 hover:bg-amber-500 text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-sm sm:text-base">
                {t.hero.cta1}
              </button>
              <button className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-900 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 text-sm sm:text-base">
                {t.hero.cta2}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="py-16 sm:py-20 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white">
                {t.about.title} <span className="text-amber-400">{t.about.titleHighlight}</span>
              </h2>
              <h3 className="text-xl sm:text-2xl font-semibold mb-4 text-amber-400">
                {t.about.position}
              </h3>
              <p className="text-base sm:text-lg text-gray-300 mb-6 leading-relaxed">
                {t.about.description}
              </p>
              <blockquote className="border-l-4 border-amber-400 pl-6 italic text-lg sm:text-xl text-gray-300 mb-8">
                "{t.about.quote}"
              </blockquote>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-400">500+</div>
                  <div className="text-gray-400 text-sm sm:text-base">{t.about.casesWon}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-amber-400">15+</div>
                  <div className="text-gray-400 text-sm sm:text-base">{t.about.experience}</div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 sm:w-80 sm:h-80 bg-gradient-to-br from-amber-400/20 to-slate-700 rounded-full flex items-center justify-center overflow-hidden">
                  <img 
                    src="https://i.postimg.cc/FKkFMRww/khushbu.jpg" 
                    alt="Senior Partner & Lead Advocate"
                    className="w-56 h-56 sm:w-72 sm:h-72 object-cover rounded-full border-4 border-amber-400/30"
                  />
                </div>
                <div className="absolute -top-4 -right-4 w-12 h-12 sm:w-16 sm:h-16 bg-amber-400 rounded-full flex items-center justify-center">
                  <LawIcons.Scale className="w-6 h-6 sm:w-8 sm:h-8 text-slate-900" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Practice Areas Section */}
      <section id="practice" className="py-16 sm:py-20 bg-slate-950">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center text-white">
            {t.practice.title} <span className="text-amber-400">{t.practice.titleHighlight}</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {t.practice.areas.map((area, index) => (
              <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 sm:p-6 hover:bg-slate-800/70 transition-all duration-300 border border-slate-700 hover:border-amber-400/30 group cursor-pointer">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <area.icon className="w-6 h-6 sm:w-8 sm:h-8 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-2">{area.name}</h3>
                    <p className="text-gray-400 text-sm">{area.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 sm:py-20 bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-12 text-center text-white">
            {t.contact.title} <span className="text-amber-400">{t.contact.titleHighlight}</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-white">{t.contact.info}</h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <LawIcons.Phone className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">+91 92659 97339</p>
                    <p className="text-white font-semibold">+91 76006 32342</p>
                    <p className="text-gray-400 text-sm">{t.contact.emergencyLine}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-amber-400/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <LawIcons.Location className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white font-semibold">{t.contact.address.line1}</p>
                    <p className="text-gray-400 text-sm">{t.contact.address.line2}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-white">{t.contact.hours}</h3>
              <div className="space-y-3 text-gray-300">
                <div className="flex justify-between">
                  <span>{t.contact.schedule.weekdays}</span>
                  <span className="text-amber-400">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.contact.schedule.saturday}</span>
                  <span className="text-amber-400">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>{t.contact.schedule.sunday}</span>
                  <span className="text-gray-500">{t.contact.schedule.closed}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-700 py-8 sm:py-12">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Brand Section */}
            <div className="md:col-span-4">
              <h3 className="text-xl sm:text-2xl font-bold text-amber-400 mb-4">{t.brandName}</h3>
              <p className="text-gray-400 text-sm sm:text-base mb-4">
                {t.footer.tagline}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <LawIcons.Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <LawIcons.Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">
                  <LawIcons.LinkedIn className="w-5 h-5" />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="md:col-span-3">
              <h4 className="text-lg font-semibold text-white mb-4">{t.footer.quickLinks}</h4>
              <div className="space-y-2">
                <a href="#home" className="block text-gray-400 hover:text-amber-400 transition-colors text-sm">{t.nav.home}</a>
                <a href="#about" className="block text-gray-400 hover:text-amber-400 transition-colors text-sm">{t.nav.about}</a>
                <a href="#practice" className="block text-gray-400 hover:text-amber-400 transition-colors text-sm">{t.nav.practice}</a>
                <a href="#contact" className="block text-gray-400 hover:text-amber-400 transition-colors text-sm">{t.nav.contact}</a>
              </div>
            </div>

            {/* Contact Info */}
            <div className="md:col-span-3">
              <h4 className="text-lg font-semibold text-white mb-4">{t.footer.contactInfo}</h4>
              <div className="space-y-2 text-sm">
                <p className="text-gray-400">+91 92659 97339</p>
                <p className="text-gray-400">+91 76006 32342</p>
                <p className="text-gray-400">{t.contact.address.line1}</p>
              </div>
            </div>
            
            {/* QR Code */}
            <div className="md:col-span-2 flex flex-col items-center md:items-end">
              <h4 className="text-sm font-semibold text-white mb-2 text-center">{t.footer.scanQR}</h4>
              <div className="bg-white p-2 rounded-lg shadow-lg">
                <QRCodeSVG value={currentUrl} size={80} />
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700 mt-8 pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 sm:mb-0">
                © 2024 {t.brandName}. {t.footer.rights}
              </p>
              <div className="flex space-x-4 text-sm">
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">{t.footer.privacy}</a>
                <a href="#" className="text-gray-400 hover:text-amber-400 transition-colors">{t.footer.terms}</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;