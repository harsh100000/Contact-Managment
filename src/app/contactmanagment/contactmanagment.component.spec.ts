import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactmanagmentComponent } from './contactmanagment.component';

describe('ContactmanagmentComponent', () => {
  let component: ContactmanagmentComponent;
  let fixture: ComponentFixture<ContactmanagmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactmanagmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactmanagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
