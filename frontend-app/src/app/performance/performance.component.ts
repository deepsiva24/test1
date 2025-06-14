import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule, NGX_ECHARTS_CONFIG } from 'ngx-echarts';
import type { EChartsOption } from 'echarts';

@Component({
  selector: 'app-performance',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss'],
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useValue: { echarts: () => import('echarts') }
    }
  ]
})
export class PerformanceComponent implements OnInit {

  barChartOptions: EChartsOption = {};
  pieChartOptions: EChartsOption = {};

  ngOnInit(): void {
    this.setupBarChart();
    this.setupPieChart();
  }

  setupBarChart(): void {
    this.barChartOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: ['Math', 'Science', 'History', 'English'],
        axisLabel: { color: '#555' }
      },
      yAxis: {
        type: 'value',
        name: 'Score',
        axisLabel: { color: '#555' }
      },
      series: [
        {
          name: 'Scores',
          type: 'bar',
          data: [85, 65, 90, 75],
          itemStyle: {
            color: '#4f8cff'
          }
        }
      ]
    };
  }

  setupPieChart(): void {
    this.pieChartOptions = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        textStyle: { color: '#555' }
      },
      series: [
        {
          name: 'Attendance',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 20,
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          data: [
            { value: 70, name: 'Present', itemStyle: { color: '#2ecc40' } },
            { value: 15, name: 'Absent', itemStyle: { color: '#e53935' } },
            { value: 15, name: 'Leave', itemStyle: { color: '#f7971e' } }
          ]
        }
      ]
    };
  }
} 