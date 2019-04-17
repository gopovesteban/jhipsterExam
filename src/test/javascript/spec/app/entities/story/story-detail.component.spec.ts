/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { JhipsterExamTestModule } from '../../../test.module';
import { StoryDetailComponent } from 'app/entities/story/story-detail.component';
import { Story } from 'app/shared/model/story.model';

describe('Component Tests', () => {
    describe('Story Management Detail Component', () => {
        let comp: StoryDetailComponent;
        let fixture: ComponentFixture<StoryDetailComponent>;
        const route = ({ data: of({ story: new Story(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterExamTestModule],
                declarations: [StoryDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(StoryDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(StoryDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.story).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
