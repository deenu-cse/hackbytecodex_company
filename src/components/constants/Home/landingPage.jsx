'use client';
import Link from 'next/link';
import React, { useEffect, useRef, useState, useCallback } from 'react';

const LandingPage = () => {
    const canvasRef = useRef(null);
    const section2Ref = useRef(null);
    const [visibleCards, setVisibleCards] = useState({});

    // Scroll-reveal using IntersectionObserver instead of querySelectorAll on every scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.target.dataset.id) {
                        setVisibleCards((prev) => {
                            if (prev[entry.target.dataset.id]) return prev;
                            return { ...prev, [entry.target.dataset.id]: true };
                        });
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -15% 0px' }
        );

        // Observe after a tick so all elements are mounted
        const timer = setTimeout(() => {
            const els = document.querySelectorAll('.animate-on-scroll');
            els.forEach((el) => observer.observe(el));
        }, 100);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, []);

    // Aurora curved lines canvas — with IntersectionObserver pause + reduced complexity
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        let animationId;
        let time = 0;
        let isVisible = true;
        let hasCompleted = false; // Stop animating after lines are drawn

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;
            const dpr = Math.min(window.devicePixelRatio, 2);
            const w = parent.offsetWidth;
            const h = parent.offsetHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();

        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resize, 150);
        };
        window.addEventListener('resize', handleResize);

        // Pause when off-screen
        const observer = new IntersectionObserver(
            ([entry]) => { isVisible = entry.isIntersecting; },
            { threshold: 0.1 }
        );
        if (canvas.parentElement) observer.observe(canvas.parentElement);

        const drawCurvedLine = (startX, startY, endX, endY, controlX, controlY, progress, color, glowColor, dotPositions = []) => {
            const steps = 60; // Reduced from 100

            // Single glow pass instead of separate wide stroke
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${glowColor}, 0.12)`;
            ctx.lineWidth = 6;
            for (let i = 0; i <= steps * progress; i++) {
                const t = i / steps;
                const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX;
                const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * endY;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            // Core line
            ctx.beginPath();
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.5;
            for (let i = 0; i <= steps * progress; i++) {
                const t = i / steps;
                const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX;
                const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * endY;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            dotPositions.forEach((dotT) => {
                if (dotT <= progress) {
                    const t = dotT;
                    const x = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * endX;
                    const y = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * endY;
                    ctx.beginPath();
                    ctx.arc(x, y, 3.5, 0, Math.PI * 2);
                    ctx.fillStyle = color;
                    ctx.fill();
                }
            });
        };

        const animate = () => {
            if (hasCompleted) return; // Stop the loop entirely once drawn
            if (!isVisible) {
                animationId = requestAnimationFrame(animate);
                return;
            }

            time += 0.016;
            const w = parseInt(canvas.style.width) || 800;
            const h = parseInt(canvas.style.height) || 600;
            ctx.clearRect(0, 0, w, h);
            const progress = Math.min(time * 0.5, 1);

            drawCurvedLine(w * 0.08, h * 0.15, w * 0.25, h * 0.55, w * 0.05, h * 0.45, progress, '#C084FC', '192, 132, 252', [0.3, 0.6]);
            drawCurvedLine(w * 0.25, h * 0.55, w * 0.42, h * 0.75, w * 0.28, h * 0.85, progress, '#C084FC', '192, 132, 252', [0.5]);
            drawCurvedLine(w * 0.92, h * 0.2, w * 0.78, h * 0.6, w * 0.95, h * 0.5, progress, '#E8FF47', '232, 255, 71', [0.4]);
            drawCurvedLine(w * 0.78, h * 0.6, w * 0.62, h * 0.8, w * 0.82, h * 0.9, progress, '#E8FF47', '232, 255, 71', [0.5]);
            drawCurvedLine(w * 0.42, h * 0.75, w * 0.58, h * 0.78, w * 0.5, h * 0.95, progress, '#C084FC', '192, 132, 252', [0.5]);

            if (progress >= 1) {
                hasCompleted = true; // Lines fully drawn, no need to keep animating
                return;
            }

            animationId = requestAnimationFrame(animate);
        };
        animate();

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            observer.disconnect();
            clearTimeout(resizeTimeout);
        };
    }, []);

    const heroProjects = [
        { id: 1, name: 'FoodyBazar', type: 'Grocery Delivery', tag: 'Live', x: 'left-[5%]', y: 'top-[15%]' },
        { id: 2, name: 'LuggageLux', type: 'E-Commerce', tag: 'Live', x: 'left-[22%]', y: 'top-[50%]' },
        { id: 3, name: 'VedicPedia', type: 'Web + Mobile', tag: 'Live', x: 'left-[38%]', y: 'top-[70%]' },
        { id: 4, name: 'Bars of Beauty', type: 'Shopping App', tag: 'Live', x: 'right-[38%]', y: 'top-[72%]' },
        { id: 5, name: 'VyoCRM', type: 'CRM Software', tag: 'Live', x: 'right-[22%]', y: 'top-[55%]' },
        { id: 6, name: 'Gastro Liver Experts', type: 'Healthcare Web App', tag: 'Live', x: 'right-[5%]', y: 'top-[18%]' },
    ];

    const problemSteps = [
        { week: 'Week 0', title: 'You Sign & Pay the Deposit', desc: 'Most agencies ask for 40-50% upfront before writing a single line of code for your project.', cost: '0% delivered', side: 'left' },
        { week: 'Week 3', title: 'Second Invoice, Still No Product', desc: 'Development is "in progress" — but you have nothing to show your team or investors yet.', cost: 'nothing live', side: 'right' },
        { week: 'Week 7', title: 'Scope Creep & Extra Charges', desc: 'Revisions, bug fixes, and "that wasn\'t in the original scope" invoices start piling up.', cost: 'still in QA', side: 'left' },
        { week: 'Week 10+', title: 'Finally Live — If You\'re Lucky', desc: 'This is the typical agency timeline. We build the same scope and get you live in 4 weeks flat, one clear price.', cost: 'We do this in 4 weeks', side: 'right', highlight: true },
    ];

    return (
        <div className="w-full bg-black" style={{ fontFamily: "'Inter', 'Space Grotesk', sans-serif" }}>
            <section className="relative w-full min-h-screen overflow-hidden px-4 md:px-8 lg:px-16 pt-6 pb-12 bg-black">
                <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage:
                                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                            backgroundSize: '80px 80px',
                        }}
                    />
                </div>

                <div className="absolute inset-0 z-0 pointer-events-none">
                    <canvas ref={canvasRef} className="w-full h-full" />
                </div>

                {heroProjects.map((project) => (
                    <div
                        key={project.id}
                        className={`absolute ${project.x} ${project.y} z-10 hidden md:flex items-center gap-3 rounded-2xl px-4 py-3 shadow-lg border border-white/10 landing-float`}
                        style={{
                            animationDuration: `${3 + project.id * 0.3}s`,
                            background: 'linear-gradient(145deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
                            backdropFilter: 'blur(8px)',
                            willChange: 'transform',
                        }}
                    >
                        <div className="w-10 h-10 rounded-full border-2 border-white/10 shadow flex items-center justify-center text-white/70 text-xs font-bold"
                            style={{ background: 'linear-gradient(135deg, rgba(192,132,252,0.3), rgba(232,255,71,0.2))' }}
                        >
                            {project.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                        </div>
                        <div>
                            <p className="text-xs font-semibold text-white">{project.name}</p>
                            <p className="text-[10px] text-white/50 flex items-center gap-1">
                                {project.type}
                                <span className="inline-flex items-center gap-1 text-[#E8FF47] font-bold ml-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                                    {project.tag}
                                </span>
                            </p>
                        </div>
                    </div>
                ))}

                <div className="relative z-20 flex flex-col items-center justify-center min-h-[80vh]">

                    <h1 className="font-['Space_Grotesk'] text-4xl md:text-6xl lg:text-7xl font-black text-center text-white leading-[1.05] tracking-tight max-w-4xl">
                        STOP LOSING CLIENTS
                        <br />
                        TO <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #C084FC, #E8FF47)' }}>SLOW</span> DELIVERY
                    </h1>

                    <p className="mt-6 text-center text-white/40 text-base md:text-lg max-w-xl leading-relaxed font-light">
                        Web, app & full-stack digital solutions built at 2x market speed.
                        <br />
                        No delays. No excuses. Just results.
                    </p>

                    <Link href='/contact'>
                        <button
                            className="mt-8 px-8 py-4 rounded-full font-bold text-sm tracking-wide shadow-lg flex items-center gap-2 text-black landing-btn-hover cursor-pointer"
                            style={{ background: 'linear-gradient(135deg, #C084FC, #E8FF47)' }}
                        >
                            Start Your Project
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </button>
                    </Link>
                </div>
            </section>

            <section ref={section2Ref} className="relative w-full py-4 px-4 md:px-8 lg:px-16 bg-black">
                <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.03]">
                    <div
                        className="w-full h-full"
                        style={{
                            backgroundImage:
                                'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                            backgroundSize: '80px 80px',
                        }}
                    />
                </div>

                <div className="absolute left-1/2 top-24 bottom-24 w-[2px] -translate-x-1/2" style={{ background: 'linear-gradient(180deg, transparent, rgba(192,132,252,0.3) 20%, rgba(232,255,71,0.3) 80%, transparent)' }} />
                <div className="mt-2 flex items-center gap-2 text-white/30 text-xs">
                    <div className="flex -space-x-2">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center text-[8px] text-white/60 font-bold"
                                style={{ background: `hsl(${260 + i * 20}, 60%, 40%)` }}
                            >
                                {String.fromCharCode(64 + i)}
                            </div>
                        ))}
                    </div>
                    Trusted by 50+ startups & enterprises
                </div>

                <div className="relative flex justify-center mb-4">
                    <span className="px-6 py-2 rounded-full border border-white/10 text-white/50 text-sm font-medium" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        The Typical Agency Timeline
                    </span>
                </div>

                <h2 className="relative font-['Space_Grotesk'] text-3xl md:text-5xl font-black text-center text-white mb-4 tracking-tight">
                    THIS IS WHAT MOST CLIENTS
                    <br />
                    GO THROUGH <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #C084FC, #E8FF47)' }}>BEFORE THEY LAUNCH.</span>
                </h2>
                <p className="relative text-center text-white/40 text-sm md:text-base max-w-lg mx-auto mb-16 font-light">
                    Money keeps leaving your account, and there's still nothing live for your users to touch.
                </p>

                {/* Timeline steps */}
                <div className="max-w-4xl mx-auto relative">
                    {problemSteps.map((step, index) => (
                        <div
                            key={index}
                            className={`animate-on-scroll flex items-start gap-6 mb-12 ${step.side === 'right' ? 'md:flex-row-reverse' : ''}`}
                            data-id={`problem-${index}`}
                            style={{
                                opacity: visibleCards[`problem-${index}`] ? 1 : 0,
                                transform: visibleCards[`problem-${index}`] ? 'translateY(0)' : 'translateY(30px)',
                                transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`,
                            }}
                        >
                            {/* Content card */}
                            <div className={`flex-1 ${step.side === 'right' ? 'md:text-right' : ''}`}>
                                <div className={`inline-flex items-center gap-3 mb-3 ${step.side === 'right' ? 'md:flex-row-reverse' : ''}`}>
                                    <span
                                        className="px-4 py-1.5 rounded-full text-xs font-bold border"
                                        style={
                                            step.highlight
                                                ? { color: '#E8FF47', borderColor: 'rgba(232,255,71,0.3)', background: 'rgba(232,255,71,0.08)' }
                                                : { color: '#F472B6', borderColor: 'rgba(244,114,182,0.3)', background: 'rgba(244,114,182,0.08)' }
                                        }
                                    >
                                        {step.cost}
                                    </span>
                                </div>
                                <h3 className="font-['Space_Grotesk'] text-lg font-bold text-white mb-1">{step.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed max-w-sm font-light">{step.desc}</p>
                            </div>

                            {/* Week badge */}
                            <div className="relative z-10 flex flex-col items-center">
                                <div
                                    className="w-20 h-20 rounded-2xl border flex flex-col items-center justify-center px-1"
                                    style={
                                        step.highlight
                                            ? { borderColor: 'rgba(232,255,71,0.4)', background: 'linear-gradient(145deg, rgba(232,255,71,0.08), rgba(255,255,255,0.02))', boxShadow: '0 0 30px rgba(232,255,71,0.1)' }
                                            : { borderColor: 'rgba(255,255,255,0.1)', background: 'linear-gradient(145deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))' }
                                    }
                                >
                                    <span
                                        className={`text-sm font-black text-center leading-tight ${step.highlight ? '' : 'text-white'}`}
                                        style={step.highlight ? { color: '#E8FF47' } : {}}
                                    >
                                        {step.week}
                                    </span>
                                </div>
                            </div>

                            <div className="flex-1 hidden md:block" />
                        </div>
                    ))}
                </div>
            </section>

            <style>{`
                @keyframes landingFloat {
                    0%, 100% { transform: translateY(0px) translateZ(0); }
                    50% { transform: translateY(-10px) translateZ(0); }
                }
                .landing-float {
                    animation: landingFloat var(--duration, 4s) ease-in-out infinite;
                }
                .landing-btn-hover {
                    transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
                }
                .landing-btn-hover:hover {
                    transform: scale(1.05) translateZ(0);
                }
            `}</style>
        </div>
    );
};

export default LandingPage;