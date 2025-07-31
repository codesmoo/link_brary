import Link from 'next/link';
import style from './gradient-button.module.css';

export default function Button({ href, children, className = '' }) {
  return (
    <Link
      href={href}
      className={`${style.button_wrapper} ${className ? style[className] : ''}`}
    >
      {children}
    </Link>
  );
}
