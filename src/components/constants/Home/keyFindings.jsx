'use client';

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// Smooth ease curve used consistently
const smoothEase = [0.25, 0.46, 0.45, 0.94];

const BarChart = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const bars = [
        { label: "Mobile Apps", value: 50, delay: 0 },
        { label: "Web Apps", value: 30, delay: 0.15 },
        { label: "E-Commerce", value: 12, delay: 0.3 },
        { label: "AI & Custom", value: 8, delay: 0.45 },
    ];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.7, ease: smoothEase }}
            className="rounded-[28px] border border-white/10 bg-[#111111] p-8 md:p-10"
        >
            <div className="flex items-end justify-between gap-4 h-[320px] md:h-[380px]">
                {bars.map((bar) => (
                    <div key={bar.label} className="flex-1 flex flex-col items-center justify-end h-full">
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.4, delay: bar.delay + 0.6 }}
                            className="text-white text-lg md:text-xl font-light mb-3"
                            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                        >
                            {bar.value}%
                        </motion.span>

                        <div className="w-full relative flex items-end justify-center" style={{ height: "85%" }}>
                            <div className="absolute inset-0 rounded-2xl bg-white/5" />

                            <motion.div
                                initial={{ height: "0%" }}
                                animate={isInView ? { height: `${bar.value}%` } : { height: "0%" }}
                                transition={{
                                    duration: 1,
                                    delay: bar.delay + 0.2,
                                    ease: smoothEase,
                                }}
                                className="w-full rounded-2xl bg-gradient-to-t from-white/30 via-white/50 to-white/70 relative overflow-hidden"
                            />
                        </div>

                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.4, delay: bar.delay + 0.8 }}
                            className="text-white/50 text-xs md:text-sm mt-4 font-normal text-center"
                            style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
                        >
                            {bar.label}
                        </motion.span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

const KeyFindings = () => {
    const sectionRef = useRef(null);

    return (
        <section
            ref={sectionRef}
            className="relative w-full bg-black overflow-hidden py-16 md:py-24"
        >
            <div className="absolute inset-0 pointer-events-none z-0 opacity-[0.04]">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }}
                />
            </div>

            <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    <BarChart />

                    <div className="flex flex-col justify-center">
                        <motion.h3
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.7, ease: smoothEase }}
                            className="text-white text-4xl md:text-5xl lg:text-[56px] font-normal leading-[1.1] tracking-tight mb-6"
                            style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}
                        >
                            We build for<br />
                            the real world.
                        </motion.h3>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: 0.2, ease: smoothEase }}
                            className="text-white/60 text-base md:text-lg leading-relaxed mb-8 max-w-md"
                            style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
                        >
                            We don't just build marketing pages — we build and ship full-scale mobile apps, custom CRM solutions, high-volume e-commerce platforms, and secure government websites. Over 80% of our code powers live production systems.
                        </motion.p>

                        <motion.button
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: 0.35 }}
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="self-start px-6 py-3 rounded-full border border-white/20 text-white text-sm font-medium hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                            style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" }}
                            onClick={() => {
                                document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
                            }}
                        >
                            Explore our work
                        </motion.button>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        </section>
    );
};

export default KeyFindings;