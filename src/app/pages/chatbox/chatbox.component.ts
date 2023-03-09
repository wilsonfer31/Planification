import { AfterContentChecked, AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Message } from 'src/app/_models/message/MessageDto';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { environment } from 'src/app/_environement/environment';
import { AuthService } from 'src/app/_services/authService/auth-service.service';
import { MessageService } from 'src/app/_services/messageService/message.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements AfterContentChecked{


  messages: Message[] = [];
  disabled = true;
  newmessage: string;
  private stompClient: Stomp.Client | null = null;
  showEmojiPicker = false;

  toggleEmojiPicker() {
    this.showEmojiPicker = !this.showEmojiPicker;
  }

  addEmoji(event: any) {
    let text = "";
    if (this.newmessage != null) {
      text = `${this.newmessage}${event.emoji.native}`;
    } else {
      text = `${event.emoji.native}`;
    }
    this.newmessage = text;
   
  }
  constructor(private authService: AuthService, private messageService: MessageService, private cdRef:ChangeDetectorRef) {

  }
 
 


  ngOnInit() {
    this.getMessages();
    this.connect();
  }

  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }

  

  setConnected(connected: boolean) {
    this.disabled = !connected;

    if (connected) {
      this.messages = [];
    }
  }

  getMessages() {
    this.messageService.getLastMessages().subscribe({
      next: (mesageList: Message[]) => this.messages = mesageList
    }

    );


  }

  connect() {

    const socket = new SockJS(environment.base_api_back + '/chat');
    this.stompClient = Stomp.over(socket);
    this.stompClient.debug = f => f;

    const that = this;
    this.stompClient.connect({}, function (frame: any) {
      if (that.stompClient != null) {
        that.stompClient.subscribe('/start/initial', (message: any) => {

          that.showMessage(message.body);
          that.scrollBottom();

        });
      }

    });
  }

  sendMessage() {
    let messageDto = {} as Message;
    messageDto.message = this.newmessage;
    messageDto.sender = this.authService.currentUserValue.email!;



    this.stompClient?.send(
      '/current/resume',
      {},
      JSON.stringify(messageDto)
    );

    this.newmessage = "";
  }

  showMessage(message: string) {

    let data = JSON.parse(message);
    this.messages.push(data);


  }

  didISend(message: Message) {

    if (message.sender == this.authService.currentUserValue.email) {

      return true;
    }
    return false;
  }

  scrollBottom() {
    var objDiv = document.getElementById("chat");
    objDiv!.scrollTop = objDiv!.scrollHeight;
  }
}

