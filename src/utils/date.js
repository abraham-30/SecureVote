import moment from 'moment';

function formatDate(dateString, formatString) {
    return moment(dateString).utc().format(formatString)
}

function getCurrentDateTime() {
    return moment()
}

function toDateTime(dateString, timeString, formatString) {
    return moment(`${dateString} ${timeString}`, formatString)
}

export { formatDate, getCurrentDateTime, toDateTime }