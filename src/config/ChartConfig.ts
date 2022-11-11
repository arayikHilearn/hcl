import { useStyle } from '../hooks/useStyle';
import { Options } from 'highcharts';
import { CURRENCY } from './index';
import numberToShortForm from '../utils/numberToShortForm';
import { WithPrefix } from '../utils/types';

abstract class ChartConfig {
    public data: number[][] = [];
    public abstract chartSetup(data: number[][]): {
        options: Options;
    }
    abstract readonly type: 'column' | 'line'

    //constructor() {}
}

interface IAdditionalStyles {
    $chartWidth: number;
    $pointWidth: number;
    $columnInnerPadding: number;
    $chartPadding: number;
    $chartHeight: number;
}

type TStyles<T extends string> = (Record<WithPrefix<'$', T>, string> & IAdditionalStyles) | Record<string, never>;

export class ColumnChartConfig extends ChartConfig {
    public readonly type = 'column';
    private static defaultStyles = {
        $chartWidth: 548,
        $pointWidth: 10.7,
        $columnInnerPadding: 6,
        $chartPadding: 16,
        $chartHeight: 256,
    };
    private static stylesList = [
        'maxScreen', 'maxContainer',
        'maxGutter', 'minGutter',
        'cDark', 'fz', 'lh', 'ff',
        'cChart1', 'cChart2',
        'cChartFocus1', 'cChartFocus2',
        'cChartHover1', 'cChartHover2'
    ] as const;
    private readonly withoutTicksStyles = {
        minorTickLength: 0,
        tickLength: 0,
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        gridLineColor: 'transparent',
    };
    private styles: TStyles<typeof ColumnChartConfig.stylesList[number]> = {};
    private maxColumns: number | null = null;
    private categories: string[] = [];
    private chartOuterWidth: number | null = null;
    private tickInterval = 1;
    private xAxisStyles: Record<string, any> = {};
    private yAxisStyles: Record<string, any> = {};

    private lhFix(
        value: number | string,
        full = false,
        { type }: { type: 'rem' | 'px' } = { type: 'rem' }
    ) {
        const lhCoefficient = parseFloat(this.styles.$lh) - 1;
        const numericValue = typeof value === 'number'
            ? value
            : parseFloat(value) * (type === 'rem' ? 10 : 0);

        const fixedValue = lhCoefficient * numericValue;

        return full ? fixedValue + numericValue : fixedValue;
    }

    private parseToNumeric(value: string, { type }: { type: 'rem' | 'px' } = { type: 'rem' }) {
        return parseFloat(value) * (type === 'rem' ? 10 : 0);
    }

    private setCssStyles(initialStyles: Partial<Record<WithPrefix<'$'>, string>>) {
        this.styles = {
            ...this.styles,
            ...initialStyles
        };

        const cssStyles = useStyle([ ...ColumnChartConfig.stylesList ]);
        (Object.keys(cssStyles) as Array<WithPrefix<'$', typeof ColumnChartConfig.stylesList[number]>>).forEach((style) => {
            if (!initialStyles[style]) {
                this.styles[style] = cssStyles[style];
            }
        });
    }

    private setAdditionalStyles(data: number[][]) {
        const defaultStyles = ColumnChartConfig.defaultStyles;

        (Object.keys(defaultStyles) as Array<keyof IAdditionalStyles>).forEach((style) => {
            this.styles[style] = defaultStyles[style];
        });
        this.data = data;
        this.maxColumns = data[0].length > data[1].length ? data[0].length : data[1].length;

        const containerPadding = window.innerWidth > +this.styles.$maxScreen
            ? +this.styles.$maxGutter
            : +this.styles.$maxGutter / +this.styles.$maxScreen * window.innerWidth;
        const fullContainer = +this.styles.$maxContainer + +this.styles.$maxGutter * 2;
        const containerWidth = window.innerWidth > fullContainer
            ? +this.styles.$maxContainer
            : window.innerWidth - containerPadding * 2;
        const breakPoint = +this.styles.$maxContainer;

        console.log({ containerWidth, breakPoint, containerPadding }, 777777);

        this.styles.$pointWidth = (containerWidth >= breakPoint
            ? defaultStyles.$pointWidth
            : defaultStyles.$pointWidth / fullContainer * containerWidth);
        this.styles.$columnInnerPadding = (defaultStyles.$columnInnerPadding / defaultStyles.$pointWidth * this.styles.$pointWidth);

        this.styles.$chartPadding = containerWidth >= breakPoint
            ? defaultStyles.$chartPadding
            : defaultStyles.$chartPadding / fullContainer * containerWidth;

        this.styles.$chartWidth = this.maxColumns * this.styles.$pointWidth
            + (this.maxColumns - 1) * this.styles.$columnInnerPadding
            + this.styles.$chartPadding * 2
            + this.lhFix('0.9rem', true) + 8; //yAxisTitleWidth + margin
        this.chartOuterWidth = this.styles.$chartWidth + this.styles.$chartPadding * 2;
    }

