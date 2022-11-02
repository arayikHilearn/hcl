import { MaskedInputProps } from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

export default function getMaskOptions(prefix: string, type: 'price' | 'percent' = 'price'): MaskedInputProps | undefined {
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
                    integerLimit: 7, // limit length of integer numbers
                    allowNegative: false,
                    allowLeadingZeroes: false,
                }),
                guide: false
            };
        case 'percent':
            return {
                mask: createNumberMask({
                    prefix: `${prefix} `,
                    //suffix: '',
                    //thousandsSeparatorSymbol: ',',
                    includeThousandsSeparator: false,
                    allowDecimal: true,
                    decimalSymbol: '.',
                    decimalLimit: 3, // how many digits allowed after the decimal
                    integerLimit: 3, // limit length of integer numbers
                    allowNegative: false,
                    allowLeadingZeroes: false,
                }),
                guide: false
            };
        default:
            return;
    }
}
