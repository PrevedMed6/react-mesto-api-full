export default function Footer() {
  return (
    <footer className="footer centred-block">
      <p className="footer__copyright">&copy; {(new Date()).getFullYear()} Mesto Russia</p>
    </footer>
  );
}
