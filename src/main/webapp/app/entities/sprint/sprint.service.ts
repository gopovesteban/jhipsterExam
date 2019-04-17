import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ISprint } from 'app/shared/model/sprint.model';

type EntityResponseType = HttpResponse<ISprint>;
type EntityArrayResponseType = HttpResponse<ISprint[]>;

@Injectable({ providedIn: 'root' })
export class SprintService {
    public resourceUrl = SERVER_API_URL + 'api/sprints';

    constructor(protected http: HttpClient) {}

    create(sprint: ISprint): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(sprint);
        return this.http
            .post<ISprint>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(sprint: ISprint): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(sprint);
        return this.http
            .put<ISprint>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ISprint>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ISprint[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(sprint: ISprint): ISprint {
        const copy: ISprint = Object.assign({}, sprint, {
            endDate: sprint.endDate != null && sprint.endDate.isValid() ? sprint.endDate.toJSON() : null,
            startDate: sprint.startDate != null && sprint.startDate.isValid() ? sprint.startDate.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.endDate = res.body.endDate != null ? moment(res.body.endDate) : null;
            res.body.startDate = res.body.startDate != null ? moment(res.body.startDate) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((sprint: ISprint) => {
                sprint.endDate = sprint.endDate != null ? moment(sprint.endDate) : null;
                sprint.startDate = sprint.startDate != null ? moment(sprint.startDate) : null;
            });
        }
        return res;
    }
}
