import { motion } from 'framer-motion';

// simple mobile frame visual
export const MobileAppAnimation = () => {
    return (
        <div className="h-full w-full flex items-center justify-center relative p-8">
            <motion.div
                initial={{ opacity: 0, y: 30, rotateX: 20 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full h-full flex items-center justify-center"
            >
                <div className="relative w-full max-w-[260px] h-full flex items-center justify-center">
                    <img
                        src="/images/pincode.png"
                        alt="Mobile App"
                        className="max-h-full w-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl border border-white/10"
                    />
                </div>
            </motion.div>

            {/* Ambient Background Glow */}
            <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full -z-10"></div>
        </div>
    );
};
