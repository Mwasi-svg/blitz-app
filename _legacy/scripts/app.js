const { useState, useEffect, useRef } = React;
const { motion, AnimatePresence } = window.Motion;

const Icon = ({ icon, className }) => (
    <iconify-icon icon={icon} class={className} style={{ fontSize: '1.5em' }}></iconify-icon>
);

// Header Component
const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <motion.nav
            initial={{ y: -100 }} animate={{ y: 0 }}
            className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass py-3 border-b border-white/5' : 'py-6 bg-transparent'}`}
        >
            <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.5)]">
                        <Icon icon="solar:infinity-linear" className="text-white text-sm" />
                    </div>
                    <span className="font-semibold tracking-tight text-white text-lg">Blitz</span>
                </div>
                <div className="hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium">
                    <a href="#home" className="hover:text-blue-400 transition-colors">Home</a>
                    <a href="#features" className="hover:text-blue-400 transition-colors">Features</a>
                    <a href="#platforms" className="hover:text-blue-400 transition-colors">Platforms</a>
                    <a href="#contact" className="hover:text-blue-400 transition-colors">Contact</a>
                </div>
                <div className="flex items-center gap-4">
                    <a href="#platforms" className="bg-white text-black px-5 py-2 rounded-full text-xs font-semibold hover:bg-blue-50 hover:text-blue-600 transition-colors">
                        Get Started Free
                    </a>
                </div>
            </div>
        </motion.nav>
    );
};

