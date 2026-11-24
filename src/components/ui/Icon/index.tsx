type IconName = keyof typeof paths
type IconProps = { name: IconName; size?: number; className?: string }

const paths = {
  briefcase: <><rect x="3" y="7" width="18" height="13" rx="2" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2" /></>,
  calendar: <><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" /></>,
  car: <><path d="m5 17-1-5 2.2-5.5A2 2 0 0 1 8.1 5h7.8a2 2 0 0 1 1.9 1.5L20 12l-1 5" /><path d="M4 12h16M7 17v2M17 17v2M7.5 14h.01M16.5 14h.01" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  lock: <><rect x="5" y="10" width="14" height="11" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3m-4 5v2" /></>,
  'log-in': <path d="M10 4h9v16h-9m-7-8h12m-4-4 4 4-4 4" />,
  'log-out': <path d="M12 4H4v16h8m-2-8h11m-4-4 4 4-4 4" />,
  pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" /><circle cx="12" cy="10" r="2.5" /></>,
  search: <><circle cx="10.8" cy="10.8" r="6.8" /><path d="m16 16 5 5" /></>,
  snowflake: <path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 4l3 3 3-3M9 20l3-3 3 3M4 10l4-.5L7 5m10 14-1-4.5 4-.5M4 14l4 .5L7 19m10-14-1 4.5 4 .5" />,
  'steering-wheel': <><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2" /><path d="m4 8 6 3m10-3-6 3m-2 3v7" /></>,
  transmission: <><circle cx="5" cy="5" r="2" /><circle cx="12" cy="5" r="2" /><circle cx="19" cy="5" r="2" /><circle cx="5" cy="19" r="2" /><circle cx="12" cy="19" r="2" /><path d="M5 7v10m7-10v10m7-10v5H5" /></>,
  user: <><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></>,
  users: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8" /></>,
}

/** Ícones em SVG inline, sem dependência externa e com traço consistente. */
export function Icon({ name, size = 20, className }: IconProps) {
  return <svg aria-hidden="true" className={className} fill="none" height={size} viewBox="0 0 24 24" width={size} xmlns="http://www.w3.org/2000/svg">{paths[name]}</svg>
}
