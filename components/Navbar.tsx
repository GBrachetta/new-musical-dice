export default function Navbar() {
  return (
    <nav
      aria-label="Main navigation"
      className="site-nav container"
    >
      <a
        className="site-brand"
        href="#title"
      >
        Musical Dice<span aria-hidden="true"> / </span>
      </a>
      <div className="site-nav-links">
        <a href="#game">Play</a>
        <a href="#mozart">Mozart</a>
        <a href="#rules">How it works</a>
      </div>
    </nav>
  );
}
