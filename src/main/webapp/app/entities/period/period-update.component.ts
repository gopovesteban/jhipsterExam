import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { IPeriod } from 'app/shared/model/period.model';
import { PeriodService } from './period.service';

@Component({
    selector: 'jhi-period-update',
    templateUrl: './period-update.component.html'
})
export class PeriodUpdateComponent implements OnInit {
    period: IPeriod;
    isSaving: boolean;
    startDate: string;
    endDate: string;

    constructor(protected periodService: PeriodService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ period }) => {
            this.period = period;
            this.startDate = this.period.startDate != null ? this.period.startDate.format(DATE_TIME_FORMAT) : null;
            this.endDate = this.period.endDate != null ? this.period.endDate.format(DATE_TIME_FORMAT) : null;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.period.startDate = this.startDate != null ? moment(this.startDate, DATE_TIME_FORMAT) : null;
        this.period.endDate = this.endDate != null ? moment(this.endDate, DATE_TIME_FORMAT) : null;
        if (this.period.id !== undefined) {
            this.subscribeToSaveResponse(this.periodService.update(this.period));
        } else {
            this.subscribeToSaveResponse(this.periodService.create(this.period));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IPeriod>>) {
        result.subscribe((res: HttpResponse<IPeriod>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
