import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileDetailsComponent } from './edit-profile-details.component';

describe('EditProfileDetailsComponent', () => {
  let component: EditProfileDetailsComponent;
  let fixture: ComponentFixture<EditProfileDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditProfileDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
