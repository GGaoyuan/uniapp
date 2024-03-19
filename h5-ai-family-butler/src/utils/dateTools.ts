import dayjs from 'dayjs';
// 获取当前日期所在的一周的数据
interface dayItemInf {
  date: any;
  day: string;
  dateStr: string;
}
export const DATE_FORMAT = 'YYYY-MM-DD';
export const MONTH_FORMAT = 'YYYY年MM月';
export const getWeekDays = (date?: any) => {
  const startIndex = 0;
  const endIndex = 7;
  const weekdays: Array<dayItemInf> = [];
  for (let i = startIndex; i < endIndex; i++) {
    const _date = dayjs(date).startOf('week').add(i, 'day');
    const dayItem: dayItemInf = {
      date: _date,
      day: _date.format('D'),
      dateStr: _date.format(DATE_FORMAT)
    };
    weekdays.push(dayItem);
  }
  return weekdays;
};
// 获取时间间隔
export const getTimeInterval = (start: any, end: any) => {
  const interval = dayjs(start).diff(end, 'day');
  if (interval === 0) {
    return '今天';
  } else if (interval === -1) {
    return '明天';
  } else if (interval === 1) {
    return '昨天';
  } else if (interval > 0) {
    return `${interval > 99 ? '99+' : interval}天前`;
  } else {
    const absinterval = Math.abs(interval);
    return `${absinterval > 99 ? '99+' : absinterval}天后`;
  }
};

// 获取倒计时
export const getCutdown = (time: any) => {
  const endTime = dayjs(time);
  const nowTime = dayjs();
  if (endTime.valueOf() < nowTime.valueOf()) {
    return `0时0分0秒`;
  }
  const interval = endTime.diff(nowTime, 'day');
  if (interval > 0) {
    return `剩余${interval}天`;
  }
  if (interval === 0) {
    const second = endTime.diff(nowTime, 'second');
    const hour = parseInt((second / 60 / 60) % 24);
    const minute = parseInt((second / 60) % 60);
    const s = parseInt(second % 60);
    return `${hour}时${minute}分${s}秒`;
  }
  return '';
};
