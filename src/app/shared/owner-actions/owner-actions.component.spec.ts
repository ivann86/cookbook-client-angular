import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerActionsComponent } from './owner-actions.component';

describe('OwnerActionsComponent', () => {
  let component: OwnerActionsComponent;
  let fixture: ComponentFixture<OwnerActionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OwnerActionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OwnerActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
