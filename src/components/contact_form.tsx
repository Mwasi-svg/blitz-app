import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from './Icon';
import { useState } from 'react';
import emailjs from '@emailjs/browser';

interface ContactProps {
    isOpen: boolean;
    onClose: () => void;
}

export const Contact = ({ isOpen, onClose }: ContactProps) => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: ''
    });

    const resetForm = () => {
        setFormData({
            name: '',
            email: '',
            phone: '',
            message: ''
        });
        setStatus('idle');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        const serviceId = 'service_5teq11e';
        const publicKey = '_-8JNO8FxnE7ekwmB';

        try {
            // first one: send the lead to support team
            await emailjs.send(
                serviceId,
                'template_mgimyiq',
                {
                    from_name: formData.name,
                    from_email: formData.email,
                    phone_number: formData.phone,
                    message: formData.message,
                },
                publicKey
            );

            // second one: send the auto-reply to the user
            await emailjs.send(
                serviceId,
                'template_wild9dd',
                {
                    to_name: formData.name,
                    to_email: formData.email,
                },
                publicKey
            );

            setStatus('success');
            setTimeout(() => {
                onClose();
                resetForm();
            }, 3000);
        } catch (error) {
            console.error('EmailJS Error:', error);
            setStatus('error');
            setTimeout(() => setStatus('idle'), 5000);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* dim everything else */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-md z-[100]"
                    />

                    {/* the actual popup contents */}
                    <div className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: "spring", duration: 0.5, bounce: 0.3 }}
                            className="relative overflow-hidden overflow-y-auto max-h-[90vh] bg-[#0B0F14] w-full max-w-5xl rounded-2xl sm:rounded-3xl shadow-2xl pointer-events-auto border border-white/10"
                        >
                            {/* slight image/noise backdrop */}
                            <div className="absolute inset-0">
                                <img
                                    src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/60668e31-2150-424e-b292-05bfdda254e0_1600w.jpg"
                                    alt="Abstract minimal background"
                                    className="h-full w-full object-cover opacity-20"
                                />
                                <div className="absolute inset-0 bg-gradient-to-tr from-[#0B0F14] via-[#0B0F14]/80 to-transparent"></div>
                            </div>

                            {/* close button at the top right */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-all backdrop-blur-md border border-white/5"
                            >
                                <Icon icon="solar:close-circle-linear" className="text-2xl" />
                            </button>

                            {/* grid for form and summary info */}
                            <div className="relative z-10 p-4 sm:p-6 md:p-8 lg:p-12">
                                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
                                    {/* Form card */}
                                    <div className="lg:col-span-5">
                                        <div className="rounded-2xl bg-[#0E1623]/80 backdrop-blur-md ring-1 ring-white/10 shadow-2xl p-6 sm:p-8">
                                            <div className="flex items-center justify-between mb-6">
                                                <div>
                                                    <p className="text-[11px] font-medium tracking-wider text-blue-400">Blitz Support</p>
                                                    <h3 className="mt-1 text-2xl font-semibold tracking-tight text-white">Get in touch</h3>
                                                </div>
                                                <div className="h-10 w-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center ring-1 ring-blue-500/20">
                                                    <Icon icon="solar:chat-line-linear" className="text-xl" />
                                                </div>
                                            </div>

                                            <div className="relative">
                                                <AnimatePresence>
                                                    {status === 'success' && (
                                                        <motion.div
                                                            initial={{ opacity: 0, scale: 0.9 }}
                                                            animate={{ opacity: 1, scale: 1 }}
                                                            exit={{ opacity: 0, scale: 0.9 }}
                                                            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#0E1623]/95 backdrop-blur-sm rounded-2xl text-center p-6 border border-blue-500/20"
                                                        >
                                                            <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center mb-4 text-blue-400 ring-1 ring-blue-500/20">
                                                                <Icon icon="solar:check-circle-linear" className="text-3xl" />
                                                            </div>
                                                            <h4 className="text-xl font-bold text-white mb-2">Message Sent!</h4>
                                                            <p className="text-sm text-slate-400">Thank you for reaching out. We've sent a confirmation to your email.</p>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                <form onSubmit={handleSubmit} className={`space-y-4 transition-opacity duration-300 ${status === 'loading' ? 'opacity-50' : 'opacity-100'}`}>
                                                    <div>
                                                        <label htmlFor="ct-name" className="block text-xs font-medium text-slate-400 mb-1.5">Your name</label>
                                                        <input
                                                            id="ct-name"
                                                            name="name"
                                                            type="text"
                                                            required
                                                            disabled={status === 'loading'}
                                                            placeholder="Your Name"
                                                            className="w-full px-4 py-3 text-sm rounded-xl bg-[#0B0F14] border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none text-white placeholder:text-slate-600 transition-all"
                                                            value={formData.name}
                                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label htmlFor="ct-email" className="block text-xs font-medium text-slate-400 mb-1.5">E‑mail</label>
                                                        <div className="relative">
                                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                                                <Icon icon="solar:letter-linear" />
                                                            </div>
                                                            <input
                                                                id="ct-email"
                                                                name="email"
                                                                type="email"
                                                                required
                                                                disabled={status === 'loading'}
                                                                placeholder="Your Email"
                                                                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-[#0B0F14] border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none text-white placeholder:text-slate-600 transition-all"
                                                                value={formData.email}
                                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="ct-phone" className="block text-xs font-medium text-slate-400 mb-1.5">Phone <span className="text-slate-600 font-normal">(Optional)</span></label>
                                                        <div className="relative">
                                                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">
                                                                <Icon icon="solar:phone-calling-linear" />
                                                            </div>
                                                            <input
                                                                id="ct-phone"
                                                                name="phone"
                                                                type="tel"
                                                                disabled={status === 'loading'}
                                                                placeholder="+254 700 000 000"
                                                                className="w-full pl-10 pr-4 py-3 text-sm rounded-xl bg-[#0B0F14] border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none text-white placeholder:text-slate-600 transition-all"
                                                                value={formData.phone}
                                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <label htmlFor="ct-msg" className="block text-xs font-medium text-slate-400 mb-1.5">Message</label>
                                                        <textarea
                                                            id="ct-msg"
                                                            name="message"
                                                            rows={3}
                                                            disabled={status === 'loading'}
                                                            placeholder="How can we help you?"
                                                            className="w-full px-4 py-3 text-sm rounded-xl bg-[#0B0F14] border border-white/10 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 outline-none text-white placeholder:text-slate-600 resize-none transition-all"
                                                            value={formData.message}
                                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                                        ></textarea>
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        disabled={status === 'loading'}
                                                        className="w-full inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white px-4 py-3.5 text-sm font-semibold hover:from-blue-500 hover:to-blue-400 transition-all shadow-lg shadow-blue-500/20 gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                                                    >
                                                        {status === 'loading' ? (
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                                Sending...
                                                            </div>
                                                        ) : (
                                                            <>
                                                                Send message
                                                                <Icon icon="solar:arrow-right-linear" className="group-hover:translate-x-0.5 transition-transform" />
                                                            </>
                                                        )}
                                                    </button>
                                                    {status === 'error' && (
                                                        <p className="text-[11px] text-red-400 text-center font-medium bg-red-500/10 py-2 rounded-lg border border-red-500/20">Failed to send. Please try again.</p>
                                                    )}
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Copy + highlights - Hidden on mobile for cleaner form focus */}
                                    <div className="hidden lg:block lg:col-span-7 pt-4 lg:pt-12">
                                        <h2 className="text-white tracking-tight text-4xl lg:text-5xl xl:text-6xl font-semibold leading-[1.1]">Let's build<br />something <span className="text-blue-500">great.</span></h2>
                                        <p className="sm:text-lg max-w-2xl text-base text-slate-400 mt-6 leading-relaxed">
                                            Whether you need enterprise support, custom integration, or just have a few questions, our team is ready to help you scale securely.
                                        </p>

                                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.07] transition-colors">
                                                <div className="h-10 w-10 rounded-xl bg-blue-500/10 backdrop-blur ring-1 ring-blue-500/20 flex items-center justify-center text-blue-400 shrink-0">
                                                    <Icon icon="solar:clock-circle-linear" className="text-xl" />
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium text-sm">Quick response</p>
                                                    <p className="text-slate-400 text-xs mt-1">We typically reply within 24 hours during business days.</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/[0.07] transition-colors">
                                                <div className="h-10 w-10 rounded-xl bg-cyan-500/10 backdrop-blur ring-1 ring-cyan-500/20 flex items-center justify-center text-cyan-400 shrink-0">
                                                    <Icon icon="solar:shield-check-linear" className="text-xl" />
                                                </div>
                                                <div>
                                                    <p className="text-white font-medium text-sm">Secure Communication</p>
                                                    <p className="text-slate-400 text-xs mt-1">Your inquiries are handled with end-to-end privacy.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};
