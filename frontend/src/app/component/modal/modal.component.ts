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
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}
  @Input() id: number | undefined;
  @Input() personnes: PersonneVO[] | undefined;
  @Input() personne: PersonneVO | undefined;
  @Input() departements: DepartementVO[] | undefined;
  @Input() departement: DepartementVO | undefined;
  @Input() onKeyDown: any;
  responseUpdate: PersonneVO | undefined;
  editUser: FormGroup = new FormGroup({});
  loadingEdit: boolean = false;
  visible: boolean = false;
  filterDepart: DepartementVO[] = [];

  ngOnInit() {
    this.editUser = new FormGroup({
      nom: new FormControl(this.personne?.nom),
      prenom: new FormControl(this.personne?.prenom),
      age: new FormControl(this.personne?.age),
      departementVO: new FormControl(this.personne?.departementVO?.designation),
    });
  }
  showDialog() {
    this.visible = true;
    this.editUser = new FormGroup({
      nom: new FormControl(this.personne?.nom),
      prenom: new FormControl(this.personne?.prenom),
      age: new FormControl(this.personne?.age),
      departementVO: new FormControl(this.personne?.departementVO?.designation),
    });

    console.log(this.editUser.value);
  }

  loadEdit() {
    if (
      !this.editUser.valid ||
      !this.editUser.value.nom ||
      !this.editUser.value.prenom ||
      !this.editUser.value.departementVO
    ) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Tous les champs sont obligatoires',
      });
    } else if (this.editUser.value.age < 0 || !this.editUser.value.age) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Age doit etre superieur a 0',
      });
    } else {
      this.loadingEdit = true;
      const idParDepartement = this.departements?.find(
        (index) => index.designation === this.editUser.value.departementVO
      );
      if (typeof this.editUser.value.departementVO === 'number') {
        this.editUser.value.departementVO = {
          id: this.editUser.value.departementVO,
        };
      } else {
        this.editUser.value.departementVO = {
          id: idParDepartement?.id,
        };
      }
      setTimeout(() => {
        if (this.id) {
          console.log('update personne', this.editUser.value);
          this.personneService
            .updatPersonne(this.id, this.editUser.value)
            .subscribe((response: any) => {
              this.responseUpdate = response;
              if (this.personnes && this.responseUpdate) {
                const index = this.personnes?.findIndex(
                  (index) => index.id === this.id
                );
                this.personnes[index] = this.responseUpdate;
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
        this.editUser.reset();
      }, 2000);
    }
  }
  filterDepartement(event: AutoCompleteCompleteEvent) {
    let filtered: any[] = [];
    let query = event.query;

    for (let i = 0; i < (this.departements as DepartementVO[]).length; i++) {
      let departement = (this.departements as DepartementVO[])[i];
      if (
        departement.designation?.toLowerCase().indexOf(query.toLowerCase()) == 0
      ) {
        filtered.push(departement);
      }
    }
    this.filterDepart = filtered;
  }
}
