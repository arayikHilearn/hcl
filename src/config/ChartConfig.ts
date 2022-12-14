import { useStyle } from '../hooks/useStyle';
import { Options } from 'highcharts';
import { CURRENCY } from './index';
import numberToShortForm from '../utils/numberToShortForm';
import { WithPrefix } from '../utils/types';
import Highcharts from 'highcharts';

interface IAdditionalStyles {
    $chartWidth: number;
    $pointWidth: number;
    $columnInnerPadding: number;
    $chartPadding: number;
    $chartHeight: number;
}

type TStyles<T extends string> = (Record<WithPrefix<'$', T>, string> & IAdditionalStyles) | Record<string, never>;
type TCssStyles<T extends string> = (Record<WithPrefix<'$', T>, string>) | Record<string, never>;
export type GetArrayElementType<T extends readonly any[]> = T extends readonly (infer U)[] ? U : never;


abstract class ChartConfig {
    protected static cssStylesListDefault = [
        'cDark', 'fz', 'lh', 'ff',
        'cChart1', 'cChart2',
        'cChartFocus1', 'cChartFocus2',
        'cChartHover1', 'cChartHover2'
    ] as const;
    protected static cssStylesList: GetArrayElementType<Array<unknown>>;

    private readonly withoutTicksStyles = {
        minorTickLength: 0,
        tickLength: 0,
        lineWidth: 0,
        minorGridLineWidth: 0,
        lineColor: 'transparent',
        gridLineColor: 'transparent',
    };

    public data: number[][] = [];

    protected tickInterval = 1;
    protected maxColumns = 0;
    protected categories: string[] = [];
    protected xAxisStyles: Record<string, any> = {};
    protected yAxisStyles: Record<string, any> = {};
    protected chartOuterWidth: number | null = null;

    abstract readonly type: 'column' | 'line' | 'area'
    protected abstract styles: TStyles<string & typeof ChartConfig.cssStylesListDefault[number]>

    public abstract chartSetup(data: number[][] | {line: number[][], area: number[][]}): {
        options: Options;
    }

