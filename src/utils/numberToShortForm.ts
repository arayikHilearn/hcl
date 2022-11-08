export default function numberToShortForm(val: number) {
    let num = val.toString();

    if (val > 999999) num = `${Math.floor(val / 1000000)}M`;
    else if (val > 999) num = `${Math.floor(val / 1000)}K`;

    return num;
}
