const formatter = (dateString) => {
    let date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZone: "GMT",
    }).format(date);
};

// console.log(formatter("2024-01-30T14:48:07.000Z"));
module.exports = {formatter};