import { IUser } from '../../../models/user';

export interface IAuthState {
    isAuth: boolean;
    user: IUser | null,
    isLoading: boolean,
    error: string
}
 
export type TUserLogin = Pick<IUser, 'username'> & { password: string };