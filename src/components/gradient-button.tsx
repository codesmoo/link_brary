import Link from 'next/link';
import style from './gradient-button.module.css';

interface ButtonProps {
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Button({
  href,
  type = 'button',
  onClick,
  children,
  className = '',
}: ButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        className={`${style.button_wrapper} ${
          className ? style[className] : ''
        }`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${style.button_wrapper} ${className ? style[className] : ''}`}
    >
      {children}
    </button>
  );
}
