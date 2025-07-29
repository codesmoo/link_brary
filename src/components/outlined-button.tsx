import Link from 'next/link';
import style from './outlined-button.module.css';

export default function OutlinedButton({ href, children, className = '' }) {
  console.log(className);
  return (
    <Link
      href={href}
      className={`${style.button_wrapper} ${className ? style[className] : ''}`}
    >
      {children}
    </Link>
  );
}
