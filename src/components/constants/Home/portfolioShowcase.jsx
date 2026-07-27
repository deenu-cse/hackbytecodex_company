'use client';
import React, { useState, useEffect, useRef } from 'react';

const PortfolioShowcase = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    const [visible, setVisible] = useState({});
    const [cardFx, setCardFx] = useState({});
    const filterRefs = useRef({});
    const [indicator, setIndicator] = useState({ left: 0, width: 0 });

    useEffect(() => {
        const handleScroll = () => {
            const els = document.querySelectorAll('.portfolio-reveal');
            els.forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.9) {
                    setVisible((prev) => (prev[el.dataset.id] ? prev : { ...prev, [el.dataset.id]: true }));
                }
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [activeFilter]);

    // sliding indicator behind active filter pill
    useEffect(() => {
        const el = filterRefs.current[activeFilter];
        if (el) {
            setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
        }
    }, [activeFilter]);

    const filters = [
        { name: 'All', icon: '✦' },
        { name: 'Web App', icon: '◆' },
        { name: 'Mobile App', icon: '▲' },
        { name: 'E-Commerce', icon: '●' },
        { name: 'AI', icon: '◈' },
    ];

    const projects = [
        {
            id: 'pugau',
            title: 'FoodyBazar',
            tagline: 'Grocery Delivery App',
            category: 'Mobile App',
            image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=700&h=560&fit=crop',
            stack: ['React Native', 'Node.js', 'MongoDB'],
            metrics: [
                { label: 'Built in', value: '5 Weeks' },
                { label: 'Platform', value: 'Android' },
            ],
            desc: 'End-to-end grocery delivery platform with live order tracking, vendor panel & real-time inventory sync.',
            link: 'https://play.google.com/store/apps/details?id=com.foodyBazar.pugau_user',
            linkLabel: 'Play Store',
            color: '#C084FC',
            size: 'large',
        },
        {
            id: 'barsofbeauty',
            title: 'Bars of Beauty',
            tagline: 'Women Shopping App',
            category: 'E-Commerce',
            image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop',
            stack: ['Flutter', 'Node.js'],
            metrics: [
                { label: 'Built in', value: '6 Weeks' },
                { label: 'Focus', value: 'Beauty' },
            ],
            desc: 'Curated catalogs, wishlist, secure checkout & full order history for a beauty & fashion audience.',
            link: 'https://play.google.com/store/apps/details?id=com.shop.barsofbeauty',
            linkLabel: 'Play Store',
            color: '#E8FF47',
            size: 'small',
        },
        {
            id: 'khmertracks',
            title: 'Khmer Tracks',
            tagline: 'Music Streaming App',
            category: 'Mobile App',
            image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=600&fit=crop',
            stack: ['React Native', 'ExoPlayer'],
            metrics: [
                { label: 'Built in', value: '7 Weeks' },
                { label: 'Feature', value: 'Offline Play' },
            ],
            desc: 'Regional streaming app with background playback and buffer-smart streaming on low bandwidth.',
            link: 'https://play.google.com/store/apps/details?id=com.khmertracks.music.pro',
            linkLabel: 'Play Store',
            color: '#C084FC',
            size: 'small',
        },
        {
            id: 'brekrr',
            title: 'Brekrr',
            tagline: 'Social Media App',
            category: 'Mobile App',
            image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=600&h=600&fit=crop',
            stack: ['React Native', 'Socket.IO'],
            metrics: [
                { label: 'Built in', value: '8 Weeks' },
                { label: 'Feature', value: 'Live Feed' },
            ],
            desc: 'Real-time feed, chat, stories & push-driven engagement loops built for daily active usage.',
            link: 'https://play.google.com/store/apps/details?id=com.brekrr&pcampaignid=web_share',
            linkLabel: 'Play Store',
            color: '#E8FF47',
            size: 'small',
        },
        {
            id: 'vyocrm',
            title: 'VyoCRM',
            tagline: 'CRM Software',
            category: 'Mobile App',
            image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=600&fit=crop',
            stack: ['React Native', 'Express'],
            metrics: [
                { label: 'Built in', value: '6 Weeks' },
                { label: 'Users', value: 'Sales Teams' },
            ],
            desc: 'Lead & pipeline management CRM built for field sales — leads, follow-ups & reports on the go.',
            link: 'https://play.google.com/store/apps/details?id=com.glg.vyocrm',
            linkLabel: 'Play Store',
            color: '#C084FC',
            size: 'small',
        },
        {
            id: 'gastroliver',
            title: 'Gastro Liver Experts',
            tagline: 'Doctor & Clinic Web App',
            category: 'Web App',
            image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=700&h=560&fit=crop',
            stack: ['Next.js', 'Tailwind'],
            metrics: [
                { label: 'Built in', value: '4 Weeks' },
                { label: 'Load Speed', value: '+45%' },
            ],
            desc: 'Clinic website with appointment booking, doctor profiles & SEO-first architecture for patient discovery.',
            link: 'https://gastroliverexperts.com/',
            linkLabel: 'Live Site',
            color: '#E8FF47',
            size: 'large',
        },
        {
            id: 'darwiz',
            title: 'Darwiz',
            tagline: 'AI-Powered Web App',
            category: 'AI',
            image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=600&fit=crop',
            stack: ['Next.js', 'LLM API'],
            metrics: [
                { label: 'Built in', value: '5 Weeks' },
                { label: 'Powered by', value: 'AI Models' },
            ],
            desc: 'AI-driven web application with intelligent conversational flows and a fast, modern interface.',
            link: 'https://edsplore.com/darwiz/',
            linkLabel: 'Live Site',
            color: '#C084FC',
            size: 'small',
        },
        {
            id: 'luggagelux',
            title: 'LuggageLux',
            tagline: 'E-Commerce Platform',
            category: 'E-Commerce',
            image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=700&h=560&fit=crop',
            stack: ['MERN', 'Razorpay'],
            metrics: [
                { label: 'Built in', value: '6 Weeks' },
                { label: 'Payments', value: 'Razorpay' },
            ],
            desc: 'Full storefront with Razorpay checkout, product variants, coupon engine & order management.',
            link: 'https://www.luggagelux.in',
            linkLabel: 'Live Site',
            color: '#E8FF47',
            size: 'large',
        },
        {
            id: 'gurukulashram',
            title: 'Gurukul Kanva Ashram',
            tagline: 'Ashram Website + Admin Dashboard',
            category: 'Web App',
            image: 'https://images.unsplash.com/photo-1545389336-cf090694435e?w=600&h=600&fit=crop',
            stack: ['Next.js', 'MongoDB'],
            metrics: [
                { label: 'Built in', value: '4 Weeks' },
                { label: 'Includes', value: 'Admin Panel' },
            ],
            desc: 'Public-facing site paired with a custom admin dashboard for content & event management.',
            link: 'https://www.gurukulkanvashram.com',
            linkLabel: 'Live Site',
            color: '#C084FC',
            size: 'small',
        },
        {
            id: 'vedicpedia',
            title: 'VedicPedia',
            tagline: 'Content & Media Platform',
            category: 'Web App',
            image: 'https://images.unsplash.com/photo-1544931170-a1938f200746?w=700&h=560&fit=crop',
            stack: ['MERN', 'iOS', 'Android'],
            metrics: [
                { label: 'Platforms', value: '3 Shipped' },
                { label: 'Content', value: 'Media Heavy' },
            ],
            desc: 'Spiritual content platform shipped as a web app plus native iOS and Android apps.',
            link: 'https://www.thevedicpedia.com',
            linkLabel: 'Live Site',
            color: '#E8FF47',
            size: 'large',
            extraLinks: [
                { label: 'Android', url: 'https://play.google.com/store/apps/details?id=com.vedic_pedia.vedic_pedia_mini' },
                { label: 'iOS', url: 'https://apps.apple.com/app/vedic-pedia/id6746746000' },
            ],
        },
    ];

    const filtered = activeFilter === 'All' ? projects : projects.filter((p) => p.category === activeFilter);

    const handleMouseMove = (e, id) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * 14;
        const rotateX = (0.5 - py) * 14;
        setCardFx((prev) => ({
            ...prev,
            [id]: { rotateX, rotateY, glowX: px * 100, glowY: py * 100, active: true },
        }));
    };

    const handleMouseLeave = (id) => {
        setCardFx((prev) => ({ ...prev, [id]: { rotateX: 0, rotateY: 0, glowX: 50, glowY: 50, active: false } }));
    };

    return (
        <section id="portfolio" className="relative w-full bg-black overflow-hidden py-12 px-4 md:px-8 lg:px-16">
            {/* grid background */}
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

            <div className="relative z-10 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-4">

                    <h2 className="font-['Space_Grotesk'] text-4xl md:text-6xl font-black text-white tracking-tight leading-[0.95]">
                        PROOF, NOT
                        <br />
                        <span className="relative inline-block">
                            <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #C084FC, #E8FF47)' }}>
                                PROMISES.
                            </span>
                            <svg className="absolute -bottom-2 left-0 w-full" height="10" viewBox="0 0 300 10" preserveAspectRatio="none">
                                <path d="M0,5 Q75,10 150,5 T300,5" stroke="url(#underlineGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
                                <defs>
                                    <linearGradient id="underlineGrad" x1="0" y1="0" x2="1" y2="0">
                                        <stop offset="0%" stopColor="#C084FC" />
                                        <stop offset="100%" stopColor="#E8FF47" />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </span>
                    </h2>
                    <p className="text-white/40 text-sm md:text-base max-w-xl mt-8 font-light">
                        {projects.length} shipped products. Live on app stores, live in production — not Dribbble mockups.
                    </p>
                </div>

                {/* Sliding filter control */}
                <div className="flex justify-center mb-16 mt-10">
                    <div className="relative inline-flex flex-wrap justify-center gap-1 p-1.5 rounded-full border border-white/10" style={{ background: 'rgba(255,255,255,0.03)' }}>
                        <div
                            className="absolute top-1.5 bottom-1.5 rounded-full transition-all duration-400 ease-out"
                            style={{
                                left: indicator.left,
                                width: indicator.width,
                                background: 'linear-gradient(135deg, #C084FC, #E8FF47)',
                            }}
                        />
                        {filters.map((f) => (
                            <button
                                key={f.name}
                                ref={(el) => (filterRefs.current[f.name] = el)}
                                onClick={() => setActiveFilter(f.name)}
                                className="relative z-10 px-4 md:px-5 py-2 rounded-full text-xs md:text-sm font-semibold transition-colors duration-300 whitespace-nowrap"
                                style={{ color: activeFilter === f.name ? '#000' : 'rgba(255,255,255,0.55)' }}
                            >
                                <span className="mr-1.5 opacity-70">{f.icon}</span>
                                {f.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Bento Grid */}
                <div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                    style={{ gridAutoRows: '280px' }}
                >
                    {filtered.map((project, i) => {
                        const fx = cardFx[project.id] || { rotateX: 0, rotateY: 0, glowX: 50, glowY: 50, active: false };
                        const spanClass = project.size === 'large' ? 'lg:col-span-2' : '';
                        return (
                            <div
                                key={project.id}
                                className={`portfolio-reveal relative ${spanClass}`}
                                data-id={project.id}
                                style={{
                                    opacity: visible[project.id] ? 1 : 0,
                                    transform: visible[project.id] ? 'translateY(0)' : 'translateY(28px)',
                                    transition: `opacity 0.6s ease ${(i % 3) * 0.08}s, transform 0.6s ease ${(i % 3) * 0.08}s`,
                                    perspective: '1000px',
                                    minHeight: '280px',
                                    height: '280px',
                                }}
                            >
                                <div
                                    onMouseMove={(e) => handleMouseMove(e, project.id)}
                                    onMouseLeave={() => handleMouseLeave(project.id)}
                                    className="relative w-full h-full rounded-3xl overflow-hidden cursor-pointer"
                                    style={{
                                        transform: `rotateX(${fx.rotateX}deg) rotateY(${fx.rotateY}deg) scale(${fx.active ? 1.02 : 1})`,
                                        transition: fx.active ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
                                        transformStyle: 'preserve-3d',
                                    }}
                                >
                                    {/* animated gradient border */}
                                    <div
                                        className="absolute rounded-3xl transition-opacity duration-500"
                                        style={{
                                            top: '-1px', left: '-1px', right: '-1px', bottom: '-1px',
                                            background: `conic-gradient(from 0deg, ${project.color}, transparent 30%, transparent 70%, ${project.color})`,
                                            opacity: fx.active ? 1 : 0,
                                            animation: fx.active ? 'spinBorder 3s linear infinite' : 'none',
                                        }}
                                    />

                                    {/* card body */}
                                    <div
                                        className="absolute rounded-3xl overflow-hidden"
                                        style={{
                                            top: '1.5px', left: '1.5px', right: '1.5px', bottom: '1.5px',
                                            background: 'linear-gradient(150deg, rgba(20,20,25,0.98) 0%, rgba(8,8,10,0.98) 100%)',
                                        }}
                                    >
                                        {/* background image */}
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700"
                                            style={{
                                                transform: fx.active ? 'scale(1.1)' : 'scale(1)',
                                                opacity: 0.55,
                                            }}
                                        />
                                        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(8,8,10,0.2) 0%, rgba(8,8,10,0.75) 55%, rgba(8,8,10,0.97) 100%)' }} />

                                        {/* cursor spotlight */}
                                        <div
                                            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                                            style={{
                                                opacity: fx.active ? 0.5 : 0,
                                                background: `radial-gradient(circle at ${fx.glowX}% ${fx.glowY}%, ${project.color}35, transparent 45%)`,
                                            }}
                                        />

                                        {/* top row: category + live badge */}
                                        <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                                            <span
                                                className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wide backdrop-blur-md"
                                                style={{ background: 'rgba(0,0,0,0.4)', color: project.color, border: `1px solid ${project.color}50` }}
                                            >
                                                {project.category}
                                            </span>
                                            <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold text-white/70 backdrop-blur-md" style={{ background: 'rgba(0,0,0,0.4)' }}>
                                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                                LIVE
                                            </span>
                                        </div>

                                        {/* content anchored to bottom */}
                                        <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
                                            <h3 className="font-['Space_Grotesk'] font-black text-white text-xl md:text-2xl leading-tight mb-1">
                                                {project.title}
                                            </h3>
                                            <p className="text-white/45 text-xs mb-3">{project.tagline}</p>

                                            {/* metrics */}
                                            <div className="flex flex-wrap gap-1.5 mb-3">
                                                {project.metrics.map((m) => (
                                                    <div
                                                        key={m.label}
                                                        className="px-2.5 py-1 rounded-lg text-[10px] font-semibold backdrop-blur-sm"
                                                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
                                                    >
                                                        <span className="text-white/40">{m.label} </span>
                                                        <span style={{ color: project.color }}>{m.value}</span>
                                                    </div>
                                                ))}
                                            </div>

                                            {/* hover-reveal drawer: desc + stack + CTA */}
                                            <div
                                                className="overflow-hidden transition-all duration-400 ease-out"
                                                style={{ maxHeight: fx.active ? '160px' : '0px', opacity: fx.active ? 1 : 0 }}
                                            >
                                                <p className="text-white/50 text-xs leading-relaxed mb-3 font-light pt-1">{project.desc}</p>
                                                <div className="flex flex-wrap gap-1 mb-3">
                                                    {project.stack.map((s) => (
                                                        <span key={s} className="text-[9px] px-2 py-0.5 rounded-md text-white/40 border border-white/10">{s}</span>
                                                    ))}
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    <a
                                                        href={project.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        onClick={(e) => e.stopPropagation()}
                                                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] font-bold text-black transition-transform hover:scale-105"
                                                        style={{ background: project.color }}
                                                    >
                                                        {project.linkLabel}
                                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
                                                        </svg>
                                                    </a>
                                                    {project.extraLinks?.map((el) => (
                                                        <a
                                                            key={el.label}
                                                            href={el.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="inline-flex items-center px-3 py-1.5 rounded-full text-[11px] font-semibold text-white/70 border border-white/15 hover:border-white/30 transition-colors"
                                                        >
                                                            {el.label}
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                @keyframes spinBorder {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `}</style>
        </section>
    );
};

export default PortfolioShowcase;