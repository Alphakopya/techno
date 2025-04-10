import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { NavLink, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaCode, FaBars, FaUserCircle } from 'react-icons/fa'; // Added FaUserCircle
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion } from 'framer-motion';
import styles from './Sidebar.module.scss';

const Sidebar = () => {
  const { token, userRole, userName, loading, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(true); // Sidebar toggle
  const [dropdowns, setDropdowns] = useState({}); // Submenu toggles
  const [userDropupOpen, setUserDropupOpen] = useState(false); // Dropup toggle
  const location = useLocation();

  // Mock user data (replace with real auth data in your app)
  const user = {
    name: userName || 'Guest',
    role: userRole || 'guest',
  };

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
    setDropdowns({});
    setUserDropupOpen(false); // Close dropup when toggling sidebar
  };

  const toggleDropdown = (key) => {
    if (isOpen) {
      setDropdowns((prev) => ({ ...prev, [key]: !prev[key] }));
    } else {
      setIsOpen(true);
      setDropdowns({ [key]: true });
    }
  };

  const toggleUserDropup = () => {
    if (isOpen) {
      setUserDropupOpen((prev) => !prev);
    } else {
      setIsOpen(true);
      setUserDropupOpen(true);
    }
  };

  const handleLogout = () => {
    logout();  // Call the logout function from context
  };
  const sidebarItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: <FaTachometerAlt /> },
    {
      label: 'Users',
      icon: <FaUsers />,
      subItems: [
        { label: 'All Users', path: '/admin/users' },
        { label: 'Add User', path: '/admin/users/create' },
        { label: 'Progress Overview', path: '/admin/users/progress/:userId' },
        { label: 'Roles & Permissions', path: '/admin/users/roles' },
      ],
    },
    {
      label: 'Challenges',
      icon: <FaCode />,
      subItems: [
        { label: 'All Challenges', path: '/admin/challenges' },
        { label: 'Add Challenge', path: '/admin/challenges/create' },
        { label: 'AI Problem Bank', path: '/admin/challenges/ai-bank' },
        { label: 'Review Submissions', path: '/admin/challenges/submissions' },
      ],
    },
  ];

  const userDropupItems = [
    { label: 'Profile', path: '/admin/profile' },
    { label: 'Logout', path: '#', onClick: handleLogout }, // Replace with real logout logic
  ];

  const sidebarVariants = {
    open: { width: '300px', transition: { duration: 0.1, ease: 'easeInOut' } },
    closed: { width: '60px', transition: { duration: 0.1, ease: 'easeInOut' } },
  };

  const isSubMenuActive = (subItems) => {
    return subItems.some((subItem) => location.pathname === subItem.path);
  };

  return (
    <motion.nav
      className={`${styles.sidebar} ${!isOpen ? styles.close : ''}`}
      initial="open"
      animate={isOpen ? 'open' : 'closed'}
      variants={sidebarVariants}
    >
      <ul className={styles.sidebarList}>
        <li className={styles.toggleItem}>
          <button onClick={toggleSidebar} className={styles.toggleBtn}>
            <FaBars />
          </button>
        </li>
        {sidebarItems.map((item, index) => {
          const isActive =
            location.pathname === item.path || (item.subItems && isSubMenuActive(item.subItems));

          return (
            <li key={index} className={styles.sidebarItem}>
              {item.subItems ? (
                <>
                  <button
                    className={`${styles.dropdownBtn} ${dropdowns[item.label] ? styles.rotate : ''} ${isActive ? styles.active : ''}`}
                    onClick={() => toggleDropdown(item.label)}
                  >
                    <span className={styles.icon}>{item.icon}</span>
                    {isOpen && (
                      <>
                        <span className={styles.label}>{item.label}</span>
                        <span className={styles.arrow}>
                          {dropdowns[item.label] ? <IoIosArrowDown /> : <IoIosArrowUp />}
                        </span>
                      </>
                    )}
                  </button>
                  <ul
                    className={`${styles.subMenu} ${dropdowns[item.label] && isOpen ? styles.show : ''}`}
                  >
                    {item.subItems.map((subItem, subIndex) => (
                      <li key={subIndex}>
                        <NavLink
                          to={subItem.path}
                          end
                          className={({ isActive }) =>
                            `${styles.subMenuLink} ${isActive ? styles.active : ''}`
                          }
                        >
                          {subItem.label}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <NavLink
                  to={item.path}
                  end
                  className={({ isActive }) =>
                    `${styles.sidebarLink} ${isActive ? styles.active : ''}`
                  }
                >
                  <span className={styles.icon}>{item.icon}</span>
                  {isOpen && <span className={styles.label}>{item.label}</span>}
                </NavLink>
              )}
            </li>
          );
        })}
      </ul>

      {/* User Info with Dropup */}
      <div className={styles.userSection}>
        <button
          className={`${styles.userBtn} ${userDropupOpen ? styles.active : ''}`}
          onClick={toggleUserDropup}
        >
          <span className={styles.userIcon}><FaUserCircle /></span>
          {isOpen && (
            <div className={styles.userInfo}>
              <div className={styles.userDetails}>
                <span className={styles.userName}>{user.name}</span>
                <span className={styles.userRole}>{user.role}</span>
              </div>
              <span className={styles.userArrow}>
                {userDropupOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </span>
            </div>
          )}
        </button>
        <ul
          className={`${styles.userDropup} ${userDropupOpen && isOpen ? styles.show : ''}`}
        >
          {userDropupItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.path}
                className={styles.dropupLink}
                onClick={item.onClick || (() => {})}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </motion.nav>
  );
};

export default Sidebar;