    protected lhFix(
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
    protected parseToNumeric(value: string, { type }: { type: 'rem' | 'px' } = { type: 'rem' }) {
        return parseFloat(value) * (type === 'rem' ? 10 : 0);
    }

    protected setupYAxis() {
        const { withoutTicksStyles, tickInterval, yAxisStyles, styles: { $chartPadding, $cDark } } = this;

        return { //??????
            ...withoutTicksStyles,
            //min: 1,
            //max: 100, //?
            endOnTick: false,
            tickInterval: tickInterval,
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
        } as Options['yAxis'];
    }
    protected setupXAxis() {
        const { categories, withoutTicksStyles, xAxisStyles, yAxisStyles, styles: { $columnInnerPadding, $chartPadding, $cDark } } = this;

        return {
            ...withoutTicksStyles,
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
        } as Options['xAxis'];
    }
    protected setupChart() {
        const { xAxisStyles: { title, labels }, styles: { $chartPadding, $chartHeight, $chartWidth, $ff, $fz, $cDark } } = this;

        return {
            spacingLeft: 0, //*
            spacingRight: 0, //*
            spacingBottom: $chartPadding, //*
            spacingTop: $chartPadding, //*
            height: $chartHeight + $chartPadding * 2,
            width: $chartWidth + $chartPadding * 2, //*
            // marginRight: 20,
            style: {
                //border: '1px solid rgba(233, 45, 4, 60%)', //! for a development
                fontFamily: $ff,
                fontSize: $fz,
                color: $cDark,
            }
        } as Options['chart'];
    }
    protected setupDefaultOptions() {
        return {
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
        } as Pick<Options, 'accessibility' | 'credits' | 'title' | 'subtitle'>;
    }

    protected setTickInterval() {
        let maxValue = 0;
        this.data.flat().forEach(value => {
            if (value > maxValue) maxValue = value;
        });
        maxValue = Math.floor(maxValue);

        if (maxValue < 10 ** 6) {
            this.tickInterval = 10 ** (maxValue.toString().length - 1);
        } else {
            this.tickInterval = 250000;
        }
    }
    protected setAxesStyles() {
        const { maxColumns, styles: { $pointWidth, $columnInnerPadding, $chartWidth } } = this;

        this.xAxisStyles = {
            width: maxColumns * $pointWidth + (maxColumns - 1) * $columnInnerPadding,
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
            width: $chartWidth - this.xAxisStyles.width,
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
    protected setupChartOptions(data: number[][]) {
        this.data = data;
        data.forEach((d) => {
            d.length > this.maxColumns && (this.maxColumns = d.length);
        });
        this.categories = Array.from(Array(this.maxColumns)).map((v, i) => {
            if (!i) return '0';
            if (!((i+1) % 5)) return `${i+1}`;
            else return '';
        });
        this.setTickInterval();
    }
    protected setupCssStyles<T extends typeof ChartConfig.cssStylesListDefault[number]>(
        cssStylesList: string[], cssExtraStyles: Partial<Record<WithPrefix<'$'>, string>>, defaultStyles: IAdditionalStyles
    ) {
        //*setup default styles
        (Object.keys(defaultStyles) as Array<keyof IAdditionalStyles>).forEach((style) => {
            this.styles[style] = defaultStyles[style];
        });

        //* get styles from cssStylesList
        const cssStyles = useStyle(cssStylesList);
        (Object.keys(cssStyles) as Array<WithPrefix<'$', T>>).forEach((style) => {
            this.styles[style] = cssStyles[style];
        });

        //* override style with cssExtraStyles
        this.styles = {
            ...this.styles,
            ...cssExtraStyles
        };

        console.log('setupCssStyles', this.styles);
    }

    //constructor() {}
}

export class ColumnChartConfig<T extends string> extends ChartConfig {
    private static defaultStyles: IAdditionalStyles = {
        $chartWidth: 0, //548,
        $pointWidth: 10.7,
        $columnInnerPadding: 6,
        $chartPadding: 16,
        $chartHeight: 224,
    };

    public readonly type = 'column';
    protected static cssStylesList = [
        ...ChartConfig.cssStylesListDefault,
        'maxScreen', 'maxContainer',
        'maxGutter', 'minGutter',
    ] as const;
    protected styles: TStyles<typeof ColumnChartConfig.cssStylesList[number]> = {};

    private setAdditionalStyles() {
        const { defaultStyles } = ColumnChartConfig;
        const { styles, maxColumns } = this;

        //?
        const containerPadding = window.innerWidth > +this.styles.$maxScreen
            ? +styles.$maxGutter
            : +styles.$maxGutter / +styles.$maxScreen * window.innerWidth;
        const fullContainer = +styles.$maxContainer + +styles.$maxGutter * 2;
        const containerWidth = window.innerWidth > fullContainer
            ? +styles.$maxContainer
            : window.innerWidth - containerPadding * 2;
        const breakPoint = +styles.$maxContainer;
        //?

        console.log({ containerWidth, breakPoint, containerPadding }, 777777);

        this.styles.$pointWidth = (containerWidth >= breakPoint
            ? defaultStyles.$pointWidth
            : defaultStyles.$pointWidth / fullContainer * containerWidth);
        this.styles.$columnInnerPadding = (defaultStyles.$columnInnerPadding / defaultStyles.$pointWidth * styles.$pointWidth);

        this.styles.$chartPadding = containerWidth >= breakPoint
            ? defaultStyles.$chartPadding
            : defaultStyles.$chartPadding / fullContainer * containerWidth;

        this.styles.$chartWidth = maxColumns * styles.$pointWidth
            + (maxColumns - 1) * styles.$columnInnerPadding
            + styles.$chartPadding * 2
            + this.lhFix('0.9rem', true) + 10; //yAxisTitleWidth + margin
        this.chartOuterWidth = styles.$chartWidth + styles.$chartPadding * 2;
    }

    constructor(
        defaultStyles: Partial<IAdditionalStyles> = {
            $columnInnerPadding: ColumnChartConfig.defaultStyles.$columnInnerPadding,
            $chartWidth: ColumnChartConfig.defaultStyles.$chartWidth,
            $pointWidth: ColumnChartConfig.defaultStyles.$pointWidth,
            $chartPadding: ColumnChartConfig.defaultStyles.$chartPadding,
            $chartHeight: ColumnChartConfig.defaultStyles.$chartHeight,
        },
        cssExtraStyles: Partial<TCssStyles<typeof ColumnChartConfig.cssStylesList[number]>> = {}
    ) {
        super();

        //* revert default styles
        ColumnChartConfig.defaultStyles = {
            ...ColumnChartConfig.defaultStyles,
            ...defaultStyles,
        };

        this.setupCssStyles([ ...ColumnChartConfig.cssStylesList ], cssExtraStyles, ColumnChartConfig.defaultStyles);
    }

    private getOptions(data: number[][]) {
        this.setupChartOptions(data);
        this.setAdditionalStyles();
        this.setAxesStyles();

        const { categories, maxColumns, type } = this;
        const {
            $cChart1,
            $cChart2,
            $cChartFocus1,
            $cChartFocus2,
            $cChartHover1,
            $cChartHover2,
            $pointWidth,
        } = this.styles;
        const defaultOptions = this.setupDefaultOptions();
        const chart = this.setupChart();
        const yAxis = this.setupYAxis();
        const xAxis = this.setupXAxis();

        console.log(this.styles, 88888);

        return {
            ...defaultOptions,
            // legend: {
            //     layout: 'vertical',
            //     align: 'center',
            //     verticalAlign: 'bottom',
            // },
            chart,
            yAxis,
            xAxis,
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
                    minPointLength: 4, //* min column length
                    pointPadding: 0,
                    groupPadding: 0,
                    maxPointWidth: ColumnChartConfig.defaultStyles.$pointWidth,
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
            series: data.map((d, i) => {
                return {
                    color: i ? $cChart1 : $cChart2,
                    type,
                    data: d,
                };
            }),
        } as Options;
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

export class LineChartConfig extends ChartConfig {
    private static defaultStyles = {
        $chartWidth: 548,
        $pointWidth: 10.7,
        $columnInnerPadding: 6,
        $chartPadding: 16,
        $chartHeight: 224,
    };

    public readonly type = 'area';
    protected static cssStylesList = [
        ...ChartConfig.cssStylesListDefault,
        'maxScreen', 'maxContainer',
        'maxGutter', 'minGutter',
    ] as const;
    protected styles: TStyles<typeof LineChartConfig.cssStylesList[number]> = {};

    private setAdditionalStyles() {
        const { defaultStyles } = LineChartConfig;
        const { styles, maxColumns } = this;

        //?
        const containerPadding = window.innerWidth > +this.styles.$maxScreen
            ? +styles.$maxGutter
            : +styles.$maxGutter / +styles.$maxScreen * window.innerWidth;
        const fullContainer = +styles.$maxContainer + +styles.$maxGutter * 2;
        const containerWidth = window.innerWidth > fullContainer
            ? +styles.$maxContainer
            : window.innerWidth - containerPadding * 2;
        const breakPoint = +styles.$maxContainer;
        //?

        console.log({ containerWidth, breakPoint, containerPadding }, 777777);

        this.styles.$pointWidth = (containerWidth >= breakPoint
            ? defaultStyles.$pointWidth
            : defaultStyles.$pointWidth / fullContainer * containerWidth);
        this.styles.$columnInnerPadding = (defaultStyles.$columnInnerPadding / defaultStyles.$pointWidth * styles.$pointWidth);

        this.styles.$chartPadding = containerWidth >= breakPoint
            ? defaultStyles.$chartPadding
            : defaultStyles.$chartPadding / fullContainer * containerWidth;

        this.styles.$chartWidth = maxColumns * styles.$pointWidth
            + (maxColumns - 1) * styles.$columnInnerPadding
            + styles.$chartPadding * 2
            + this.lhFix('0.9rem', true) + 10; //yAxisTitleWidth + margin
        this.chartOuterWidth = styles.$chartWidth + styles.$chartPadding * 2;
    }

    constructor(
        defaultStyles: Partial<IAdditionalStyles> = {
            $columnInnerPadding: LineChartConfig.defaultStyles.$columnInnerPadding,
            $chartWidth: LineChartConfig.defaultStyles.$chartWidth,
            $pointWidth: LineChartConfig.defaultStyles.$pointWidth,
            $chartPadding: LineChartConfig.defaultStyles.$chartPadding,
            $chartHeight: LineChartConfig.defaultStyles.$chartHeight,
        },
        cssExtraStyles: Partial<TCssStyles<typeof LineChartConfig.cssStylesList[number]>> = {}
    ) {
        super();

        //* revert default styles
        LineChartConfig.defaultStyles = {
            ...LineChartConfig.defaultStyles,
            ...defaultStyles,
        };

        this.setupCssStyles([ ...LineChartConfig.cssStylesList ], cssExtraStyles, LineChartConfig.defaultStyles);
        //this.setCssStyles(styles, defaultStyles);
    }


    private getOptions(lineData: number[][], areaData: number[][]) {
        this.setupChartOptions([ ...lineData, ...areaData ]);
        this.setAdditionalStyles();
        this.setAxesStyles();

        const { categories, maxColumns, type, tickInterval } = this;
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
        const defaultOptions = this.setupDefaultOptions();
        const chart = this.setupChart();
        const yAxis = this.setupYAxis();
        const xAxis = this.setupXAxis();

        return {
            ...defaultOptions,
            chart,
            yAxis,
            xAxis,
            tooltip: {
                split: true,
                formatter(tooltip) {
                    tooltip.chart.series;
                    console.log(tooltip.chart.series, 'formatter');
                    //return ' aa';
                    const p = this.points?.[0];
                    console.log(this);
                    return 'Country: <strong>' + p?.series?.name + '</strong>'
                        + '<br />Year: <strong>' + this.x + '</strong>'
                        + '<br />Quantity: <strong>' + p?.y + '</strong>';
                }
            },
            plotOptions: {
                //pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.1f} billion Gt)<br/>',
                area: {
                    fillColor: {
                        linearGradient: {
                            x1: 0,
                            y1: 0,
                            x2: 0,
                            y2: 1
                        },
                        stops: [
                            //@ts-ignore
                            [ 0, Highcharts.getOptions().colors[0] ],
                            //@ts-ignore
                            [ 1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba') ]
                        ]
                    },
                    marker: {
                        radius: 2
                    },
                    lineWidth: 1,
                    states: {
                        hover: {
                            lineWidth: 1
                        }
                    },
                    threshold: null
                },
                series: {
                    // states: {
                    //     inactive: {
                    //         opacity: 1,
                    //     },
                    // },
                    // crisp: false,
                    // shadow: false,
                    showInLegend: false,
                    //opacity: 1,
                }
            },
            series: [
                ...lineData.map((d, i) => {
                    return {
                        dashStyle: 'Dash',
                        color: i ? $cChart1 : $cChart2,
                        type: 'line',
                        data: d,
                    };
                }),
                ...areaData.map((d, i) => {
                    return {
                        //dashStyle: 'Dash',
                        color: i ? $cChart1 : $cChart2,
                        type: 'area',
                        data: d,
                    };
                })
            ]
        } as Options;
    }

    public chartSetup = ({ line, area }: { line: number[][], area: number[][] }) => {
        console.log(222, this);
        const options = this.getOptions(line, area);

        return {
            options: options,
            chartOuterWidth: this.chartOuterWidth as number,
            chartWidth: this.styles.$chartWidth,
            chartPadding: this.styles.$chartPadding,
        };
    };
}
