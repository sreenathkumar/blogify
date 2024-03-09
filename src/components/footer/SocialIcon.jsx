export default function SocialIcon({ socialLink, children }) {
  return (
    <li className="text-center">
      <a
        className="text-white/50 hover:text-white transition-all duration-200"
        href={socialLink}
        target="_blank"
      >
        {children}
      </a>
    </li>
  );
}
