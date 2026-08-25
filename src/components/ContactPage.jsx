'use client';
import React, { useState } from 'react';

const ContactPage = () => {
    const [openFaq, setOpenFaq] = useState(0);
    const WHATSAPP_NUMBER = '86079595578';
    const WHATSAPP_MESSAGE = encodeURIComponent(
        "Hi! I'd like to start a project with you. Here's a bit about what I need: "
    );
    const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

    const steps = [
        {
            num: '01',
            title: 'You Message Us',
            desc: 'Tap the button, tell us what you\'re building — even a rough idea is enough to start.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            ),
        },
        {
            num: '02',
            title: 'We Reply Within 24 Hours',
            desc: 'A real person — not a bot — gets back to you with questions and a short discovery call time.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            ),
        },
        {
            num: '03',
            title: 'You Get a Fixed Quote & Timeline',
            desc: 'No vague "it depends." You walk away from the call with a clear price and a delivery date.',
            icon: (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            ),
        },
    ];

    const faqs = [
        {
            q: 'Do you sign NDAs before discussing the project?',
            a: "Absolutely. If your idea is sensitive, we're happy to sign an NDA before any details are shared — just ask on WhatsApp and we'll send one over.",
        },
        {
            q: "I don't have a full spec yet — can I still reach out?",
            a: "Yes, most clients start exactly like this. Send us whatever you have — even a rough note or a competitor link — and we'll help shape it into a clear scope on the call.",
        },
        {
            q: 'Do you take partial or milestone-based payments?',
            a: "Yes. We typically split payment across project milestones instead of asking for the full amount upfront — you only pay as work gets delivered.",
        },
        {
            q: 'How fast can you actually start?',
            a: "Once the quote is locked, most projects kick off within 3-5 business days. If it's urgent, mention that on WhatsApp and we'll try to fast-track it.",
        },
    ];

    return (
        <div className="relative w-full min-h-screen bg-black overflow-hidden" style={{ fontFamily: "'Inter', 'Space Grotesk', sans-serif" }}>
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

            <div className="relative z-10 max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">

                <div className="flex flex-col items-center text-center mb-14">

                    <h1 className="font-['Space_Grotesk'] text-3xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]">
                        LET'S BUILD
                        <br />
                        <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #C084FC, #E8FF47)' }}>
                            SOMETHING THAT SHIPS.
                        </span>
                    </h1>
                    <p className="text-white/40 text-sm md:text-base max-w-md mt-6 font-light">
                        No forms, no waiting for a callback. Message us directly on WhatsApp and get a real reply — usually within a few hours.
                    </p>
                </div>

                <div className="flex justify-center mb-24">
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm md:text-base tracking-wide text-black transition-transform duration-300 hover:scale-105 shadow-2xl"
                        style={{ background: 'linear-gradient(135deg, #C084FC, #E8FF47)' }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                            <path d="M12.004 2c-5.514 0-9.986 4.472-9.986 9.986 0 1.76.462 3.483 1.34 5.001L2 22l5.148-1.35a9.955 9.955 0 004.856 1.237h.004c5.514 0 9.986-4.472 9.986-9.986C21.994 6.472 17.518 2 12.004 2zm0 18.152h-.003a8.16 8.16 0 01-4.158-1.14l-.298-.177-3.056.801.816-2.98-.194-.306a8.148 8.148 0 01-1.256-4.364c0-4.508 3.67-8.178 8.183-8.178 2.187 0 4.24.852 5.786 2.399a8.128 8.128 0 012.396 5.788c0 4.508-3.67 8.157-8.216 8.157z" />
                        </svg>
                        Message Us on WhatsApp
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transition-transform duration-300 group-hover:translate-x-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </a>
                </div>

                {/* ===== WHAT HAPPENS NEXT ===== */}
                <div className="mb-24">
                    <div className="flex flex-col items-center text-center mb-12">
                        <h2 className="font-['Space_Grotesk'] text-2xl md:text-4xl font-black text-white tracking-tight">
                            WHAT HAPPENS <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #C084FC, #E8FF47)' }}>NEXT</span>
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-5">
                        {steps.map((step, i) => (
                            <div
                                key={step.num}
                                className="relative rounded-2xl p-6 border border-white/10"
                                style={{ background: 'linear-gradient(150deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)' }}
                            >
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="font-['Space_Grotesk'] font-black text-2xl" style={{ color: i === 2 ? '#E8FF47' : '#C084FC' }}>
                                        {step.num}
                                    </span>
                                    <div
                                        className="w-9 h-9 rounded-lg flex items-center justify-center"
                                        style={{
                                            background: i === 2 ? 'rgba(232,255,71,0.1)' : 'rgba(192,132,252,0.1)',
                                            color: i === 2 ? '#E8FF47' : '#C084FC',
                                        }}
                                    >
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            {step.icon}
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="font-['Space_Grotesk'] font-bold text-white text-sm md:text-base mb-1.5">{step.title}</h3>
                                <p className="text-white/40 text-xs md:text-sm leading-relaxed font-light">{step.desc}</p>

                                {/* connecting line to next step (desktop only) */}
                                {i < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-3 w-3 h-px" style={{ background: 'rgba(255,255,255,0.15)' }} />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* ===== FAQ ===== */}
                <div className="mb-20">
                    <div className="flex flex-col items-center text-center mb-10">
                        <h2 className="font-['Space_Grotesk'] text-2xl md:text-4xl font-black text-white tracking-tight">
                            QUICK <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(135deg, #C084FC, #E8FF47)' }}>QUESTIONS</span>
                        </h2>
                    </div>

                    <div className="space-y-3">
                        {faqs.map((faq, i) => {
                            const isOpen = openFaq === i;
                            return (
                                <div
                                    key={i}
                                    className="rounded-2xl border overflow-hidden transition-colors duration-300"
                                    style={{
                                        borderColor: isOpen ? 'rgba(192,132,252,0.35)' : 'rgba(255,255,255,0.08)',
                                        background: isOpen ? 'linear-gradient(135deg, rgba(192,132,252,0.06), rgba(232,255,71,0.02))' : 'rgba(255,255,255,0.02)',
                                    }}
                                >
                                    <button
                                        onClick={() => setOpenFaq(isOpen ? -1 : i)}
                                        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
                                    >
                                        <span className="font-['Space_Grotesk'] font-bold text-white text-sm md:text-base">{faq.q}</span>
                                        <span
                                            className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300"
                                            style={{
                                                background: 'rgba(255,255,255,0.06)',
                                                transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                                            }}
                                        >
                                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={isOpen ? '#E8FF47' : 'rgba(255,255,255,0.5)'} strokeWidth="2.5">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m-8-8h16" />
                                            </svg>
                                        </span>
                                    </button>
                                    <div
                                        className="overflow-hidden transition-all duration-400 ease-out"
                                        style={{ maxHeight: isOpen ? '160px' : '0px', opacity: isOpen ? 1 : 0 }}
                                    >
                                        <p className="px-5 pb-4 text-white/45 text-xs md:text-sm leading-relaxed font-light">{faq.a}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div
                    className="flex flex-col items-center text-center rounded-3xl p-10"
                >
                    <h3 className="font-['Space_Grotesk'] font-black text-white text-xl md:text-2xl mb-2">Still thinking it over?</h3>
                    <p className="text-white/40 text-sm mb-6 font-light max-w-sm">
                        You don't need a full plan to reach out. Just tell us what's on your mind.
                    </p>
                    <a
                        href={whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-sm md:text-base tracking-wide text-black transition-transform duration-300 hover:scale-105"
                        style={{ background: 'linear-gradient(135deg, #C084FC, #E8FF47)' }}
                    >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                            <path d="M12.004 2c-5.514 0-9.986 4.472-9.986 9.986 0 1.76.462 3.483 1.34 5.001L2 22l5.148-1.35a9.955 9.955 0 004.856 1.237h.004c5.514 0 9.986-4.472 9.986-9.986C21.994 6.472 17.518 2 12.004 2zm0 18.152h-.003a8.16 8.16 0 01-4.158-1.14l-.298-.177-3.056.801.816-2.98-.194-.306a8.148 8.148 0 01-1.256-4.364c0-4.508 3.67-8.178 8.183-8.178 2.187 0 4.24.852 5.786 2.399a8.128 8.128 0 012.396 5.788c0 4.508-3.67 8.157-8.216 8.157z" />
                        </svg>
                        Chat With Us on WhatsApp
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;