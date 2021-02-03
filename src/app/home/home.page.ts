import { Component } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  matches: String[];
  isRecording = false;

  constructor(public navCtr: NavController, private plt: Platform, private speechRecognition: SpeechRecognition, private cd:ChangeDetectorRef) {


  }
  startListening(){
    let options = {
      language: 'es-EC'
    }
    this.speechRecognition.startListening().subscribe(matches =>{
          this.matches = matches;
          this.cd.detectChanges();
    });
    this.isRecording = true;
  }

  stopListenig(){
    this.speechRecognition.stopListening().then(()=>{
      this.isRecording = false;
    });
  }

  getPermission(){
    this.speechRecognition.hasPermission()
    .then((hasPermission: boolean)=>{
      if(!hasPermission){
        this.speechRecognition.requestPermission();
      }
    });
  }

  isIos(){
    return this.plt.is('ios');
  }

}
