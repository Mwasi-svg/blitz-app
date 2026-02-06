import { motion, type Variants } from 'framer-motion';
import { Icon } from './icon';

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
                            Bring <span className="text-[#6EC6E6]"><i>Millima Messaging</i></span> to <br className="hidden lg:block" /> your workspace.
                        </motion.h2>

                        <motion.p variants={itemVariants} className="text-lg text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Experience the power of Millima Messaging on any device. <br className="hidden lg:block" />
                            Download on your preferred platform and stay connected anywhere.
                        </motion.p>

                        <motion.div variants={itemVariants} className="w-full">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                                {/* Google Play */}
                                <a href="https://play.google.com/store/search?q=Blitz%20chat&c=apps" className="group flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#0E1623] to-[#141d2e] hover:from-[#141d2e] hover:to-[#1c283d] border border-blue-500/20 hover:border-blue-500/40 rounded-2xl transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                                    <Icon icon="simple-icons:googleplay" className="text-4xl text-white mb-3 group-hover:scale-110 transition-transform" />
                                    <span className="text-lg font-semibold text-white">Google Play Store</span>
                                    <span className="text-xs text-blue-400 group-hover:text-blue-300 transition-colors">Android</span>
                                </a>

                                {/* App Store */}
                                <a href="https://apps.apple.com/us/app/blitz-chat/id6446266666" className="group flex flex-col items-center justify-center p-8 bg-gradient-to-br from-[#0E1623] to-[#141d2e] hover:from-[#141d2e] hover:to-[#1c283d] border border-blue-500/20 hover:border-blue-500/40 rounded-2xl transition-all hover:-translate-y-1 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                                    <Icon icon="simple-icons:appstore" className="text-4xl text-white mb-3 group-hover:scale-110 transition-transform" />
                                    <span className="text-lg font-semibold text-white">App Store</span>
                                    <span className="text-xs text-blue-400 group-hover:text-blue-300 transition-colors">iOS</span>
                                </a>

                                {/* macOS */}
                                <a href="https://apps.apple.com/us/mac/search?term=blitz%20chat" className="group flex flex-col items-center justify-center p-6 bg-[#0E1623]/60 hover:bg-[#1C2330] border border-white/5 hover:border-blue-500/30 rounded-2xl transition-all hover:-translate-y-1">
                                    <Icon icon="simple-icons:apple" className="text-3xl text-slate-300 mb-2 group-hover:text-white transition-colors group-hover:scale-110 transition-transform" />
                                    <span className="text-base font-medium text-slate-200 group-hover:text-white">macOS</span>
                                    <span className="text-xs text-slate-500 group-hover:text-slate-400">Universal Binary</span>
                                </a>

                                {/* Windows */}
                                <a href="https://apps.microsoft.com/search?query=blitz+chat&hl=en-US&gl=KE" className="group flex flex-col items-center justify-center p-6 bg-[#0E1623]/60 hover:bg-[#1C2330] border border-white/5 hover:border-blue-500/30 rounded-2xl transition-all hover:-translate-y-1">
                                    <Icon icon="simple-icons:microsoftstore" className="text-3xl text-slate-300 mb-2 group-hover:text-white transition-colors group-hover:scale-110 transition-transform" />
                                    <span className="text-base font-medium text-slate-200 group-hover:text-white">Windows</span>
                                    <span className="text-xs text-slate-500 group-hover:text-slate-400">10 & 11</span>
                                </a>
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mt-12 w-full pt-10 border-t border-white/5">
                            <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                                {/* Corporate CTA Button */}
                                <a href="mailto:corporate@blitz-chat.com" className="group relative w-full lg:w-auto flex items-center gap-6 p-6 pr-10 rounded-2xl bg-gradient-to-br from-[#0E1623] to-[#141d2e] border border-blue-500/20 hover:border-blue-500/40 shadow-xl transition-all hover:-translate-y-1 overflow-hidden">
                                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-xl bg-blue-500/10 text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300">
                                        <Icon icon="solar:case-bold" className="text-3xl" />
                                    </div>
                                    <div className="flex flex-col relative z-10">
                                        <span className="text-[10px] font-bold text-blue-400/80 tracking-[0.2em] uppercase mb-1">Business Solution</span>
                                        <span className="text-xl font-bold text-white tracking-tight">Corporate version</span>
                                    </div>
                                </a>

                                {/* Security Info */}
                                <div className="flex flex-col items-center lg:items-start space-y-3 flex-1">
                                    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10">
                                        <Icon icon="solar:shield-check-bold" className="text-blue-400 text-base" />
                                        <span className="text-[11px] font-bold text-blue-400 tracking-wider uppercase">100% Secure & Private</span>
                                    </div>
                                    <p className="text-sm text-slate-400 max-w-sm leading-relaxed lg:text-left text-center">
                                        Deploy <span className="text-white font-medium">Millima Messaging</span> on your own private corporate servers for absolute data security and control.
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
