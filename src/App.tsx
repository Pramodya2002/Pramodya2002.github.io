import React, { useEffect, useState } from 'react';
import AOS from 'aos';

function App() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [showScroll, setShowScroll] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);

      const sections = ['about', 'projects', 'skills', 'contact'];
      let current = '';

      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          if (window.scrollY >= sectionTop - 100) {
            current = sectionId;
          }
        }
      });
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - bodyRect - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');

    try {
      const form = e.currentTarget;
      const response = await fetch('https://formspree.io/f/mlgpoery', {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };



  useEffect(() => {
    const canvas = document.getElementById("matrixRain") as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const letters = "01<>/{}[]()functionconstletreturnAPIReactJS◉◆▲▼λΣΠΩ∞";
    const fontSize = 15;
    let columns = Math.floor(canvas.width / fontSize);
    let drops: number[] = Array(columns).fill(1);

    const draw = () => {
      ctx.fillStyle = "rgba(10, 10, 20, 0.11)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#c4b5fd";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    const interval = setInterval(draw, 55);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const MatrixRain = () => {
    useEffect(() => {
      const canvas = document.getElementById("matrixRain") as HTMLCanvasElement;
      if (!canvas) return;

      const ctx = canvas.getContext("2d", { alpha: true });
      if (!ctx) return;

      const resizeCanvas = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };

      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      const letters = "01<>/{}[]()functionconstletreturnAPIReactJS◉◆▲▼λΣΠΩ∞≈≠";
      const fontSize = 15;
      let columns = Math.floor(canvas.width / fontSize);
      let drops: number[] = Array(columns).fill(1);

      const draw = () => {
        ctx.fillStyle = "rgba(10, 10, 20, 0.12)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "#c4b5fd";        // Soft violet
        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = letters[Math.floor(Math.random() * letters.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }
          drops[i]++;
        }
      };

      const interval = setInterval(draw, 55);

      return () => {
        clearInterval(interval);
        window.removeEventListener("resize", resizeCanvas);
      };
    }, []);

    return (
      <canvas
        id="matrixRain"
        className="absolute inset-0 w-full h-full opacity-20 pointer-events-none z-0"
      />
    );
  };

  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden selection:bg-violet-600 selection:text-white">
      {/* Background Effects */}
      <div className="absolute w-[500px] h-[500px] bg-violet-600 rounded-full blur-[250px] opacity-30 top-[-150px] left-[-150px] animate-pulse z-0" />
      <div className="absolute w-[300px] h-[300px] bg-fuchsia-500 rounded-full blur-[200px] opacity-20 bottom-[-100px] right-[-100px] z-0" />
      <div className="absolute inset-0 bg-[radial-gradient(circle,_rgba(255,255,255,0.05)_1px,_transparent_1px)] bg-[size:20px_20px] z-0 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 w-[300px] h-[300px] bg-white opacity-[0.04] blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2 z-0" />

      {/* Header */}
      <header className="fixed top-0 left-0 w-full z-50 p-5 sm:p-6 backdrop-blur-sm bg-black/80 border-b border-white/10 flex justify-between items-center">
        <h1 className="text-2xl sm:text-3xl tracking-widest text-violet-400 font-logo">
          DHEESHANI.DEV
        </h1>

        {/* Desktop Nav */}
        <nav className="hidden sm:flex items-center gap-10 text-sm uppercase tracking-[2px] font-medium">
          {['about', 'projects', 'skills', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`relative py-2 px-1 transition-all duration-300 hover:-translate-y-0.5 
        ${activeSection === section
                  ? 'text-white'
                  : 'text-gray-400 hover:text-white'
                }`}
            >
              {section.charAt(0).toUpperCase() + section.slice(1)}

              <span className={`absolute left-1/2 -bottom-1 h-[2px] bg-gradient-to-r from-violet-400 to-fuchsia-500 
        transition-all duration-500 -translate-x-1/2
        ${activeSection === section
                  ? 'w-full shadow-[0_0_8px_#a855f7]'
                  : 'w-0 group-hover:w-full'
                }`}
              />

              {activeSection === section && (
                <span className="absolute inset-0 bg-gradient-to-r from-violet-500/10 to-fuchsia-500/10 rounded-lg -z-10 blur-sm" />
              )}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="sm:hidden text-3xl text-violet-400 hover:text-white transition-all duration-300 active:scale-90 z-50"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[100] sm:hidden flex items-center justify-center">

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-8 right-8 text-5xl text-violet-400 hover:text-white transition-all duration-300 z-10"
          >
            ✕
          </button>

          <div className="flex flex-col items-center justify-center space-y-10 text-4xl font-light text-center">
            {['about', 'projects', 'skills', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="relative px-12 py-5 text-white hover:text-violet-400 
                     transition-all duration-300 hover:scale-110 active:scale-95
                     hover:bg-white/10 rounded-3xl w-80 group"
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}

                <span className="absolute bottom-4 left-1/2 -translate-x-1/2 h-[3px] w-0 bg-gradient-to-r from-violet-400 to-fuchsia-500 
                           group-hover:w-16 transition-all duration-300" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col justify-center items-center px-6 text-center bg-gradient-to-br from-black via-slate-950 to-black overflow-hidden">
        <MatrixRain />


        <div className="absolute w-[450px] h-[450px] bg-violet-500 opacity-20 blur-3xl top-[-120px] left-[-120px] animate-pulse" />
        <div className="absolute w-[300px] h-[300px] bg-pink-500 opacity-10 blur-3xl bottom-[-60px] right-[-80px] animate-pulse" />
        <div className="absolute inset-0 bg-[url('/particles.svg')] opacity-[0.04] bg-cover bg-center pointer-events-none z-0" />



        <div className="z-10 max-w-4xl">
          <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm mb-6">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            Open to opportunities
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-500 to-pink-500 font-hero tracking-tight">
            Hi, I’m Dheeshani
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-300 font-light max-w-2xl mx-auto">
            Full-Stack Software Engineer crafting scalable web applications and delightful digital experiences with React, Laravel, and WordPress.
          </p>




          <div className="mt-12 flex flex-wrap justify-center gap-5 sm:gap-6">
            <button
              onClick={() => scrollToSection('projects')}
              className="px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-full font-semibold shadow-lg hover:scale-105 transition-all active:scale-95"
            >
              See My Work
            </button>
            <a
              href="./Dheeshani_CV.pdf"
              target="_blank"
              className="px-8 py-4 border border-violet-500/60 hover:bg-violet-950/40 rounded-full transition-all"
            >
              Download CV
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="scroll-mt-24 relative pt-24 pb-32 px-6 max-w-6xl mx-auto z-10" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl text-violet-400 mb-16 text-center md:text-left font-section tracking-tight">
          About Me
        </h2>


        <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-center">
          <div className="md:col-span-2 relative">
            <div className="relative rounded-3xl overflow-hidden border-4 border-violet-600/40 shadow-2xl aspect-square max-w-xs mx-auto md:mx-0">
              <img
                src="/skills/dp.png"
                alt="Dheeshani"
                className="object-cover w-full h-full transition-transform duration-700 hover:scale-110"
              />
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4 text-center max-w-xs mx-auto md:mx-0">
              <div className="bg-white/5 backdrop-blur rounded-2xl p-5 border border-white/10">
                <div className="text-3xl font-bold text-violet-400">3–4+</div>
                <div className="text-sm text-gray-400 mt-1">Years Experience</div>
              </div>
              <div className="bg-white/5 backdrop-blur rounded-2xl p-5 border border-white/10">
                <div className="text-3xl font-bold text-violet-400">Full-Stack</div>
                <div className="text-sm text-gray-400 mt-1">React • Laravel • WordPress</div>
              </div>
            </div>
          </div>

          <div className="md:col-span-3 space-y-8 text-gray-300">
            <p className="text-lg leading-relaxed">
              I'm a passionate <strong className="text-violet-300">BSc (Hons) Computer Science graduate</strong> focused on building clean, user-friendly, and impactful web applications that solve real-world problems.
            </p>

            <p className="leading-relaxed">
              I work across modern full-stack technologies including <strong>React</strong>, <strong>Laravel</strong>, <strong>WordPress</strong>, and the JavaScript/TypeScript ecosystem.
              From dynamic booking platforms to elegant eCommerce websites, I enjoy creating fast, scalable, and maintainable digital products with excellent user experiences.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 pt-4">
              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-7 border border-white/10 hover:border-violet-500/50 transition">
                <h4 className="text-lg font-semibold text-violet-300 mb-4">Core Expertise</h4>
                <ul className="text-sm space-y-2.5 text-gray-300">
                  <li>• Full-stack development (React + Laravel)</li>
                  <li>• WordPress & WooCommerce development</li>
                  <li>• REST APIs & backend architecture</li>
                  <li>• Responsive & modern UI design</li>
                </ul>
              </div>

              <div className="bg-white/5 backdrop-blur-md rounded-2xl p-7 border border-white/10 hover:border-violet-500/50 transition">
                <h4 className="text-lg font-semibold text-violet-300 mb-4">What I Deliver</h4>
                <ul className="text-sm space-y-2.5 text-gray-300">
                  <li>• Scalable and maintainable code</li>
                  <li>• High-performance solutions</li>
                  <li>• Clean, pixel-perfect interfaces</li>
                  <li>• Great user experience</li>
                </ul>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-3 text-violet-400 hover:text-violet-300 transition group text-lg"
              >
                Let's work together
                <span className="group-hover:translate-x-2 transition">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="scroll-mt-24 relative pt-20 pb-32 px-6 max-w-7xl mx-auto z-10" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl text-violet-400 mb-16 text-center font-section tracking-tight">
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          <div className="bg-white/5 border border-white/10 rounded-3xl shadow-xl backdrop-blur-md p-8 flex flex-col min-h-[480px] transition-all hover:-translate-y-3 hover:shadow-violet-500/40 duration-300 group">
            <img src="/projects/procurio.png" alt="Procurio" className="w-full h-52 object-cover rounded-2xl mb-6 group-hover:scale-[1.03] transition-transform" />
            <h4 className="text-2xl font-bold text-white mb-3">Procurio General Trading Website</h4>
            <p className="text-gray-300 text-sm flex-1 leading-relaxed">
              A responsive WordPress website built for Procurio General Trading LLC, a Dubai‑based hospitality supplier. The site highlights their hotel equipment and operating supplies, features an About section, partner showcase, contact form, and newsletter—all powered by a custom WordPress theme.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-xs bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full">#WordPress</span>
              <span className="text-xs bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full">#Elementor</span>
            </div>
            <a href="https://procurio-me.com" target="_blank" rel="noreferrer" className="mt-6 text-violet-400 hover:text-violet-300 font-medium inline-flex items-center gap-2">
              Visit Website →
            </a>
          </div>

          {/* Lotus n Loom Project */}
          <div className="bg-white/5 border border-white/10 rounded-3xl shadow-xl backdrop-blur-md p-8 flex flex-col min-h-[480px] transition-all hover:-translate-y-3 hover:shadow-violet-500/40 duration-300 group">
            <img src="/projects/lotusnloom.png" alt="Lotus n Loom" className="w-full h-52 object-cover rounded-2xl mb-6 group-hover:scale-[1.03] transition-transform" />
            <h4 className="text-2xl font-bold text-white mb-3">Lotus n Loom Website</h4>
            <p className="text-gray-300 text-sm flex-1 leading-relaxed">
              A modern and elegant website developed for Lotus n Loom, showcasing handcrafted products with a clean UI, responsive design, and smooth user experience tailored for an online brand presence.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-xs bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full">#WordPress</span>
              <span className="text-xs bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full">#WooCommerce</span>
              <span className="text-xs bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full">#Elementor</span>
            </div>
            <a href="https://lotusnloom.com/" target="_blank" rel="noreferrer" className="mt-6 text-violet-400 hover:text-violet-300 font-medium inline-flex items-center gap-2">
              Visit Website →
            </a>
          </div>

          {/* Trypod Project */}
          <div className="bg-white/5 border border-white/10 rounded-3xl shadow-xl backdrop-blur-md p-8 flex flex-col min-h-[480px] transition-all hover:-translate-y-3 hover:shadow-violet-500/40 duration-300 group">
            <img src="/projects/trypod.png" alt="Trypod Booking" className="w-full h-52 object-cover rounded-2xl mb-6 group-hover:scale-[1.03] transition-transform" />
            <h4 className="text-2xl font-bold text-white mb-3">Appointment Booking Platform</h4>
            <p className="text-gray-300 text-sm flex-1 leading-relaxed">
              A customer-friendly booking system with Laravel + React + Tailwind stack. Includes filters, service cart, and store pages.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <span className="text-xs bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full">#React</span>
              <span className="text-xs bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full">#Laravel</span>
              <span className="text-xs bg-violet-500/20 text-violet-300 px-3 py-1 rounded-full">#TailwindCSS</span>
            </div>
            <a href="https://trypod.lk/" target="_blank" rel="noreferrer" className="mt-6 text-violet-400 hover:text-violet-300 font-medium inline-flex items-center gap-2">
              Visit Site →
            </a>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="scroll-mt-24 z-10 relative py-20 px-6 max-w-5xl mx-auto" data-aos="fade-up">
        <h2 className="text-4xl md:text-5xl text-violet-400 mb-16 text-center font-section tracking-tight">
          Skills
        </h2>

        <div className="space-y-16">
          {/* Frontend */}
          <div>
            <h3 className="text-xl font-semibold text-violet-300 mb-6 flex items-center gap-3">
              <span>⚡</span> Frontend
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {['React', 'JavaScript', 'HTML', 'CSS'].map((skill, i) => {
                const icons = [
                  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
                  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-plain.svg",
                  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
                  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"
                ];
                return (
                  <div key={i} className="flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-violet-500/50 transition">
                    <img src={icons[i]} alt={skill} className="w-14 h-14 mb-4" />
                    <span className="text-white font-medium">{skill}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Backend & Database */}
          <div>
            <h3 className="text-xl font-semibold text-violet-300 mb-6 flex items-center gap-3">
              <span>🛢️</span> Backend & Database
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {['Laravel', 'MySQL'].map((skill, i) => {
                const icons = [
                  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
                  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"
                ];
                return (
                  <div key={i} className="flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-violet-500/50 transition">
                    <img src={icons[i]} alt={skill} className="w-14 h-14 mb-4" />
                    <span className="text-white font-medium">{skill}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CMS & Tools */}
          <div>
            <h3 className="text-xl font-semibold text-violet-300 mb-6 flex items-center gap-3">
              <span>🛠️</span> CMS & Tools
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6">
              {['WordPress', 'Elementor', 'Docker', 'Git'].map((skill, i) => {
                const icons = [
                  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-plain.svg",
                  "/skills/elementor.png",
                  "/skills/docker.png",
                  "/skills/social.png"
                ];
                return (
                  <div key={i} className="flex flex-col items-center bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-violet-500/50 transition">
                    <img src={icons[i]} alt={skill} className="w-14 h-14 mb-4" />
                    <span className="text-white font-medium">{skill}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-24 z-10 relative py-20 px-6 max-w-3xl mx-auto" data-aos="fade-up">
        <h2 className="text-4xl text-violet-400 mb-12 text-center font-section tracking-tight">
          Get in Touch
        </h2>

        <form onSubmit={handleFormSubmit} className="bg-white/5 border border-white/10 rounded-3xl p-10 backdrop-blur-lg">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="mb-6">
              <label htmlFor="name" className="block text-sm text-gray-300 mb-2">Name</label>
              <input type="text" id="name" name="name" required className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 focus:border-violet-500 focus:ring-0" placeholder="Your name" />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block text-sm text-gray-300 mb-2">Email</label>
              <input type="email" id="email" name="_replyto" required className="w-full px-5 py-4 rounded-2xl bg-black/40 border border-white/10 focus:border-violet-500 focus:ring-0" placeholder="you@example.com" />
            </div>
          </div>

          <div className="mb-8">
            <label htmlFor="message" className="block text-sm text-gray-300 mb-2">Message</label>
            <textarea id="message" name="message" rows={6} required className="w-full px-5 py-4 rounded-3xl bg-black/40 border border-white/10 focus:border-violet-500 focus:ring-0 resize-none" placeholder="How can I help you?"></textarea>
          </div>

          <button
            type="submit"
            disabled={formStatus === 'sending'}
            className="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-2xl font-semibold text-lg hover:brightness-110 transition disabled:opacity-70"
          >
            {formStatus === 'sending' ? 'Sending Message...' : 'Send Message'}
          </button>

          {formStatus === 'success' && <p className="mt-6 text-green-400 text-center">Thank you! I'll get back to you soon.</p>}
          {formStatus === 'error' && <p className="mt-6 text-red-400 text-center">Something went wrong. Please try again.</p>}
        </form>

        <div className="text-center mt-12 text-gray-400">
          Or reach me directly on{' '}
          <a href="https://www.linkedin.com/in/pramodyaathauda/" target="_blank" className="text-violet-400 hover:underline">LinkedIn</a> or{' '}
          <a href="mailto:pramodya511@gmail.com" className="text-violet-400 hover:underline">Email</a>
        </div>
      </section>

      {/* Scroll to Top */}
      {showScroll && (
        <button onClick={scrollToTop} className="fixed bottom-8 right-8 z-50 group" aria-label="Scroll to top">
          <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-fuchsia-600 shadow-2xl transition hover:scale-110">
            <span className="absolute inset-0 bg-violet-500 rounded-full opacity-30 blur-xl group-hover:opacity-50 transition" />
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
            </svg>
          </div>
        </button>
      )}

      {/* Footer */}
      <footer className="text-center py-16 border-t border-gray-800/70 text-gray-500 text-sm z-10 relative">
        <p>© {new Date().getFullYear()} Dheeshani • Built with React, Tailwind & 💜</p>
        <p className="mt-3">
          <a href="https://github.com/Pramodya2002" target="_blank" className="hover:text-violet-400 mx-3">GitHub</a> •
          <a href="https://www.linkedin.com/in/pramodyaathauda/" target="_blank" className="hover:text-violet-400 mx-3">LinkedIn</a>
        </p>
      </footer>

      {/* Global Styles for Animation */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out forwards;
          }
        `
      }} />


      {/* Global Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(40px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `
      }} />
    </div>
  );
}

export default App;