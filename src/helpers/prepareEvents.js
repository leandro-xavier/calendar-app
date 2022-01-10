import moment from 'moment';

export const prepareEvents = (events = []) => {
    return events.map(
        (e) => ({
            ...e, //regresa todo el objeto
            end: moment(e.end).toDate(), //convierte el end de string a formato fecha de javascript
            start: moment(e.start).toDate()
        })
    )
}