import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FixedIncome } from '../models/fixed-income.model';
import {
  FixedIncomePostRequest,
  FixedIncomePutRequest,
} from '../models/fixed-income-request.model';

@Injectable({
  providedIn: 'root',
})
export class FixedIncomeService {
  private serverUrl = 'https://api.andbank.com.br/candidate/renda-fixa';

  constructor(private http: HttpClient) {}

  getList() {
    return this.http.get<FixedIncome[]>(this.serverUrl);
  }

  post(body: FixedIncomePostRequest) {
    return this.http.post<FixedIncome>(this.serverUrl, body);
  }

  put(body: FixedIncomePutRequest) {
    return this.http.post<FixedIncome>(this.serverUrl, body);
  }

  delete(id: number) {
    return this.http.delete<FixedIncome>(`${this.serverUrl}/${id}`);
  }
}
