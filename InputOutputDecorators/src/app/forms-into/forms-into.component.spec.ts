import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsIntoComponent } from './forms-into.component';

describe('FormsIntoComponent', () => {
  let component: FormsIntoComponent;
  let fixture: ComponentFixture<FormsIntoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsIntoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormsIntoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
