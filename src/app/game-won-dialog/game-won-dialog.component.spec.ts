import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameWonDialogComponent } from './game-won-dialog.component';

describe('GameWonDialogComponent', () => {
  let component: GameWonDialogComponent;
  let fixture: ComponentFixture<GameWonDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameWonDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameWonDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
