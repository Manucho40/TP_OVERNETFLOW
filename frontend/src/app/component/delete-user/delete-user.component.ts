import { Component, Input } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { PersonneService } from '../../services/personne/personne.service';
import { PersonneVO } from '../../model/Personne';
@Component({
  selector: 'app-delete-user',
  standalone: true,
  imports: [ButtonModule, ToastModule, ConfirmPopupModule],
  providers: [ConfirmationService, MessageService, PersonneService],
  templateUrl: './delete-user.component.html',
  styleUrl: './delete-user.component.css',
})
export class DeleteUserComponent {
  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private personneService: PersonneService
  ) {}
  @Input() id: number | undefined;
  @Input() personnes!: PersonneVO[];

  ngOnInit() {
    // console.log(this.personnes)
  }
  confirm2(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Voulez-vous vraiment supprimer cette personne?',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-sm',
      accept: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Record deleted',
          life: 3000,
        });
        if (this.id) {
          this.personneService.deletePersonne(this.id).subscribe((response) => {
            return response;
          });
          const index = this.personnes.findIndex(
            (index) => index.id === this.id
          );
          this.personnes.splice(index, 1);
        }
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }
}
