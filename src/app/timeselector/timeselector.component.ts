import { Component } from '@angular/core';


@Component({
    selector: 'app-timeselector',
    templateUrl: './timeselector.component.html',
    styleUrls: ['./timeselector.component.css']
})
export class TimeselectorComponent {
    public toggle = true;
    isDisabled=false;

    mode='Calendar year';

    public disabled = true;
    public selectedSource = 'Calendar year';

    arrowSymbol = String.fromCharCode(parseInt('128', 197));

    public sources  = ['Calendar year', 'Year-to-date', 'Rolling 12 months', 'Current quarter'];

    recievedFromChild:string="CY 2017 vs CY 2018";

    GetOutputVal($event: any) {
        this.recievedFromChild=$event;
    }

    handleChange(e: any) {
        const isChecked = e;
        console.log('Comparing: ' + isChecked);
        this.isDisabled = !this.isDisabled;
        console.log('Activate: ' + this.isDisabled);
    }

    modeApply() {
        console.log("Mode is: "+this.mode);
        if(this.mode==='Year-to-date') {
            
        }
    }

 
}
