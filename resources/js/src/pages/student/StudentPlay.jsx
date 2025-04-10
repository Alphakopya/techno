import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPlayCircle, FaSpinner } from "react-icons/fa";
import styles from "./StudentPlay.module.scss";

const StudentPlay = () => {
  const [isInQueue, setIsInQueue] = useState(false);
  const [queueTime, setQueueTime] = useState(0);
  const [selectedMode, setSelectedMode] = useState("normal"); // Default mode: Normal Match

  // Handle joining/leaving the queue
  const handleQueueToggle = () => {
    if (isInQueue) {
      setIsInQueue(false);
      setQueueTime(0);
    } else {
      setIsInQueue(true);
      startQueueTimer();
    }
  };

  // Simulate queue timer
  const startQueueTimer = () => {
    const interval = setInterval(() => {
      setQueueTime((prev) => {
        if (!isInQueue) {
          clearInterval(interval);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);
  };

  // Handle mode selection
  const handleModeSelect = (mode) => {
    if (mode !== "contest" && !isInQueue) {
      setSelectedMode(mode);
    }
  };

  // Animation variants
  const containerVariants = {
    initial: { opacity: 0, y: 0 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const buttonVariants = {
    tap: { scale: 0.98 },
  };

  const statusVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className={styles.studentPlay}
      variants={containerVariants}
      initial="initial"
      animate="animate"
    >
      <div className={styles.playContainer}>
        <h1 className={styles.title}>Matchmaking</h1>

        {/* Mode Selection */}
        <div className={styles.modeSelection}>
          <motion.button
            className={`${styles.modeButton} ${selectedMode === "normal" ? styles.active : ""}`}
            onClick={() => handleModeSelect("normal")}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            disabled={isInQueue}
          >
            Normal Match
          </motion.button>
          <motion.button
            className={`${styles.modeButton} ${selectedMode === "competitive" ? styles.active : ""}`}
            onClick={() => handleModeSelect("competitive")}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            disabled={isInQueue}
          >
            Competitive Match
          </motion.button>
          <motion.button
            className={`${styles.modeButton} ${styles.disabled}`}
            variants={buttonVariants}
            disabled={true}
          >
            Contest <span className={styles.comingSoon}>(Available Soon)</span>
          </motion.button>
        </div>

        {/* Queue Button with Status Popup */}
        <div className={styles.queueWrapper}>
          {isInQueue && (
            <motion.div
              className={styles.queueStatus}
              variants={statusVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <FaSpinner className={styles.spinner} />
              <span>{`${Math.floor(queueTime / 60)}:${(queueTime % 60)
                .toString()
                .padStart(2, "0")}`}</span>
            </motion.div>
          )}
          <motion.button
            className={`${styles.queueButton} ${isInQueue ? styles.cancelButton : ""}`}
            onClick={handleQueueToggle}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            disabled={selectedMode === "contest"}
          >
            <FaPlayCircle className={styles.buttonIcon} />
            <span>{isInQueue ? "Cancel Queue" : "Join Queue"}</span>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default StudentPlay;