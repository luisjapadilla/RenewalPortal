import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CallService } from '../../services/call.service';

@Component({
  selector: 'app-verify',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <div
        class="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center"
      >
        <h2 class="text-xl font-semibold text-gray-800 mb-4">Verifying...</h2>
        <p class="text-gray-700">{{ message() }}</p>
      </div>
    </div>
  `,
})
export class VerifyComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private callService = inject(CallService);

  message = signal('Processing your request...');

  ngOnInit(): void {
    console.log('Email Sent');
    const phone = this.route.snapshot.queryParamMap.get('phone');
    const apiKey = this.route.snapshot.queryParamMap.get('apiKey');

    if (phone && apiKey) {
      this.callService.scheduleCall(phone, apiKey).subscribe({
        next: () => this.message.set(`📞 Call scheduled for ${phone}`),
        error: () => this.message.set('❌ Failed to schedule the call.'),
      });
    } else {
      this.message.set('⚠️ Missing required information.');
    }
  }
}
