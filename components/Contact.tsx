import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { log } from 'console';
/**
 * Contact Component
 * 
 * Displays a contact form and agency details.
 * Uses IntersectionObserver for scroll-triggered entry animations.
 * Features comprehensive form validation and animated feedback.
 */
const Contact: React.FC = () => {
  // Form Data State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // Validation State
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [touched, setTouched] = useState({
    name: false,
    email: false,
    message: false
  });

  // Submission Status: 'idle' | 'submitting' | 'success'
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [isSubmitted, setIsSubmitted] = useState(false); // Controls the final success view

  // Animation State for Section Reveal
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Reveal section when it enters viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // --- Validation Logic ---
  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Name is required.';
        else if (value.trim().length < 2) error = 'Name must be at least 2 characters.';
        break;
      case 'email':
        if (!value.trim()) error = 'Email is required.';
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email address.';
        break;
      case 'message':
        if (!value.trim()) error = 'Project brief is required.';
        else if (value.trim().length < 10) error = 'Please tell us a bit more (min 10 chars).';
        break;
    }
    return error;
  };

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Validate immediately if field was already touched to give instant feedback
    if (touched[name as keyof typeof touched]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  // Handle Input Blur (Focus lost)
  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameError = validateField('name', formData.name);
    const emailError = validateField('email', formData.email);
    const messageError = validateField('message', formData.message);
    // Remove broken import.meta.env.VITE_API_URL reference - not needed here

    setErrors({ name: nameError, email: emailError, message: messageError });
    setTouched({ name: true, email: true, message: true });
  
    if (nameError || emailError || messageError) return;
  
    try {
      setStatus('submitting');
  
      const response = await axios.post(
       `${apiUrl}/api/inquiry`,
        formData,
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.data.success) {
        setStatus('success');
  
        setTimeout(() => {
          setIsSubmitted(true);
          setStatus('idle');
          setFormData({ name: '', email: '', message: '' });
          setTouched({ name: false, email: false, message: false });
  
          setTimeout(() => setIsSubmitted(false), 5000);
        }, 1000);
      }
    } catch (error: any) {
      console.error("API Error:", error);
      alert(error.response?.data?.message || "Something went wrong");
      setStatus('idle');
    }
  };
  
  

     


  // Helper to determine input border color classes
  const getInputClasses = (fieldName: keyof typeof errors) => {
    const base = "block py-2.5 px-0 w-full text-sm text-navy dark:text-white bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer transition-colors duration-300";

    if (touched[fieldName]) {
      if (errors[fieldName]) {
        return `${base} border-red-500 focus:border-red-600`;
      } else {
        return `${base} border-green-500 focus:border-green-600`;
      }
    }
    return `${base} border-gray-300 dark:border-gray-600 focus:border-brand-magenta`;
  };

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-slate-50 dark:bg-navy transition-colors duration-300 relative overflow-hidden">

      {/* Background decoration (Blue Blob) */}
      {/* <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl"></div> */}

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-3xl pointer-events-none"></div>


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Left Side: Contact Info */}
          <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h2 className="text-4xl md:text-5xl font-bold text-navy dark:text-white font-heading mb-6 leading-tight">
              Let’s Architect <br /> the Future.
            </h2>
            <p className="text-xl text-gray-500 dark:text-slate-400 mb-10 font-light">
              Connect with our consultants to discuss how we can accelerate your digital transformation journey.
            </p>

            <div className="space-y-8">
              {/* Address Item */}
              <div className="flex items-start group">
                <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-white/5 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-brand-magenta transition-colors duration-300">
                  <i className="fas fa-map-marker-alt text-brand-magenta text-xl group-hover:text-white transition-colors"></i>
                </div>
                <div className="ml-6">
                  <h4 className="text-lg font-bold text-navy dark:text-white mb-1">Headquarters</h4>
                  <p className="text-gray-500 dark:text-slate-400">SR.No.53/2A/1, Office No. 014,<br />A Wing, 3rd Floor,
                    City Vista,<br /> Fountain Road,
                    Ashoka Nagar,<br />Kharadi, Pune - 411014 </p>
                </div>
              </div>

              {/* Email Item */}
              <div className="flex items-start group">
                <div className="flex-shrink-0 w-12 h-12 bg-white dark:bg-white/5 rounded-lg flex items-center justify-center shadow-sm group-hover:bg-brand-magenta transition-colors duration-300">
                  <i className="fas fa-envelope text-brand-magenta text-xl group-hover:text-white transition-colors"></i>
                </div>
                {/* <div className="ml-6">
                  <h4 className="text-lg font-bold text-navy dark:text-white mb-1">Inquiries</h4>
                  <p className="text-gray-500 dark:text-slate-400">support@rescueclick.com</p>
                </div> */}
                <div className="ml-6">
                  <h4 className="text-lg font-bold text-navy dark:text-white mb-1">
                    Inquiries
                  </h4>
                  <a
                    href="mailto:support@rescueclick.com"
                    className="text-gray-500 dark:text-slate-400 hover:text-brand-blue cursor-pointer"
                  >
                   inquiry@rescueclick.com <br />
                   +91 8830637304
                  </a>
                </div>

              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div
            className={`bg-white dark:bg-enterprise-dark rounded-tr-[50px] rounded-bl-[50px] shadow-2xl p-8 md:p-12 border border-gray-100 dark:border-white/5 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}
            style={{ animationDelay: '0.2s' }}
          >
            {isSubmitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 animate-fade-in">
                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mb-6 text-green-600 shadow-inner">
                  <i className="fas fa-check text-3xl animate-bounce"></i>
                </div>
                <h3 className="text-2xl font-bold text-navy dark:text-white mb-2">Request Received</h3>
                <p className="text-gray-500 dark:text-slate-400">Thank you! Our team will be in touch within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8" noValidate>
                {/* Name Input */}
                <div className="relative z-0 w-full group">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className={getInputClasses('name')}
                    placeholder=" "
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={status !== 'idle'}
                  />
                  <label htmlFor="name" className={`peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand-magenta peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${touched.name && errors.name ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>Full Name</label>
                  {/* Validation Message */}
                  {touched.name && (
                    <div className="absolute top-full left-0 mt-1 text-xs animate-fade-in">
                      {errors.name ? (
                        <span className="text-red-500 font-medium"><i className="fas fa-exclamation-circle mr-1"></i>{errors.name}</span>
                      ) : (
                        <span className="text-green-500 font-medium"><i className="fas fa-check-circle mr-1"></i>Looks good!</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Email Input */}
                <div className="relative z-0 w-full group">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className={getInputClasses('email')}
                    placeholder=" "
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={status !== 'idle'}
                  />
                  <label htmlFor="email" className={`peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand-magenta peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${touched.email && errors.email ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>Work Email</label>
                  {touched.email && (
                    <div className="absolute top-full left-0 mt-1 text-xs animate-fade-in">
                      {errors.email ? (
                        <span className="text-red-500 font-medium"><i className="fas fa-exclamation-circle mr-1"></i>{errors.email}</span>
                      ) : (
                        <span className="text-green-500 font-medium"><i className="fas fa-check-circle mr-1"></i>Valid email!</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Message Input */}
                <div className="relative z-0 w-full group">
                  <textarea
                    name="message"
                    id="message"
                    rows={3}
                    className={getInputClasses('message')}
                    placeholder=" "
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={status !== 'idle'}
                  ></textarea>
                  <label htmlFor="message" className={`peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-brand-magenta peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 ${touched.message && errors.message ? 'text-red-500' : 'text-gray-500 dark:text-gray-400'}`}>Project Brief</label>
                  {touched.message && (
                    <div className="absolute top-full left-0 mt-1 text-xs animate-fade-in">
                      {errors.message ? (
                        <span className="text-red-500 font-medium"><i className="fas fa-exclamation-circle mr-1"></i>{errors.message}</span>
                      ) : (
                        <span className="text-green-500 font-medium"><i className="fas fa-check-circle mr-1"></i>Got it!</span>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status !== 'idle'}
                  className={` bg-brand-blue text-white w-full font-bold py-4 rounded-full shadow-lg transition-all duration-300 mt-4 transform flex items-center justify-center overflow-hidden relative
                    ${status === 'success'
                      ? 'bg-green-500 text-white hover:bg-green-600 scale-100'
                      : status === 'submitting'
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-navy dark:bg-white text-white dark:text-navy hover:bg-brand-purple dark:hover:bg-gray-200 hover:-translate-y-1'
                    }
                  `}
                >
                  {status === 'idle' && (
                    <span className=" ">Submit Inquiry</span>
                  )}

                  {status === 'submitting' && (
                    <div className="flex items-center space-x-2 animate-fade-in">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </div>
                  )}

                  {status === 'success' && (
                    <div className="flex items-center space-x-2 animate-fade-in">
                      <i className="fas fa-check text-lg"></i>
                      <span>Sent!</span>
                    </div>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;