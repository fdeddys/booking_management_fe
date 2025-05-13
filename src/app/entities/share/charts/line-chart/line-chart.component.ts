import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartData } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-line-chart',
  imports: [CommonModule, NgChartsModule],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss'
})
export class LineChartComponent {


  lineChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'],
    datasets: [
      {
        data: [5, 10, 15, 7, 12],
        label: 'booking'
      },
    ],
  };

  // lineChartLabels = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
  lineChartOptions = {
    responsive: true
  };
  lineChartType: 'line' = 'line';
}