// Premium 2-Way Messaging Animation Component
const InstantMessagingAnimation = () => {
    const [messages, setMessages] = useState([]);
    const [showTyping, setShowTyping] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    const conversation = [
        { id: 1, text: "Hey! Schedule a brief meeting?", sender: "them", delay: 500 },
        { id: 2, text: "Yeah! What time works for you?", sender: "me", delay: 2300, readDelay: 3500 },
        { id: 3, text: "How about 7pm?", sender: "them", delay: 4700 },
        { id: 4, text: "Sounds good!", sender: "me", delay: 6500, readDelay: 7800 },
        { id: 5, text: "Perfect! I'll be there", sender: "them", delay: 8800 }
    ];

    useEffect(() => {
        const timers = [];

        conversation.forEach((msg, idx) => {
            // Show typing indicator
            timers.push(setTimeout(() => {
                setShowTyping(msg.sender);
                setCurrentStep(idx);
            }, msg.delay - 200));

            // Add message
            timers.push(setTimeout(() => {
                setMessages(prev => [...prev, { ...msg, status: 'sent' }]);
                setShowTyping(false);
            }, msg.delay));

            // Update to delivered (for "me" messages)
            if (msg.sender === 'me') {
                timers.push(setTimeout(() => {
                    setMessages(prev => prev.map(m =>
                        m.id === msg.id ? { ...m, status: 'delivered' } : m
                    ));
                }, msg.delay + 150));

                // Update to read
                if (msg.readDelay) {
                    timers.push(setTimeout(() => {
                        setMessages(prev => prev.map(m =>
                            m.id === msg.id ? { ...m, status: 'read' } : m
                        ));
                    }, msg.readDelay));
                }
            }
        });

        // Reset animation
        timers.push(setTimeout(() => {
            setMessages([]);
            setCurrentStep(0);
        }, 9500));

        return () => timers.forEach(clearTimeout);
    }, []);

    // Status indicator component
    const StatusIndicator = ({ status }) => {
        if (!status || status === 'sent') {
            return (
                <motion.svg
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-3.5 h-3.5"
                    viewBox="0 0 16 16"
                    fill="none"
                >
                    <motion.path
                        d="M3 8L6 11L13 4"
                        stroke="#94A3B8"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.15 }}
                    />
                </motion.svg>
            );
        }

        if (status === 'delivered' || status === 'read') {
            const color = status === 'read' ? '#22D3EE' : '#94A3B8';
            return (
                <motion.svg
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-3.5 h-3.5"
                    viewBox="0 0 16 16"
                    fill="none"
                >
                    <motion.path
                        d="M2 8L4.5 10.5L8 6"
                        stroke={color}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.15 }}
                    />
                    <motion.path
                        d="M6 8L8.5 10.5L14 5"
                        stroke={color}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.15, delay: 0.08 }}
                    />
                </motion.svg>
            );
        }
    };

    // Typing indicator
    const TypingIndicator = () => (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="flex gap-1 px-3 py-2.5 bg-white/[0.07] rounded-2xl rounded-bl-md border border-white/10"
        >
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    animate={{
                        y: [0, -4, 0],
                        opacity: [0.4, 1, 0.4]
                    }}
                    transition={{
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.15,
                        ease: "easeInOut"
                    }}
                    className="w-1.5 h-1.5 rounded-full bg-slate-400"
                />
            ))}
        </motion.div>
    );

    return (
        <div className="h-full flex items-center justify-center relative px-6">
            {/* Chat container */}
            <div className="w-full max-w-[340px] space-y-3">
                <AnimatePresence mode="popLayout">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            layout
                            initial={{
                                opacity: 0,
                                y: 15,
                                scale: 0.9
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 30,
                                layout: { duration: 0.3 }
                            }}
                            className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                            <motion.div
                                layout
                                className={`
                                    max-w-[75%] px-4 py-2.5 rounded-2xl relative
                                    ${msg.sender === 'me'
                                        ? 'bg-gradient-to-br from-[#3B82F6] to-[#2563EB] text-white rounded-br-md shadow-[0_0_20px_rgba(59,130,246,0.2)]'
                                        : 'bg-white/[0.07] text-slate-100 rounded-bl-md border border-white/10'
                                    }
                                `}
                            >
                                <span className="text-[13px] leading-relaxed font-medium">
                                    {msg.text}
                                </span>

                                {/* Time and status for sent messages */}
                                {msg.sender === 'me' && (
                                    <div className="flex items-center gap-1 mt-1 justify-end">
                                        <span className="text-[9px] text-white/60">
                                            {new Date().getHours()}:{String(new Date().getMinutes()).padStart(2, '0')}
                                        </span>
                                        <StatusIndicator status={msg.status} />
                                    </div>
                                )}
                            </motion.div>
                        </motion.div>
                    ))}

                    {/* Typing indicator */}
                    {showTyping && (
                        <motion.div
                            key="typing"
                            layout
                            className={`flex ${showTyping === 'me' ? 'justify-end' : 'justify-start'}`}
                        >
                            <TypingIndicator />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Subtle ambient glow */}
            <motion.div
                animate={{
                    opacity: [0.03, 0.08, 0.03],
                    scale: [1, 1.1, 1]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-radial from-blue-500/10 via-transparent to-transparent blur-3xl pointer-events-none -z-10"
            />
        </div>
    );
};

// Encryption Animation Component
const EncryptionAnimation = () => {
    const [phase, setPhase] = useState(0); // 0: plaintext, 1: encrypting, 2: encrypted

    const plaintext = "Hello World!";
    const [displayText, setDisplayText] = useState(plaintext);

    useEffect(() => {
        const scrambleChars = "!@#$%^&*0123456789ABCDEFabcdef";
        let scrambleInterval;
        let currentIndex = 0;

        // Phase 1: Start encryption after delay
        const startEncrypt = setTimeout(() => {
            setPhase(1);
            scrambleInterval = setInterval(() => {
                if (currentIndex <= plaintext.length) {
                    setDisplayText(prev => {
                        const encrypted = plaintext.split('').map((char, i) => {
                            if (i < currentIndex) {
                                return scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                            }
                            return char;
                        }).join('');
                        return encrypted;
                    });
                    currentIndex++;
                } else {
                    clearInterval(scrambleInterval);
                    setPhase(2);
                }
            }, 80);
        }, 800);

        // Phase 2: Reset after showing encrypted
        const resetTimer = setTimeout(() => {
            setPhase(0);
            setDisplayText(plaintext);
            currentIndex = 0;
        }, 9500);

        return () => {
            clearTimeout(startEncrypt);
            clearTimeout(resetTimer);
            clearInterval(scrambleInterval);
        };
    }, []);

    return (
        <div className="h-full flex flex-col items-center justify-center text-center relative">
            {/* Shield with Lock */}
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative mb-8"
            >
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center">
                    <motion.div
                        animate={{ rotateY: phase === 1 ? [0, 180, 360] : 0 }}
                        transition={{ duration: 0.6, ease: "easeInOut" }}
                    >
                        <Icon icon={phase === 2 ? "solar:lock-keyhole-bold" : "solar:lock-keyhole-unlocked-linear"} className="text-3xl text-blue-400" />
                    </motion.div>
                </div>

                {/* Orbiting particles during encryption */}
                {phase === 1 && (
                    <>
                        {[0, 1, 2].map(i => (
                            <motion.div
                                key={i}
                                className="absolute w-2 h-2 rounded-full bg-cyan-400"
                                style={{ top: '50%', left: '50%' }}
                                animate={{
                                    x: [0, Math.cos(i * 2.09) * 40, 0],
                                    y: [0, Math.sin(i * 2.09) * 40, 0],
                                    opacity: [0, 1, 0]
                                }}
                                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
                            />
                        ))}
                    </>
                )}
            </motion.div>

            {/* Text transformation display */}
            <div className="w-full max-w-[220px] space-y-3">
                <motion.div
                    className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 font-mono text-sm"
                    animate={{ borderColor: phase === 1 ? 'rgba(34,211,238,0.5)' : 'rgba(255,255,255,0.1)' }}
                >
                    <span className={phase === 2 ? 'text-cyan-400' : 'text-slate-300'}>
                        {displayText}
                    </span>
                </motion.div>

                {/* Status badge */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono inline-flex items-center gap-2 ${phase === 2
                        ? 'bg-green-500/10 border border-green-500/20 text-green-400'
                        : phase === 1
                            ? 'bg-yellow-500/10 border border-yellow-500/20 text-yellow-400'
                            : 'bg-white/5 border border-white/10 text-slate-400'
                        }`}
                >
                    <div className={`w-1.5 h-1.5 rounded-full ${phase === 2 ? 'bg-green-400' : phase === 1 ? 'bg-yellow-400 animate-pulse' : 'bg-slate-400'}`}></div>
                    {phase === 2 ? 'AES-256 ENCRYPTED' : phase === 1 ? 'ENCRYPTING...' : 'READY'}
                </motion.div>
            </div>
        </div>
    );
};

// Identity Protection Animation Component
const IdentityProtectionAnimation = () => {
    const [activeHandle, setActiveHandle] = useState(0);
    const handles = ['user_x92a', 'delta_v4', 'echo_7z', 'ghost_k8'];
    const colors = ['bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-cyan-500'];

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveHandle(prev => (prev + 1) % handles.length);
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-full flex flex-col items-center justify-center relative">
            {/* Central Avatar with Morphing Effect */}
            <motion.div
                className="relative mb-6"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
            >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-white/10 to-white/5 border border-white/20 flex items-center justify-center relative overflow-hidden">
                    {/* Glitch/Morph effect */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeHandle}
                            initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 1.1, filter: 'blur(4px)' }}
                            transition={{ duration: 0.3 }}
                            className="text-4xl text-white/80"
                        >
                            <Icon icon="solar:user-circle-linear" />
                        </motion.div>
                    </AnimatePresence>

                    {/* Scanning line effect */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/20 to-transparent"
                        animate={{ y: ['-100%', '100%'] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    />
                </div>

                {/* Status indicator */}
                <motion.div
                    className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full ${colors[activeHandle]} flex items-center justify-center`}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                >
                    <Icon icon="solar:check-circle-bold" className="text-xs text-white" />
                </motion.div>
            </motion.div>

            {/* Handle Display */}
            <div className="w-full max-w-[200px] space-y-3">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeHandle}
                        initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                        transition={{ duration: 0.25 }}
                        className="px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 font-mono text-sm text-center flex items-center justify-center gap-2"
                    >
                        <div className={`w-2 h-2 rounded-full ${colors[activeHandle]}`}></div>
                        <span className="text-slate-200">{handles[activeHandle]}</span>
                    </motion.div>
                </AnimatePresence>

                {/* Status badge */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-center"
                >
                    <span className="px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-mono inline-flex items-center gap-2">
                        <Icon icon="solar:incognito-linear" className="text-sm" />
                        IDENTITY MASKED
                    </span>
                </motion.div>
            </div>
        </div>
    );
};

// Hero Carousel Component
const HeroCarousel = () => {
    const [activeSlide, setActiveSlide] = useState(0);
    const slides = [
        {
            id: 1,
            tag: "Real-time Messaging",
            title: "Messaging at blitz \nspeed.",
            description: "Low latency communication for teams that move fast.",
            visual: "speed",
            color: "bg-blue-500"
        },
        {
            id: 2,
            tag: "end-to-end encryption",
            title: "Privacy is not\noptional.",
            description: "Real time end-to-end encryption. Your data stays yours.",
            visual: "security",
            color: "bg-indigo-500"
        },
        {
            id: 3,
            tag: "Become anonymous online",
            title: "Identity \nProtection.",
            description: "Go anonymous with randomly generated handles. Eliminate bias, remove social pressure, and protect personal metadata by default.",
            visual: "collab",
            color: "bg-cyan-500"
        }
    ];

    // Handle visibility change to prevent animation glitches when tab is inactive
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
        <section id="home" className="relative min-h-[850px] lg:h-screen pt-24 pb-12 flex flex-col justify-center overflow-hidden bg-[#0B0F14]">
            {/* Premium Gradient Background */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {/* Primary Linear Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B0F14] via-[#0E1623] to-[#0B0F14] opacity-90"></div>

                {/* Secondary Linear Accents */}
                <div className="absolute inset-0 bg-[linear-gradient(110deg,transparent_20%,rgba(59,130,246,0.03)_40%,transparent_60%)]"></div>

                {/* Ambient Glows */}
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse-slow"></div>
                <div className="absolute bottom-[-5%] right-[-5%] w-[30%] h-[30%] bg-blue-600/5 blur-[100px] rounded-full"></div>
            </div>

            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

            <div className="max-w-7xl mx-auto w-full px-6 grid lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">

                {/* Text Content */}
                <div className="lg:col-span-6 flex flex-col justify-center order-2 lg:order-1 relative z-20">

                    {/* Carousel Text Area - Fixed minimum height to prevent shifts */}
                    <div className="relative min-h-[400px] w-full flex flex-col justify-center">
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
                                <div className="flex items-center gap-3 mb-8">
                                    <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-blue-500/10 border border-blue-500/20 text-blue-400">
                                        {slides[activeSlide].tag}
                                    </span>
                                </div>

                                <h1 className="text-5xl lg:text-7xl font-semibold tracking-tighter text-white leading-[1.05] mb-6">
                                    {slides[activeSlide].title.split('\n').map((line, i) => (
                                        <span key={i} className="block">{line}</span>
                                    ))}
                                </h1>

                                <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
                                    {slides[activeSlide].description}
                                </p>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Static Actions (Outside Carousel) */}
                    <div className="flex items-center gap-4 mb-16 mt-4">
                        <a href="#platforms" className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full text-sm font-semibold tracking-wide transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] inline-block">
                            Get Started Free
                        </a>
                        <a href="#features" className="group px-8 py-4 rounded-full text-sm font-semibold text-slate-300 border border-white/10 hover:bg-white/5 transition-all flex items-center gap-2 inline-block">
                            Features
                            <Icon icon="solar:arrow-right-linear" className="transition-transform duration-300 group-hover:translate-x-1 text-lg" />
                        </a>
                    </div>

                    {/* Progress Indicators */}
                    <div className="flex gap-4">
                        {slides.map((slide, index) => (
                            <div
                                key={index}
                                onClick={() => setActiveSlide(index)}
                                className="h-1 flex-1 bg-white/10 rounded-full overflow-hidden cursor-pointer group relative"
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

                {/* Interactive Visual Canvas */}
                <div className="lg:col-span-6 h-[400px] lg:h-[600px] relative order-1 lg:order-2 perspective-1000">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeSlide}
                            initial={{ opacity: 0, x: 50, rotateY: 5 }}
                            animate={{ opacity: 1, x: 0, rotateY: 0 }}
                            exit={{ opacity: 0, x: -50, rotateY: -5 }}
                            transition={{ duration: 0.6, ease: "circOut" }}
                            className="w-full h-full flex items-center justify-center"
                        >
                            {/* Mock App Container */}
                            <div className="relative w-full max-w-md aspect-[3/4] lg:aspect-square bg-[#0E1623] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col ring-1 ring-white/5">

                                {/* Mockup Header */}
                                <div className="h-12 border-b border-white/5 flex items-center px-4 gap-3 bg-white/[0.02]">
                                    <div className="flex gap-1.5">
                                        <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-500/20"></div>
                                    </div>
                                    <div className="ml-auto w-24 h-1.5 rounded-full bg-white/5"></div>
                                </div>

                                {/* Dynamic Slide Content */}
                                <div className="flex-1 p-6 relative overflow-hidden">

                                    {/* Slide 1: Instant Messaging Animation */}
                                    {slides[activeSlide].visual === 'speed' && (
                                        <InstantMessagingAnimation key={activeSlide} />
                                    )}

                                    {/* Slide 2: Security */}
                                    {slides[activeSlide].visual === 'security' && (
                                        <EncryptionAnimation key={activeSlide} />
                                    )}

                                    {/* Slide 3: Identity Protection */}
                                    {slides[activeSlide].visual === 'collab' && (
                                        <IdentityProtectionAnimation key={activeSlide} />
                                    )}
                                </div>
                            </div>

                            {/* Decorative Blur */}
                            <div className={`absolute inset-0 bg-blue-500 blur-[100px] opacity-20 -z-10`}></div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

// Card Component
const Card = ({ children, className }) => {
    return (
        <div
            className={`relative rounded-3xl p-8 overflow-hidden bg-gradient-to-br from-white/[0.05] to-transparent backdrop-blur-xl border border-white/10 group transition-all duration-500 hover:border-white/20 ${className}`}
        >
            <div className="relative z-10 h-full">
                {children}
            </div>
        </div>
    );
};

const Features = () => {
    const canvasRef = useRef(null);

    // Beams Canvas Animation
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        const MINIMUM_BEAMS = 20;
        let beams = [];
        let rafId = 0;

        const opacityMap = {
            subtle: 0.7,
            medium: 0.85,
            strong: 1.0,
        };

        let intensity = 'strong';

        function createBeam(w, h) {
            const angle = -35 + Math.random() * 10;
            return {
                x: Math.random() * w * 1.5 - w * 0.25,
                y: Math.random() * h * 1.5 - h * 0.25,
                width: 30 + Math.random() * 60,
                length: h * 2.5,
                angle,
                speed: 0.6 + Math.random() * 1.2,
                opacity: 0.12 + Math.random() * 0.16,
                hue: 190 + Math.random() * 70,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: 0.02 + Math.random() * 0.03,
            };
        }

        function resetBeam(beam, index, totalBeams, w, h) {
            const column = index % 3;
            const spacing = w / 3;
            beam.y = h + 100;
            beam.x = column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
            beam.width = 100 + Math.random() * 100;
            beam.speed = 0.5 + Math.random() * 0.4;
            beam.hue = 190 + (index * 70) / totalBeams;
            beam.opacity = 0.2 + Math.random() * 0.1;
            return beam;
        }

        function updateCanvasSize() {
            const dpr = Math.max(1, window.devicePixelRatio || 1);
            // Use window size for canvas in this fixed background context
            const w = Math.floor(canvas.clientWidth || window.innerWidth);
            const h = Math.floor(canvas.clientHeight || window.innerHeight);

            canvas.width = Math.floor(w * dpr);
            canvas.height = Math.floor(h * dpr);

            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);

            const density = Math.min(1.5, Math.max(1, (w * h) / (1280 * 800)));
            const total = Math.floor(MINIMUM_BEAMS * density * 1.5);

            beams = Array.from({ length: total }, () => createBeam(w, h));
        }

        function drawBeam(c, beam, w, h) {
            c.save();
            c.translate(beam.x, beam.y);
            c.rotate((beam.angle * Math.PI) / 180);

            const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2) * opacityMap[intensity];

            const gradient = c.createLinearGradient(0, 0, 0, beam.length);
            gradient.addColorStop(0, `hsla(${beam.hue},85%,65%,0)`);
            gradient.addColorStop(0.1, `hsla(${beam.hue},85%,65%,${pulsingOpacity * 0.5})`);
            gradient.addColorStop(0.4, `hsla(${beam.hue},85%,65%,${pulsingOpacity})`);
            gradient.addColorStop(0.6, `hsla(${beam.hue},85%,65%,${pulsingOpacity})`);
            gradient.addColorStop(0.9, `hsla(${beam.hue},85%,65%,${pulsingOpacity * 0.5})`);
            gradient.addColorStop(1, `hsla(${beam.hue},85%,65%,0)`);

            c.fillStyle = gradient;
            c.fillRect(-beam.width / 2, 0, beam.width, beam.length);
            c.restore();
        }

        function animate() {
            const w = canvas.clientWidth;
            const h = canvas.clientHeight;

            ctx.clearRect(0, 0, w, h);
            ctx.filter = 'blur(35px)';

            const total = beams.length;
            for (let i = 0; i < total; i++) {
                const b = beams[i];
                b.y -= b.speed;
                b.pulse += b.pulseSpeed;

                if (b.y + b.length < -100) {
                    resetBeam(b, i, total, w, h);
                }
                drawBeam(ctx, b, w, h);
            }

            rafId = requestAnimationFrame(animate);
        }

        updateCanvasSize();
        animate();

        const handleResize = () => updateCanvasSize();
        window.addEventListener('resize', handleResize, { passive: true });

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(rafId);
        };
    }, []);

    return (
        <section id="features" className="py-32 px-6 bg-blitz-bg relative z-0 overflow-hidden">
            {/* Beams Background */}
            <div className="absolute inset-0 bg-neutral-950">
                <div className="relative w-full h-full">
                    <canvas ref={canvasRef} className="absolute inset-0 w-full h-full"></canvas>
                    <div className="absolute inset-0 bg-neutral-950/5 backdrop-blur-3xl animate-pulse [animation-duration:8s]"></div>
                    <div className="pointer-events-none absolute inset-0">
                        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-neutral-950 to-transparent"></div>
                        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-950 to-transparent"></div>
                        <div className="absolute -inset-[25%] bg-[radial-gradient(60%_60%_at_50%_40%,rgba(80,120,255,0.10),transparent)]"></div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="mb-24 text-center">
                    <h2 className="text-5xl lg:text-7xl font-semibold tracking-tighter text-white leading-[1.05] mb-6">
                        Collaboration, <span className="text-slate-500">Reimagined.</span>
                    </h2>
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
                        Features built for speed, privacy, and productivity.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">

                    {/* Card 1: Identity (Large) */}
                    <Card className="md:col-span-2 bg-gradient-to-br from-white/5 to-transparent">
                        <div className="flex flex-col h-full">
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-white border border-white/10">
                                <Icon icon="solar:user-id-linear" className="text-2xl" />
                            </div>
                            <h3 className="text-2xl font-medium text-white mb-3">Anonymous by default</h3>
                            <p className="text-slate-400 max-w-lg mb-8 leading-relaxed">
                                Go anonymous with randomly generated handles.Eliminate bias, remove social pressure, and protect personal metadata by default. </p>


                            <div className="mt-auto relative h-24 w-full overflow-hidden flex items-center gap-4">
                                <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                    <span>user_x92a</span>
                                </div>
                                <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 flex items-center gap-2 opacity-60">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span>delta_v4</span>
                                </div>
                                <div className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300 flex items-center gap-2 opacity-40">
                                    <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                    <span>echo_7z</span>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Card 2: Velocity */}
                    <Card className="md:col-span-1">
                        <div className="flex flex-col h-full">
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-white border border-white/10">
                                <Icon icon="solar:bolt-linear" className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-3">Instant Messaging</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                Messages sync across devices in milliseconds. No loading spinners, no waiting for history.
                            </p>

                        </div>
                    </Card>

                    {/* Card 3: Focused Context */}
                    <Card className="md:col-span-1">
                        <div className="flex flex-col h-full">
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-white border border-white/10">
                                <Icon icon="solar:sort-by-time-linear" className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-3">Focused Context</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Threads and channels designed for high-signal communication. Reduce noise, increase clarity.
                            </p>
                        </div>
                    </Card>

                    {/* Card 4: Encryption */}
                    <Card className="md:col-span-1">
                        <div className="flex flex-col h-full">
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-white border border-white/10">
                                <Icon icon="solar:shield-check-linear" className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-3">End-to-End Encrypted</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Messages are encrypted on your device and readable only by intended recipients.
                            </p>
                        </div>
                    </Card>

                    {/* Card 5: Sovereignty */}
                    <Card className="md:col-span-1">
                        <div className="flex flex-col h-full">
                            <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 text-white border border-white/10">
                                <Icon icon="solar:trash-bin-trash-linear" className="text-2xl" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-3">Data Sovereignty</h3>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                Complete control over retention policies. History exists only as long as you need it to.
                            </p>
                        </div>
                    </Card>

                </div>
            </div >
        </section >
    );
};

