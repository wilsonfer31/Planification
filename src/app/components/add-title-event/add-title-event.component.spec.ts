import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTitleEventComponent } from './add-title-event.component';

describe('AddTitleEventComponent', () => {
  let component: AddTitleEventComponent;
  let fixture: ComponentFixture<AddTitleEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTitleEventComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTitleEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
