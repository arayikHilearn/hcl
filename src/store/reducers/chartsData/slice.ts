import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {} from './actionCreators';
import { TChartsData } from './index';

const data = [
    [
        700, 80, 60, 40, 30,
        40, 30, 70123, 80, 60,
        40, 30, 400, 30, 70,
        80, 60, 40, 30, 10,
        30, 70, 880, 60, 40,
        30, 42330, 30999, 40, 71230
    ],
    [
        71550.37182718472,
        27186.52137039857,
        41825.99104196185,
        41458.21263896366,
        45539.79080632466,
        47733.88867176758,
        70206.89573091133,
        79675.18132670697,
        79675.18132670697,
        79675.18132670697,
        79675.18132670697,
        79675.18132670697,
        55602.802134524376,
        60006.93256066665,
        79675.18132670697,
        79675.18132670697,
        79675.18132670697,
        69544.20926133085,
        59085.10074458689,
        45320.957936967,
        59548.05158312702,
        67397.50709694265,
        62073.05281649706,
        58410.17690438208,
        65266.748701483935,
        61604.98083262395,
        16846.2427712766
    ]
];

const initialState: TChartsData = {
    expected: {
        annualData: {
            hclAnnualPayment: data[0],
            conventionalAnnualPayment: data[1],
            hclCumulativePayment: data[0],
            conventionalCumulativePayment: data[0],
            hclLoanBalance: data[0],
            conventionalLoanBalance: data[0],
        }
    },
    best: null,
    worst: null
};

const chartsDataSlice = createSlice({
    name: 'charts',
    initialState,
    reducers: {

    },
    extraReducers: {
    }
});

export const chartsDataActionCreators = {
    ...chartsDataSlice.actions,
};

export default {
    name: chartsDataSlice.name,
    reducer: chartsDataSlice.reducer
};
