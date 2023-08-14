import { Component } from '@angular/core';
import { GenerateTextService } from '../shared/generate-text.service';
import { ToolbarService } from '../shared/toolbar.service';

@Component({
  selector: 'app-new-text',
  templateUrl: './new-text.component.html',
  styleUrls: ['./new-text.component.scss']
})
export class NewTextComponent {

  newText: any;
  generatedText: any;

  constructor(public generateTextService: GenerateTextService, public toolbarService: ToolbarService) { 
  
  }

  makeRequest(text: string) {
    this.newText = text; // Update the selectedLevel property
    this.generateTextService.newText = text; // Update the service's selectedLevel
  }

  


}
