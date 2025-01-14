// eslint-disable-next-line import/no-anonymous-default-export
export default{
    firstName:'Prajwal',
    lastName:'Nimbalkar',
    jobTitle:'full stack developer',
    address:'Pune,Maharashtra',
    phone:'(+91)-9699xxxxxx',
    email:'prajwal@gmail.com',
    portfolio:'',
    github:'',
    linkedin:'',
    themeColor:"#ff6666",
    summery:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    experience:[
        {
            id:1,
            title:'Full Stack Developer',
            companyName:'Amazon',
            city:'New York',
            state:'NY',
            startDate:'01-01-2021',
            endDate:  '01-01-2022',
            currentlyWorking:true,
            workSummery:'<ul> <li>Designed, developed, and maintained full-stack applications using <strong>React</strong> and <strong> Node.js</strong> .</li>'+
            '<li> <strong>Implemented responsive  </strong> user interfaces with React, ensuring seamless user experiences. </li>'+
            '<li>Maintaining the <strong>React Native</strong> in-house organization application.</li>'+
            '<li> <strong>Created RESTful APIs</strong> with <strong> Node.js</strong> and <strong>Express </strong> and improved backend speed.</li>  </ul>'
        },
    ],
    education: [
        {
          id: 1,
          universityName: 'Western Illinois University',
          startDate: '01-02-2023',
          endDate: '01-02-2024',
          degree: 'Master',
          major: 'Computer Science',
          description: ''
        },
        {
          id: 2,
          universityName: 'Western Illinois University',
          startDate: '01-03-2023',
          endDate: '01-01-2025',
          degree: 'Bachelor',
          major: 'Information Technology',
          description: ''
        }
      ],
      
    skills:[
        {
            id:1,
            name:'Angular',
            rating:0,
        },
        {
            id:1,
            name:'React',
            rating:0,
        },
        {
            id:1,
            name:'MySql',
            rating:0,
        },
        {
            id:1,
            name:'React Native',
            rating:0,
        }
    ],

    projects: [
        {
            id: 1,
            name: 'Portfolio Website',
            description: '<ul> <li> <strong>Developed</strong> a personal portfolio website.</li><li>Showcasing <strong>projects</strong> , skills, and contact information.</li> </ul> ',
            technologies: ['React', 'CSS', 'Netlify'],
            link: 'https://leetcode.com/u/prajwal_nimbalkar/',
            github: 'https://leetcode.com/u/prajwal_nimbalkar/'
        },
        {
            id: 2,
            name: 'E-Commerce Platform',
            description: '<ul> <li> <strong>Built </strong>a <strong>full-stack </strong>e-commerce platform.</li><li>Features product search, cart, and  <strong>payment integration </strong> .</li> </ul>',
            technologies: ['React', 'Node.js', 'MongoDB'],
            link: 'https://leetcode.com/u/prajwal_nimbalkar/',
            github: 'https://leetcode.com/u/prajwal_nimbalkar/'
        }
    ]
    
    
}