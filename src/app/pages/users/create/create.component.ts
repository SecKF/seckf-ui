import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../core/services/user.service';
import {createUser} from 'src/app/core/models/user-create.model';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class UserCreateComponent implements OnInit {

    // bread crumb items
    breadCrumbItems: Array<{}>;

    // Form Validation
    public userForm: UntypedFormGroup;

    // Form Submission
    public submit: boolean;
    public formsubmit: boolean;

    public user: createUser;
    public userD: any = [];

    constructor(
        private formBuilder: UntypedFormBuilder,
        private _userService: UserService,
        private router: Router,
    ) {
    }

    /**
     * Returns form
     */
    get form() {
        return this.userForm.controls;
    }

    // ------------------------------------
    get privilege_id() {
        return this.userForm.get('privilege_id') as UntypedFormControl;
    }

    get email() {
        return this.userForm.get('email') as UntypedFormControl;
    }

    ngOnInit(): void {
        this.breadCrumbItems = [{label: 'Users'}, {label: 'Create', active: true}];

        this.userForm = this.formBuilder.group({
            privilege_id: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
        });
        this.submit = false;
    }

    newUser() {
        this.submit = true;
        if (this.userForm.invalid) {
            return;
        }
        this._userService.createUser(this.userData()).subscribe(data => {
            this.userD = data
            Swal.queue([
                {
                    title: 'User details',
                    text: "User with ID: " + this.userD.id + " and AccessToken: " + this.userD.accessToken + " is created",
                    confirmButtonText: 'Close',
                    confirmButtonColor: '#8184B2',
                    showLoaderOnConfirm: true,
                    preConfirm: () => {
                    }
                }
            ]);
        })
        this.router.navigate(['/users/manage'])
    }

    // ------------------------------------
    // Getter methods for all form controls

    /**
     * Validation form submit method
     */
    validSubmit() {
        this.submit = true;
    }

    userData(): createUser {
        return this.user = {
            privilege_id: Number(this.privilege_id.value),
            email: this.email.value,
        }
    }
}
