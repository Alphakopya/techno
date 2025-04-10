import React from 'react';
import { Outlet } from 'react-router-dom';
import StudentNavBar from '../common/StudentNavBar';
import styles from './StudentLayout.module.scss'; // Assuming you have a separate SCSS file for styling
const StudentLayout = () => {

  return (
    <div className="student-layout">
      <div className="layout-container">
        <StudentNavBar />
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default StudentLayout;