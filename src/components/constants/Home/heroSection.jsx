// HeroSection.jsx
import React, { useState, useEffect, useRef } from 'react';

const HeroSection = () => {
    const [isDark, setIsDark] = useState(false);
    const [activeCard, setActiveCard] = useState(null);
    const heroRef = useRef(null);

    // Scroll-triggered dark mode reveal
    useEffect(() => {
        const handleScroll = () => {
            if (!heroRef.current) return;
            const scrollY = window.scrollY;
            const heroHeight = heroRef.current.offsetHeight;
            const threshold = heroHeight * 0.3;
            setIsDark(scrollY > threshold);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Mouse parallax for floating cards
    useEffect(() => {
        const handleMouseMove = (e) => {
            if (isDark) return;
            const cards = document.querySelectorAll('.info-card');
            const x = (e.clientX / window.innerWidth - 0.5) * 20;
            const y = (e.clientY / window.innerHeight - 0.5) * 20;

            cards.forEach((card, i) => {
                const factor = (i + 1) * 0.5;
                card.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
            });
        };

        document.addEventListener('mousemove', handleMouseMove);
        return () => document.removeEventListener('mousemove', handleMouseMove);
    }, [isDark]);

    const revealInfo = (cardId) => {
        setActiveCard(activeCard === cardId ? null : cardId);
    };

    return (
        <section
            ref={heroRef}
            className={`relative w-full min-h-screen overflow-hidden transition-colors duration-700 ${isDark ? 'bg-[#0A0A0A]' : 'bg-[#F2F2F2]'
                }`}
        >
            {/* Dither pattern overlay */}
            <div
                className="absolute inset-0 pointer-events-none z-10 opacity-30"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='8' height='8' viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000' fill-opacity='0.03'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3Ccircle cx='5' cy='5' r='1'/%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            {/* Grid lines background */}
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

            {/* TICKER TAPE (Top) */}
            <div
                className={`absolute top-0 left-0 w-full overflow-hidden z-20 py-3 border-b transition-colors duration-500 ${isDark
                        ? 'border-white/10 bg-[#0A0A0A]/80'
                        : 'border-black/5 bg-[#F2F2F2]/80'
                    }`}
                style={{ backdropFilter: 'blur(10px)' }}
            >
                <div className="flex whitespace-nowrap animate-ticker">
                    {[
                        'WEB DEVELOPMENT',
                        'APP DEVELOPMENT',
                        'ANDROID / iOS',
                        'PLAYSTORE DEPLOYMENT',
                        'WEB DEPLOYMENT',
                        'MAINTENANCE',
                        'E-SOLUTIONS',
                    ].map((item, i) => (
                        <React.Fragment key={i}>
                            <span
                                className={`font-['Space_Grotesk'] text-xs font-semibold tracking-widest mx-8 ${isDark ? 'text-white/40' : 'text-black/40'
                                    }`}
                            >
                                {item}
                            </span>
                            <span className={isDark ? 'text-white/20 mx-2' : 'text-black/20 mx-2'}>
                                ◆
                            </span>
                        </React.Fragment>
                    ))}
                    {/* Duplicate for seamless loop */}
                    {[
                        'WEB DEVELOPMENT',
                        'APP DEVELOPMENT',
                        'ANDROID / iOS',
                        'PLAYSTORE DEPLOYMENT',
                        'WEB DEPLOYMENT',
                        'MAINTENANCE',
                        'E-SOLUTIONS',
                    ].map((item, i) => (
                        <React.Fragment key={`dup-${i}`}>
                            <span
                                className={`font-['Space_Grotesk'] text-xs font-semibold tracking-widest mx-8 ${isDark ? 'text-white/40' : 'text-black/40'
                                    }`}
                            >
                                {item}
                            </span>
                            <span className={isDark ? 'text-white/20 mx-2' : 'text-black/20 mx-2'}>
                                ◆
                            </span>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="relative z-30 flex flex-col items-center justify-center min-h-screen px-4 pt-16 pb-20">
                {/* TOP HEADLINE */}
                <h1
                    className={`font-['Space_Grotesk'] text-[clamp(3rem,12vw,10rem)] font-black leading-[0.85] tracking-tighter text-center select-none transition-opacity duration-500 ${isDark ? 'opacity-0' : 'opacity-100 text-black'
                        }`}
                >
                    DIGITAL
                </h1>

                {/* CENTER PHONE + HAND COMPOSITION */}
                <div className="relative w-full max-w-md mx-auto my-[-2rem] z-40">
                    <div className="relative mx-auto" style={{ width: '280px' }}>
                        {/* Phone frame */}
                        <div
                            className="relative mx-auto rounded-[2.5rem] border-[6px] border-black/80 bg-black overflow-hidden shadow-2xl"
                            style={{ width: '260px', height: '520px' }}
                        >
                            {/* Notch */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-b-2xl z-20" />
                            {/* Status bar */}
                            <div className="absolute top-2 left-0 right-0 flex justify-between px-6 z-20">
                                <span className="text-[10px] text-white/80 font-medium">9:41</span>
                                <div className="flex gap-1">
                                    <div className="w-3 h-3 rounded-full bg-white/80" />
                                    <div className="w-3 h-3 rounded-full bg-white/80" />
                                </div>
                            </div>

                            {/* Scrolling phone content */}
                            <div className="animate-phone-scroll">
                                {/* Card 1: Web Dev */}
                                <div className="w-full p-3">
                                    <div className="rounded-2xl p-4 mb-3 bg-[#C084FC]">
                                        <div className="w-full h-36 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                                            <svg
                                                className="w-16 h-16 text-white/60"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.5"
                                                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-white text-sm font-bold">Web Development</p>
                                        <p className="text-white/70 text-xs mt-1">React, Next.js, Node.js</p>
                                    </div>
                                </div>
                                {/* Card 2: App Dev */}
                                <div className="w-full p-3">
                                    <div className="rounded-2xl p-4 mb-3 bg-[#E8FF47] text-[#0A0A0A]">
                                        <div className="w-full h-36 rounded-xl bg-black/10 flex items-center justify-center mb-3">
                                            <svg
                                                className="w-16 h-16 text-black/40"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.5"
                                                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-sm font-bold">App Development</p>
                                        <p className="text-black/60 text-xs mt-1">Flutter, React Native</p>
                                    </div>
                                </div>
                                {/* Card 3: Deployment */}
                                <div className="w-full p-3">
                                    <div className="rounded-2xl p-4 mb-3 bg-zinc-800">
                                        <div className="w-full h-36 rounded-xl bg-white/10 flex items-center justify-center mb-3">
                                            <svg
                                                className="w-16 h-16 text-white/40"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.5"
                                                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-white text-sm font-bold">Deployment</p>
                                        <p className="text-white/60 text-xs mt-1">AWS, Vercel, Play Store</p>
                                    </div>
                                </div>
                                {/* Card 4: Maintenance */}
                                <div className="w-full p-3">
                                    <div className="rounded-2xl p-4 mb-3 bg-[#C084FC]">
                                        <div className="w-full h-36 rounded-xl bg-white/20 flex items-center justify-center mb-3">
                                            <svg
                                                className="w-16 h-16 text-white/60"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.5"
                                                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                                                />
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="1.5"
                                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                                />
                                            </svg>
                                        </div>
                                        <p className="text-white text-sm font-bold">Maintenance</p>
                                        <p className="text-white/70 text-xs mt-1">24/7 Support & Updates</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Hand silhouette */}
                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-48 h-32 opacity-80">
                            <svg
                                viewBox="0 0 200 140"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-full"
                            >
                                <path
                                    d="M60 80C60 80 50 70 45 65C40 60 35 55 30 50C25 45 20 40 25 35C30 30 40 35 45 40C50 45 55 50 60 55"
                                    stroke="black"
                                    strokeWidth="3"
                                    fill="black"
                                    fillOpacity="0.1"
                                />
                                <path
                                    d="M140 80C140 80 150 70 155 65C160 60 165 55 170 50C175 45 180 40 175 35C170 30 160 35 155 40C150 45 145 50 140 55"
                                    stroke="black"
                                    strokeWidth="3"
                                    fill="black"
                                    fillOpacity="0.1"
                                />
                                <ellipse cx="100" cy="100" rx="45" ry="25" fill="black" fillOpacity="0.15" />
                                <rect x="75" y="85" width="50" height="30" rx="15" fill="black" fillOpacity="0.2" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* BOTTOM HEADLINE */}
                <h1
                    className={`font-['Space_Grotesk'] text-[clamp(3rem,12vw,10rem)] font-black leading-[0.85] tracking-tighter text-center select-none mt-[-2rem] transition-opacity duration-500 ${isDark ? 'opacity-0' : 'opacity-100 text-black'
                        }`}
                >
                    SOLUTIONS
                </h1>

                {/* TAGLINE */}
                <p
                    className={`mt-6 text-center text-sm md:text-base font-medium max-w-md transition-opacity duration-500 ${isDark ? 'opacity-0' : 'opacity-100 text-black/50'
                        }`}
                >
                    We build, deploy & maintain your digital presence end-to-end.
                </p>

                {/* FLOATING INFO CARDS */}
                {/* Top Left - Fast Delivery */}
                <div
                    className={`info-card float-1 absolute top-24 left-4 md:left-12 lg:left-20 z-50 cursor-pointer transition-opacity duration-500 ${isDark ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                    onClick={() => revealInfo('fast')}
                >
                    <div className="rounded-2xl p-4 shadow-lg bg-[#E8FF47]" style={{ width: '200px' }}>
                        <p className="font-['Space_Grotesk'] font-bold text-black text-lg leading-tight">
                            FAST DELIVERY
                        </p>
                        <p className="text-black/70 text-sm mt-1 flex items-center gap-2">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                            2x faster than market
                        </p>
                    </div>
                    <div
                        className={`mt-2 rounded-xl p-3 bg-black/90 text-white text-xs transition-all duration-300 ${activeCard === 'fast' ? 'block animate-fade-in-up' : 'hidden'
                            }`}
                    >
                        <p className="font-semibold text-[#E8FF47] mb-1">RAPID DEPLOYMENT</p>
                        <p>Agile sprints with CI/CD pipelines. Your product ships in weeks, not months.</p>
                    </div>
                </div>

                {/* Top Right - Popular */}
                <div
                    className={`info-card float-2 absolute top-28 right-4 md:right-12 lg:right-20 z-50 cursor-pointer transition-opacity duration-500 ${isDark ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                    onClick={() => revealInfo('popular')}
                >
                    <div
                        className="rounded-2xl p-4 shadow-lg bg-white border border-black/10"
                        style={{ width: '220px' }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#C084FC] flex items-center justify-center">
                                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                            </div>
                            <div>
                                <p className="font-['Space_Grotesk'] font-bold text-black text-sm">TRUSTED BY 50+</p>
                                <p className="text-black/60 text-xs">Startups & Enterprises</p>
                            </div>
                        </div>
                    </div>
                    <div
                        className={`mt-2 rounded-xl p-3 bg-black/90 text-white text-xs transition-all duration-300 ${activeCard === 'popular' ? 'block animate-fade-in-up' : 'hidden'
                            }`}
                    >
                        <p className="font-semibold text-[#C084FC] mb-1">PROVEN TRACK RECORD</p>
                        <p>50+ successful projects delivered. From MVPs to enterprise-scale apps.</p>
                    </div>
                </div>

                {/* Bottom Right - Urgency */}
                <div
                    className={`info-card float-3 absolute bottom-32 right-4 md:right-8 lg:right-16 z-50 cursor-pointer transition-opacity duration-500 ${isDark ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                    onClick={() => revealInfo('urgency')}
                >
                    <div className="rounded-2xl p-4 shadow-lg bg-[#E8FF47]" style={{ width: '210px' }}>
                        <div className="flex items-center gap-2 mb-2">
                            <svg
                                className="w-5 h-5 text-black/60"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <p className="text-black/70 text-xs font-medium">Limited slots this quarter</p>
                        </div>
                        <p className="font-['Space_Grotesk'] font-black text-black text-3xl tracking-tight">
                            03 LEFT
                        </p>
                    </div>
                    <div
                        className={`mt-2 rounded-xl p-3 bg-black/90 text-white text-xs transition-all duration-300 ${activeCard === 'urgency' ? 'block animate-fade-in-up' : 'hidden'
                            }`}
                    >
                        <p className="font-semibold text-[#E8FF47] mb-1">DON'T WAIT</p>
                        <p>We take only 5 projects per quarter to ensure quality. 3 slots remaining.</p>
                    </div>
                </div>

                {/* Bottom Left - Tech Stack */}
                <div
                    className={`info-card float-4 absolute bottom-36 left-4 md:left-8 lg:left-16 z-50 cursor-pointer transition-opacity duration-500 ${isDark ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                    onClick={() => revealInfo('tech')}
                >
                    <div
                        className="rounded-2xl p-4 shadow-lg bg-white border border-black/10"
                        style={{ width: '240px' }}
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-xs text-black/50 font-medium">Our Stack</span>
                            <div className="flex gap-1">
                                <div className="w-2 h-2 rounded-full bg-red-400" />
                                <div className="w-2 h-2 rounded-full bg-yellow-400" />
                                <div className="w-2 h-2 rounded-full bg-green-400" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            {[
                                'React / Next.js',
                                'Flutter',
                                'Node.js',
                                'AWS / Cloud',
                            ].map((tech) => (
                                <div key={tech} className="flex items-center justify-between">
                                    <span className="text-sm text-black font-medium">{tech}</span>
                                    <div className="w-8 h-4 rounded-full flex items-center px-0.5 bg-[#C084FC]">
                                        <div className="w-3 h-3 rounded-full bg-white ml-auto" />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-3 py-2 rounded-lg text-white text-xs font-bold bg-[#C084FC] hover:bg-[#a855f7] transition-colors">
                            VIEW ALL TECH
                        </button>
                    </div>
                    <div
                        className={`mt-2 rounded-xl p-3 bg-black/90 text-white text-xs transition-all duration-300 ${activeCard === 'tech' ? 'block animate-fade-in-up' : 'hidden'
                            }`}
                    >
                        <p className="font-semibold text-[#C084FC] mb-1">MODERN STACK</p>
                        <p>
                            We use cutting-edge tech: React 19, Next.js 15, Flutter 3, Node.js 22, AWS, Docker,
                            Kubernetes.
                        </p>
                    </div>
                </div>

                {/* Middle Right - Free Consultation */}
                <div
                    className={`info-card float-1 absolute top-1/2 right-4 md:right-6 -translate-y-1/2 z-50 cursor-pointer hidden lg:block transition-opacity duration-500 ${isDark ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                    onClick={() => revealInfo('consult')}
                >
                    <div className="rounded-2xl p-4 shadow-lg bg-[#C084FC]" style={{ width: '190px' }}>
                        <div className="flex items-center gap-2 mb-2">
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                            <p className="text-white font-bold text-sm">Free Consultation</p>
                        </div>
                        <p className="text-white/80 text-xs">*Book a 30-min strategy call</p>
                    </div>
                    <div
                        className={`mt-2 rounded-xl p-3 bg-black/90 text-white text-xs transition-all duration-300 ${activeCard === 'consult' ? 'block animate-fade-in-up' : 'hidden'
                            }`}
                    >
                        <p className="font-semibold text-[#C084FC] mb-1">NO OBLIGATION</p>
                        <p>Free 30-min discovery call. We'll audit your current setup & propose a roadmap.</p>
                    </div>
                </div>

                {/* Middle Left - Review */}
                <div
                    className={`info-card float-3 absolute top-1/2 left-4 md:left-6 -translate-y-1/2 z-50 cursor-pointer hidden lg:block transition-opacity duration-500 ${isDark ? 'opacity-0 pointer-events-none' : 'opacity-100'
                        }`}
                    onClick={() => revealInfo('review')}
                >
                    <div
                        className="rounded-2xl p-4 shadow-lg bg-white border border-black/10"
                        style={{ width: '230px' }}
                    >
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
                    <div
                        className={`mt-2 rounded-xl p-3 bg-black/90 text-white text-xs transition-all duration-300 ${activeCard === 'review' ? 'block animate-fade-in-up' : 'hidden'
                            }`}
                    >
                        <p className="font-semibold text-[#C084FC] mb-1">CLIENT LOVE</p>
                        <p>Average rating 4.9/5. Read 30+ testimonials on our Clutch profile.</p>
                    </div>
                </div>
            </div>

            {/* DARK MODE REVEAL OVERLAY */}
            <div
                className={`absolute inset-0 z-[60] pointer-events-none transition-opacity duration-1000 ${isDark ? 'opacity-100' : 'opacity-0'
                    }`}
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
                    <div
                        className="rounded-2xl p-4 border border-white/10 bg-white/5"
                        style={{ width: '200px' }}
                    >
                        <p className="font-['Space_Grotesk'] font-bold text-[#E8FF47] text-lg">SCARCITY?</p>
                        <p className="text-white/50 text-sm mt-1">
                            We take unlimited projects if we can deliver quality.
                        </p>
                    </div>
                </div>
                <div className="absolute top-28 right-4 md:right-12 lg:right-20">
                    <div
                        className="rounded-2xl p-4 border border-white/10 bg-white/5"
                        style={{ width: '220px' }}
                    >
                        <p className="font-['Space_Grotesk'] font-bold text-[#E8FF47] text-sm">
                            NO FAKE SOCIAL PROOF
                        </p>
                        <p className="text-white/50 text-xs mt-1">
                            Real reviews from real clients. Every testimonial is verified.
                        </p>
                    </div>
                </div>
                <div className="absolute bottom-32 right-4 md:right-8 lg:right-16">
                    <div
                        className="rounded-2xl p-4 border border-white/10 bg-white/5"
                        style={{ width: '210px' }}
                    >
                        <p className="text-white/50 text-xs">No fake urgency timers.</p>
                        <p className="font-['Space_Grotesk'] font-black text-[#E8FF47] text-2xl mt-1">
                            WE'RE ALWAYS OPEN
                        </p>
                    </div>
                </div>
                <div className="absolute bottom-36 left-4 md:left-8 lg:left-16">
                    <div
                        className="rounded-2xl p-4 border border-white/10 bg-white/5"
                        style={{ width: '240px' }}
                    >
                        <p className="text-white/50 text-xs mb-2">No hidden tracking. No sneaky cookies.</p>
                        <p className="font-['Space_Grotesk'] font-bold text-[#E8FF47] text-sm">
                            YOUR DATA = YOURS
                        </p>
                        <p className="text-white/50 text-xs mt-1">We don't sell your info. Ever.</p>
                    </div>
                </div>
            </div>

            {/* SCROLL INDICATOR */}
            <div
                className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 transition-opacity duration-500 ${isDark ? 'opacity-0' : 'opacity-100'
                    }`}
            >
                <span className="text-[10px] font-['Space_Grotesk'] tracking-widest text-black/30 uppercase">
                    Scroll to reveal
                </span>
                <div className="w-5 h-8 rounded-full border-2 border-black/20 flex items-start justify-center p-1">
                    <div className="w-1 h-2 bg-black/40 rounded-full animate-bounce" />
                </div>
            </div>

            {/* Tailwind custom animations */}
            <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-ticker {
          animation: ticker 20s linear infinite;
        }
        @keyframes phoneScroll {
          0% { transform: translateY(0); }
          20% { transform: translateY(-25%); }
          40% { transform: translateY(-50%); }
          60% { transform: translateY(-75%); }
          80% { transform: translateY(-50%); }
          100% { transform: translateY(0); }
        }
        .animate-phone-scroll {
          animation: phoneScroll 12s ease-in-out infinite;
        }
        @keyframes float1 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float2 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes float3 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes float4 {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .float-1 { animation: float1 4s ease-in-out infinite; }
        .float-2 { animation: float2 5s ease-in-out infinite 0.5s; }
        .float-3 { animation: float3 3.5s ease-in-out infinite 1s; }
        .float-4 { animation: float4 4.5s ease-in-out infinite 1.5s; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease forwards;
        }
        .info-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .info-card:hover {
          transform: scale(1.03) translateY(-4px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.15);
        }
      `}</style>
        </section>
    );
};

export default HeroSection;