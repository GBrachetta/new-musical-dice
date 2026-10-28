import AboutSection from "@/components/AboutSection";
import AnimatedDisclosure from "@/components/AnimatedDisclosure";
import BackToTop from "@/components/BackToTop";
import ContactSection from "@/components/ContactSection";
import HistoricalImage from "@/components/HistoricalImage";
import MusicGame from "@/components/MusicGame";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <header
          className="intro container"
          id="title"
        >
          <p className="eyebrow">Guillermo Brachetta&apos;s</p>
          <h1>Musical Dice</h1>
          <p className="intro-description">
            Inspired by Mozart&apos;s musical dice game, create a minuetto from
            fragments of twelve original compositions.
          </p>
          <a
            className="intro-link"
            href="#mozart"
          >
            About Mozart&apos;s game
          </a>
        </header>
        <section
          aria-label="Musical dice game"
          className="game-section"
          id="game"
        >
          <MusicGame />
        </section>
        <div className="programme-notes container">
          <section
            aria-labelledby="rules-title"
            className="notes-section instructions-section"
            id="rules"
          >
            <div className="notes-heading">
              <h2 id="rules-title">How it works</h2>
              <p>
                Choose from the original minuetti and hear how their fragments
                fit together.
              </p>
            </div>
            <ol className="instructions-list">
              <li>
                <h3>Listen</h3>
                <p>Play any of the twelve original minuetti.</p>
              </li>
              <li>
                <h3>Choose</h3>
                <p>Use the row switches to include or exclude pieces.</p>
              </li>
              <li>
                <h3>Randomise</h3>
                <p>Create a composition with one fragment from each column.</p>
              </li>
              <li>
                <h3>Play</h3>
                <p>
                  Listen to your minuetto, or explore individual fragments in
                  the grid.
                </p>
              </li>
            </ol>
          </section>

          <section
            aria-labelledby="composition-title"
            className="notes-section composition-notes"
            id="my-version"
          >
            <div className="notes-heading">
              <h2 id="composition-title">About the music</h2>
              <p>Original compositions by Guillermo Brachetta.</p>
            </div>
            <div className="composition-copy">
              <p className="paragraphs">
                I decided to compose 12 different pieces, each containing 24
                measures in triple time. They all follow the same harmonic
                pattern and could therefore be considered a single theme with 11
                variations.
              </p>

              <p className="paragraphs">
                I divided each of the pieces into 12 fragments (meaning that
                each fragment consists of 2 measures) and composed them in a way
                that any fragment can be connected to, or followed by a fragment
                from any of the other pieces.
              </p>

              <p className="paragraphs">
                Each piece is structured with a part &apos;A&apos; of 4
                fragments (8 measures) and a part &apos;B&apos; of 8 fragments
                (16 measures).
              </p>

              <div
                aria-label="Part A: 4 fragments, 8 measures. Part B: 8 fragments, 16 measures."
                className="musical-form"
              >
                <div>
                  <strong>Part A</strong>
                  <span>4 fragments · 8 measures</span>
                </div>
                <div>
                  <strong>Part B</strong>
                  <span>8 fragments · 16 measures</span>
                </div>
              </div>
              <p className="combinations-note">
                With all twelve pieces included, there are{" "}
                <strong>8,916,100,448,256</strong> possible combinations.
              </p>
            </div>
          </section>

          <section
            aria-labelledby="mozart-title"
            className="notes-section mozart-notes"
            id="mozart"
          >
            <div className="mozart-introduction">
              <div className="notes-heading">
                <h2 id="mozart-title">Mozart&apos;s musical dice game</h2>
              </div>
              <p>
                A <em>Musikalisches Würfelspiel</em>, or musical dice game,
                assembles music from precomposed fragments chosen by chance.
              </p>
              <p>
                These games were popular in eighteenth-century Europe. The
                best-known version is attributed to Mozart, although his
                authorship has not been authenticated.
              </p>
              <AnimatedDisclosure title="Mozart’s version">
                <div className="history-copy">
                  <p className="paragraphs">
                    The most well-known was published in 1792, by Mozart&apos;s
                    publisher Nikolaus Simrock in Berlin (K. 294dK3 or K.
                    516fK6). The game was attributed to Mozart, but this
                    attribution has not been authenticated. The dice rolls
                    randomly selected small sections of music, which would be
                    patched together to create a musical piece. This game is
                    capable of producing 11 ^ 16 = 45.949.729.863.572.161
                    different yet similar waltzes. Some measures have only one
                    possibility no matter what the roll of the dice (measures
                    8/16) while other measures have a different possibility for
                    each roll (measures 1/16).
                  </p>

                  <p className="paragraphs">
                    Mozart&apos;s manuscript, written in 1787, consisting of 176
                    one-bar fragments of music, appears to be some kind of game
                    or system for constructing music out of two-bar fragments,
                    but contains no instructions and there is no evidence that
                    dice were involved.
                  </p>

                  <p>The titles of the supposed Mozart compositions are:</p>

                  <ul className="pl-3">
                    <li className="paragraphs">
                      <em>
                        Anleitung zum Componieren von Walzern so viele man will
                        vermittelst zweier Würfel, ohne etwas von der Musik oder
                        Composition zu verstehen
                      </em>{" "}
                      (&quot;Instructions for the composition of as many waltzes
                      as one desires with two dice, without understanding
                      anything about music or composition&quot;)
                    </li>

                    <li>
                      <em>Anleitung zum Componieren von Polonaisen</em> (&quot;
                      Instructions for the composition of polonaises&quot;)
                    </li>
                  </ul>
                </div>
              </AnimatedDisclosure>
              <AnimatedDisclosure
                id="history"
                title="The origins of musical dice games"
              >
                <div className="history-copy">
                  <p className="paragraphs">
                    A <em>Musikalisches Würfelspiel</em> (&quot;musical dice
                    game&quot;) was a technique that randomly
                    &apos;generated&apos; music from precomposed options. These
                    &apos;games&apos; were quite popular throughout Western
                    Europe in the 18th century. Several different games were
                    devised, some that did not require dice, but merely
                    &apos;choosing a random number.&apos;
                  </p>

                  <p className="paragraphs">
                    The earliest example is Johann Philipp Kirnberger&apos;s{" "}
                    <em>
                      Der allezeit fertige Menuetten- und Polonaisencomponist
                    </em>{" "}
                    (&quot;The Ever-Ready Minuet and Polonaise Composer&quot;)
                    (1757 [1st edition; revised 2nd 1783]). Examples by well
                    known composers include C. P. E. Bach&apos;s{" "}
                    <em>
                      Einfall, einen doppelten Contrapunct in der Octave von
                      sechs Tacten zu machen, ohne die Regeln davon zu wissen
                    </em>{" "}
                    (&quot;A method for making six bars of double counterpoint
                    at the octave without knowing the rules&quot;) (1758) and
                    Maximilian Stadler&apos;s{" "}
                    <em>
                      Table pour composer des minuets et des Trios à la infinie;
                      avec deux dez à jouer
                    </em>{" "}
                    (&quot;A table for composing minuets and trios to infinity,
                    by playing with two dice&quot;) (1780).
                  </p>

                  <p>
                    The way these games work may be understood in analogy to
                    sentence construction:
                  </p>

                  <div className="row justify-content-center mb-4 mt-5">
                    <div className="col-12">
                      <table className="history-table">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">A</th>
                            <th scope="col">B</th>
                            <th scope="col">C</th>
                            <th scope="col">D</th>
                          </tr>
                        </thead>

                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>The cow</td>
                            <td>ran</td>
                            <td>past</td>
                            <td>the field.</td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>The pig</td>
                            <td>walked</td>
                            <td>through</td>
                            <td>the yard.</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td>The sheep</td>
                            <td>ran</td>
                            <td>into</td>
                            <td>the marsh.</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <p className="paragraphs">
                    A die is rolled for each column in the table, and the result
                    of the die roll determines which word in that column is
                    used. For example, rolling 2,3,1,3 would give the expression
                    &quot;The pig ran past the marsh&quot;. Each progression is
                    essentially the same, although the number of available
                    outcomes in each column may differ. The outcomes are also
                    variations of each other rather than being entirely
                    different. In this example, the outcomes within each column
                    each represent the same part of speech (noun/verb/etc),
                    therefore the constructed sentence makes sense whichever way
                    it is put together.
                  </p>
                </div>
              </AnimatedDisclosure>
            </div>
            <HistoricalImage />
          </section>
        </div>
      </main>
      <BackToTop />
      <footer className="page-footer">
        <div className="footer-main container">
          <div className="footer-author">
            <p className="footer-label">Musical Dice</p>
            <h2>Guillermo Brachetta</h2>
            <p>All twelve minuetti were composed for this game.</p>
            <nav
              aria-label="About the author"
              className="footer-links"
            >
              <AboutSection />
              <a
                href="https://www.gbrachetta.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Website
              </a>
              <a
                href="https://github.com/GBrachetta/"
                rel="noopener noreferrer"
                target="_blank"
              >
                Projects
              </a>
            </nav>
            <p className="footer-copyright">
              &copy; {new Date().getFullYear()} Guillermo Brachetta
            </p>
          </div>
          <div className="footer-contact-block">
            <p className="footer-label">Get in touch</p>
            <address className="footer-contact">
              <a
                className="footer-email"
                href="mailto:brachetta@me.com"
              >
                brachetta@me.com
              </a>
              <a href="tel:+31651063002">+31 6 51 06 30 02</a>
              <span>
                Marijkelaan 12, 6074AP Melick
                <br />
                The Netherlands
              </span>
            </address>
            <ContactSection />
          </div>
        </div>
      </footer>
    </>
  );
}
