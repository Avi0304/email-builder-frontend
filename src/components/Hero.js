import React from 'react';
import '../styles/hero.css'

export default function Hero() {
    return (
        <div className='hero-header'>
            <header className="h-100 min-vh-100 d-flex align-items-center justify-content-center text-light shadow ">
                <div className="container-fluid">
                    <div className="row w-100">
                        <div className="col-12 d-flex justify-content-center align-items-center flex-column">
                            <h2 className="mb-0 text-white fw-bold">
                                Design and Customize Professional Emails
                            </h2>
                            <h2 className="mb-2 text-white fw-bold">
                                <span>with Ease</span>
                            </h2>
                            <p className="mb-3 text-white">Create stunning emails for all your needs with our user-friendly tools and templates.</p>

                            <div>
                                <button type='button' className='btn btn-warning btn-lg custom-btn'>Get Started </button>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}
