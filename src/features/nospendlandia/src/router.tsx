/**
 * Internal routing for all quest/scene paths.
 *
 * Currently the app uses a state-machine router in App.tsx.
 * This module is reserved for future path-based routing when
 * the app migrates to a URL-based router (React Router, etc).
 *
 * For now, all routing is handled by the GameState currentScreen field.
 */

export const ROUTES = {
  entry: '/',
  realmMap: '/map',
  scene: '/scene/:sceneId',
  journal: '/journal',
  patterns: '/patterns',
  ending: '/ending',
} as const;
