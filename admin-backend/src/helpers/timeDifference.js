const timeDifference = (time1, time2, unit) => {
    let greater = time1;
    let lesser = time2;
    if (time2 > time1) {
        greater = time2;
        lesser = time1;
    }

    const differenceInSeconds = (greater - lesser) / 1000;

    if (!unit) return differenceInSeconds;

    switch (unit) {
        case 'sec':
            return differenceInSeconds;
        case 'min':
            return differenceInSeconds / 60;
        case 'hr':
            return differenceInSeconds / 3600;
        case 'day':
            return differenceInSeconds / 86400;
    }
}

module.exports = timeDifference;