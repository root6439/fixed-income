import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemInfo } from '../models/item-info.model';

@Injectable({
  providedIn: 'root',
})
export class ItemInfoService {
  private serverUrl = 'https://api.andbank.com.br/candidate';

  constructor(private http: HttpClient) {}

  getProductTypes() {
    return this.http.get<ItemInfo[]>(`${this.serverUrl}/tipo-produto`);
  }

  getIndexers(productTypeId: number) {
    return this.http.get<ItemInfo[]>(`${this.serverUrl}/indexadores/${productTypeId}`);
  }
}
