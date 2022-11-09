import { useStyle } from '../hooks/useStyle';
import { Options } from 'highcharts';
import { CURRENCY } from './index';
import numberToShortForm from '../utils/numberToShortForm';

abstract class ChartConfig {
    public data: number[][] = [];
    public abstract getOptions(data: number[][]): Options
    abstract readonly type: 'column'

    //constructor() {}
}

interface IAdditionalStyles {
    $chartWidth: number;
    $pointWidth: number;
    $columnInnerPadding: number;
    $chartPadding: number;
    $chartHeight: number;
}

type TStyles<T extends string> = (Record<`$${T}`, string> & IAdditionalStyles) | Record<string, never>;

export class ColumnChartConfig extends ChartConfig {
    public readonly type = 'column';
    private static defaultStyles = {
        $chartWidth: 557, //? value=(548 + 9) 548 is width from design and 9 IS FOR FIXATION design issue
        $pointWidth: 11,
        $columnInnerPadding: 6,
        $chartPadding: 16,
        $chartHeight: 256,
    };
    private readonly withoutTicksStyles = {
        minorTickLength: 0,
        tickLength: 0,
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        gridLineColor: 'transparent',
    };
    private readonly stylesList = [ 'cChart1', 'cChart2', 'cDark', 'fz', 'lh', 'maxContainer', 'ff', 'cChartHover1', 'cChartHover2' ] as const;
    private styles: TStyles<typeof this.stylesList[number]> = {};
    private maxColumns: number | null = null;
    private categories: string[] = [];
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

    private setCssStyles() {
        const cssStyles = useStyle([ ...this.stylesList ]);
        (Object.keys(cssStyles) as Array<`$${typeof this.stylesList[number]}`>).forEach((style) => {
            this.styles[style] = cssStyles[style];
        });
    }

    private setAdditionalStyles() {
        const defaultStyles = ColumnChartConfig.defaultStyles;

        (Object.keys(ColumnChartConfig.defaultStyles) as Array<keyof IAdditionalStyles>).forEach((style) => {
            this.styles[style] = defaultStyles[style];
        });

        this.styles.$chartWidth = window.innerWidth > +this.styles.$maxContainer
            ? defaultStyles.$chartWidth
            : (defaultStyles.$chartWidth - defaultStyles.$chartPadding * 2) / +this.styles.$maxContainer * window.innerWidth;
        this.styles.$pointWidth = defaultStyles.$pointWidth / defaultStyles.$chartWidth * this.styles.$chartWidth;
        this.styles.$columnInnerPadding = defaultStyles.$columnInnerPadding / defaultStyles.$pointWidth * this.styles.$pointWidth;
        this.styles.$chartPadding = defaultStyles.$chartPadding / defaultStyles.$chartWidth * this.styles.$chartWidth;
        //this.styles.$chartHeight = defaultStyles.$chartHeight / defaultStyles.$chartWidth * this.styles.$chartWidth;
    }

