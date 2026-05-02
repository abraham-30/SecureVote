import moment from 'moment';

function formatDate(dateString, formatString) {
    return moment(dateString).utc().format(formatString)
}

export { formatDate }