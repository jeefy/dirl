export class CanvasObject {
  id: number = Math.floor(Math.random() * 100000000);
  left: number = 100;
  top: number = 100;
  width: number = 50;
  height: number = 50;
  fill: string = "#faa";
  originX: string = "left";
  originY: string = "top";
  scaleX: number = 1;
  scaleY: number = 1;
  centeredRotation: boolean = true;
  canvasSelector: string = "c";

  public constructor(init?:Partial<CanvasObject>) {
    Object.assign(this, init);
  }
}