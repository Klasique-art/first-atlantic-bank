export const bankLobbyImg = "https://img.freepik.com/free-vector/cartoon-security-control-cctv-room-interior-with-display-monitors_88138-927.jpg?t=st=1746793322~exp=1746796922~hmac=7d9699514c33f97d8f9819ad96d2c16158c0a334753e81783ac423424f3097da&w=1380"

export const atmImg = "https://img.freepik.com/free-vector/atm-vector-illustration-automatic-teller-machine_73621-1035.jpg?t=st=1746794060~exp=1746797660~hmac=55b605b2457bc4c44a665530cbcfe7196376136c81150e44065c734ff3688d2d&w=900"

export const deskImg = "https://img.freepik.com/free-photo/man-hand-with-money-bag-with-dollar-sign_107791-17466.jpg?t=st=1746800411~exp=1746804011~hmac=44987c9be7bb43a3a377ef0812359af90a6174c248ade9e27bec990142124527&w=900"

export const officeImg = "https://img.freepik.com/free-vector/hand-drawn-people-talking-phone-illustration_23-2149826991.jpg?t=st=1746800510~exp=1746804110~hmac=07bad9681e57652253a282f9b556a7ed07e3f0142f8a66c3d8f9a13702efb10c&w=900"

export const evolution = [
    {
      id: 1,
      title: "2000s: Queues in banking halls",
      image: "https://images.unsplash.com/photo-1634937734976-7b0432527d5d?q=80&w=1993&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: `The 2000s represented the height of traditional banking in Ghana, and like many parts of the world, it was defined by long, winding queues in brick-and-mortar banking halls. Customers often had to dedicate an entire morning or afternoon to complete a simple transaction. The environment was typically crowded, with numbered tickets, endless waiting, and bank tellers buried in mountains of paperwork. Passbooks, cheque books, and physical cash ruled the day. It was not uncommon for a customer to be told to return the next day because “the system was down.” Transactions were handled manually, leaving room for human error and security lapses. There was a strong human element to it—relationships with personal bankers mattered—but the experience was far from efficient. People lived around the bank’s operating hours, and for the working class, accessing your own money meant sacrificing precious time. This was an era where banking was rigid, reactive, and dependent on location, yet deeply familiar to everyone who lived through it.`
    },
    {
      id: 2,
      title: "2010s: Mobile banking introduction",
      image: "https://images.unsplash.com/photo-1610737241336-371badac3b66?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: `The 2010s brought a wave of transformation that shifted the foundation of banking into the palms of customers. Mobile banking started as a novelty—something only the tech-savvy explored—but quickly grew into a necessity. With the rise of mobile phones, especially in Africa, banks began introducing USSD services and basic mobile apps. Customers could suddenly perform actions like checking account balances, transferring funds, and purchasing airtime without stepping foot in a banking hall. This dramatically increased banking accessibility for both urban professionals and remote communities. It was the beginning of self-service banking—transactions were now in your control, anytime, anywhere. Mobile banking reduced reliance on human tellers, shortened turnaround times, and expanded financial services to a wider population. However, the digital shift also came with growing pains: concerns about security, low smartphone penetration, and the learning curve for less tech-literate users. Despite this, the decade was pivotal—it broke down walls and opened the gates to what banking could truly become: agile, inclusive, and 24/7.`
    },
    {
      id: 3,
      title: "Now: First Atlantic’s digital banking experience",
      image: "/assets/card.png",
      description: `Today, First Atlantic Bank has reimagined banking to meet the expectations of a hyper-connected, on-the-go generation. The digital experience is no longer just functional—it’s beautifully crafted, intuitive, and secure. Customers enjoy full-spectrum banking through our mobile app and online platforms, allowing them to manage their finances effortlessly with just a few taps. Whether it’s making instant transfers, scheduling payments, opening accounts, or even applying for loans, everything is available in a seamless user experience. Biometric logins, real-time notifications, and encrypted transactions ensure peace of mind. But what truly sets the experience apart is its personalization—users are no longer anonymous account holders, but valued individuals whose financial journeys are supported and enhanced. With smart notifications, budgeting insights, and lifestyle-based tools, our digital banking is not just reactive but proactive. At First Atlantic, banking is no longer confined to buildings—it’s an extension of your life, accessible 24/7, designed to empower and evolve with you.`
    },
    {
      id: 4,
      title: "Future: What our future looks like",
      image: "https://images.unsplash.com/photo-1583154683839-2d49400c3d65?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: `Looking ahead, First Atlantic Bank envisions a future where banking becomes less visible but more powerful—woven into the very fabric of your daily life. Imagine a world where you can initiate transactions by speaking naturally to your device, where AI-powered financial assistants proactively advise you on how to grow your savings or optimize your spending. This is a future where banking doesn’t interrupt your life—it enhances it. We're exploring technologies like voice-activated banking, facial recognition authentication, blockchain-backed smart contracts, and AI-driven customer support that’s instant, intelligent, and emotionally aware. You'll no longer need to remember to save—your bank will do it for you, based on your behavior and goals. Investing, budgeting, borrowing, and transacting will feel as effortless as having a conversation. We’re building a future where financial empowerment is democratized, where banking becomes anticipatory instead of reactive, and where every interaction feels personalized, secure, and deeply human—even when powered by machines.`
    }
]

