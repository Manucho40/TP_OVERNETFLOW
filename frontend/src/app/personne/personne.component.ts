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

  listeDeToutesLesPersonnes: PersonneVO[] = [];
  listeDeToutesLesDepartements: DepartementVO[] = [];
  donneesDuFormulaireAjoutPersonne: FormGroup = new FormGroup({});
  departement: string | undefined;
  departementFiltrer: DepartementVO[] = [];
  optionDeTrieParAge!: any[];

  handleError: any;
  visible: boolean = false;
  loading: boolean = false;
  loadingEdit: boolean = false;

  /**
   * Initialisation du composant personne avec toutes les données dont elle à besoin à son initialisation.
   */
  ngOnInit() {
    this.obtenirListeDePersonnes();
    this.obtenirListeDeDepartements();
    this.optionDeTrieParAge = [
      { label: 'Moins de 18ans', value: 'Moins' },
      { label: '18ans et plus', value: 'Plus' },
    ];
    this.donneesDuFormulaireAjoutPersonne = new FormGroup({
      nom: new FormControl(''),
      prenom: new FormControl(''),
      age: new FormControl(),
      departementVO: new FormControl<DepartementVO | undefined>(undefined),
    });
  }
  /**
   * Fonction permettant d'obtenir la liste de toutes les personnes
   */
  obtenirListeDePersonnes() {
    this.personneService.getPersonnes().subscribe({
      next: (data) => {
        this.listeDeToutesLesPersonnes = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  /**
   * Fonction permettant d'obtenir la liste de tous les departements
   */
  obtenirListeDeDepartements() {
    this.departementService.getDepartements().subscribe({
      next: (data) => {
        this.listeDeToutesLesDepartements = data;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  /**
   * Fonction permettant de filtrer les personnes en fonction de leur age (moins de 18ans ou 18ans et plus)
   * @param status
   */
  faireTriePersonnesParAge(status: string): void {
    this.personneService.getPersonnes().subscribe((data) => {
      this.listeDeToutesLesPersonnes = data;
      switch (status) {
        case 'Moins':
          this.listeDeToutesLesPersonnes =
            this.listeDeToutesLesPersonnes.filter((index) => {
              return index.age !== undefined && index.age < 18;
            });
          break;
        case 'Plus':
          this.listeDeToutesLesPersonnes =
            this.listeDeToutesLesPersonnes.filter((index) => {
              return index.age !== undefined && index.age >= 18;
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
    this.departementFiltrer = filtered;
  }

  /**
   * Verifie l'existence d'un departement pour l'afficher dans la le tableau
   * @param id
   * @returns Retour un DepartementVo
   */
  afficheDepartementApresAjoutPersonne(id: number) {
    if (this.listeDeToutesLesDepartements) {
      this.departement = this.listeDeToutesLesDepartements.find(
        (index) => index.id === id
      )?.designation;
    }
    return this.departement;
  }

  afficherModal() {
    this.visible = true;
  }

  /**
   * Fonction permettant d'afficher un message de confirmation
   * @param event
   */
  affichacherMessageDeConfirmation(event: Event) {
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

  /**
   * Evite la saisie d'un caractère speciaux ou chiffre
   * @param value
   * @returns
   */
  @Output() empecheSaisieCaractereSpeciauxChiffre(value: string) {
    const isNumber = value >= '0' && value <= '9';
    const isAllowed = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s-]$/.test(value);
    const isSpecialCharacter = /[^a-zA-ZÀ-ÖØ-öø-ÿ\s-]/.test(value);
    if (isNumber || (isSpecialCharacter && !isAllowed)) {
      return true;
    }
    return false;
  }

  /**
   * Fonction permettant de soumettre le formulaire d'ajout de personne
   */
  soumettreFormulaireAjout() {
    if (
      !this.donneesDuFormulaireAjoutPersonne.valid ||
      !this.donneesDuFormulaireAjoutPersonne.value.nom ||
      !this.donneesDuFormulaireAjoutPersonne.value.prenom ||
      !this.donneesDuFormulaireAjoutPersonne.value.departementVO
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Tous les champs sont obligatoires',
      });
    } else if (
      this.donneesDuFormulaireAjoutPersonne.value.age < 0 ||
      !this.donneesDuFormulaireAjoutPersonne.value.age
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Age doit etre superieur a 0',
      });
    } else if (
      this.empecheSaisieCaractereSpeciauxChiffre(
        this.donneesDuFormulaireAjoutPersonne.value.nom
      ) ||
      this.empecheSaisieCaractereSpeciauxChiffre(
        this.donneesDuFormulaireAjoutPersonne.value.prenom
      )
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail:
          'Caractères speciaux non autorisés dans les champs nom et prenom',
      });
    } else {
      this.donneesDuFormulaireAjoutPersonne.value.departementVO = {
        id: this.donneesDuFormulaireAjoutPersonne.value.departementVO,
      };
      this.loading = true;
      setTimeout(() => {
        this.personneService
          .addPersonne(this.donneesDuFormulaireAjoutPersonne.value)
          .subscribe({
            next: (data) => {
              this.listeDeToutesLesPersonnes.unshift(data);
            },
            error: (error) => {
              console.error(error);
            },
          });
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmé',
          detail: 'Personne ajoutée',
        });
        this.loading = false;
        this.donneesDuFormulaireAjoutPersonne.reset();
      }, 2000);
    }
  }
}
