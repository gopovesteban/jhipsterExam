import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IReview } from 'app/shared/model/review.model';
import { ReviewService } from './review.service';
import { IStory } from 'app/shared/model/story.model';
import { StoryService } from 'app/entities/story';

@Component({
    selector: 'jhi-review-update',
    templateUrl: './review-update.component.html'
})
export class ReviewUpdateComponent implements OnInit {
    review: IReview;
    isSaving: boolean;

    stories: IStory[];
    timeStamp: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected reviewService: ReviewService,
        protected storyService: StoryService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ review }) => {
            this.review = review;
            this.timeStamp = this.review.timeStamp != null ? this.review.timeStamp.format(DATE_TIME_FORMAT) : null;
        });
        this.storyService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IStory[]>) => mayBeOk.ok),
                map((response: HttpResponse<IStory[]>) => response.body)
            )
            .subscribe((res: IStory[]) => (this.stories = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.review.timeStamp = this.timeStamp != null ? moment(this.timeStamp, DATE_TIME_FORMAT) : null;
        if (this.review.id !== undefined) {
            this.subscribeToSaveResponse(this.reviewService.update(this.review));
        } else {
            this.subscribeToSaveResponse(this.reviewService.create(this.review));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IReview>>) {
        result.subscribe((res: HttpResponse<IReview>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackStoryById(index: number, item: IStory) {
        return item.id;
    }
}
