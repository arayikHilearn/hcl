import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TChartsData } from './index';
import { ChartsCategoryList } from '../../../models/calculateResponse';

const initialState: TChartsData = {
    expected: {
        annualData: null
    },
    best: {
        annualData: null
    },
    worst: {
        annualData: null
    }
};

const chartsDataSlice = createSlice({
    name: 'charts',
    initialState,
    reducers: {
        setChartsData(state, { payload }: PayloadAction<TChartsData>) {
            (Object.keys(payload) as Array<typeof ChartsCategoryList[number]>).forEach((key) => {
                if (payload[key].annualData) state[key].annualData = payload[key].annualData;
            });
        }
    },
});

export const chartsDataActionCreators = {
    ...chartsDataSlice.actions,
};

export default {
    name: chartsDataSlice.name,
    reducer: chartsDataSlice.reducer
};
