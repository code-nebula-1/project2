import styles from "../page.module.css";

export default function Contact() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Get Involved</h1>
      </header>

      <main className={styles.main}>
        <section className={styles.welcome}>
          <h2>Join Our Team</h2>
          <p>
            We're always looking for passionate individuals to collaborate with
            us. Whether you're a student, researcher, or industry partner, we'd
            love to hear from you.
          </p>
        </section>

        <section className={styles.quickInfo}>
          <div className={styles.infoCard}>
            <h3>For Students</h3>
            <p>Interested in joining our lab as a researcher or intern?</p>
            <p>
              We welcome undergraduate and graduate students who are passionate
              about research.
            </p>
            <p>
              <strong>Email:</strong> students@lab.edu
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>For Collaborators</h3>
            <p>Looking to partner on a research project?</p>
            <p>
              We're open to collaborations with other institutions and industry
              partners.
            </p>
            <p>
              <strong>Email:</strong> collaborate@lab.edu
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>General Inquiries</h3>
            <p>Have questions about our work or lab?</p>
            <p>Feel free to reach out with any questions or comments.</p>
            <p>
              <strong>Email:</strong> info@lab.edu
            </p>
          </div>
        </section>

        <section className={styles.welcome}>
          <h2>Visit Us</h2>
          <p>
            <strong>Location:</strong> Science Building, Room 301
          </p>
          <p>
            <strong>UMass Lowell</strong>
          </p>
        </section>

        <section className={styles.welcome}>
          <h2>What We Look For</h2>
          <ul>
            <li>Enthusiasm for research and learning</li>
            <li>Strong work ethic and dedication</li>
            <li>Ability to work collaboratively</li>
            <li>Creative problem-solving skills</li>
            <li>Commitment to excellence</li>
          </ul>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Research Lab. All rights reserved.</p>
      </footer>
    </div>
  );
}
