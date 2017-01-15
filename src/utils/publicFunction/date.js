// 时间处理函数 add by zhaohj 20160923
let now = new Date() // 当前日期
let nowDayOfWeek = now.getDay()// 今天本周的第几天
let nowDay = now.getDate()// 当前日
let nowMonth = now.getMonth()// 当前月
let nowYear = now.getFullYear()// 当前年
/**
 * @export
 * @param {date} date
 * @returns 不带时分秒的八位年月日字符串
 */
export function dateFormatCon(date) { // 时间格式转换方法(不带时分秒)
    let year = new Date(date).getFullYear()
    let month
    let day
    if ((new Date(date).getMonth() + 1) < 10) {
        month = '0' + (new Date(date).getMonth() + 1)
    } else {
        month = new Date(date).getMonth() + 1
    }
    if ((new Date(date).getDate()) < 10) {
        day = '0' + new Date(date).getDate()
    } else {
        day = new Date(date).getDate()
    }
    let newDate = year + '-' + month + '-' + day
    return newDate
};
/**
 * @export
 * @param {any} date
 * @returns 带时分秒的字符串
 */
export function dateCon(date) {
    let year = new Date(date).getFullYear()
    let month
    let day
    let hour
    let min = new Date(date).getMinutes()
    let seconds = new Date(date).getSeconds()
    if ((new Date(date).getMonth() + 1) < 10) {
        month = '0' + (new Date(date).getMonth() + 1)
    } else {
        month = new Date(date).getMonth() + 1
    }
    if ((new Date(date).getDate()) < 10) {
        day = '0' + new Date(date).getDate()
    } else {
        day = new Date(date).getDate()
    }
    if (new Date(date).getHours() < 10) {
        hour = '0' + new Date(date).getHours()
    } else {
        hour = new Date(date).getHours()
    }
    if (min < 10) {
        min = '0' + min
    }
    if (seconds < 10) {
        seconds = '0' + seconds
    }
    let newDate = year + '-' + month + '-' + day + ' ' + hour + ':' + min + ':' + seconds
    return newDate
};
/**
 * 获取本周开始时间
 * @export
 * @returns 本周开始日期字符串
 */
export function getWeekStartDate() {

    let weekStartDate = new Object()
    if (nowDayOfWeek === 0) { // 判断是否是周天
        weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 6)
    } else {
        weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1)
    }
    return weekStartDate
}
// 获得本周的结束日期
export function getWeekEndDate() {
    let weekEndDate = new Date(nowYear, nowMonth, nowDay + (7 - nowDayOfWeek))
    return weekEndDate
}
// 获得本月的开始日期
export function getMonthStartDate() {
    let monthStartDate = new Date(nowYear, nowMonth, 1)
    return monthStartDate
}
// 获得某月的天数
export function getMonthDays(myMonth) {
    let monthStartDate = new Date(nowYear, myMonth, 1)
    let monthEndDate = new Date(nowYear, myMonth + 1, 1)
    let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24)
    return days
}
// 获得本月的结束日期
export function getMonthEndDate() {
    let monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth))
    return monthEndDate
}
// 获得本季度的开始月份
export function getQuarterStartMonth() {
    var quarterStartMonth = 0
    if (nowMonth < 3) {
        quarterStartMonth = 0
    }
    if (nowMonth > 2 && nowMonth < 6) {
        quarterStartMonth = 3
    }
    if (nowMonth > 5 && nowMonth < 9) {
        quarterStartMonth = 6
    }
    if (nowMonth > 8) {
        quarterStartMonth = 9
    }
    return quarterStartMonth
}
// 获得本季度的开始日期
export function getQuarterStartDate() {
    let quarterStartDate = new Date(nowYear, getQuarterStartMonth(), 1)
    return quarterStartDate
}
// 获取本季度的结束日期
export function getQuarterEndDate() {
    var quarterEndMonth = getQuarterStartMonth() + 2
    var quarterEndDate = new Date(nowYear, quarterEndMonth, getMonthDays(quarterEndMonth))
    return quarterEndDate
}
/**
 * 获取本年的第一天
 * @export
 * @returns 本年的第一天
 */
export function getYearFirstDate() {
    let yearFirstDate = new Date(nowYear, 0, 1)
    return yearFirstDate
}
/**
 * 获取本年的最后一天
 * @export
 * @returns 本年的最后一天
 */
export function getYearLastDate() {
    let yearLastDate = new Date(nowYear, 11, 31)
    return yearLastDate
}
// 获取本年的开始时间
export function getYearStartDate() {
    return new Date(nowYear, 0, 1)
}
// 获取当前时间
export function getNow() {
    return now;
}
