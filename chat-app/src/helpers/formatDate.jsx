import moment from 'moment'
import 'moment/locale/es';
moment.locale();

export const formatedDate = (date) => {
    const dateMoment = moment(date);

    return dateMoment.format('HH:mm a | MMMM Do');
}