import {waitForAsync, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

import {ProjectCreateComponent} from './create.component';
import {ProjectManageComponent} from '../manage/manage.component';

describe('ProjectCreateComponent', () => {
    let component: ProjectCreateComponent;
    let fixture: ComponentFixture<ProjectCreateComponent>;
    let router: Router;
    let location: Location;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule,
                RouterTestingModule.withRoutes([
                    {path: 'projects/manage', component: ProjectManageComponent},
                ])],
            declarations: [ProjectCreateComponent]
        })
            .compileComponents();
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
        router.initialNavigation();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProjectCreateComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create project', fakeAsync(() => {
        component.createProject();
        expect(component.submit).toBeTruthy();
        expect(component.projectForm.valid).toBeFalsy();

        router.navigate(['projects/manage']);
        tick();
        expect(location.path()).toBe('/projects/manage');
    }));
});
