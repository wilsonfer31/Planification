import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastTaskComponent } from './last-task.component';

describe('LastTaskComponent', () => {
  let component: LastTaskComponent;
  let fixture: ComponentFixture<LastTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastTaskComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
