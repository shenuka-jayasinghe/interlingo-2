import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ToolbarService {

  selectedLevel: string = 'A1';
  selectedLanguage: string = 'Polish';
  // isTranslationReady = false;

  constructor() { 


  }
}
