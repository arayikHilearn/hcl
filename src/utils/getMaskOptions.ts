import { MaskedInputProps } from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export default function getMaskOptions(prefix: string, type: 'price' | 'percent-prefix' | 'percent' = 'price'): MaskedInputProps | undefined {
    switch (type) {
        case 'price':
            return {
                mask: createNumberMask({
                    prefix: `${prefix} `,
                    suffix: '',
                    includeThousandsSeparator: true,
                    thousandsSeparatorSymbol: ',',
                    allowDecimal: true,
                    decimalSymbol: '.',
                    decimalLimit: 2, // how many digits allowed after the decimal
                    integerLimit: 9, // limit length of integer numbers
                    allowNegative: false,
                    allowLeadingZeroes: false,
                }),
                guide: false
            };
        case 'percent-prefix':
            return {
                mask: createNumberMask({
                    prefix: `${prefix} `,
                    allowDecimal: true,
                    decimalSymbol: '.',
                    decimalLimit: 2,
                    integerLimit: 1,
                    allowNegative: false,
                    allowLeadingZeroes: false,
                }),
                guide: false
            };
        case 'percent':
            return {
                mask: createNumberMask({
                    suffix: `${prefix} `,
                    prefix: '',
                    allowDecimal: false,
                    decimalSymbol: '',
                    decimalLimit: 0,
                    integerLimit: 2,
                    allowNegative: false,
                    allowLeadingZeroes: false,
                }),
                guide: false
            };
        default:
            return;
    }
}
