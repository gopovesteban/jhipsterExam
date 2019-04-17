import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ISprint } from 'app/shared/model/sprint.model';
import { AccountService } from 'app/core';
import { SprintService } from './sprint.service';

@Component({
    selector: 'jhi-sprint',
    templateUrl: './sprint.component.html'
})
export class SprintComponent implements OnInit, OnDestroy {
    sprints: ISprint[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected sprintService: SprintService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.sprintService
            .query()
            .pipe(
                filter((res: HttpResponse<ISprint[]>) => res.ok),
                map((res: HttpResponse<ISprint[]>) => res.body)
            )
            .subscribe(
                (res: ISprint[]) => {
                    this.sprints = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInSprints();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ISprint) {
        return item.id;
    }

    registerChangeInSprints() {
        this.eventSubscriber = this.eventManager.subscribe('sprintListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
