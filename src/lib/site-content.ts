export type Service = { number: string; title: string; copy: string; tags: string };
export type Certification = { title: string; vendor: string; icon: string };
export type Experience = {
  date: string;
  role: string;
  company: string;
  place: string;
  summary: string;
  details: string[];
};

export type SiteContent = {
  hero: {
    location: string;
    eyebrow: string;
    title: string;
    accentTitle: string;
    description: string;
    signalLeft: string;
    signalRight: string;
  };
  about: { title: string; accent: string; paragraphOne: string; paragraphTwo: string };
  services: Service[];
  approach: { title: string; accentTitle: string; description: string; principles: string[] };
  skills: string[];
  certifications: Certification[];
  experience: Experience[];
  education: { level: string; title: string; shortTitle: string; subject: string };
  contact: { prompt: string; title: string; accentTitle: string; email: string };
  links: {
    github: string;
    linkedin: string;
    youtube: string;
    kubernetesCredential: string;
    vmwareCredential: string;
  };
};

export const defaultSiteContent: SiteContent = {
  hero: {
    location: 'Dhaka, Bangladesh',
    eyebrow: 'System administrator / Cloud / DevOps / Security',
    title: 'Modern infrastructure.',
    accentTitle: 'Built to perform.',
    description: 'Reliable infrastructure, cloud and operations for ambitious teams that cannot afford guesswork.',
    signalLeft: 'SYSTEMS ONLINE',
    signalRight: 'CLOUD / NETWORK / SECURITY',
  },
  about: {
    title: 'I build the invisible layer that keeps modern businesses',
    accent: 'moving.',
    paragraphOne: 'Lead System Engineer with 12+ years of experience leading cross-functional teams to modernize core infrastructure across hybrid cloud, VMware virtualization supporting 500+ VMs, and Kubernetes.',
    paragraphTwo: 'Proven track record in achieving ISO 27001 and CMMI Level 3 certifications while ensuring 99.9% uptime. A strategic problem-solver specialized in bridging the gap between legacy hardware and modern DevOps automation.',
  },
  services: [
    { number: '01', title: 'Infrastructure & cloud', copy: 'Resilient foundations for teams that need technology to simply work.', tags: 'Hybrid cloud · VMware · Azure · AWS' },
    { number: '02', title: 'DevOps & platforms', copy: 'Delivery systems that turn releases from stressful events into routine work.', tags: 'Kubernetes · Docker · CI/CD' },
    { number: '03', title: 'Security & operations', copy: 'Practical safeguards, observability and response built into daily operations.', tags: 'Monitoring · Firewalls · Compliance' },
    { number: '04', title: 'Technical advisory', copy: 'Clear direction through migrations, modernisation and complex systems decisions.', tags: 'Architecture · Roadmaps · Delivery' },
  ],
  approach: {
    title: 'Calm systems.',
    accentTitle: 'Clear decisions.',
    description: 'Good infrastructure should fade into the background. My work is deliberate, documented and built to give teams confidence long after handover.',
    principles: ['Design for failure', 'Automate the repeatable', 'Document the important', 'Keep people in the loop'],
  },
  skills: ['Hybrid cloud architecture', 'VMware vSphere & vSAN', 'Kubernetes & Tanzu', 'Network & endpoint security', 'CI/CD & DevOps automation', 'Linux & Windows systems', 'Data centre operations', 'Audit & compliance'],
  certifications: [
    { title: 'VMware Certified Professional — Data Center Virtualization (2024)', vendor: 'VMware', icon: 'vmware' },
    { title: 'Certified Kubernetes Administrator (CKA)', vendor: 'Cloud Native Computing Foundation', icon: 'kubernetes' },
    { title: 'AWS Cloud Fundamentals', vendor: 'Amazon Web Services', icon: 'aws' },
    { title: 'CompTIA Server+', vendor: 'CompTIA', icon: 'comptia' },
    { title: 'Red Hat Certified System Administrator', vendor: 'Red Hat', icon: 'redhat' },
    { title: 'Red Hat Certified Engineer', vendor: 'Red Hat', icon: 'linux' },
    { title: 'Red Hat Fundamentals of Ansible', vendor: 'Red Hat', icon: 'redhat' },
    { title: 'Microsoft Certified: Azure Administrator Associate', vendor: 'Microsoft', icon: 'microsoft' },
    { title: 'Microsoft Certified: Azure Security Engineer Associate', vendor: 'Microsoft', icon: 'microsoft' },
    { title: 'Microsoft Certified: Windows Server Hybrid Administrator Associate', vendor: 'Microsoft', icon: 'microsoft' },
    { title: 'Microsoft 365 Certified: Administrator Expert', vendor: 'Microsoft', icon: 'microsoft' },
    { title: 'Microsoft Certified: Information Protection and Compliance Administrator Associate', vendor: 'Microsoft', icon: 'microsoft' },
    { title: 'Google System Administration and IT Infrastructure Services', vendor: 'Google', icon: 'google' },
  ],
  experience: [
    {
      date: 'AUG 2026—PRESENT', role: 'DC-AS System Manager', company: 'East West University · Full-time', place: 'Dhaka, Bangladesh · On-site',
      summary: 'Leading core infrastructure, network security and DevOps operations for a Tier II-equivalent on-premises data centre supporting 20,000+ students and staff — from the data centre floor to the edge of the network.',
      details: [
        'Administer and modernize Tier II-equivalent data centre infrastructure, including an 8-node VMware 9 vSphere/vSAN cluster and a growing VMware Tanzu / Kubernetes platform.',
        'Secure 1,000+ endpoints with CrowdStrike Falcon EDR and manage 2,000+ devices through Kaspersky Security Center.',
        'Administer F5 BIG-IP WAF/ADC protecting 30+ public-facing applications.',
        'Manage Palo Alto Networks and Fortinet firewalls in active-passive high availability.',
        'Operate a campus-wide Huawei Wi-Fi 6 network serving 30,000+ concurrent users with 2 GB minimum bandwidth.',
        'Lead System Administration, Networking and IT Support teams across operations, escalations and incident resolution.',
        'Serve as DevOps lead, building GitLab and GitHub CI/CD pipelines and deploying Tanzu Kubernetes clusters.',
        'Drive cloud migration, legacy upgrades, container adoption, security audits and compliance.',
        'Act as primary escalation point for critical data centre, network and application incidents.',
      ],
    },
    { date: 'JUL 2024—JUL 2026', role: 'Lead System Engineer', company: 'BRACIT Services Limited', place: 'Dhaka, Bangladesh', summary: 'Led System and Network Engineering teams while planning resilient capacity and security improvements.', details: ['Led System & Network Engineering teams and planned capacity upgrades.', 'Administered GitLab and Harbor registries and optimized CI/CD runners.', 'Managed Palo Alto and FortiGate firewalls, security hardening and audits.', 'Operated Hybrid AD/Azure AD (Entra ID) and MECM/SCCM patching.'] },
    { date: 'JAN 2025—MAY 2026', role: 'Information Technology Consultant', company: 'Area71 Venture Limited', place: 'Dhaka, Bangladesh', summary: 'Re-engineered infrastructure and security for a 200-user organization with Bangladesh–UK operations.', details: ['Redesigned on-premises infrastructure with redundant switching, firewalls and failover architecture for 99.9% uptime.', 'Implemented Google Workspace DLP, MFA and advanced phishing protection.', 'Established secure Bangladesh–UK site-to-site tunnels for AWS access.', 'Deployed next-generation firewalls and privileged access management.', 'Modernized network topology and consolidated legacy systems.'] },
    { date: 'JAN 2023—JUN 2024', role: 'Senior System Engineer', company: 'BRACIT Services Limited', place: 'Dhaka, Bangladesh', summary: 'Operated large-scale virtualization, hybrid email and observability platforms with 99.9% availability.', details: ['Operated 20+ ESXi hosts and 500+ VMs.', 'Managed hybrid On-Prem and Microsoft 365 email infrastructure.', 'Built monitoring with ELK, Prometheus and Grafana.', 'Led incident response and root-cause analysis for critical issues.'] },
    { date: 'JUL 2022—JAN 2023', role: 'DevOps Developer', company: 'NeovoTech Limited', place: 'Uttara, Dhaka', summary: 'Built AWS delivery pipelines, hybrid Microsoft environments and real-time observability for modern applications.', details: ['Managed AWS EC2, Lambda, RDS and DynamoDB for availability, cost and security.', 'Built CI/CD with AWS CodePipeline, CodeBuild and Elastic Beanstalk.', 'Managed GitHub branching and pull-request workflows.', 'Administered AD, Azure AD, Intune and PowerShell hybrid integrations.', 'Implemented ELK monitoring across serverless and EC2 environments.'] },
    { date: 'MAY 2019—DEC 2022', role: 'System Engineer', company: 'BRACIT Services Limited', place: 'Dhaka, Bangladesh', summary: 'Administered enterprise server platforms and delivered repeatable automation, hardening and migrations.', details: ['Administered Linux and Windows Server environments.', 'Delivered automation with Shell, Expect, Sed and Awk.', 'Implemented SSL/TLS at scale with hardening and migrations.'] },
    { date: 'JAN 2017—MAR 2019', role: 'Support Engineer', company: 'BRACIT Services Limited', place: 'Dhaka, Bangladesh', summary: 'Supported more than 300 users and maintained essential enterprise communication services.', details: ['Supported 300+ users.', 'Maintained on-premises IT and Exchange email services.'] },
    { date: 'JAN 2015—DEC 2016', role: 'Regional IT Support Engineer', company: 'Aamra Networks Limited', place: 'Dhaka, Bangladesh', summary: 'Delivered regional user support and maintained on-premises data centre services.', details: ['Supported 100+ users.', 'Maintained on-premises data centre services.'] },
    { date: 'MAR 2014—SEP 2014', role: 'Content Executive', company: 'Gakk Media (BD) Ltd.', place: 'Dhaka, Bangladesh', summary: 'Supported digital content operations and day-to-day publishing workflows.', details: ['Managed assigned content operations and publishing support.'] },
    { date: 'DEC 2013—JAN 2014', role: 'Technical Support', company: 'QUBEE', place: 'Dhaka, Bangladesh', summary: 'Provided frontline technical assistance and customer issue resolution.', details: ['Diagnosed connectivity issues and supported customer service requests.'] },
  ],
  education: {
    level: 'Postgraduate degree',
    title: 'Master of Science',
    shortTitle: '(MSc)',
    subject: 'Computer Science and Engineering (CSE)',
  },
  contact: {
    prompt: 'Have a system to improve?',
    title: 'Let’s make it',
    accentTitle: 'work beautifully.',
    email: 'info@abhijeetadhikary.com',
  },
  links: {
    github: 'https://github.com/abhijet02',
    linkedin: 'https://www.linkedin.com/in/abhijeet-adhikary-b6326b1a1/',
    youtube: 'https://www.youtube.com/@abhijeetadhikary3205',
    kubernetesCredential: 'https://www.credly.com/badges/10659bca-b435-48f4-840c-3e42401e11fc/public_url',
    vmwareCredential: 'https://www.credly.com/badges/c92af3c4-d573-4d55-9b00-52f2d80c1f6e',
  },
};
