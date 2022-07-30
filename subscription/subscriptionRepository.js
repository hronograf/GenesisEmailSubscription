const fs = require('fs');
const readline = require('readline');
const nReadlines = require('n-readlines');

// create data directory and file for emails if they don't exist
fs.mkdir('./data', { recursive: true }, (err) => {if (err) throw err;});
fs.appendFileSync(process.env.EMAILS_FILE_PATH, '');

function emailAlreadySubscribed(emailToSubscribe) {
    const emailsIterator = new nReadlines(process.env.EMAILS_FILE_PATH);
    let subscribedEmail = emailsIterator.next();
    while (subscribedEmail) {
        if (subscribedEmail.toString() === emailToSubscribe) {
            return true;
        }
        subscribedEmail = emailsIterator.next();
    }
    return false;
}

function getAllSubscriberEmailsAsyncIterator() {
    return readline.createInterface({
        input: fs.createReadStream(process.env.EMAILS_FILE_PATH),
        crlfDelay: Infinity,
    });
}

function saveSubscriberEmail(email) {
    fs.appendFileSync(process.env.EMAILS_FILE_PATH, email + '\n');
}

module.exports = {
    saveSubscriberEmail,
    emailAlreadySubscribed,
    getAllSubscriberEmailsAsyncIterator,
}
