import { EntryList } from "../../../ui";
import { motion } from 'framer-motion';

const sectionsVariants = {
  initial: { opacity: 0, x: -1500 },
  animate: { opacity: 1, x: 0, transition: {  duration: 0.3 } },
  exit: { opacity: 0, x: 1500, transition: { duration: 0.3 } },
};

export const InProgress = () => {
  return (
    <motion.div 
    className="content-section"
    variants={sectionsVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    >
      <div className="apps-card">
      <div className="app-card" style={{ width: '100%' }}>
          <h4>In progress</h4>

          <EntryList status="in-progress" />
        </div>
      </div>
    </motion.div>
  );
};
