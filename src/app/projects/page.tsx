import styles from "../page.module.css";

export default function Projects() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Our Projects</h1>
      </header>

      <main className={styles.main}>
        <section className={styles.welcome}>
          <h2>Current Research</h2>
          <p>Explore our ongoing projects and research initiatives.</p>
        </section>

        <section className={styles.quickInfo}>
          <div className={styles.infoCard}>
            <h3>Project Alpha</h3>
            <p>
              A groundbreaking study exploring innovative approaches to complex
              problems.
            </p>
            <p>
              <strong>Status:</strong> Active
            </p>
            <p>
              <strong>Started:</strong> January 2024
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>Project Beta</h3>
            <p>
              Collaborative research initiative focused on interdisciplinary
              solutions.
            </p>
            <p>
              <strong>Status:</strong> Active
            </p>
            <p>
              <strong>Started:</strong> March 2024
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>Project Gamma</h3>
            <p>
              Long-term investigation into emerging technologies and their
              applications.
            </p>
            <p>
              <strong>Status:</strong> Planning
            </p>
            <p>
              <strong>Expected Start:</strong> Q1 2025
            </p>
          </div>
        </section>

        <section className={styles.welcome}>
          <h2>Past Projects</h2>
          <div className={styles.quickInfo}>
            <div className={styles.infoCard}>
              <h3>Project Legacy</h3>
              <p>
                Completed research that laid the foundation for our current
                work.
              </p>
              <p>
                <strong>Status:</strong> Completed 2023
              </p>
            </div>

            <div className={styles.infoCard}>
              <h3>Project Pioneer</h3>
              <p>
                Initial exploration that opened new avenues of investigation.
              </p>
              <p>
                <strong>Status:</strong> Completed 2022
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Research Lab. All rights reserved.</p>
      </footer>
    </div>
  );
}
