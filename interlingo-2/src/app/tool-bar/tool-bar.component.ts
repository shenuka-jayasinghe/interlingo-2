import { Component, EventEmitter, Output } from '@angular/core';
import { ToolbarService } from '../shared/toolbar.service';

@Component({
  selector: 'app-tool-bar',
  templateUrl: './tool-bar.component.html',
  styleUrls: ['./tool-bar.component.scss']
})
export class ToolBarComponent {

  selectedLevel: string = 'A1';
  selectedLanguage: string = 'PL';


  constructor(public toolbarService: ToolbarService) {}


  selectLevel(level: string) {
    this.selectedLevel = level; // Update the selectedLevel property
    this.toolbarService.selectedLevel = level; // Update the service's selectedLevel
  }

  selectLanguage(language: string) {
    this.selectedLanguage = language; // Update the selectedLanguage property
    this.toolbarService.selectedLanguage = this.getLanguageAbbreviation(language); // Update the service's selectedLanguage
  }

  getLanguageAbbreviation(language: string): string {
    switch (language) {
      case 'Polish':
        return 'PL';
      case 'Lithuanian':
        return 'LT';
      case 'Spanish':
        return 'ES';
      case 'Swedish':
        return 'SV'
      // Add more cases for other languages
      default:
        return language; // Default to full language name if abbreviation not defined
    }
  }


}
