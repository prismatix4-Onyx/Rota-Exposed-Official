/**
 * ROTA-SCAN Data Store & Editorial Content Architecture
 */

window.rotaScanData = {
  // 6 Core Stories & Projects (Unlockable Cards)
  projects: [
    {
      id: 'proj-01',
      number: 'FIG. 01',
      name: 'DAWN',
      tag: 'Community Service',
      description: 'With every broom we lifted and every piece of litter we cleared, we restored more than 15+ bus stops. We restored respect for the spaces we all share. ',
      impact: '15+ bus stops cleaned ',
      image: 'images/project_green.png',
    },
    {
      id: 'proj-02',
      number: 'FIG. 02',
      name: 'RESUMATE',
      tag: 'Education',
      description: 'Learning the right skills will all be in vain If you can\'t showcase them effectively. Your resume is your first impression, so make it count.',
      impact: '300+ STUDENTS • 50+ RESUMES',
      image: 'images/project_teach.png',
      detail: 'The Rotaract Club of SIET proudly presents RESUMATE a career-focused initiative designed to help you transform your skills into opportunities.'
    },
    {
      id: 'proj-03',
      number: 'FIG. 03',
      name: 'ROTA-HOUSE OF WISDOM',
      tag: 'Open library & reading space for the visually impaired',
      description: 'We believe that learning should know no barriers.',
      impact: 'A open space created for readers',
      image: 'images/project_teach.png',
      detail: 'Every book has a heartbeat. Every page has the power to change a life. '
    },
    {
      id: 'proj-04',
      number: 'FIG. 04',
      name: 'ETHAL | A Newspaper. A Nation. A Moment.',
      tag: 'Community Service',
      description: 'ETHAL – Newspaper of August 15th, 1947 is a journey back to the day India woke up free. 🇮🇳',
      impact: '100+ NEWSPAPERS Distributed',
      image: 'images/project_fellowship.png',
      detail: 'We don’t just remember history. We relive it. This Independence Day, the Rotaract Club of SIET transported our campus back to 1947 with ETHAL.'
    },
    {
      id: 'proj-05',
      number: 'FIG. 05',
      name: 'PROJECT_PREM-A Path of Smile',
      tag: 'Community Service',
      description: 'Some hearts don\'t always speak through words, yet they express themselves beautifully through smiles, laughter, and genuine connection.',
      impact: 'One smile at a time',
      image: 'images/project_green.png',
      detail: 'A morning filled with warmth, joy, and unforgettable moments! As part of Project Prem – A Path of Smile, we\'re visiting Namma Special Park to spend meaningful time with the incredible children there.'
    },
    {
      id: 'proj-06',
      number: 'FIG. 06',
      name: 'MAHATMA | Footsteps of Gandhi',
      tag: 'Awareness',
      description: "MAHATMA – Footsteps of Gandhi brings together two powerful moments this Independence Day: remembering Gandhi's legacy and raising the Tricolour with pride.",
      impact: 'A moment where history meets the present, and the Tricolour rises with us.',
      image: 'images/project_fellowship.png',
      detail: 'Let the Tricolour rise high. Let the legacy live on. Let the spirit of freedom never fade. '
    }
  ],

  // Interactive Scenario Options (Side 1)
  scenarios: [
    {
      id: 'help',
      title: 'YOU WANT TO HELP.',
      subtitle: 'Make something better right where you stand.',
      responseTitle: 'THEN YOU ALREADY GET ROTARACT.',
      responseBody: 'Service isn’t a corporate duty—it’s young people seeing a need and taking immediate action together.'
    },
    {
      id: 'grow',
      title: 'YOU WANT TO GROW.',
      subtitle: 'Learn leadership, design, and execution by doing.',
      responseTitle: 'LEARNING BY DOING IS OUR MOTTO.',
      responseBody: 'Lead projects, pitch ideas, manage real budgets, and build skills that textbooks will never teach you.'
    },
    {
      id: 'connect',
      title: 'YOU WANT TO CONNECT.',
      subtitle: 'Find ambitious friends and global perspectives.',
      responseTitle: 'COMMUNITY IS EVERYTHING.',
      responseBody: 'Rotaract connects you to a global network of over 250,000 passionate young changemakers.'
    },
    {
      id: 'idea',
      title: 'YOU HAVE AN IDEA.',
      subtitle: 'Start with a question and build a movement.',
      responseTitle: 'EVERY GREAT PROJECT STARTED AS A QUESTION.',
      responseBody: 'Bring your wildest ideas. We provide the team, the platform, and the momentum to turn ideas into reality.'
    }
  ],

  // Rotaractor Style Quiz Questions (Side 3)
  quizQuestions: [
    {
      text: 'Your campus team encounters an unexpected challenge. What’s your instant move?',
      answers: [
        ['Rally everyone together and outline a strategy.', 'leader'],
        ['Brainstorm a fresh creative workaround.', 'maker'],
        ['Talk to people and assemble key resources.', 'connector'],
        ['Roll up your sleeves and build the prototype.', 'builder']
      ]
    },
    {
      text: 'Which project sounds most exciting to you?',
      answers: [
        ['Organizing a regional youth leadership summit.', 'leader'],
        ['Creating a viral social media campaign.', 'maker'],
        ['Hosting an open-mic community networking night.', 'connector'],
        ['Building a solar-powered garden irrigation system.', 'builder']
      ]
    },
    {
      text: 'What is your secret superpower?',
      answers: [
        ['Vision & decisive decision-making.', 'leader'],
        ['Creative problem solving & design.', 'maker'],
        ['Empathy & bringing people together.', 'connector'],
        ['Relentless execution & craftsmanship.', 'builder']
      ]
    },
    {
      text: 'You have a completely free weekend. How do you spend it?',
      answers: [
        ['Planning your next big project or goal.', 'leader'],
        ['Designing, writing, or tinkering on an idea.', 'maker'],
        ['Hanging out with friends and meeting new people.', 'connector'],
        ['Learning a new tool or hands-on skill.', 'builder']
      ]
    }
  ],

  // Quiz Outcome Personas
  quizResults: {
    maker: {
      title: 'THE CREATIVE MAKER',
      message: 'You see possibility where others see routine. You craft solutions that surprise, delight, and move people.',
      strengths: ['CREATIVITY', 'DESIGN THINKING', 'ORIGINALITY', 'ACTION']
    },
    leader: {
      title: 'THE STRATEGIC LEADER',
      message: 'You provide direction, inspire confidence, and turn separate efforts into unified momentum.',
      strengths: ['VISION', 'COURAGE', 'STRATEGY', 'MOMENTUM']
    },
    connector: {
      title: 'THE COMMUNITY CONNECTOR',
      message: 'You create the trust and relationships that turn individual sparks into a collective fire.',
      strengths: ['EMPATHY', 'RELATIONSHIPS', 'COMMUNICATION', 'NETWORKING']
    },
    builder: {
      title: 'THE HANDS-ON BUILDER',
      message: 'You love solving hard problems, refining details, and turning raw ideas into working reality.',
      strengths: ['PROBLEM SOLVING', 'EXECUTION', 'SKILL', 'PERSEVERANCE']
    }
  },

  // Rotaract Action Wheel Outcomes (Side 4)
  wheelOutcomes: [
    { title: 'ACTION: SERVE', message: 'Identify one small problem on campus or in your neighborhood and spend 1 hour fixing it.' },
    { title: 'ACTION: LEARN', message: 'Find a peer with a skill you don’t have and ask them to teach you the basics today.' },
    { title: 'ACTION: CONNECT', message: 'Reach out to someone new in your batch or department and pitch a collaborative idea.' },
    { title: 'ACTION: CREATE', message: 'Write down one bold idea for your community on paper right now.' }
  ]
};
