import Image from "next/image";

import AboutSection from "@/components/AboutSection";
import BackToTop from "@/components/BackToTop";
import ContactSection from "@/components/ContactSection";
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
          <p className="eyebrow">Guillermo Brachetta</p>
          <h1>Musical Dice</h1>
          <p className="intro-description">
            Inspired by Mozart&apos;s musical dice game, create a minuetto from
            fragments of twelve original compositions.
          </p>
          <a
            className="intro-link"
            href="#mozart"
          >
            About Mozart&apos;s game <span aria-hidden="true">↗</span>
          </a>
        </header>
        <section
          aria-label="Musical dice game"
          className="game-section"
          id="game"
        >
          <MusicGame />
        </section>
        {/* History */}
        <section className="history-section container">
          <div className="row">
            <div className="col">
              <h3
                className="titles my-4 pt-3"
                id="history"
              >
                The Original Game
              </h3>

              <p className="paragraphs">
                A <em>Musikalisches Würfelspiel</em> (&quot;musical dice
                game&quot;) was a technique that randomly &apos;generated&apos;
                music from precomposed options. These &apos;games&apos; were
                quite popular throughout Western Europe in the 18th century.
                Several different games were devised, some that did not require
                dice, but merely &apos;choosing a random number.&apos;
              </p>

              <p className="paragraphs">
                The earliest example is Johann Philipp Kirnberger&apos;s{" "}
                <em>Der allezeit fertige Menuetten- und Polonaisencomponist</em>{" "}
                (&quot;The Ever-Ready Minuet and Polonaise Composer&quot;) (1757
                [1st edition; revised 2nd 1783]). Examples by well known
                composers include C. P. E. Bach&apos;s{" "}
                <em>
                  Einfall, einen doppelten Contrapunct in der Octave von sechs
                  Tacten zu machen, ohne die Regeln davon zu wissen
                </em>{" "}
                (&quot;A method for making six bars of double counterpoint at
                the octave without knowing the rules&quot;) (1758) and
                Maximilian Stadler&apos;s{" "}
                <em>
                  Table pour composer des minuets et des Trios à la infinie;
                  avec deux dez à jouer
                </em>{" "}
                (&quot;A table for composing minuets and trios to infinity, by
                playing with two dice&quot;) (1780).
              </p>

              <p>
                The way these games work may be understood in analogy to
                sentence construction:
              </p>

              <div className="row justify-content-center mb-4 mt-5">
                <div className="col-12">
                  <table className="table-responsive table-striped table-dark table">
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
                A die is rolled for each column in the table, and the result of
                the die roll determines which word in that column is used. For
                example, rolling 2,3,1,3 would give the expression &quot;The pig
                ran past the marsh&quot;. Each progression is essentially the
                same, although the number of available outcomes in each column
                may differ. The outcomes are also variations of each other
                rather than being entirely different. In this example, the
                outcomes within each column each represent the same part of
                speech (noun/verb/etc), therefore the constructed sentence makes
                sense whichever way it is put together.
              </p>

              <h3
                className="titles my-4 pt-3"
                id="mozart"
              >
                Mozart&apos;s version
              </h3>

              <p className="paragraphs">
                The most well-known was published in 1792, by Mozart&apos;s
                publisher Nikolaus Simrock in Berlin (K. 294dK3 or K. 516fK6).
                The game was attributed to Mozart, but this attribution has not
                been authenticated. The dice rolls randomly selected small
                sections of music, which would be patched together to create a
                musical piece. This game is capable of producing 11 ^ 16 =
                45.949.729.863.572.161 different yet similar waltzes. Some
                measures have only one possibility no matter what the roll of
                the dice (measures 8/16) while other measures have a different
                possibility for each roll (measures 1/16).
              </p>

              <Image
                alt="Original Rules"
                className="img-fluid my-4"
                height={800}
                src="/assets/images/mozart-game.jpg"
                width={1200}
              />

              <p className="paragraphs">
                Mozart&apos;s manuscript, written in 1787, consisting of 176
                one-bar fragments of music, appears to be some kind of game or
                system for constructing music out of two-bar fragments, but
                contains no instructions and there is no evidence that dice were
                involved.
              </p>

              <p>The titles of the supposed Mozart compositions are:</p>

              <ul className="pl-3">
                <li className="paragraphs">
                  <em>
                    Anleitung zum Componieren von Walzern so viele man will
                    vermittelst zweier Würfel, ohne etwas von der Musik oder
                    Composition zu verstehen
                  </em>{" "}
                  (&quot;Instructions for the composition of as many waltzes as
                  one desires with two dice, without understanding anything
                  about music or composition&quot;)
                </li>

                <li>
                  <em>Anleitung zum Componieren von Polonaisen</em> (&quot;
                  Instructions for the composition of polonaises&quot;)
                </li>
              </ul>

              <h3
                className="titles my-4 pt-3"
                id="my-version"
              >
                My version
              </h3>

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

              <h3
                className="titles my-4 pt-3"
                id="rules"
              >
                The Instructions
              </h3>

              <p className="paragraphs mb-4">
                The rules of the game are very simple, and you are free to break
                them at any time!
              </p>

              <ul className="list-group">
                <li className="list-group-item">
                  Listen to any or all of the twelve original minuetti.
                </li>
                <li className="hr" />

                <li className="list-group-item">
                  From the row beneath, select which of the minuetti you would
                  like to include in the randomisation (suggestion: start with
                  all twelve!)
                </li>
                <li className="hr" />

                <li className="list-group-item">
                  Play your randomly generated minuetto, or click on the button
                  to create a new randomisation.
                </li>
                <li className="hr" />

                <li className="list-group-item">
                  You can click on the individual cells to listen to the two
                  measures corresponding to that cell.
                </li>
                <li className="hr" />

                <li className="list-group-item">
                  Have fun and remember: there are{" "}
                  <strong className="span-bold">8,916,100,448,256</strong>{" "}
                  possible combinations, so it&apos;s quite unlikely you will
                  hear the same piece ever again!
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>
      <BackToTop />

      {/* Footer */}
      <footer className="page-footer font-small mdb-color lighten-3 pt-4">
        <div className="text-md-left container text-center">
          <div className="row">
            <div className="col-md-4 col-lg-3 my-md-4 my-0 mb-1 mr-auto mt-4">
              <h4 className="font-weight-bold text-uppercase mb-4">
                Disclaimer
              </h4>
              <p>
                The <span className="span-bold">Musical Dice</span> was made
                with love and passion for educational purposes.
              </p>
              <p>All the music in this app was composed by the author.</p>
            </div>

            <div className="clearfix w-100 d-md-none hr" />

            <div className="col-md-2 col-lg-2 my-md-4 mx-auto my-0 mb-1 mt-4">
              <h4 className="font-weight-bold text-uppercase mb-4">About</h4>

              <ul className="list-unstyled list-links">
                <li>
                  <a
                    href="https://github.com/GBrachetta/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    PROJECTS
                  </a>
                </li>

                <li>
                  <AboutSection />
                </li>

                <li>
                  <a
                    href="https://www.gbrachetta.com/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    WEBSITE
                  </a>
                </li>

                <li>
                  <ContactSection />
                </li>
              </ul>
            </div>

            <div className="clearfix w-100 d-md-none hr" />

            <div className="col-md-4 col-lg-3 my-md-4 mx-auto my-0 mb-1 mt-4">
              <h4 className="font-weight-bold text-uppercase mb-4">Address</h4>

              <ul className="list-unstyled">
                <li>
                  <p>
                    <i className="fas fa-home mr-3" />
                    Marijkelaan 12, 6074AP Melick, The Netherlands
                  </p>
                </li>

                <li>
                  <p>
                    <i className="fas fa-envelope mr-3" />
                    brachetta@me.com
                  </p>
                </li>

                <li>
                  <p>
                    <i className="fas fa-phone mr-3" />+ 31 6 51 06 30 02
                  </p>
                </li>
              </ul>
            </div>

            <div className="clearfix w-100 d-md-none hr" />

            <div className="col-md-2 col-lg-2 social mx-auto my-4 text-center">
              <h4 className="font-weight-bold text-uppercase mb-4">
                Follow Me
              </h4>

              <a
                href="https://www.facebook.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-facebook-f" />
              </a>

              <a
                href="https://www.twitter.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-twitter" />
              </a>

              <a
                href="https://www.linkedin.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-linkedin" />
              </a>

              <a
                href="https://www.instagram.com/"
                rel="noopener noreferrer"
                target="_blank"
              >
                <i className="fab fa-instagram" />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-copyright py-3 text-center">
          &copy; {new Date().getFullYear()} Copyright:
          <span className="my-name"> Guillermo Brachetta</span>
        </div>
      </footer>
    </>
  );
}
