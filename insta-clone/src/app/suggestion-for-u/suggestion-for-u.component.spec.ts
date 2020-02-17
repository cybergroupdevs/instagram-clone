import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestionForUComponent } from './suggestion-for-u.component';

describe('SuggestionForUComponent', () => {
  let component: SuggestionForUComponent;
  let fixture: ComponentFixture<SuggestionForUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuggestionForUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuggestionForUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
