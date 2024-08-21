import { Component, Input } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputNumberModule } from 'primeng/inputnumber';
import { PersonneService } from '../../services/personne/personne.service';
import { PersonneVO } from '../../model/Personne';
import { DepartementVO } from '../../model/Departement';
import { DropdownModule } from 'primeng/dropdown';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AutoCompleteModule } from 'primeng/autocomplete';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    ReactiveFormsModule,
    FloatLabelModule,
    DropdownModule,
    InputNumberModule,
    AutoCompleteModule,
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css',
  providers: [PersonneService, ConfirmationService, MessageService],
})
export class ModalComponent {
  constructor(
    private personneService: PersonneService,
    private messageService: MessageService
  ) {}
  @Input() id: number | undefined;
  @Input() listeDeToutesLesPersonnes: PersonneVO[] | undefined;
  @Input() personne: PersonneVO | undefined;
  @Input() listeDeToutesLesDepartements: DepartementVO[] | undefined;
  @Input() departement: DepartementVO | undefined;
  @Input() empecheSaisieCaractereSpeciauxChiffre: any;
  responseUpdate: PersonneVO | undefined;
  donneesDuFormulaireModifierPersonne: FormGroup = new FormGroup({});
  loadingEdit: boolean = false;
  visible: boolean = false;
  filtrerDepartement: DepartementVO[] = [];

  ngOnInit() {
    this.donneesDuFormulaireModifierPersonne = new FormGroup({
      nom: new FormControl(this.personne?.nom),
      prenom: new FormControl(this.personne?.prenom),
      age: new FormControl(this.personne?.age),
      departementVO: new FormControl(this.personne?.departementVO?.designation),
    });
  }

  /**
   * Affiche la modal et initialise le formulaire de modification
   */
  afficherModal() {
    this.visible = true;
    this.donneesDuFormulaireModifierPersonne = new FormGroup({
      nom: new FormControl(this.personne?.nom),
      prenom: new FormControl(this.personne?.prenom),
      age: new FormControl(this.personne?.age),
      departementVO: new FormControl(this.personne?.departementVO?.designation),
    });
  }

  /**
   * Soumet le formulaire de modification
   */
  soumettreFormulaireModifierPersonne() {
    if (
      !this.donneesDuFormulaireModifierPersonne.valid ||
      !this.donneesDuFormulaireModifierPersonne.value.nom ||
      !this.donneesDuFormulaireModifierPersonne.value.prenom ||
      !this.donneesDuFormulaireModifierPersonne.value.departementVO
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Tous les champs sont obligatoires',
      });
    } else if (
      this.donneesDuFormulaireModifierPersonne.value.age < 0 ||
      !this.donneesDuFormulaireModifierPersonne.value.age
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Age doit etre superieur a 0',
      });
    } else {
      this.loadingEdit = true;
      const idParDepartement = this.filtrerDepartement?.find(
        (index) =>
          index.designation ===
          this.donneesDuFormulaireModifierPersonne.value.departementVO
      );
      if (
        typeof this.donneesDuFormulaireModifierPersonne.value.departementVO ===
        'number'
      ) {
        this.donneesDuFormulaireModifierPersonne.value.departementVO = {
          id: this.donneesDuFormulaireModifierPersonne.value.departementVO,
        };
      } else {
        this.donneesDuFormulaireModifierPersonne.value.departementVO = {
          id: idParDepartement?.id,
        };
      }
      setTimeout(() => {
        if (this.id) {
          this.personneService
            .updatPersonne(
              this.id,
              this.donneesDuFormulaireModifierPersonne.value
            )
            .subscribe((response: any) => {
              this.responseUpdate = response;
              if (this.listeDeToutesLesPersonnes && this.responseUpdate) {
                const index = this.listeDeToutesLesPersonnes?.findIndex(
                  (index) => index.id === this.id
                );
                this.listeDeToutesLesPersonnes[index] = this.responseUpdate;
              }
            });
          this.loadingEdit = false;
          this.visible = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Message Content',
          });
        }
        this.donneesDuFormulaireModifierPersonne.reset();
      }, 2000);
    }
  }

  /**
   * Auto completion du champ departement
   * @param event
   */
  faireAutocompletionChampDepartement(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (
      let i = 0;
      i < (this.listeDeToutesLesDepartements as DepartementVO[]).length;
      i++
    ) {
      let departement = (this.listeDeToutesLesDepartements as DepartementVO[])[
        i
      ];
      if (
        departement.designation?.toLowerCase().indexOf(query.toLowerCase()) == 0
      ) {
        filtered.push(departement);
      }
    }
    this.filtrerDepartement = filtered;
  }
}
