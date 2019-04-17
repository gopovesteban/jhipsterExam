/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterExamTestModule } from '../../../test.module';
import { StoryDeleteDialogComponent } from 'app/entities/story/story-delete-dialog.component';
import { StoryService } from 'app/entities/story/story.service';

describe('Component Tests', () => {
    describe('Story Management Delete Component', () => {
        let comp: StoryDeleteDialogComponent;
        let fixture: ComponentFixture<StoryDeleteDialogComponent>;
        let service: StoryService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterExamTestModule],
                declarations: [StoryDeleteDialogComponent]
            })
                .overrideTemplate(StoryDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StoryDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StoryService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
