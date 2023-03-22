import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnablefsComponent } from './enablefs.component';

describe('EnablefsComponent', () => {
  let component: EnablefsComponent;
  let fixture: ComponentFixture<EnablefsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnablefsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnablefsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
