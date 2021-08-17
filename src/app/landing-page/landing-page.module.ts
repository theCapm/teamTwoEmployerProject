import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingPageComponent } from './landing-page.component';
import { ChatModalComponent } from '../chat-modal/chat-modal.component';

@NgModule({
    declarations: [LandingPageComponent, ChatModalComponent],
    imports: [CommonModule]
})
export class LandingPageModule {}
