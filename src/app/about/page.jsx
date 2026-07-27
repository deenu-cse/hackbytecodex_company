'use client';
import React, { useState, useEffect } from 'react';

const AboutPage = () => {
    const [visible, setVisible] = useState({});

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.target.dataset.id) {
                        setVisible((prev) => (prev[entry.target.dataset.id] ? prev : { ...prev, [entry.target.dataset.id]: true }));
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
        );
        const timer = setTimeout(() => {
            document.querySelectorAll('.about-reveal').forEach((el) => observer.observe(el));
        }, 100);
        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, []);

    const stats = [
        { value: '10+', label: 'Products Shipped' },
        { value: '50+', label: 'Startups & Enterprises' },
        { value: '1', label: 'Government Deployment' },
        { value: '4', label: 'Weeks, Avg. Delivery' },
    ];

    const milestones = [
        { year: 'Year 1', title: 'Founded', desc: 'Started building web & mobile products for early-stage startups.' },
        { year: 'Year 1-2', title: 'First 10 Clients', desc: 'Shipped e-commerce stores, CRMs, and mobile apps across multiple industries.' },
        { year: 'Year 2', title: 'Government-Grade Work', desc: 'Deployed and secured a state government web application — CERT-In "Safe to Host" certified.' },
        { year: 'Today', title: 'Full-Stack Studio', desc: 'A complete team handling web, mobile, deployment & long-term maintenance under one roof.' },
    ];

    const values = [
        {
            title: 'Transparent Pricing',
            desc: 'One clear quote, no surprise invoices halfway through the project.',
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 7h6m0 10v-3m-3 3v-3m-3 3v-3m9-8H6a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V9a2 2 0 00-2-2z" />,
        },
        {
            title: 'Real Deadlines',
            desc: 'We commit to a timeline upfront and build backwards from your launch date, not ours.',
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
        },
        {
            title: 'You Own Everything',
            desc: 'Source code, design files, credentials — all handed over. Nothing held hostage.',
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
        },
        {
            title: 'Built to Last',
            desc: 'Clean, documented code that the next developer can actually understand — not just something that works today.',
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
        },
    ];

    const address = 'Jagjeetpur, Haridwar, Uttarakhand 249404, India';
    const mapQuery = encodeURIComponent(address);

    return (
        <div className="relative w-full bg-black overflow-hidden" style={{ fontFamily: "'Inter', 'Space Grotesk', sans-serif" }}>
            <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }}
                />
            </div>
            <div className="absolute top-0 left-1/4 w-[550px] h-[550px] rounded-full opacity-[0.12] blur-[140px] pointer-events-none" style={{ background: '#C084FC' }} />
            <div className="absolute bottom-0 right-1/4 w-[550px] h-[550px] rounded-full opacity-[0.12] blur-[140px] pointer-events-none" style={{ background: '#E8FF47' }} />

            <div className="relative z-10 max-w-5xl mx-auto px-4 md:px-8 py-10 md:py-14">

                <div className="flex flex-col items-center text-center mb-16">
                    <h1 className="font-['Space_Grotesk'] text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
                        WE BUILD PRODUCTS.
                        <br />
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #C084FC, #E8FF47)' }}>
                            NOT JUST PROJECTS.
                        </span>
                    </h1>
                    <p className="text-white/40 text-sm md:text-base max-w-xl mt-6 font-light leading-relaxed">
                        We're a full-stack digital studio building web apps, mobile apps, and everything in between — from early-stage MVPs to
                        government-grade infrastructure. No fluff, no dark patterns, just software that ships and stays live.
                    </p>
                </div>

                {/* ===== STATS ===== */}
                <div
                    className="about-reveal grid grid-cols-2 md:grid-cols-4 gap-4 mb-24"
                    data-id="stats"
                    style={{ opacity: visible['stats'] ? 1 : 0, transform: visible['stats'] ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}
                >
                    {stats.map((s) => (
                        <div key={s.label} className="rounded-2xl p-5 text-center border border-white/8" style={{ background: 'rgba(255,255,255,0.02)' }}>
                            <p className="font-['Space_Grotesk'] font-black text-2xl md:text-3xl" style={{ color: '#E8FF47' }}>{s.value}</p>
                            <p className="text-white/40 text-[11px] md:text-xs mt-1 leading-tight">{s.label}</p>
                        </div>
                    ))}
                </div>

                <div className="mb-28">
                    <div
                        className="about-reveal text-center mb-14"
                        data-id="story-header"
                        style={{ opacity: visible['story-header'] ? 1 : 0, transform: visible['story-header'] ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}
                    >
                        <h2 className="font-['Space_Grotesk'] text-2xl md:text-4xl font-black text-white tracking-tight">
                            HOW WE <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #C084FC, #E8FF47)' }}>GOT HERE</span>
                        </h2>
                    </div>

                    <div className="relative max-w-2xl mx-auto">
                        <div className="absolute left-[15px] md:left-1/2 top-2 bottom-2 w-px md:-translate-x-1/2" style={{ background: 'linear-gradient(180deg, rgba(192,132,252,0.4), rgba(232,255,71,0.4))' }} />
                        <div className="space-y-10">
                            {milestones.map((m, i) => (
                                <div
                                    key={m.title}
                                    className={`about-reveal relative pl-10 md:pl-0 md:grid md:grid-cols-2 md:gap-10 ${i % 2 === 1 ? 'md:text-right' : ''}`}
                                    data-id={`milestone-${i}`}
                                    style={{
                                        opacity: visible[`milestone-${i}`] ? 1 : 0,
                                        transform: visible[`milestone-${i}`] ? 'translateY(0)' : 'translateY(16px)',
                                        transition: `all 0.6s ease ${i * 0.1}s`,
                                    }}
                                >
                                    <span
                                        className="absolute left-0 md:left-1/2 top-1 w-3.5 h-3.5 rounded-full md:-translate-x-1/2 border-2 border-black"
                                        style={{ background: i === milestones.length - 1 ? '#E8FF47' : '#C084FC' }}
                                    />
                                    <div className={i % 2 === 1 ? 'md:col-start-2' : ''}>
                                        <span className="text-[11px] font-bold uppercase tracking-wide" style={{ color: i === milestones.length - 1 ? '#E8FF47' : '#C084FC' }}>{m.year}</span>
                                        <h3 className="font-['Space_Grotesk'] font-bold text-white text-base md:text-lg mt-1">{m.title}</h3>
                                        <p className="text-white/40 text-xs md:text-sm mt-1 leading-relaxed font-light">{m.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ===== VALUES ===== */}
                <div className="mb-28">
                    <div
                        className="about-reveal text-center mb-12"
                        data-id="values-header"
                        style={{ opacity: visible['values-header'] ? 1 : 0, transform: visible['values-header'] ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}
                    >
                        <h2 className="font-['Space_Grotesk'] text-2xl md:text-4xl font-black text-white tracking-tight">
                            WHAT WE <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #C084FC, #E8FF47)' }}>STAND FOR</span>
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                        {values.map((v, i) => (
                            <div
                                key={v.title}
                                className="about-reveal rounded-2xl p-6 border border-white/10"
                                data-id={`value-${i}`}
                                style={{
                                    background: 'linear-gradient(150deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                                    opacity: visible[`value-${i}`] ? 1 : 0,
                                    transform: visible[`value-${i}`] ? 'translateY(0)' : 'translateY(16px)',
                                    transition: `all 0.6s ease ${i * 0.08}s`,
                                }}
                            >
                                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(192,132,252,0.12)', color: '#C084FC' }}>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">{v.icon}</svg>
                                </div>
                                <h3 className="font-['Space_Grotesk'] font-bold text-white text-base mb-1.5">{v.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed font-light">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* ===== FIND US ===== */}
                <div className="mb-24">
                    <div
                        className="about-reveal text-center mb-12"
                        data-id="find-header"
                        style={{ opacity: visible['find-header'] ? 1 : 0, transform: visible['find-header'] ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease' }}
                    >
                        <h2 className="font-['Space_Grotesk'] text-2xl md:text-4xl font-black text-white tracking-tight">
                            FIND <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #C084FC, #E8FF47)' }}>US</span>
                        </h2>
                        <p className="text-white/40 text-sm mt-3 font-light">We work with clients globally, but this is where we call home.</p>
                    </div>

                    <div
                        className="about-reveal grid md:grid-cols-2 gap-0 rounded-3xl border border-white/10 overflow-hidden"
                        data-id="find-map"
                        style={{
                            background: 'linear-gradient(150deg, rgba(20,20,25,0.9) 0%, rgba(8,8,10,0.95) 100%)',
                            opacity: visible['find-map'] ? 1 : 0,
                            transform: visible['find-map'] ? 'translateY(0)' : 'translateY(20px)',
                            transition: 'all 0.7s ease',
                        }}
                    >
                        {/* Address card */}
                        <div className="p-8 md:p-10 flex flex-col justify-center">
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(232,255,71,0.12)', color: '#E8FF47' }}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a2 2 0 01-2.828 0l-4.243-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <h3 className="font-['Space_Grotesk'] font-bold text-white text-lg mb-2">Our Base</h3>
                            <p className="text-white/50 text-sm leading-relaxed font-light mb-1">Jagjeetpur, Haridwar</p>
                            <p className="text-white/50 text-sm leading-relaxed font-light mb-1">Uttarakhand, 249404</p>
                            <p className="text-white/50 text-sm leading-relaxed font-light mb-6">India</p>

                            <a
                                href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs w-fit text-black transition-transform duration-300 hover:scale-105"
                                style={{ background: 'linear-gradient(135deg, #C084FC, #E8FF47)' }}
                            >
                                Get Directions
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                                </svg>
                            </a>
                        </div>

                        {/* Embedded map */}
                        <div className="relative min-h-[280px] md:min-h-[320px]">
                            <iframe
                                title="Our location in Jagjeetpur, Haridwar"
                                src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                                className="absolute inset-0 w-full h-full"
                                style={{ border: 0, filter: 'grayscale(0.3) invert(0.9) contrast(0.9)' }}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                            {/* corner accent so the map blends with the dark theme */}
                            <div className="absolute inset-0 pointer-events-none" style={{ boxShadow: 'inset 0 0 40px rgba(0,0,0,0.4)' }} />
                        </div>
                    </div>
                </div>

                <div
                    className="about-reveal flex flex-col items-center text-center rounded-3xl p-10"
                    data-id="cta"
                    style={{
                        opacity: visible['cta'] ? 1 : 0,
                        transform: visible['cta'] ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 0.7s ease',
                    }}
                >
                    <h3 className="font-['Space_Grotesk'] font-black text-white text-xl md:text-2xl mb-2">Got a project in mind?</h3>
                    <p className="text-white/40 text-sm mb-6 font-light max-w-sm">We'd love to hear about it — no pitch, just a conversation.</p>
                    <a
                        href="/contact"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-sm tracking-wide text-black transition-transform duration-300 hover:scale-105"
                        style={{ background: 'linear-gradient(135deg, #C084FC, #E8FF47)' }}
                    >
                        Start Your Project
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;