import Link from 'next/link';

export function Nav({ back }: { back?: { href: string; label: string } }) {
  return (
    <nav className="sfd-nav">
      <Link href="/" className="sfd-nav__brand">
        Dar <em>SF</em>
      </Link>
      {back && (
        <Link href={back.href} className="sfd-nav__link">
          ← {back.label}
        </Link>
      )}
    </nav>
  );
}

export function Foot() {
  return (
    <footer className="sfd-foot sfd-label">
      <span>© MMXXVI Dar SF</span>
      <span>
        Rendered from the content editor ·{' '}
        <a href="https://darsf.sanity.studio" target="_blank" rel="noreferrer">
          Open the editor
        </a>
      </span>
    </footer>
  );
}
