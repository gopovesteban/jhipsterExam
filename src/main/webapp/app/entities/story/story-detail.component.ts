import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IStory } from 'app/shared/model/story.model';

@Component({
    selector: 'jhi-story-detail',
    templateUrl: './story-detail.component.html'
})
export class StoryDetailComponent implements OnInit {
    story: IStory;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ story }) => {
            this.story = story;
        });
    }

    previousState() {
        window.history.back();
    }
}
