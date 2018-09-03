import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CanvasObjectComponent } from './canvas-object.component';

describe('CanvasObjectComponent', () => {
  let component: CanvasObjectComponent;
  let fixture: ComponentFixture<CanvasObjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasObjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
