import { motion } from 'framer-motion';
import { Icon } from '@iconify/react';

export const PlatformCTA = () => {
    return (
        <section id="platforms" className="py-24 px-6 bg-blitz-bg">
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
                                Download Blitz for your preferred platform. Free versions for your personal use.
                            </p>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                                <a href="#" className="group flex flex-col items-center justify-center p-6 bg-[#0E1623] hover:bg-[#1C2330] border border-white/5 rounded-2xl transition-all hover:-translate-y-1">
                                    <Icon icon="ri:apple-fill" className="text-3xl text-white mb-3 group-hover:scale-110 transition-transform" style={{ fontSize: '1.875rem' }} />
                                    <span className="text-sm font-medium text-white">macOS</span>
                                    <span className="text-xs text-slate-500 mt-1">Universal Binary</span>
                                </a>

                                <a href="#" className="group flex flex-col items-center justify-center p-6 bg-[#0E1623] hover:bg-[#1C2330] border border-white/5 rounded-2xl transition-all hover:-translate-y-1">
                                    <Icon icon="ri:windows-fill" className="text-3xl text-white mb-3 group-hover:scale-110 transition-transform" style={{ fontSize: '1.875rem' }} />
                                    <span className="text-sm font-medium text-white">Windows</span>
                                    <span className="text-xs text-slate-500 mt-1">Win 10/11</span>
                                </a>

                                <a href="#" className="group flex flex-col items-center justify-center p-6 bg-[#0E1623] hover:bg-[#1C2330] border border-white/5 rounded-2xl transition-all hover:-translate-y-1">
                                    <Icon icon="ri:android-fill" className="text-3xl text-white mb-3 group-hover:scale-110 transition-transform" style={{ fontSize: '1.875rem' }} />
                                    <span className="text-sm font-medium text-white">Android</span>
                                    <span className="text-xs text-slate-500 mt-1">Play Store</span>
                                </a>

                                <a href="#" className="group flex flex-col items-center justify-center p-6 bg-[#0E1623] hover:bg-[#1C2330] border border-white/5 rounded-2xl transition-all hover:-translate-y-1">
                                    <Icon icon="ri:apple-fill" className="text-3xl text-white mb-3 group-hover:scale-110 transition-transform" style={{ fontSize: '1.875rem' }} />
                                    <span className="text-sm font-medium text-white">iOS</span>
                                    <span className="text-xs text-slate-500 mt-1">App Store</span>
                                </a>
                            </div>

                            <div className="mt-16 flex flex-col items-center gap-4 text-center">
                                <Icon icon="solar:buildings-2-linear" className="text-3xl text-white mb-1" />
                                <span className="text-sm text-slate-500 font-medium">
                                    Want 200% secure solution? <br />
                                    <a href="mailto:corporate@blitz-chat.com" className="inline-block mt-2 text-blue-400 hover:text-blue-300 font-semibold transition-colors underline decoration-blue-400/20 underline-offset-8">
                                        Deploy our app on your corporate server.
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
