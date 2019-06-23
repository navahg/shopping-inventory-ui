import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConstants {
  public readonly API_ROOT = 'https://raghavan-test-bucket.s3.amazonaws.com/api-endpoint.json';
}
