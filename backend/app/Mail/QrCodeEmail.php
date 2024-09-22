<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use SimpleSoftwareIO\QrCode\Facades\QrCode;


class QrCodeEmail extends Mailable
{
    use Queueable, SerializesModels;

    
    public $qrCode; // Property to hold the QR code URL

    /**
     * Create a new message instance.
     *
     * @param string $qrCode
     */
    public function __construct($qrCode)
    {
        $this->qrCode = $qrCode; // Initialize the QR code property
    }
    /**
     * Get the message envelope.
     *
     * @return \Illuminate\Mail\Mailables\Envelope
     */
     /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
{
    // Generate QR code image URL or base64 data
    $qrCodeImage = QrCode::format('png')->size(300)->generate($this->qrCode);

    // Pass the generated QR code to the view
    return $this
        ->subject('Your QR Code') // Set the email subject
        ->view('emails.qr_code') // Specify the view for the email content
        ->with(['qrCode' => $qrCodeImage]); // Pass the generated QR code to the view
}
}