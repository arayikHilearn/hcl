import { BaseService } from './baseService';
import axios from 'axios';
import { IEvent } from '../models/event';

class EventService extends BaseService{
    protected url = `${this.url}/events` as string;
 
    async get() {
        return ( await axios.get<IEvent[]>( this.url ) ).data;
    }

    async create( event: IEvent ) {
        return ( await axios.post<IEvent>( this.url, event ) ).data;
    }
}

export default new EventService();