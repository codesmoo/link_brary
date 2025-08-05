'use client';

import style from './page.module.css';
import GradientButton from '@/components/gradient-button';
import OutlinedButton from '@/components/outlined-button';
import { useAuth } from '@/context/AuthContext';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import Card from '@/components/card';
import { useRouter } from 'next/navigation';
import { FolderData, LinkData } from '@/types';
import Modal from '@/components/modal';
import EditModal from '@/components/edit-modal';

export default function Page() {
  const { user } = useAuth();
  const router = useRouter();

  //folder
  const [folders, setFolders] = useState<FolderData[]>([]);
  const [currentFolder, setCurrentFolder] = useState<FolderData | null>(null);
  const [isFolderCreateModalOpen, setIsFolderCreateModalOpen] = useState(false);
  const [isFolderEditModalOpen, setIsFolderEditModalOpen] = useState(false);
  const [isFolderDeleteModalOpen, setIsFolderDeleteModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');
  const [currentFolderName, setCurrentFolderName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  //link
  const [links, setLinks] = useState<LinkData[]>([]);
  const [link, setLink] = useState('');
  const [selectedLink, setSelectedLink] = useState<LinkData | null>(null);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);

  const handleEditClick = (link: LinkData) => {
    setSelectedLink(link);
    setIsLinkModalOpen(true);
  };

  const handleSave = async (id: number, newUrl: string) => {
    const res = await axios.put(`/links/${id}`, { url: newUrl });
    const nextLink = await res.data;

    setLinks((prev) => prev.map((link) => (link.id === id ? nextLink : link)));
    setIsLinkModalOpen(false);
  };

  async function createFolder() {
    if (!newFolderName.trim()) {
      alert('폴더명을 입력하세요');
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post('/folders', {
        name: newFolderName,
      });
      const nextFolder = await res.data;
      setFolders((prev) => [nextFolder, ...prev]);

      setIsFolderCreateModalOpen(false);
      setNewFolderName('');
    } catch (err) {
      alert(err instanceof Error ? err.message : '에러 발생');
    } finally {
      setIsLoading(false);
    }
  }

  async function editFolder() {
    if (!currentFolderName.trim()) {
      alert('폴더명을 입력하세요');
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.put(`/folders/${currentFolder!.id}`, {
        name: currentFolderName,
      });
      const nextFolder = await res.data;

      setFolders((prev) =>
        prev.map((folder) =>
          folder.id === currentFolder!.id ? nextFolder : folder
        )
      );

      setIsFolderEditModalOpen(false);
      setCurrentFolderName(nextFolder.name);
      setCurrentFolder(nextFolder);
    } catch (err) {
      alert(err instanceof Error ? err.message : '에러 발생');
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteFolder() {
    //   await axios.delete(`/links/${linkId}`);
    //   setLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkId));

    setIsLoading(true);
    try {
      await axios.delete(`/folders/${currentFolder!.id}`);
      setFolders((prevFolders) =>
        prevFolders.filter((folder) => folder.id !== currentFolder!.id)
      );

      setIsFolderDeleteModalOpen(false);
      handleSelectFolder(null);
    } catch (err) {
      alert(err instanceof Error ? err.message : '에러 발생');
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAddLink() {
    if (!link.trim()) return;

    const res = await axios.post('/links', {
      url: link.trim(),
      folderId: currentFolder ? currentFolder.id : folders[0].id,
    });
    const nextLink = await res.data;

    setLinks((prev) => [nextLink, ...prev]);
    setLink('');
  }

  async function handleDeleteLink(linkId: number) {
    await axios.delete(`/links/${linkId}`);
    setLinks((prevLinks) => prevLinks.filter((link) => link.id !== linkId));
  }

  function handleSelectFolder(folder: FolderData | null) {
    if (!folder) {
      setCurrentFolder(null);
      setCurrentFolderName('');
      getAllLinks();
      return;
    }
    getSelectedFolders(folder);
  }

  async function getSelectedFolders(folder: FolderData) {
    const res = await axios.get(`/folders/${folder.id}/links`);
    const data = res.data;
    setCurrentFolder(folder);
    setCurrentFolderName(folder.name);
    setLinks(data.list);
  }

  async function getAllFolders() {
    const res = await axios.get('/folders');
    const data = res.data;
    setFolders(data);
  }

  async function getAllLinks() {
    const res = await axios.get('/links');
    const data = res.data;
    setLinks(data.list);
  }

  useEffect(() => {
    getAllFolders();
    getAllLinks();
  }, []);

  if (!user) {
    router.push('/');
    return null;
  }
  return (
    <div className={style.container}>
      <section className={style.inputSection}>
        <div className={style.inputWrapper}>
          <span className={style.inputIcon}>
            <Image src='/link.png' alt='link_image' width={20} height={20} />
          </span>

          <input
            type='text'
            placeholder='링크를 추가해 보세요'
            className={style.inputField}
            value={link}
            name='link'
            onChange={(e) => setLink(e.target.value)}
          />
          <span className={style.inputButton}>
            <GradientButton
              type='button'
              onClick={handleAddLink}
              className='button_sm'
            >
              추가하기
            </GradientButton>
          </span>
        </div>
      </section>
      <section className={style.infoSection}>
        <div className={style.favoriteHeading}>
          <div className={style.favoriteButtons}>
            <OutlinedButton
              type='button'
              onClick={() => handleSelectFolder(null)}
              className='button_sm'
            >
              전체
            </OutlinedButton>
            {folders.map((folder) => (
              <OutlinedButton
                key={folder.id}
                type='button'
                onClick={() => handleSelectFolder(folder)}
                className='button_sm'
              >
                {folder.name}
              </OutlinedButton>
            ))}
          </div>

          <button
            className={style.addButton}
            onClick={() => setIsFolderCreateModalOpen(true)}
          >
            폴더 추가{' '}
            <Image src='/add.png' alt='add_image' width={16} height={16} />
          </button>

          <Modal
            isOpen={isFolderCreateModalOpen}
            onClose={() => setIsFolderCreateModalOpen(false)}
          >
            <h2>추가할 폴더명을 입력해주세요</h2>
            <input
              type='text'
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              placeholder='폴더 이름'
              style={{ width: '100%', padding: '8px', marginBottom: '1rem' }}
            />
            <button onClick={createFolder} disabled={isLoading}>
              {isLoading ? '생성 중...' : '생성'}
            </button>
            <button onClick={() => setIsFolderCreateModalOpen(false)}>
              닫기
            </button>
          </Modal>
        </div>

        <div className={style.folderHeading}>
          {currentFolder ? (
            <>
              <h2 className={style.folderName}>{currentFolder.name}</h2>
              <div className={style.folderButtons}>
                <Link href='/links' className={style.folderButton}>
                  <Image
                    src='/share.png'
                    alt='add_image'
                    width={18}
                    height={18}
                  />
                  공유
                </Link>

                <button
                  className={style.folderButton}
                  onClick={() => setIsFolderEditModalOpen(true)}
                >
                  <Image
                    src='/pen.png'
                    alt='add_image'
                    width={18}
                    height={18}
                  />
                  이름 변경
                </button>
                <button
                  className={style.folderButton}
                  onClick={() => setIsFolderDeleteModalOpen(true)}
                >
                  <Image
                    src='/delete.png'
                    alt='add_image'
                    width={18}
                    height={18}
                  />
                  삭제
                </button>

                {/**
                 * 폴더 이름 변경 모달
                 */}
                <Modal
                  isOpen={isFolderEditModalOpen}
                  onClose={() => setIsFolderEditModalOpen(false)}
                >
                  <h2>수정할 폴더명을 입력해주세요</h2>
                  <input
                    type='text'
                    value={currentFolderName}
                    onChange={(e) => setCurrentFolderName(e.target.value)}
                    placeholder='폴더 이름'
                    style={{
                      width: '100%',
                      padding: '8px',
                      marginBottom: '1rem',
                    }}
                  />
                  <button onClick={editFolder} disabled={isLoading}>
                    {isLoading ? '수정 중...' : '수정'}
                  </button>
                  <button onClick={() => setIsFolderEditModalOpen(false)}>
                    닫기
                  </button>
                </Modal>
                {/**
                 * 폴더 이름 삭제 모달
                 */}
                <Modal
                  isOpen={isFolderDeleteModalOpen}
                  onClose={() => setIsFolderDeleteModalOpen(false)}
                >
                  <h2>폴더를 삭제하시겠습니까?</h2>

                  <button onClick={deleteFolder} disabled={isLoading}>
                    {isLoading ? '삭제 중...' : '삭제'}
                  </button>
                  <button onClick={() => setIsFolderDeleteModalOpen(false)}>
                    닫기
                  </button>
                </Modal>
              </div>
            </>
          ) : (
            <h2 className={style.folderName}>전체</h2>
          )}
        </div>
        <div className={style.cardGrid}>
          {links.map((link) => (
            <Card
              key={link.id}
              {...link}
              onUpdate={() => handleEditClick(link)}
              onDelete={() => handleDeleteLink(link.id)}
            />
          ))}
        </div>
        {isLinkModalOpen && selectedLink && (
          <EditModal
            currentUrl={selectedLink.url}
            onClose={() => setIsLinkModalOpen(false)}
            onSave={(newUrl: string) => handleSave(selectedLink.id, newUrl)}
          />
        )}
        <div className={style.pageButtons}>
          <div>{'<'}</div>
          <div>{'1'}</div>
          <div>{'>'}</div>
        </div>
      </section>
    </div>
  );
}
