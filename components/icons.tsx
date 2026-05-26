type IconProps = {
  className?: string;
};

export function ArrowIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 20 20"
    >
      <path d="M4 10h11m-5-5 5 5-5 5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

export function DocumentIcon({ className }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M7 3.75h7l3 3v13.5H7V3.75Zm7 .25v4h4M9.5 12h5M9.5 15.5h5"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
