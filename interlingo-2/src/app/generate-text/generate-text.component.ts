import { Component } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { GenerateTextService } from '../shared/generate-text.service';
import { NgForm } from '@angular/forms';
import { ToolBarComponent } from '../tool-bar/tool-bar.component';
import { ToolbarService } from '../shared/toolbar.service';



@Component({
  selector: 'app-generate-text',
  templateUrl: './generate-text.component.html',
  styleUrls: ['./generate-text.component.scss'],
  providers: [GenerateTextService]
})
export class GenerateTextComponent {



    storyLevel: string = "";
    storyStyle: string = "";
    storyTopic: string = "";
    storyLanguage: string = "";
    translationLanguage: string = "";
    newText: any;
    generatedText: any;
    translatedStory: any;
    storyLength: number = 0;
    newConversation: string = "";
    translatedConversation: any;
    isConversationReady =  false;
  
    isTranslationReady = false;
    generateButtonPressed = false;
  
    // Add an event handler for the "Generate" button
    // onStartGenerating() {
    //   this.generateButtonPressed = true;
    // }
    
  
  
    constructor(public generateTextService: GenerateTextService, public toolbarService: ToolbarService) { 
  
     }
  
  
    makeRequest( form : NgForm ) {
      // Construct the request body
      const body = {
        model: "text-davinci-003",
        prompt: "Make a " + this.toolbarService.selectedLevel + " level " + this.storyStyle + " about " + this.storyTopic + " in " + this.toolbarService.selectedLanguage + " language, and only of " + this.storyLength + " sentences.",
        temperature: 1,
        max_tokens: 150
      };
  
      // Make the post request to the ChatGPT API
      
      this.generateButtonPressed = true;
      this.generateTextService.postStory(body).subscribe((res) => {
        
        console.log(body);
        console.log(res);
        this.newText = res;
        this.generatedText = this.newText.choices[0].text;
        console.log(this.generatedText);
        this.isTranslationReady = true;
        this.generateButtonPressed = false;
        // this.story = this.generatedStory;
      }, error => {
        this.isTranslationReady = false;
        this.generateButtonPressed = false;
      });
    }

    genTextAgain() {
      // this.newText = false;
      this.isTranslationReady = false;
      this.newText = false;
    }
  
    makeTranslation() {
      // Construct the request body
      const body = {
        model: "text-davinci-003",
        prompt: "Translate " + this.generatedText + " in to " + this.translationLanguage,
        temperature: 1,
        max_tokens: 500
      };
  
      // Make the post request to the ChatGPT API
      this.generateTextService.postStory(body).subscribe((res) => {
        console.log(body);
        console.log(res);
        this.translatedStory = res;
      });
    }
  
    makeConversation() {
      // Construct the request body
      const body = {
        model: "text-davinci-003",
        prompt: "Make a " + this.storyLevel + " conversation about the following: " + this.generatedText + ": in " + this.storyLanguage,
        temperature: 1,
        max_tokens: 500
      };
  
      // Make the post request to the ChatGPT API
      this.generateTextService.postStory(body).subscribe((res) => {
        console.log(body);
        console.log(res);
        this.newText = res;
        this.isConversationReady = true;
        // this.newConversation = this.newText.choice[0].text;
        // this.story = this.generatedStory;
      }, error => {
        this.isConversationReady = false;
      });
    }
  
    translateNewText() {
      // Construct the request body
      const body = {
        model: "text-curie-001",
        prompt: "Translate " + this.newText.choices[0].text + " in to " + this.translationLanguage,
        temperature: 1,
        max_tokens: 500
      };
  
      // Make the post request to the ChatGPT API
      this.generateTextService.postStory(body).subscribe((res) => {
        console.log(body);
        console.log(res);      
        this.translatedConversation = res;
      });
    }
  
    practiceVocab() {
      const body = {
        model: "text-davinci-003",
        prompt: "Make another " + this.storyLevel + " " + this.storyStyle + "in only " + this.storyLength + " sentences, with only the following vocabulary: " + this.generatedText + ": in " + this.storyLanguage,
        temperature: 1,
        max_tokens: 500
      };
  
      // Make the post request to the ChatGPT API
      this.generateTextService.postStory(body).subscribe((res) => {
        console.log(body);
        console.log(res);
        this.newText = res;
        this.isConversationReady = true;
        // this.newConversation = this.newText.choice[0].text;
        // this.story = this.generatedStory;
      }, error => {
        this.isConversationReady = false;
      });  
      
      
      
  
    }
  
    
  
    ngOnInit() {
      // Assume that the JSON object is stored in a variable called "jsonResponse"
      this.storyLevel = "";
      this.storyStyle = "";
      this.storyTopic = "";
      this.storyLanguage = "";
      this.storyLength = 0;
      this.translationLanguage = "English";
      
    }
  
    
  
  
  }
  
