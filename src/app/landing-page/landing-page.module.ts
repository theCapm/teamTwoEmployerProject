import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { LandingPageComponent } from './landing-page.component';
import { ChatModalComponent } from '../chat-modal/chat-modal.component';

@NgModule({
    declarations: [LandingPageComponent, ChatModalComponent],
    imports: [CommonModule,
        NgbModule,
        FormsModule
]
})
export class LandingPageModule {}
