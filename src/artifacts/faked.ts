import {faker} from "@faker-js/faker";
import {array_random} from "@/util/jsExtensions";

export const avatar = (): string => {
  return array_random([
    '/faked/avatar/img.png',
    '/faked/avatar/img_1.png',
    '/faked/avatar/img_2.png',
    '/faked/avatar/img_3.png',
    '/faked/avatar/img_4.png',
    '/faked/avatar/img_5.png',
    '/faked/avatar/img_6.png',
    '/faked/avatar/img_7.png',
    '/faked/avatar/img_8.png',
    '/faked/avatar/img_9.png',
    '/faked/avatar/img_10.png',
    '/faked/avatar/img_11.png',
    '/faked/avatar/img_12.png',
    '/faked/avatar/img_13.png',
  ]);
};

export const thumb = (): string => {
  return array_random([
    '/faked/thumb/img.png',
    '/faked/thumb/img_1.png',
    '/faked/thumb/img_2.png',
    '/faked/thumb/img_3.png',
    '/faked/thumb/img_4.png',
    '/faked/thumb/img_5.png',
    '/faked/thumb/img_6.png',
    '/faked/thumb/img_7.png',
  ]);
};

export const profileLists: Record<string,string>[] = [
  {
    'id': faker.string.uuid(),
    'title': faker.person.jobTitle(),
  },
  {
    'id': faker.string.uuid(),
    'title': faker.person.jobTitle(),
  },
  {
    'id': faker.string.uuid(),
    'title': faker.person.jobTitle(),
  },
  {
    'id': faker.string.uuid(),
    'title': faker.person.jobTitle(),
  },
  {
    'id': faker.string.uuid(),
    'title': faker.person.jobTitle(),
  },
  {
    'id': faker.string.uuid(),
    'title': faker.person.jobTitle(),
  },
  {
    'id': faker.string.uuid(),
    'title': faker.person.jobTitle(),
  },
  {
    'id': faker.string.uuid(),
    'title': faker.person.jobTitle(),
  },
  {
    'id': faker.string.uuid(),
    'title': faker.person.jobTitle(),
  },
  {
    'id': faker.string.uuid(),
    'title': faker.person.jobTitle(),
  },
  {
    'id': faker.string.uuid(),
    'title': faker.person.jobTitle(),
  },
];

export const profileGroups: Record<string,string>[] = [
  {
    'id': faker.string.uuid(),
    'title': faker.location.city(),
  },
  {
    'id': faker.string.uuid(),
    'title': faker.location.city(),
  },
  {
    'id': faker.string.uuid(),
    'title': faker.location.city(),
  },
  {
    'id': faker.string.uuid(),
    'title': faker.location.city(),
  },
  {
    'id': faker.string.uuid(),
    'title': faker.location.city(),
  },
  {
    'id': faker.string.uuid(),
    'title': faker.location.city(),
  },
  {
    'id': faker.string.uuid(),
    'title': faker.location.city(),
  },
  {
    'id': faker.string.uuid(),
    'title': faker.location.city(),
  },
  {
    'id': faker.string.uuid(),
    'title': faker.location.city(),
  },
  {
    'id': faker.string.uuid(),
    'title': faker.location.city(),
  },
];

export const profileFollowers: Record<string,string>[] = [
  {
    'username': 'u' + faker.string.alphanumeric(13) + '.' + faker.string.alphanumeric(6),
    'name': faker.person.fullName(),
    'avatar': avatar(),
  },
  {
    'username': 'u' + faker.string.alphanumeric(13) + '.' + faker.string.alphanumeric(6),
    'name': faker.person.fullName(),
    'avatar': avatar(),
  },
  {
    'username': 'u' + faker.string.alphanumeric(13) + '.' + faker.string.alphanumeric(6),
    'name': faker.person.fullName(),
    'avatar': avatar(),
  },
  {
    'username': 'u' + faker.string.alphanumeric(13) + '.' + faker.string.alphanumeric(6),
    'name': faker.person.fullName(),
    'avatar': avatar(),
  },
  {
    'username': 'u' + faker.string.alphanumeric(13) + '.' + faker.string.alphanumeric(6),
    'name': faker.person.fullName(),
    'avatar': avatar(),
  },
];

export const profileFollowed: Record<string,string>[] = [
  {
    'username': 'u' + faker.string.alphanumeric(13) + '.' + faker.string.alphanumeric(6),
    'name': faker.person.fullName(),
    'avatar': avatar(),
  },
  {
    'username': 'u' + faker.string.alphanumeric(13) + '.' + faker.string.alphanumeric(6),
    'name': faker.person.fullName(),
    'avatar': avatar(),
  },
  {
    'username': 'u' + faker.string.alphanumeric(13) + '.' + faker.string.alphanumeric(6),
    'name': faker.person.fullName(),
    'avatar': avatar(),
  },
  {
    'username': 'u' + faker.string.alphanumeric(13) + '.' + faker.string.alphanumeric(6),
    'name': faker.person.fullName(),
    'avatar': avatar(),
  },
  {
    'username': 'u' + faker.string.alphanumeric(13) + '.' + faker.string.alphanumeric(6),
    'name': faker.person.fullName(),
    'avatar': avatar(),
  },
];
