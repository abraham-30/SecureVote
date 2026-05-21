import moment from 'moment';

function formatDate(dateString, formatString) {
    return moment(dateString).format(formatString)
}

function getCurrentDateTime(stringValue=true) {
    if(stringValue)
        return moment().format("YYYY-MM-DD HH:mm:ss[Z]")
    else
        return moment()
}

function toDateTime(dateString, timeString, formatString) {
    const date = new Date(dateString)
    const [ hour, minute ] = timeString.split(":")
    return moment(date).set({ hour, minute,second: 0 }).format(formatString)
}
                                                                                                                                                             
export { formatDate, getCurrentDateTime, toDateTime }