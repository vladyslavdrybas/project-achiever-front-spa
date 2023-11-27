export const generateUrl = (post:any) => {
  console.log(window.location.origin); // https://...
  return 'https://' + 'achievernotifier.com' + '/ann/' + post.owner.username + '?p=' + post.id;
}

