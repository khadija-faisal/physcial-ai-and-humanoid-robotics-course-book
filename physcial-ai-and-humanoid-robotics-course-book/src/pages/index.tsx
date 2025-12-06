import type {ReactNode} from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

interface ModuleCard {
  title: string;
  link: string;
  description: string;
  icon: string;
}

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.navyBannerHero)}>
      <div className={styles.heroBg}></div>
      <div className="container" style={{position: 'relative', zIndex: 1}}>
        <Heading as="h1" className={styles.heroTitle}>
          Physical AI & Humanoid Robotics
        </Heading>
        <p className={styles.heroSubtitle}>
          From ROS 2 to VLA Systems: Master embodied intelligence from simulation to physical robots
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--lg', styles.ctaBtnPrimary)}
            to="/docs/intro">
            Start Learning
          </Link>
          <Link
            className={clsx('button button--lg', styles.ctaBtnSecondary)}
            to="https://github.com/panaversity/physical-ai-humanoid-robotics-course-book"
            target="_blank">
            View on GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

function ModuleGrid() {
  const modules: ModuleCard[] = [
    {
      title: 'Module 1: Robotic Nervous System',
      link: '/docs/module-01-foundations/week-01',
      description: 'Introduction to Physical AI, Embodied Intelligence, and Sensor Systems (LIDAR, IMU, Cameras)',
      icon: '🧠',
    },
    {
      title: 'Module 2: Digital Twin',
      link: '/docs/module-02-ros2/week-03',
      description: 'ROS 2 Fundamentals, URDF, Gazebo Physics Simulation, and Sensor Simulation',
      icon: '🤖',
    },
    {
      title: 'Module 3: AI-Robot Brain',
      link: '/docs/module-03-simulation/week-06',
      description: 'NVIDIA Isaac Sim, Isaac ROS VSLAM, Navigation, and Reinforcement Learning',
      icon: '⚡',
    },
    {
      title: 'Module 4: Vision-Language-Action',
      link: '/docs/module-04-humanoid/week-11',
      description: 'Humanoid Locomotion, Voice Commands, Cognitive Planning, and Capstone Project',
      icon: '🎯',
    },
  ];

  return (
    <section className={styles.modulesSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Curriculum Overview
        </Heading>
        <div className={styles.moduleGrid}>
          {modules.map((module, idx) => (
            <Link
              key={idx}
              to={module.link}
              className={clsx(styles.moduleCard, 'card')}>
              <div className={styles.moduleIcon}>{module.icon}</div>
              <div className={styles.moduleCardContent}>
                <h3>{module.title}</h3>
                <p>{module.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="A comprehensive 13-week textbook for teaching Physical AI and Humanoid Robotics with ROS 2, Gazebo, NVIDIA Isaac Sim, and Vision-Language-Action systems.">
      <HomepageHeader />
      <main>
        <ModuleGrid />
      </main>
    </Layout>
  );
}
