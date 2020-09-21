import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScientistPanelComponent } from './scientist-panel.component';

describe('ScientistPanelComponent', () => {
  let component: ScientistPanelComponent;
  let fixture: ComponentFixture<ScientistPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScientistPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScientistPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
