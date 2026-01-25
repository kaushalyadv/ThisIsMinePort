/* Change this file to get your personal Portfolio */

// To change portfolio colors globally go to the  _globalColor.scss file

import emoji from "react-easy-emoji";
import splashAnimation from "./assets/lottie/splashAnimation"; // Rename to your file name for custom animation

// Splash Screen

const splashScreen = {
  enabled: true, // set false to disable splash screen
  animation: splashAnimation,
  duration: 2000 // Set animation duration as per your animation
};

// Summary And Greeting Section

const illustration = {
  animated: true // Set to false to use static SVG
};

const greeting = {
  username: "Kaushal Yadav",
  title: "Hi, I’m Kaushal",
  subTitle: emoji(
    "A creative and detail-oriented Graphic Designer and Digital Marketing Executive with hands-on experience in crafting strong visual identities and executing digital-first marketing creatives. I specialize in branding, social media creatives, marketing visuals, and content-led design that help brands communicate clearly and stand out online. Alongside design and marketing, I have working knowledge of HTML, CSS, and basic web technologies. This helps me design web-ready creatives, collaborate better with developers, and ensure designs translate accurately across digital platforms."
  ),
  resumeLink:
    "https://docs.google.com/presentation/d/14uF7NmhsXxVjML5RhtkP6UHCqZto3VUo/edit?usp=sharing&ouid=115960713439289799000&rtpof=true&sd=true", // Set to empty to hide the button
  displayGreeting: true // Set false to hide this section, defaults to true
};

// Social Media Links

const socialMediaLinks = {
  github: "https://github.com/kaushalyadv",
  linkedin: "https://www.linkedin.com/in/kaushal-yadav-38a167201/",
  gmail: "kausahlyadav.lku@gmail.com",
  buymeacoffee: "https://buymeacoffee.com/kaushal_7017",
  coursera: "https://www.coursera.org/user/0ee25fd7182da89c368d7f3ba1e1ecbf",
  stackoverflow: "https://stackoverflow.com/users/19929751/kaushal-yadav",
  // Instagram, Twitter and Kaggle are also supported in the links!
  // To customize icons and social links, tweak src/components/SocialMedia
  display: true // Set true to display this section, defaults to false
};

// Skills Section

