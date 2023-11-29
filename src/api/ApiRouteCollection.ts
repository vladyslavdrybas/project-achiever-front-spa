const _apiHost: string = process.env.REACT_APP_API_HOST_ROUTE ?? '';

console.log(process.env);

const _pool: Record<string, string> = {
  login: '/auth/login',
  register: '/auth/register',
  logout: '/auth/logout',
  accessTokenRefresh: '/auth/token/refresh',
  achievementListOwned: '/achievement/list/[user]/own/[offset]/[limit]',
  achievementListShared: '/achievement/list/[user]/share/[offset]/[limit]',
  postsCollection: '/post/[user]/[offset]/[limit]',
  userProfile: '/user/[userId]',
  userInfoView: '/user/[userId]/info',

  achievementListView: '/achievement/list/[listId]',
  achievementsOfListView: '/achievement/list/[listId]/a/l/[offset]/[limit]',
  achievementView: '/achievement/list/[listId]/a/[achievementId]',
  achievementPrerequisitesView: '/achievement/prerequisite/tree/prerequisites/l/[listId]/a/[achievementId]',
  achievementPrerequisitesTree: '/achievement/prerequisite/tree/[achievementId]',
  userListPublic: '/user/list/public/[offset]/[limit]',
  userProfilePasswordChange: '/user/[userId]/passwordchange',
};

const apiRoute = function (routeName: string, params: Record<string, string> = {}) {
  let route = _pool[routeName];

  Object.keys(params).forEach(key => {
    route = route.replace(`[${key}]`, params[key]);
  });

  return _apiHost + route;
}

export default apiRoute;
