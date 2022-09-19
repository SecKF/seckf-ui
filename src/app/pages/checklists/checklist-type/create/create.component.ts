import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {ChecklistService} from '../../../../core/services/checklists.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateChecklistTypeComponent implements OnInit {
    breadCrumbItems: Array<{}>;
    public checklistForm: UntypedFormGroup;
    public submit: boolean;
    public formsubmit: boolean;

    constructor(
        private _checklistService: ChecklistService,
        private formBuilder: UntypedFormBuilder,
        private router: Router) {
    }

    get form() {
        return this.checklistForm.controls;
    }

    ngOnInit(): void {
        this.breadCrumbItems = [{label: 'Checklists'}, {label: 'Types create', active: true}];

        this.checklistForm = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
            visibility: [, Validators.required],
        });

        this.submit = false;
    }

    createChecklistType() {
        this.submit = true;
        if (this.checklistForm.invalid) {
            return;
        }

        if (this.checklistForm.value['visibility'] == "True") {
            this.checklistForm.value['visibility'] = 1
        } else {
            this.checklistForm.value['visibility'] = 0
        }

        this._checklistService.createChecklistType(this.checklistForm.value, Number(localStorage.getItem("categorySelector"))).subscribe(
            () => this.router.navigate(["/checklists/view"])
        )
    }

    validSubmit() {
        this.submit = true;
    }

}
