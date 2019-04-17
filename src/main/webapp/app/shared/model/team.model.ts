import { IProject } from 'app/shared/model/project.model';

export interface ITeam {
    id?: number;
    name?: string;
    status?: string;
    project?: IProject;
}

export class Team implements ITeam {
    constructor(public id?: number, public name?: string, public status?: string, public project?: IProject) {}
}
