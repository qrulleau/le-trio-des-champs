import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  products: any[] = [];
  events: any[] = [];
  sellingPlaces: any[] = [];
  announcement: any = null;
  settings: any = null;
  cities: any[] = [];

  currentMonth = new Date().getMonth() + 1;
  currentYear = new Date().getFullYear();

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.api.getProducts().subscribe((data) => (this.products = data));
    this.api.getSellingPlaces().subscribe((data) => (this.sellingPlaces = data));
    this.api.getCities().subscribe((data) => (this.cities = data));
    this.api.getEvents(this.currentMonth, this.currentYear).subscribe((data) => (this.events = data));
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
