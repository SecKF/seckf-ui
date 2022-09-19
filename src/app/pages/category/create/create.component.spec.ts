import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {CreateCategoryComponent} from './create.component';

describe('CreateCategoryComponent', () => {
    let component: CreateCategoryComponent;
    let fixture: ComponentFixture<CreateCategoryComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule, RouterTestingModule],
            declarations: [CreateCategoryComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CreateCategoryComponent);
        component = fixture.componentInstance;
        component.ngOnInit()
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create category', () => {
        component.createCategory();
        expect(component.submit).toBeTruthy();
        expect(component.validationform.valid).toBeFalsy();
    });

    it('should submit valid', () => {
        component.validSubmit();
        expect(component.submit).toBeTruthy();
    });
});
