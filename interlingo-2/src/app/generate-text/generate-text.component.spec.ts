import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateTextComponent } from './generate-text.component';

describe('GenerateTextComponent', () => {
  let component: GenerateTextComponent;
  let fixture: ComponentFixture<GenerateTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerateTextComponent]
    });
    fixture = TestBed.createComponent(GenerateTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
