import { Component, Input, Output, SimpleChange } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { InputNumberModule } from 'primeng/inputnumber';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PersonneService } from '../services/personne/personne.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from '../component/modal/modal.component';
import { DeleteUserComponent } from '../component/delete-user/delete-user.component';
import { PersonneVO } from '../model/Personne';
import { DropdownModule } from 'primeng/dropdown';
import { DepartementVO } from '../model/Departement';
import { DepartementService } from '../services/departement/departement.service';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { error } from 'console';
import e from 'express';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}

@Component({
  selector: 'app-personne',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    InputNumberModule,
    FloatLabelModule,
    ButtonModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    ToastModule,
    ReactiveFormsModule,
    ModalComponent,
    DeleteUserComponent,
    DropdownModule,
    AutoCompleteModule,
    TagModule,
    IconFieldModule,
    InputIconModule,
  ],
  templateUrl: './personne.component.html',
  styleUrl: './personne.component.css',
  providers: [ConfirmationService, MessageService, PersonneService],
})
export class PersonneComponent {
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private personneService: PersonneService,
    private departementService: DepartementService
  ) {}

  addUserForm: FormGroup = new FormGroup({});
  handleError: any;
  visible: boolean = false;
  loading: boolean = false;
  loadingEdit: boolean = false;
  personnes: PersonneVO[] = [];
  departements: DepartementVO[] = [];
  departement: string | undefined;
  filterDepartements: DepartementVO[] = [];
  statuses!: any[];

  /**
   * Initialisation du composant personne avec toutes les données dont elle à besoin à son initialisation.
   */
  ngOnInit() {
    this.allPersonnes();
    this.allDepartements();
    this.statuses = [
      { label: 'Moins de 18ans', value: 'Moins' },
      { label: '18ans et plus', value: 'Plus' },
    ];
    this.addUserForm = new FormGroup({
      nom: new FormControl(''),
      prenom: new FormControl(''),
      age: new FormControl(),
      departementVO: new FormControl<DepartementVO | undefined>(undefined),
    });
  }

  allPersonnes() {
    this.personneService.getPersonnes().subscribe({
      next: (data) => {
        this.personnes = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  allDepartements() {
    try {
      this.departementService.getDepartements().subscribe((data) => {
        this.departements = data;
      });
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Fonction permettant d'ouvrir le modal de modification
   */
  loadEdit() {
    this.loadingEdit = true;
    setTimeout(() => {
      this.visible = false;
      this.loadingEdit = false;
    }, 2000);
  }

  /**
   * Fonction permettant de filtrer les personnes en fonction de leur age (moins de 18ans ou 18ans et plus)
   * @param status
   */
  filterCallback(status: string): void {
    this.personneService.getPersonnes().subscribe((data) => {
      this.personnes = data;
      switch (status) {
        case 'Moins':
          this.personnes = this.personnes.filter((personne) => {
            return personne.age !== undefined && personne.age < 18;
          });
          break;
        case 'Plus':
          this.personnes = this.personnes.filter((personne) => {
            return personne.age !== undefined && personne.age >= 18;
          });
          break;
        default:
          break;
      }
    });
  }

  /**
   * Fonction permettant de vider un tableau passer en parametre
   * @param table
   */
  clear(table: Table) {
    table.clear();
  }

  /**
   * Fonction pour le champ de type autocompletion permettant de filtrer les departements
   * @param event
   */
  filterDepartement(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.departements as DepartementVO[]).length; i++) {
      let departement = (this.departements as DepartementVO[])[i];
      if (
        departement.designation?.toLowerCase().indexOf(query.toLowerCase()) == 0
      ) {
        filtered.push(departement);
        console.log(filtered);
      }
    }
    this.filterDepartements = filtered;
  }

  afficheDepartement(id: number) {
    if (this.departements) {
      this.departement = this.departements.find(
        (index) => index.id === id
      )?.designation;
    }
    return this.departement;
  }

  showDialog() {
    this.visible = true;
  }

  confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Voulez vous confirmer cette suppréssion?',
      header: 'Confirmation de suppression',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',

      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Suppression validée',
          detail: 'Personne suprimée',
        });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Echec de la suppression',
          detail: 'Cette suppréssion est annulée',
        });
      },
    });
  }
  @Output() onKeyDown(value: string) {
    const isNumber = value >= '0' && value <= '9';
    const isSpecialCharacter = /[^a-zA-Z\s-]/.test(value);
    const isAllowed = value === '-' || /^[a-zA-Z\s]$/.test(value);

    if (isNumber || (isSpecialCharacter && !isAllowed)) {
      return true;
    }
    return false;
  }
  onSubmit() {
    if (
      !this.addUserForm.valid ||
      !this.addUserForm.value.nom ||
      !this.addUserForm.value.prenom ||
      !this.addUserForm.value.departementVO
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Tous les champs sont obligatoires',
      });
    } else if (this.addUserForm.value.age < 0 || !this.addUserForm.value.age) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Age doit etre superieur a 0',
      });
    } else if (
      this.onKeyDown(this.addUserForm.value.nom) ||
      this.onKeyDown(this.addUserForm.value.prenom)
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail:
          'Caractères speciaux non autorisés dans les champs nom et prenom',
      });
    } else {
      console.log();
      this.addUserForm.value.departementVO = {
        id: this.addUserForm.value.departementVO,
      };
      this.loading = true;
      setTimeout(() => {
        this.personneService
          .addPersonne(this.addUserForm.value)
          .subscribe((response: any) => {
            this.personnes.unshift(response);
          });
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Message Content',
        });
        console.log(this.addUserForm.value);
        this.loading = false;
        this.addUserForm.reset();
      }, 2000);
    }
  }
}
