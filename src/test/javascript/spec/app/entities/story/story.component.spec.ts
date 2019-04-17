/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterExamTestModule } from '../../../test.module';
import { StoryComponent } from 'app/entities/story/story.component';
import { StoryService } from 'app/entities/story/story.service';
import { Story } from 'app/shared/model/story.model';

describe('Component Tests', () => {
    describe('Story Management Component', () => {
        let comp: StoryComponent;
        let fixture: ComponentFixture<StoryComponent>;
        let service: StoryService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterExamTestModule],
                declarations: [StoryComponent],
                providers: []
            })
                .overrideTemplate(StoryComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(StoryComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StoryService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Story(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.stories[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
