import React from 'react';
import EmailIcon from '../assets/contact1.jpg'; // Replace with the email icon path
import PhoneIcon from '../assets/contact2.avif'; // Replace with the phone icon path

export default function ContactUs() {
    return (
        <div className="container my-5">
            <h2 className="fs-1 mb-5 text-center">Contact Us</h2>
            <p className="text-center mb-5">Have a question or need support? Reach out to us!</p>
            <div className="row text-center d-flex align-items-center"> 
                {/* First Container - Email */}
                <div className="col-md-6 mb-4 d-flex justify-content-center">
                    <div style={{ width: '24rem', textAlign: 'center' }}>
                        <img 
                            src={EmailIcon} 
                            alt="Email" 
                            style={{ width: '100%', height: '250px', objectFit: 'cover', marginBottom: '10px', borderRadius: '10px' }} 
                        />
                        <h5>Email Us</h5>
                        <p>Have a question or need support? Feel free to email us!</p>
                        <p className='text-black fw-normal'>Email: <a href="mailto:support@example.com" className='text-decoration-none text-black '>support@example.com</a></p>
                    </div>
                </div>
                {/* Second Container - Phone */}
                <div className="col-md-6 mb-4 d-flex justify-content-center">
                    <div style={{ width: '24rem', textAlign: 'center' }}>
                        <img 
                            src={PhoneIcon} 
                            alt="Phone" 
                            style={{ width: '100%', height: '250px', objectFit: 'cover', marginBottom: '10px', borderRadius: '10px' }} 
                        />
                        <h5>Call Us</h5>
                        <p>Need immediate assistance? Call us directly!</p>
                        <p className='text-black fw-normal'>Phone: <a href="tel:+11234567890" className='text-decoration-none text-black '>123-456-7890</a></p>
                    </div>
                </div>
            </div>
        </div>
    );
}
