export default function Mark({ className = 'h-9 w-9' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="14" fill="#e7f3ff" />
      <ellipse cx="24" cy="31" rx="16" ry="6.5" fill="#b7dbff" />
      <ellipse cx="24" cy="28" rx="13" ry="8" fill="#d5ecc8" />
      <ellipse cx="24" cy="27" rx="9" ry="5.5" fill="#f3fbe8" />
      <path d="M23 14c2.2 3.6 2.4 6.4.4 9.2-2.4-2.6-2.6-5.4-.4-9.2z" fill="#6eaf7e" />
      <rect x="22.2" y="21" width="2.6" height="6" rx="1" fill="#c9a27a" />
      <circle cx="31" cy="17" r="2.1" fill="#ffe3a3" />
    </svg>
  )
}
