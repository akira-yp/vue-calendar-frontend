import { format, addHours, isWithinInterval } from 'date-fns';
import { ja } from 'date-fns/locale'

export const getTimeIntervalList = () => {
  const hours = [...Array(24)].map((_,i) => ('0' + i).slice(-2));
  const minutes = ['00','15','30','45'];
  const timeList = hours.map(hour => minutes.map(minute => hour + ':' + minute)).flat();
  return timeList;
}

export const getDefaultStartAndEnd = date => {
  const currentTime = format(new Date(), 'HH:mm:ss');
  const datetime = new Date(`${date} ${currentTime}`);
  const start = format(addHours(datetime, 1), 'yyyy/MM/dd HH:00:00');
  const end = format(addHours(datetime, 2), 'yyyy/MM/dd HH:00:00');
  console.log(start);
  return [start, end];
}

export const isGreaterEndThanStart = (startDate, startTime, endDate,endTime, allDay) => {
  if (allDay) {
    const start = new Date(startDate).getTime();
    const end = new Date(endDate).getTime();
    return end >= start;
  } else {
    const start = new Date(`${startDate} ${startTime}`).getTime();
    const end = new Date(`${endDate} ${endTime}`).getTime();
    return  end > start;
  }
};

export const formatDateToJa = date => {
  return format(new Date(date), 'M月d日(E)', { locale: ja });
};

export const isDateWithinInterval = (date, startDate, endDate) => {
  return isWithinInterval(new Date(date), { start: new Date(startDate), end: new Date(endDate)});
};

export const compareDates = (a,b) => {
  if (a.start < b.start ) return -1;
  if (a.start > b.start ) return 1;
  return 0;
}