    private getTickInterval() {
        let maxValue = 0;
        this.data.flat().forEach(value => {
            if (value > maxValue) maxValue = value;
        });
        maxValue = Math.floor(maxValue);

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

    private setUpChartOptions(data: number[][]) {
        this.data = data;
        this.maxColumns = data[0].length > data[1].length ? data[0].length : data[1].length;
        this.categories = Array.from(Array(this.maxColumns + 1)).map((v, i) => {
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
    ) {
        super();

        ColumnChartConfig.defaultStyles = {
            ...ColumnChartConfig.defaultStyles,
            ...options,
        };

        this.setCssStyles();

        console.log(this.styles, 88888);
    }

    public getOptions(data: number[][]) {
        this.setAdditionalStyles();
        this.setUpChartOptions(data);

        const { xAxisStyles, yAxisStyles, categories } = this;
        const {
            $cChart1,
            $cChart2,
            $cDark,
            $ff,
            $fz,
            $cChartHover1,
            $cChartHover2,
            $columnInnerPadding,
            $chartWidth,
            $pointWidth,
            $chartPadding,
            $chartHeight
        } = this.styles;

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
                //alignTicks: true,
                //height: 224, //!
                //styledMode: true,
                events: {
                    load() {
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
                        console.log({ this: this.chartWidth }, 'redraw');
                        // this.chartWidth > 580 && this.update({
                        //     chart: {
                        //         width: 580
                        //     }
                        // });
                    },
                    render() {
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
                marginRight: 20,
                style: {
                    border: '1px solid rgba(233, 45, 4, 60%)', //! for a development
                    fontFamily: $ff,
                    fontSize: $fz,
                    color: $cDark,
                },
                //marginLeft: 90,
                //marginRight: 90
               // margin: [ 20, 20, 20, 20 ],
            },
            yAxis: { //??????
                ...this.withoutTicksStyles,
                //min: 1,
                //max: 100, //?
                endOnTick: false,
                tickInterval: this.tickInterval,
                offset: 0,
                left: yAxisStyles.width - yAxisStyles.labels.margin + $chartPadding,
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
                        color: $cDark,
                    },
                },
                labels: {
                    step: 1,
                    x: -this.lhFix(yAxisStyles.title.fz),
                    y: 0,
                    style: {
                        color: $cDark,
                        fontSize: yAxisStyles.labels.fz,
                        opacity: 0.8
                    },
                    formatter() {
                        const price = CURRENCY + numberToShortForm(this.value as number);

                        return price;
                    },
                },
            },
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
                    minPointLength: 3, //* min column length
                    pointPadding: 0,
                    groupPadding: 0,
                    maxPointWidth: 11,
                    pointWidth: $pointWidth,
                    borderRadius: 10,
                    grouping: false,
                    borderWidth: 0,
                    dataLabels: {
                        enabled: false,
                    },
                    events: {
                        // mouseOver()  {
                        //     const newCategories = [ ...categories ];
                        //     newCategories[this.index] = (this.index + 1).toString();
                        //
                        //     console.log(this.points, 97865);
                        //     // this.series.points[0].getLabelConfig().point.update({
                        //     //     grou: 40,
                        //     //     label: '23'
                        //     // });
                        //     // this.series.xAxis.update({
                        //     //     labels: {
                        //     //         x: 0,
                        //     //         align: 'center'
                        //     //     }
                        //     // });
                        //     // this.series.options({
                        //     //     labels: {
                        //     //         x: 0,
                        //     //         align: 'center'
                        //     //     }
                        //     // })
                        //     //this.series.xAxis.setCategories(newCategories);
                        //     //this.options..
                        // }
                    },
                    point: {
                        events: {
                            mouseOver() {
                                const newCategories = [ ...categories ];
                                newCategories[this.index] = (this.index + 1).toString();

                                this.update({
                                    color: this.series.index ? $cChartHover1 : $cChartHover2,
                                });
                                this.series.xAxis.setCategories(newCategories);
                            },
                            mouseOut() {
                                this.update({
                                    color: this.series.index ? $cChart1 : $cChart2,
                                });
                                this.series.xAxis.setCategories(categories);
                            }
                        }
                    },
                },
                series: {
                    events: {
                        mouseOver(ev) {
                            console.log(ev, 'series--->mouseOver');
                        }
                    },
                    //connectEnds: true,
                    //clip: false,
                    //color: 'red',
                    dataLabels:{
                        enabled: true,
                        // formatter: function() {
                        //     const pcnt = (this.y /  totals[this.point.index]) * 100;
                        //     return Highcharts.numberFormat(pcnt, 0) + '%';
                        // }
                    }
                }
            },
            series: this.data.map((d, i) => {
                return {
                    shadow: false,
                    color: i ? $cChart1 : $cChart2,
                    showInLegend: false,
                    type: this.type,
                    data: d
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
}
