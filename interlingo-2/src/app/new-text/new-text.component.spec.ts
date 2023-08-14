import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTextComponent } from './new-text.component';

describe('NewTextComponent', () => {
  let component: NewTextComponent;
  let fixture: ComponentFixture<NewTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTextComponent]
    });
    fixture = TestBed.createComponent(NewTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
