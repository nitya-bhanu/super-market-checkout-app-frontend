import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-qr-code-scanner',
  templateUrl: './qr-code-scanner.component.html',
  styleUrls: ['./qr-code-scanner.component.scss']
})
export class QrCodeScannerComponent{
  qrCodeInfo!:string;
  errorMessage!:string;
}
