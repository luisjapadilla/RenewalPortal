import { Component, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { EmailService } from './services/email.service';
import { CommonModule } from '@angular/common';
import { CallService } from './services/call.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  fb = inject(NonNullableFormBuilder);
  callService = inject(CallService);
  emailService = inject(EmailService);

  form = this.fb.group({
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    apiKey: ['', [Validators.required]],
  });

  callNow() {
    const phone = this.form.value.phone!;
    const apiKey = this.form.value.apiKey!;
    if (phone && apiKey) {
      this.callService.scheduleCall(phone, apiKey).subscribe({
        next: (res) => {
          console.log('Scheduled call successfully', res);
          alert(`Called Schedule to: ${phone}`);
          this.resetToDefaultValue();
        },
        error: (err) => console.error('Error scheduling call', err),
      });
    }
  }

  emailMe() {
    const email = this.form.value.email;
    if (email) {
      this.emailService.sendEmail(email).subscribe({
        next: (res) => {
          console.log('Email Sent', res);
          alert(`Email Sent To: ${email}`);
          this.resetToDefaultValue();
        },
        error: (err) => console.error('Error: ', err),
      });
    }
  }

  resetToDefaultValue(): void {
    this.form.reset({
      phone: '',
      email: '',
      apiKey: '',
    });
  }
}
