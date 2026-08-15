const links = [
  { label: "Instagram", href: "https://instagram.com/sostar_vlogger_manindra", icon: "fa-brands fa-instagram" },
  { label: "Spotify", href: "#", icon: "fa-brands fa-spotify" },
];

export default function SocialLinks() {
  return (
    <div className="flex items-center gap-10">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 font-sans text-[14px] tracking-wide text-cream/70 transition hover:text-cream"
        >
          <i className={link.icon} style={{ fontSize: "18px" }} />
          {link.label}
        </a>
      ))}
    </div>
  );
}