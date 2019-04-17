import { Moment } from 'moment';

export interface IPeriod {
    id?: number;
    startDate?: Moment;
    endDate?: Moment;
    name?: string;
}

export class Period implements IPeriod {
    constructor(public id?: number, public startDate?: Moment, public endDate?: Moment, public name?: string) {}
}
