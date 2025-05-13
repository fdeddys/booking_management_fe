import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { StackedBarChartComponent } from '../share/charts/stacked-bar-chart/stacked-bar-chart.component';
import { PieChartComponent } from '../share/charts/pie-chart/pie-chart.component';
import { LineChartComponent } from '../share/charts/line-chart/line-chart.component';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, SharedModule, 
    StackedBarChartComponent,
    PieChartComponent,
    LineChartComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  chartData = {
    labels: ['Januari', 'Februari', 'Maret'],
    datasets: [
      {
        label: 'Approved',
        data: [10, 20, 30],
        backgroundColor: '#4CAF50'
      },
      {
        label: 'Pending',
        data: [5, 10, 15],
        backgroundColor: '#FFC107'
      },
      {
        label: 'Rejected',
        data: [2, 4, 8],
        backgroundColor: '#F44336'
      }
    ]
  };
  
  chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Statistik Booking'
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true
      }
    }
  };
  

  pieChartLabels: string[] = ['Room A', 'Room B', 'Room C'];
  pieChartData: number[] = [40, 30, 30];
  pieChartType: string = 'pie';
}
