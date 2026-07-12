import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private baseUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  // Cities
  getCities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/cities`)
  }

  createCity(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/cities`, data)
  }

  updateCity(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/cities/${id}`, data)
  }

  deleteCity(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/cities/${id}`)
  }

  // Products
  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products`)
  }

  createProduct(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/products`, data)
  }

  updateProduct(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/products/${id}`, data)
  }

  deleteProduct(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/products/${id}`)
  }

  // Events
  getEvents(month?: number, year?: number): Observable<any[]> {
    const params = month && year ? `?month=${month}&year=${year}` : ''
    return this.http.get<any[]>(`${this.baseUrl}/events${params}`)
  }

  createEvent(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/events`, data)
  }

  updateEvent(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/events/${id}`, data)
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/events/${id}`)
  }

  // Selling places
  getSellingPlaces(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/selling-places`)
  }

  createSellingPlace(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/selling-places`, data)
  }

  updateSellingPlace(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/selling-places/${id}`, data)
  }

  deleteSellingPlace(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/selling-places/${id}`)
  }

  // Subscribers
  getSubscribers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/admin/subscribers`)
  }

  createSubscriber(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/subscribers`, data)
  }

  updateSubscriber(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/admin/subscribers/${id}`, data)
  }

  deleteSubscriber(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/subscribers/${id}`)
  }

  // Announcement
  getAnnouncement(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/announcements`)
  }

  updateAnnouncement(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/announcements/${id}`, data)
  }

  createAnnouncement(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/announcements`, data)
  }

  // Settings
  getSettings(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/settings`)
  }

  updateSettings(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/settings/${id}`, data)
  }

  createSettings(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/settings`, data)
  }

  // Auth
  login(data: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data)
  }

  signup(data: {
    fullName: string
    email: string
    password: string
    passwordConfirmation: string
  }): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup`, data)
  }

  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/account/logout`, {})
  }

  // Distribution dates
  getDistributionDates(): Observable<any> {
    return this.http.get(`${this.baseUrl}/distribution-dates`)
  }

  // Admin distribution dates
  createDistributionDate(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/distribution-dates`, data)
  }

  updateDistributionDate(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/distribution-dates/${id}`, data)
  }

  deleteDistributionDate(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/distribution-dates/${id}`)
  }

  // Reservations
  createReservation(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/reservations`, data)
  }

  getMyReservations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/reservations/my`)
  }

  // Account
  updateProfile(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/account/profile`, data)
  }

  changePassword(data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/account/password`, data)
  }

  getMe(): Observable<any> {
    return this.http.get(`${this.baseUrl}/account/profile`)
  }

  getReservations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/reservations`)
  }

  updateReservation(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/admin/reservations/${id}`, data)
  }

  deleteReservation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/reservations/${id}`)
  }

  getContactPeople(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/contact-people`)
  }

  createContactPerson(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/contact-people`, data)
  }

  updateContactPerson(id: number, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/contact-people/${id}`, data)
  }

  deleteContactPerson(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/contact-people/${id}`)
  }

  cancelReservation(id: number): Observable<any> {
    return this.http.patch(`${this.baseUrl}/user/reservations/${id}/cancel`, {})
  }

  getDateStocks(dateId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/distribution-dates/${dateId}/stocks`)
  }

  updateDateStock(dateId: number, productId: number, stock: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/admin/distribution-dates/${dateId}/stocks`, {
      productId,
      stock,
    })
  }

  uploadProductImage(id: number, file: File): Observable<any> {
    const formData = new FormData()
    formData.append('image', file)
    return this.http.post(`${this.baseUrl}/admin/products/${id}/image`, formData)
  }

  deleteProductImage(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/products/${id}/image`)
  }

  getSiteImages(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/site-images`)
  }

  uploadSiteImage(slotKey: string, file: File): Observable<any> {
    const formData = new FormData()
    formData.append('image', file)
    return this.http.post(`${this.baseUrl}/admin/site-images/${slotKey}`, formData)
  }

  deleteSiteImage(slotKey: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/site-images/${slotKey}`)
  }

  getSiteContents(): Observable<any> {
    return this.http.get(`${this.baseUrl}/admin/site-contents`)
  }

  updateSiteContent(key: string, value: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/site-contents`, { key, value })
  }

  bulkUpdateSiteContents(entries: { key: string; value: string }[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/admin/site-contents/bulk`, { entries })
  }
  getSiteGallery(): Observable<any> {
    return this.http.get(`${this.baseUrl}/site-gallery`)
  }

  addGalleryItem(file: File, caption: string): Observable<any> {
    const formData = new FormData()
    formData.append('image', file)
    formData.append('caption', caption)
    return this.http.post(`${this.baseUrl}/admin/site-gallery`, formData)
  }

  updateGalleryItem(id: number, data: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/admin/site-gallery/${id}`, data)
  }

  deleteGalleryItem(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/admin/site-gallery/${id}`)
  }
}
