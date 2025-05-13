import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ChartData, ChartOptions, ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  imports: [CommonModule, NgChartsModule],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss'
})
export class PieChartComponent {
  // pieChartLabels: string[] = ['Room A', 'Room B', 'Room C'];
  // pieChartData: number[] = [40, 30, 30];
  pieChartType:  'pie' = 'pie';
  
  pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Room A', 'Room B', 'Room C'],
    datasets: [
      {
        data: [40, 30, 30],
        backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
      },
    ],
  };

  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
    },
  };
  
  
}
