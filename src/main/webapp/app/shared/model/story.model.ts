import { ISprint } from 'app/shared/model/sprint.model';

export interface IStory {
    id?: number;
    code?: string;
    name?: string;
    description?: string;
    status?: string;
    sprint?: ISprint;
}

export class Story implements IStory {
    constructor(
        public id?: number,
        public code?: string,
        public name?: string,
        public description?: string,
        public status?: string,
        public sprint?: ISprint
    ) {}
}
