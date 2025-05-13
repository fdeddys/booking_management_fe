import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-stacked-bar-chart',
  imports: [],
  templateUrl: './stacked-bar-chart.component.html',
  styleUrl: './stacked-bar-chart.component.scss'
})
export class StackedBarChartComponent {
  @ViewChild('chartCanvas', { static: true }) chartRef!: ElementRef;
  @Input() data: any;
  @Input() options: any;

  chart: any;

  ngAfterViewInit() {
    this.chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      data: this.data,
      options: this.options
    });
  }
}
