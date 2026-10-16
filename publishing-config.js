'use strict';

// Public configuration only; never add API tokens.
window.portfolioPublishing = Object.freeze({
  "projectId": "",
  "dataset": "production",
  "apiVersion": "2025-02-19",
  "studioUrl": "",
  "posts": [],
  "videos": [
    {
      "id": "mortgage-explainer",
      "title": "Mortgage AI workflow architecture",
      "description": "Mortgage workflows depend on context surviving every handoff.",
      "project": "mortgage",
      "duration": "0:58",
      "url": "https://scrimba.com/explain/guide0pffj980p?fullscreen=1",
      "poster": "assets/video-mortgage.svg",
      "status": "published",
      "publishedAt": "2026-10-16T00:00:00-04:00",
      "summary": "Mortgage workflows depend on context surviving every handoff.\n\nMortgage origination connects conversations, information capture, decisions, and downstream processing. My freelance architecture work explored how an AI platform could connect those activities while carrying useful context forward.\n\nThe architectural overview starts with multi-channel inputs, continues through orchestration and agent runtime, and reaches downstream workflow actions. These are the boundaries I worked across; this is a simplified explanation rather than a recording of a client system.\n\nMy work focused on agent runtime, cognition systems, contextual reasoning, and orchestration. The engineering question connecting them was how to retain the context of an interaction as work moves between components.\n\nThe story of this project is integration: connect an interaction to the workflow it should advance. This architectural overview makes no claims about customer data, production scale, or measured performance."
    },
    {
      "id": "vision-explainer",
      "title": "Low-light vision and pedestrian detection",
      "description": "Clearer images must also help the detector find people.",
      "project": "vision",
      "duration": "0:59",
      "url": "https://scrimba.com/explain/guide0om5hg9fi?fullscreen=1",
      "poster": "assets/video-vision.svg",
      "status": "published",
      "publishedAt": "2026-10-16T00:00:00-04:00",
      "summary": "Clearer images must also help the detector find people.\n\nAt Drexel Vision Lab, I researched low-light enhancement and pedestrian detection. Darkness creates an evaluation problem: an image can look better to a person while still being difficult for a detection model to use.\n\nMy research included preprocessing, augmentation, model development, and end-to-end evaluation. The pipeline connects image enhancement to pedestrian detection, so the final task remains visible throughout the work.\n\nI compared image-quality metrics with detection performance to investigate their tradeoffs. These measurements answer different questions. Keeping both in the evaluation helps distinguish an improvement in appearance from an improvement in downstream usefulness.\n\nThe project reinforced a research principle: evaluate a model against the task it supports. This overview describes the research approach without inventing benchmark scores, confidence values, or deployment outcomes."
    },
    {
      "id": "disaster-explainer",
      "title": "Disaster response intelligence",
      "description": "Disaster observations become useful when they support coordinated decisions.",
      "project": "disaster",
      "duration": "1:00",
      "url": "https://scrimba.com/explain/guide0o6ptf4p1?fullscreen=1",
      "poster": "assets/video-disaster.svg",
      "status": "published",
      "publishedAt": "2026-10-16T00:00:00-04:00",
      "summary": "Disaster observations become useful when they support coordinated decisions.\n\nIn an academic disaster-recovery project, I connected autonomous navigation, field intelligence, and reporting. The aim was to turn observations from a changing environment into information that could support coordination.\n\nThe design linked reinforcement learning-driven navigation with mission and sensor data, then connected those inputs to a reporting engine. Following the information through these stages explains how autonomy and reporting fit into one academic system.\n\nThe connection between perception, reasoning, and reporting was the center of the project. A navigation decision changes what can be observed; the resulting mission information shapes what a report can communicate.\n\nThis was an academic project, and the goal was to connect technical components around a response-team information need. It was not an operational emergency deployment, and this overview does not claim field validation."
    },
    {
      "id": "intelligence-explainer",
      "title": "Cloud data modernization with PySpark",
      "description": "Cloud data engineering connects faster processing with dependable analytics.",
      "project": "intelligence",
      "duration": "1:00",
      "url": "https://scrimba.com/explain/guide08jq1lgl2?fullscreen=1",
      "poster": "assets/video-intelligence.svg",
      "status": "published",
      "publishedAt": "2026-10-16T00:00:00-04:00",
      "summary": "Cloud data engineering connects faster processing with dependable analytics.\n\nAt JPMorgan Chase, my Python and PySpark work brought together AWS data pipelines and production reliability. I worked with cross-functional teams to improve processing, modernize datasets, and catch data problems before downstream consumption.\n\nThe modernization covered twenty-five datasets totaling forty terabytes. Optimized extraction and transformation logic reduced transformation runtime by thirty percent. That migration outcome is distinct from the processing improvements measured across ETL pipelines.\n\nThe ETL pipeline work cut processing time by forty percent and supported six analytics initiatives. Separately, diagnosing recurring failure patterns and automating remediation eliminated thirty-five percent of recurring production incidents across eight applications.\n\nAutomated checks helped maintain 99.5 percent data accuracy and availability. The engineering story combines performance and operational discipline, with each supplied outcome kept tied to the work it measures."
    },
    {
      "id": "fullstack-explainer",
      "title": "Full-stack application project overview",
      "description": "A full-stack application connects user actions to durable system behavior.",
      "project": "fullstack",
      "duration": "1:05",
      "url": "https://scrimba.com/explain/guide02jnoo7dk?fullscreen=1",
      "poster": "assets/video-fullstack.svg",
      "status": "published",
      "publishedAt": "2026-10-16T00:00:00-04:00",
      "summary": "A full-stack application connects user actions to durable system behavior.\n\nMy portfolio includes a personal full-stack application connecting an interface, server-side logic, and a data layer. This overview introduces that scope; the project's repository and implementation details have not yet been documented in the portfolio.\n\nThese three layers describe the general full-stack problem. They are a conceptual overview, not a claim about this personal project's specific framework, database, authentication design, or features.\n\nMy professional experience informs how I approach the project. At Clear One Advantage, I co-defined API contracts and implemented authenticated integrations across fifteen screens. At Walmart, I contributed to features across the technologies listed here. Those are separate professional examples.\n\nThe personal project's deeper walkthrough should demonstrate an actual user flow, the corresponding API, and the data path using its real source. Until then, this video keeps the application overview and confirmed professional experience clearly identified."
    },
    {
      "id": "recsys-explainer",
      "title": "Recommendation system project overview",
      "description": "Recommendation systems help people choose from a large collection.",
      "project": "recsys",
      "duration": "1:02",
      "url": "https://scrimba.com/explain/guide0heip0dp1?fullscreen=1",
      "poster": "assets/video-recsys.svg",
      "status": "published",
      "publishedAt": "2026-10-16T00:00:00-04:00",
      "summary": "Recommendation systems help people choose from a large collection.\n\nMy recommendation-system project connects an interest in machine learning with discovery and user experience. Its central product question is how software can help someone find a relevant next choice.\n\nThis is the conceptual discovery journey behind the project. The portfolio currently introduces the problem at a high level, so this overview does not assign a particular dataset, ranking algorithm, or model architecture to the implementation.\n\nA useful technical story would connect the recommendation behavior to real implementation evidence. For this project, the dataset, algorithm, architecture, and evaluation results still need to be supplied before I can describe them as completed work.\n\nThe confirmed story is the discovery problem and my interest in connecting machine learning with user experience. This video is a project introduction, with no fabricated recommendation scores, accuracy figures, or personalized-data claims."
    }
  ]
});
