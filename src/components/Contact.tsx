import React, { useEffect, useState, useRef } from "react";
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSnapchat } from "@fortawesome/free-brands-svg-icons";
import { Instagram, Github } from "lucide-react";
import { translations, Language } from '../lib/translations';

interface ContactProps {
  currentLanguage: string;
}

const Contact: React.FC<ContactProps> = ({ currentLanguage }) => {
  const [isVisible, setIsVisible] = useState(false);
  const t = translations[currentLanguage.toLowerCase() as Language] || translations['en-uk'];
  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("contact");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.current) {
      // Replace with your actual EmailJS Service ID, Template ID, and Public Key
      emailjs.sendForm(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, 
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID, 
        form.current, 
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
        .then((result) => {
            console.log(result.text);
            alert(t.contact.alertMessage);
            setFormData({ name: "", email: "", subject: "", message: "" });
        }, (error) => {
            console.log(error.text);
            alert('Failed to send message. Please try again later.');
        });
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`transition-all duration-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center p-3 bg-emerald-500/10 rounded-full mb-4">
              <Mail className="w-8 h-8 text-emerald-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.contact.title}
            </h2>
            <div className="w-24 h-1 bg-emerald-500 mx-auto mb-4"></div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t.contact.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-6">
                  {t.contact.connectTitle}
                </h3>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  {t.contact.connectDesc}
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-emerald-500/10 rounded-lg">
                    <Mail className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{t.contact.emailLabel}</h4>
                    <a
                      href="mailto:monerbarwari2@gmail.com"
                      className="text-gray-300 hover:text-emerald-400 transition-colors"
                    >
                      monerbarwari2@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-emerald-500/10 rounded-lg">
                    <Phone className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{t.contact.phoneLabel}</h4>
                    <a
                      href="tel:+9647503465010"
                      className="text-gray-300 hover:text-emerald-400 transition-colors"
                    >
                      +964 (750) 346-5010
                    </a>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-emerald-500/10 rounded-lg">
                    <MapPin className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{t.contact.locationLabel}</h4>
                    <p className="text-gray-300">{t.contact.locationValue}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="font-semibold text-white mb-4">{t.contact.followLabel}</h4>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="p-3 bg-gray-800 rounded-lg hover:bg-emerald-500 text-gray-400 hover:text-white transition-all duration-200 transform hover:-translate-y-1"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="p-3 bg-gray-800 rounded-lg hover:bg-pink-500 text-gray-400 hover:text-white transition-all duration-200 transform hover:-translate-y-1"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="p-3 bg-gray-800 rounded-lg hover:bg-yellow-400 text-gray-400 hover:text-white transition-all duration-200 transform hover:-translate-y-1"
                  >
                    <FontAwesomeIcon icon={faSnapchat} className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-800 p-8 rounded-xl">
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      {t.contact.formFullNameLabel}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder={t.contact.formFullNamePlaceholder}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      {t.contact.formEmailLabel}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                      placeholder={t.contact.formEmailPlaceholder}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    {t.contact.formSubjectLabel}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                    placeholder={t.contact.formSubjectPlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    {t.contact.formMessageLabel}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all resize-none"
                    placeholder={t.contact.formMessagePlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-800 transform hover:-translate-y-1 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>{t.contact.formSubmitButton}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