// Platform CTA Component
const PlatformCTA = () => {
    return (
        <section id="platforms" className="py-24 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="relative overflow-hidden rounded-[3rem] bg-gradient-to-br from-white/10 via-white/5 to-transparent p-[1px]"
                >
                    <div className="relative bg-[#0E1623] rounded-[3rem] overflow-hidden px-8 py-20 md:px-20 md:py-24 text-center">
                        {/* Background Effects */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none"></div>
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div>

                        <div className="relative z-10 max-w-6xl mx-auto">
                            <h2 className="text-4xl md:text-6xl font-medium text-white tracking-tighter mb-8 leading-tight">
                                Bring <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Blitz</span> to your workspace. <br />


                            </h2>
                            <p className="text-xl text-slate-400 mb-16 max-w-2xl mx-auto leading-relaxed">
                                Download Blitz for your preferred platform. Sync perfectly across all your devices.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                                <a href="#" className="group flex flex-col items-center justify-center p-6 bg-[#0E1623] hover:bg-[#1C2330] border border-white/5 rounded-2xl transition-all hover:-translate-y-1">
                                    <iconify-icon icon="ri:apple-fill" class="text-3xl text-white mb-3 group-hover:scale-110 transition-transform"></iconify-icon>
                                    <span className="text-sm font-medium text-white">macOS</span>
                                    <span className="text-xs text-slate-500 mt-1">Universal Binary</span>
                                </a>

                                <a href="#" className="group flex flex-col items-center justify-center p-6 bg-[#0E1623] hover:bg-[#1C2330] border border-white/5 rounded-2xl transition-all hover:-translate-y-1">
                                    <iconify-icon icon="ri:windows-fill" class="text-3xl text-white mb-3 group-hover:scale-110 transition-transform"></iconify-icon>
                                    <span className="text-sm font-medium text-white">Windows</span>
                                    <span className="text-xs text-slate-500 mt-1">Win 10/11</span>
                                </a>

                                <a href="#" className="group flex flex-col items-center justify-center p-6 bg-[#0E1623] hover:bg-[#1C2330] border border-white/5 rounded-2xl transition-all hover:-translate-y-1">
                                    <iconify-icon icon="ri:android-fill" class="text-3xl text-white mb-3 group-hover:scale-110 transition-transform"></iconify-icon>
                                    <span className="text-sm font-medium text-white">Android</span>
                                    <span className="text-xs text-slate-500 mt-1">Play Store</span>
                                </a>

                                <a href="#" className="group flex flex-col items-center justify-center p-6 bg-[#0E1623] hover:bg-[#1C2330] border border-white/5 rounded-2xl transition-all hover:-translate-y-1">
                                    <iconify-icon icon="ri:apple-fill" class="text-3xl text-white mb-3 group-hover:scale-110 transition-transform"></iconify-icon>
                                    <span className="text-sm font-medium text-white">iOS</span>
                                    <span className="text-xs text-slate-500 mt-1">App Store</span>
                                </a>
                            </div>

                            <div className="mt-16 text-sm text-slate-500 font-medium">
                                <span className="hover:text-white cursor-pointer transition-colors hover:underline decoration-slate-700 underline-offset-4">View Linux downloads</span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

// Footer Component
const Footer = () => {
    return (
        <footer id="contact" className="bg-black relative pt-32 pb-12 overflow-hidden">
            {/* Top Content */}
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-32">
                    <div>
                        <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8">
                            Private. <span className="text-slate-500">Secure.</span> Anonymous.
                        </h2>
                        <div className="flex gap-6 text-sm font-semibold text-slate-500 uppercase tracking-wider">
                            <a href="#" className="hover:text-white transition-colors">Home</a>
                            <a href="#features" className="hover:text-white transition-colors">Features</a>
                            <a href="#platforms" className="hover:text-white transition-colors">Download Free</a>
                            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                        </div>
                        <div className="flex flex-col gap-2 mt-8 text-sm font-medium text-slate-500" id="footer-contact">
                            <a href="mailto:hello@blitz.com" className="hover:text-white transition-colors flex items-center gap-2 w-fit">
                                <Icon icon="solar:letter-linear" className="text-lg" />
                                hello@blitz.com
                            </a>
                            <a href="tel:+15550002548" className="hover:text-white transition-colors flex items-center gap-2 w-fit">
                                <Icon icon="solar:phone-calling-linear" className="text-lg" />
                                +1 (555) 000-BLITZ
                            </a>
                        </div>
                        <div className="flex gap-4 mt-8">
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all">
                                <Icon icon="ri:instagram-line" className="text-xl" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all">
                                <Icon icon="ri:twitter-x-fill" className="text-xl" />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-slate-500 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all">
                                <Icon icon="ri:facebook-fill" className="text-xl" />
                            </a>
                        </div>
                    </div>


                </div>
            </div>

            {/* Massive BLITZ Typography with Fade Effect */}
            <div className="relative w-full overflow-hidden flex justify-center items-end" style={{ height: '30vh' }}>
                <h1 className="text-[15vw] md:text-[20vw] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-[#1C2330] to-transparent select-none absolute bottom-[-5vw] left-0 right-0 text-center pointer-events-none">
                    BLITZ
                </h1>
                <h1 className="text-[15vw] md:text-[20vw] font-black leading-none tracking-tighter text-[#111] select-none absolute bottom-[-5vw] left-0 right-0 text-center pointer-events-none z-0"
                    style={{
                        maskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)',
                        WebkitMaskImage: 'linear-gradient(to bottom, black 20%, transparent 80%)'
                    }}>
                    <motion.span
                        initial={{ opacity: 0.3 }}
                        animate={{ opacity: [0.3, 0.6, 0.3] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    >
                        BLITZ
                    </motion.span>
                </h1>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10 flex justify-center mt-12">
                <p className="text-[10px] text-slate-800 font-mono uppercase tracking-widest">
                    © 2026 Milima Technologies.
                </p>
            </div>
        </footer>
    );
};

// Main App Component
const App = () => {
    return (
        <div className="antialiased selection:bg-blue-500/30 selection:text-white">
            <Header />
            <main>
                <HeroCarousel />
                <Features />
                <PlatformCTA />
            </main>
            <Footer />
        </div>
    );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
