import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GitsMainComponent } from './gits-main.component';

describe('GitsMainComponent', () => {
  let component: GitsMainComponent;
  let fixture: ComponentFixture<GitsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GitsMainComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GitsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
