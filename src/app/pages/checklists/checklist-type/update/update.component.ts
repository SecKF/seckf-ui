import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {ChecklistService} from '../../../../core/services/checklists.service'

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})
export class UpdateChecklistTypeComponent implements OnInit {

    public breadCrumbItems: Array<{}>;
    public checklistForm: UntypedFormGroup;
    public id: number;
    public sub: any;
    public submit: boolean;
    public formsubmit: boolean;

    constructor(
        private _checklistService: ChecklistService,
        private formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private router: Router) {
    }

    /**
     * Returns form
     */
    get form() {
        return this.checklistForm.controls;
    }

    ngOnInit(): void {
        this.breadCrumbItems = [{label: 'Checklists'}, {label: 'Item', active: true}];

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });

        this.checklistForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            visibility: ['', Validators.required],
        });

        this._checklistService
            .getChecklistById(this.id)
            .subscribe(item => this.checklistForm.patchValue(item))

        this.submit = false;
    }

    updateChecklistItem() {
        this.submit = true;
        if (this.checklistForm.invalid) {
            return;
        }

        if (this.checklistForm.value['visibility'] == "1") {
            this.checklistForm.value['visibility'] = 1
        } else {
            this.checklistForm.value['visibility'] = 0
        }

        this._checklistService.updateChecklistType(this.checklistForm.value, this.id).subscribe(() => this.router.navigate(["/checklists/view"]))
    }

    /**
     * Validation form submit method
     */
    validSubmit() {
        this.submit = true;
    }

}
