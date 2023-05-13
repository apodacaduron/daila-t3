export const HOME_PAGE = {
  path: '/home'
}
export const SIGN_IN_PAGE = {
  path: '/auth/sign-in'
}
export const SIGN_UP_PAGE = {
  path: '/auth/sign-up'
}
export const CREATE_WORKSPACE_PAGE = {
  path: '/create-workspace'
}
export function DASHBOARD_PAGE(workspaceId: string) {
  return { path: `/${workspaceId}/dashboard` }
}
export function PATIENTS_PAGE(workspaceId: string) {
  return { path: `/${workspaceId}/patients` }
}
export function APPOINTMENTS_PAGE(workspaceId: string) {
  return { path: `/${workspaceId}/appointments` }
}
export function MEMBERS_PAGE(workspaceId: string) {
  return { path: `/${workspaceId}/members` }
}
export function SETTINGS_PAGE(workspaceId: string) {
  return { path: `/${workspaceId}/settings` }
}