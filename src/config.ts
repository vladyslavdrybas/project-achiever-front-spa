export const config = {
  features: {
    achievement: {
      isActive: true,
    },
    list: {
      isActive: true,
    },
    group: {
      isActive: false,
    },
  },
  post: {
    periodOfNewInSeconds: 86400,
  },
  api: {
    load: {
      offset: 0,
      limit: 7,
    },
  }
};
