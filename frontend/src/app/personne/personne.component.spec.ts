import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { PersonneComponent } from './personne.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { PersonneService } from '../services/personne/personne.service';
import { DepartementService } from '../services/departement/departement.service';
import { DepartementVO } from '../model/Departement';
import { PersonneVO } from '../model/Personne';

describe('PersonneComponent', () => {
  let component: PersonneComponent;
  let fixture: ComponentFixture<PersonneComponent>;
  const personneServiceSpy = jasmine.createSpyObj('PersonneService', [
    'getPersonnes',
  ]);
  const departementServiceSpy = jasmine.createSpyObj('DepartementService', [
    'getDepartements',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: PersonneService, useValue: personneServiceSpy },
        { provide: DepartementService, useValue: departementServiceSpy },
      ],
    }).compileComponents();

    // Configurez les mocks pour retourner des Observables vides par défaut
    fixture = TestBed.createComponent(PersonneComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should recuperer toutes les personnes', () => {
    const mockPersonnes: PersonneVO[] = [
      {
        id: 1,
        nom: 'nom 1',
        prenom: 'prenom 1',
        age: 20,
        departementVO: { id: 1, designation: 'departement 1', code: 'd1' },
      },
      {
        id: 2,
        nom: 'nom 2',
        prenom: 'prenom 2',
        age: 21,
        departementVO: { id: 2, designation: 'departement 2', code: 'd2' },
      },
      {
        id: 3,
        nom: 'nom 3',
        prenom: 'prenom 3',
        age: 22,
        departementVO: { id: 3, designation: 'departement 3', code: 'd3' },
      },
    ];

    personneServiceSpy.getPersonnes.and.returnValue(of(mockPersonnes));

    component.allPersonnes;
    //
    expect(personneServiceSpy.getPersonnes).toHaveBeenCalled();
    // expect(component.personnes).toEqual(mockPersonnes);
  });

  it('should value includes in departement table', () => {
    const mockDepartements: DepartementVO[] = [
      { id: 1, designation: 'departement 1', code: 'd1' },
      { id: 2, designation: 'departement 2', code: 'd2' },
      { id: 3, designation: 'departement 3', code: 'd3' },
    ];
    const event: AutoCompleteCompleteEvent = {
      originalEvent: new Event(''),
      query: 'departement 3',
    };
    component.departements = mockDepartements;

    component.filterDepartement(event);

    expect(component.filterDepartements).toEqual([
      { id: 3, designation: 'departement 3', code: 'd3' },
    ]);
  });
});
