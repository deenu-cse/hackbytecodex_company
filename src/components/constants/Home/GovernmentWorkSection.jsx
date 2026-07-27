'use client';
import React, { useState, useEffect, useRef } from 'react';

const GovernmentWorkSection = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [visible, setVisible] = useState({});
    const [certRevealed, setCertRevealed] = useState(false);
    const [certModal, setCertModal] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => {
            const els = document.querySelectorAll('.gov-reveal');
            els.forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight * 0.85) {
                    setVisible((prev) => (prev[el.dataset.id] ? prev : { ...prev, [el.dataset.id]: true }));
                }
            });
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // auto-advance the interactive stepper
    useEffect(() => {
        const id = setInterval(() => {
            setActiveStep((s) => (s + 1) % 4);
        }, 4200);
        return () => clearInterval(id);
    }, []);

    useEffect(() => {
        if (activeStep === 3) {
            const t = setTimeout(() => setCertRevealed(true), 400);
            return () => clearTimeout(t);
        }
        setCertRevealed(false);
    }, [activeStep]);

    const steps = [
        {
            id: 'audit',
            num: '01',
            title: 'Full Security Audit',
            desc: 'Every deployment goes through an independent third-party security audit first — nothing goes live until it\'s fully cleared.',
            tag: 'Security',
        },
        {
            id: 'migrate',
            num: '02',
            title: 'Moved to Government Infrastructure',
            desc: 'Migrated the entire backend onto ITDA\'s own servers — full control, full compliance, zero reliance on third-party cloud.',
            tag: 'Infrastructure',
        },
        {
            id: 'deploy',
            num: '03',
            title: 'Hardened & Deployed',
            desc: 'Secured with HTTPS and production-grade server configuration on a dedicated Windows Server VM.',
            tag: 'Deployment',
        },
        {
            id: 'certify',
            num: '04',
            title: 'Certified & Live to the Public',
            desc: 'Officially certified "Safe to Host" by CERT-In — now live and accessible to the public at its official government URL.',
            tag: 'Certification',
        },
    ];

    return (
        <section ref={sectionRef} className="relative w-full bg-black overflow-hidden py-24 px-4 md:px-8 lg:px-16">
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
            <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-[0.12] blur-3xl pointer-events-none" style={{ background: '#C084FC' }} />
            <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full opacity-[0.12] blur-3xl pointer-events-none" style={{ background: '#E8FF47' }} />

            <div className="relative z-10 max-w-6xl mx-auto">
                <div className="flex flex-col items-center text-center mb-16">

                    <h2 className="font-['Space_Grotesk'] text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
                        BUILT FOR SCALE.
                        <br />
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #C084FC, #E8FF47)' }}>
                            CERTIFIED SECURE.
                        </span>
                    </h2>
                    <p className="text-white/40 text-sm md:text-base max-w-xl mt-6 font-light">
                        We deployed and secured <span className="text-white/70 font-medium">SARRA</span> — a live web application for Uttarakhand's
                        watershed management department — on government-owned infrastructure.
                    </p>

                    {/* live domain chip */}
                    <div className="flex items-center gap-2 mt-6 px-4 py-2 rounded-full border" style={{ borderColor: 'rgba(232,255,71,0.3)', background: 'rgba(232,255,71,0.06)' }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs font-mono text-white/70">sarra.uk.gov.in</span>
                        <span className="text-[10px] font-bold" style={{ color: '#E8FF47' }}>LIVE</span>
                    </div>
                </div>

                {/* Interactive split panel */}
                <div className="grid md:grid-cols-2 gap-10 items-stretch">
                    {/* Left: clickable stepper */}
                    <div
                        className="gov-reveal space-y-3"
                        data-id="gov-steps"
                        style={{
                            opacity: visible['gov-steps'] ? 1 : 0,
                            transform: visible['gov-steps'] ? 'translateX(0)' : 'translateX(-24px)',
                            transition: 'all 0.7s ease',
                        }}
                    >
                        {steps.map((step, i) => {
                            const isActive = activeStep === i;
                            return (
                                <button
                                    key={step.id}
                                    onClick={() => setActiveStep(i)}
                                    className="w-full text-left rounded-2xl p-5 border transition-all duration-400 relative overflow-hidden"
                                    style={{
                                        borderColor: isActive ? 'rgba(192,132,252,0.4)' : 'rgba(255,255,255,0.08)',
                                        background: isActive
                                            ? 'linear-gradient(135deg, rgba(192,132,252,0.1), rgba(232,255,71,0.04))'
                                            : 'rgba(255,255,255,0.02)',
                                        boxShadow: isActive ? '0 10px 30px -10px rgba(192,132,252,0.25)' : 'none',
                                    }}
                                >
                                    <div className="flex items-start gap-4">
                                        <span
                                            className="font-['Space_Grotesk'] font-black text-lg shrink-0 transition-colors duration-300"
                                            style={{ color: isActive ? '#E8FF47' : 'rgba(255,255,255,0.2)' }}
                                        >
                                            {step.num}
                                        </span>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                                                <h3 className="font-['Space_Grotesk'] font-bold text-white text-sm md:text-base">{step.title}</h3>
                                                <span
                                                    className="text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide"
                                                    style={{ color: '#C084FC', background: 'rgba(192,132,252,0.12)' }}
                                                >
                                                    {step.tag}
                                                </span>
                                            </div>
                                            <p
                                                className="text-white/40 text-xs md:text-sm leading-relaxed font-light overflow-hidden transition-all duration-400"
                                                style={{ maxHeight: isActive ? '100px' : '0px', opacity: isActive ? 1 : 0 }}
                                            >
                                                {step.desc}
                                            </p>
                                        </div>
                                    </div>

                                    {/* progress bar for auto-advance, only on active card */}
                                    {isActive && (
                                        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5">
                                            <div
                                                className="h-full"
                                                style={{
                                                    background: 'linear-gradient(90deg, #C084FC, #E8FF47)',
                                                    animation: 'stepProgress 4.2s linear',
                                                }}
                                            />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    {/* Right: dynamic visual that swaps per step */}
                    <div
                        className="gov-reveal relative rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center p-8"
                        data-id="gov-visual"
                        style={{
                            background: 'linear-gradient(150deg, rgba(20,20,25,0.9) 0%, rgba(8,8,10,0.95) 100%)',
                            minHeight: '380px',
                            opacity: visible['gov-visual'] ? 1 : 0,
                            transform: visible['gov-visual'] ? 'translateX(0)' : 'translateX(24px)',
                            transition: 'all 0.7s ease',
                        }}
                    >
                        {/* STEP 0: General security-scan animation */}
                        {activeStep === 0 && (
                            <div className="w-full max-w-sm flex flex-col items-center animate-fadeIn">
                                <div
                                    className="relative w-32 h-32 rounded-full flex items-center justify-center mb-6 overflow-hidden"
                                    style={{ background: 'rgba(192,132,252,0.06)', border: '1px solid rgba(192,132,252,0.2)' }}
                                >
                                    {/* scanning sweep */}
                                    <div
                                        className="absolute left-0 right-0 h-10"
                                        style={{
                                            background: 'linear-gradient(180deg, transparent, rgba(192,132,252,0.35), transparent)',
                                            animation: 'scanSweep 2.2s ease-in-out infinite',
                                        }}
                                    />
                                    <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="1.5" className="relative z-10">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>

                                <div className="w-full space-y-2.5">
                                    {['Vulnerability Scan', 'Access Control Review', 'Data Protection Check'].map((label, idx) => (
                                        <div
                                            key={label}
                                            className="flex items-center justify-between px-4 py-2 rounded-lg"
                                            style={{
                                                background: 'rgba(232,255,71,0.06)',
                                                border: '1px solid rgba(232,255,71,0.2)',
                                                opacity: 0,
                                                animation: `checklistIn 0.5s ease forwards ${0.4 + idx * 0.35}s`,
                                            }}
                                        >
                                            <span className="text-white/60 text-xs">{label}</span>
                                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#E8FF47" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                                            </svg>
                                        </div>
                                    ))}
                                </div>
                                <p className="text-white/30 text-[11px] text-center mt-5 font-light">Independently audited before every launch</p>
                            </div>
                        )}

                        {/* STEP 1: General infrastructure migration visual */}
                        {activeStep === 1 && (
                            <div className="w-full max-w-sm animate-fadeIn">
                                <div className="flex items-center justify-between gap-3">
                                    {/* Source: Third-Party Cloud */}
                                    <div className="flex flex-col items-center gap-2 shrink-0">
                                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(192,132,252,0.08)', border: '1px solid rgba(192,132,252,0.2)' }}>
                                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#C084FC" strokeWidth="1.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                                            </svg>
                                        </div>
                                        <span className="text-white/40 text-[10px] text-center leading-tight">Third-Party<br/>Cloud</span>
                                    </div>

                                    {/* Migration arrows — animated data packets */}
                                    <div className="flex-1 flex flex-col gap-2.5 mx-1">
                                        {[
                                            { label: 'Database', delay: '0s' },
                                            { label: 'API Server', delay: '0.6s' },
                                            { label: 'File Storage', delay: '1.2s' },
                                        ].map((item) => (
                                            <div key={item.label} className="relative">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white/30 text-[8px] w-14 text-right shrink-0">{item.label}</span>
                                                    <div className="flex-1 relative h-[3px] rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
                                                        <div
                                                            className="absolute top-0 left-0 h-full w-5 rounded-full"
                                                            style={{
                                                                background: 'linear-gradient(90deg, transparent, #E8FF47, transparent)',
                                                                animation: `migratePacket 1.8s ease-in-out infinite`,
                                                                animationDelay: item.delay,
                                                            }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Destination: Government Server */}
                                    <div className="flex flex-col items-center gap-2 shrink-0">
                                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ background: 'rgba(232,255,71,0.08)', border: '1px solid rgba(232,255,71,0.2)' }}>
                                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#E8FF47" strokeWidth="1.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                        <span className="text-white/40 text-[10px] text-center leading-tight">Government<br/>Server</span>
                                    </div>
                                </div>

                                {/* Status badges */}
                                <div className="flex items-center justify-center gap-3 mt-6">
                                    {['Zero Data Loss', 'Zero Downtime', 'Full Compliance'].map((tag) => (
                                        <span key={tag} className="text-[9px] px-2.5 py-1 rounded-full text-white/50 font-medium" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* STEP 2: HTTPS / browser mockup */}
                        {activeStep === 2 && (
                            <div className="w-full max-w-sm animate-fadeIn">
                                <div className="rounded-xl border border-white/10 overflow-hidden" style={{ background: 'rgba(255,255,255,0.02)' }}>
                                    <div className="flex items-center gap-2 px-3 py-2 border-b border-white/5">
                                        <div className="w-2 h-2 rounded-full bg-red-400/60" />
                                        <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                                        <div className="w-2 h-2 rounded-full bg-green-400/60" />
                                        <div className="ml-2 flex-1 flex items-center gap-1.5 rounded-md px-2.5 py-1" style={{ background: 'rgba(255,255,255,0.04)' }}>
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#E8FF47" strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                            </svg>
                                            <span className="text-[10px] text-white/50 font-mono">https://sarra.uk.gov.in</span>
                                        </div>
                                    </div>
                                    <div className="p-4 space-y-2">
                                        <div className="h-2 rounded-full w-3/4" style={{ background: 'rgba(255,255,255,0.08)' }} />
                                        <div className="h-2 rounded-full w-1/2" style={{ background: 'rgba(255,255,255,0.08)' }} />
                                        <div className="h-16 rounded-lg mt-3" style={{ background: 'rgba(192,132,252,0.08)', border: '1px solid rgba(192,132,252,0.15)' }} />
                                    </div>
                                </div>
                                <p className="text-white/30 text-[11px] text-center mt-4 font-light">HTTPS · Hardened CSP · IIS Reverse Proxy</p>
                            </div>
                        )}

                        {/* STEP 3: certificate reveal with clickable modal trigger */}
                        {activeStep === 3 && (
                            <div className="w-full max-w-xs flex flex-col items-center animate-fadeIn">
                                <div
                                    className="relative w-40 h-40 rounded-full flex items-center justify-center transition-all duration-700"
                                    style={{
                                        background: 'radial-gradient(circle, rgba(232,255,71,0.15), transparent 70%)',
                                        transform: certRevealed ? 'scale(1)' : 'scale(0.7)',
                                        opacity: certRevealed ? 1 : 0,
                                    }}
                                >
                                    <div
                                        className="w-28 h-28 rounded-full flex items-center justify-center border-2"
                                        style={{ borderColor: '#E8FF47', boxShadow: '0 0 40px rgba(232,255,71,0.3)' }}
                                    >
                                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#E8FF47" strokeWidth="1.5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                        </svg>
                                    </div>
                                </div>
                                <p className="font-['Space_Grotesk'] font-black text-white text-lg mt-4 text-center">"Safe to Host"</p>
                                <p className="text-white/40 text-xs text-center mt-1">CERT-In Empanelled VAPT Certificate</p>
                                <button
                                    onClick={() => setCertModal(true)}
                                    className="mt-4 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 hover:scale-105"
                                    style={{
                                        background: 'linear-gradient(135deg, rgba(232,255,71,0.15), rgba(192,132,252,0.15))',
                                        border: '1px solid rgba(232,255,71,0.3)',
                                        color: '#E8FF47',
                                    }}
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                    </svg>
                                    View Certificate
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ===== CERTIFICATE MODAL ===== */}
            {certModal && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                    onClick={() => setCertModal(false)}
                >
                    {/* backdrop */}
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" style={{ animation: 'fadeIn 0.3s ease' }} />

                    {/* modal card */}
                    <div
                        className="relative w-full max-w-lg rounded-3xl overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                            background: 'linear-gradient(160deg, #0f0f14 0%, #090910 100%)',
                            border: '1px solid rgba(232,255,71,0.2)',
                            boxShadow: '0 0 80px rgba(232,255,71,0.08), 0 40px 80px rgba(0,0,0,0.6)',
                            animation: 'certModalIn 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                        }}
                    >
                        {/* close button */}
                        <button
                            onClick={() => setCertModal(false)}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center z-20 transition-colors hover:bg-white/10"
                            style={{ background: 'rgba(255,255,255,0.05)' }}
                        >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Certificate image — replace /certificate.jpg with your real certificate photo */}
                        <img
                            src="/certificate.jpg"
                            alt="CERT-In VAPT Certificate — Safe to Host"
                            className="w-full h-auto object-contain"
                            style={{ maxHeight: '80vh' }}
                        />
                    </div>
                </div>
            )}

            <style>{`
                @keyframes stepProgress {
                    from { width: 0%; }
                    to { width: 100%; }
                }
                @keyframes migratePacket {
                    0% { left: -20%; opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { left: 100%; opacity: 0; }
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes scanSweep {
                    0% { top: -40px; }
                    100% { top: 130px; }
                }
                @keyframes checklistIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes certModalIn {
                    from { opacity: 0; transform: scale(0.92) translateY(20px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.5s ease;
                }
            `}</style>
        </section>
    );
};

export default GovernmentWorkSection;