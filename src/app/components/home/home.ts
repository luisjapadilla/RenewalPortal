import { Component, inject, signal } from '@angular/core';
import {
  ReactiveFormsModule,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CallService } from '../../services/call.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent {
  fb = inject(NonNullableFormBuilder);
  callService = inject(CallService);
  emailService = inject(EmailService);

  form = this.fb.group({
    phone: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    apiKey: ['', [Validators.required]],
  });

  loading = signal(false);
  message = signal<string | null>(null);
  callNow() {
    const phone = this.form.value.phone!;
    const apiKey = this.form.value.apiKey!;

    if (phone && apiKey) {
      this.loading.set(true);
      this.callService.scheduleCall(phone, apiKey).subscribe({
        next: (res) => {
          console.log('Scheduled call successfully', res);
          this.message.set(`📞 Scheduled call to: ${phone}`);
          this.resetToDefaultValue();
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error scheduling call', err);
          this.message.set('❌ Error scheduling call');
          this.loading.set(false);
        },
      });
    }
  }

  emailMe() {
    const email = this.form.value.email;

    if (email) {
      this.loading.set(true);
      this.emailService.sendEmail(email).subscribe({
        next: (res) => {
          console.log('Email Sent', res);
          this.message.set(`✉️ Email sent to: ${email}`);
          this.resetToDefaultValue();
          this.loading.set(false);
        },
        error: (err) => {
          console.error('Error: ', err);
          this.message.set('❌ Error sending email');
          this.loading.set(false);
        },
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
