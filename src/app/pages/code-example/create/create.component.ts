import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {CodeExamplesService} from '../../../core/services/code-examples.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateCodeComponent implements OnInit {
    id: number;
    breadCrumbItems: Array<{}>;
    public codeExampleForm: UntypedFormGroup;
    public codeExampleItem: any = [];
    public isSubmitted: boolean;
    private sub: any;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private _codeExamplesService: CodeExamplesService,
        private router: Router) {
    }

    get formControls() {
        return this.codeExampleForm.controls;
    }

    /**
     * Returns form
     */
    get form() {
        return this.codeExampleForm.controls;
    }

    ngOnInit(): void {
        this.breadCrumbItems = [{label: 'Code Examples'}, {label: 'Create', active: true}];

        this.codeExampleForm = this.formBuilder.group({
            title: ['', Validators.required],
            code_lang: ['', Validators.required],
            content: ['', Validators.required],
        });
        this.isSubmitted = false;
    }

    createCodeExampleItem() {
        this.isSubmitted = true;
        if (this.codeExampleForm.invalid) {
            return;
        }
        this._codeExamplesService.createCodeExample(this.codeExampleForm.value).subscribe();
        this.router.navigate(['/code-example/view']);
    }

    /**
     * Validation form submit method
     */
    validSubmit() {
        this.isSubmitted = true;
    }
}

