import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'period',
                loadChildren: './period/period.module#JhipsterExamPeriodModule'
            },
            {
                path: 'project',
                loadChildren: './project/project.module#JhipsterExamProjectModule'
            },
            {
                path: 'team',
                loadChildren: './team/team.module#JhipsterExamTeamModule'
            },
            {
                path: 'student',
                loadChildren: './student/student.module#JhipsterExamStudentModule'
            },
            {
                path: 'sprint',
                loadChildren: './sprint/sprint.module#JhipsterExamSprintModule'
            },
            {
                path: 'story',
                loadChildren: './story/story.module#JhipsterExamStoryModule'
            },
            {
                path: 'review',
                loadChildren: './review/review.module#JhipsterExamReviewModule'
            },
            {
                path: 'project',
                loadChildren: './project/project.module#JhipsterExamProjectModule'
            },
            {
                path: 'team',
                loadChildren: './team/team.module#JhipsterExamTeamModule'
            },
            {
                path: 'student',
                loadChildren: './student/student.module#JhipsterExamStudentModule'
            },
            {
                path: 'sprint',
                loadChildren: './sprint/sprint.module#JhipsterExamSprintModule'
            },
            {
                path: 'story',
                loadChildren: './story/story.module#JhipsterExamStoryModule'
            },
            {
                path: 'review',
                loadChildren: './review/review.module#JhipsterExamReviewModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterExamEntityModule {}
