import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; 

export default function Footer() {
    return (
        <footer className="bg-dark text-white py-5">
            <div className="container">
                <div className="row">
                    {/* Column 1: About Section */}
                    <div className="col-md-4 mb-4">
                        <h5>About Us</h5>
                        <p>We are passionate about providing the best service to our customers.</p>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div className="col-md-4 mb-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
                            <li><Link to='/template' className='text-white text-decoration-none'>Template</Link></li>
                            <li><Link to="/contact" className="text-white  text-decoration-none">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Social Media Links */}
                    <div className="col-md-4 mb-4">
                        <h5>Follow Us</h5>
                        <div>
                            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                                <FaFacebook size={30} />
                            </a>
                            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                                <FaTwitter size={30} />
                            </a>
                            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white me-3">
                                <FaInstagram size={30} />
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white">
                                <FaLinkedin size={30} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="text-center mt-4">
                    <p>&copy; 2025 Your Company. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}
