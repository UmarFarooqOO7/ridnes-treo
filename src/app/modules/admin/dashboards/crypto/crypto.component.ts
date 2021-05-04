import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { merge } from 'lodash-es';
import * as moment from 'moment';
import { ApexOptions, ChartComponent } from 'ng-apexcharts';
import { TreoConfigService } from '@treo/services/config';
import { TreoMediaWatcherService } from '@treo/services/media-watcher';
import { CryptoService } from 'app/modules/admin/dashboards/crypto/crypto.service';

@Component({
    selector       : 'crypto',
    templateUrl    : './crypto.component.html',
    styleUrls      : ['./crypto.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CryptoComponent implements OnInit, OnDestroy
{
    @ViewChild('btcChartComponent') btcChartComponent: ChartComponent;
    appConfig: any;
    btcOptions: ApexOptions | any;
    data: any;
    drawerMode: 'over' | 'side' = 'side';
    drawerOpened: boolean = true;
    watchlistChartOptions: ApexOptions;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _cryptoService: CryptoService,
        private _changeDetectorRef: ChangeDetectorRef,
        private _treoConfigService: TreoConfigService,
        private _treoMediaWatcherService: TreoMediaWatcherService
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Subscribe to media changes
        this._treoMediaWatcherService.onMediaChange$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({matchingAliases}) => {

                // Set the drawerMode and drawerOpened if 'lg' breakpoint is active
                if ( matchingAliases.includes('lg') )
                {
                    this.drawerMode = 'side';
                    this.drawerOpened = true;
                }
                else
                {
                    this.drawerMode = 'over';
                    this.drawerOpened = false;
                }

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the app config
        this._treoConfigService.config$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((config) => {

                // Store the config
                this.appConfig = config;

                // Update the chart options
                if ( this.btcChartComponent )
                {
                    this.btcChartComponent.updateOptions(merge(this.btcOptions, {
                        grid : {
                            borderColor: this._getBorderColor()
                        },
                        xaxis: {
                            axisTicks : {
                                color: this._getBorderColor()
                            },
                            crosshairs: {
                                fill: {
                                    color: this._getBorderColor()
                                }
                            }
                        },
                        yaxis: {
                            axisTicks: {
                                color: this._getBorderColor()
                            }
                        }
                    }));
                }
            });

        // Get the data
        this._cryptoService.data$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {

                // Store the data
                this.data = data;

                // Prepare the chart data
                this._prepareChartData();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the correct border color depending on the current scheme
     * @private
     */
    private _getBorderColor(): string
    {
        return this.appConfig.scheme === 'dark' ? 'rgba(237, 242, 247, 0.12)' : '#CBD5E0';
    }

    /**
     * Prepare the chart data from the data
     *
     * @private
     */
    private _prepareChartData(): void
    {
        // BTC
        this.btcOptions = {
            chart     : {
                animations: {
                    enabled: false
                },
                fontFamily: 'inherit',
                foreColor : 'inherit',
                width     : '100%',
                height    : '100%',
                type      : 'line',
                toolbar   : {
                    show: false
                },
                zoom      : {
                    enabled: false
                }
            },
            colors    : ['#5A67D8'],
            dataLabels: {
                enabled: false
            },
            grid      : {
                borderColor    : this._getBorderColor(),
                position       : 'back',
                show           : true,
                strokeDashArray: 6,
                xaxis          : {
                    lines: {
                        show: true
                    }
                },
                yaxis          : {
                    lines: {
                        show: true
                    }
                }
            },
            legend    : {
                show: false
            },
            series    : this.data.btc.price.series,
            stroke    : {
                width: 2,
                curve: 'straight'
            },
            tooltip   : {
                shared: true,
                theme : 'dark',
                y     : {
                    formatter: (value: number) => {
                        return '$' + value.toFixed(2);
                    }
                }
            },
            xaxis     : {
                type      : 'numeric',
                crosshairs: {
                    show    : true,
                    position: 'back',
                    fill    : {
                        type : 'color',
                        color: this._getBorderColor()
                    },
                    width   : 3,
                    stroke  : {
                        dashArray: 0,
                        width    : 0
                    },
                    opacity : 0.9
                },
                tickAmount: 8,
                axisTicks : {
                    show : true,
                    color: this._getBorderColor()
                },
                axisBorder: {
                    show: false
                },
                tooltip   : {
                    enabled: false
                },
                labels    : {
                    show                 : true,
                    trim                 : false,
                    rotate               : 0,
                    minHeight            : 40,
                    hideOverlappingLabels: true,
                    formatter            : (value) => {
                        return moment().subtract(Math.abs(parseInt(value, 10)), 'minutes').format('HH:mm');
                    },
                    style                : {
                        colors: 'currentColor'
                    }
                }
            },
            yaxis     : {
                axisTicks     : {
                    show : true,
                    color: this._getBorderColor()
                },
                axisBorder    : {
                    show: false
                },
                forceNiceScale: true,
                labels        : {
                    minWidth : 40,
                    formatter: (value: number) => {
                        return '$' + value.toFixed(0);
                    },
                    style    : {
                        colors: 'currentColor'
                    }
                }
            }
        };

        // Watchlist options
        this.watchlistChartOptions = {
            chart  : {
                animations: {
                    enabled: false
                },
                width     : '100%',
                height    : '100%',
                type      : 'line',
                sparkline : {
                    enabled: true
                }
            },
            colors : ['#A0AEC0'],
            stroke : {
                width: 2,
                curve: 'smooth'
            },
            tooltip: {
                enabled: false
            },
            xaxis  : {
                type: 'category'
            }
        };
    }
}
