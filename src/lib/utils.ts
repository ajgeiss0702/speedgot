export function commas(x: number) {
    if(typeof x == "undefined") return undefined;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}