import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IStory } from 'app/shared/model/story.model';
import { StoryService } from './story.service';

@Component({
    selector: 'jhi-story-delete-dialog',
    templateUrl: './story-delete-dialog.component.html'
})
export class StoryDeleteDialogComponent {
    story: IStory;

    constructor(protected storyService: StoryService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.storyService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'storyListModification',
                content: 'Deleted an story'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-story-delete-popup',
    template: ''
})
export class StoryDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ story }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(StoryDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.story = story;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/story', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/story', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
