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
    this.canvas = new fabric.Canvas('c', { selection: false });
    let canvasGlobal = this.canvas;

    var container = document.getElementById('canvasContainer');
    var width = container.offsetWidth;
    var height = container.offsetHeight;
    this.canvas.setDimensions({
      width:width,
      height:height
    });
    window.addEventListener("resize", function(){
      var container = document.getElementById('canvasContainer');
      var width = container.offsetWidth;
      var height = container.offsetHeight;
      canvasGlobal.setDimensions({
        width:width,
        height:height
      });
    });

    var grid = 50;

    // create grid

    for (var i = 0; i < (10000 / grid); i++) {
      this.canvas.add(new fabric.Line([ i * grid, 0, i * grid, 10000], { stroke: '#ccc', selectable: false }));
      this.canvas.add(new fabric.Line([ 0, i * grid, 10000, i * grid], { stroke: '#ccc', selectable: false }))
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
      options.target.set({
        left: Math.round(options.target.left / grid) * grid,
        top: Math.round(options.target.top / grid) * grid,
        scaleX: Math.round(options.target.scaleX * 2) / 2,
        scaleY: Math.round(options.target.scaleY * 2) / 2,
      })
    });

    this.canvas.on('mouse:down', function(opt) {
      var evt = opt.e;
      if (evt.altKey === true) {
        this.isDragging = true;
        this.selection = false;
        this.lastPosX = evt.clientX;
        this.lastPosY = evt.clientY;
      }
    });
    this.canvas.on('mouse:move', function(opt) {
      if (this.isDragging) {
        var e = opt.e;
        this.viewportTransform[4] += e.clientX - this.lastPosX;
        this.viewportTransform[5] += e.clientY - this.lastPosY;
        this.requestRenderAll();
        this.lastPosX = e.clientX;
        this.lastPosY = e.clientY;
      }
    });
    this.canvas.on('mouse:up', function(opt) {
      this.isDragging = false;
      this.selection = true;
    });

    this.canvas.on('mouse:wheel', function(opt) {
      var delta = -opt.e.deltaY;
      var pointer = canvasGlobal.getPointer(opt.e);
      var zoom = canvasGlobal.getZoom();
      zoom = zoom + delta/200;
      if (zoom > 20) zoom = 20;
      if (zoom < 0.01) zoom = 0.01;
      canvasGlobal.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
      opt.e.preventDefault();
      opt.e.stopPropagation();
    });

    document.getElementById('file').addEventListener("change", function (e: Event) {
      let file = (<HTMLInputElement>e.target).files[0];
      var reader = new FileReader();
      reader.onload = function (f:any) {
        var data = f.target.result;                    
        fabric.Image.fromURL(data, function (img) {
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
