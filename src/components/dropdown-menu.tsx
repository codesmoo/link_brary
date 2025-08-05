'use client';

import { useState, useRef, useEffect } from 'react';
import style from './dropdown-menu.module.css';

export default function DropdownMenu({
  onDelete,
  onUpdate,
}: {
  onDelete: () => void;
  onUpdate: () => void;
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // 바깥 클릭 시 메뉴 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className={style.dropdownContainer} ref={menuRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className={style.kebabButton}
        aria-label='메뉴 열기'
      >
        ...
      </button>

      {open && (
        <div className={style.menu}>
          <button className={style.menuItem} onClick={onDelete}>
            삭제하기
          </button>
          <button className={style.menuItem} onClick={onUpdate}>
            수정하기
          </button>
        </div>
      )}
    </div>
  );
}
