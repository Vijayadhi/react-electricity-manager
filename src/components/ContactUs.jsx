import React from 'react';

// Import QR code images from the src/qr directory
// import instagramQR from '../qr/instagram.jpeg';
// import whatsappQR from '../qr/whatsapp.jpeg';
// import linkedinQR from '../qr/linkedIN.png';
import TopBarComponet from './TopBarComponet';
import FootBarComponent from './FootBarComponent';

function ContactUs() {
    const instagramQR = '/qr/instagram.jpeg';
    const whatsappQR = '/qr/whatsapp.jpeg';
    const linkedinQR = '/qr/linkedin.png';

    return (
        <>
            <TopBarComponet />
            <div style={{
                backgroundColor: '#f9f9f9',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                textAlign: 'center'
            }}>
                <h2 style={{
                    color: '#ffff',
                    marginBottom: '20px',
                    fontSize: '24px'
                }}>Contact Us</h2>
                <p style={{
                    color: '#000',
                    marginBottom: '30px',
                    fontSize: '30px'
                }} className='fw-bold'>Any Support Needed? Contact Us through...</p>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '20px',
                    flexWrap: 'wrap'
                }}>
                    <div style={{
                        textAlign: 'center'
                    }}>
                        <img
                            src=`${instagramQR}`
                            alt="Instagram QR Code"
                            style={{
                                width: '400px',
                                height: '500px',
                                borderRadius: '8px',
                                border: '2px solid #ddd'
                            }}
                        />
                        <p style={{
                            color: '#ca7602',
                            marginBottom: '30px',
                            fontSize: '25px'
                        }} className='fw-bold'>Instagram</p>
                    </div>
                    <div style={{
                        textAlign: 'center'
                    }}>
                        <img
                            src=`${whatsappQR}`
                            alt="WhatsApp QR Code"
                            style={{
                                width: '400px',
                                height: '600px',
                                borderRadius: '8px',
                                border: '2px solid #ddd'
                            }}
                        />
                        <p style={{
                            color: '#00a884',
                            marginBottom: '30px',
                            fontSize: '25px'
                        }} className='fw-bold'>WhatsApp</p>
                    </div>
                    <div style={{
                        textAlign: 'center'
                    }}>
                        <img
                            src=`${linkedinQR}`
                            alt="LinkedIn QR Code"
                            style={{
                                width: '400px',
                                height: '500px',
                                borderRadius: '8px',
                                border: '2px solid #ddd'
                            }}
                        />
                        <p style={{
                            color: '#b9005c',
                            marginBottom: '30px',
                            fontSize: '25px'
                        }} className='fw-bold'>LinkedIn</p>
                    </div>
                </div>
                <FootBarComponent/>
            </div>
        </>
    );
}

export default ContactUs;
