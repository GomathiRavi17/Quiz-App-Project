import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EnablefsComponent } from '../enablefs/enablefs.component';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit{
  qName: string = "";

  constructor(private route:ActivatedRoute, private dialog: MatDialog){
    
  }

  ngOnInit(){
    this.route.paramMap.subscribe(
      (params)=>{
        this.qName = params.get('name')!;
      }
    )
  }

  redirect(){
    this.dialog.open(EnablefsComponent,
      {
        data: {
          quiz: this.qName
        },
        disableClose: false
      }
    )
  }

}
