import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';
import { CanvasObjectService } from '../canvas-object.service';
import { CanvasObject } from '../canvas-object';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit {
  canvas: fabric.Canvas;
  canvasObjects: CanvasObject[];

  constructor(private canvasObjectService: CanvasObjectService) { }

  ngOnInit() {
    console.log('Oh hi mark');
    this.canvas = new fabric.Canvas('c', { selection: false });
    let canvasGlobal = this.canvas;
    var grid = 50;

    // create grid

    for (var i = 0; i < (1000 / grid); i++) {
      this.canvas.add(new fabric.Line([ i * grid, 0, i * grid, 1000], { stroke: '#ccc', selectable: false }));
      this.canvas.add(new fabric.Line([ 0, i * grid, 1000, i * grid], { stroke: '#ccc', selectable: false }))
    }

    this.getCanvasObjects();

    // snap to grid

    this.canvas.on('object:moving', function(options) { 
      options.target.set({
        left: Math.round(options.target.left / grid) * grid,
        top: Math.round(options.target.top / grid) * grid
      });
    });
    this.canvas.on('object:scaling', function(options){
      console.log(options);
      options.target.set({
        left: Math.round(options.target.left / grid) * grid,
        top: Math.round(options.target.top / grid) * grid,
        scaleX: Math.round(options.target.scaleX * 2) / 2,
        scaleY: Math.round(options.target.scaleY * 2) / 2,
      })
    });
    document.getElementById('file').addEventListener("change", function (e: Event) {
      let file = (<HTMLInputElement>e.target).files[0];
      var reader = new FileReader();
      reader.onload = function (f:any) {
        var data = f.target.result;                    
        fabric.Image.fromURL(data, function (img) {
          console.log(img);
          var oImg = img.set({left: 0, top: 0, angle: 0, width:img._originalElement.width, height:img._originalElement.height}).scale(1);
          canvasGlobal.add(oImg).renderAll();
          var a = canvasGlobal.setActiveObject(oImg);
          var dataURL = canvasGlobal.toDataURL({format: 'png', quality: 0.8});
        });
      };
      reader.readAsDataURL(file);
    });
  }

  getCanvasObjects(): void {
    this.canvasObjectService.getCanvasObjects()
    .subscribe(canvasObjects => this.canvasObjects = canvasObjects);
  }
}
