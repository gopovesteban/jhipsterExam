import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ISprint } from 'app/shared/model/sprint.model';
import { SprintService } from './sprint.service';
import { ITeam } from 'app/shared/model/team.model';
import { TeamService } from 'app/entities/team';

@Component({
    selector: 'jhi-sprint-update',
    templateUrl: './sprint-update.component.html'
})
export class SprintUpdateComponent implements OnInit {
    sprint: ISprint;
    isSaving: boolean;

    teams: ITeam[];
    endDate: string;
    startDate: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected sprintService: SprintService,
        protected teamService: TeamService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ sprint }) => {
            this.sprint = sprint;
            this.endDate = this.sprint.endDate != null ? this.sprint.endDate.format(DATE_TIME_FORMAT) : null;
            this.startDate = this.sprint.startDate != null ? this.sprint.startDate.format(DATE_TIME_FORMAT) : null;
        });
        this.teamService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITeam[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITeam[]>) => response.body)
            )
            .subscribe((res: ITeam[]) => (this.teams = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.sprint.endDate = this.endDate != null ? moment(this.endDate, DATE_TIME_FORMAT) : null;
        this.sprint.startDate = this.startDate != null ? moment(this.startDate, DATE_TIME_FORMAT) : null;
        if (this.sprint.id !== undefined) {
            this.subscribeToSaveResponse(this.sprintService.update(this.sprint));
        } else {
            this.subscribeToSaveResponse(this.sprintService.create(this.sprint));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISprint>>) {
        result.subscribe((res: HttpResponse<ISprint>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTeamById(index: number, item: ITeam) {
        return item.id;
    }
}
