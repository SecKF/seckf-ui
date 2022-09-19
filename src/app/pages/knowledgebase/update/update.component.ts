import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {KnowledgebaseService} from '../../../core/services/knowledgebase.service';

@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})
export class UpdateComponent implements OnInit {
    public id: number;
    public breadCrumbItems: Array<{}>;
    public knowledgebaseForm: UntypedFormGroup;
    public knowledgebaseItem: any = [];
    // Form Submission
    public submit: boolean;
    public formsubmit: boolean;
    private sub: any;

    constructor(
        private formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private _knowledgebaseService: KnowledgebaseService,
        private router: Router) {
    }

    get formControls() {
        return this.knowledgebaseForm.controls;
    }

    get form() {
        return this.knowledgebaseForm.controls;
    }

    ngOnInit(): void {
        this.breadCrumbItems = [{label: 'Knowledgebase'}, {label: 'Update', active: true}];

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });

        this.knowledgebaseForm = this.formBuilder.group({
            title: ['', Validators.required],
            content: ['', Validators.required],
        });

        this._knowledgebaseService
            .getKnowledgeBaseItem(this.id)
            .subscribe(item => this.knowledgebaseForm.patchValue(item))
    }

    updateKnowledgebaseItem() {
        this.submit = true;
        if (this.knowledgebaseForm.invalid) {
            return;
        }
        this._knowledgebaseService
            .updateKnowledgebaseItem(this.id, this.knowledgebaseForm.value)
            .subscribe(() => this.router.navigate(['/knowledgebase/view']))
    }

    /**
     * Validation form submit method
     */
    validSubmit() {
        this.submit = true;
    }
}

