import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Welcome to Our Research Lab</h1>
      </header>

      <main className={styles.main}>
        <section className={styles.welcome}>
          <h2>Welcome!</h2>
          <p>
            We are a dynamic research team dedicated to innovative projects and
            collaborative learning.
          </p>
        </section>

        <section className={styles.quickInfo}>
          <div className={styles.infoCard}>
            <h3>Our Mission</h3>
            <p>
              To foster creativity and innovation through collaborative
              research.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>Current Projects</h3>
            <p>Explore our latest research initiatives and developments.</p>
          </div>

          <div className={styles.infoCard}>
            <h3>Team Members</h3>
            <p>Meet the talented individuals who make up our research team.</p>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Research Lab. All rights reserved.</p>
      </footer>
    </div>
  );
}
