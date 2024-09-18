<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

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
        return $this
            ->subject('Your QR Code') // Set the email subject
            ->view('emails.qr_code') // Specify the view for the email content
            ->with(['qrCode' => $this->qrCode]); // Pass the QR code to the view
    }
}