import axios from 'axios';
import { IUser } from '../models/user';
import { BaseService } from './baseService';

class UserService extends BaseService {
    protected url = `${this.url}/users` as string;

    async login( username: string, password: string ): Promise<IUser> {
        const found = ( await axios.get<Array<( IUser & {password?: string} )> | []>( `${this.url}?username=${username}&password=${password}` ) ).data[0] || null;
        delete found?.password;

        return found;
    }
 
    async get( username?: string ): Promise<IUser[]> {
        const found = ( await axios.get<Array<( IUser & {password?: string} )> | []>( `${this.url}` ) ).data
            .filter( user => user.username !== username && ( delete user.password ) );

        return found;
    }

    async logout(): Promise<void> {
        console.log( 'logout' );
    }

}

export default new UserService();