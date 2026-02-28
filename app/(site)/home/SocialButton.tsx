import type React from "react";

type Props = {
  href: string;
  label: string;
  children: React.ReactNode;
};

export default function SocialButton({ href, label, children }: Props) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded bg-[#D8D8D8] text-black shadow-[0_8px_16px_rgba(0,0,0,0.12)] transition-transform hover:-translate-y-0.5"
    >
      {children}
    </a>
  );
}
