import React from 'react'
import { Link } from 'react-router-dom'
import Email from '../assets/email.avif'

export default function Features() {
    return (
        <div>
            <div className='container my-5'>
                <div className='row'>
                    <div className='col-lg-6 d-flex justify-content-center d-none d-lg-flex'>
                        <img
                            src={Email}
                            className='img-fluid'
                            alt="email builder"
                            style={{ width: '300px', height: '300px', borderRadius: '50%' }}  // Set the width and height
                        />
                    </div>
                    <div className='col-lg-6 d-flex flex-column align-items-center justify-content-center'>
                        <h4 className='fs-4  mb-5 text-uppercase fw-bold'>Design Professional Emails Effortlessly</h4>
                        <p>Our email builder allows you to design stunning emails without any coding knowledge. Whether you're a small business owner or part of a large marketing team, creating professional emails has never been easier.</p>
                        <p className='mb-5'>Choose from a variety of customizable templates, drag-and-drop components, and make your emails stand out with a user-friendly design interface.</p>
                        <Link to="/template">
                            <button type='button' className='btn btn-outline-success btn-lg'>Start Building Now</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
