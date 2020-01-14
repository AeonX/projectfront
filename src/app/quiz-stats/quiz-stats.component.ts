import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz-stats',
  templateUrl: './quiz-stats.component.html',
  styleUrls: ['./quiz-stats.component.scss']
})
export class QuizStatsComponent implements OnInit {

  constructor() { }

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  public barChartLabels = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10'];
  public barChartType = 'bar';
  public barChartLegend = true;
  public barChartData = [
    {data: [90, 100, 40, 20, 60, 80, 80, 90, 90, 100, 100, 70], label: 'Quiz: Module 1', backgroundColor: '#2ecc71'}
  ];

  public barChartLabels1 = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10'];
  public barChartType1 = 'bar';
  //public barChartLegend1 = true;
  public barChartData1 = [
    {data: [40, 60, 40, 100, 30, 80, 50, 60, 40, 20, 60, 40], label: 'Quiz: Module 2', backgroundColor: '#e67e22'}
  ];

  public barChartLabels2 = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10'];
  public barChartType2 = 'bar';
  //public barChartLegend2 = true;
  public barChartData2 = [
    {data: [80, 20, 40, 70, 20, 100, 40, 60, 80, 90, 50, 100], label: 'Quiz: Module 3', backgroundColor: '#f1c40f'}
  ];

  public barChartLabels3 = ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10'];
  public barChartType3 = 'bar';
  //public barChartLegend3 = true;
  public barChartData3 = [
    {data: [12, 12, 17, 10, 31, 22, 34, 30, 1, 11, 21, 13], label: 'Students enrolled in Java Fundamentals', backgroundColor: '#e74c3c'}
  ];

  ngOnInit() {
  }

}
