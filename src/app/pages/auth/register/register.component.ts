import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {UserService} from '../../../core/services/user.service';
import {Auth} from '../../../core/models/auth.model';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    public year: number = new Date().getFullYear();
    public registerationForm: UntypedFormGroup;
    public user: Auth;
    public userSubmitted: boolean;
    public successmsg = false;
    public errormsg = false;

    constructor(
        private fb: UntypedFormBuilder,
        private _userService: UserService,
        private router: Router
    ) {
    }

    // ------------------------------------
    get username() {
        return this.registerationForm.get('username') as UntypedFormControl;
    }

    get email() {
        return this.registerationForm.get('email') as UntypedFormControl;
    }

    get password() {
        return this.registerationForm.get('password') as UntypedFormControl;
    }

    get repassword() {
        return this.registerationForm.get('repassword') as UntypedFormControl;
    }

    get user_id() {
        return this.registerationForm.get('user_id') as UntypedFormControl;
    }

    get accessToken() {
        return this.registerationForm.get('accessToken') as UntypedFormControl;
    }

    // ------------------------------------
    // Getter methods for all form controls

    ngOnInit() {
        this.createRegisterationForm();
    }

    createRegisterationForm() {
        this.registerationForm = this.fb.group({
            user_id: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
            accessToken: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]+')]],
            username: ['', Validators.required],
            email: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(8)]],
            repassword: ['', Validators.required],
        }, {validators: this.passwordMatchingValidatior});
    }

    passwordMatchingValidatior(fg: UntypedFormGroup): Validators {
        return fg.get('password').value === fg.get('repassword').value ? null :
            {notmatched: true};
    }

    onSubmit() {
        this.userSubmitted = true;
        if (this.registerationForm.valid) {
            this._userService.activateUser(this.userData(), this.user_id.value).subscribe();
            this.onReset();
            this.successmsg = true;
            this.router.navigate(['/auth/login']);
        } else {
            this.errormsg = true;
        }
    }

    onReset() {
        this.userSubmitted = false;
        this.registerationForm.reset();
    }

    userData(): Auth {
        return this.user = {
            username: this.username.value,
            accessToken: Number(this.accessToken.value),
            email: this.email.value,
            password: this.password.value,
            repassword: this.repassword.value,
        }
    }

    // --------------------

}
