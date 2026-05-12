import { Component, OnInit, ChangeDetectorRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  events: any[] = [];
  sellingPlaces: any[] = [];
  cities: any[] = [];

  currentMonth = new Date().getMonth() + 1;
  currentYear = new Date().getFullYear();

  subscribeForm = {
    phone: '',
    cityIds: [] as number[],
  }
  subscribeSuccess = false
  subscribeError = ''

 private api = inject(ApiService)
 private cdr = inject(ChangeDetectorRef) 

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.getProducts().subscribe((data) => (this.products = data));
    this.api.getSellingPlaces().subscribe((data) => (this.sellingPlaces = data));
    this.api.getCities().subscribe((data) => {
        this.cities = [...data]
        this.cdr.detectChanges()
    });
    this.api.getEvents(this.currentMonth, this.currentYear).subscribe((data) => (this.events = data));
  }

  toggleCity(cityId: number) {
    if (this.subscribeForm.cityIds.includes(cityId)) {
      this.subscribeForm.cityIds = this.subscribeForm.cityIds.filter((id) => id !== cityId)
    } else {
      this.subscribeForm.cityIds = [...this.subscribeForm.cityIds, cityId]
    }
  }

  isCitySelected(cityId: number): boolean {
    return this.subscribeForm.cityIds.includes(cityId)
  }

  subscribe() {
    this.subscribeError = ''
    if (!this.subscribeForm.phone || this.subscribeForm.cityIds.length === 0) {
      this.subscribeError = 'Veuillez remplir votre numéro de téléphone et sélectionner au moins une ville.'
      return
    }
    this.api.createSubscriber(this.subscribeForm).subscribe({
      next: () => {
        this.subscribeSuccess = true
        this.subscribeForm = { phone: '', cityIds: [] }
      },
    error: (err) => {
    if (err.status === 409) {
        this.subscribeError = 'Ce numéro est déjà inscrit. Vos villes ont été mises à jour.'
        } else if (err.status === 422) {
            this.subscribeError = 'Numéro de téléphone invalide. Format attendu : 06XXXXXXXX ou 07XXXXXXXX'
        } else {
            this.subscribeError = 'Une erreur est survenue, veuillez réessayer.'
        }
    } 
    })
  }

  prevMonth() {
    if (this.currentMonth === 1) {
      this.currentMonth = 12;
      this.currentYear--;
    } else {
      this.currentMonth--;
    }
    this.api.getEvents(this.currentMonth, this.currentYear).subscribe((data) => (this.events = data));
  }

  nextMonth() {
    if (this.currentMonth === 12) {
      this.currentMonth = 1;
      this.currentYear++;
    } else {
      this.currentMonth++;
    }
    this.api.getEvents(this.currentMonth, this.currentYear).subscribe((data) => (this.events = data));
  }

  getMonthName(month: number, year: number): string {
    return new Date(year, month - 1).toLocaleDateString('fr-FR', {
      month: 'long',
      year: 'numeric',
    });
  }

  getDaysInMonth(month: number, year: number): (number | null)[] {
    const firstDay = new Date(year, month - 1, 1).getDay()
    const daysInMonth = new Date(year, month, 0).getDate()
    const days: (number | null)[] = Array(firstDay).fill(null)
    for (let i = 1; i <= daysInMonth; i++) days.push(i)
    return days
  }

  hasEvent(day: number | null): any {
    if (!day) return null
    return this.events.find((e) => new Date(e.date).getDate() === day)
  }

  isToday(day: number | null): boolean {
    if (!day) return false
    const today = new Date()
    return (
      today.getDate() === day &&
      today.getMonth() + 1 === this.currentMonth &&
      today.getFullYear() === this.currentYear
    )
  }
}
