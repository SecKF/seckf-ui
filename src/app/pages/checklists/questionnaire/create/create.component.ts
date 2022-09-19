import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {QuestionService} from '../../../../core/services/question.service'

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateQuestionnaireComponent implements OnInit {


    breadCrumbItems: Array<{}>;
    public questionForm: UntypedFormGroup;
    public submit: boolean;
    public formsubmit: boolean;
    public checklist_id = Number(localStorage.getItem("checklist_id"))

    constructor(
        private formBuilder: UntypedFormBuilder,
        private router: Router,
        private _questionService: QuestionService) {
    }

    get form() {
        return this.questionForm.controls;
    }

    ngOnInit(): void {
        this.breadCrumbItems = [{label: 'Questionnaire'}, {label: 'Create', active: true}];

        this.questionForm = this.formBuilder.group({
            question: ['', [Validators.required]],
            checklist_type: [''],
        });
        this.submit = false;
    }

    createQuestion() {
        this.submit = true;
        if (this.questionForm.invalid) {
            return;
        }

        this.questionForm.value['checklist_type'] = this.checklist_id;

        this._questionService
            .newQuestionItem(this.questionForm.value)
            .subscribe(() => this.router.navigate(['/checklists/manage', this.checklist_id]))
    }

    validSubmit() {
        this.submit = true;
    }

}
