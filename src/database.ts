// export interface User {
//   id: string;
//   login: string;
//   password: string;
//   version: number;
//   createdAt: number;
//   updatedAt: number;
// }

// export interface Artist {
//   id: string;
//   name: string;
//   grammy: boolean;
// }

// export interface Track {
//   id: string;
//   name: string;
//   artistId: string | null;
//   albumId: string | null;
//   duration: number;
// }

// export interface Album {
//   id: string;
//   name: string;
//   year: number;
//   artistId: string | null;
// }

// export interface Favorites {
//   artists: string[];
//   albums: string[];
//   tracks: string[];
// }

// export interface FavoritesResponse {
//   artists: Artist[];
//   albums: Album[];
//   tracks: Track[];
// }

// export const users: User[] = [];
// export const artists: Artist[] = [];
// export const tracks: Track[] = [];
// export const albums: Album[] = [];
// export const favorites: Favorites = { artists: [], albums: [], tracks: [] };

// export function createCutUser(user: User) {
//   const cutUser = Object.assign({}, user);
//   delete cutUser.password;
//   return cutUser;
// }
