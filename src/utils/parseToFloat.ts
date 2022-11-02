export default function parseToFloat(str: string) {
    const regex = /[+-]?\d+(\.\d+)?/g;
    let value = '';
    str.match(regex)?.forEach((v) => {
        value += v;
    });
    const parsedValue = parseFloat(value);

    return isNaN(parsedValue) ? null : parsedValue;
}
