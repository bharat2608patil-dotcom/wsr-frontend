export const roles = ['ADMIN', 'VP', 'DIRECTOR', 'DELIVERY_MANAGER', 'TEAM_LEAD', 'TEAM_MEMBER']

export const permissions = {
  users: { view: roles, create: ['ADMIN'], update: ['ADMIN'], delete: ['ADMIN'] },
  teams: { view: ['ADMIN', 'VP', 'DIRECTOR', 'DELIVERY_MANAGER', 'TEAM_LEAD'], create: ['ADMIN'], update: ['ADMIN'], delete: ['ADMIN'] },
  projects: { view: roles, create: ['ADMIN'], update: ['ADMIN'], delete: ['ADMIN'] },
  weeklyUpdates: { view: roles, create: ['TEAM_MEMBER'], update: ['TEAM_LEAD', 'TEAM_MEMBER'], delete: [] },
  risks: { view: roles, create: ['DELIVERY_MANAGER', 'TEAM_LEAD', 'TEAM_MEMBER'], update: ['DELIVERY_MANAGER', 'TEAM_LEAD', 'TEAM_MEMBER'], delete: [] },
  blockers: { view: roles, create: ['DELIVERY_MANAGER', 'TEAM_LEAD', 'TEAM_MEMBER'], update: ['DELIVERY_MANAGER', 'TEAM_LEAD', 'TEAM_MEMBER'], delete: [] },
  wsr: { view: ['DELIVERY_MANAGER', 'TEAM_LEAD'], submit: ['TEAM_LEAD'], approve: ['DELIVERY_MANAGER'] },
  dashboard: { view: roles },
}

export const can = (role, module, action = 'view') => Boolean(permissions[module]?.[action]?.includes(role))
