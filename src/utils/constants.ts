import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import { HttpMethod } from '@/types';

export const URL: string | undefined = process.env.ServerPort

export const ROUTES = {
    Home: '/',
}

export const APIRoutes = {
    BOOK: 'book',
}

export const NavBarRoutes = [
    { text: 'Archive', href: ROUTES.Home, icon: CollectionsBookmarkIcon },
];

export const HttpMethods = {
    GET: 'GET' as HttpMethod,
    POST: 'POST' as HttpMethod,
    PUT: 'PUT' as HttpMethod,
    DELETE: 'DELETE' as HttpMethod
};


export const TABLE_COLUMNS = [
    { label: 'Title', name: 'title' },
    { label: 'Date Created', name: 'createdAt' },
    { label: 'Date Updated', name: 'updatedAt' },
    { label: 'Author', name: 'author' },
    { label: 'ISBN', name: 'isbn' },
    {label:"Actions"}
  ];
  