import {Component, OnInit} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ActivatedRoute, Router} from '@angular/router';

import {ChecklistService} from '../../../core/services/checklists.service';

@Component({
    selector: 'app-read',
    templateUrl: './read.component.html',
    styleUrls: ['./read.component.scss']
})
export class ChecklistsReadComponent implements OnInit {
    // Bread crumb item
    breadCrumbItems: Array<{}>;
    public queryString;
    public checklistCatData: any = [];
    public checklistConData: any = [];
    public id: number;
    // Collapse value
    public isCollapsed: boolean[] = [];
    private sub: any;

    constructor(
        private modalService: NgbModal,
        // eslint-disable-next-line @typescript-eslint/naming-convention,no-underscore-dangle,id-blacklist,id-match
        private _checklistCategoryService: ChecklistService,
        private route: ActivatedRoute,
        public router: Router
    ) {
    }

    ngOnInit(): void {
        this.breadCrumbItems = [{label: 'Checklists'}, {label: 'Read', active: true}];

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
            localStorage.setItem('controlSelector', this.id.toString());
        });

        this.getChecklistColletion();
        this.getChecklistControls(Number(localStorage.getItem('controlSelector')));
    }

    getChecklistColletion() {
        this._checklistCategoryService
            .getChecklistsCollection(Number(localStorage.getItem('categorySelector')))
            .subscribe(checklistCat => this.checklistCatData = checklistCat);
    }

    getChecklistControls(id: number) {
        this._checklistCategoryService
            .getChecklistItems(id)
            .subscribe(checklistCon => this.checklistConData = checklistCon);
        this.router.navigate(['/checklists/read', id]);
    }

    changeControlsOnSelect(id: number) {
        this.getChecklistControls(id);
        this.router.navigate(['/checklists/read', id]);
    }

    /**
     * Open center modal
     * @param centerDataModal center modal data
     */
    centerModal(centerDataModal: any) {
        this.modalService.open(centerDataModal, {centered: true, size: 'lg'});
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
    storeSprintLocalStorage(sprint_id: number) {
        //localStorage.setItem('questions', JSON.stringify(form.value));
        return
    }
}
