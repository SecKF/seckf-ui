import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {ChecklistCategoryService} from '../../../core/services/checklist_category.service'

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})
export class UpdateCategoryComponent implements OnInit {

    // bread crumb items
    breadCrumbItems: Array<{}>;
    public validationform: UntypedFormGroup;
    public isSubmitted: boolean;
    public id: number;
    // Form Submission
    submit: boolean;
    private sub: any;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _checklistCategoryService: ChecklistCategoryService) {
    }

    get form() {
        return this.validationform.controls;
    }

    ngOnInit(): void {
        this.breadCrumbItems = [{label: 'Category'}, {label: 'Update', active: true}];

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });

        this.validationform = this.formBuilder.group({
            name: ['', Validators.required],
            description: ['', Validators.required],
        });

        this._checklistCategoryService
            .getChecklistCategoryById(this.id)
            .subscribe(item => this.validationform.patchValue(item))
        this.submit = false;
    }

    updateCategory() {
        this.submit = true;
        if (this.validationform.invalid) {
            return;
        }
        this._checklistCategoryService.updateChecklistCategory(this.id, this.validationform.value).subscribe()
        this.router.navigate(['/category/manage'])
    }

    validSubmit() {
        this.submit = true;
    }


}
