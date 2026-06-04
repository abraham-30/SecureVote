// import moment from 'moment';
import moment from "moment-timezone";

function formatDate(dateString, formatString, valueFormatString=null) {
    if(!!dateString)
        if(!!valueFormatString)
            return moment(dateString, valueFormatString).format(formatString)
        return moment(dateString).format(formatString)
}

function getCurrentDateTime() {
    return moment().toISOString()
}

function toDateTime(dateString, timeString, formatString) {
    const date = new Date(dateString)
    const [ hour, minute ] = timeString.split(":")
    return moment(date).set({ hour, minute,second: 0 }).format(formatString)
}

function dateTimeUTC(dateString, timeString) {
    const date = moment(dateString).format("YYYY-MM-DD")

    return moment.tz(`${date} ${timeString}`,"YYYY-MM-DD HH:mm","Asia/Jakarta").utc().toDate();
}

function dateUTC(dateString) {
    const date = moment(dateString).format("YYYY-MM-DD")

    return moment.tz(date,"YYYY-MM-DD","Asia/Jakarta").utc().toDate();
}
                                                                                                                                                             
export { formatDate, getCurrentDateTime, toDateTime, dateTimeUTC, dateUTC }