export const paths = {
  resources: '/resources',
  resource: (id: string | number) => `/resources/${id}`,
  resourceDetails: (id: string | number) => `/resources/${id}/details`,
  basicInfo: (id: string | number) => `/resources/${id}/basic-info`,
  projectDetails: (id: string | number) => `/resources/${id}/project-details`,
} as const
