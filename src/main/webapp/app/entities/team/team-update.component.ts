import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITeam } from 'app/shared/model/team.model';
import { TeamService } from './team.service';
import { IProject } from 'app/shared/model/project.model';
import { ProjectService } from 'app/entities/project';

@Component({
    selector: 'jhi-team-update',
    templateUrl: './team-update.component.html'
})
export class TeamUpdateComponent implements OnInit {
    team: ITeam;
    isSaving: boolean;

    projects: IProject[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected teamService: TeamService,
        protected projectService: ProjectService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ team }) => {
            this.team = team;
        });
        this.projectService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IProject[]>) => mayBeOk.ok),
                map((response: HttpResponse<IProject[]>) => response.body)
            )
            .subscribe((res: IProject[]) => (this.projects = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.team.id !== undefined) {
            this.subscribeToSaveResponse(this.teamService.update(this.team));
        } else {
            this.subscribeToSaveResponse(this.teamService.create(this.team));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITeam>>) {
        result.subscribe((res: HttpResponse<ITeam>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackProjectById(index: number, item: IProject) {
        return item.id;
    }
}
