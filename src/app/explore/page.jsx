'use client';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const ExplorePage = () => {
    const [visible, setVisible] = useState({});
    const [cardFx, setCardFx] = useState({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.target.dataset.id) {
                        setVisible((prev) => (prev[entry.target.dataset.id] ? prev : { ...prev, [entry.target.dataset.id]: true }));
                    }
                });
            },
            { threshold: 0.12, rootMargin: '0px 0px -10% 0px' }
        );
        const timer = setTimeout(() => {
            document.querySelectorAll('.explore-reveal').forEach((el) => observer.observe(el));
        }, 100);
        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, []);

    const handleMouseMove = (e, id) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        setCardFx((prev) => ({
            ...prev,
            [id]: { rotateX: (0.5 - py) * 8, rotateY: (px - 0.5) * 8, glowX: px * 100, glowY: py * 100, active: true },
        }));
    };
    const handleMouseLeave = (id) => {
        setCardFx((prev) => ({ ...prev, [id]: { rotateX: 0, rotateY: 0, glowX: 50, glowY: 50, active: false } }));
    };

    const serviceOptions = [
        {
            id: 'crm',
            title: 'CRM Systems',
            subtitle: 'Scale customer operations with intelligent workflows',
            details: 'Custom CRM platforms built to organize leads, automate follow-ups, and connect sales, support and marketing into one polished dashboard.',
            highlights: ['Lead scoring & automation', 'Pipeline visibility', 'Personalized customer journeys'],
            color: '#C084FC',
            ready: '10+ days',
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6-1.13a4 4 0 100-8 4 4 0 000 8zm6 3.13a4 4 0 00-3-3.87M7 8a4 4 0 118 0 4 4 0 01-8 0z" />,
        },
        {
            id: 'marketing',
            title: 'Digital Marketing',
            subtitle: 'Launch campaigns that convert and build brand trust',
            details: 'Performance-first marketing with conversion-ready landing pages, funnel optimization, paid ads, and measurable growth reporting.',
            highlights: ['PPC strategy', 'Content creation', 'Analytics & reporting'],
            color: '#60A5FA',
            ready: '5+ days',
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />,
        },
        {
            id: 'extensions',
            title: 'Chrome Extensions',
            subtitle: 'Add utility to browser workflows with custom extensions',
            details: 'Build browser tools that boost productivity, automate tasks, or enhance customer experiences directly inside Chrome.',
            highlights: ['Manifest v3 ready', 'Secure permissions', 'Fast UI interactions'],
            color: '#34D399',
            ready: '7+ days',
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 01-.825-.242m9.345-8.334a2.126 2.126 0 00-.476-.095 48.64 48.64 0 00-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0011.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155" />,
        },
        {
            id: 'ads',
            title: 'Advertisements',
            subtitle: 'Creative ads that stand out across search and social',
            details: 'From motion-rich display ads to smart retargeting campaigns, we design high-impact creatives that drive clicks and conversions.',
            highlights: ['Ad copywriting', 'Visual storytelling', 'Campaign optimization'],
            color: '#F472B6',
            ready: '5+ days',
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
        },
        {
            id: 'video',
            title: 'Video Editing',
            subtitle: 'Polished brand videos, reels, and promotional clips',
            details: 'Professional editing, motion graphics, and final renderings that keep your message crisp and your visuals premium.',
            highlights: ['Short-form edits', 'Audio mixing', 'Brand-consistent motion'],
            color: '#C084FC',
            ready: '3+ days',
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />,
        },
        {
            id: 'social',
            title: 'Social Media Handling',
            subtitle: 'Engage audiences with consistent, polished content',
            details: 'Strategy, post design, content calendars, and community engagement tailored to your brand voice across Instagram, LinkedIn, and more.',
            highlights: ['Content planning', 'Audience growth', 'Performance tracking'],
            color: '#E8FF47',
            ready: '5+ days',
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />,
        },
    ];

    return (
        <main id="explore" className="relative min-h-screen overflow-hidden bg-black text-white" style={{ fontFamily: "'Inter', 'Space Grotesk', sans-serif" }}>
            {/* grid background — consistent with rest of site */}
            <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }}
                />
            </div>
            <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.12] blur-[140px] pointer-events-none" style={{ background: '#C084FC' }} />
            <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-[0.12] blur-[140px] pointer-events-none" style={{ background: '#E8FF47' }} />

            <div className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">

                {/* ===== HEADER ===== */}
                <div
                    className="explore-reveal flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
                    data-id="header"
                    style={{ opacity: visible['header'] ? 1 : 0, transform: visible['header'] ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.7s ease' }}
                >
                    <div className="max-w-3xl">
                        <h1 className="font-['Space_Grotesk'] text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
                            DIGITAL SOLUTIONS BUILT FOR
                            <span className="block text-transparent bg-clip-text mt-1" style={{ backgroundImage: 'linear-gradient(135deg, #C084FC, #E8FF47)' }}>
                                GROWTH & REVENUE.
                            </span>
                        </h1>
                        <p className="mt-6 max-w-2xl text-sm md:text-base leading-relaxed text-white/40 font-light">
                            Dive into detailed offerings for CRM, marketing, browser experiences, ads, video, and social media — each one built with polished UX and measurable results.
                        </p>
                    </div>

                    <div className="flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/"
                            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:border-white/25"
                            style={{ background: 'rgba(255,255,255,0.03)' }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5m0 0l7 7m-7-7l7-7" />
                            </svg>
                            Back to Home
                        </Link>
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-black transition duration-300 hover:scale-105"
                            style={{ background: 'linear-gradient(135deg, #C084FC, #E8FF47)' }}
                        >
                            Book a Consultation
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>

                {/* ===== QUICK CATEGORY NAV ===== */}
                <div
                    className="explore-reveal flex flex-wrap gap-2 mt-10"
                    data-id="nav"
                    style={{ opacity: visible['nav'] ? 1 : 0, transition: 'opacity 0.7s ease 0.1s' }}
                >
                    {serviceOptions.map((s) => (
                        <a
                            key={s.id}
                            href={`#${s.id}`}
                            className="px-4 py-2 rounded-full text-xs font-semibold border transition-colors duration-300"
                            style={{ borderColor: 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)', color: 'rgba(255,255,255,0.55)' }}
                        >
                            {s.title}
                        </a>
                    ))}
                </div>

                {/* ===== SERVICE BENTO GRID ===== */}
                <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {serviceOptions.map((service, i) => {
                        const fx = cardFx[service.id] || { rotateX: 0, rotateY: 0, glowX: 50, glowY: 50, active: false };
                        return (
                            <div
                                key={service.id}
                                id={service.id}
                                className="explore-reveal"
                                data-id={`card-${service.id}`}
                                style={{
                                    opacity: visible[`card-${service.id}`] ? 1 : 0,
                                    transform: visible[`card-${service.id}`] ? 'translateY(0)' : 'translateY(24px)',
                                    transition: `opacity 0.6s ease ${(i % 3) * 0.1}s, transform 0.6s ease ${(i % 3) * 0.1}s`,
                                    perspective: '1000px',
                                    scrollMarginTop: '100px',
                                }}
                            >
                                <div
                                    onMouseMove={(e) => handleMouseMove(e, service.id)}
                                    onMouseLeave={() => handleMouseLeave(service.id)}
                                    className="group relative rounded-[28px] overflow-hidden h-full"
                                    style={{
                                        transform: `rotateX(${fx.rotateX}deg) rotateY(${fx.rotateY}deg)`,
                                        transition: fx.active ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                                        transformStyle: 'preserve-3d',
                                    }}
                                >
                                    {/* animated gradient border */}
                                    <div
                                        className="absolute rounded-[28px] transition-opacity duration-500"
                                        style={{
                                            top: '-1px', left: '-1px', right: '-1px', bottom: '-1px',
                                            background: `conic-gradient(from 0deg, ${service.color}, transparent 30%, transparent 70%, ${service.color})`,
                                            opacity: fx.active ? 1 : 0,
                                            animation: fx.active ? 'exploreSpin 3s linear infinite' : 'none',
                                        }}
                                    />

                                    <article
                                        className="relative rounded-[28px] border border-white/10 p-6 h-full flex flex-col"
                                        style={{ background: 'linear-gradient(150deg, rgba(255,255,255,0.045) 0%, rgba(255,255,255,0.015) 100%)' }}
                                    >
                                        {/* cursor spotlight */}
                                        <div
                                            className="absolute inset-0 rounded-[28px] pointer-events-none transition-opacity duration-300"
                                            style={{ opacity: fx.active ? 0.5 : 0, background: `radial-gradient(circle at ${fx.glowX}% ${fx.glowY}%, ${service.color}25, transparent 45%)` }}
                                        />

                                        <div className="relative flex items-start justify-between gap-4">
                                            <div>
                                                <p className="text-[11px] uppercase tracking-[0.28em]" style={{ color: service.color }}>{service.title}</p>
                                                <h2 className="mt-3 text-xl font-bold tracking-tight text-white font-['Space_Grotesk'] leading-snug">
                                                    {service.subtitle}
                                                </h2>
                                            </div>
                                            <div
                                                className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                                                style={{ background: `${service.color}18`, color: service.color, border: `1px solid ${service.color}35` }}
                                            >
                                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor">{service.icon}</svg>
                                            </div>
                                        </div>

                                        <p className="relative mt-5 text-sm leading-relaxed text-white/40 font-light">{service.details}</p>

                                        <ul className="relative mt-5 space-y-2.5 flex-1">
                                            {service.highlights.map((h) => (
                                                <li key={h} className="flex items-start gap-2.5 text-xs md:text-sm text-white/60">
                                                    <span className="mt-1 inline-flex h-1.5 w-1.5 rounded-full shrink-0" style={{ background: service.color }} />
                                                    {h}
                                                </li>
                                            ))}
                                        </ul>

                                        <div className="relative mt-6 flex items-center justify-between gap-3">
                                            <span
                                                className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium text-white/50"
                                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full" style={{ background: service.color }} />
                                                Ready in {service.ready}
                                            </span>
                                            <Link
                                                href="/contact"
                                                className="rounded-full px-4 py-2 text-xs font-bold text-black transition-transform duration-300 hover:scale-105"
                                                style={{ background: service.color }}
                                            >
                                                Start Now
                                            </Link>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* ===== TWO-COLUMN VALUE PROPS ===== */}
                <div className="mt-24 grid gap-6 lg:grid-cols-2">
                    <div
                        className="explore-reveal rounded-[32px] border border-white/10 p-8"
                        data-id="value1"
                        style={{
                            background: 'linear-gradient(150deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                            opacity: visible['value1'] ? 1 : 0,
                            transform: visible['value1'] ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.7s ease',
                        }}
                    >
                        <p className="text-[11px] uppercase tracking-[0.28em]" style={{ color: '#C084FC' }}>Focused Experience</p>
                        <h3 className="mt-4 text-2xl md:text-3xl font-black text-white font-['Space_Grotesk'] tracking-tight">Design-first UI for every service</h3>
                        <p className="mt-4 text-sm leading-relaxed text-white/40 font-light">
                            Each solution includes a polished interface, animation-ready interactions, and a mobile-first flow so users feel the quality from their first tap.
                        </p>
                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                            {['Modern interface', 'Micro-interactions', 'Fast load', 'Clear conversion paths'].map((item) => (
                                <div key={item} className="rounded-2xl border border-white/8 p-3.5 text-xs md:text-sm text-white/60" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                    <span className="inline-flex items-center gap-2">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E8FF47" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                                        {item}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div
                        className="explore-reveal rounded-[32px] border border-white/10 p-8"
                        data-id="value2"
                        style={{
                            background: 'linear-gradient(150deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                            opacity: visible['value2'] ? 1 : 0,
                            transform: visible['value2'] ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.7s ease 0.1s',
                        }}
                    >
                        <p className="text-[11px] uppercase tracking-[0.28em]" style={{ color: '#E8FF47' }}>What We Deliver</p>
                        <h3 className="mt-4 text-2xl md:text-3xl font-black text-white font-['Space_Grotesk'] tracking-tight">A complete digital experience</h3>
                        <p className="mt-4 text-sm leading-relaxed text-white/40 font-light">
                            From strategy and prototyping to launch and analytics, every engagement is designed to engage, convert, and make your brand look premium.
                        </p>
                        <dl className="mt-6 space-y-3.5 text-sm text-white/50">
                            {[
                                { color: '#E8FF47', text: 'High-fidelity layouts with motion and clarity.' },
                                { color: '#C084FC', text: 'Performance-aware builds for modern browsers.' },
                                { color: '#60A5FA', text: 'Custom visuals, branding, and motion design at every step.' },
                            ].map((row) => (
                                <div key={row.text} className="flex items-start gap-3">
                                    <span className="mt-1.5 inline-flex h-2 w-2 rounded-full shrink-0" style={{ background: row.color }} />
                                    <p className="font-light">{row.text}</p>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>

                <div
                    className="explore-reveal mt-20 flex flex-col items-center text-center rounded-[32px] p-10 md:p-14"
                    data-id="cta"
                    style={{
                        // borderColor: 'rgba(255,255,255,0.1)',
                        // background: 'linear-gradient(150deg, rgba(20,20,25,0.9) 0%, rgba(8,8,10,0.95) 100%)',
                        opacity: visible['cta'] ? 1 : 0,
                        transform: visible['cta'] ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.7s ease',
                    }}
                >
                    <h3 className="font-['Space_Grotesk'] font-black text-white text-2xl md:text-3xl mb-3">Not sure which service fits?</h3>
                    <p className="text-white/40 text-sm mb-7 font-light max-w-md">
                        Tell us what you're trying to achieve — we'll map it to the right mix of services in one free call.
                    </p>
                    <Link
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm tracking-wide text-black transition-transform duration-300 hover:scale-105"
                        style={{ background: 'linear-gradient(135deg, #C084FC, #E8FF47)' }}
                    >
                        Book a Free Consultation
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>

            <style>{`
                @keyframes exploreSpin {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `}</style>
        </main>
    );
};

export default ExplorePage;