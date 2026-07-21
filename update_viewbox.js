const fs = require('fs');

const files = [
    'email-upcoming task reminder.html',
    'email-task reminder notification.html',
    'email-email verification.html',
    'email-confirm address.html'
];

files.forEach(f => {
    try {
        let text = fs.readFileSync(f, 'utf8');
        text = text.replace(/viewBox="20 50 460 250"/g, 'viewBox="0 50 500 250"');
        fs.writeFileSync(f, text);
        console.log('Updated ' + f);
    } catch (e) {
        console.log('Error in ' + f + ': ' + e);
    }
});
