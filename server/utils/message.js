const moment = require('moment');

const generateMessage = (from, text) => ({
        from,
        text,
        createdAt: moment().valueOf(),
});

const generateLocationMessage = (from, latitude, longitude) => ({
                from,
                url: `https://www.google.com/maps?g=${latitude}, ${longitude}`,
                createdAt: moment().valueOf(),
});

module.exports = { generateMessage, generateLocationMessage };