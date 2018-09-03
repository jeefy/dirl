import { InMemoryDbService } from 'angular-in-memory-web-api';
import { CanvasObject } from './canvas-object';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const canvasObjects = [
      new CanvasObject({width: 100, height: 100, left: 250, top: 50}),
      new CanvasObject(),
    ];
    return {canvasObjects};
  }
}


/*
Copyright 2017-2018 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/