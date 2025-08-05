export interface FolderData {
  id: number;
  createdAt: string;
  name: string;
  linkCount: number;
}

export interface LinkData {
  id: number;
  favorite: boolean;
  url: string;
  title: string;
  imageSource: string;
  description: string;
  createdAt: string;
  onDelete: () => void;
  onUpdate: () => void;
}

export interface ButtonProps {
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}
