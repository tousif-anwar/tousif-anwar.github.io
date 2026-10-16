'use strict';

// Career facts and outcomes supplied by Tousif. Undated project outlines stay unquantified.
const portfolioContent = {
  careers: [
    {
      id: 'jpmorgan', company: 'JPMorgan Chase', mark: 'J.P. Morgan', markClass: 'jpm-mark',
      title: 'Software Engineer III', specialty: 'Backend · Python & PySpark', dates: 'Dec 2025 — Oct 2026', location: 'Wilmington, DE',
      chapter: 'SYSTEMS AT SCALE', summary: 'Made production systems more resilient and moved data engineering forward—across eight applications, six analytics initiatives, and a 40 TB AWS migration.',
      tags: ['Python', 'PySpark', 'AWS', 'Apache Iceberg'],
      metrics: [['35%', 'fewer recurring incidents'], ['40%', 'faster pipeline processing'], ['40 TB', 'migrated across 25 datasets']],
      groups: [
        ['Reliability that holds up in production', [
          'Eliminated 35% of recurring production incidents by identifying failure patterns and automating remediation across eight applications.',
          'Implemented automated data-quality checks that flagged anomalies before downstream consumption, maintaining 99.5% data accuracy and availability.'
        ]],
        ['Data infrastructure with room to grow', [
          'Engineered Python and PySpark ETL pipelines on AWS with cross-functional teams, cutting processing time by 40% and supporting six analytics initiatives.',
          'Modernized 25 datasets totaling 40 TB onto AWS and Apache Iceberg. Optimized extraction and transformation logic to reduce transformation runtime by 30%.'
        ]],
        ['Faster delivery, with engineering discipline', [
          'Accelerated delivery by 20% using enterprise-approved AI coding tools for code generation, refactoring, unit tests, and documentation.',
          'Validated AI-assisted work through peer review, automated testing, and secure coding standards.'
        ]]
      ], takeaway: 'Reliability, data quality, and performance are parts of the same problem: build systems that other people can depend on.'
    },
    {
      id: 'clearone', company: 'Clear One Advantage', mark: 'clear one', markClass: 'clearone-mark',
      title: 'Software Engineer', specialty: 'Full stack · Cross-platform mobile', dates: 'Jan 2023 — Nov 2025', location: 'Remote',
      chapter: 'ONE CODEBASE. TWO PLATFORMS.', summary: 'Delivered a shared React Native app for iOS and Android, then improved the whole delivery loop—from API contracts and crash diagnosis to store releases.',
      tags: ['React Native', 'REST APIs', 'Sentry', 'Crashlytics'],
      metrics: [['5,000', 'mobile app users'], ['0.5%', 'crash rate, down from 2.5%'], ['7 days', 'release cycle, down from 14']],
      groups: [
        ['A mobile experience built together', [
          'Launched an iOS and Android app from a shared React Native codebase with push notifications, reducing duplicate mobile effort by 40% and serving 5,000 users.',
          'Partnered with product, design, and engineering to support customer-service and client-negotiation workflows, including embedded web views and third-party integrations.'
        ]],
        ['Reliable connections, clearer diagnostics', [
          'Co-defined REST API contracts with backend teams and implemented authentication, error handling, and serialization across 15 screens.',
          'Instrumented Sentry and Crashlytics, reduced the crash rate from 2.5% to 0.5%, and resolved production issues within two days of detection.'
        ]],
        ['From sprint to store', [
          'Shortened release cycles from 14 to seven days by owning build validation, versioning, App Store and Google Play submissions, and post-release monitoring.',
          'Contributed to architectural decisions and mobile engineering standards, working through sprint planning, standups, and retrospectives.'
        ]]
      ], takeaway: 'Shipping the app is the beginning. Observability, stable integrations, and repeatable releases keep the experience working for users.'
    },
    {
      id: 'walmart', company: 'Walmart', mark: 'Walmart', markClass: 'walmart-mark',
      title: 'Full Stack Software Engineer Intern', specialty: 'Retail platforms · Observability', dates: 'Aug 2023 — Dec 2023', location: 'Bentonville, AR',
      chapter: 'ENGINEERING FOR EVERYDAY SCALE', summary: 'Contributed to retail software used by millions, combining full-stack feature delivery with monitoring that helped teams find production problems sooner.',
      tags: ['Java', 'Spring Boot', 'React', 'Node.js', 'Cosmos DB', 'Docker'],
      metrics: [['30%', 'faster incident detection'], ['3', 'features shipped'], ['Millions', 'of customers reached']],
      groups: [
        ['See the problem sooner', [
          'Built smart-alert monitoring tools in Java, Spring Boot, and React, reducing time to detect production incidents by 30%.',
          'Expanded system instrumentation around points of failure and collaborated with engineers to troubleshoot and resolve issues.'
        ]],
        ['Build across the stack', [
          'Shipped three features reaching millions of customers across React, Node.js, Spring Boot, Cosmos DB, and Docker.',
          'Designed, wrote, and reviewed code with application teams, architects, and product managers in a cross-functional Agile environment.'
        ]],
        ['Follow the work through', [
          'Participated in the full software development lifecycle, from discovery and design through implementation and release.',
          'Helped deliver long-term solutions that improved reliability for end users while adopting team engineering practices.'
        ]]
      ], takeaway: 'At retail scale, a small improvement in visibility or reliability can change the experience for a very large number of people.'
    },
    {
      id: 'tripoint', company: 'TriPoint Lending', mark: 'TRIPOINT', markClass: 'tripoint-mark',
      title: 'Business Intelligence Analyst', specialty: 'Requirements · Delivery · Documentation', dates: 'Jan 2021 — Aug 2023', location: 'Remote',
      chapter: 'START WITH THE RIGHT QUESTION', summary: 'Connected stakeholder needs with implementable software requirements, making scope clearer and keeping developers, testers, and business teams aligned.',
      tags: ['Business analysis', 'Tableau', 'Jira', 'SharePoint'],
      metrics: [['25%', 'less requirement-related rework'], ['15 hrs', 'saved per release'], ['10', 'projects accelerated']],
      groups: [
        ['Turn conversations into clear requirements', [
          'Translated needs from 20 stakeholder working sessions into user stories, use cases, process diagrams, wireframes, and test documentation, reducing requirement-related rework by 25%.',
          'Gathered and documented business and functional requirements, built business cases, and defined solution scope for developers and testers.'
        ]],
        ['Make delivery easier to repeat', [
          'Saved 15 hours per release by creating and maintaining user guides, design documents, release notes, and standard operating procedures.',
          'Reviewed technical and business documentation and supported SharePoint, Tableau, and Jira across six concurrent projects.'
        ]],
        ['Keep people and implementation connected', [
          'Accelerated delivery of 10 projects by scoping customer requests and coordinating developers and testers through validation and implementation.',
          'Facilitated working sessions and communicated with internal and external stakeholders while supporting development, testing, and rollout.'
        ]]
      ], takeaway: 'My business-analysis foundation still shapes how I engineer: understand the workflow, clarify the problem, and make the solution useful.'
    }
  ],
  skillGroups: [
    { id: 'languages', label: 'Languages', description: 'The languages I use to express systems, queries, and interfaces.', skills: [
      ['python','Python','python','Backend systems, ETL pipelines, automation, and applied machine learning.',['jpmorgan']],
      ['java','Java','java','Backend services and smart-alert tooling in the Java ecosystem.',['walmart']],
      ['javascript','JavaScript','javascript','Interactive web applications and client–server development.',['walmart','clearone']],
      ['typescript','TypeScript','typescript','Typed application development across modern JavaScript tooling.',[]],
      ['sql','SQL','database','Querying, transforming, and validating structured data.',[]],
      ['bash','Bash / Shell','bash','Command-line workflows, scripting, and development automation.',[]],
      ['c','C','c','Systems programming and computer science foundations.',[]],
      ['cpp','C++','cplusplus','Compiled software development and code evaluation.',[]],
      ['csharp','C#','csharp','Application development in the .NET ecosystem.',[]],
      ['rust','Rust','rust','Systems programming with a focus on memory safety.',[]],
      ['go','Go','go','Service-oriented programming and code evaluation.',[]],
      ['latex','LaTeX','latex','Technical writing, structured documents, and research communication.',[]]
    ]},
    { id: 'cloud', label: 'Cloud & data', description: 'Cloud platforms, storage systems, and the data foundations beneath an application.', skills: [
      ['aws','AWS','amazonwebservices','Cloud infrastructure supporting Python and PySpark data engineering.',['jpmorgan']],
      ['glue','AWS Glue','amazonwebservices','Managed data integration and ETL in the AWS ecosystem.',[]],
      ['ec2','Amazon EC2','amazonwebservices','Compute infrastructure in the AWS ecosystem.',[]],
      ['cassandra','Cassandra','cassandra','Distributed NoSQL storage and wide-column data modeling.',[]],
      ['gcp','Google Cloud','googlecloud','Cloud tooling for machine learning and application development.',[]],
      ['gcpml','GCP Machine Learning','googlecloud','Machine learning workflows in the Google Cloud ecosystem.',[]],
      ['firebase','Firebase','firebase','Application services in the Google and Firebase ecosystem.',[]],
      ['azure','Azure','azure','Microsoft cloud services and application infrastructure.',[]],
      ['iceberg','Apache Iceberg','apache','Table-format foundations for the 25-dataset, 40 TB cloud modernization.',['jpmorgan']],
      ['postgres','PostgreSQL','postgresql','Relational data modeling and querying.',[]],
      ['mysql','MySQL','mysql','Relational storage and SQL application development.',[]],
      ['mongodb','MongoDB','mongodb','Document-oriented application storage.',[]],
      ['cosmos','Cosmos DB','cosmosdb','Cloud database technology used in the retail application stack.',['walmart']]
    ]},
    { id: 'ai', label: 'AI & ML', description: 'From large-scale data processing to model experimentation and intelligent applications.', skills: [
      ['pytorch','PyTorch','pytorch','Deep learning, low-light image enhancement, and pedestrian-detection research.',[]],
      ['finetuning','LLM fine-tuning','model','Adapting language models through task-focused training.',[]],
      ['rag','RAG','retrieval','Retrieval-augmented generation: grounding model responses in retrieved context.',[]],
      ['spark','Apache Spark','apachespark','Distributed processing for data engineering and analytics.',[]],
      ['pyspark','PySpark','apachespark','Python-based distributed ETL and pipeline performance optimization.',['jpmorgan']],
      ['llms','LLM applications','model','Language-model application design and agent-driven workflows.',[]],
      ['cv','Computer vision','vision','Low-light enhancement, pedestrian detection, and downstream evaluation.',[]],
      ['rl','Reinforcement learning','model','Adaptive navigation in the disaster-response academic project.',[]]
    ]},
    { id: 'frameworks', label: 'Frameworks & mobile', description: 'Application technologies that connect an interface to the systems behind it.', skills: [
      ['reactnative','React Native','react','One shared iOS and Android codebase, push notifications, and mobile workflows.',['clearone']],
      ['react','React','react','Full-stack product features and monitoring interfaces.',['walmart']],
      ['node','Node.js','nodejs','Server-side JavaScript in the full-stack retail application ecosystem.',['walmart']],
      ['spring','Spring','spring','Java application frameworks and backend development.',['walmart']],
      ['springboot','Spring Boot','spring','Backend services and smart-alert monitoring tools.',['walmart']],
      ['rest','REST APIs','api','Client–server contracts, authentication, error handling, and serialization across 15 screens.',['clearone']],
      ['dotnet','.NET','dotnetcore','Application development in the Microsoft framework ecosystem.',[]],
      ['vue','Vue.js','vuejs','Component-based web application development.',[]],
      ['ios','iOS','apple','Cross-platform application delivery and App Store releases.',['clearone']],
      ['android','Android','android','Cross-platform application delivery and Google Play releases.',['clearone']]
    ]},
    { id: 'delivery', label: 'Tools & delivery', description: 'The tools for shipping, observing, documenting, and improving software.', skills: [
      ['git','Git','git','Version control, review, and collaborative development.',[]],
      ['docker','Docker','docker','Containerized application development and delivery.',['walmart']],
      ['kubernetes','Kubernetes','kubernetes','Container orchestration and deployment tooling.',[]],
      ['linux','Linux','linux','Development environments, operating-system tooling, and shell workflows.',[]],
      ['windows','Windows','windows11','Cross-platform development environments.',[]],
      ['macos','macOS','apple','Cross-platform development environments.',[]],
      ['sentry','Sentry','sentry','Crash diagnosis and production observability for the mobile app.',['clearone']],
      ['crashlytics','Crashlytics','firebase','Crash instrumentation that supported a reduction from 2.5% to 0.5%.',['clearone']],
      ['powerbi','Power BI','analytics','Business reporting and visual analytics.',[]],
      ['tableau','Tableau','analytics','Business intelligence and reporting support.',['tripoint']],
      ['jira','Jira','jira','Project coordination and delivery tracking across concurrent initiatives.',['tripoint']],
      ['sharepoint','SharePoint','documents','Business documentation and COTS application support.',['tripoint']],
      ['agile','Agile / Scrum','workflow','Cross-functional delivery, sprint planning, standups, and retrospectives.',['clearone','walmart']],
      ['etl','ETL pipelines','workflow','Extraction, transformation, quality checks, and analytics-ready data.',['jpmorgan']],
      ['testing','Automated testing','check','Validation, unit tests, peer review, and secure coding standards.',['jpmorgan']],
      ['releases','Mobile releases','workflow','Build validation, versioning, store submission, and post-release monitoring.',['clearone']]
    ]}
  ]
};
if (typeof module !== 'undefined' && module.exports) module.exports = portfolioContent;
