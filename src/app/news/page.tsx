import styles from "../page.module.css";

export default function News() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Lab News & Updates</h1>
      </header>

      <main className={styles.main}>
        <section className={styles.welcome}>
          <h2>Latest Updates</h2>
          <p>
            Stay informed about our recent achievements, events, and
            announcements.
          </p>
        </section>

        <section className={styles.quickInfo}>
          <div className={styles.infoCard}>
            <h3>New Publication Released</h3>
            <p>
              <strong>October 2024</strong>
            </p>
            <p>
              Our team published a groundbreaking paper in a leading journal.
              The research explores innovative methodologies that could
              transform the field.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>Welcome New Team Members</h3>
            <p>
              <strong>September 2024</strong>
            </p>
            <p>
              We&apos;re excited to welcome three new researchers to our lab
              this fall. Their diverse backgrounds will bring fresh perspectives
              to our work.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>Conference Presentation</h3>
            <p>
              <strong>August 2024</strong>
            </p>
            <p>
              Dr. Smith presented our latest findings at the International
              Research Conference. The presentation was well-received by the
              academic community.
            </p>
          </div>
        </section>

        <section className={styles.quickInfo}>
          <div className={styles.infoCard}>
            <h3>Grant Award</h3>
            <p>
              <strong>July 2024</strong>
            </p>
            <p>
              Our lab received a significant grant to fund the next phase of our
              research. This will enable us to expand our team and resources.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>Student Achievement</h3>
            <p>
              <strong>June 2024</strong>
            </p>
            <p>
              Congratulations to our graduate student who won the Best Paper
              Award at the regional symposium for their outstanding research.
            </p>
          </div>

          <div className={styles.infoCard}>
            <h3>Lab Anniversary</h3>
            <p>
              <strong>May 2024</strong>
            </p>
            <p>
              We celebrated our lab&apos;s 5th anniversary with a special event.
              Thank you to everyone who has been part of our journey!
            </p>
          </div>
        </section>

        <section className={styles.welcome}>
          <h2>Upcoming Events</h2>
          <ul>
            <li>
              <strong>November 2024:</strong> Open House for prospective
              students
            </li>
            <li>
              <strong>December 2024:</strong> End-of-year lab symposium
            </li>
            <li>
              <strong>January 2025:</strong> Workshop on new research
              methodologies
            </li>
          </ul>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Research Lab. All rights reserved.</p>
      </footer>
    </div>
  );
}
