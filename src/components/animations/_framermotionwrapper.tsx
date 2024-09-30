import { motion } from 'framer-motion';

const _FramerMotionWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {children}
    </motion.div>
  );
};

export default _FramerMotionWrapper;