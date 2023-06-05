export const getNowFormatDate = () => {
  let date = new Date(),
    obj = {
      year: date.getFullYear(), //获取完整的年份(4位)
      month: date.getMonth() + 1, //获取当前月份(0-11,0代表1月)
      strDate: date.getDate(), // 获取当前日(1-31)
      week: "星期" + "日一二三四五六".charAt(date.getDay()), //获取当前星期几(0 ~ 6,0代表星期天)
      hour: date.getHours(), //获取当前小时(0 ~ 23)
      minute: date.getMinutes(), //获取当前分钟(0 ~ 59)
      second: date.getSeconds(), //获取当前秒数(0 ~ 59)
    };

  Object.keys(obj).forEach((key) => {
    if (obj[key] < 10) obj[key] = `0${obj[key]}`;
    // console.log(obj[key])
  });
  return `${obj.hour}:${obj.minute} ${obj.month}-${obj.strDate}`;
};
