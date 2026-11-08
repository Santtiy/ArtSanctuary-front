import { NavLink } from '../models/nav-link.model';

export const MAIN_LINKS: NavLink[] = [
  { label: 'Home', path: '/' },
  { label: 'Gallery', path: '/gallery' },
  { label: 'Explore', path: '/explore' },
  { label: 'Tools', path: '/dashboard/tools' },
  { label: 'Workspace', path: '/dashboard/workspaces' },
];

export const ACCOUNT_LINKS: NavLink[] = [
  { label: 'Sign in', path: '/login' },
  { label: 'Register', path: '/register' },
];