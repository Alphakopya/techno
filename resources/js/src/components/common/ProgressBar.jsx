// resources/js/src/components/ProgressBar.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import signup from '../../../../sass/SignUp.module.scss';

const ProgressBar = () => {
  const location = useLocation();
  const [previousIndex, setPreviousIndex] = useState(-1); // Track previous step
  const [currentIndex, setCurrentIndex] = useState(0); // Track current step

  const steps = [
    { label: 'Credentials', path: '/signup' },
    { label: 'Information', path: '/signup/information' },
    { label: 'Verify Email', path: '/signup/verify-email' },
    { label: 'Completed', path: '/signup/completed' },
  ];

  // Update currentIndex based on location
  useEffect(() => {
    const newIndex = steps.findIndex((step) => location.pathname === step.path);
    const activeIndex = newIndex === -1 ? 0 : newIndex;
    if (activeIndex !== currentIndex) {
      setPreviousIndex(currentIndex);
      setCurrentIndex(activeIndex);
    }
  }, [location.pathname]);

  // Animation variants for the node
  const nodeVariants = {
    inactive: { scale: 1, opacity: 0.7, backgroundColor: '#ccc' },
    active: { scale: 1.1, opacity: 1, backgroundColor: '#ffae00' },
    completed: {
      scale: 1,
      opacity: 1,
      backgroundColor: '#ffae00',
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
  };

  // Animation variants for the line
  const lineVariants = {
    inactive: { width: '0%' },
    completed: { width: '100%', backgroundColor: '#ffae00', transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  return (
    <div className={signup.progressBar}>
      {steps.map((step, index) => (
        <div key={index} className={signup.progressStep}>
          <motion.div
            className={signup.progressNode}
            variants={nodeVariants}
            initial="inactive"
            animate={
              index < currentIndex
                ? 'completed'
                : index === currentIndex
                ? 'active'
                : 'inactive'
            }
            // Only animate when transitioning to this state
            transition={
              index === currentIndex || index === previousIndex
                ? { duration: 0.5 }
                : { duration: 0 }
            }
          >
            {index + 1}
          </motion.div>
          <span className={signup.progressLabel}>{step.label}</span>
          {index < steps.length - 1 && (
            <motion.div
              className={clsx(signup.progressLine)}
              variants={lineVariants}
              initial={index < currentIndex ? 'completed' : 'inactive'} // Persist completed state
              animate={index < currentIndex ? 'completed' : 'inactive'}
              // Only animate when this line completes
              transition={index === previousIndex ? { duration: 0.5 } : { duration: 0 }}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;