export const generatePostUrl = (post:any) => {
  console.log(window.location.origin); // https://...
  return 'https://' + 'achievernotifier.com' + '/ann/' + post.owner.username + '?p=' + post.id;
}

export const generateListUrl = (list:any) => {
  console.log(window.location.origin); // https://...
  return 'https://' + 'achievernotifier.com' + '/list/' + list.id;
}

