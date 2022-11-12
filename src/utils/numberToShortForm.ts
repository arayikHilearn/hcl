export default function numberToShortForm(val: number) {
    let num = val.toString();

    if (val > 99999999) {
        num = `${Math.floor(val).toString().slice(0, -6)}M`;
    } else if (val > 999999) {
        const shortValue = (val / 1000000).toString()
            .slice(0, 4)
            .replace(/\.$|\.0+$/g, '');
        num = `${shortValue}M`;
    } else if (val > 99999) {
        num = `${Math.floor(val).toString().slice(0, -3)}K`;
    } else if (val > 999) {
        const shortValue = (val / 1000).toString()
            .slice(0, 4)
            .replace(/\.$|\.0+$/g, '');
        num = `${shortValue}K`;
    }

    if (val < 1000) {
        const dotPosition = val.toString().indexOf('.');
        const valueWithoutDot = val.toString().replace('.', '').slice(0, 3);

        if (dotPosition === -1) {
            num = valueWithoutDot;
        } else {
            if (dotPosition === valueWithoutDot.length) {
                num = valueWithoutDot;
            } else {
                num = [ valueWithoutDot.slice(0, dotPosition), '.', valueWithoutDot.slice(dotPosition) ].join('');
            }
        }
    }

    return num;
}
