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
  title: "Hi all, I'm Kaushal",
  subTitle: emoji(
    "A passionate A creative and driven Frontend Developer 💻✨ with hands-on experience crafting engaging web and mobile apps using JavaScript, React.js, django, and blender — along with a mix of modern tools and libraries to bring ideas to life. Developer 🤩 having an experience of building Web and Mobile applications with JavaScript / Reactjs / Nodejs / React Native and some other cool libraries and frameworks."
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
  subTitle: "Frontend dev with zero chill — on a mission to poke every tech stack that dares to exist",
  skills: [
    emoji(
      "⚡Designing sleek, interactive user interfaces that bring your web and mobile apps to life — pixel by pixel, line by line"
    ),
    emoji("⚡ Crafting PWAs with both classic multi-page setups and modern SPA frameworks — because flexibility matters."),
    emoji(
      "⚡ Whether it’s blender magic, Unity Engine, or Android studio vibes — I connect projects with the cloud like it's second nature"
    )
  ],

  /* Make Sure to include correct Font Awesome Classname to view your icon
https://fontawesome.com/icons?d=gallery */

  softwareSkills: [
  {
    skillName: "HTML5",
    fontAwesomeClassname: "fab fa-html5"
  },
  {
    skillName: "CSS3",
    fontAwesomeClassname: "fab fa-css3-alt"
  },
  {
    skillName: "JavaScript",
    fontAwesomeClassname: "fab fa-js"
  },
  {
    skillName: "SASS",
    fontAwesomeClassname: "fab fa-sass"
  },
  {
    skillName: "ReactJS",
    fontAwesomeClassname: "fab fa-react"
  },
  {
    skillName: "Bootstrap",
    fontAwesomeClassname: "fab fa-bootstrap"
  },
  {
    skillName: "Blender",
    fontAwesomeClassname: "fas fa-cube"
  },
  {
    skillName: "NPM",
    fontAwesomeClassname: "fab fa-npm"
  },
  {
    skillName: "SQL Database",
    fontAwesomeClassname: "fas fa-database"
  },
  {
    skillName: "Unity Engine",
    fontAwesomeClassname: "fas fa-gamepad"
  },
  {
    skillName: "Java",
    fontAwesomeClassname: "fab fa-java"
  },
  {
    skillName: "Python",
    fontAwesomeClassname: "fab fa-python"
  },
  {
    skillName: "C++",
    fontAwesomeClassname: "fas fa-code"
  }
],
  display: true // Set false to hide this section, defaults to true
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
      Stack: "Frontend/Design", //Insert stack or technology you have experience in
      progressPercentage: "90%" //Insert relative proficiency in percentage
    },
    {
      Stack: "Backend",
      progressPercentage: "60%"
    },
    {
      Stack: "Programming",
      progressPercentage: "80%"
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
      image: require("./assets/images/shopnova.png"),
      projectName: "ShopNova (MERN Ecommerce)",
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
  title: emoji("Achievements & Certifications 🏆"),
  subtitle: "Courses and certifications I've completed to grow as a developer.",
  achievementsCards: [
    {
      title: "Machine Learning Basics - College Program",
      subtitle: "College program covering ML fundamentals and algorithms.",
      image: require("./assets/images/machinL.png"),
      imageAlt: "JavaScript Logo",
      footerLink: []

    },
    {
      title: "Meta Certified: Front-End Pro in the Making",
      subtitle: "Completed Meta’s Front-End Developer Certificate — built real-world projects using HTML, CSS, JavaScript & React.",
      image: require("./assets/images/Meta_front.png"),
      imageAlt: "Frontend Logo",
      footerLink: []

    },
    {
      title: "React Crash Course - YouTube",
      subtitle: "Built small projects while learning core React concepts like components, props, and hooks.",
      image: require("./assets/images/react_y.png"),
      imageAlt: "React Logo",
      footerLink: []

    }
  ],
  display: true
};


// Blogs Section

const blogSection = {
  title: "Blogs",
  subtitle:
    "Reading other dev blogs with chill vibes? Yes please — they keep my code sharp and my UIs dangerously good-looking.",
  displayMediumBlogs: false,
  blogs: [
    {
      url: "https://svar.dev/blog/resources-for-learning-react/",
      title: "Getting Started with React",
      description:
        "This guide will help beginners understand the key concepts of React and how to start building projects."
    },
    {
      url: "https://www.lambdatest.com/blog/advanced-css-tricks-and-techniques/://medium.com/",
      title: "5 Must-Know CSS Tricks",
      description:
        "A short post about underrated but useful CSS tips for cleaner layouts and better UI control"
    }
  ],
  display: true
};


// Talks Sections

const talkSection = {
  title: "Talks",
  subtitle: emoji("I love sharing what I learn, even if it's just with peers or in small groups."),
  talks: [
    {
      title: "Intro to Frontend Web Development",
      subtitle: "Unpacked the entire frontend dev journey in a bite-sized seminar with my college friends — from HTML basics to real-world React builds..",
      slides_url: "",
      event_url: ""
    }
  ],
  display: true
};


// Podcast Section

const podcastSection = {
  title: emoji("🎵 My Music Zone"),
  subtitle: "I love listening to music while coding — it keeps my creativity flowing and focus sharp.",
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
