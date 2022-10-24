import { IUser } from '../../../models/user';
import { IEvent } from '../../../models/event';

export interface IEventState {
    guests: IUser[];
    events: IEvent[];
    isLoading: boolean;
    error: string;
} 