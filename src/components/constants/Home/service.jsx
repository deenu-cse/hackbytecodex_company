'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState, useCallback } from 'react';

const ServiceHero = () => {
    const canvasRef = useRef(null);
    const [hoveredService, setHoveredService] = useState(null);

    // Optimized canvas animation — reduced segments, no glow layers, uses offscreen drawing
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        let animationId;
        let time = 0;
        let isVisible = true;

        const resize = () => {
            const dpr = Math.min(window.devicePixelRatio, 2);
            const w = window.innerWidth;
            const h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            canvas.style.width = w + 'px';
            canvas.style.height = h + 'px';
            ctx.scale(dpr, dpr);
        };
        resize();

        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resize, 150);
        };
        window.addEventListener('resize', handleResize);

        // Intersection observer — pause canvas when off-screen
        const observer = new IntersectionObserver(
            ([entry]) => { isVisible = entry.isIntersecting; },
            { threshold: 0.1 }
        );
        observer.observe(canvas);

        const drawAuroraArc = (colorStops, yOffset, amplitude, speed, phase, width, glowColor) => {
            const w = canvas.style.width ? parseInt(canvas.style.width) : window.innerWidth;
            const h = canvas.style.height ? parseInt(canvas.style.height) : window.innerHeight;
            const cx = w / 2;
            const cy = h / 2;
            // Reduced from 200 to 60 segments — much lighter on GPU
            const segments = 60;

            // Single glow pass instead of 4 nested loops
            ctx.beginPath();
            for (let i = 0; i <= segments; i++) {
                const t = i / segments;
                const x = t * w;
                const sweep = Math.sin(time * speed + phase + t * Math.PI * 0.5) * amplitude;
                const y = cy + yOffset + sweep + Math.sin(t * Math.PI * 2 + time * 0.3) * 30;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = `rgba(${glowColor}, 0.08)`;
            ctx.lineWidth = width * 2.5;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Main arc line
            ctx.beginPath();
            for (let i = 0; i <= segments; i++) {
                const t = i / segments;
                const x = t * w;
                const sweep = Math.sin(time * speed + phase + t * Math.PI * 0.5) * amplitude;
                const y = cy + yOffset + sweep + Math.sin(t * Math.PI * 2 + time * 0.3) * 30;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }

            const lineGradient = ctx.createLinearGradient(0, cy + yOffset - width, 0, cy + yOffset + width);
            colorStops.forEach((stop) => {
                lineGradient.addColorStop(stop.pos, stop.color);
            });

            ctx.strokeStyle = lineGradient;
            ctx.lineWidth = width;
            ctx.lineCap = 'round';
            ctx.stroke();

            // Bright core line
            ctx.beginPath();
            for (let i = 0; i <= segments; i++) {
                const t = i / segments;
                const x = t * w;
                const sweep = Math.sin(time * speed + phase + t * Math.PI * 0.5) * amplitude;
                const y = cy + yOffset + sweep + Math.sin(t * Math.PI * 2 + time * 0.3) * 30;
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.lineWidth = 1;
            ctx.stroke();
        };

        const animate = () => {
            if (!isVisible) {
                animationId = requestAnimationFrame(animate);
                return;
            }

            time += 0.008;
            const w = parseInt(canvas.style.width) || window.innerWidth;
            const h = parseInt(canvas.style.height) || window.innerHeight;
            ctx.clearRect(0, 0, w, h);

            // Subtle grid background
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
            ctx.lineWidth = 0.5;
            const gridSize = 60;
            for (let x = 0; x < w; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, h);
                ctx.stroke();
            }
            for (let y = 0; y < h; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(w, y);
                ctx.stroke();
            }

            // Top arc — Blue/Purple aurora
            drawAuroraArc(
                [
                    { pos: 0, color: 'rgba(100, 80, 200, 0)' },
                    { pos: 0.2, color: 'rgba(120, 100, 220, 0.4)' },
                    { pos: 0.5, color: 'rgba(140, 120, 240, 0.6)' },
                    { pos: 0.8, color: 'rgba(120, 100, 220, 0.4)' },
                    { pos: 1, color: 'rgba(100, 80, 200, 0)' },
                ],
                -80, 120, 0.7, 0, 25, '100, 80, 200'
            );

            // Bottom arc — Pink/Magenta aurora
            drawAuroraArc(
                [
                    { pos: 0, color: 'rgba(200, 80, 140, 0)' },
                    { pos: 0.2, color: 'rgba(220, 100, 160, 0.35)' },
                    { pos: 0.5, color: 'rgba(240, 120, 180, 0.5)' },
                    { pos: 0.8, color: 'rgba(220, 100, 160, 0.35)' },
                    { pos: 1, color: 'rgba(200, 80, 140, 0)' },
                ],
                100, 100, 0.5, Math.PI / 2, 30, '200, 80, 140'
            );

            // Secondary subtle arc
            drawAuroraArc(
                [
                    { pos: 0, color: 'rgba(80, 60, 180, 0)' },
                    { pos: 0.5, color: 'rgba(100, 80, 200, 0.2)' },
                    { pos: 1, color: 'rgba(80, 60, 180, 0)' },
                ],
                -150, 80, 0.4, Math.PI, 20, '80, 60, 180'
            );

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

    // NOTE: Removed mouse tracking spotlight — it was causing setState on every mousemove
    // which re-renders the entire component 60+ times/second. The aurora canvas is enough visual effect.

    const services = [
        {
            id: 'web',
            title: 'Web Development',
            short: 'Web Dev',
            desc: 'React, Next.js, Node.js — blazing fast, SEO-ready websites',
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            color: '#C084FC',
            features: ['Responsive Design', 'SEO Optimized', 'CMS Integration'],
        },
        {
            id: 'app',
            title: 'App Development',
            short: 'App Dev',
            desc: 'Flutter & React Native — one codebase, iOS + Android',
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            ),
            color: '#E8FF47',
            features: ['Cross-Platform', 'Native Performance', 'Offline Support'],
        },
        {
            id: 'deploy',
            title: 'Deployment',
            short: 'Deploy',
            desc: 'AWS, Vercel, Play Store — ship with zero downtime',
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
            ),
            color: '#60A5FA',
            features: ['CI/CD Pipeline', 'Auto Scaling', 'SSL & Security'],
        },
        {
            id: 'maintain',
            title: 'Maintenance',
            short: 'Support',
            desc: '24/7 monitoring, updates & bug fixes — we got you',
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
            ),
            color: '#F472B6',
            features: ['24/7 Uptime', 'Security Patches', 'Performance Tuning'],
        },
        {
            id: 'mobile',
            title: 'Android / iOS',
            short: 'Mobile',
            desc: 'Native & hybrid apps — published to Play Store & App Store',
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                    <path d="M12 18h.01" />
                </svg>
            ),
            color: '#34D399',
            features: ['App Store Ready', 'Push Notifications', 'Biometric Auth'],
        },
    ];

    return (
        <section id="services" className="relative w-full min-h-screen bg-black overflow-hidden flex flex-col items-center justify-center py-10">
            <canvas ref={canvasRef} className="absolute inset-0 z-0" style={{ willChange: 'auto' }} />

            <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl px-6">


                <h1 className="font-['Space_Grotesk'] text-4xl md:text-6xl lg:text-7xl font-black text-white text-center leading-tight tracking-tight mb-4">
                    Haridwar Digital <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #C084FC, #E8FF47)' }}>Solutions</span>
                </h1>

                <p className="text-white/40 text-center text-base md:text-lg font-light max-w-xl mb-8 leading-relaxed">
                    We build, deploy & maintain your digital presence end-to-end. From idea to app store.
                </p>
                <div className="flex flex-col items-center justify-center gap-4 mb-12 sm:flex-row">
                    <Link
                        href="/explore"
                        className="inline-flex cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-[#C084FC] via-[#60A5FA] to-[#E8FF47] px-8 py-3 text-sm font-semibold text-black transition duration-300 hover:brightness-110"
                    >
                        Explore digital solutions
                    </Link>
                    <Link
                        href="/contact"
                        className="inline-flex cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition duration-300 hover:border-white/20 hover:bg-white/10"
                    >
                        Talk to us
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full mb-12">
                    {services.map((service, index) => (
                        <div
                            key={service.id}
                            className="group relative cursor-pointer"
                            onMouseEnter={() => setHoveredService(service.id)}
                            onMouseLeave={() => setHoveredService(null)}
                        >
                            <div
                                className="absolute inset-0 rounded-2xl blur-xl transition-opacity duration-500"
                                style={{
                                    backgroundColor: service.color,
                                    opacity: hoveredService === service.id ? 0.15 : 0,
                                }}
                            />

                            {/* Card */}
                            <div
                                className="relative rounded-2xl p-5 h-full transition-all duration-300 group-hover:scale-[1.02] group-hover:-translate-y-1"
                                style={{
                                    background: hoveredService === service.id
                                        ? 'linear-gradient(145deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)'
                                        : 'linear-gradient(145deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                                    border: hoveredService === service.id
                                        ? `1px solid ${service.color}40`
                                        : '1px solid rgba(255,255,255,0.06)',
                                    boxShadow: hoveredService === service.id
                                        ? `0 0 30px ${service.color}15, inset 0 1px 0 rgba(255,255,255,0.1)`
                                        : 'none',
                                    willChange: 'transform',
                                }}
                            >
                                {/* Icon */}
                                <div
                                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300"
                                    style={{
                                        backgroundColor: `${service.color}15`,
                                        color: service.color,
                                        boxShadow: hoveredService === service.id ? `0 0 20px ${service.color}30` : 'none',
                                    }}
                                >
                                    {service.icon}
                                </div>

                                {/* Title */}
                                <h3 className="font-['Space_Grotesk'] font-bold text-white text-sm mb-2 tracking-wide">
                                    {service.title}
                                </h3>

                                {/* Description */}
                                <p className="text-white/40 text-xs leading-relaxed mb-4">
                                    {service.desc}
                                </p>

                                {/* Features — appear on hover */}
                                <div className={`space-y-1.5 transition-all duration-300 ${hoveredService === service.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 h-0 overflow-hidden'}`}>
                                    {service.features.map((feat, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: service.color }} />
                                            <span className="text-white/50 text-[11px]">{feat}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Bottom accent line */}
                                <div
                                    className="absolute bottom-0 left-4 right-4 h-[2px] rounded-full transition-all duration-500"
                                    style={{
                                        backgroundColor: service.color,
                                        opacity: hoveredService === service.id ? 0.6 : 0,
                                        transform: hoveredService === service.id ? 'scaleX(1)' : 'scaleX(0)',
                                    }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div
                className="absolute bottom-0 left-0 right-0 h-40 z-10"
                style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)' }}
            />
        </section>
    );
};

export default ServiceHero;