function compareDateTime(timeString1, timeString2) {
    const datetTime1 = new Date(timeString1);
    const datetTime2 = new Date(timeString2);

    return (
        datetTime1.getTime() > datetTime2.getTime() &&
        datetTime1.getFullYear() >= datetTime2.getFullYear() &&
        datetTime1.getMonth() >= datetTime2.getMonth() &&
        datetTime1.getDate() >= datetTime2.getDate()
    );
}

module.exports = { compareDateTime };
