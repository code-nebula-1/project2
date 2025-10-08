import styles from "../page.module.css";

export default function Mission() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Our Mission</h1>
      </header>

      <main className={styles.main}>
        <section className={styles.welcome}>
          <h2>What We Stand For</h2>
          <p>
            Our research lab is dedicated to fostering innovation, creativity,
            and collaboration in the pursuit of groundbreaking discoveries and
            meaningful contributions to our field.
          </p>
        </section>

        <section className={styles.quickInfo}>
          <div className={styles.infoCard}>
            <h3>Innovation</h3>
            <p>
              We push the boundaries of what's possible through creative
              problem-solving and cutting-edge research.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>Collaboration</h3>
            <p>
              We believe in the power of teamwork and diverse perspectives to
              drive meaningful progress.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>Excellence</h3>
            <p>
              We maintain the highest standards in our research, methodologies,
              and outcomes.
            </p>
          </div>
        </section>

        <section className={styles.welcome}>
          <h2>Our Goals</h2>
          <ul>
            <li>Conduct impactful research that advances our field</li>
            <li>Foster a supportive and inclusive learning environment</li>
            <li>
              Collaborate with partners across disciplines and institutions
            </li>
            <li>Mentor the next generation of researchers</li>
            <li>Share our findings with the broader community</li>
          </ul>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Research Lab. All rights reserved.</p>
      </footer>
    </div>
  );
}
