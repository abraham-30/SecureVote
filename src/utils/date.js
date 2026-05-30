import moment from 'moment';

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
                                                                                                                                                             
export { formatDate, getCurrentDateTime, toDateTime }