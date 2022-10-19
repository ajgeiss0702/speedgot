import sanitizeHtml from 'sanitize-html';

export function commas(x: number) {
    if(typeof x == "undefined") return undefined;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getHostname(link: string) {
    return new URL(link).hostname;
}

export function decodeBase64Content(d: string) {
    return sanitizeHtml(
        decodeUnicode(d)
            .replace(/"\/\/proxy\.spigotmc\.org\/([^\s].*?)\?url=(.*?)"/g, "/proxy/image?url=$2"),
        {
            allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img', 'iframe', 'button', 'span' ]),
            allowedAttributes: {
                ...sanitizeHtml.defaults.allowedAttributes,
                "*": ['style', 'class'],
                'iframe': ['src', 'allowfullscreen', 'width', 'height', 'frameborder'],
            },
            allowedIframeDomains: ['youtube.com']
        }
    )
}

function decodeUnicode(str: string): string {
    // Going backward: from byte-stream to percent-encoding, to original string.
    return decodeURIComponent(
        atob(str)
            .split('')
            .map(function (c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
            })
            .join('')
    )
}

export function dateString(date = new Date(), seconds = true) {
    let d;

    if(date instanceof Date) {
        d = date;
    } else {
        d = new Date(date);
    }

    let ap = 'AM';
    let hour: any = d.getHours();
    let min: any = d.getMinutes();
    let sec: any = d.getSeconds();

    if(hour >= 12) {
        ap = 'PM';
        if(hour > 12) {
            hour = hour - 12;
        }
    }
    if(hour == 0) {
        hour = 12;
    }
    if(min < 10) {
        min = "0"+min
    }
    if(sec < 10) {
        sec = "0"+sec
    }

    if(seconds) {
        return hour+":"+min+":"+sec+" "+ap;
    } else {
        return hour+":"+min+" "+ap;
    }
}

export function isSameDay(a: Date, b: Date): boolean {
    return (
        a.getDate() == b.getDate() &&
        a.getMonth() == b.getMonth() &&
        a.getFullYear() == b.getFullYear()
    );
}

export function isBeforeOrSameDay(a: Date, b: Date): boolean {
    return (
        a.getDate() <= b.getDate() &&
        a.getMonth() <= b.getMonth() &&
        a.getFullYear() <= b.getFullYear()
    );
}

export function yesterday() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date;
}

export const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];

export const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

export const shortMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
];