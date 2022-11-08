import { useStyle } from '../hooks/useStyle';
import { Options } from 'highcharts';

class ChartConfig {
    public data: number[][] = [];

    //constructor() {}
}

interface IAdditionalStyles {
    $chartWidth?: number;
    $pointWidth?: number;
    $columnInnerPadding?: number;
}
type TStyles<T extends string> = (Record<`$${T}`, string> & IAdditionalStyles) | Record<string, never>;

export class ColumnChartConfig extends ChartConfig {
    private static defaultStyles = {
        $chartWidth: 580,
        $pointWidth: 11,
        $columnInnerPadding: 6
    };
    private readonly stylesList = [ 'cChart1', 'cChart2', 'cDark', 'fz', 'lh', 'maxScreen', 'ff', 'cChartHover1', 'cChartHover2' ] as const;
    private readonly styles: TStyles<typeof this.stylesList[number]> = {};
    private maxColumns: number | null = null;
    private categories: string[] = [];

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

    private setChartWidth() {
        const defaultStyles = ColumnChartConfig.defaultStyles;

        this.styles.$chartWidth = window.innerWidth > +this.styles.$maxScreen
            ? defaultStyles.$chartWidth
            : defaultStyles.$chartWidth / +this.styles.$maxScreen * window.innerWidth;
    }

    private getPointWidth() {
        const defaultStyles = ColumnChartConfig.defaultStyles;

        return this.styles.$chartWidth
            ? defaultStyles.$pointWidth / defaultStyles.$chartWidth * this.styles.$chartWidth
            : defaultStyles.$chartWidth;
    }

    constructor(
        options: IAdditionalStyles = {
            $columnInnerPadding: ColumnChartConfig.defaultStyles.$columnInnerPadding,
            $chartWidth: ColumnChartConfig.defaultStyles.$chartWidth,
            $pointWidth: ColumnChartConfig.defaultStyles.$pointWidth
        },
    ) {
        super();

        ColumnChartConfig.defaultStyles = {
            ...ColumnChartConfig.defaultStyles,
            $chartWidth: options.$chartWidth || ColumnChartConfig.defaultStyles.$chartWidth,
            $pointWidth: options.$pointWidth || ColumnChartConfig.defaultStyles.$pointWidth,
            $columnInnerPadding: options.$columnInnerPadding || ColumnChartConfig.defaultStyles.$columnInnerPadding
        };

        this.styles = useStyle([ ...this.stylesList ]);
        this.setChartWidth();
        const additionalStyles = {
            $pointWidth: this.getPointWidth(),
            $columnInnerPadding: ColumnChartConfig.defaultStyles.$columnInnerPadding
        };

        this.styles = {
            ...this.styles,
            ...additionalStyles
        };
    }

