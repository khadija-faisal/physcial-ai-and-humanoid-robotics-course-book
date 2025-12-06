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
}

function HomepageHeader() {
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title">
          Physical AI & Humanoid Robotics Textbook
        </Heading>
        <p className="hero__subtitle">
          Master ROS 2, NVIDIA Isaac Sim, and VLA Systems.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/docs/intro">
            Start Reading
          </Link>
        </div>
      </div>
    </header>
  );
}

function ModuleGrid() {
  const modules: ModuleCard[] = [
    {
      title: 'Module 1: Foundations',
      link: '/docs/module-01-physical-ai/week-01-intro',
      description: 'Physical AI & Sensors',
    },
    {
      title: 'Module 2: ROS 2',
      link: '/docs/module-02-ros2/week-03-nodes',
      description: 'ROS 2 Fundamentals',
    },
    {
      title: 'Module 3: Simulation',
      link: '/docs/module-03-simulation/week-06-gazebo',
      description: 'Gazebo & Isaac Sim',
    },
    {
      title: 'Module 4: Humanoids',
      link: '/docs/module-04-humanoid/week-11-walking',
      description: 'VLA & Capstone',
    },
  ];

  return (
    <section className={styles.modulesSection}>
      <div className="container">
        <Heading as="h2" className={styles.sectionTitle}>
          Curriculum Modules
        </Heading>
        <div className={styles.moduleGrid}>
          {modules.map((module, idx) => (
            <Link
              key={idx}
              to={module.link}
              className={clsx(styles.moduleCard, 'card')}>
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
      description="Physical AI & Humanoid Robotics Learning Platform with Embedded RAG Chatbot">
      <HomepageHeader />
      <main>
        <ModuleGrid />
      </main>
    </Layout>
  );
}
