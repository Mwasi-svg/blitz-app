import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './icon';
import { MobileAppAnimation } from './hero_animations';

export const Hero = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const slides = [
        {

            id: 1,
            tag: "Milima Messenger",
            title: "Messaging at ease on your device.",
            description: "Stay connected with seamless messaging in your workspace environment.",
            visual: "security",
            color: "bg-indigo-500"

        },

        {
            id: 2,
            tag: "On-hands protection",
            title: "Mobile App \nProtection.",
            description: "Protect your data and messages on the mobile app with passcodes, biometrics, and more.",
            visual: "mobile",
            color: "bg-cyan-500"
        },
        {
            id: 3,
            tag: "Privacy First",
            title: "Fast, Simple, \nPrivate.",
            description: "Own your conversations with secure end-to-end encryption.",
            visual: "speed",
            color: "bg-blue-500"
        }
    ];

    // fix: keep animations smooth even if the user switches tabs
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                setActiveSlide(prev => prev);
            }
        };
        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
    }, []);


    useEffect(() => {
        const timer = setInterval(() => {
            setActiveSlide((prev) => (prev + 1) % slides.length);
        }, 10000);
        return () => clearInterval(timer);
    }, [activeSlide]);

    return (
        <section id="home" className="relative min-h-[600px] sm:min-h-[700px] lg:min-h-[850px] lg:h-screen pt-20 sm:pt-24 pb-8 sm:pb-12 flex flex-col justify-center overflow-hidden bg-blitz-bg">
            {/* main background aesthetics */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* base gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F14] via-[#0E1623] to-[#0B0F14] opacity-100"></div>

                {/* hero texture/image overlay */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.43] mix-blend-screen scale-105"
                    style={{ backgroundImage: 'url("/images/hero.png")' }}
                ></div>

                {/* soft edge fading */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0F14] via-transparent to-[#0B0F14] opacity-60"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#0B0F14] via-transparent to-[#0B0F14] opacity-60"></div>

                {/* extra lighting details */}
                <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_20%,rgba(59,130,246,0.05)_40%,transparent_60%)]"></div>

                {/* glowy blobs for depth */}
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 blur-[130px] rounded-full animate-pulse-slow"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/5 blur-[120px] rounded-full"></div>
            </div>

            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.2] pointer-events-none mix-blend-overlay"></div>

            <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 grid lg:grid-cols-12 gap-8 lg:gap-8 items-center relative z-10">

                {/* main copy and ctas */}
                <div className="lg:col-span-6 flex flex-col justify-center order-1 lg:order-1 relative z-20">

                    {/* the sliding text area */}
                    <div className="relative min-h-[280px] sm:min-h-[320px] lg:min-h-[400px] w-full flex flex-col justify-center">
                        <AnimatePresence mode="wait" initial={false}>
                            <motion.div
                                key={activeSlide}
                                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                                transition={{
                                    duration: 0.6,
                                    ease: [0.22, 1, 0.36, 1]
                                }}
                                className="w-full"
                            >
                                <div className="flex items-center gap-3 mb-4 sm:mb-6 lg:mb-8">
                                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-blue-500/10 border border-blue-500/20 text-blue-400">
                                        {slides[activeSlide].tag}
                                    </span>
                                </div>

                                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tighter text-white leading-[1.1] sm:leading-[1.05] mb-4 sm:mb-6">
                                    {slides[activeSlide].title.split('\n').map((line, i) => (
                                        <span key={i} className="block">
                                            {line.split(/(Blitz)/).map((part, index) => (
                                                part === 'Blitz'
                                                    ? <i key={index} className="italic text-blue-400">{part}</i>
                                                    : part
                                            ))}
                                        </span>
                                    ))}
                                </h1>

                                <p className="text-base sm:text-lg text-slate-400 leading-relaxed max-w-lg">
                                    {slides[activeSlide].description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* main buttons (platforms/features) */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-12 lg:mb-16 mt-4">
                        <a href="#platforms" className="bg-blue-600 hover:bg-blue-500 text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] text-center">
                            Get Started Free
                        </a>
                        <a href="#features" className="group px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm font-semibold text-slate-300 border border-white/10 hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                            Features
                            <Icon icon="solar:arrow-right-linear" className="transition-transform duration-300 group-hover:translate-x-1 text-lg" />
                        </a>
                    </div>

                    {/* carousel dots/lines */}
                    <div className="flex gap-3 sm:gap-4">
                        {slides.map((_, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveSlide(index)}
                                className="h-2 sm:h-1.5 lg:h-1 flex-1 bg-white/10 rounded-full overflow-hidden cursor-pointer group relative"
                            >
                                <div className={`absolute inset-0 bg-white/20 group-hover:bg-white/30 transition-colors`}></div>
                                {index === activeSlide && (
                                    <motion.div
                                        layoutId="activeProgress"
                                        initial={{ width: "0%" }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 10, ease: "linear" }}
                                        className="h-full bg-blue-500 rounded-full"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* right side visuals (only for desktop) */}
                <div className="hidden lg:block lg:col-span-6 h-[600px] relative order-2 perspective-1000">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSlide}
                            initial={{ opacity: 0, x: 50, rotateY: 5 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            exit={{ opacity: 0, x: -50, rotateY: -5 }}
                            transition={{ duration: 0.6, ease: "circOut" }}
                            className="w-full h-full flex items-center justify-center"
                        >
                            {slides[activeSlide].visual === 'mobile' ? (
                                <MobileAppAnimation key={activeSlide} />
                            ) : (
                                <div className="relative w-full h-full flex items-center justify-center p-4">
                                    <motion.img
                                        key={slides[activeSlide].visual}
                                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                        animate={{
                                            opacity: 1,
                                            scale: 1.1,
                                            y: 0
                                        }}
                                        src={slides[activeSlide].visual === 'security' ? "/images/chat_2.png" : slides[activeSlide].visual === 'speed' ? "/images/contacts.png" : "/images/chat.png"}
                                        alt={slides[activeSlide].title}
                                        className={`w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.3)] max-h-[650px] rounded-3xl border border-white/10 ${slides[activeSlide].visual === 'security' || slides[activeSlide].visual === 'speed' ? 'max-w-[260px] mx-auto' : ''}`}
                                        transition={{ duration: 0.8, ease: "easeOut" }}
                                    />
                                </div>
                            )}

                            {/* Decorative Blur behind visual */}
                            <div className={`absolute inset-0 bg-blue-500 blur-[100px] opacity-20 -z-10`}></div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};
