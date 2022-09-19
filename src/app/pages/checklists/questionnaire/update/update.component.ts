import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';

import {QuestionService} from '../../../../core/services/question.service'


@Component({
    selector: 'app-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.scss']
})
export class UpdateQuestionnaireComponent implements OnInit {

    // Bread crumb item
    breadCrumbItems: Array<{}>;
    public questionForm: UntypedFormGroup;
    public submit: boolean;
    public formsubmit: boolean;
    public id: number;
    public sub: any;
    public checklist_id = Number(localStorage.getItem("checklist_id"))

    constructor(
        private formBuilder: UntypedFormBuilder,
        private router: Router,
        private route: ActivatedRoute,
        private _questionService: QuestionService
    ) {
    }

    get form() {
        return this.questionForm.controls;
    }

    ngOnInit(): void {
        this.breadCrumbItems = [{label: 'Questionnaire'}, {label: 'Update', active: true}];

        this.sub = this.route.params.subscribe(params => {
            this.id = +params['id'];
        });

        this.questionForm = this.formBuilder.group({
            question: ['', [Validators.required]],
            checklist_type: [''],
        });
        this.submit = false;

        this._questionService
            .getQuestionById(this.id)
            .subscribe(item => this.questionForm.patchValue(item))
    }

    updateQuestionItem() {
        this.submit = true;
        if (this.questionForm.invalid) {
            return;
        }
        this._questionService
            .updateQuestion(this.questionForm.value, this.id)
            .subscribe(() => this.router.navigate(['/checklists/manage', this.checklist_id]))
    }

    validSubmit() {
        this.submit = true;
    }

}
