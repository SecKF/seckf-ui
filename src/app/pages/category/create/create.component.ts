import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {ChecklistCategoryService} from '../../../core/services/checklist_category.service'

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateCategoryComponent implements OnInit {

    // bread crumb items
    breadCrumbItems: Array<{}>;
    public validationform: UntypedFormGroup;
    public isSubmitted: boolean;

    // Form Submission
    submit: boolean;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private router: Router,
        private _checklistCategoryService: ChecklistCategoryService) {
    }

    /**
     * Returns form
     */
    get form() {
        return this.validationform.controls;
    }

    ngOnInit(): void {
        this.breadCrumbItems = [{label: 'Category'}, {label: 'Create', active: true}];

        /**
         * Bootstrap validation form data
         */
        this.validationform = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
        });
        this.submit = false;
    }

    createCategory() {
        this.submit = true;
        if (this.validationform.invalid) {
            return;
        }
        this._checklistCategoryService.createChecklistCategory(this.validationform.value).subscribe()
        this.router.navigate(['/category/manage'])
    }

    /**
     * Validation form submit method
     */
    validSubmit() {
        this.submit = true;
    }

}
