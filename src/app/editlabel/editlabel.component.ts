import { Component, OnInit, Input, ViewChild, EventEmitter, Output } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'editlabel',
  templateUrl: './editlabel.component.html',
  styleUrls: ['./editlabel.component.css']
})
export class EditlabelComponent implements OnInit {

  @Input() value: string;
  @Input() name: string;
  @Output() onSave = new EventEmitter();
  disabled: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  edit(e){
    this.disabled = false;
    setTimeout(()=>{e.select()},50);
  }
  save(e){
    this.disabled = true;
    this.onSave.emit({
      value: this.value,
      name: this.name
    });
  }

}
