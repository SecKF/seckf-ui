import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {KnowledgebaseService} from '../../../core/services/knowledgebase.service';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

    breadCrumbItems: Array<{}>;
    public knowledgebaseForm: UntypedFormGroup;

    public submit: boolean;
    public formsubmit: boolean;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private router: Router,
        private _knowledgebaseService: KnowledgebaseService
    ) {
    }

    get form() {
        return this.knowledgebaseForm.controls;
    }

    ngOnInit(): void {
        this.breadCrumbItems = [{label: 'Knowledgebase'}, {label: 'Create', active: true}];

        this.knowledgebaseForm = this.formBuilder.group({
            title: ['', [Validators.required]],
            content: ['', [Validators.required]],
        });
        this.submit = false;
    }

    createKnowledgebaseItem() {
        this.submit = true;
        if (this.knowledgebaseForm.invalid) {
            return;
        }
        this._knowledgebaseService.createKnowledgebaseItem(this.knowledgebaseForm.value).subscribe(() => this.router.navigate(['/knowledgebase/view']))
    }

    validSubmit() {
        this.submit = true;
    }
}
