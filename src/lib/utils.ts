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
        atob(d)
            .replaceAll("â", "")
            .replaceAll("Â", "")
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

export function dateString(date = new Date(), seconds: boolean = true) {
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