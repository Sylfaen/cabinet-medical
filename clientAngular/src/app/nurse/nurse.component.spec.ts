/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NurseComponent } from './nurse.component';

describe('NurseComponent', () => {
  let component: NurseComponent;
  let fixture: ComponentFixture<NurseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NurseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NurseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
