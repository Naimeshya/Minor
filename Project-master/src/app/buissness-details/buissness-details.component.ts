import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ServiceService } from './../shared/services/service.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
@Component({
  selector: 'app-buissness-details',
  templateUrl: './buissness-details.component.html',
  styleUrls: ['./buissness-details.component.scss']
})
export class BuissnessDetailsComponent implements OnInit {
  user: any;
  
  constructor(private route: Router, private service: ServiceService, private router: ActivatedRoute, private formBuilder: FormBuilder,) { 
    this.user=this.service.analises;
  }

  ngOnInit(): void {
   console.log(this.user)
  this.paichart(this.user);
    // this.getBaseCategories();

  }
  next(user) {
  }
  paichart(data){
    // am4core.useTheme(am4themes_animated);
// Themes end

let chart = am4core.create("chartdiv", am4charts.PieChart3D);
chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

chart.legend = new am4charts.Legend();

chart.data = [
  {
    country: "Positive Tweets",
    litres: data[0].length
  },
  {
    country: "Negative Tweets",
    litres: data[1].length
  },
  {
    country: "Neutral Tweets",
    litres:data[2].length
  },
  {
    country: "Depressed Tweets",
    litres: data[3].length
  },
  
];

let series = chart.series.push(new am4charts.PieSeries3D());
series.dataFields.value = "litres";
series.dataFields.category = "country";
  }
 
}
