import React, { useState } from 'react'
import emailjs from '@emailjs/browser';
import './Contact.css';

const Contact = () => {
    const [user,setUser] = useState({
         name:"",
         email:"",
        //  phone:"",
         message:"",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e)=>{
       e.preventDefault();
       let obj = {
     [e.target.name]:e.target.value,
       }
      setUser((prev)=>({...prev,...obj}));

      console.log(user);
      
       
    }

    const handleSubmit = async(e)=>{
      e.preventDefault();
      console.log(user);
      setLoading(true); // Start loading
        try {
            const result = await emailjs.send(
                'service_yli6mmi', // Replace with your EmailJS service ID
                'template_4o4uqrk', // Replace with your EmailJS template ID
                {
                    from_name: user.name,
                    from_email: user.email,
                    // phone: user.phone,
                    message: user.message,
                },
                '1R4j4JjyQIgO02Ghm' // Replace with your EmailJS public key
            );

            console.log('Email sent successfully:', result.text);
            alert('Your message has been sent successfully!');
            setUser({ name: "", email: "", message: "" }); // Reset form
        } catch (error) {
            console.error('Failed to send email:', error);
            alert('Failed to send your message. Please try again.');
        } finally {
            setLoading(false); // End loading
        }
    }
  return (
    <div>
        <h1>Contact Page</h1>
        <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type='text' name= "name" value={user.name} onChange={handleChange} placeholder='Enter Name' required/>
        <label>E-mail:</label>
        <input type='email' name= "email" value={user.email}  onChange={handleChange} placeholder='Enter Email' required/>
        {/* <label>Phone:</label>
        <input type='number' name= "phone" value={user.phone}  onChange={handleChange}  placeholder='Enter Phone' required/> */}
        <label>Message:</label>
        <textarea
                    name="message"
                    value={user.message}
                    onChange={handleChange}
                    placeholder="Enter Message"
                    required
                />
                 <button type="submit" disabled={loading}>
                    {loading ? 'Sending...' : 'Submit'}
                </button>
        {/* <button type='submit'>Submit</button> */}
        </form>
    </div>
  )
}

export default Contact

