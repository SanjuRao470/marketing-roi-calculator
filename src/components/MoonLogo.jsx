export default function MoonLogo({ className = 'h-9 w-9' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect width="40" height="40" rx="10" fill="#046BD2" />
      <path
        d="M28 20a10 10 0 1 1-15.6-8.25A8 8 0 0 0 28 20z"
        fill="#03E78B"
      />
      <circle cx="30" cy="12" r="2" fill="white" fillOpacity="0.9" />
    </svg>
  )
}
