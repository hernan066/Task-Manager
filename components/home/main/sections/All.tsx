import {  EntryList } from "../../../ui"
import { motion } from 'framer-motion';


export const All = () => {
  return (
    <motion.div 
    className="content-section"
    initial={{ opacity: 0, x: '-100%' }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.5 }}
    >
    <div className="apps-card">
      <div className="app-card">
        <h4>Pending</h4>
        
        <EntryList status="pending" />
      </div>
      <div className="app-card">
        <h4>In progress</h4>

        <EntryList status="in-progress" />
      </div>
      <div className="app-card">
        <h4>Complete</h4>

        <EntryList status="finished" />
      </div>
    </div>
  </motion.div>
  )
}