    private getTickInterval() {
        console.log(this.data, 9900);
        let maxValue = 0;
        this.data.flat().forEach(value => {
            // console.log(value, '8786756ghjghjvgv');
            if (value > maxValue) maxValue = value;
        });
        maxValue = Math.floor(maxValue);
        console.log(10 ** (maxValue.toString().length - 1), 9900);
        console.log(maxValue, 9900);

        return 10 ** (maxValue.toString().length - 1);
    }

    private setAxesStyles() {
        this.xAxisStyles = {
            width: (this.maxColumns as number) * this.styles.$pointWidth + ((this.maxColumns as number) - 1) * this.styles.$columnInnerPadding,
            labels: {
                fz: '1rem',
                margin: this.parseToNumeric('0.8rem')
            },
            title: {
                text: 'Year',
                fz: '0.9rem',
                margin: this.parseToNumeric('0.8rem')
            }
        };
        this.yAxisStyles = {
            width: this.styles.$chartWidth - this.xAxisStyles.width,
            labels: {
                fz: '1rem',
                margin: this.parseToNumeric('0.8rem')
            },
            title: {
                text: 'Payments',
                fz: '0.9rem',
                margin: this.parseToNumeric('0.8rem')
            }
        };
    }

    private setUpChartOptions() {
        this.categories = Array.from(Array(this.maxColumns)).map((v, i) => {
            if (!i) return '0';
            if (!((i+1) % 5)) return `${i+1}`;
            else return '';
        });
        this.tickInterval = this.getTickInterval();
        this.setAxesStyles();
    }

    constructor(
        options: Partial<IAdditionalStyles> = {
            $columnInnerPadding: ColumnChartConfig.defaultStyles.$columnInnerPadding,
            $chartWidth: ColumnChartConfig.defaultStyles.$chartWidth,
            $pointWidth: ColumnChartConfig.defaultStyles.$pointWidth,
            $chartPadding: ColumnChartConfig.defaultStyles.$chartPadding,
            $chartHeight: ColumnChartConfig.defaultStyles.$chartHeight,
        },
        styles: Partial<Record<WithPrefix<'$'>, string>> = {}
    ) {
        super();

        ColumnChartConfig.defaultStyles = {
            ...ColumnChartConfig.defaultStyles,
            ...options,
        };

        this.setCssStyles(styles);
    }

    private setUpYAxis(yAxisStyles: Record<string, any>) {
        return { //??????
            ...this.withoutTicksStyles,
            //min: 1,
            //max: 100, //?
            endOnTick: false,
            tickInterval: this.tickInterval,
            offset: 0,
            left: yAxisStyles.width - yAxisStyles.labels.margin + this.styles.$chartPadding,
            title: {
                text: yAxisStyles.title.text,
                x: -this.lhFix(yAxisStyles.title.fz) - (
                    yAxisStyles.width
                    - yAxisStyles.title.margin
                    - this.parseToNumeric(yAxisStyles.title.fz)
                ),
                offset: 0,
                align: 'middle',
                textAlign: 'center',
                style: {
                    fontSize: yAxisStyles.title.fz,
                    opacity: 0.4,
                    color: this.styles.$cDark,
                },
            },
            labels: {
                step: 1,
                x: -this.lhFix(yAxisStyles.title.fz),
                y: 0,
                style: {
                    color: this.styles.$cDark,
                    fontSize: yAxisStyles.labels.fz,
                    opacity: 0.8
                },
                formatter() {
                    const price = CURRENCY + numberToShortForm(this.value as number);
                    console.log(444, price);

                    return price;
                },
            },
        } as Options['yAxis'];
    }

