import { Component, OnInit, Input } from '@angular/core';
import { fabric } from 'fabric';
import { CanvasObject } from '../canvas-object';

@Component({
  selector: 'app-canvas-object',
  templateUrl: './canvas-object.component.html',
  styleUrls: ['./canvas-object.component.css']
})
export class CanvasObjectComponent implements OnInit {

  constructor() { }
  @Input('canvasObject') canvasObject: CanvasObject;
  @Input('canvas') canvas: fabric.Canvas;

  ngOnInit() {
    console.log(this);
    // add objects
    this.canvas.add(new fabric.Rect({ 
      left: this.canvasObject.left, 
      top: this.canvasObject.top, 
      width: this.canvasObject.width, 
      height: this.canvasObject.height, 
      fill: this.canvasObject.fill, 
      originX: this.canvasObject.originX, 
      originY: this.canvasObject.originY,
      centeredRotation: this.canvasObject.centeredRotation,
    }));
  }

}
