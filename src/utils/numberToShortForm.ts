export default function numberToShortForm(val: number) {
    let num = val.toString();

    if (val > 999) num = `${val / 1000}K`;
    if (val > 999999) num = `${val / 1000000}M`;

    return num;
}