    private getOptions(data: number[][]) {
        console.log('HOOOOOOOOOOSHHH', data, 888);
        this.setAdditionalStyles(data);
        console.log('HOOOOOOOOOOSHHH', this.data);

        this.setUpChartOptions();

        const { xAxisStyles, yAxisStyles, categories, maxColumns, type, tickInterval } = this;
        const {
            $cChart1,
            $cChart2,
            $cDark,
            $ff,
            $fz,
            $cChartFocus1,
            $cChartFocus2,
            $cChartHover1,
            $cChartHover2,
            $columnInnerPadding,
            $chartWidth,
            $pointWidth,
            $chartPadding,
            $chartHeight
        } = this.styles;
        const yAxis = this.setUpYAxis(yAxisStyles);

        console.log(this.styles, 88888);

        const options: Options = {
            // colorAxis: [ {
            //     maxColor: '#000fb0',
            //     minColor: '#e3e5ff',
            //     labels: {
            //         format: '{value}%'
            //     },
            //     reversed: true
            // }, {
            //     minColor: '#ffece8',
            //     maxColor: '#8a1900',
            //     labels: {
            //         format: '{value}%'
            //     }
            // } ],
            accessibility: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            title: {
                text: ''
            },
            subtitle: {
                text: ''
            },
            legend: {
                layout: 'vertical',
                align: 'center',
                verticalAlign: 'bottom',
            },
            chart: {
                //animation: false,
                //alignTicks: true,
                //height: 224, //!
                //styledMode: true,
                events: {
                    load() {
                        console.log(tickInterval, 'load');
                        // @ts-ignore
                        console.log(this.yAxis[0].axisTitleMargin, this.yAxis[0], 'load');
                        // this.xAxis[0].update({
                        //     // @ts-ignore
                        //     left: this.yAxis[0].axisTitleMargin + 11 + 8 + 8
                        // });
                        // this.yAxis[0].update({
                        //     // @ts-ignore
                        //     left: this.yAxis[0].axisTitleMargin + 11 + 8
                        // });
                    },

                    redraw() {
                        console.log(tickInterval, 'redraw');
                        console.log({ this: this.chartWidth }, 'redraw');
                        // this.chartWidth > 580 && this.update({
                        //     chartsData: {
                        //         width: 580
                        //     }
                        // });
                    },
                    render() {
                        console.log(tickInterval, 'render');
                        console.log({  this: this.chartWidth }, 'render');
                    },
                },
                type: this.type,
                spacingLeft: 0, //*
                spacingRight: 0, //*
                spacingBottom: $chartPadding, //*
                spacingTop: $chartPadding, //*
                height: $chartHeight,
                width: $chartWidth + $chartPadding * 2, //*
                // marginRight: 20,
                style: {
                    //border: '1px solid rgba(233, 45, 4, 60%)', //! for a development
                    fontFamily: $ff,
                    fontSize: $fz,
                    color: $cDark,
                },
                //marginLeft: 90,
                //marginRight: 90
               // margin: [ 20, 20, 20, 20 ],
            },
            yAxis,
            xAxis: {
                ...this.withoutTicksStyles,
                categories,
                width: xAxisStyles.width + $columnInnerPadding,
                tickInterval: 1, //*
                left: this.lhFix(xAxisStyles.title.fz)
                    + yAxisStyles.width
                    - $columnInnerPadding
                    + $chartPadding,
                offset: this.lhFix(xAxisStyles.labels.fz, true) + xAxisStyles.labels.margin, //*
                endOnTick: true,
                title: {
                    text: xAxisStyles.title.text,
                    offset: xAxisStyles.title.margin + this.lhFix(xAxisStyles.title.fz), //*
                    y: -this.lhFix(xAxisStyles.title.fz), //*
                    style: {
                        fontSize: xAxisStyles.title.fz,
                        opacity: 0.4,
                        color: $cDark
                    },
                },
                labels: {
                    formatter() {
                        if (this.value === '0') {
                            return `<tspan dx="${-$columnInnerPadding}" style="text-anchor: end">${this.value}</tspan>`;
                        }

                        return this.value as string;
                    },
                    x: 0,
                    y: -this.lhFix(xAxisStyles.labels.fz), //*
                    style: {
                        opacity: 0.8,
                        color: $cDark,
                        fontSize: xAxisStyles.labels.fz,
                    },
                    align: 'center',
                    step: 1,
                },
            },
            // tooltip: {
            //     headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            //     pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            //         '<td style="padding:0"><b>{point.y:,.0f} </b></td></tr>',
            //     footerFormat: '</table>',
            //     shared: true,
            //     useHTML: true
            // },
            plotOptions: {
                column: {
                    animation: {
                        duration: 500,
                    },
                    minPointLength: 3, //* min column length
                    pointPadding: 0,
                    groupPadding: 0,
                    maxPointWidth: 11,
                    pointWidth: $pointWidth,
                    borderRadius: 8,
                    grouping: false,
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false,
                    },
                    point: {
                        events: {
                            mouseOver() {
                                console.log(this, 'point--->mouseOver');
                                const currentSeries = this.series;
                                const otherSeries = this.series.chart.series[this.series.index ? 0 : 1];

                                const newCategories = Array.from(Array(maxColumns)).map((_, i) => {
                                    let categoryValue = '';

                                    if (currentSeries.points[i]) {
                                        let color: string;
                                        if (i === this.index) {
                                            categoryValue = (this.index + 1).toString();

                                            color = currentSeries.index
                                                ? $cChartFocus1
                                                : $cChartFocus2;
                                        } else {
                                            color = currentSeries.index
                                                ? $cChartHover1
                                                : $cChartHover2;
                                        }

                                        currentSeries.points[i].update({ color }, false);
                                    }

                                    if (otherSeries.points[i]) {
                                        otherSeries.points[i].update({
                                            color: otherSeries.index
                                                ? $cChartHover1
                                                : $cChartHover2
                                        }, false);
                                    }

                                    return categoryValue;
                                });

                                this.series.xAxis.update({
                                    labels: {
                                        style: {
                                            opacity: 1
                                        }
                                    }
                                }, false);
                                this.series.xAxis.setCategories(newCategories, true);
                            },
                            mouseOut() {
                                const currentSeries = this.series;
                                const otherSeries = this.series.chart.series[this.series.index ? 0 : 1];

                                Array.from(Array(maxColumns)).forEach((_, i) => {
                                    if (currentSeries.points[i]) {
                                        currentSeries.points[i].update({
                                            color: this.series.index
                                                ? $cChart1
                                                : $cChart2
                                        }, false);
                                    }

                                    if (otherSeries.points[i]) {
                                        otherSeries.points[i].update({
                                            color: this.series.index
                                                ? $cChart2
                                                : $cChart1
                                        }, false);
                                    }


                                });

                                this.series.xAxis.update({
                                    labels: {
                                        style: {
                                            opacity: 0.8
                                        }
                                    }
                                }, false);

                                this.series.xAxis.setCategories(categories, true);
                            }
                        }
                    },
                },
                series: {
                    states: {
                        inactive: {
                            opacity: 1,
                        },
                    },
                    crisp: false,
                    shadow: false,
                    showInLegend: false,
                    opacity: 1,
                }
            },
            series: this.data.map((d, i) => {
                return {
                    color: i ? $cChart1 : $cChart2,
                    type: this.type,
                    data: d,
                };
            }),
            // responsive:{
            //     rules:[ {
            //         //chartOptions:undefined
            //         condition:{
            //             //callback:undefined
            //             //maxHeight:undefined
            //             maxWidth:800,
            //             // minHeight:0
            //             minWidth: 7000
            //         }
            //     } ]
            // }
        };

        return options;
    }

    public chartSetup = (data: number[][]) => {
        console.log(222, this);
        const options = this.getOptions(data);

        return {
            options,
            chartOuterWidth: this.chartOuterWidth as number,
            chartWidth: this.styles.$chartWidth,
            chartPadding: this.styles.$chartPadding,
        };
    };
}
