export interface TrelloBoard {
  id: string;
  name: string;
  desc: string;
  closed: boolean;
  idOrganization: string;
  url: string;
  shortUrl: string;
  prefs: {
    permissionLevel: 'private' | 'org' | 'public';
    background: string;
    backgroundColor: string;
    backgroundImage: string | null;
  };
}

export interface TrelloList {
  id: string;
  name: string;
  closed: boolean;
  pos: number;
  idBoard: string;
  subscribed: boolean;
}

export interface TrelloCard {
  id: string;
  name: string;
  desc: string;
  closed: boolean;
  idBoard: string;
  idList: string;
  pos: number;
  due: string | null;
  dueComplete: boolean;
  idMembers: string[];
  idLabels: string[];
  url: string;
  shortUrl: string;
  labels: Array<{
    id: string;
    idBoard: string;
    name: string;
    color: string;
  }>;
  cover: {
    color: string | null;
    brightness: 'dark' | 'light';
    size: 'normal' | 'full';
    idAttachment: string | null;
    idUploadedBackground: string | null;
  };
}

export interface TrelloMember {
  id: string;
  fullName: string;
  username: string;
  initials: string;
  avatarUrl: string | null;
}

export interface TrelloLabel {
  id: string;
  name: string;
  color: string;
  idBoard: string;
}