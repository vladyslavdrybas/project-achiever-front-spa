export const config = {
  features: {
    achievement: {
      title: "achievement",
      isActive: true,
    },
    list: {
      title: "list",
      isActive: true,
    },
    group: {
      title: "group",
      isActive: false,
    },
  },
  post: {
    periodOfNewInSeconds: 86400,
  },
  api: {
    load: {
      offset: 0,
      limit: 3,
      timerange: {
        older: "older",
        newer: "newer",
      },
      millisecondsToWaitForNextRequest: 25000,
    },
  }
};
