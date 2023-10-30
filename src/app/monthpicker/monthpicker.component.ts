import { Component, EventEmitter, Output, ChangeDetectorRef } from '@angular/core';


@Component({
    selector: 'app-monthpicker',
    templateUrl: './monthpicker.component.html',
    styleUrls:['./monthpicker.component.css']
})
export class MonthpickerComponent {

  @Output() outputToParent = new EventEmitter<string>();

  currentLowerBoundLabel: string;
  currentUpperBoundLabel: string;

  currentYearIndex: number;
  currentMonthsViewSliceIndexes: Array<number>;
  monthsViewSlices: Array<Array<number>>;

  years: Array<number>;
  months: Array<string>;

  monthsData: Array<{
    monthName: string,
    monthYear: number,
    isInRange: boolean,
    isLowerEdge: boolean,
    isUpperEdge: boolean
  }>

  rangeState: { edge1Exists: boolean, edge2Exists: boolean, edgeIndexes: Array<number> }

  constructor(public cdr: ChangeDetectorRef) {}

  onClick(indexClicked) {

      if (!this.rangeState.edge1Exists) {
        this.rangeState.edge1Exists = true;
        let globalIndexClicked = this.currentMonthsViewSliceIndexes[0] + indexClicked;
        this.rangeState.edgeIndexes[0] = globalIndexClicked;
        this.monthsData[globalIndexClicked].isInRange = true;
        this.currentLowerBoundLabel = this.monthsData[globalIndexClicked].monthName + " " + this.monthsData[globalIndexClicked].monthYear;
      } else
      if (!this.rangeState.edge2Exists) {
        this.rangeState.edge2Exists = true;
        this.rangeState.edgeIndexes[1] = this.currentMonthsViewSliceIndexes[0] + indexClicked;
        this.rangeState.edgeIndexes.sort((a,b)=>a-b);
        this.monthsData.forEach((month, index) => {
          if ((this.rangeState.edgeIndexes[0] <= index) && (index <= this.rangeState.edgeIndexes[1])) {
            month.isInRange = true;
          };
          if (this.rangeState.edgeIndexes[0] === index) {
            month.isLowerEdge = true;
          };
          if (this.rangeState.edgeIndexes[1] === index) {
            month.isUpperEdge = true;
          };
        })
        this.currentLowerBoundLabel = this.monthsData[this.rangeState.edgeIndexes[0]].monthName + " " + this.monthsData[this.rangeState.edgeIndexes[0]].monthYear;
        this.currentUpperBoundLabel = this.monthsData[this.rangeState.edgeIndexes[1]].monthName + " " + this.monthsData[this.rangeState.edgeIndexes[1]].monthYear;
        this.sendToParent(this.currentLowerBoundLabel + " to " + this.currentUpperBoundLabel )
      } else {
        this.initRangeState();
        this.initMonthsDataState();
        this.onClick(indexClicked);
      };
  };

  decrementdisplayYear() {
    if (this.currentYearIndex !==0) {
      this.currentYearIndex--;
      this.currentMonthsViewSliceIndexes = this.monthsViewSlices[this.currentYearIndex];
    };
  }

  incrementdisplayYear() {
    if (this.currentYearIndex !== this.years.length-1) {
      this.currentYearIndex++
      this.currentMonthsViewSliceIndexes = this.monthsViewSlices[this.currentYearIndex];
    };
  }

  sendToParent(string:string) {
    this.outputToParent.emit(string);
  }

  initRangeState() {
    this.rangeState = {
      edge1Exists: false,
      edge2Exists: false,
      edgeIndexes: []
    };
    this.currentLowerBoundLabel = "Please select month";
    this.currentUpperBoundLabel = "Please select month";
  };

  initMonthsDataState() {
    this.monthsData = new Array();
    this.years.forEach( year => {
      this.months.forEach( month => {
        this.monthsData.push({
          monthName: month,
          monthYear: year,
          isInRange: false,
          isLowerEdge: false,
          isUpperEdge: false
        })
      })
    })
    this.months.forEach( month => {
        this.monthsData.push({
          monthName: month,
          monthYear: this.years[this.years.length-1],
          isInRange: false,
          isLowerEdge: false,
          isUpperEdge: false
        })
      })
    console.log(this.monthsData)
  }

  ngOnInit() {
    this.initRangeState();
    this.currentLowerBoundLabel = this.currentUpperBoundLabel = "Please select month";
    this.currentYearIndex = 1;
    this.monthsViewSlices = [
       [0,24], [6,30], [18,42], [30,54], [42,66], [54,78], [66,90]
    ];
    this.currentMonthsViewSliceIndexes = this.monthsViewSlices[1];
    this.years = [ 2018, 2019, 2020, 2021, 2022, 2023, 2024 ];
    this.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    this.initMonthsDataState();
    console.log(this.monthsData)
  }

}
