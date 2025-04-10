import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDown } from "react-icons/io5";
import styles from "./StudentNavBar.module.scss";

const StudentNavBar = () => {
  const { userName, userRole, logout } = useAuth();
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Sticky navbar detection
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setIsSticky(window.scrollY > 100);
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);

  const handleLogout = () => {
    logout();
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeInOut" } },
    exit: { opacity: 0, y: 10, transition: { duration: 0.2 } },
  };

  return (
    <motion.nav
      className={`${styles.navbar} ${isSticky ? styles["navbar-sticky"] : ""}`}
      transition={{ duration: 0.5 }}
    >
      <div className={styles["navbar-brand"]}>
        <Link to="/student" className={styles["navbar-logo"]} aria-label="TechnoMatch Student Dashboard">
          TechnoMatch
        </Link>
      </div>

      <>
        <button
          className={styles["navbar-toggle"]}
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          <span className={styles["navbar-toggle-icon"]}>{isMenuOpen ? "✕" : "☰"}</span>
        </button>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className={styles["navbar-menu"]}
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <ul className={styles["navbar-links"]}>
                <li className={styles["navbar-item"]}>
                  <Link
                    to="/student/dashboard"
                    className={`${styles["navbar-link"]} ${
                      location.pathname === "/student/dashboard" ? styles["navbar-link-active"] : ""
                    }`}
                  >
                    Dashboard
                  </Link>
                </li>
                <li className={styles["navbar-item"]}>
                  <Link
                    to="/student/courses"
                    className={`${styles["navbar-link"]} ${
                      location.pathname === "/student/courses" ? styles["navbar-link-active"] : ""
                    }`}
                  >
                    Courses
                  </Link>
                </li>
                <li className={styles["navbar-item"]}>
                  <Link
                    to="/student/profile"
                    className={`${styles["navbar-link"]} ${
                      location.pathname === "/student/profile" ? styles["navbar-link-active"] : ""
                    }`}
                  >
                    Profile
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Menu */}
        <div className={`${styles["navbar-menu"]} ${styles["navbar-menu-desktop"]}`}>
          <ul className={styles["navbar-links"]}>
          <li className={styles["navbar-item"]}>
              <Link
                to="/student/classes"
                className={`${styles["navbar-link"]} ${
                  location.pathname === "/student/classes" ? styles["navbar-link-active"] : ""
                }`}
              >
                Classes
              </Link>
            </li>
          <li className={styles["navbar-item"]}>
              <Link
                to="/student/challenges"
                className={`${styles["navbar-link"]} ${
                  location.pathname === "/student/challenges" ? styles["navbar-link-active"] : ""
                }`}
              >
                Challenges
              </Link>
            </li>
            <li className={styles["navbar-item"]}>
              <Link
                to="/student/matchmaking"
                className={`${styles["navbar-link"]} ${
                  location.pathname === "/student/matchmaking" ? styles["navbar-link-active"] : ""
                }`}
              >
                Play
              </Link>
            </li>
            <li className={styles["navbar-item"]}>
              <Link
                to="/student/rooms"
                className={`${styles["navbar-link"]} ${
                  location.pathname === "/student/rooms" ? styles["navbar-link-active"] : ""
                }`}
              >
                Rooms
              </Link>
            </li>
            <li className={styles["navbar-item"]}>
              <Link
                to="/student/rooms"
                className={`${styles["navbar-link"]} ${
                  location.pathname === "/student/rooms" ? styles["navbar-link-active"] : ""
                }`}
              >
                Shop
              </Link>
            </li>
          </ul>
        </div>

        {/* Profile Section */}
        <div className={styles["navbar-profile"]}>
          <div className={styles["profile-icon"]}></div>
          <div className={styles["profile-info"]}>
            <span className={styles["profile-name"]}>{userName}</span>
            <span className={styles["profile-role"]}>{userRole}</span>
          </div>
          <button
            className={styles["profile-dropdown"]}
            onClick={toggleProfileDropdown}
            aria-label="Toggle profile dropdown"
            aria-expanded={isProfileDropdownOpen}
          >
            <IoChevronDown />
          </button>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {isProfileDropdownOpen && (
              <motion.div
                className={styles["profile-dropdown-menu"]}
                variants={dropdownVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <ul className={styles["dropdown-links"]}>
                  <li className={styles["dropdown-item"]}>
                    <Link to="/student/profile" className={styles["dropdown-link"]}>
                      Profile
                    </Link>
                  </li>
                  <li className={styles["dropdown-item"]}>
                    <button
                      onClick={handleLogout}
                      className={styles["dropdown-link"]}
                      aria-label="Logout"
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </>
    </motion.nav>
  );
};

export default StudentNavBar;