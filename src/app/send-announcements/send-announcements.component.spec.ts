import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendAnnouncementsComponent } from './send-announcements.component';

describe('SendAnnouncementsComponent', () => {
  let component: SendAnnouncementsComponent;
  let fixture: ComponentFixture<SendAnnouncementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SendAnnouncementsComponent]
    });
    fixture = TestBed.createComponent(SendAnnouncementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