const skillsSection = {
  title: "What I do",
  subTitle: "Graphic Designer and Digital Marketing Executive focused on creating impactful visual and digital experiences",
  skills: [
    emoji(
      "⚡Designing brand identities, social media creatives, and marketing visuals that communicate clearly and leave a lasting impression."
    ),
    emoji(
      "⚡Creating content-driven designs for digital marketing campaigns, including posts, banners, ads, and promotional creatives optimized for engagement."),
    emoji(
      "⚡Using my working knowledge of HTML, CSS, and web fundamentals to ensure designs are web-ready, responsive, and easy to implement across platforms."
    )
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

softwareSkills: [
  // Design Tools (Primary)
  {
    skillName: "Adobe Photoshop",
    fontAwesomeClassname: "fas fa-image"
  },
  {
    skillName: "Adobe Illustrator",
    fontAwesomeClassname: "fas fa-pen-nib"
  },
  {
    skillName: "Canva",
    fontAwesomeClassname: "fas fa-palette"
  },
  {
    skillName: "Figma",
    fontAwesomeClassname: "fab fa-figma"
  },
  {
    skillName: "Typography & Layout",
    fontAwesomeClassname: "fas fa-font"
  },

  // Branding & Marketing Execution
  {
    skillName: "Branding & Visual Identity",
    fontAwesomeClassname: "fas fa-layer-group"
  },
  {
    skillName: "Social Media Creatives",
    fontAwesomeClassname: "fas fa-hashtag"
  },
  {
    skillName: "Digital Marketing Creatives",
    fontAwesomeClassname: "fas fa-bullhorn"
  },
  {
    skillName: "Campaign & Ad Creatives",
    fontAwesomeClassname: "fas fa-ad"
  },
  {
    skillName: "Content Planning",
    fontAwesomeClassname: "fas fa-calendar-alt"
  },

  // Web & Technical Awareness (Support Skills)
  {
    skillName: "HTML5",
    fontAwesomeClassname: "fab fa-html5"
  },
  {
    skillName: "CSS3",
    fontAwesomeClassname: "fab fa-css3-alt"
  },
  {
    skillName: "Basic JavaScript",
    fontAwesomeClassname: "fab fa-js"
  },
  {
    skillName: "Responsive Design",
    fontAwesomeClassname: "fas fa-mobile-alt"
  },
  {
    skillName: "Web-ready Design",
    fontAwesomeClassname: "fas fa-code"
  }
],
display: true
};



// Education Section

const educationInfo = {
  display: true, // Set false to hide this section, defaults to true
  schools: [
  {
    schoolName: "Kumaun University",
    logo: require("./assets/images/Kumaun_University_logo_.png"),
    subHeader: "Bachelor in Computer Application",
    duration: "May 2020 - April 2023",
    desc: "Graduated with first division. Led a final-year project building a full-stack eCommerce website using the MERN stack.",
    descBullets: [
      "Built a secure payment system with backend data handling",
      "Worked in a 3-member team using Git and Agile methods"
    ]
  },
  {
    schoolName: "Uttarakhand Board",
    logo: require("./assets/images/Uttarakhand_Board_of_School_.png"),
    subHeader: "10th Standard",
    duration: "April 2017 - March 2018",
    descBullets: [
      "Secured strong academic results with a focus on Mathematics and Science",
      "Participated in school-level tech exhibitions"
    ]
  },
  {
    schoolName: "Uttarakhand Board",
    logo: require("./assets/images/Uttarakhand_Board_of_School_.png"),
    subHeader: "12th Standard",
    duration: "April 2019 - March 2020",
    descBullets: [
      "Completed PCM (Physics, Chemistry, Math) stream with distinction",
      "Began early self-study in web development alongside academics"
    ]
  }
]

};

// Your top 3 proficient stacks/tech experience

const techStack = {
  viewSkillBars: true, //Set it to true to show Proficiency Section
  experience: [
    {
      Stack: "Graphic Design & Visual Communication", //Insert stack or technology you have experience in
      progressPercentage: "85%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Digital Marketing & Content Design",
      progressPercentage: "80%"
    },
    {
      Stack: "UI Design & Web Design Fundamentals",
      progressPercentage: "75%"
    },
    {
      Stack: "Technical & Programming Awareness",
      progressPercentage: "60%"
    }
  ],
  displayCodersrank: false // Set true to display codersrank badges section need to changes your username in src/containers/skillProgress/skillProgress.js:17:62, defaults to false
};

// Work experience section



/* Your Open Source Section to View Your Github Pinned Projects
To know how to get github key look at readme.md */

const openSource = {
  showGithubProfile: "true", // Set true or false to show Contact profile using Github, defaults to true
  display: true // Set false to hide this section, defaults to true
};

// Some big projects you have worked on

const bigProjects = {
  title: "My Projects",
  subtitle:
    "A showcase of practical projects I've worked on, including a full-featured eCommerce site built as a college group leader with secure payment integration and backend control.",
  projects: [
    {
      image: require("../src/assets/images/Techsphere.png"),
      projectName: "TechSphere (MERN Ecommerce)",
      projectDesc:
        "A full-stack MERN eCommerce platform with Stripe payment integration. Includes dynamic product management, secure checkout, and admin dashboard for backend operations.",
      footerLink: [
        {
          name: "GitHub (Placeholder)",
          url: "https://github.com/kaushalyadv/MERN_ECCO_"
        }
      ]
    },
    {
      image: require("./assets/images/nextuLogo.webp"),
      projectName: "Nextu (In Progress)",
      projectDesc:
        "An ongoing React-based platform exploring user interaction design and API-driven content. Aiming to experiment with animations and real-time features.",
      footerLink: [
        {
          name: "GitHub (Placeholder)",
          url: "https://github.com/your-link"
        }
      ]
    }
  ],
  display: true
};


// Achievement Section
// Include certificates, talks etc

const achievementSection = {
  title: emoji("Achievements & Certifications"),
  subtitle: "Courses and certifications that strengthen my design, digital, and technical foundation",
  achievementsCards: [
    {
      title: "Analytical & Data Foundations",
      subtitle: "College-level program focused on analytical thinking and structured problem-solving",
      image: require("../src/assets/images/machinL.png"),
      imageAlt: "JavaScript Logo",
      footerLink: []

    },
    {
      title: "Meta Professional Certificate (Web & UI Foundations)",
      subtitle: "Training in web structure, responsive design, and UI fundamentals for digital platforms",
      image: require("./assets/images/Meta_front.png"),
      imageAlt: "Frontend Logo",
      footerLink: []

    },
    {
      title: "Visual Design for Digital Platforms",
      subtitle: "Focused on applying design principles to modern digital interfaces and content layouts.",
      image: require("./assets/images/react_y.png"),
      imageAlt: "React Logo",
      footerLink: []

    }
  ],
  display: true
};


// Blogs Section

const blogSection = {
  title: "INSIGHTS",
  subtitle:
    "Notes, breakdowns, and insights from my learning in design, digital creativity, and visual communication",
  displayMediumBlogs: false,
  blogs: [
    {
      url: "https://webandcrafts.com/blog/visual-design",
      title: "What Makes a Digital Design Visually Effective",
      description:
        "A concise look at how layout, spacing, color, and visual hierarchy shape clarity and user attention in digital designs, and why certain visuals feel more intuitive than others."
    },
    {
      url: "https://jennpereira.medium.com/7-principles-of-design-to-increase-engagement-and-boost-social-media-posts-813d92ca5b1c",
      title: "Design Principles That Improve Online Engagement",
      description:
        "An overview of how typography, contrast, and consistency influence engagement in digital content, with common design mistakes and practical takeaways"
    }
  ],
  display: true
};


// Talks Sections

const talkSection = {
  title: "Talks",
  subtitle: emoji("I enjoy sharing design insights, creative thinking, and digital learnings through discussions and small group sessions"),
  talks: [
    {
      title: "Introduction to Digital Design & Visual Thinking",
      subtitle: "A beginner-friendly session focused on visual design fundamentals, layout, and how design choices impact digital experiences across platforms",
      slides_url: "",
      event_url: ""
    }
  ],
  display: true
};


// Podcast Section

const podcastSection = {
  title: emoji("🎵 Creative Soundtrack"),
  subtitle: "usic that supports my creative focus and design workflow",
  podcast: [
    "https://open.spotify.com/playlist/1huDykElkdN8krkwTATpRJ?si=CstZrypgR2CTavgpv7LZBg&pi=DNSoJNM-TQOtl&nd=1&dlsi=8bc5de3365214ecc"
  ],
  display: true
};


// Resume Section
const resumeSection = {
  title: "Resume",
  subtitle: "Feel free to download my resume",

  // Please Provide with Your Podcast embeded Link
  display: true // Set false to hide this section, defaults to true
};

const contactInfo = {
  title: emoji("Contact Me ☎️"),
  subtitle:
    "Discuss a project or just want to say hi? My Inbox is open for y'all.",
  number: "+91-7017035836",
  email_address: "kaushalyadav.lku@gmail.com"
};

// Twitter Section

const twitterDetails = {
  userName: "Kaushal_Username", //Replace "twitter" with your twitter username without @
  display: true // Set true to display this section, defaults to false
};

const isHireable = false; // Set false if you are not looking for a job. Also isHireable will be display as Open for opportunities: Yes/No in the GitHub footer

export {
  illustration,
  greeting,
  socialMediaLinks,
  splashScreen,
  skillsSection,
  educationInfo,
  techStack,
  openSource,
  bigProjects,
  achievementSection,
  blogSection,
  talkSection,
  podcastSection,
  contactInfo,
  twitterDetails,
  isHireable,
  resumeSection
};