    public getChartOptions(data: number[][]) {
        this.data = data;
        this.maxColumns = data[0].length > data[1].length ? data[0].length : data[1].length;
        this.categories = Array.from(Array(this.maxColumns + 1)).map((v, i) => {
            if (!i) return '0';
            //if (i==1) return '1';
            if (!((i+1) % 5)) return `${i+1}`;
            else return '';
        });

        const {
            $cChart1,
            $cChart2,
            $cDark,
            $ff,
            $fz,
            $cChartHover1,
            $cChartHover2,
            $columnInnerPadding = ColumnChartConfig.defaultStyles.$columnInnerPadding,
            $chartWidth = ColumnChartConfig.defaultStyles.$chartWidth,
            $pointWidth = ColumnChartConfig.defaultStyles.$pointWidth
        } = this.styles;
        const categories = this.categories;

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
                        // this.container.
                        // this.container.style.maxWidth = '58rem';
                        // console.log({  this: this.chartWidth }, 'load');
                        // this.chartWidth > 580 && this.update({
                        //     chart: {
                        //         width: 580
                        //     }
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
                type: 'column',
                // selectionMarkerFill: 'red',
                // plotBorderColor: 'red',
                // backgroundColor: 'white',
                // borderColor: 'red',
                spacingLeft: 10, //*
                spacingRight: 0, //*
                spacingBottom: 0, //*
                spacingTop: 10, //*
                width: $chartWidth, //*
                style: {
                    border: '1px solid red',
                    fontFamily: $ff,
                    fontSize: $fz,
                    color: $cDark,
                },
                //marginLeft: 90,
                //marginRight: 90
               // margin: [ 20, 20, 20, 20 ],
            },
            yAxis: { //??????
                //min: 1,
                //max: 100, //?
                startOnTick: true,
                tickInterval: 10,
                //endOnTick: false,
                // tickPosition: {
                //     startsWith(searchString: string, position?: number): boolean {
                //         console.log({ searchString, position });
                //         return true;
                //     }
                // },
                //opposite: true,
                offset: 0,
                left: 53, //?
                title: {
                    text: 'Payments',
                    style: {
                        fontSize: '0.9rem',
                        opacity: 0.4,
                        color: $cDark,
                    },
                    align: 'middle',
                    textAlign: 'center',
                    x: -(8 - this.lhFix(8))
                    //margin: 8 + 11
                    //offset: 0, //?
                    // margin: 8 + (parseFloat('0.9rem') * 10) / 3, //!!! shrift fixing
                    // x: -(parseFloat('0.9rem') * 10) / 3 //!!! shrift fixing
                },
                minorTickLength: 0,
                tickLength: 0,
                minorGridLineWidth: 0,
                lineColor: 'transparent',
                gridLineColor: 'transparent',
                //visible: false,
                // alignTicks: false,
                // ceiling: 80,
                labels: {
                    step: 1,
                    x: 0,
                    y: 0,
                    style: {
                        color: $cDark,
                        fontSize: '1rem',
                        opacity: 0.8
                    },
                    formatter() {
                        return this.value + '000' as string;
                    },

                    //align: 'right',
                    //staggerLines: 0,
                    //step: 5
                    //enabled: false,
                    //categories: [ 'apple', 'orange', 'mango' ],
                },
            },
            xAxis: { //!!!!!!!
                tickInterval: 1, //*
                left: (69) - 10, //?????
                offset: this.lhFix('1rem', true) + (8), //*
                categories,
                // range: 30,
                // minRange: 30,
                // maxRange: 30,
                title: {
                    text: 'Years',
                    style: {
                        fontSize: '0.9rem',
                        opacity: 0.4,
                        color: $cDark
                    },
                    // align: 'high',
                    // textAlign: 'left',
                    // rotation: 0,
                    offset: this.lhFix(8, true), //*
                    //margin: 8,
                    y: -this.lhFix('0.9rem'), //*
                    //x: -xAxisMarginLeft //*
                },
                //visible: false,
                //startOnTick: true,
                endOnTick: true,
                //margin: 5,
                labels: {
                    formatter() {
                        if (this.value === '0') {
                            return `<tspan dx="${-$columnInnerPadding}" style="text-anchor: end">${this.value}</tspan>`;
                        }

                        return this.value as string;
                    },
                    //x: -xAxisMarginLeft, //*
                    y: -this.lhFix('1rem'), //*
                    style: {
                        opacity: 0.8,
                        color: $cDark,
                        fontSize: '1rem',
                    },
                    align: 'center',
                    //staggerLines: 0,
                    step: 1, //!can be 5
                    //enabled: false,
                    //categories: [ 'apple', 'orange', 'mango' ],
                },
                minorTickLength: 0,
                tickLength: 0,
                lineWidth: 0,
                minorGridLineWidth: 0,
                gridLineColor: 'transparent',
                lineColor: 'transparent',
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
                    //pointPadding: columnInnerPadding / 11 / 2,
                    pointPadding: 0,
                    groupPadding: 0,
                    maxPointWidth: 11,
                    pointWidth: Math.floor($pointWidth),
                    //edgeWidth: 110,
                    //shadow: false,
                    borderRadius: 10,
                    grouping: false,
                    borderWidth: 0,
                    // stacking: 'normal',
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
                            mouseOver()  {
                                const newCategories = [ ...categories ];
                                newCategories[this.index] = (this.index + 1).toString();

                                this.update({
                                    color: this.series.index ? $cChartHover1 : $cChartHover2,
                                });
                                this.series.xAxis.setCategories(newCategories);
                            },
                            mouseOut()  {
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
                            console.log(ev, 55);
                        }
                    },
                    //connectEnds: true,
                    //clip: false,
                    //color: 'red',
                    dataLabels:{
                        enabled:true,
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
                    //color: i ? '#63BA55' : '#6BBEFB',
                    //color: i ? 'rgba(99, 186, 85, 0.6)' : 'rgba(107, 190, 251, 0.6)',
                    color: i ? $cChart1 : $cChart2,
                    //opacity: 0.6,
                    //pointPadding: i ? 0.4 : 0.2,
                    showInLegend: false,
                    //dashStyle: 'Dash',
                    type: 'column',
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
