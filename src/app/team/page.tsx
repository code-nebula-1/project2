import styles from "../page.module.css";

export default function Team() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Our Team</h1>
      </header>

      <main className={styles.main}>
        <section className={styles.welcome}>
          <h2>Meet the Team</h2>
          <p>
            Get to know the talented individuals who make our research possible.
          </p>
        </section>

        <section className={styles.quickInfo}>
          <div className={styles.infoCard}>
            <h3>Dr. Jane Smith</h3>
            <p>
              <strong>Principal Investigator</strong>
            </p>
            <p>
              Specializes in computational research and data analysis.
              Passionate about mentoring students.
            </p>
            <p>
              <strong>Interests:</strong> Machine Learning, Data Science
            </p>
            <p>
              <strong>Contact:</strong> jane.smith@lab.edu
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>John Doe</h3>
            <p>
              <strong>Graduate Researcher</strong>
            </p>
            <p>
              PhD candidate focusing on innovative algorithms and system design.
            </p>
            <p>
              <strong>Interests:</strong> Algorithms, Software Engineering
            </p>
            <p>
              <strong>Contact:</strong> john.doe@lab.edu
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>Sarah Johnson</h3>
            <p>
              <strong>Postdoctoral Fellow</strong>
            </p>
            <p>
              Researching advanced methodologies and their real-world
              applications.
            </p>
            <p>
              <strong>Interests:</strong> Applied Research, Innovation
            </p>
            <p>
              <strong>Contact:</strong> sarah.j@lab.edu
            </p>
          </div>
        </section>

        <section className={styles.quickInfo}>
          <div className={styles.infoCard}>
            <h3>Mike Chen</h3>
            <p>
              <strong>Undergraduate Researcher</strong>
            </p>
            <p>
              Computer Science major contributing to data collection and
              analysis.
            </p>
            <p>
              <strong>Interests:</strong> Web Development, AI
            </p>
            <p>
              <strong>Contact:</strong> mike.chen@lab.edu
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>Emily Rodriguez</h3>
            <p>
              <strong>Lab Manager</strong>
            </p>
            <p>
              Coordinates lab operations and facilitates collaboration between
              team members.
            </p>
            <p>
              <strong>Interests:</strong> Project Management, Team Building
            </p>
            <p>
              <strong>Contact:</strong> emily.r@lab.edu
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>Alex Kim</h3>
            <p>
              <strong>Research Assistant</strong>
            </p>
            <p>
              Supporting ongoing projects with technical expertise and creative
              solutions.
            </p>
            <p>
              <strong>Interests:</strong> Systems Design, Research
            </p>
            <p>
              <strong>Contact:</strong> alex.kim@lab.edu
            </p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Research Lab. All rights reserved.</p>
      </footer>
    </div>
  );
}
