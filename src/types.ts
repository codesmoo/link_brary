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
}