export   const loanOptions = [
    { 
      id: 'personal', 
      name: 'Personal Loan', 
      icon: '💰', 
      description: 'For personal expenses, debt consolidation, or unexpected costs',
      minAmount: 1000,
      maxAmount: 50000,
      baseRate: 5.9
    },
    { 
      id: 'auto', 
      name: 'Auto Loan', 
      icon: '🚗', 
      description: 'Finance a new or used vehicle with competitive rates',
      minAmount: 5000,
      maxAmount: 100000,
      baseRate: 4.5
    },
    { 
      id: 'home', 
      name: 'Home Loan', 
      icon: '🏠', 
      description: 'Purchase or refinance your home with flexible terms',
      minAmount: 50000,
      maxAmount: 1000000,
      baseRate: 3.8
    },
    { 
      id: 'business', 
      name: 'Business Loan', 
      icon: '💼', 
      description: 'Support your business growth and operations',
      minAmount: 10000,
      maxAmount: 500000,
      baseRate: 6.2
    }
];

export const services = [
    { id: 1, title: 'Account Support', icon: '💳', color: 'bg-purple-700' },
    { id: 2, title: 'Loan Assistance', icon: '💰', color: 'bg-purple-800' },
    { id: 3, title: 'Mobile Banking', icon: '📱', color: 'bg-purple-900' },
    { id: 4, title: 'Card Services', icon: '💳', color: 'bg-purple-700' },
    { id: 5, title: 'Branch Locator', icon: '🏢', color: 'bg-purple-800' },
    { id: 6, title: 'Complaint Filing', icon: '📝', color: 'bg-purple-900' }
  ];

  export const branchLocations = [
    { id: 1, name: 'Accra Main Branch', address: '25 Independence Ave, Accra', phone: '030-277-3365', hours: '8:00 AM - 4:00 PM' },
    { id: 2, name: 'Kumasi City Branch', address: '15 Harper Road, Kumasi', phone: '032-220-1189', hours: '8:30 AM - 3:30 PM' },
    { id: 3, name: 'Takoradi Harbor Branch', address: '7 Harbor Street, Takoradi', phone: '031-204-6652', hours: '8:00 AM - 4:00 PM' },
    { id: 4, name: 'Tamale Central Branch', address: '33 Bolgatanga Rd, Tamale', phone: '037-202-5511', hours: '8:30 AM - 3:30 PM' }
  ];

export const availableDates = [
    { date: '2025-05-10', display: 'Tomorrow, May 10' },
    { date: '2025-05-11', display: 'Sunday, May 11' },
    { date: '2025-05-12', display: 'Monday, May 12' },
    { date: '2025-05-13', display: 'Tuesday, May 13' },
    { date: '2025-05-14', display: 'Wednesday, May 14' }
  ];

export const availableTimes = [
    '9:00 AM', '10:30 AM', '11:15 AM', '1:00 PM', '2:30 PM', '3:45 PM'
  ];

export const tabVariants = {
    inactive: { opacity: 0.6, y: 0 },
    active: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 20 } },
    hover: { opacity: 0.8, scale: 1.03, transition: { duration: 0.2 } }
  };

export const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 20,
        staggerChildren: 0.1,
        delayChildren: 0.2 
      } 
    }
  };

  export const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: 'spring', 
        stiffness: 500, 
        damping: 30 
      } 
    }
  };

  export const chatBubbleVariants = {
    initial: { opacity: 0, y: 20, scale: 0.8 },
    animate: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: 'spring', 
        stiffness: 500, 
        damping: 25 
      } 
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      transition: { duration: 0.2 } 
    }
  };
  