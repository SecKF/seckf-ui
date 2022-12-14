import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {AuthService} from '../../../core/services/auth.service';
import {environment} from 'src/environments/environment';

declare const eSheep: any;


@Component({templateUrl: 'login.component.html'})
export class LoginComponent implements OnInit {

    year: number = new Date().getFullYear();
    public isSubmitted: boolean;
    public loginForm: UntypedFormGroup;
    public skip: boolean;
    public token: any;
    public errormsg = false;
    public expired = false;
    public loginMethod = environment.AUTH_METHOD;

    constructor(
        // eslint-disable-next-line @typescript-eslint/naming-convention, no-underscore-dangle, id-blacklist, id-match
        private _authService: AuthService,
        private router: Router,
        private formBuilder: UntypedFormBuilder) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required],
        });

        if (localStorage.getItem('session') === 'expired') {
            this.expired = true;
        }
        localStorage.clear();
        sessionStorage.setItem('Authorization', '');
        sessionStorage.setItem('user', '');
        sessionStorage.setItem('privilege', '');
        localStorage.setItem('categorySelector', '1');
        localStorage.setItem("labs-deployed", '[]');
        if (sessionStorage.getItem('theme') === null) {
            sessionStorage.setItem('theme', 'light-theme.css');
        }
    }

    onLogin() {
        this.isSubmitted = true;
        if (this.loginForm.invalid) {
            this.errormsg = true;
            return;
        }
        this._authService.LoginSKFprovider(this.loginForm.value).subscribe(token => {
                if (token['Authorization token']) {
                    var base64Url = token['Authorization token'].split('.')[1];
                    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));
                    var values = JSON.parse(jsonPayload);
                    var priv = values['privilege'];
                    sessionStorage.setItem('privilege', priv);
                    sessionStorage.setItem('Authorization', token['Authorization token']);
                    // eslint-disable-next-line @typescript-eslint/dot-notation
                    sessionStorage.setItem('user', token['username']);
                    window.location.assign("/dashboard");
                }
            },
            () => this.errormsg = true);
    }

    onSkip() {
        this.skip = true;
        this._authService.LoginSkipprovider().subscribe(token => {
                if (token['Authorization token']) {
                    var base64Url = token['Authorization token'].split('.')[1];
                    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
                    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
                        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                    }).join(''));
                    var values = JSON.parse(jsonPayload);
                    var priv = values['privilege'];
                    sessionStorage.setItem('privilege', priv);
                    sessionStorage.setItem('Authorization', token['Authorization token']);
                    // eslint-disable-next-line @typescript-eslint/dot-notation
                    sessionStorage.setItem('user', token['username']);
                    window.location.assign("/dashboard");
                }
            },
            () => this.token);
    }

    onRegister() {
        this.router.navigate(['/auth/register']);
    }

    doBackdoor() {
        //eval()
        //system()
        //exec()
        //Nice i see you did some nice code reviewing to validate if the app is secure and doesn't contain backdoors?
        //Then You are freaking awesome! Please enjoy this little Easter-Egg for the hard word and good ethics!
        var pet = new eSheep();
        pet.Start();
        //Thanks to Adriano Petrucci (http://esheep.petrucci.ch) who created this little sheep.exe
    }
}
