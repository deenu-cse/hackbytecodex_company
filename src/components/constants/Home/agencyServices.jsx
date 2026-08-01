'use client';
import React, { useEffect, useRef, useState, useCallback } from 'react';

const WebAppDevSection = () => {
    const [visible, setVisible] = useState({});
    const [activeProduct, setActiveProduct] = useState(0);
    const [cartPulse, setCartPulse] = useState(false);
    const [activeScreen, setActiveScreen] = useState(0);
    const sectionRef = useRef(null);

    // IntersectionObserver instead of querySelectorAll on every scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.target.dataset.id) {
                        setVisible((prev) => {
                            if (prev[entry.target.dataset.id]) return prev;
                            return { ...prev, [entry.target.dataset.id]: true };
                        });
                    }
                });
            },
            { threshold: 0.15, rootMargin: '0px 0px -15% 0px' }
        );

        const timer = setTimeout(() => {
            const els = document.querySelectorAll('.reveal-on-scroll');
            els.forEach((el) => observer.observe(el));
        }, 100);

        return () => {
            clearTimeout(timer);
            observer.disconnect();
        };
    }, []);

    // Product carousel — only runs when section is visible
    useEffect(() => {
        let intervalId;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    intervalId = setInterval(() => {
                        setActiveProduct((p) => (p + 1) % 3);
                        setCartPulse(true);
                        setTimeout(() => setCartPulse(false), 900);
                    }, 2600);
                } else {
                    clearInterval(intervalId);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => {
            clearInterval(intervalId);
            observer.disconnect();
        };
    }, []);

    // App screen carousel — only runs when section is visible
    useEffect(() => {
        let intervalId;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    intervalId = setInterval(() => setActiveScreen((s) => (s + 1) % 3), 3200);
                } else {
                    clearInterval(intervalId);
                }
            },
            { threshold: 0.1 }
        );

        if (sectionRef.current) observer.observe(sectionRef.current);

        return () => {
            clearInterval(intervalId);
            observer.disconnect();
        };
    }, []);

    const webPoints = [
        {
            title: 'Blazing-Fast Performance',
            desc: 'Sub-second load times with Next.js SSR, image optimization & edge caching.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
            ),
        },
        {
            title: 'Custom E-Commerce Engines',
            desc: 'Product catalogs, cart, checkout & payment gateways — built around your business, not a template.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            ),
        },
        {
            title: 'SEO-First Architecture',
            desc: 'Dynamic sitemaps, JSON-LD schema & metadata — built to rank from day one.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" />
            ),
        },
        {
            title: 'Scalable Cloud-Ready Code',
            desc: 'Clean, modular architecture that scales from MVP to millions of users without a rewrite.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            ),
        },
    ];

    const appPoints = [
        {
            title: 'Cross-Platform, Native Feel',
            desc: 'One React Native / Flutter codebase — iOS & Android, indistinguishable from fully native apps.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
            ),
        },
        {
            title: 'Offline-First Sync',
            desc: 'Local storage & background sync so your app works flawlessly, even with zero signal.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            ),
        },
        {
            title: 'Push & Real-Time Engagement',
            desc: 'Live notifications, in-app messaging & real-time updates that bring users back.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            ),
        },
        {
            title: 'Biometric & Secure Auth',
            desc: 'Face ID, fingerprint & encrypted sessions built in from the first commit — not bolted on later.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            ),
        },
    ];

    const products = [
        { name: 'Wireless Headset', price: '$89', color: '#C084FC' },
        { name: 'Smart Watch', price: '$149', color: '#E8FF47' },
        { name: 'Running Shoes', price: '$112', color: '#60A5FA' },
    ];

    return (
        <section id="expertise" ref={sectionRef} className="relative w-full bg-black overflow-hidden py-24 px-4 md:px-8 lg:px-16">
            <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }}
                />
            </div>

            {/* Simplified glow blobs — no blur-[120px] (extremely expensive), use gradient instead */}
            <div className="absolute top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(192,132,252,0.4) 0%, transparent 70%)' }} />
            <div className="absolute bottom-40 -right-40 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(232,255,71,0.4) 0%, transparent 70%)' }} />

            <div className="relative z-10 max-w-6xl mx-auto">
            </div>
            <h2 className="font-['Space_Grotesk'] text-3xl md:text-5xl font-black text-center text-white tracking-tight mb-24">
                ONE TEAM. <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #C084FC, #E8FF47)' }}>WEB & APP</span>, DONE RIGHT.
            </h2>

            <div className="grid md:grid-cols-2 gap-14 items-center mb-40">
                <div
                    className="reveal-on-scroll order-2 md:order-1"
                    data-id="web-text"
                    style={{
                        opacity: visible['web-text'] ? 1 : 0,
                        transform: visible['web-text'] ? 'translateX(0)' : 'translateX(-30px)',
                        transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#C084FC' }}>01 · Web Development</span>
                    <h3 className="font-['Space_Grotesk'] text-2xl md:text-4xl font-black text-white mt-3 mb-4 tracking-tight leading-tight">
                        Websites &amp; e-commerce stores built to convert.
                    </h3>
                    <p className="text-white/40 text-sm md:text-base leading-relaxed mb-8 font-light max-w-md">
                        React, Next.js &amp; Node — from marketing sites to full-blown storefronts with carts, checkout and live inventory.
                    </p>

                    <div className="space-y-5">
                        {webPoints.map((point, i) => (
                            <div
                                key={point.title}
                                className="reveal-on-scroll flex items-start gap-4 group"
                                data-id={`web-point-${i}`}
                                style={{
                                    opacity: visible[`web-point-${i}`] ? 1 : 0,
                                    transform: visible[`web-point-${i}`] ? 'translateY(0)' : 'translateY(16px)',
                                    transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.12}s`,
                                }}
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                                    style={{ background: 'rgba(192,132,252,0.1)', color: '#C084FC', border: '1px solid rgba(192,132,252,0.2)' }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        {point.icon}
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-['Space_Grotesk'] font-bold text-white text-sm md:text-base">{point.title}</p>
                                    <p className="text-white/40 text-xs md:text-sm mt-0.5 font-light leading-relaxed">{point.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* E-commerce browser mockup */}
                <div
                    className="reveal-on-scroll order-1 md:order-2"
                    data-id="web-visual"
                    style={{
                        opacity: visible['web-visual'] ? 1 : 0,
                        transform: visible['web-visual'] ? 'translateX(0) scale(1)' : 'translateX(30px) scale(0.96)',
                        transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    <div className="relative mx-auto max-w-md">
                        {/* Glow behind browser — using radial-gradient instead of blur-2xl */}
                        <div className="absolute inset-0 rounded-2xl opacity-25"
                            style={{ background: 'radial-gradient(ellipse at center, rgba(192,132,252,0.4) 0%, rgba(232,255,71,0.2) 50%, transparent 80%)', transform: 'scale(0.9) translateY(20px)' }} />

                        <div
                            className="relative rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
                            style={{ background: 'linear-gradient(145deg, #131318 0%, #0a0a0d 100%)' }}
                        >
                            {/* browser chrome */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                                <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                                <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
                                <div className="ml-3 flex-1 rounded-md px-3 py-1 text-[10px] text-white/30 truncate" style={{ background: 'rgba(255,255,255,0.04)' }}>
                                    yourstore.com/shop
                                </div>
                            </div>

                            <div className="p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="h-3 w-16 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }} />
                                    <div
                                        className="relative w-8 h-8 rounded-lg flex items-center justify-center"
                                        style={{
                                            background: 'rgba(192,132,252,0.12)',
                                            boxShadow: cartPulse ? '0 0 0 6px rgba(192,132,252,0.15)' : 'none',
                                            transition: 'box-shadow 0.4s ease',
                                        }}
                                    >
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                        <span
                                            className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center text-black"
                                            style={{ background: '#E8FF47' }}
                                        >
                                            {activeProduct + 1}
                                        </span>
                                    </div>
                                </div>

                                {/* Product cards — replaced external images with colored placeholders */}
                                <div className="grid grid-cols-3 gap-2">
                                    {products.map((p, i) => (
                                        <div
                                            key={p.name}
                                            className="rounded-xl overflow-hidden border transition-all duration-500"
                                            style={{
                                                borderColor: i === activeProduct ? 'rgba(192,132,252,0.5)' : 'rgba(255,255,255,0.06)',
                                                boxShadow: i === activeProduct ? '0 0 20px rgba(192,132,252,0.2)' : 'none',
                                                transform: i === activeProduct ? 'translateY(-4px)' : 'translateY(0)',
                                                background: 'rgba(255,255,255,0.03)',
                                                willChange: i === activeProduct ? 'transform' : 'auto',
                                            }}
                                        >
                                            <div className="w-full h-16 flex items-center justify-center"
                                                style={{ background: `linear-gradient(135deg, ${p.color}30, ${p.color}10)` }}
                                            >
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={p.color} strokeWidth="1.5">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                                </svg>
                                            </div>
                                            <div className="p-1.5">
                                                <p className="text-white/70 text-[8px] font-medium truncate">{p.name}</p>
                                                <p className="text-[9px] font-bold" style={{ color: '#E8FF47' }}>{p.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div
                                    className="mt-4 rounded-lg px-3 py-2 flex items-center gap-2 text-[10px] font-medium transition-all duration-500"
                                    style={{
                                        background: 'rgba(232,255,71,0.08)',
                                        border: '1px solid rgba(232,255,71,0.2)',
                                        color: '#E8FF47',
                                        opacity: cartPulse ? 1 : 0,
                                        transform: cartPulse ? 'translateY(0)' : 'translateY(6px)',
                                    }}
                                >
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                    {products[activeProduct].name} added to cart
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-14 items-center">
                <div
                    className="reveal-on-scroll order-1"
                    data-id="app-visual"
                    style={{
                        opacity: visible['app-visual'] ? 1 : 0,
                        transform: visible['app-visual'] ? 'translateX(0) scale(1)' : 'translateX(-30px) scale(0.96)',
                        transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    <div className="relative mx-auto" style={{ width: '240px' }}>
                        <div className="absolute inset-0 rounded-[3rem] opacity-25"
                            style={{ background: 'radial-gradient(ellipse at center, rgba(232,255,71,0.5) 0%, rgba(192,132,252,0.3) 50%, transparent 80%)', transform: 'scale(0.85)' }} />

                        <div
                            className="relative mx-auto rounded-[2.5rem] border-[6px] border-white/10 overflow-hidden shadow-2xl"
                            style={{ width: '240px', height: '480px', background: 'linear-gradient(180deg, #131318 0%, #0a0a0d 100%)' }}
                        >
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-b-2xl z-20" />
                            <div className="absolute top-2 left-0 right-0 flex justify-between px-6 z-20">
                                <span className="text-[10px] text-white/60 font-medium">9:41</span>
                                <div className="flex gap-1">
                                    <div className="w-3 h-3 rounded-full bg-white/40" />
                                    <div className="w-3 h-3 rounded-full bg-white/40" />
                                </div>
                            </div>
                            <div className="pt-14 px-4 h-full">
                                <p className="text-white/40 text-[10px] mb-1">Good morning,</p>
                                <p className="text-white font-['Space_Grotesk'] font-bold text-base mb-4">Deenu 👋</p>

                                <div
                                    className="rounded-2xl p-4 mb-3"
                                    style={{ background: 'linear-gradient(135deg, rgba(192,132,252,0.2), rgba(192,132,252,0.05))', border: '1px solid rgba(192,132,252,0.2)' }}
                                >
                                    <p className="text-white/50 text-[9px]">Active Sessions</p>
                                    <p className="text-white font-['Space_Grotesk'] font-black text-2xl mt-1">12,842</p>
                                    <div className="flex items-center gap-1 mt-1">
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#E8FF47" strokeWidth="3">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                                        </svg>
                                        <span className="text-[9px] font-bold" style={{ color: '#E8FF47' }}>+18.2%</span>
                                    </div>
                                </div>

                                <div
                                    className="rounded-xl p-3 flex items-center gap-2 mb-3 transition-all duration-500"
                                    style={{
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        opacity: activeScreen === 1 ? 1 : 0.35,
                                        transform: activeScreen === 1 ? 'translateY(0)' : 'translateY(4px)',
                                    }}
                                >
                                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(232,255,71,0.15)' }}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#E8FF47" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white text-[9px] font-bold">New order received</p>
                                        <p className="text-white/40 text-[8px]">2 sec ago</p>
                                    </div>
                                </div>

                                <div
                                    className="rounded-xl p-3 flex items-center gap-2 transition-all duration-500"
                                    style={{
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        opacity: activeScreen === 2 ? 1 : 0.35,
                                        transform: activeScreen === 2 ? 'translateY(0)' : 'translateY(4px)',
                                    }}
                                >
                                    <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(192,132,252,0.15)' }}>
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className="text-white text-[9px] font-bold">Face ID verified</p>
                                        <p className="text-white/40 text-[8px]">Secure session started</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="reveal-on-scroll order-2"
                    data-id="app-text"
                    style={{
                        opacity: visible['app-text'] ? 1 : 0,
                        transform: visible['app-text'] ? 'translateX(0)' : 'translateX(30px)',
                        transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
                    }}
                >
                    <span className="text-xs font-bold tracking-[0.2em] uppercase" style={{ color: '#E8FF47' }}>02 · App Development</span>
                    <h3 className="font-['Space_Grotesk'] text-2xl md:text-4xl font-black text-white mt-3 mb-4 tracking-tight leading-tight">
                        Mobile apps people actually keep on their phone.
                    </h3>
                    <p className="text-white/40 text-sm md:text-base leading-relaxed mb-8 font-light max-w-md">
                        Flutter &amp; React Native — one codebase shipping to the App Store and Play Store, without a native-feel compromise.
                    </p>

                    <div className="space-y-5">
                        {appPoints.map((point, i) => (
                            <div
                                key={point.title}
                                className="reveal-on-scroll flex items-start gap-4 group"
                                data-id={`app-point-${i}`}
                                style={{
                                    opacity: visible[`app-point-${i}`] ? 1 : 0,
                                    transform: visible[`app-point-${i}`] ? 'translateY(0)' : 'translateY(16px)',
                                    transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${i * 0.12}s`,
                                }}
                            >
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                                    style={{ background: 'rgba(232,255,71,0.1)', color: '#E8FF47', border: '1px solid rgba(232,255,71,0.2)' }}
                                >
                                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        {point.icon}
                                    </svg>
                                </div>
                                <div>
                                    <p className="font-['Space_Grotesk'] font-bold text-white text-sm md:text-base">{point.title}</p>
                                    <p className="text-white/40 text-xs md:text-sm mt-0.5 font-light leading-relaxed">{point.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WebAppDevSection;