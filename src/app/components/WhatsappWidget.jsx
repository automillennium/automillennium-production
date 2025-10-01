import React from 'react'
import { WhatsAppWidget } from 'react-whatsapp-widget'

function WhatsappWidget() {
  return (
    <div>
       <WhatsAppWidget
        phoneNumber="+919645023614" // your WhatsApp number with country code
        message="Hello! How can I help you?"
        companyName="Automillennium Group"
        avatar="https://example.com/avatar.png" // optional
      />
    </div>
  )
}

export default WhatsappWidget
