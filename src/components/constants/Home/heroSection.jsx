'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';

const HeroSection = () => {
    const [isDark, setIsDark] = useState(false);
    const heroRef = useRef(null);
    const rafRef = useRef(null);

    // Scroll-triggered dark mode — throttled with rAF
    useEffect(() => {
        let ticking = false;
        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            rafRef.current = requestAnimationFrame(() => {
                if (!heroRef.current) { ticking = false; return; }
                const scrollY = window.scrollY;
                const heroHeight = heroRef.current.offsetHeight;
                const threshold = heroHeight * 0.3;
                setIsDark(scrollY > threshold);
                ticking = false;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <section
            ref={heroRef}
            className={`hero-section relative w-full min-h-screen overflow-hidden ${isDark ? 'hero-dark' : 'hero-light'}`}
        >
            {/* Dither pattern overlay — static, uses GPU layer */}
            <div
                className="absolute inset-0 pointer-events-none z-10 opacity-30"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.03'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3Ccircle cx='5' cy='5' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                    willChange: 'auto',
                }}
            />

            {/* Grid lines background — static, no animation */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage:
                            'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }}
                />
            </div>

            <div className="relative z-30 flex flex-col items-center justify-center min-h-screen px-4 pt-16 pb-20">
                <h1
                    className={`font-['Space_Grotesk'] text-[clamp(3rem,12vw,10rem)] font-black leading-[0.85] tracking-tighter text-center select-none hero-fade-element ${isDark ? 'opacity-0' : 'opacity-100 text-black'}`}
                >
                    DIGITAL
                </h1>

                <div className="relative w-full max-w-md mx-auto my-[-2rem] z-40">
                    <div className="relative mx-auto" style={{ width: '230px' }}>
                        <div
                            className="relative mx-auto rounded-[2.5rem] border-[6px] border-black/80 bg-[#dcdcdc] overflow-hidden shadow-2xl"
                            style={{ width: '240px', height: '480px' }}
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-b-2xl z-20" />
                            <div className="absolute top-2 left-0 right-0 flex justify-between px-6 z-20">
                                <span className="text-[10px] text-white/80 font-medium">9:41</span>
                                <div className="flex gap-1">
                                    <div className="w-3 h-3 rounded-full bg-white/80" />
                                    <div className="w-3 h-3 rounded-full bg-white/80" />
                                </div>
                            </div>

                            {/* Scrolling phone content — CSS-only animation, GPU accelerated */}
                            <div className="hero-phone-scroll">
                                {/* Card 1: Web Dev */}
                                <div className="w-full p-2">
                                    <div className="rounded-2xl p-4 mb-3 bg-[#C084FC]">
                                        <div className="w-full h-36 rounded-xl bg-white/10 flex items-center justify-center mb-3 overflow-hidden">
                                            <svg viewBox="0 0 200 140" className="w-full h-full">
                                                <rect x="20" y="14" width="160" height="100" rx="8" fill="rgba(255,255,255,0.12)" />
                                                <rect x="20" y="14" width="160" height="20" rx="8" fill="rgba(255,255,255,0.2)" />
                                                <circle cx="32" cy="24" r="3" fill="rgba(255,255,255,0.5)" />
                                                <circle cx="42" cy="24" r="3" fill="rgba(255,255,255,0.5)" />
                                                <circle cx="52" cy="24" r="3" fill="rgba(255,255,255,0.5)" />
                                                <rect x="32" y="46" width="60" height="8" rx="4" fill="rgba(255,255,255,0.5)" />
                                                <rect x="32" y="60" width="90" height="6" rx="3" fill="rgba(255,255,255,0.3)" />
                                                <rect x="32" y="72" width="70" height="6" rx="3" fill="rgba(255,255,255,0.3)" />
                                                <rect x="32" y="88" width="40" height="14" rx="7" fill="#0A0A0A" />
                                                <text x="52" y="98" fontSize="9" fill="#E8FF47" fontFamily="monospace" textAnchor="middle">&lt;/&gt;</text>
                                                <rect x="120" y="46" width="42" height="52" rx="6" fill="rgba(255,255,255,0.15)" />
                                                <rect x="126" y="52" width="30" height="4" rx="2" fill="rgba(255,255,255,0.4)" />
                                                <rect x="126" y="60" width="30" height="18" rx="3" fill="rgba(255,255,255,0.25)" />
                                                <rect x="126" y="82" width="20" height="4" rx="2" fill="rgba(255,255,255,0.4)" />
                                            </svg>
                                        </div>
                                        <p className="text-white text-sm font-bold">Web Development</p>
                                        <p className="text-white/70 text-xs mt-1">React, Next.js, Node.js</p>
                                    </div>
                                </div>
                                {/* Card 2: App Dev */}
                                <div className="w-full p-2">
                                    <div className="rounded-2xl p-4 mb-3 bg-[#E8FF47] text-[#0A0A0A]">
                                        <div className="w-full h-36 rounded-xl bg-black/5 flex items-center justify-center mb-3 overflow-hidden">
                                            <svg viewBox="0 0 200 140" className="w-full h-full">
                                                <rect x="66" y="10" width="68" height="120" rx="14" fill="rgba(0,0,0,0.08)" />
                                                <rect x="66" y="10" width="68" height="120" rx="14" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="2" />
                                                <rect x="93" y="16" width="14" height="3" rx="1.5" fill="rgba(0,0,0,0.3)" />
                                                <rect x="76" y="30" width="20" height="20" rx="5" fill="#0A0A0A" />
                                                <rect x="104" y="30" width="20" height="20" rx="5" fill="rgba(0,0,0,0.35)" />
                                                <rect x="76" y="56" width="20" height="20" rx="5" fill="rgba(0,0,0,0.2)" />
                                                <rect x="104" y="56" width="20" height="20" rx="5" fill="rgba(0,0,0,0.35)" />
                                                <rect x="76" y="82" width="48" height="10" rx="5" fill="rgba(0,0,0,0.15)" />
                                                <circle cx="150" cy="40" r="16" fill="rgba(0,0,0,0.08)" />
                                                <path d="M144 40l4 4 8-8" stroke="#0A0A0A" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                                                <circle cx="40" cy="90" r="14" fill="rgba(0,0,0,0.06)" />
                                                <path d="M35 90h10M40 85v10" stroke="rgba(0,0,0,0.4)" strokeWidth="2.5" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        <p className="text-sm font-bold">App Development</p>
                                        <p className="text-black/60 text-xs mt-1">Flutter, React Native</p>
                                    </div>
                                </div>
                                {/* Card 3: Deployment */}
                                <div className="w-full p-2">
                                    <div className="rounded-2xl p-4 mb-3 bg-zinc-800">
                                        <div className="w-full h-36 rounded-xl bg-white/5 flex items-center justify-center mb-3 overflow-hidden">
                                            <svg viewBox="0 0 200 140" className="w-full h-full">
                                                <ellipse cx="100" cy="112" rx="60" ry="10" fill="rgba(192,132,252,0.15)" />
                                                <path d="M70 118c-16 0-26-12-26-24 0-13 10-23 22-24 4-14 17-24 32-24 18 0 32 13 34 30 12 1 20 10 20 20 0 12-10 22-24 22H70z" fill="rgba(255,255,255,0.08)" />
                                                <path d="M100 96V44M100 44l-14 14M100 44l14 14" stroke="#E8FF47" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M84 108l-10 18M116 108l10 18M100 112v16" stroke="rgba(192,132,252,0.6)" strokeWidth="2.5" strokeLinecap="round" />
                                                <circle cx="100" cy="30" r="5" fill="#C084FC" />
                                            </svg>
                                        </div>
                                        <p className="text-white text-sm font-bold">Deployment</p>
                                        <p className="text-white/60 text-xs mt-1">AWS, Vercel, Play Store</p>
                                    </div>
                                </div>
                                {/* Card 4: Maintenance */}
                                <div className="w-full p-2">
                                    <div className="rounded-2xl p-4 mb-3 bg-[#C084FC]">
                                        <div className="w-full h-36 rounded-xl bg-white/10 flex items-center justify-center mb-3 overflow-hidden">
                                            <svg viewBox="0 0 200 140" className="w-full h-full">
                                                <circle cx="80" cy="70" r="34" fill="rgba(255,255,255,0.1)" />
                                                <g stroke="rgba(255,255,255,0.7)" strokeWidth="6" strokeLinecap="round">
                                                    <path d="M80 40v10M80 90v10M50 70h10M100 70h10M58 48l7 7M95 85l7 7M102 48l-7 7M65 85l-7 7" />
                                                </g>
                                                <circle cx="80" cy="70" r="12" fill="none" stroke="rgba(255,255,255,0.9)" strokeWidth="5" />
                                                <path d="M140 42a26 26 0 100 52 26 26 0 000-52z" fill="rgba(255,255,255,0.08)" />
                                                <path d="M140 54v14l10 6" stroke="#E8FF47" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                                                <path d="M126 96l30-30" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" />
                                            </svg>
                                        </div>
                                        <p className="text-white text-sm font-bold">Maintenance</p>
                                        <p className="text-white/70 text-xs mt-1">24/7 Support & Updates</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* BOTTOM HEADLINE */}
                <h1
                    className={`font-['Space_Grotesk'] text-[clamp(3rem,12vw,10rem)] font-black leading-[0.85] tracking-tighter text-center select-none mt-[-2rem] hero-fade-element ${isDark ? 'opacity-0' : 'opacity-100 text-black'}`}
                >
                    SOLUTIONS
                </h1>

                {/* TAGLINE */}
                <p
                    className={`mt-6 text-center text-sm md:text-base font-medium max-w-md hero-fade-element ${isDark ? 'opacity-0' : 'opacity-100 text-black/50'}`}
                >
                    We build, deploy & maintain your digital presence end-to-end.
                </p>

                <div
                    className={`hero-card hero-float-1 absolute top-20 left-2 sm:left-4 md:left-6 lg:left-20 z-50 hero-fade-element ${isDark ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                    <div className="w-[132px] sm:w-[160px] md:w-[200px] rounded-2xl p-3 sm:p-4 shadow-lg bg-[#E8FF47]">
                        <p className="font-['Space_Grotesk'] font-bold text-black text-sm sm:text-base leading-tight">
                            FAST DELIVERY
                        </p>
                        <p className="text-black/70 text-[11px] sm:text-sm mt-1 flex items-center gap-2">
                            <svg className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span className="leading-tight">2x faster than market</span>
                        </p>
                    </div>
                </div>

                {/* Top Right - Popular */}
                <div
                    className={`hero-card hero-float-2 absolute top-24 right-2 sm:right-4 md:right-6 lg:right-20 z-50 hero-fade-element ${isDark ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                    <div className="w-[150px] sm:w-[180px] md:w-[220px] rounded-2xl p-3 sm:p-4 shadow-lg bg-white border border-black/10">
                        <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl overflow-hidden bg-[#C084FC] flex items-center justify-center shrink-0">
                                <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>
                            <div className="min-w-0">
                                <p className="font-['Space_Grotesk'] font-bold text-black text-[11px] sm:text-sm leading-tight">
                                    TRUSTED BY 50+
                                </p>
                                <p className="text-black/60 text-[10px] sm:text-xs mt-0.5">Startups & Enterprises</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Right - Urgency */}
                <div
                    className={`hero-card hero-float-3 absolute bottom-24 right-2 sm:right-4 md:right-8 lg:right-16 z-50 hero-fade-element ${isDark ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                    <div className="w-[150px] sm:w-[180px] md:w-[210px] rounded-2xl p-3 sm:p-4 shadow-lg bg-[#E8FF47]">
                        <div className="flex items-center gap-2 mb-2">
                            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-black/60 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <p className="text-black/70 text-[10px] sm:text-xs font-medium leading-tight">
                                Limited slots this quarter
                            </p>
                        </div>
                        <p className="font-['Space_Grotesk'] font-black text-black text-2xl sm:text-3xl tracking-tight">
                            03 LEFT
                        </p>
                    </div>
                </div>

                {/* Bottom Left - Tech Stack */}
                <div
                    className={`hero-card hero-float-4 absolute bottom-28 left-2 sm:left-4 md:left-8 lg:left-16 z-50 hero-fade-element ${isDark ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                    <div className="w-[150px] sm:w-[180px] md:w-[240px] rounded-2xl p-3 sm:p-4 shadow-lg bg-white border border-black/10">
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                            <span className="text-[10px] sm:text-xs text-black/50 font-medium">Our Stack</span>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-400" />
                                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                                <div className="w-2 h-2 rounded-full bg-green-400" />
                            </div>
                        </div>
                        <div className="space-y-1.5 sm:space-y-2">
                            {['React / Next.js', 'Flutter', 'Node.js', 'AWS / Cloud'].map((tech) => (
                                <div key={tech} className="flex items-center justify-between gap-2">
                                    <span className="text-[11px] sm:text-sm text-black font-medium leading-tight">{tech}</span>
                                    <div className="w-7 h-3.5 sm:w-8 sm:h-4 rounded-full flex items-center px-0.5 bg-[#C084FC] shrink-0">
                                        <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white ml-auto" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-2 sm:mt-3 py-1.5 sm:py-2 rounded-lg text-white text-[10px] sm:text-xs font-bold bg-[#C084FC] transition-colors">
                            VIEW ALL TECH
                        </button>
                    </div>
                </div>

                <div
                    className={`hero-card hero-float-1 absolute top-1/2 right-2 md:right-6 -translate-y-1/2 z-50 hidden lg:block hero-fade-element ${isDark ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                    <div className="rounded-2xl p-3 sm:p-4 shadow-lg bg-[#C084FC]" style={{ width: '190px' }}>
                        <div className="flex items-center gap-2 mb-2">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                            <p className="text-white font-bold text-sm">Free Consultation</p>
                        </div>
                        <p className="text-white/80 text-xs">*Book a 30-min strategy call</p>
                    </div>
                </div>

                {/* Middle Left - Review */}
                <div
                    className={`hero-card hero-float-3 absolute top-1/2 left-2 md:left-6 -translate-y-1/2 z-50 hidden lg:block hero-fade-element ${isDark ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
                >
                    <div className="rounded-2xl p-3 sm:p-4 shadow-lg bg-white border border-black/10" style={{ width: '230px' }}>
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm bg-[#C084FC]">
                                JD
                            </div>
                            <div>
                                <p className="text-black font-semibold text-sm">John Doe</p>
                                <p className="text-black/50 text-xs">CEO, TechStart</p>
                            </div>
                        </div>
                        <p className="text-black/70 text-sm italic">
                            "They delivered our app in 6 weeks. Best dev team we've worked with."
                        </p>
                    </div>
                </div>
            </div>

            {/* DARK MODE REVEAL OVERLAY */}
            <div
                className={`absolute inset-0 z-[60] pointer-events-none hero-dark-overlay ${isDark ? 'opacity-100' : 'opacity-0'}`}
            >
                <div className="absolute inset-0 bg-[#0A0A0A]" />
                {/* Grid overlay */}
                <div
                    className="absolute inset-0 opacity-10"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(192,132,252,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(192,132,252,0.3) 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }}
                />

                {/* Dark mode text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <h2 className="font-['Space_Grotesk'] text-[clamp(2.5rem,10vw,8rem)] font-black leading-[0.85] tracking-tighter text-center text-[#C084FC]">
                        NO DARK
                    </h2>
                    <h2 className="font-['Space_Grotesk'] text-[clamp(2.5rem,10vw,8rem)] font-black leading-[0.85] tracking-tighter text-center text-[#C084FC]">
                        PATTERNS
                    </h2>
                    <p className="mt-8 text-white/60 text-center max-w-lg px-4 text-sm md:text-base">
                        We don't use dark patterns. We use{' '}
                        <span className="text-[#E8FF47] font-semibold">transparent pricing</span>,{' '}
                        <span className="text-[#E8FF47] font-semibold">clear timelines</span>, and{' '}
                        <span className="text-[#E8FF47] font-semibold">honest communication</span>.
                    </p>
                </div>

                {/* Dark mode cards */}
                <div className="absolute top-24 left-4 md:left-12 lg:left-20">
                    <div className="rounded-2xl p-4 border border-white/10 bg-white/5" style={{ width: '200px' }}>
                        <p className="font-['Space_Grotesk'] font-bold text-[#E8FF47] text-lg">SCARCITY?</p>
                        <p className="text-white/50 text-sm mt-1">
                            We take unlimited projects if we can deliver quality.
                        </p>
                    </div>
                </div>
                <div className="absolute top-28 right-4 md:right-12 lg:right-20">
                    <div className="rounded-2xl p-4 border border-white/10 bg-white/5" style={{ width: '220px' }}>
                        <p className="font-['Space_Grotesk'] font-bold text-[#E8FF47] text-sm">
                            NO FAKE SOCIAL PROOF
                        </p>
                        <p className="text-white/50 text-xs mt-1">
                            Real reviews from real clients. Every testimonial is verified.
                        </p>
                    </div>
                </div>
                <div className="absolute bottom-32 right-4 md:right-8 lg:right-16">
                    <div className="rounded-2xl p-4 border border-white/10 bg-white/5" style={{ width: '210px' }}>
                        <p className="text-white/50 text-xs">No fake urgency timers.</p>
                        <p className="font-['Space_Grotesk'] font-black text-[#E8FF47] text-2xl mt-1">
                            WE'RE ALWAYS OPEN
                        </p>
                    </div>
                </div>
                <div className="absolute bottom-36 left-4 md:left-8 lg:left-16">
                    <div className="rounded-2xl p-4 border border-white/10 bg-white/5" style={{ width: '240px' }}>
                        <p className="text-white/50 text-xs mb-2">No hidden tracking. No sneaky cookies.</p>
                        <p className="font-['Space_Grotesk'] font-bold text-[#E8FF47] text-sm">
                            YOUR DATA = YOURS
                        </p>
                        <p className="text-white/50 text-xs mt-1">We don't sell your info. Ever.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;