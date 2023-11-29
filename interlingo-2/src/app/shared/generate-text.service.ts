import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from './environment.prod';

import { GenText } from '../shared/generate-text.model'

const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class GenerateTextService {

  newText: any;
  selectedGenText: GenText;
  readonly baseURL = 'http://localhost:8080/prompt';
  
  postgenText(gentext: GenText){
    console.log(gentext.language)
    return this.http.post(this.baseURL, gentext );
  }


  constructor(private http: HttpClient) {
    this.selectedGenText = new GenText("", "");
   }
}
