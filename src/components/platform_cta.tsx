import { motion, type Variants } from 'framer-motion';
import { Icon } from './Icon';

export const PlatformCTA = () => {
    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 200
            }
        }
    };

    return (
        <section id="platforms" className="py-20 lg:py-32 px-4 sm:px-6 bg-blitz-bg overflow-hidden">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left Column: Image with Spring Entry */}
                    <motion.div
                        initial={{ opacity: 0, x: -60, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{
                            type: "spring",
                            damping: 20,
                            stiffness: 100,
                            duration: 1
                        }}
                        className="relative z-10 order-first lg:order-none"
                    >
                        {/* Abstract background glow behind image */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-[500px] bg-blue-600/20 blur-[100px] rounded-full -z-10"></div>

                        <div className="relative flex justify-center lg:justify-start">
                            <img
                                src="/images/platform.png"
                                alt="Blitz Platform Interface"
                                className="w-[65%] lg:w-[75%] h-auto drop-shadow-2xl transform perspective-1000 rotate-y-3 hover:rotate-y-0 transition-transform duration-500"
                            />
                        </div>
                    </motion.div>

                    {/* Right Column: Staggered Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        className="relative z-10 text-center lg:text-left"
                    >
                        <motion.h2 variants={itemVariants} className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-6 leading-tight">
                            Bring <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400"><i>Milima Messaging</i></span> to <br className="hidden lg:block" /> your workspace.
                        </motion.h2>

                        <motion.p variants={itemVariants} className="text-lg text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Experience the power of Blitz on any device. <br className="hidden lg:block" />
                            Download on your preferred platform and stay connected anywhere.
                        </motion.p>

                        <motion.div variants={itemVariants} className="flex flex-col gap-4 max-w-md mx-auto lg:mx-0">
                            {/* Priority Mobile Group (emphasized on mobile) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <a href="https://play.google.com/store/search?q=Blitz%20chat&c=apps" className="group flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#0E1623] to-[#141d2e] hover:from-[#141d2e] hover:to-[#1c283d] border border-blue-500/20 hover:border-blue-500/40 rounded-2xl transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                                    <Icon icon="simple-icons:googleplay" className="text-3xl text-white mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-base font-semibold text-white">Google Play Store</span>
                                    <span className="text-[11px] text-blue-400 group-hover:text-blue-300 transition-colors">Android</span>
                                </a>

                                <a href="https://apps.apple.com/us/app/blitz-chat/id6446266666" className="group flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#0E1623] to-[#141d2e] hover:from-[#141d2e] hover:to-[#1c283d] border border-blue-500/20 hover:border-blue-500/40 rounded-2xl transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                                    <Icon icon="simple-icons:appstore" className="text-3xl text-white mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-base font-semibold text-white">App Store</span>
                                    <span className="text-[11px] text-blue-400 group-hover:text-blue-300 transition-colors">iOS</span>
                                </a>
                            </div>

                            {/* Secondary Desktop Group */}
                            <div className="grid grid-cols-2 gap-4">
                                <a href="https://apps.apple.com/us/mac/search?term=blitz%20chat" className="group flex flex-col items-center justify-center p-4 bg-[#0E1623]/60 hover:bg-[#1C2330] border border-white/5 hover:border-blue-500/30 rounded-2xl transition-all hover:-translate-y-0.5 opacity-80 hover:opacity-100">
                                    <Icon icon="simple-icons:appstore" className="text-2xl text-slate-300 mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium text-slate-200">macOS</span>
                                    <span className="text-[10px] text-slate-500 text-center">Universal Binary</span>
                                </a>

                                <a href="https://apps.microsoft.com/search?query=blitz+chat&hl=en-US&gl=KE" className="group flex flex-col items-center justify-center p-4 bg-[#0E1623]/60 hover:bg-[#1C2330] border border-white/5 hover:border-blue-500/30 rounded-2xl transition-all hover:-translate-y-0.5 opacity-80 hover:opacity-100">
                                    <Icon icon="simple-icons:microsoftstore" className="text-2xl text-slate-300 mb-2 group-hover:scale-110 transition-transform" />
                                    <span className="text-sm font-medium text-slate-200">Windows</span>
                                    <span className="text-[10px] text-slate-500 text-center">10 & 11</span>
                                </a>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-12 flex flex-col items-center lg:items-start gap-6">
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                {/* Refined Premium Corporate Button */}
                                <a href="mailto:corporate@blitz-chat.com" className="group flex items-center gap-5 p-5 pr-12 rounded-2xl bg-gradient-to-br from-[#0E1623] to-[#141d2e] border border-blue-500/20 hover:border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.05)] hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] transition-all hover:-translate-y-1 relative overflow-hidden">
                                    {/* Subtle Glass Tint */}
                                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                                    <div className="relative z-10 text-white transition-colors group-hover:scale-110 duration-300">
                                        <Icon icon="solar:case-bold" className="text-5xl" />
                                    </div>

                                    <div className="flex flex-col relative z-10">
                                        <span className="text-[11px] font-bold text-blue-400/80 tracking-widest uppercase mb-1.5">Available for business</span>
                                        <span className="text-2xl font-bold text-white tracking-tight">Corporate version</span>
                                    </div>
                                </a>

                                <div className="hidden sm:block w-px h-16 bg-white/5 mx-2"></div>

                                <div className="flex flex-col items-center lg:items-start space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                            <Icon icon="solar:shield-check-bold" className="text-blue-400 text-lg" />
                                        </div>
                                        <span className="text-sm font-bold text-white tracking-wide">100% Secure Solution</span>
                                    </div>
                                    <p className="text-xs text-slate-500 max-w-[220px] leading-relaxed lg:text-left text-center">

                                        Need a 200% secure corporate solution?. Deploy <span className="text-slate-400">Blitz</span> on your own private corporate servers.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
