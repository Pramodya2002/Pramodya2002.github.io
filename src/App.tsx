import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [showScroll, setShowScroll] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  const navItems = ['about', 'projects', 'experience', 'skills', 'certifications', 'contact'];

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      offset: 80,
      easing: 'ease-out-cubic',
    });
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);

      let current = '';
      navItems.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section && window.scrollY >= section.offsetTop - 150) {
          current = sectionId;
        }
      });

      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);

    if (element) {
      const offset = 92;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition - bodyRect - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
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
        headers: { Accept: 'application/json' },
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


  const MatrixRain = () => {
    useEffect(() => {
      const canvas = document.getElementById('matrixRain') as HTMLCanvasElement;
      if (!canvas) return;

      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) return;

      const resizeCanvas = () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
      };

      resizeCanvas();
      window.addEventListener('resize', resizeCanvas);

      const letters = '01<>/{}[]()functionconstletreturnAPIReactJSLaravelWP';
      const fontSize = 15;
      let columns = Math.floor(canvas.width / fontSize);
      let drops: number[] = Array(columns).fill(1);

      const draw = () => {
        if (columns !== Math.floor(canvas.width / fontSize)) {
          columns = Math.floor(canvas.width / fontSize);
          drops = Array(columns).fill(1);
        }

        ctx.fillStyle = 'rgba(3, 1, 10, 0.14)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#d8b4fe';
        ctx.shadowColor = '#a855f7';
        ctx.shadowBlur = 14;
        ctx.font = `${fontSize}px Space Grotesk, monospace`;

        for (let i = 0; i < drops.length; i++) {
          const text = letters[Math.floor(Math.random() * letters.length)];
          ctx.fillText(text, i * fontSize, drops[i] * fontSize);

          if (drops[i] * fontSize > canvas.height && Math.random() > 0.974) {
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

    return <canvas id="matrixRain" className="absolute inset-0 z-0 h-full w-full opacity-20 pointer-events-none" />;
  };

  const projects = [
    {
      title: 'Procurio General Trading Website',
      image: '/projects/procurio.png',
      alt: 'Procurio',
      description:
        'A responsive WordPress website built for Procurio General Trading LLC, a Dubai-based hospitality supplier. The site highlights their hotel equipment and operating supplies, features an About section, partner showcase, contact form, and newsletter-all powered by a custom WordPress theme.',
      tags: ['WordPress', 'Elementor'],
      href: 'https://procurio-me.com',
      linkText: 'Visit Website',
    },
    {
      title: 'Lotus n Loom Website',
      image: '/projects/lotusnloom.png',
      alt: 'Lotus n Loom',
      description:
        'A modern and elegant website developed for Lotus n Loom, showcasing handcrafted products with a clean UI, responsive design, and smooth user experience tailored for an online brand presence.',
      tags: ['WordPress', 'WooCommerce', 'Elementor'],
      href: 'https://lotusnloom.com/',
      linkText: 'Visit Website',
    },
    {
      title: 'Appointment Booking Platform',
      image: '/projects/trypod.png',
      alt: 'Trypod Booking',
      description:
        'A customer-friendly booking system with Laravel + React + Tailwind stack. Includes filters, service cart, and store pages.',
      tags: ['React', 'Laravel', 'TailwindCSS'],
      href: 'https://trypod.lk/',
      linkText: 'Visit Site',
    },
  ];

  const technicalSkills = [
    {
      title: 'Web Development',
      skills: ['HTML', 'CSS', 'JavaScript', 'PHP', 'WordPress', 'Responsive Design', 'Elementor'],
    },
    {
      title: 'Frameworks & Libraries',
      skills: ['React.js', 'Laravel', 'Tailwind CSS'],
    },
    {
      title: 'Programming Languages',
      skills: ['Java', 'C++', 'JavaScript', 'PHP'],
    },
    {
      title: 'Tools & Technologies',
      skills: ['MySQL', 'Docker', 'Git', 'VS Code', 'Visual Studio', 'IntelliJ IDEA', 'Jira', 'Notion', 'Asana'],
    },
  ];

  const softSkills = [
    'Problem Solving',
    'Critical Thinking',
    'Attention to Detail',
    'Strategic Planning',
    'Project Coordination',
    'Project Management',
    'Leadership',
    'Team Collaboration',
    'Conflict Resolution',
    'Communication',
    'Strong Verbal Communication',
    'Strong Written Communication',
    'Time Management',
    'Meeting Deadlines',
    'Multitasking',
    'Adaptability',
    'Continuous Learning',
    'Risk Management',
    'Process Improvement',
  ];

  const linkedinCertificates = [
    'Succeeding in Web Development: Full Stack and Front End',
    'Introduction to Web Design and Development',
    'HTML, CSS and Generative AI: Speed Up Your Process',
    'WordPress Essential Training (2023)',
    'WordPress Ecommerce: WooCommerce',
    'WordPress: SEO',
    'Technical Writing: Quick Start Guide',
    'Creating API Documentation',
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030108] text-white selection:bg-purple-500 selection:text-white">

      <div
        className="pointer-events-none fixed left-0 top-0 z-[120] hidden h-5 w-5 rounded-full bg-purple-300 mix-blend-difference transition-transform duration-75 md:block"
        style={{ transform: `translate(${cursorPosition.x - 10}px, ${cursorPosition.y - 10}px)` }}
      />
      <div
        className="pointer-events-none fixed left-0 top-0 z-[119] hidden h-12 w-12 rounded-full border border-purple-300/70 transition-transform duration-200 md:block"
        style={{ transform: `translate(${cursorPosition.x - 24}px, ${cursorPosition.y - 24}px)` }}
      />


      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#030108_0%,#11001f_38%,#050009_100%)]" />
        <div className="absolute inset-0 opacity-[0.12] bg-[linear-gradient(rgba(216,180,254,.2)_1px,transparent_1px),linear-gradient(90deg,rgba(216,180,254,.2)_1px,transparent_1px)] bg-[size:58px_58px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(168,85,247,.32),transparent_26%),radial-gradient(circle_at_85%_20%,rgba(236,72,153,.18),transparent_24%),radial-gradient(circle_at_50%_100%,rgba(124,58,237,.22),transparent_32%)]" />
        <div className="absolute left-0 top-0 h-full w-full opacity-40 animated-aurora" />
      </div>


      <header className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 rounded-full border border-white/10 bg-black/55 px-5 py-3 shadow-2xl shadow-purple-950/40 backdrop-blur-2xl">
        <div className="flex items-center justify-between">
          <button
            onClick={scrollToTop}
            className="font-display text-lg font-black tracking-[0.24em] text-white sm:text-xl"
            aria-label="Go to top"
          >
            <span className="text-purple-400">D</span>HEESHANI
          </button>

          <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1 lg:flex">
            {navItems.map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-300 ${activeSection === section
                  ? 'bg-purple-500 text-white shadow-lg shadow-purple-500/30'
                  : 'text-zinc-400 hover:bg-white/10 hover:text-white'
                  }`}
              >
                {section}
              </button>
            ))}
          </nav>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="grid h-11 w-11 place-items-center rounded-full border border-purple-400/30 bg-purple-500/10 text-2xl text-purple-200 transition hover:bg-purple-500/20 lg:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? '×' : '≡'}
          </button>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[80] bg-black/95 px-8 py-28 backdrop-blur-2xl lg:hidden overflow-y-auto">

          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-8 right-8 z-10 grid h-10 w-10 place-items-center rounded-full border border-white/20 bg-white/10 text-4xl text-white hover:bg-white/20 transition-all active:scale-95"
            aria-label="Close menu"
          >
            ×
          </button>

          <div className="flex h-full flex-col justify-center gap-5 pt-12">
            {navItems.map((section, index) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="group flex items-center justify-between rounded-3xl border border-white/10 bg-white/[0.04] px-6 py-5 text-left transition hover:border-purple-400/60 hover:bg-purple-500/10"
                style={{ animation: `fadeInUp .55s ease ${index * 70}ms both` }}
              >
                <span className="font-display text-3xl capitalize text-white">{section}</span>
                <span className="text-purple-300 transition group-hover:translate-x-2">→</span>
              </button>
            ))}
          </div>
        </div>
      )}


      <section className="relative z-10 min-h-screen overflow-hidden px-6 pt-32">
        <MatrixRain />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-8rem)] max-w-7xl items-center gap-14 py-20 lg:grid-cols-[1.12fr_.88fr]">
          <div data-aos="fade-right">
            <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-purple-400/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-100 shadow-lg shadow-purple-950/40">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_18px_#34d399]" />
              Open to opportunities
            </div>

            <h1 className="font-display text-6xl font-black leading-[0.92] tracking-normal text-white sm:text-7xl lg:text-8xl">
              Hi, I'm
              <span className="block bg-gradient-to-r from-purple-200 via-fuchsia-300 to-white bg-clip-text text-transparent animated-title">
                Dheeshani
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
              Computer Science Graduate & Full-Stack Software Engineer crafting scalable web applications and delightful
              digital experiences with React, Laravel, and WordPress.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection('projects')}
                className="group rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-500 px-8 py-4 font-bold text-white shadow-2xl shadow-purple-600/30 transition hover:-translate-y-1 hover:shadow-purple-500/50"
              >
                See My Work <span className="inline-block transition group-hover:translate-x-1">→</span>
              </button>

              <a
                href="./Dheeshani_CV.pdf"
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/15 bg-white/[0.04] px-8 py-4 font-bold text-white backdrop-blur transition hover:-translate-y-1 hover:border-purple-300/70 hover:bg-purple-500/10"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md" data-aos="zoom-in">
            <div className="absolute -inset-6 rounded-[2.5rem] border border-purple-300/20 animated-border" />
            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.05] p-5 shadow-2xl shadow-purple-950/50 backdrop-blur-2xl">
              <div className="aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-purple-300/20">
                <img
                  src="/skills/dp.png"
                  alt="Dheeshani"
                  className="h-full w-full object-cover grayscale-[18%] transition duration-700 hover:scale-105 hover:grayscale-0"
                />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="font-display text-3xl text-purple-300">3-4+</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-400">Years Experience</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                  <p className="font-display text-2xl text-purple-300">Full-Stack</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-400">React / Laravel / WordPress</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <section id="about" className="relative z-10 mx-auto max-w-7xl scroll-mt-28 px-6 py-24" data-aos="fade-up">
        <div className="mb-12">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-purple-300">About Me</p>
          <h2 className="font-display text-4xl font-black text-white md:text-6xl">
            I build clean digital products with personality.
          </h2>
        </div>

        <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
            <p className="text-lg leading-8 text-zinc-300">
              I'm a passionate <strong className="text-purple-200">BSc (Hons) Computer Science graduate</strong> from
              Staffordshire University with <strong className="text-purple-200"> Second Class Honours (First Division)</strong>,
              specializing in modern full-stack web development and creating impactful digital experiences through scalable
              and user-focused applications.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-purple-500/10 to-white/[0.03] p-8 backdrop-blur-xl">
            <p className="leading-8 text-zinc-300">
              I work across modern full-stack technologies including <strong>React</strong>, <strong>Laravel</strong>,
              <strong> WordPress</strong>, and the JavaScript/TypeScript ecosystem. From dynamic booking platforms to elegant
              eCommerce websites, I enjoy creating fast, scalable, and maintainable digital products with excellent user experiences.
            </p>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-black/30 p-8">
            <h4 className="mb-5 font-display text-2xl text-purple-200">Core Expertise</h4>
            <ul className="space-y-3 text-zinc-300">
              <li>Full-stack development (React + Laravel)</li>
              <li>WordPress & WooCommerce development</li>
              <li>REST APIs & backend architecture</li>
              <li>Responsive & modern UI design</li>
            </ul>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-black/30 p-8">
            <h4 className="mb-5 font-display text-2xl text-purple-200">What I Deliver</h4>
            <ul className="space-y-3 text-zinc-300">
              <li>Scalable and maintainable code</li>
              <li>High-performance solutions</li>
              <li>Clean, pixel-perfect interfaces</li>
              <li>Great user experience</li>
            </ul>

            <button
              onClick={() => scrollToSection('contact')}
              className="mt-8 inline-flex items-center gap-3 rounded-full border border-purple-400/40 px-5 py-3 font-semibold text-purple-200 transition hover:bg-purple-500/15"
            >
              Let's work together <span>→</span>
            </button>
          </div>
        </div>
      </section>

      <section id="projects" className="relative z-10 mx-auto max-w-7xl scroll-mt-28 px-6 py-24" data-aos="fade-up">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-purple-300">Selected Work</p>
          <h2 className="font-display text-4xl font-black text-white md:text-6xl">Featured Projects</h2>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-4 backdrop-blur-xl transition duration-500 hover:-translate-y-3 hover:border-purple-300/50 hover:shadow-2xl hover:shadow-purple-700/20"
              style={{ animation: `fadeInUp .7s ease ${index * 120}ms both` }}
            >
              <div className="relative h-56 overflow-hidden rounded-[1.45rem]">
                <img
                  src={project.image}
                  alt={project.alt}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
              </div>

              <div className="p-4">
                <h3 className="font-display text-2xl text-white">{project.title}</h3>
                <p className="mt-4 min-h-[150px] text-sm leading-7 text-zinc-300">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-purple-300/20 bg-purple-500/10 px-3 py-1 text-xs font-semibold text-purple-200"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-6 inline-flex items-center gap-2 font-bold text-purple-200 transition hover:text-white"
                >
                  {project.linkText} <span className="transition group-hover:translate-x-1">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="experience" className="relative z-10 mx-auto max-w-5xl scroll-mt-28 px-6 py-24" data-aos="fade-up">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-purple-300">Career Path</p>
          <h2 className="font-display text-4xl font-black text-white md:text-6xl">Work Experience</h2>
        </div>

        <div className="relative space-y-8 before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-purple-400 before:via-purple-900 before:to-transparent md:before:left-1/2">
          {[
            {
              role: 'Software Engineer Trainee',
              company: 'Impresso Ceylon Holdings (Pvt) Ltd',
              date: 'Dec 2024 - Present',
              points: [
                'Developing full-stack web applications using React, Laravel, and Tailwind CSS',
                'Building and maintaining booking systems and business management tools',
                'Collaborating with senior developers on feature implementation and performance optimization',
                'Working in Agile environment with sprint planning and iterative development',
              ],
            },
            {
              role: 'WordPress Developer (Part-time)',
              company: 'Engage Lanka',
              date: 'Dec 2024 - Apr 2025',
              points: [
                'Developing and customizing responsive websites using WordPress and Elementor',
                'Creating modern and user-friendly web experiences for clients',
                'Implementing key features and optimizing website performance',
              ],
            },
          ].map((job, index) => (
            <div
              key={job.role}
              className={`relative pl-12 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12 md:pl-0' : 'md:ml-auto md:pl-12'}`}
            >
              <span
                className={`absolute top-8 h-4 w-4 rounded-full bg-purple-300 shadow-[0_0_24px_#c084fc] ${index % 2 === 0 ? 'left-[9px] md:-right-2 md:left-auto' : 'left-[9px] md:-left-2'
                  }`}
              />
              <div className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-8 backdrop-blur-xl transition hover:border-purple-300/50 hover:bg-purple-500/10">
                <p className="mb-3 text-sm font-semibold uppercase tracking-[0.22em] text-purple-300">{job.date}</p>
                <h3 className="font-display text-2xl text-white">{job.role}</h3>
                <p className="mt-1 text-purple-200">{job.company}</p>
                <ul className="mt-6 space-y-3 text-sm leading-7 text-zinc-300">
                  {job.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="skills" className="relative z-10 mx-auto max-w-6xl scroll-mt-28 px-6 py-24" data-aos="fade-up">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-purple-300">Capabilities</p>
          <h2 className="font-display text-4xl font-black text-white md:text-6xl">Skills</h2>
        </div>

        <div className="mb-16 overflow-hidden rounded-full border border-white/10 bg-white/[0.04] py-4">
          <div className="flex w-max animate-[marquee_28s_linear_infinite] gap-4 px-4">
            {[...technicalSkills.flatMap((item) => item.skills), ...technicalSkills.flatMap((item) => item.skills)].map(
              (skill, index) => (
                <span key={`${skill}-${index}`} className="rounded-full bg-purple-500/15 px-5 py-2 text-sm font-semibold text-purple-100">
                  {skill}
                </span>
              ),
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {technicalSkills.map((group) => (
            <div key={group.title} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl transition hover:border-purple-300/50">
              <h3 className="mb-6 font-display text-2xl text-purple-200">{group.title}</h3>
              <div className="flex flex-wrap gap-3">
                {group.skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-white/10 bg-black/30 px-5 py-2.5 text-sm text-zinc-200 transition hover:-translate-y-1 hover:border-purple-300/50 hover:text-white">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <h3 className="mb-8 font-display text-3xl text-white">Soft Skills</h3>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {softSkills.map((skill) => (
              <div key={skill} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-center text-sm font-semibold text-zinc-300 transition hover:-translate-y-1 hover:border-purple-300/50 hover:bg-purple-500/10 hover:text-white">
                {skill}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="certifications" className="relative z-10 mx-auto max-w-6xl scroll-mt-28 px-6 py-24" data-aos="fade-up">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-purple-300">Credentials</p>
          <h2 className="font-display text-4xl font-black text-white md:text-6xl">Certifications</h2>
        </div>

        <div className="grid gap-7 lg:grid-cols-2">
          <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-purple-500/15 to-white/[0.04] p-8 backdrop-blur-xl">
            <p className="mb-8 text-xs font-bold uppercase tracking-[0.32em] text-purple-200">University of Cambridge</p>
            <div className="space-y-5">
              {[
                { name: 'Cambridge Young Learners English (YLE) Flyers', year: '2016' },
                { name: 'Key English Test (KET) - B1', year: '2016' },
                { name: 'Preliminary English Test (PET) - B1', year: '2018' },
                { name: 'First Certificate in English (FCE) - B2', year: '2019' },
              ].map((cert) => (
                <div key={cert.name} className="flex items-start justify-between gap-5 border-b border-white/10 pb-5 last:border-none last:pb-0">
                  <span className="text-zinc-200">{cert.name}</span>
                  <span className="font-mono text-sm text-purple-200">{cert.year}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl">
            <p className="mb-8 text-xs font-bold uppercase tracking-[0.32em] text-purple-200">University of West London</p>
            <h3 className="font-display text-3xl text-white">Personal and Professional Communication</h3>
            <div className="mt-7 inline-flex rounded-full border border-emerald-300/20 bg-emerald-400/10 px-5 py-2 text-sm font-bold text-emerald-200">
              Passed with Distinction
            </div>
            <p className="mt-8 font-mono text-sm text-zinc-400">2019</p>
          </div>
        </div>

        <div className="mt-12 rounded-[2rem] border border-white/10 bg-black/30 p-8">
          <h3 className="mb-8 font-display text-3xl text-white">LinkedIn Learning Certificates</h3>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {linkedinCertificates.map((cert) => (
              <div key={cert} className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 text-sm leading-6 text-zinc-300 transition hover:border-purple-300/50 hover:bg-purple-500/10 hover:text-white">
                {cert}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="relative z-10 mx-auto max-w-4xl scroll-mt-28 px-6 py-24" data-aos="fade-up">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.35em] text-purple-300">Contact</p>
          <h2 className="font-display text-4xl font-black text-white md:text-6xl">Get in Touch</h2>
        </div>

        <form onSubmit={handleFormSubmit} className="rounded-[2rem] border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-purple-950/30 backdrop-blur-2xl sm:p-10">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-semibold text-zinc-300">Name</label>
              <input type="text" id="name" name="name" required className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-300/70 focus:bg-purple-500/5" placeholder="Your name" />
            </div>

            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-semibold text-zinc-300">Email</label>
              <input type="email" id="email" name="_replyto" required className="w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-300/70 focus:bg-purple-500/5" placeholder="you@example.com" />
            </div>
          </div>

          <div className="mt-6">
            <label htmlFor="message" className="mb-2 block text-sm font-semibold text-zinc-300">Message</label>
            <textarea id="message" name="message" rows={6} required className="w-full resize-none rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-purple-300/70 focus:bg-purple-500/5" placeholder="How can I help you?" />
          </div>

          <button type="submit" disabled={formStatus === 'sending'} className="mt-7 w-full rounded-2xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-purple-500 px-8 py-4 text-lg font-black text-white shadow-xl shadow-purple-700/30 transition hover:-translate-y-1 hover:shadow-purple-500/50 disabled:cursor-not-allowed disabled:opacity-70">
            {formStatus === 'sending' ? 'Sending Message...' : 'Send Message'}
          </button>

          {formStatus === 'success' && <p className="mt-6 text-center text-emerald-300">Thank you! I'll get back to you soon.</p>}
          {formStatus === 'error' && <p className="mt-6 text-center text-red-300">Something went wrong. Please try again.</p>}
        </form>

        <div className="mt-10 text-center text-zinc-400">
          Or reach me directly on{' '}
          <a href="https://www.linkedin.com/in/pramodyaathauda/" target="_blank" rel="noreferrer" className="text-purple-300 hover:text-white">LinkedIn</a>{' '}
          or{' '}
          <a href="mailto:pramodya511@gmail.com" className="text-purple-300 hover:text-white">Email</a>
        </div>
      </section>

      {showScroll && (
        <button onClick={scrollToTop} className="fixed bottom-8 right-8 z-50 rounded-full border border-white/10 bg-purple-600 p-4 text-white shadow-2xl shadow-purple-500/40 transition hover:-translate-y-1 hover:bg-purple-500" aria-label="Scroll to top">
          ↑
        </button>
      )}

      <footer className="relative z-10 border-t border-white/10 px-6 py-12 text-center text-sm text-zinc-500">
        <p>© {new Date().getFullYear()} Dheeshani • Built with React, Tailwind & purple energy</p>
        <p className="mt-3">
          <a href="https://github.com/Pramodya2002" target="_blank" rel="noreferrer" className="mx-3 hover:text-purple-300">GitHub</a>
          •
          <a href="https://www.linkedin.com/in/pramodyaathauda/" target="_blank" rel="noreferrer" className="mx-3 hover:text-purple-300">LinkedIn</a>
        </p>
      </footer>

      <style dangerouslySetInnerHTML={{
        __html: `
          .font-display {
            font-family: 'Clash Display', 'Orbitron', 'Space Grotesk', sans-serif;
          }

          body {
            font-family: 'Space Grotesk', sans-serif;
            cursor: none;
          }

          a, button, input, textarea {
            cursor: none;
          }

          .animated-title {
            background-size: 220% auto;
            animation: titleShift 4s linear infinite;
          }

          .animated-border {
            background:
              linear-gradient(#030108, #030108) padding-box,
              conic-gradient(from 0deg, transparent, #a855f7, #ec4899, transparent, #a855f7) border-box;
            border: 1px solid transparent;
            animation: spinGlow 7s linear infinite;
          }

          .animated-aurora {
            background:
              linear-gradient(115deg, transparent 0%, rgba(168,85,247,.14) 35%, transparent 52%),
              linear-gradient(245deg, transparent 0%, rgba(236,72,153,.1) 45%, transparent 66%);
            animation: auroraMove 10s ease-in-out infinite alternate;
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(28px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @keyframes titleShift {
            0% {
              background-position: 0% center;
              filter: hue-rotate(0deg);
            }
            50% {
              background-position: 100% center;
              filter: hue-rotate(35deg);
            }
            100% {
              background-position: 0% center;
              filter: hue-rotate(0deg);
            }
          }

          @keyframes spinGlow {
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes auroraMove {
            from {
              transform: translate3d(-3%, -2%, 0) scale(1);
            }
            to {
              transform: translate3d(3%, 2%, 0) scale(1.05);
            }
          }

          @keyframes marquee {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          @media (max-width: 768px) {
            body,
            a,
            button,
            input,
            textarea {
              cursor: auto;
            }
          }
        `,
      }} />
    </div>
  );
}

export default App;