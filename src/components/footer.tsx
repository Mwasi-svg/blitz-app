import { Icon } from './icon';

export const Footer = () => {
    return (
        <footer id="contact" className="bg-black relative pt-16 sm:pt-24 lg:pt-32 pb-8 sm:pb-12 overflow-hidden">
            {/* main links and info */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16 sm:mb-24 lg:mb-32 max-w-5xl mx-auto">
                    {/* Left Column: Branding & Navigation */}
                    <div className="flex flex-row items-start gap-6 md:gap-10 md:pr-12">
                        {/* Logo on the left */}
                        <div className="shrink-0 h-20 sm:h-32 lg:h-40 pt-2">
                            <img src="/images/logo.png" alt="Blitz Logo" className="h-full w-auto object-contain" />
                        </div>

                        {/* Branding Content: Header and Links aligned */}
                        <div className="flex flex-col gap-8">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-bold text-white tracking-tighter leading-[1.1]">
                                Private. <span className="text-slate-500">Secure.</span> Anonymous.
                            </h2>
                            <nav className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-widest">
                                <a href="#" className="hover:text-white transition-colors">Home</a>
                                <a href="#features" className="hover:text-white transition-colors">Features</a>
                                <a href="#platforms" className="hover:text-white transition-colors">Download</a>
                                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
                            </nav>
                        </div>
                    </div>

                    {/* Right Column: Contact Info & Socials (Aligned to a centered line) */}
                    <div className="flex flex-col items-start text-left md:pl-12 md:border-l border-white/10 pt-2 lg:pl-16">
                        <div className="flex flex-col gap-2 text-sm font-medium text-slate-500">
                            <a href="mailto:hello@blitz-chat.com" className="hover:text-white transition-colors flex items-center gap-2 w-fit">
                                <Icon icon="solar:letter-linear" className="text-xl" />
                                hello@blitz-chat.com
                            </a>
                            <a href="tel:+15550002548" className="hover:text-white transition-colors flex items-center gap-2 w-fit">
                                <Icon icon="solar:phone-calling-linear" className="text-xl" />
                                +1 (555) 000-BLITZ
                            </a>
                        </div>
                        <div className="flex flex-col gap-2 mt-10 w-fit">
                            <a href="https://www.instagram.com/" className="hover:text-white transition-colors flex items-center gap-2 w-fit text-sm font-medium text-slate-500">
                                <Icon icon="lucide:instagram" className="text-xl" />
                                Instagram
                            </a>
                            <a href="https://x.com/" className="hover:text-white transition-colors flex items-center gap-2 w-fit text-sm font-medium text-slate-500">
                                <Icon icon="lucide:twitter" className="text-xl" />
                                Twitter (X)
                            </a>
                            <a href="https://www.facebook.com/" className="hover:text-white transition-colors flex items-center gap-2 w-fit text-sm font-medium text-slate-500">
                                <Icon icon="lucide:facebook" className="text-xl" />
                                Facebook
                            </a>
                        </div>
                    </div>
                </div>
            </div>



            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 flex justify-center mt-8 sm:mt-12">
                <p className="text-[10px] text-slate-500 font-mono uppercase tracking-widest">
                    © 2026 Milima Technologies. All rights reserved.
                </p>
            </div>
        </footer>
    );
};
