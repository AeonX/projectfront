import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  constructor() { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [8, 12, 25, 26, 12, 30, 36, 29, 6, 18, 21, 14], label: 'Students enrolled in Angular Fundamentals', backgroundColor: '#2ecc71'}
  ];

  public barChartLabels1 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChartType1 = 'bar';
  //public barChartLegend1 = true;
  public barChartData1 = [
    {data: [4, 6, 4, 14, 22, 18, 5, 16, 24, 21, 22, 14], label: 'Students enrolled in Spring Fundamentals', backgroundColor: '#e67e22'}
  ];

  public barChartLabels2 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChartType2 = 'bar';
  //public barChartLegend2 = true;
  public barChartData2 = [
    {data: [18, 12, 4, 17, 2, 12, 40, 32, 34, 19, 25, 18], label: 'Students enrolled in RxJs', backgroundColor: '#f1c40f'}
  ];

  public barChartLabels3 = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public barChartType3 = 'bar';
  //public barChartLegend3 = true;
  public barChartData3 = [
    {data: [12, 12, 17, 10, 31, 22, 34, 30, 1, 11, 21, 13], label: 'Students enrolled in Java Fundamentals', backgroundColor: '#e74c3c'}
  ];

  ngOnInit() {
  }

}
