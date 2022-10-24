// import { FC } from 'react';
// import { Calendar } from 'antd';
// import { IEvent } from '../models/event';
// import { Moment } from 'moment';
// import { formatDate } from '../utils/date';
//
// interface IEventCalendarProps {
//     events: IEvent[];
// }
//
// const EventsCalendar: FC<IEventCalendarProps> = ( { events } ) => {
//     function dateCellRender( value: Moment ) {
//         const currentDayEvents = events.filter( event => event.date === formatDate( value.toDate() ) );
//         return (
//             <div>
//                 { currentDayEvents.map( ( event, index ) =>
//                     <div key={ index }>{ event.description }</div>
//                 ) }
//             </div>
//         );
//     }
//
//     return (
//         <Calendar dateCellRender={ dateCellRender } />
//     );
// };
//
// export default EventsCalendar;
