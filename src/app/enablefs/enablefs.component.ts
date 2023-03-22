import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-enablefs',
  templateUrl: './enablefs.component.html',
  styleUrls: ['./enablefs.component.css']
})
export class EnablefsComponent implements OnInit{

  elem: any;

  constructor( 
    private dialogRef: MatDialogRef<EnablefsComponent>,
    @Inject(DOCUMENT) private document: any,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: any
    ){

  }

  ngOnInit(){
    this.elem = document.documentElement
  }

  openFullscreen() {
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      /* Firefox */
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      /* Chrome, Safari and Opera */
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      /* IE/Edge */
      this.elem.msRequestFullscreen();
    }
    this.dialogRef.close(true)
    this.router.navigate(['quiz',this.data.quiz])
  }
}
