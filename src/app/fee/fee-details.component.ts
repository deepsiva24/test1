import { Component, OnInit } from '@angular/core';
import { EChartsOption } from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { CommonModule } from '@angular/common';
import { NGX_ECHARTS_CONFIG } from 'ngx-echarts';

interface DepartmentFeeData {
  department: string;
  transportationPaid: number;
  transportationDue: number;
  examPaid: number;
  examDue: number;
  tuitionPaid: number;
  tuitionDue: number;
  digitalClassPaid: number;
  digitalClassDue: number;
}

@Component({
  selector: 'app-fee-details',
  standalone: true,
  imports: [CommonModule, NgxEchartsModule],
  templateUrl: './fee-details.component.html',
  styleUrl: './fee-details.component.scss',
  providers: [
    {
      provide: NGX_ECHARTS_CONFIG,
      useValue: { echarts: () => import('echarts') }
    }
  ]
})
export class FeeDetailsComponent implements OnInit {

  departmentFeeData: DepartmentFeeData[] = [
    {
      department: 'Computer Science',
      transportationPaid: 500,
      transportationDue: 1000,
      examPaid: 200,
      examDue: 500,
      tuitionPaid: 5000,
      tuitionDue: 10000,
      digitalClassPaid: 150,
      digitalClassDue: 300,
    },
    {
      department: 'Electrical Engineering',
      transportationPaid: 600,
      transportationDue: 900,
      examPaid: 250,
      examDue: 450,
      tuitionPaid: 6000,
      tuitionDue: 9000,
      digitalClassPaid: 180,
      digitalClassDue: 280,
    },
    {
      department: 'Mechanical Engineering',
      transportationPaid: 450,
      transportationDue: 1100,
      examPaid: 180,
      examDue: 520,
      tuitionPaid: 4500,
      tuitionDue: 11000,
      digitalClassPaid: 130,
      digitalClassDue: 320,
    },
    {
      department: 'Civil Engineering',
      transportationPaid: 550,
      transportationDue: 950,
      examPaid: 220,
      examDue: 480,
      tuitionPaid: 5500,
      tuitionDue: 9500,
      digitalClassPaid: 160,
      digitalClassDue: 290,
    },
  ];

  chartOption: EChartsOption = {};
  pieChartOption: EChartsOption = {};
  barChartOption: EChartsOption = {};

  ngOnInit(): void {
    this.initChart();
    this.initPieChart();
    this.initBarChart();
  }

  initChart(): void {
    const departments = this.departmentFeeData.map(data => data.department);
    const transportationPaid = this.departmentFeeData.map(data => data.transportationPaid);
    const transportationDue = this.departmentFeeData.map(data => data.transportationDue);
    const examPaid = this.departmentFeeData.map(data => data.examPaid);
    const examDue = this.departmentFeeData.map(data => data.examDue);
    const tuitionPaid = this.departmentFeeData.map(data => data.tuitionPaid);
    const tuitionDue = this.departmentFeeData.map(data => data.tuitionDue);
    const digitalClassPaid = this.departmentFeeData.map(data => data.digitalClassPaid);
    const digitalClassDue = this.departmentFeeData.map(data => data.digitalClassDue);

    this.chartOption = {
      color: ['#63B8FF', '#1890FF', '#5AD8A6', '#2F8C4B', '#FF9C6E', '#FF4D4F', '#9272CC', '#5B4282'], // Vibrant color palette
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        data: ['Transportation Paid', 'Transportation Due', 'Exam Paid', 'Exam Due', 'Tuition Paid', 'Tuition Due', 'Digital Class Paid', 'Digital Class Due']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: departments,
        axisLabel: { color: '#555' }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Transportation Paid',
          type: 'bar',
          stack: 'Transportation',
          emphasis: { focus: 'series' },
          data: transportationPaid
        },
        {
          name: 'Transportation Due',
          type: 'bar',
          stack: 'Transportation',
          emphasis: { focus: 'series' },
          data: transportationDue
        },
        {
          name: 'Exam Paid',
          type: 'bar',
          stack: 'Exam',
          emphasis: { focus: 'series' },
          data: examPaid
        },
        {
          name: 'Exam Due',
          type: 'bar',
          stack: 'Exam',
          emphasis: { focus: 'series' },
          data: examDue
        },
        {
          name: 'Tuition Paid',
          type: 'bar',
          stack: 'Tuition',
          emphasis: { focus: 'series' },
          data: tuitionPaid
        },
        {
          name: 'Tuition Due',
          type: 'bar',
          stack: 'Tuition',
          emphasis: { focus: 'series' },
          data: tuitionDue
        },
        {
          name: 'Digital Class Paid',
          type: 'bar',
          stack: 'Digital Class',
          emphasis: { focus: 'series' },
          data: digitalClassPaid
        },
        {
          name: 'Digital Class Due',
          type: 'bar',
          stack: 'Digital Class',
          emphasis: { focus: 'series' },
          data: digitalClassDue
        }
      ]
    };
  }

  initPieChart(): void {
    const totalPaid = this.departmentFeeData.reduce((sum, data) =>
      sum + data.transportationPaid + data.examPaid + data.tuitionPaid + data.digitalClassPaid, 0);

    const totalDue = this.departmentFeeData.reduce((sum, data) =>
      sum + data.transportationDue + data.examDue + data.tuitionDue + data.digitalClassDue, 0);

    const totalFee = totalPaid + totalDue;

    this.pieChartOption = {
      color: ['#1890FF', '#FF4D4F', '#5AD8A6'], // Contrasting colors for pie chart
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Amount Paid', 'Total Due', 'Total Fee']
      },
      series: [
        {
          name: 'Fee Summary',
          type: 'pie',
          radius: '50%',
          data: [
            { value: totalPaid, name: 'Amount Paid' },
            { value: totalDue, name: 'Total Due' },
            { value: totalFee, name: 'Total Fee' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }

  initBarChart(): void {
    const departments = this.departmentFeeData.map(data => data.department);
    const feeCollected = this.departmentFeeData.map(data =>
      data.transportationPaid + data.examPaid + data.tuitionPaid + data.digitalClassPaid
    );
    const totalFees = this.departmentFeeData.map(data =>
      data.transportationPaid + data.transportationDue +
      data.examPaid + data.examDue +
      data.tuitionPaid + data.tuitionDue +
      data.digitalClassPaid + data.digitalClassDue
    );

    this.barChartOption = {
      color: ['#1890FF', '#FF9C6E'], // Colors for collected vs total fee
      tooltip: {
        trigger: 'axis',
        axisPointer: { type: 'shadow' }
      },
      legend: {
        data: ['Fee Collected', 'Total Fee']
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: departments,
        axisLabel: { color: '#555' }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          name: 'Fee Collected',
          type: 'bar',
          emphasis: { focus: 'series' },
          data: feeCollected
        },
        {
          name: 'Total Fee',
          type: 'bar',
          emphasis: { focus: 'series' },
          data: totalFees
        }
      ]
    };
  }
} 