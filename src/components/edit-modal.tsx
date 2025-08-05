import { useState } from 'react';
import style from './edit-modal.module.css';

type Props = {
  currentUrl: string;
  onClose: () => void;
  onSave: (newUrl: string) => void;
};

export default function EditModal({ currentUrl, onClose, onSave }: Props) {
  const [newUrl, setNewUrl] = useState(currentUrl);

  const handleSubmit = () => {
    if (newUrl.trim()) {
      onSave(newUrl.trim());
    }
  };

  return (
    <div className={style.modalOverlay}>
      <div className={style.modalContent}>
        <input
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          className={style.input}
        />
        <div className={style.buttons}>
          <button className={style.confirmButton} onClick={handleSubmit}>
            저장
          </button>
          <button className={style.cancelButton} onClick={onClose}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
