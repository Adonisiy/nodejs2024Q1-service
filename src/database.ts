export interface User {
  id: string;
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export interface Artist {
  id: string;
  name: string;
  grammy: boolean;
}

interface Track {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export interface Album {
  id: string;
  name: string;
  year: number;
  artistId: string | null;
}

interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export const users: User[] = [];
export const artists: Artist[] = [];
const tracks: Track[] = [];
export const albums: Album[] = [];
const favorites: Favorites[] = [];

export function createCutUser(user: User) {
  const cutUser = Object.assign({}, user);
  delete cutUser.password;
  return cutUser;
}
