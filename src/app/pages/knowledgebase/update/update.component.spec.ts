import {waitForAsync, ComponentFixture, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {UpdateComponent} from './update.component';

describe('UpdateComponent', () => {
    let component: UpdateComponent;
    let fixture: ComponentFixture<UpdateComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule, HttpClientTestingModule, RouterTestingModule],
            declarations: [UpdateComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(UpdateComponent);
        component = fixture.componentInstance;
        component.ngOnInit();
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should create valid submit', () => {
        component.validSubmit();
        expect(component.submit).toBeTruthy();
    });


    it('should update knowledgebase item', () => {
        component.updateKnowledgebaseItem();
        expect(component.submit).toBeTruthy();
        expect(component.knowledgebaseForm.valid).toBeFalsy();
    });
});
