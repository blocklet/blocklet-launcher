import isUrl from 'is-url';
import moment from 'moment';
import 'moment/locale/zh-cn';

const formatError = (error) => {
  if (Array.isArray(error.errors)) {
    return error.errors.map((x) => x.message).join('\n');
  }

  return error.message;
};

const isObjectFn = (obj) => Object.prototype.toString.call(obj) === '[object Object]';

function formatToDate(date) {
  if (!date) {
    return '-';
  }

  return moment(date).format('ll');
}

function formatToDatetime(date) {
  if (!date) {
    return '-';
  }

  return moment(date).format('lll');
}

function formatTime(date, format = 'lll') {
  if (!date) {
    return '-';
  }

  return moment(date).format(format);
}

export { isObjectFn, formatError, isUrl, formatToDate, formatToDatetime, formatTime };
