import Link from 'next/link';
import style from './gradient-button.module.css';
import { ButtonProps } from '@/types';

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
