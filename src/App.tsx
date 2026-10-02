import React, { useState, useEffect, createContext, useContext, useRef, useCallback } from 'react';

//// --- CUSTOM SVG ICONS ---
const IconBase = ({ children, size = 24, className = "", ...props }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>{children}</svg>
);
const Menu = (props) => <IconBase {...props}><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></IconBase>;
const X = (props) => <IconBase {...props}><path d="M18 6 6 18"/><path d="m6 6 12 12"/></IconBase>;
const Phone = (props) => <IconBase {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></IconBase>;
const Calendar = (props) => <IconBase {...props}><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></IconBase>;
const MapPin = (props) => <IconBase {...props}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></IconBase>;
const ArrowRight = (props) => <IconBase {...props}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></IconBase>;
const ChevronRight = (props) => <IconBase {...props}><path d="m9 18 6-6-6-6"/></IconBase>;
const ChevronDown = (props) => <IconBase {...props}><path d="m6 9 6 6 6-6"/></IconBase>;
const Activity = (props) => <IconBase {...props}><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></IconBase>;
const Stethoscope = (props) => <IconBase {...props}><path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/><path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/><circle cx="20" cy="10" r="2"/></IconBase>;
const Heart = (props) => <IconBase {...props}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></IconBase>;
const CheckCircle2 = (props) => <IconBase {...props}><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></IconBase>;
const Info = (props) => <IconBase {...props}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></IconBase>;
const Plus = (props) => <IconBase {...props}><path d="M5 12h14"/><path d="M12 5v14"/></IconBase>;
const ShieldCheck = (props) => <IconBase {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></IconBase>;
const Clock = (props) => <IconBase {...props}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></IconBase>;
const Users = (props) => <IconBase {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 1-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></IconBase>;
const Star = (props) => <IconBase {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></IconBase>;
const Award = (props) => <IconBase {...props}><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></IconBase>;
const ArrowUp = (props) => <IconBase {...props}><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></IconBase>;
const Globe = (props) => <IconBase {...props}><circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></IconBase>;

const Reveal = ({ children, direction = 'up', delay = 0, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -30px 0px' }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getTransform = () => {
    if (isVisible) return 'translate(0, 0) scale(1)';
    switch (direction) {
      case 'up': return 'translate(0, 20px) scale(0.98)';
      case 'down': return 'translate(0, -20px) scale(0.98)';
      case 'left': return 'translate(-20px, 0) scale(0.98)';
      case 'right': return 'translate(20px, 0) scale(0.98)';
      case 'none': return 'translate(0, 0) scale(0.98)';
      default: return 'translate(0, 20px) scale(0.98)';
    }
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`
      }}
    >
      {children}
    </div>
  );
};

const translations = {
  en: {
    home: "Home", about: "About", services: "Services", orthopaedics: "Orthopaedics",
    emergency: "Emergency", physiotherapy: "Physiotherapy", facilities: "Facilities",
    gallery: "Gallery", contact: "Contact", book_appointment: "Book Appointment",
    call_now: "Call Now", get_directions: "Get Directions", language: "தமிழ்", toggle_lang: "ta",
    
    hero_subtitle: "BONE & JOINT SPECIALITY HOSPITAL",
    hero_location: "Red Hills, Chennai",
    hero_description: "A premium healthcare experience focused on orthopaedic, trauma, and rehabilitation care, bringing movement back to your life.",
    hero_trust: "Trusted by 10,000+ Patients",
    
    quick_emergency: "24/7 Emergency", quick_emergency_desc: "Immediate Trauma Care",
    quick_ortho: "Expert Orthopaedics", quick_ortho_desc: "Bone & Joint Specialists",
    quick_physio: "Rehabilitation", quick_physio_desc: "Advanced Physiotherapy",
    quick_location: "Central Location", quick_location_desc: "Red Hills, Chennai",

    stats_patients: "Happy Patients", stats_experience: "Years Experience", stats_doctors: "Expert Doctors", stats_surgeries: "Successful Surgeries",

    about_title: "CARE THAT MOVES WITH YOU",
    about_desc: "RTG Hospital in Red Hills, Chennai provides patient-focused medical and orthopedic care for bone and joint conditions, fractures, trauma, mobility concerns and related healthcare needs. We blend advanced technology with compassionate care.",
    explore_btn: "Discover Our Story",
    experience_badge: "15+ Years of Excellence",

    why_choose_title: "WHY CHOOSE RTG HOSPITAL",
    why_choose_1_title: "Expert Specialists", why_choose_1_desc: "Highly qualified doctors and surgeons dedicated to your recovery.",
    why_choose_2_title: "Advanced Technology", why_choose_2_desc: "Modern diagnostic and surgical equipment for precise treatments.",
    why_choose_3_title: "Comprehensive Care", why_choose_3_desc: "From initial consultation to post-surgery rehabilitation in one place.",
    
    services_title: "COMPREHENSIVE HEALTHCARE SERVICES",
    
    ortho_title: "ADVANCED BONE & JOINT CARE",
    ortho_subtitle: "Movement matters. So does the care behind it.",
    ortho_desc: "Our orthopaedic team provides consultation, evaluation, and treatment planning tailored to individual patient needs, focusing on joint pain, fractures, and complex musculoskeletal conditions.",
    book_consult: "Book Orthopaedic Consultation",
    knee_title: "OVERCOME KNEE & JOINT PAIN",
    knee_desc: "Persistent knee pain can severely impact your quality of life. From arthritis management to sports injury recovery, our specialists provide targeted treatments to restore your mobility.",
    shoulder_title: "SPECIALIZED SHOULDER CARE",
    shoulder_desc: "Whether dealing with a frozen shoulder, rotator cuff tear, or joint inflammation, our clinical assessments ensure you get on the right treatment path quickly and safely.",
    talk_to_team: "Consult a Specialist",

    emergency_title: "WHEN EVERY MINUTE MATTERS",
    emergency_desc: "Our 24/7 emergency department is fully equipped to handle accidents, severe trauma, fractures, and immediate orthopedic emergencies with rapid response protocols.",
    
    physio_title: "RECOVERY BEYOND TREATMENT",
    physio_desc: "Healing is a journey. Our dedicated physiotherapy wing provides structured rehabilitation programs tailored to your unique recovery needs.",
    physio_steps: ["Clinical Assessment", "Targeted Treatment", "Mobility Restoration", "Full Recovery"],

    testimonials_title: "PATIENT SUCCESS STORIES",
    
    faq_title: "FREQUENTLY ASKED QUESTIONS",
    faq_q1: "What are your consulting hours?", faq_a1: "Our OPD is open from 9:00 AM to 8:00 PM, Monday through Saturday. Emergency services are available 24/7.",
    faq_q2: "Do you accept health insurance?", faq_a2: "Yes, we are tied up with most major health insurance providers and TPA networks. Please contact our helpdesk for specific policy acceptance.",
    faq_q3: "How do I book a physiotherapy session?", faq_a3: "You can book directly through our website appointment form, or call our reception. A prior consultation with our orthopaedic doctor may be recommended.",
    faq_q4: "Is parking available at the hospital?", faq_a4: "Yes, we provide dedicated parking facilities for our patients and visitors.",

    appt_main_title: "Schedule Your Visit",
    appt_main_desc: "Take the first step towards recovery. Fill out the form below, and our team will get back to you promptly to confirm your appointment.",
    appt_info_title: "We're Here For You",
    appt_info_desc: "Experience world-class healthcare with a personal touch. Our dedicated team is ready to assist you throughout your medical journey.",
    
    name_label: "Full Name", phone_label: "Phone Number", dept_label: "Department",
    date_label: "Preferred Date", time_label: "Preferred Time", msg_label: "Briefly describe your condition (Optional)",
    submit_appt: "Confirm Appointment Request",
    appt_success_title: "Request Received",
    appt_success_desc: "Thank you for choosing RTG Hospital. Your appointment request has been successfully submitted. Our coordinator will call you shortly.",
    return_home: "Back to Home",
    
    visit_us: "GET IN TOUCH",
    address_full: "514, GNT Rd, Red Hills, Naravarikuppam, Tamil Nadu 600052",
    disclaimer: "Medical information provided on this website is for informational purposes only. Always consult a qualified healthcare professional for diagnosis and treatment.",
    all_rights: "© 2026 RTG Hospital. All rights reserved."
  },
  ta: {
    home: "முகப்பு", about: "எங்களை பற்றி", services: "மருத்துவ சேவைகள்", orthopaedics: "எலும்பியல் சிகிச்சை",
    emergency: "அவசர சிகிச்சை", physiotherapy: "பிசியோதெரபி", facilities: "வசதிகள்",
    gallery: "புகைப்படங்கள்", contact: "தொடர்புக்கு", book_appointment: "முன்பதிவு",
    call_now: "அழைக்க", get_directions: "வழித்தடம்", language: "EN", toggle_lang: "en",
    
    hero_subtitle: "எலும்பு மற்றும் மூட்டு சிறப்பு மருத்துவமனை",
    hero_location: "ரெட் ஹில்ஸ், சென்னை",
    hero_description: "எலும்பியல், விபத்து மற்றும் மறுவாழ்வு சிகிச்சையில் கவனம் செலுத்தும் ஒரு சிறந்த மருத்துவ அனுபவம்.",
    hero_trust: "10,000+ நோயாளிகளின் நம்பிக்கை",

    quick_emergency: "24/7 அவசரம்", quick_emergency_desc: "உடனடி விபத்து சிகிச்சை",
    quick_ortho: "சிறந்த எலும்பியல்", quick_ortho_desc: "எலும்பு மற்றும் மூட்டு நிபுணர்கள்",
    quick_physio: "மறுவாழ்வு", quick_physio_desc: "நவீன பிசியோதெரபி",
    quick_location: "ரெட் ஹில்ஸ்", quick_location_desc: "சென்னை",

    stats_patients: "குணமடைந்த நோயாளிகள்", stats_experience: "ஆண்டுகள் அனுபவம்", stats_doctors: "சிறந்த மருத்துவர்கள்", stats_surgeries: "வெற்றிகரமான அறுவை சிகிச்சைகள்",

    about_title: "உங்களுடன் பயணிக்கும் அக்கறை",
    about_desc: "சென்னை ரெட் ஹில்ஸில் உள்ள RTG மருத்துவமனை, எலும்பு மற்றும் மூட்டு பிரச்சனைகள், எலும்பு முறிவுகள் மற்றும் விபத்து காயங்களுக்கான சிறந்த மருத்துவ சிகிச்சையை வழங்குகிறது. மேம்பட்ட தொழில்நுட்பத்துடன் கனிவான கவனிப்பையும் இணைக்கிறோம்.",
    explore_btn: "மேலும் அறிய",
    experience_badge: "15+ ஆண்டுகள் சிறந்த சேவை",

    why_choose_title: "ஏன் RTG மருத்துவமனை?",
    why_choose_1_title: "சிறந்த நிபுணர்கள்", why_choose_1_desc: "உங்கள் மீட்புக்காக அர்ப்பணிக்கப்பட்ட உயர் தகுதி வாய்ந்த மருத்துவர்கள்.",
    why_choose_2_title: "மேம்பட்ட தொழில்நுட்பம்", why_choose_2_desc: "துல்லியமான சிகிச்சைகளுக்கான நவீன உபகரணங்கள்.",
    why_choose_3_title: "முழுமையான பராமரிப்பு", why_choose_3_desc: "ஆலோசனை முதல் மறுவாழ்வு வரை அனைத்தும் ஒரே இடத்தில்.",

    services_title: "முழுமையான மருத்துவ சேவைகள்",
    
    ortho_title: "மேம்பட்ட எலும்பு மற்றும் மூட்டு சிகிச்சை",
    ortho_subtitle: "இயக்கம் முக்கியம். அதற்கான சிகிச்சையும் முக்கியம்.",
    ortho_desc: "எங்கள் மருத்துவக் குழு ஒவ்வொரு நோயாளியின் தேவைக்கேற்ப மூட்டு வலி, எலும்பு முறிவுகள் மற்றும் தசைக்கூட்டு பிரச்சனைகளுக்கு சிறந்த சிகிச்சையை வழங்குகிறது.",
    book_consult: "மருத்துவ ஆலோசனை பெற",
    knee_title: "உங்கள் மூட்டு வலியை வெல்லுங்கள்",
    knee_desc: "தொடர்ச்சியான மூட்டு வலிக்கு மூட்டுவாதம் முதல் விளையாட்டு காயங்கள் வரை பல காரணங்கள் இருக்கலாம். உங்கள் இயக்கத்தை மீட்டெடுக்க எங்கள் நிபுணர்கள் சரியான சிகிச்சை அளிக்கிறார்கள்.",
    shoulder_title: "சிறப்பு தோள்பட்டை சிகிச்சை",
    shoulder_desc: "உறைந்த தோள்பட்டை, தசைநார் அழற்சி போன்ற மூட்டு தொடர்பான நிலைமைகளுக்கு சரியான மருத்துவ பரிசோதனை மூலம் சிறந்த சிகிச்சையை பெறலாம்.",
    talk_to_team: "நிபுணரை சந்திக்க",

    emergency_title: "ஒவ்வொரு நிமிடமும் முக்கியம்",
    emergency_desc: "விபத்துக்கள், காயங்கள் மற்றும் எலும்பியல் அவசரநிலைக்கான உடனடி மற்றும் விரைவான சிகிச்சையை எங்கள் 24/7 அவசர சிகிச்சை பிரிவு வழங்குகிறது.",
    
    physio_title: "சிகிச்சையுடன் மீட்சி முடிவதில்லை",
    physio_desc: "தனிப்பட்ட சிகிச்சை தேவைகளின் அடிப்படையில் பிசியோதெரபி மற்றும் மறுவாழ்வு ஆதரவு, இயக்கம், வலிமை மற்றும் செயல்பாட்டு மீட்பு ஆகியவற்றில் கவனம் செலுத்துகிறது.",
    physio_steps: ["மருத்துவ மதிப்பீடு", "சிறப்பு சிகிச்சை", "இயக்கம் மீட்டெடுத்தல்", "முழுமையான மீட்பு"],

    testimonials_title: "நோயாளிகளின் அனுபவங்கள்",
    
    faq_title: "அடிக்கடி கேட்கப்படும் கேள்விகள்",
    faq_q1: "மருத்துவமனை நேரம் என்ன?", faq_a1: "வெளிநோயாளர் பிரிவு திங்கள் முதல் சனி வரை காலை 9 மணி முதல் இரவு 8 மணி வரை செயல்படும். அவசர சிகிச்சை 24/7 கிடைக்கும்.",
    faq_q2: "மருத்துவ காப்பீடு ஏற்றுக்கொள்ளப்படுகிறதா?", faq_a2: "ஆம், பல முன்னணி மருத்துவ காப்பீட்டு நிறுவனங்களுடன் நாங்கள் இணைந்துள்ளோம்.",
    faq_q3: "பிசியோதெரபிக்கு எப்படி முன்பதிவு செய்வது?", faq_a3: "இணையதளம் மூலமாகவோ அல்லது மருத்துவமனை வரவேற்பறையை தொடர்பு கொண்டோ முன்பதிவு செய்யலாம்.",
    faq_q4: "வாகன நிறுத்துமிடம் உள்ளதா?", faq_a4: "ஆம், நோயாளிகள் மற்றும் பார்வையாளர்களுக்கு வாகன நிறுத்துமிடம் உள்ளது.",
    
    appt_main_title: "முன்பதிவு செய்யவும்",
    appt_main_desc: "மீட்பிற்கான முதல் படியை எடுங்கள். படிவத்தை நிரப்பவும், நாங்கள் உங்களை தொடர்பு கொள்வோம்.",
    appt_info_title: "நாங்கள் உங்களுக்காக",
    appt_info_desc: "சிறந்த மருத்துவ சேவையை தனிப்பட்ட கவனிப்புடன் அனுபவியுங்கள். எங்கள் மருத்துவ குழு உங்களுக்கு உதவ தயாராக உள்ளது.",

    name_label: "முழு பெயர்", phone_label: "தொலைபேசி எண்", dept_label: "சிகிச்சை பிரிவு",
    date_label: "தேதி", time_label: "நேரம்", msg_label: "காரணம் (விருப்பப்பட்டால்)",
    submit_appt: "முன்பதிவை உறுதி செய்",
    appt_success_title: "கோரிக்கை பெறப்பட்டது",
    appt_success_desc: "RTG மருத்துவமனையை தேர்ந்தெடுத்ததற்கு நன்றி. உங்களது மருத்துவமனை குழு உங்களை விரைவில் தொடர்புகொள்ளும்.",
    return_home: "முகப்புக்கு திரும்பு",
    
    visit_us: "எங்களை தொடர்பு கொள்ள",
    address_full: "514, GNT சாலை, ரெட் ஹில்ஸ், நாரவாரிக்குப்பம், தமிழ்நாடு 600052",
    disclaimer: "இந்த இணையதளத்தில் வழங்கப்பட்டுள்ள மருத்துவத் தகவல்கள் தகவல் நோக்கங்களுக்காக மட்டுமே. நோயறிதல் மற்றும் சிகிச்சைக்கு மருத்துவ நிபுணரை அணுகவும்.",
    all_rights: "© 2026 RTG மருத்துவமனை. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை."
  }
};

const LanguageContext = createContext();
const useLanguage = () => useContext(LanguageContext);

const HOSPITAL_PHONE = "+91 44 2631 1101";
const MAPS_URL = "https://maps.google.com/?q=514+GNT+Rd+Red+Hills+Chennai";

const ASSETS = {
  hero: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000",
  about: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=1200",
  aboutSmall: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=600",
  orthoMain: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=1200",
  knee: "https://images.unsplash.com/photo-1574406280735-351fc1a7c5e0?auto=format&fit=crop&q=80&w=1000",
  shoulder: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=1000",
  emergency: "https://images.unsplash.com/photo-1587559070757-f72a388edbba?auto=format&fit=crop&q=80&w=1200",
  physio: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=1200",
  facilities: [
    { name: "Operation Theatre", img: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80&w=800" },
    { name: "Diagnostic Support", img: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&q=80&w=800" },
    { name: "Inpatient Care", img: "https://images.unsplash.com/photo-1512678080530-7760d81faba6?auto=format&fit=crop&q=80&w=800" }
  ]
};

const SERVICES = [
  { id: "ortho", title: "Orthopaedic Care", titleTa: "எலும்பியல் சிகிச்சை", desc: "Bone and joint evaluation, treatment planning and orthopedic consultation based on individual patient needs.", img: ASSETS.orthoMain },
  { id: "trauma", title: "Fracture & Trauma", titleTa: "எலும்பு முறிவு & விபத்து", desc: "Immediate care and surgical intervention for fractures and traumatic injuries.", img: "https://images.unsplash.com/photo-1583324113626-70df0f4deaab?auto=format&fit=crop&q=80&w=800" },
  { id: "med", title: "General Medicine", titleTa: "பொது மருத்துவம்", desc: "Comprehensive healthcare and clinical evaluation for general medical conditions.", img: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&q=80&w=800" },
  { id: "surg", title: "General Surgery", titleTa: "பொது அறுவை சிகிச்சை", desc: "Advanced surgical procedures performed by experienced specialists.", img: ASSETS.facilities[0].img },
  { id: "physio", title: "Physiotherapy", titleTa: "பிசியோதெரபி", desc: "Structured rehabilitation programs to restore mobility and function.", img: ASSETS.physio }
];

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-4 sm:px-6 py-2.5 sm:py-3 min-h-[44px] text-xs sm:text-sm font-bold tracking-wide transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 text-center transform active:scale-[0.98] hover:shadow-lg touch-manipulation select-none whitespace-nowrap box-border max-w-full";
  const variants = {
    primary: "bg-teal-700 text-white hover:bg-teal-800 focus:ring-teal-700 shadow-md shadow-teal-900/10",
    secondary: "bg-slate-900 text-white hover:bg-slate-800 focus:ring-slate-900 shadow-md",
    outline: "border-2 border-slate-200 text-slate-800 hover:border-teal-700 hover:text-teal-700 bg-white hover:shadow-teal-500/10",
    outlineDark: "border-2 border-white/30 text-white hover:bg-white hover:text-slate-900",
    emergency: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-600 hover:shadow-red-500/40 shadow-lg",
    light: "bg-white text-teal-800 hover:bg-slate-50 focus:ring-white shadow-md hover:shadow-xl"
  };
  
  return (
    <button className={`${baseStyle} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Header = ({ currentRoute, navigate }) => {
  const { t, lang, toggleLang } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      if (currentRoute === 'home') {
        const sections = ['hero', 'about', 'services', 'orthopaedics', 'emergency', 'contact'];
        const scrollPosition = window.scrollY + 200;

        for (const sectionId of sections) {
          const element = document.getElementById(sectionId);
          if (element) {
            const top = element.offsetTop;
            const height = element.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(sectionId);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentRoute]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'home', sectionId: 'hero', label: t('home') },
    { id: 'home', sectionId: 'about', label: t('about') },
    { id: 'home', sectionId: 'services', label: t('services') },
    { id: 'home', sectionId: 'orthopaedics', label: t('orthopaedics') },
    { id: 'home', sectionId: 'emergency', label: t('emergency') },
    { id: 'gallery', sectionId: null, label: t('gallery') },
    { id: 'home', sectionId: 'contact', label: t('contact') },
  ];

  const handleNav = (route, sectionId = null) => {
    setMobileMenuOpen(false);
    if (route !== currentRoute) {
      navigate(route);
      if (sectionId) {
        setTimeout(() => {
          const el = document.getElementById(sectionId);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      if (sectionId) {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full max-w-full transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-lg shadow-md' 
        : 'bg-white border-b border-slate-100'
    }`}>
      {/* Top Utility Bar (Desktop Only) */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 hidden lg:block border-b border-slate-800 w-full">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <a href={`tel:${HOSPITAL_PHONE.replace(/\s+/g, '')}`} className="flex items-center text-red-400 hover:text-red-300 font-semibold transition-colors">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              24/7 Emergency: {HOSPITAL_PHONE}
            </a>
            <span className="flex items-center text-slate-400">
              <MapPin size={13} className="mr-1 text-teal-400" />
              Red Hills, Chennai
            </span>
            <span className="flex items-center text-slate-400">
              <Clock size={13} className="mr-1 text-teal-400" />
              OPD: 9:00 AM - 8:00 PM
            </span>
          </div>

          <div className="flex items-center space-x-4">
            
            <button 
              onClick={toggleLang}
              className="flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-slate-800 hover:bg-teal-900 text-teal-300 transition-colors font-semibold text-[11px] border border-slate-700 active:scale-95"
            >
              <Globe size={12} />
              <span>{lang === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>
            <a 
              href={`tel:${HOSPITAL_PHONE.replace(/\s+/g, '')}`}
              className="flex items-center space-x-1 text-slate-300 hover:text-white font-medium transition-colors"
            >
              <Phone size={12} className="text-teal-400" />
              <span>Call Reception</span>
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Utility Bar */}
      <div className="lg:hidden bg-slate-950 text-slate-300 border-b border-slate-800 px-3 py-1.5 w-full">
        <div className="flex items-center justify-between gap-2">
          <a href={`tel:${HOSPITAL_PHONE.replace(/\s+/g, '')}`} className="flex items-center gap-1.5 text-red-400 font-semibold text-[11px] min-w-0">
            <Phone size={12} className="flex-shrink-0" />
            <span className="truncate">24/7 Emergency: {HOSPITAL_PHONE}</span>
          </a>
          <button
            onClick={toggleLang}
            className="flex items-center gap-1 px-2 py-1 rounded-full bg-slate-800 text-teal-300 text-[11px] font-semibold border border-slate-700 flex-shrink-0"
            aria-label="Toggle language"
          >
            <Globe size={12} />
            <span>{lang === 'en' ? 'தமிழ்' : 'English'}</span>
          </button>
        </div>
        <div className="flex items-center justify-between gap-2 mt-1 text-[10px] text-slate-400">
          <span className="flex items-center gap-1 min-w-0">
            <MapPin size={11} className="text-teal-400 flex-shrink-0" />
            <span className="truncate">Red Hills, Chennai</span>
          </span>
          <span className="flex items-center gap-1 flex-shrink-0">
            <Clock size={11} className="text-teal-400" />
            OPD: 9 AM - 8 PM
          </span>
        </div>
      </div>

      {/* MOBILE ROW 2 / DESKTOP HEADER BAR — BRAND + MENU */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2 flex justify-between items-center w-full min-w-0">
        {/* Hospital Brand Logo */}
        <div 
          className="flex items-center space-x-2.5 sm:space-x-3 cursor-pointer group py-1 select-none min-w-0" 
          onClick={() => handleNav('home')}
        >
          <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 rounded-xl bg-gradient-to-br from-teal-600 to-teal-800 text-white flex items-center justify-center shadow-md shadow-teal-700/20 group-hover:scale-105 transition-transform flex-shrink-0">
            <Stethoscope className="w-5 h-5 sm:w-6 sm:h-6 text-teal-100" />
          </div>
          <div className="flex flex-col min-w-0">
            <div className="flex items-center space-x-1 leading-none">
              <span className="font-black text-lg sm:text-xl lg:text-2xl text-slate-900 tracking-tight">RTG</span>
              <span className="font-light text-lg sm:text-xl lg:text-2xl text-teal-700">HOSPITAL</span>
            </div>
            <span className="text-[9px] sm:text-[10px] font-bold text-slate-500 uppercase tracking-wider mt-0.5 truncate">
              Bone & Joint Speciality
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
          {navLinks.map((link, idx) => {
            const isLinkActive = 
              (currentRoute === link.id && !link.sectionId) || 
              (currentRoute === 'home' && link.sectionId === activeSection);

            return (
              <button 
                key={idx} 
                onClick={() => handleNav(link.id, link.sectionId)} 
                className={`px-3 py-2 text-xs xl:text-sm font-bold rounded-xl transition-all duration-200 ${
                  isLinkActive 
                    ? 'text-teal-800 bg-teal-50/80 shadow-xs ring-1 ring-teal-200/50' 
                    : 'text-slate-700 hover:text-teal-700 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Desktop Appointment Button & Mobile Hamburger Trigger */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* Desktop Only Appointment Button */}
          

          {/* Hamburger Menu Icon (Mobile & Tablet) */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="lg:hidden p-2 rounded-xl bg-slate-100 text-slate-800 hover:bg-slate-200 active:bg-slate-300 transition-colors focus:outline-none h-10 w-10 flex items-center justify-center border border-slate-200/60 flex-shrink-0"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Side Drawer Overlay */}
      {mobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-[100] bg-slate-950/70 backdrop-blur-md transition-opacity duration-300 flex justify-end" 
          onClick={() => setMobileMenuOpen(false)}
        >
          <div 
            className="bg-white w-[85%] max-w-sm h-full shadow-2xl flex flex-col justify-between overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Drawer Top Header */}
              <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-lg bg-teal-700 text-white flex items-center justify-center">
                    <Stethoscope size={18} />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 text-base block leading-none">RTG HOSPITAL</span>
                    <span className="text-[10px] text-teal-700 font-semibold block mt-0.5">Red Hills, Chennai</span>
                  </div>
                </div>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl text-slate-500 hover:bg-slate-200 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Menu Links */}
              <div className="p-3 space-y-1">
                {navLinks.map((link, idx) => {
                  const isLinkActive = 
                    (currentRoute === link.id && !link.sectionId) || 
                    (currentRoute === 'home' && link.sectionId === activeSection);

                  return (
                    <button 
                      key={idx} 
                      onClick={() => handleNav(link.id, link.sectionId)} 
                      className={`w-full flex items-center justify-between text-left text-sm font-bold py-3 px-3.5 rounded-xl transition-all ${
                        isLinkActive 
                          ? 'text-teal-800 bg-teal-50 border border-teal-200/50' 
                          : 'text-slate-800 hover:text-teal-700 hover:bg-slate-50 active:bg-slate-100'
                      }`}
                    >
                      <span className="flex items-center">
                        <span className={`w-1.5 h-1.5 rounded-full mr-2.5 ${isLinkActive ? 'bg-teal-600' : 'bg-slate-300'}`}></span>
                        {link.label}
                      </span>
                      <ChevronRight size={16} className={isLinkActive ? "text-teal-600" : "text-slate-400"} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Drawer Footer Actions */}
            <div className="p-4 space-y-3 bg-slate-50 border-t border-slate-100">
              <Button 
                variant="primary" 
                className="w-full text-sm py-3 font-bold shadow-md shadow-teal-700/20" 
                onClick={() => handleNav('appointment')}
              >
                <Calendar size={16} className="mr-2" />
                {t('book_appointment')}
              </Button>
              
              <a href={`tel:${HOSPITAL_PHONE.replace(/\s+/g, '')}`} className="block w-full">
                <Button variant="emergency" className="w-full text-sm py-3 font-bold">
                  <Phone size={16} className="mr-2" />
                  {t('quick_emergency')}
                </Button>
              </a>

              <div className="pt-2 text-xs text-slate-500 space-y-1 text-center">
                <p className="flex items-center justify-center text-slate-700 font-semibold text-[11px]">
                  <MapPin size={12} className="mr-1 text-teal-600 flex-shrink-0" /> 514, GNT Rd, Red Hills, Chennai
                </p>
                <p className="text-[11px] text-slate-500">OPD: 9:00 AM - 8:00 PM (Mon-Sat)</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

const Hero = ({ navigate }) => {
  const { t } = useLanguage();
  return (
    <div id="hero" className="relative w-full max-w-full min-h-[480px] sm:min-h-[580px] lg:h-[85vh] lg:min-h-[620px] flex items-center bg-slate-900 overflow-hidden py-8 sm:py-10 lg:py-0">
      <div className="absolute inset-0 w-full h-full">
        <img src={ASSETS.hero} alt="RTG Hospital Exterior" className="w-full h-full object-cover object-center opacity-35 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-900/40 lg:bg-gradient-to-r lg:from-slate-950 lg:via-slate-900/80 lg:to-transparent"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-2xl mx-auto lg:mx-0 text-center lg:text-left">
          
          <Reveal direction="up" delay={100}>
            <div className="inline-flex items-center space-x-2 px-3 py-1 mb-3 sm:mb-4 bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs sm:text-sm font-semibold tracking-wide rounded-full backdrop-blur-sm max-w-full">
              <MapPin size={13} className="text-teal-400 flex-shrink-0" />
              <span className="truncate">{t('hero_location')}</span>
            </div>
          </Reveal>
          
          <Reveal direction="up" delay={200}>
            <h1 className="text-3xl xs:text-4xl sm:text-5xl lg:text-7xl font-light text-white leading-[1.12] tracking-tight mb-2 drop-shadow-lg break-words">
              RTG <span className="font-extrabold text-teal-400 block sm:inline sm:text-white">HOSPITAL</span>
            </h1>
          </Reveal>
          
          <Reveal direction="up" delay={300}>
            <h2 className="text-sm xs:text-base sm:text-2xl lg:text-3xl text-teal-300 font-medium tracking-wide mb-3 sm:mb-4 leading-snug drop-shadow-md">
              {t('hero_subtitle')}
            </h2>
          </Reveal>
          
          <Reveal direction="up" delay={400}>
            <p className="text-xs sm:text-base lg:text-xl text-slate-300 font-normal mb-6 sm:mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {t('hero_description')}
            </p>
          </Reveal>
          
          <Reveal direction="up" delay={500}>
            <div className="flex flex-col xs:flex-row gap-3 justify-center lg:justify-start max-w-sm sm:max-w-md mx-auto lg:mx-0">
              <Button onClick={() => navigate('appointment')} variant="primary" className="px-6 sm:px-7 py-3 text-xs sm:text-sm lg:text-base shadow-lg shadow-teal-500/20 w-full xs:w-auto">
                <Calendar size={16} className="mr-2 flex-shrink-0" />
                <span>{t('book_appointment')}</span>
              </Button>
              <a href={`tel:${HOSPITAL_PHONE.replace(/\s+/g, '')}`} className="w-full xs:w-auto">
                <Button variant="outlineDark" className="w-full px-6 sm:px-7 py-3 text-xs sm:text-sm lg:text-base">
                  <Phone size={16} className="mr-2 flex-shrink-0" />
                  <span>{t('call_now')}</span>
                </Button>
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Desktop Trust Badge */}
      <Reveal direction="left" delay={700} className="absolute bottom-6 right-6 hidden lg:flex items-center space-x-4 bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl shadow-2xl hover:bg-white/20 transition-colors cursor-default">
        <div className="bg-teal-500/20 p-3 rounded-full text-teal-300">
          <Star size={24} className="fill-current" />
        </div>
        <div>
          <p className="text-white font-bold text-lg leading-tight">4.9/5</p>
          <p className="text-slate-300 text-xs">{t('hero_trust')}</p>
        </div>
      </Reveal>
    </div>
  );
};

const QuickInfo = () => {
  const { t } = useLanguage();
  const infoItems = [
    { icon: Activity, title: t('quick_emergency'), desc: t('quick_emergency_desc'), highlight: true },
    { icon: Stethoscope, title: t('quick_ortho'), desc: t('quick_ortho_desc') },
    { icon: Heart, title: t('quick_physio'), desc: t('quick_physio_desc') },
    { icon: MapPin, title: t('quick_location'), desc: t('quick_location_desc') }
  ];

  return (
    <div className="bg-white relative z-20 shadow-[0_-15px_30px_-10px_rgba(0,0,0,0.08)] rounded-t-3xl -mt-6 lg:-mt-8 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
        {infoItems.map((item, idx) => (
          <Reveal key={idx} direction="up" delay={idx * 100} className={`p-5 sm:p-6 lg:p-8 transition-all duration-300 hover:bg-slate-50 ${item.highlight ? 'relative overflow-hidden group' : ''}`}>
            {item.highlight && <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>}
            <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center mb-3 shadow-sm transform transition-transform group-hover:scale-110 ${item.highlight ? 'bg-red-50 text-red-600' : 'bg-teal-50 text-teal-700'}`}>
              <item.icon size={22} />
            </div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
            <p className="text-slate-500 text-xs sm:text-sm font-medium">{item.desc}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

const ServicesInteractive = () => {
  const { t, lang } = useLanguage();
  const [activeService, setActiveService] = useState(SERVICES[0]);

  return (
    <section id="services" className="py-12 lg:py-24 bg-slate-50 overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <Reveal direction="up" className="mb-8 lg:mb-12 text-center lg:text-left">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900">
            {t('services_title')}
          </h2>
          <div className="w-14 h-1.5 bg-teal-600 mt-3 mx-auto lg:mx-0 rounded-full"></div>
        </Reveal>

        {/* Mobile Horizontal Pill Navigation Wrapper */}
        <div className="lg:hidden w-full overflow-hidden mb-6">
          <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-none snap-x px-1">
            {SERVICES.map((service) => {
              const isActive = activeService.id === service.id;
              return (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service)}
                  className={`snap-start flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all border whitespace-nowrap min-h-[38px] ${
                    isActive 
                      ? 'bg-teal-700 text-white border-teal-700 shadow-md' 
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {lang === 'ta' ? service.titleTa : service.title}
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-6 lg:gap-12 w-full">
          
          {/* Active Service Visual Card */}
          <Reveal direction="right" className="order-1 lg:order-2 lg:col-span-7 relative h-[260px] sm:h-[360px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl bg-slate-900 w-full group">
            {SERVICES.map(service => (
              <div 
                key={service.id}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${activeService.id === service.id ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105 pointer-events-none'}`}
              >
                <img src={service.img} alt={service.title} className="w-full h-full object-cover opacity-80 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-5 sm:p-8 lg:p-10 w-full">
                  <h3 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white mb-2 drop-shadow-md">
                    {lang === 'ta' ? service.titleTa : service.title}
                  </h3>
                  <p className="text-slate-200 text-xs sm:text-base max-w-lg leading-relaxed drop-shadow-sm line-clamp-3 sm:line-clamp-none">
                    {service.desc}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>

          {/* Desktop Vertical Menu */}
          <Reveal direction="left" className="hidden lg:flex order-2 lg:order-1 lg:col-span-5 flex-col justify-center space-y-2.5">
            {SERVICES.map((service, idx) => {
              const isActive = activeService.id === service.id;
              return (
                <button 
                  key={service.id}
                  onClick={() => setActiveService(service)}
                  className={`text-left p-4 lg:p-5 rounded-2xl transition-all duration-300 flex items-center justify-between group min-h-[68px]
                    ${isActive ? 'bg-white shadow-lg shadow-teal-900/5 ring-1 ring-teal-200' : 'bg-transparent hover:bg-slate-200/50'}`}
                >
                  <div className="flex items-center space-x-3.5">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${isActive ? 'bg-teal-100 text-teal-700' : 'bg-slate-200 text-slate-500 group-hover:bg-slate-300'}`}>
                      0{idx + 1}
                    </div>
                    <span className={`text-base lg:text-lg font-bold transition-colors ${isActive ? 'text-slate-900' : 'text-slate-600'}`}>
                      {lang === 'ta' ? service.titleTa : service.title}
                    </span>
                  </div>
                  <ChevronRight size={20} className={`transform transition-all ${isActive ? 'text-teal-600 translate-x-0 opacity-100' : 'text-slate-400 -translate-x-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                </button>
              );
            })}
          </Reveal>

        </div>
      </div>
    </section>
  );
};

const OrthopaedicSection = ({ navigate }) => {
  const { t } = useLanguage();
  return (
    <div id="orthopaedics" className="w-full max-w-full overflow-hidden">
      <section className="py-12 lg:py-20 bg-white relative overflow-hidden w-full">
        <Reveal direction="up" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl relative z-10">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">{t('ortho_title')}</h2>
          <h3 className="text-base sm:text-xl font-medium text-teal-700 mb-4">{t('ortho_subtitle')}</h3>
          <p className="text-xs sm:text-base lg:text-lg text-slate-600 leading-relaxed mb-8 max-w-3xl mx-auto">
            {t('ortho_desc')}
          </p>
          <Button onClick={() => navigate('appointment')} variant="primary" className="px-8 py-3.5 shadow-lg shadow-teal-500/20">{t('book_consult')}</Button>
        </Reveal>
      </section>

      <section className="py-0 bg-slate-900 text-white w-full overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[360px] lg:min-h-[480px]">
          <div className="w-full lg:w-1/2 relative min-h-[260px] sm:min-h-[320px] order-1 lg:order-2 overflow-hidden group">
            <img src={ASSETS.knee} alt="Knee Pain Assessment" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:scale-105 transition-all duration-1000" />
            <div className="absolute inset-0 bg-teal-900/20 group-hover:bg-transparent transition-colors duration-700"></div>
          </div>
          <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-20 flex flex-col justify-center order-2 lg:order-1 text-center lg:text-left relative">
            <Reveal direction="right">
              <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4 text-white relative z-10">
                {t('knee_title')}
              </h3>
              <p className="text-slate-300 text-xs sm:text-base mb-6 leading-relaxed relative z-10">
                {t('knee_desc')}
              </p>
              <div className="relative z-10">
                <Button onClick={() => navigate('appointment')} variant="outlineDark" className="w-full sm:w-auto">
                  {t('talk_to_team')}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-0 bg-slate-50 w-full overflow-hidden">
        <div className="flex flex-col lg:flex-row min-h-[360px] lg:min-h-[480px]">
          <div className="w-full lg:w-1/2 relative min-h-[260px] sm:min-h-[320px] overflow-hidden group">
            <img src={ASSETS.shoulder} alt="Shoulder Assessment" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
          </div>
          <div className="w-full lg:w-1/2 p-6 sm:p-10 lg:p-20 flex flex-col justify-center bg-white text-center lg:text-left relative">
            <Reveal direction="left">
              <div className="w-12 h-1 bg-teal-600 mb-4 mx-auto lg:mx-0 rounded-full"></div>
              <h3 className="text-xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4 text-slate-900">
                {t('shoulder_title')}
              </h3>
              <p className="text-slate-600 text-xs sm:text-base mb-6 leading-relaxed">
                {t('shoulder_desc')}
              </p>
              <div>
                <Button onClick={() => navigate('appointment')} variant="secondary" className="w-full sm:w-auto">
                  {t('talk_to_team')}
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
};

const EmergencySection = () => {
  const { t } = useLanguage();
  return (
    <section id="emergency" className="relative py-12 sm:py-16 lg:py-28 bg-red-950 overflow-hidden w-full max-w-full">
      <img src={ASSETS.emergency} alt="Emergency Care" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-20 grayscale" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
      
      <Reveal direction="up" className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="w-14 h-14 sm:w-20 sm:h-20 bg-red-600/20 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6 animate-pulse shadow-[0_0_30px_rgba(220,38,38,0.4)]">
          <Activity size={28} className="text-red-500 sm:w-8 sm:h-8" />
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 tracking-tight">
          {t('emergency_title')}
        </h2>
        <p className="text-xs sm:text-base lg:text-lg text-red-100/80 mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto">
          {t('emergency_desc')}
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 lg:gap-5 w-full max-w-md sm:max-w-none mx-auto">
          <div className="bg-white/10 backdrop-blur-md w-full sm:w-auto px-4 sm:px-8 py-2.5 sm:py-3 rounded-full border border-red-500/30 flex items-center justify-center space-x-3">
            <Phone className="text-red-400 flex-shrink-0" size={20} />
            <div className="text-left">
              <div className="text-red-400 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">{t('quick_emergency')}</div>
              <div className="text-sm sm:text-lg lg:text-xl font-bold text-white tracking-wider">{HOSPITAL_PHONE}</div>
            </div>
          </div>
          <a href={`tel:${HOSPITAL_PHONE.replace(/\s+/g, '')}`} className="w-full sm:w-auto">
            <Button variant="emergency" className="w-full sm:w-auto py-3 px-8 text-xs sm:text-sm font-bold tracking-wide rounded-full">
              {t('call_now')}
            </Button>
          </a>
        </div>
      </Reveal>
    </section>
  );
};

const PhysiotherapySection = () => {
  const { t } = useLanguage();
  const steps = t('physio_steps');

  return (
    <section className="py-12 lg:py-24 bg-slate-50 relative overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" className="text-center mb-10 lg:mb-14">
          <h2 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-slate-900 mb-3">{t('physio_title')}</h2>
          <p className="text-slate-600 text-xs sm:text-base max-w-2xl mx-auto leading-relaxed">{t('physio_desc')}</p>
        </Reveal>
        
        <div className="relative mt-6 lg:mt-10">
          <div className="hidden md:block absolute top-8 left-8 right-8 h-1 bg-teal-200 rounded-full"></div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 lg:gap-8 relative">
            {steps.map((step, idx) => (
              <Reveal key={idx} direction="up" delay={idx * 100} className="relative z-10 flex flex-row md:flex-col items-center md:items-center text-left md:text-center group bg-white md:bg-transparent p-3.5 sm:p-4 md:p-0 rounded-2xl shadow-sm md:shadow-none border md:border-none border-slate-200/80">
                <div className="w-10 h-10 md:w-16 md:h-16 rounded-full bg-white border-2 md:border-4 border-teal-600 flex items-center justify-center text-sm md:text-xl font-extrabold text-teal-700 flex-shrink-0 shadow-md group-hover:bg-teal-600 group-hover:text-white transition-all">
                  {idx + 1}
                </div>
                <div className="ml-3.5 md:ml-0 md:mt-5">
                  <h4 className="text-xs sm:text-sm md:text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">{step}</h4>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const StatsSection = () => {
  const { t } = useLanguage();
  const stats = [
    { label: t('stats_patients'), value: '10,000+' },
    { label: t('stats_experience'), value: '15+' },
    { label: t('stats_doctors'), value: '12+' },
    { label: t('stats_surgeries'), value: '3,500+' }
  ];
  return (
    <section className="py-8 sm:py-10 bg-teal-800 text-white w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 text-center">
        {stats.map((item, idx) => (
          <Reveal key={idx} direction="up" delay={idx * 100}>
            <div className="text-xl sm:text-4xl font-extrabold text-teal-200 mb-1">{item.value}</div>
            <div className="text-[10px] sm:text-xs font-semibold text-teal-100 uppercase tracking-wider">{item.label}</div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

const AboutSection = () => {
  const { t } = useLanguage();
  return (
    <section id="about" className="py-12 lg:py-20 bg-white overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        <Reveal direction="right" className="lg:col-span-6 relative">
          <img src={ASSETS.about} alt="RTG Hospital Doctor" className="rounded-2xl sm:rounded-3xl shadow-xl w-full h-[260px] sm:h-[400px] object-cover" />
          <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-teal-700 text-white p-3 sm:p-5 rounded-2xl shadow-xl hidden sm:block max-w-[80%]">
            <p className="font-bold text-xs sm:text-base">{t('experience_badge')}</p>
          </div>
        </Reveal>
        <Reveal direction="left" className="lg:col-span-6">
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900 mb-4">{t('about_title')}</h2>
          <p className="text-slate-600 text-xs sm:text-base leading-relaxed mb-6">{t('about_desc')}</p>
          <div className="flex items-center space-x-3 text-teal-700 font-bold text-xs sm:text-sm">
            <Award size={20} className="flex-shrink-0" />
            <span>Dedicated Orthopaedic & Trauma Center</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

const WhyChooseUs = () => {
  const { t } = useLanguage();
  const features = [
    { title: t('why_choose_1_title'), desc: t('why_choose_1_desc'), icon: Users },
    { title: t('why_choose_2_title'), desc: t('why_choose_2_desc'), icon: ShieldCheck },
    { title: t('why_choose_3_title'), desc: t('why_choose_3_desc'), icon: CheckCircle2 }
  ];
  return (
    <section className="py-12 lg:py-16 bg-slate-50 border-y border-slate-100 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900">{t('why_choose_title')}</h2>
          <div className="w-14 h-1 bg-teal-600 mx-auto mt-3 rounded-full"></div>
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <Reveal key={idx} direction="up" delay={idx * 150} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-10 h-10 bg-teal-50 text-teal-700 rounded-xl flex items-center justify-center mb-4">
                <item.icon size={22} />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const FAQSection = () => {
  const { t } = useLanguage();
  const [openIdx, setOpenIdx] = useState(null);
  const faqs = [
    { q: t('faq_q1'), a: t('faq_a1') },
    { q: t('faq_q2'), a: t('faq_a2') },
    { q: t('faq_q3'), a: t('faq_a3') },
    { q: t('faq_q4'), a: t('faq_a4') }
  ];
  return (
    <section className="py-12 lg:py-20 bg-white w-full overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal direction="up" className="text-center mb-10">
          <h2 className="text-2xl sm:text-4xl font-bold text-slate-900">{t('faq_title')}</h2>
          <div className="w-14 h-1 bg-teal-600 mx-auto mt-3 rounded-full"></div>
        </Reveal>
        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <Reveal key={idx} direction="up" delay={idx * 80} className="border border-slate-200 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 transition-colors font-bold text-slate-800 flex justify-between items-center text-xs sm:text-base gap-2"
              >
                <span>{faq.q}</span>
                <ChevronDown size={18} className={`transform transition-transform flex-shrink-0 ${openIdx === idx ? 'rotate-180 text-teal-600' : 'text-slate-400'}`} />
              </button>
              {openIdx === idx && (
                <div className="p-4 bg-white text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100">
                  {faq.a}
                </div>
              )}
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const ContactSection = () => {
  const { t } = useLanguage();
  return (
    <section id="contact" className="py-12 lg:py-20 bg-slate-900 text-white relative w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        <Reveal direction="right">
          <h2 className="text-2xl sm:text-4xl font-bold mb-4">{t('visit_us')}</h2>
          <p className="text-slate-300 text-xs sm:text-base mb-6 leading-relaxed">{t('address_full')}</p>
          <div className="space-y-3">
            <a href={`tel:${HOSPITAL_PHONE.replace(/\s+/g, '')}`} className="flex items-center space-x-3 text-teal-400 hover:text-teal-300 font-bold text-sm sm:text-lg">
              <Phone size={18} className="flex-shrink-0" />
              <span>{HOSPITAL_PHONE}</span>
            </a>
            <a href={MAPS_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center space-x-2 text-slate-300 hover:text-white underline text-xs sm:text-sm">
              <MapPin size={16} className="flex-shrink-0" />
              <span>{t('get_directions')}</span>
            </a>
          </div>
        </Reveal>
        <Reveal direction="left" className="h-[260px] sm:h-[340px] rounded-2xl overflow-hidden shadow-2xl w-full">
          <iframe 
            title="RTG Hospital Location" 
            src="https://maps.google.com/maps?q=514%20GNT%20Rd%20Red%20Hills%20Chennai&t=&z=15&ie=UTF8&iwloc=&output=embed" 
            className="w-full h-full border-0" 
            allowFullScreen="" 
            loading="lazy"
          ></iframe>
        </Reveal>
      </div>
    </section>
  );
};

const AppointmentView = ({ navigate }) => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: '', phone: '', dept: '', date: '', time: '', msg: '' });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => { window.scrollTo(0,0); }, []);

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^[0-9\-\+\s]{10,15}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid phone number";
    }
    if (!formData.dept) newErrors.dept = "Select a department";
    if (!formData.date) newErrors.date = "Select a date";
    if (!formData.time) newErrors.time = "Select a time preference";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setTimeout(() => { setIsSubmitting(false); setIsSuccess(true); }, 1200);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen pt-8 pb-12 flex flex-col items-center justify-center bg-slate-50 px-4 relative overflow-hidden w-full max-w-full">
        <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl max-w-lg text-center relative z-10 w-full border border-slate-100">
          <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 size={36} className="text-teal-600" />
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">{t('appt_success_title')}</h2>
          <p className="text-xs sm:text-sm text-slate-600 mb-6 leading-relaxed">
            {t('appt_success_desc')}
          </p>
          <div className="flex justify-center">
            <Button onClick={() => navigate('home')} variant="primary" className="w-full sm:w-auto px-8">{t('return_home')}</Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-4 sm:pt-6 lg:pt-8 pb-20 bg-slate-50 px-3 sm:px-6 lg:px-8 flex flex-col relative overflow-hidden w-full max-w-full">
      <div className="max-w-5xl mx-auto w-full flex-grow flex flex-col justify-center relative z-10">
        
        <div className="bg-white shadow-xl shadow-slate-200/50 rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col lg:flex-row border border-slate-100 w-full">
          
          {/* Left Side - Info */}
          <div className="lg:w-5/12 bg-slate-900 p-5 sm:p-8 text-white relative flex flex-col justify-between overflow-hidden">
            <div className="relative z-10">
              <div className="inline-flex items-center space-x-1.5 text-teal-400 font-bold mb-3 text-xs">
                <Clock size={14} /> <span>Quick Booking</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold mb-2">{t('appt_info_title')}</h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6">
                {t('appt_info_desc')}
              </p>
            </div>

            <div className="mt-4 relative z-10 pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-400 mb-1">Need immediate emergency help?</p>
              <a href={`tel:${HOSPITAL_PHONE.replace(/\s+/g, '')}`} className="text-sm sm:text-base font-bold text-teal-400 flex items-center hover:underline">
                <Phone size={16} className="mr-2 flex-shrink-0"/> {HOSPITAL_PHONE}
              </a>
            </div>
          </div>
          
          {/* Right Side - Form */}
          <div className="lg:w-7/12 p-4 sm:p-8 lg:p-10 bg-white">
            <div className="mb-5">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-1">{t('appt_main_title')}</h3>
              <p className="text-slate-500 text-xs">{t('appt_main_desc')}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t('name_label')} <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    className={`w-full px-3.5 py-2.5 bg-slate-50 border ${errors.name ? 'border-red-400' : 'border-slate-200 focus:border-teal-500'} rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-teal-500`}
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Full Name"
                  />
                  {errors.name && <p className="mt-1 text-[11px] font-semibold text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t('phone_label')} <span className="text-red-500">*</span></label>
                  <input 
                    type="tel" 
                    className={`w-full px-3.5 py-2.5 bg-slate-50 border ${errors.phone ? 'border-red-400' : 'border-slate-200 focus:border-teal-500'} rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-teal-500`}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+91 98765 43210"
                  />
                  {errors.phone && <p className="mt-1 text-[11px] font-semibold text-red-500">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t('dept_label')} <span className="text-red-500">*</span></label>
                  <select 
                    className={`w-full px-3 py-2.5 bg-slate-50 border ${errors.dept ? 'border-red-400' : 'border-slate-200 focus:border-teal-500'} rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-teal-500`}
                    value={formData.dept}
                    onChange={(e) => setFormData({...formData, dept: e.target.value})}
                  >
                    <option value="" disabled>Select Department</option>
                    <option value="ortho">Orthopaedics / Bone & Joint</option>
                    <option value="physio">Physiotherapy</option>
                    <option value="general">General Medicine</option>
                    <option value="surgery">General Surgery</option>
                  </select>
                  {errors.dept && <p className="mt-1 text-[11px] font-semibold text-red-500">{errors.dept}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t('date_label')} <span className="text-red-500">*</span></label>
                  <input 
                    type="date" 
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-3.5 py-2.5 bg-slate-50 border ${errors.date ? 'border-red-400' : 'border-slate-200 focus:border-teal-500'} rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-teal-500`}
                    value={formData.date}
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                  {errors.date && <p className="mt-1 text-[11px] font-semibold text-red-500">{errors.date}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t('time_label')} <span className="text-red-500">*</span></label>
                  <select 
                    className={`w-full px-3 py-2.5 bg-slate-50 border ${errors.time ? 'border-red-400' : 'border-slate-200 focus:border-teal-500'} rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-1 focus:ring-teal-500`}
                    value={formData.time}
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  >
                    <option value="" disabled>Select Time</option>
                    <option value="morning">Morning (9 AM - 12 PM)</option>
                    <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                    <option value="evening">Evening (4 PM - 8 PM)</option>
                  </select>
                  {errors.time && <p className="mt-1 text-[11px] font-semibold text-red-500">{errors.time}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">{t('msg_label')}</label>
                  <textarea 
                    rows="3"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 resize-none"
                    value={formData.msg}
                    onChange={(e) => setFormData({...formData, msg: e.target.value})}
                    placeholder="Briefly describe your symptoms..."
                  ></textarea>
                </div>
              </div>

              <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl flex items-start space-x-2 text-xs text-amber-900">
                <Info size={16} className="flex-shrink-0 mt-0.5 text-amber-600" />
                <p className="leading-snug">For urgent emergencies, call <a href={`tel:${HOSPITAL_PHONE.replace(/\s+/g, '')}`} className="font-bold underline">{HOSPITAL_PHONE}</a> directly.</p>
              </div>

              <div className="pt-2">
                <Button type="submit" variant="primary" className="w-full py-3 text-xs sm:text-sm font-bold shadow-md shadow-teal-700/20" disabled={isSubmitting}>
                  {isSubmitting ? "Processing..." : t('submit_appt')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const GalleryView = () => {
  const { t } = useLanguage();
  const [lightboxImg, setLightboxImg] = useState(null);

  useEffect(() => { window.scrollTo(0,0); }, []);

  const galleryImages = [
    { src: ASSETS.hero, alt: "Hospital Exterior", colSpan: "col-span-12 md:col-span-8", rowSpan: "row-span-2" },
    { src: ASSETS.aboutSmall, alt: "Consultation", colSpan: "col-span-6 md:col-span-4", rowSpan: "row-span-1" },
    { src: ASSETS.facilities[0].img, alt: "Operation Theatre", colSpan: "col-span-6 md:col-span-4", rowSpan: "row-span-1" },
    { src: ASSETS.physio, alt: "Physiotherapy", colSpan: "col-span-12 md:col-span-6", rowSpan: "row-span-1" },
    { src: ASSETS.facilities[2].img, alt: "Inpatient Room", colSpan: "col-span-12 md:col-span-6", rowSpan: "row-span-1" },
    { src: ASSETS.orthoMain, alt: "Orthopaedic Treatment", colSpan: "col-span-12", rowSpan: "row-span-2" }
  ];

  return (
    <div className="min-h-screen pt-8 lg:pt-10 pb-16 bg-slate-50 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-4xl font-bold text-slate-900 mb-3 tracking-tight">
            {t('gallery')}
          </h2>
          <div className="w-14 h-1 bg-teal-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-12 auto-rows-[160px] md:auto-rows-[250px] gap-3 md:gap-4">
          {galleryImages.map((img, idx) => (
            <div
              key={idx}
              className={`${img.colSpan} ${img.rowSpan} overflow-hidden cursor-pointer group relative rounded-2xl shadow-sm bg-slate-200`}
              onClick={() => setLightboxImg(img.src)}
            >
              <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105" />
              <div className="absolute inset-0 bg-slate-900/0 md:group-hover:bg-teal-900/30 transition-colors duration-300 flex items-center justify-center">
                <div className="bg-white/20 backdrop-blur-md p-2.5 rounded-full opacity-0 md:group-hover:opacity-100 transition-all duration-300 hidden md:flex">
                  <Plus className="text-white" size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightboxImg && (
        <div className="fixed inset-0 z-[100] bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setLightboxImg(null)}>
          <button className="absolute top-4 right-4 text-white/80 hover:text-white rounded-full z-50 p-2 transition-colors">
            <X size={28} />
          </button>
          <img src={lightboxImg} alt="Gallery Full" className="max-w-[95vw] max-h-[85vh] object-contain rounded-xl shadow-2xl" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
};

const Footer = ({ navigate }) => {
  const { t } = useLanguage();
  return (
    <footer className="bg-slate-950 text-slate-300 pt-12 lg:pt-20 pb-28 lg:pb-12 border-t border-slate-900 relative z-30 w-full max-w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-white mb-1 tracking-tight">RTG <span className="font-light">HOSPITAL</span></h2>
            <p className="text-teal-500 font-bold mb-4 uppercase tracking-wider text-xs">{t('hero_subtitle')}</p>
            <p className="mb-6 leading-relaxed max-w-md text-slate-400 text-xs sm:text-sm">
              {t('hero_description')}
            </p>
            <div className="flex space-x-3">
              <Button variant="primary" onClick={() => navigate('appointment')} className="py-2 px-5 text-xs w-full sm:w-auto">
                {t('book_appointment')}
              </Button>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><button onClick={() => navigate('home')} className="text-slate-400 hover:text-teal-400 transition-colors text-left">Home</button></li>
              <li><button onClick={() => navigate('gallery')} className="text-slate-400 hover:text-teal-400 transition-colors text-left">Gallery</button></li>
              <li><button onClick={() => navigate('appointment')} className="text-teal-400 hover:text-teal-300 font-bold transition-colors text-left">Book Appointment</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Contact Info</h4>
            <ul className="space-y-3 text-xs sm:text-sm">
              <li className="flex items-start space-x-2.5">
                <MapPin size={16} className="text-teal-500 mt-0.5 flex-shrink-0" />
                <span className="leading-relaxed text-slate-400">{t('address_full')}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone size={16} className="text-teal-500 flex-shrink-0" />
                <span className="font-bold text-white">{HOSPITAL_PHONE}</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-800/60 pt-6 flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-500 space-y-3 md:space-y-0">
          <p className="text-center md:text-left">{t('all_rights')}</p>
          <p className="max-w-md text-center md:text-right leading-relaxed">{t('disclaimer')}</p>
        </div>
      </div>
    </footer>
  );
};

const MobileActionBar = ({ navigate }) => {
  const { t } = useLanguage();
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200/80 shadow-[0_-8px_20px_rgba(0,0,0,0.06)] z-40 pb-[max(0.5rem,env(safe-area-inset-bottom))] px-2 py-1.5 w-full max-w-full">
      <div className="w-full flex items-center justify-around gap-1">
        <a 
          href={`tel:${HOSPITAL_PHONE.replace(/\s+/g, '')}`} 
          className="flex-1 py-1.5 flex flex-col items-center justify-center text-slate-700 active:text-red-600 transition-colors min-h-[44px] rounded-lg hover:bg-slate-50"
        >
          <Phone size={18} className="mb-0.5 text-red-600 flex-shrink-0" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider">{t('call_now')}</span>
        </a>

        <button 
          onClick={() => navigate('appointment')} 
          className="flex-[1.4] py-1.5 flex flex-col items-center justify-center text-teal-800 font-bold min-h-[44px] bg-teal-50 rounded-xl border border-teal-200/80 active:bg-teal-100 transition-colors shadow-xs"
        >
          <Calendar size={18} className="mb-0.5 text-teal-700 flex-shrink-0" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider">{t('book_appointment')}</span>
        </button>

        <a 
          href={MAPS_URL} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex-1 py-1.5 flex flex-col items-center justify-center text-slate-700 active:text-teal-700 transition-colors min-h-[44px] rounded-lg hover:bg-slate-50"
        >
          <MapPin size={18} className="mb-0.5 text-teal-600 flex-shrink-0" />
          <span className="text-[10px] font-extrabold uppercase tracking-wider">{t('get_directions')}</span>
        </a>
      </div>
    </div>
  );
};

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 350);
    };
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`fixed bottom-20 lg:bottom-8 right-3 sm:right-6 z-30 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
      <button 
        onClick={scrollToTop}
        className="w-9 h-9 sm:w-11 sm:h-11 bg-teal-700 text-white rounded-full flex items-center justify-center shadow-lg shadow-teal-900/30 hover:bg-teal-800 active:scale-95 transition-all focus:outline-none"
        aria-label="Scroll to top"
      >
        <ArrowUp size={16} />
      </button>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState('en');
  const [currentRoute, setCurrentRoute] = useState('home');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('rtg_lang');
      if (stored === 'ta' || stored === 'en') setLang(stored);
    } catch (e) {}
  }, []);

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'ta' : 'en';
    setLang(newLang);
    try { localStorage.setItem('rtg_lang', newLang); } catch (e) {}
  };

  const t = (key) => {
    return translations[lang][key] || translations['en'][key] || key;
  };

  const renderView = () => {
    switch (currentRoute) {
      case 'appointment':
        return <AppointmentView navigate={setCurrentRoute} />;
      case 'gallery':
        return <GalleryView />;
      case 'home':
      default:
        return (
          <>
            <Hero navigate={setCurrentRoute} />
            <QuickInfo />
            <StatsSection />
            <AboutSection />
            <WhyChooseUs />
            <ServicesInteractive />
            <OrthopaedicSection navigate={setCurrentRoute} />
            <EmergencySection />
            <PhysiotherapySection />
            <FAQSection />
            <ContactSection />
          </>
        );
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      <div className="font-sans text-slate-900 bg-white min-h-screen selection:bg-teal-900 selection:text-white antialiased w-full max-w-full overflow-x-hidden">
        <Header currentRoute={currentRoute} navigate={setCurrentRoute} />
        <div aria-hidden="true" className="h-[104px] lg:h-[96px]" />
        
        <main className="w-full max-w-full overflow-x-hidden">
          {renderView()}
        </main>
        
        <Footer navigate={setCurrentRoute} />
        <MobileActionBar navigate={setCurrentRoute} />
        <ScrollToTop />
      </div>
    </LanguageContext.Provider>
  );
}