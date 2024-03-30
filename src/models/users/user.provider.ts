import { User } from "./entity/user.enitity";

export const userProviders = [
  {
    provide: 'USER_REPOSITORY',
    useValue: User,
  },
];