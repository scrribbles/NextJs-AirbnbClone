const endpoints = Object.freeze({
  properties: {
    ALL_PROPERTIES: (x?: string) => `/property/list/`,
    SINGLE_PROPERTY: (x: string) => `/property/${x}`,
  },
  favorites: {
    ALL_FAVORITES: () => `/favorite/all/`,
    ADD_FAVORITE: (x: string) => `/favorite/create/${x}`,
    REMOVE_FAVORITE: (x: string) => `/favorite/actions/${x}`,
  },
});
export default endpoints;
