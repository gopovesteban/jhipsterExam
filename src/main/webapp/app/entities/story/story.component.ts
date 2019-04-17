import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IStory } from 'app/shared/model/story.model';
import { AccountService } from 'app/core';
import { StoryService } from './story.service';

@Component({
    selector: 'jhi-story',
    templateUrl: './story.component.html'
})
export class StoryComponent implements OnInit, OnDestroy {
    stories: IStory[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected storyService: StoryService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.storyService
            .query()
            .pipe(
                filter((res: HttpResponse<IStory[]>) => res.ok),
                map((res: HttpResponse<IStory[]>) => res.body)
            )
            .subscribe(
                (res: IStory[]) => {
                    this.stories = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInStories();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IStory) {
        return item.id;
    }

    registerChangeInStories() {
        this.eventSubscriber = this.eventManager.subscribe('storyListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
