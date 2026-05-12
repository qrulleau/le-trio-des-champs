import { Injectable, inject } from '@angular/core'
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastr = inject<ToastrService>(ToastrService)

  success(message: string) {
    this.toastr.success(message, 'Succès')
  }

  error(message: string) {
    this.toastr.error(message, 'Erreur')
  }

  info(message: string) {
    this.toastr.info(message, 'Info')
  }

  warning(message: string) {
    this.toastr.warning(message, 'Attention')
  }
}
