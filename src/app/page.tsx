'use client';

import { useEffect, useState } from 'react';
import { FaArrowDown, FaArrowRight, FaEnvelope, FaGithub, FaLinkedinIn, FaMicrosoft, FaYoutube } from 'react-icons/fa';
import { SiAmazonwebservices, SiComptia, SiGooglecloud, SiGitlab, SiKubernetes, SiLinux, SiRedhat, SiVmware } from 'react-icons/si';
import { defaultSiteContent, type SiteContent } from '@/lib/site-content';

const services = [
  ['01', 'Infrastructure & cloud', 'Resilient foundations for teams that need technology to simply work.', 'Hybrid cloud · VMware · Azure · AWS'],
  ['02', 'DevOps & platforms', 'Delivery systems that turn releases from stressful events into routine work.', 'Kubernetes · Docker · CI/CD'],
  ['03', 'Security & operations', 'Practical safeguards, observability and response built into daily operations.', 'Monitoring · Firewalls · Compliance'],
  ['04', 'Technical advisory', 'Clear direction through migrations, modernisation and complex systems decisions.', 'Architecture · Roadmaps · Delivery'],
];

const skills = ['Hybrid cloud architecture', 'VMware vSphere & vSAN', 'Kubernetes & Tanzu', 'Network & endpoint security', 'CI/CD & DevOps automation', 'Linux & Windows systems', 'Data centre operations', 'Audit & compliance'];
const certifications = [
  ['VMware Certified Professional — Data Center Virtualization (2024)', 'VMware', SiVmware],
  ['Certified Kubernetes Administrator (CKA)', 'Cloud Native Computing Foundation', SiKubernetes],
  ['AWS Cloud Fundamentals', 'Amazon Web Services', SiAmazonwebservices],
  ['CompTIA Server+', 'CompTIA', SiComptia],
  ['Red Hat Certified System Administrator', 'Red Hat', SiRedhat],
  ['Red Hat Certified Engineer', 'Red Hat', SiLinux],
  ['Red Hat Fundamentals of Ansible', 'Red Hat', SiRedhat],
  ['Microsoft Certified: Azure Administrator Associate', 'Microsoft', FaMicrosoft],
  ['Microsoft Certified: Azure Security Engineer Associate', 'Microsoft', FaMicrosoft],
  ['Microsoft Certified: Windows Server Hybrid Administrator Associate', 'Microsoft', FaMicrosoft],
  ['Microsoft 365 Certified: Administrator Expert', 'Microsoft', FaMicrosoft],
  ['Microsoft Certified: Information Protection and Compliance Administrator Associate', 'Microsoft', FaMicrosoft],
  ['Google System Administration and IT Infrastructure Services', 'Google', SiGooglecloud],
];
const experience = [
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
      'Act as primary escalation point for critical data centre, network and application incidents.'
    ]
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
];

export default function Home() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [time, setTime] = useState('');
  const [accent, setAccent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);
  const [showTopButton, setShowTopButton] = useState(false);
  const [openRole, setOpenRole] = useState<number | null>(0);
  const [approachSlide, setApproachSlide] = useState(0);
  useEffect(() => {
    fetch('/api/content', { cache: 'no-store' }).then(response => response.ok ? response.json() : null).then(data => data && setContent(data)).catch(() => undefined);
    const slider = window.setInterval(() => setApproachSlide(value => (value + 1) % 3), 5000);
    return () => window.clearInterval(slider);
  }, []);
  useEffect(() => {
    const updateTopButton = () => setShowTopButton(window.scrollY > window.innerHeight * .45);
    updateTopButton();
    window.addEventListener('scroll', updateTopButton, { passive: true });
    const revealNewContent = window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>('[data-reveal]').forEach(element => element.classList.add('visible'));
    }, 80);
    return () => { window.clearTimeout(revealNewContent); window.removeEventListener('scroll', updateTopButton); };
  }, [content]);
  useEffect(() => {
    const updateTime = () => setTime(new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', hour12: false }).format(new Date()));
    updateTime();
    const timer = window.setInterval(updateTime, 30000);
    const elements = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
    }), { threshold: .12 });
    elements.forEach(element => observer.observe(element));
    const cursor = document.querySelector<HTMLElement>('.cursor-dot');
    const follower = document.querySelector<HTMLElement>('.cursor-ring');
    const onPointerMove = (event: PointerEvent) => {
      document.documentElement.style.setProperty('--mouse-x', event.clientX + 'px');
      document.documentElement.style.setProperty('--mouse-y', event.clientY + 'px');
      cursor?.classList.add('cursor-active');
      follower?.classList.add('cursor-active');
      const tilt = (event.target as HTMLElement).closest<HTMLElement>('[data-tilt]');
      if (tilt) {
        const box = tilt.getBoundingClientRect();
        tilt.style.setProperty('--rx', ((event.clientY - box.top) / box.height - .5) * -9 + 'deg');
        tilt.style.setProperty('--ry', ((event.clientX - box.left) / box.width - .5) * 9 + 'deg');
      }
    };
    const onPointerOver = (event: PointerEvent) => {
      const interactive = (event.target as HTMLElement).closest('a, button, [data-clickable]');
      follower?.classList.toggle('cursor-hover', Boolean(interactive));
    };
    const onPointerOut = (event: PointerEvent) => {
      const tilt = (event.target as HTMLElement).closest<HTMLElement>('[data-tilt]');
      if (tilt) { tilt.style.setProperty('--rx', '0deg'); tilt.style.setProperty('--ry', '0deg'); }
    };
    window.addEventListener('pointermove', onPointerMove);
    document.addEventListener('pointerover', onPointerOver);
    document.addEventListener('pointerout', onPointerOut);
    return () => {
      window.clearInterval(timer); observer.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
    };
  }, []);

  const changeAccent = () => setAccent(value => (value + 1) % 4);
  const handlePageClick = (event: React.MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest('a, button, input, textarea, [role="button"]')) return;
    changeAccent();
  };
  const navigate = (event: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    event.preventDefault();
    if (transitioning) return;
    setTransitioning(true);
    window.setTimeout(() => {
      document.querySelector(target)?.scrollIntoView({ behavior: 'instant' });
      window.setTimeout(() => setTransitioning(false), 120);
    }, 430);
  };

  return <main id="top" data-accent={accent} onClick={handlePageClick}>
    <div className="cursor-dot" aria-hidden="true" /><div className="cursor-ring" aria-hidden="true" />
    <div className={'page-wipe ' + (transitioning ? 'is-wiping' : '')} aria-hidden="true"><span>AA / SYSTEMS</span></div>
    <header>
      <a className="logo" href="#top"><img src="/profile.jpg" alt="" /><b>AA</b><span>®</span></a>
      <p>System administrator<br />& cloud specialist</p>
      <nav><a href="#about" onClick={e => navigate(e, '#about')}>About</a><a href="#services" onClick={e => navigate(e, '#services')}>Services</a><a href="#experience" onClick={e => navigate(e, '#experience')}>Experience</a><a href="#education" onClick={e => navigate(e, '#education')}>Education</a></nav>
      <a className="header-cta" href={`mailto:${content.contact.email}`}>Start a project ↗</a>
    </header>

    <section className="hero">
      <div className="hero-meta"><span>{content.hero.location}</span><span>{time} BST</span></div>
      <div className="hero-signal" aria-hidden="true"><small>{content.hero.signalLeft}</small><div><i /><b /></div><small>{content.hero.signalRight}</small></div>
      <p className="eyebrow">{content.hero.eyebrow}</p>
      <h1>{content.hero.title}<br /><i>{content.hero.accentTitle}</i></h1>
      <div className="hero-foot"><p>{content.hero.description}</p><a href="#about" onClick={event => navigate(event, '#about')} aria-label="Scroll to about"><FaArrowDown /></a></div>
      <div className="portrait" aria-hidden="true"><div className="tech-ring ring-one" /><div className="tech-ring ring-two" /><div className="scan-beam" /><img src="/abhijeet-portrait.jpg" alt="" /></div>
    </section>

    <section className="statement" id="about" data-reveal>
      <div className="section-label"><span>( About )</span><span>01 — 04</span></div>
      <h2 className="about-headline">{content.about.title} <i>{content.about.accent}</i></h2>
      <div className="about-lower">
        <div className="infra-orbit" aria-hidden="true">
          <div className="orbit-core"><span>99.9%</span><small>UPTIME</small></div>
          <i className="orbit-ring orbit-a"><b /></i><i className="orbit-ring orbit-b"><b /></i>
          <span className="infra-node node-cloud">CLOUD</span><span className="infra-node node-k8s">K8S</span><span className="infra-node node-sec">SEC</span><span className="infra-node node-vm">VM</span>
          <div className="infra-scan" />
        </div>
        <div className="statement-copy"><p>{content.about.paragraphOne}</p><p>{content.about.paragraphTwo}</p></div>
      </div>
    </section>

    <section className="services" id="services">
      <div className="services-head" data-reveal><div className="section-label"><span>( Services )</span><span>02 — 04</span></div><h2>How I can help.</h2></div>
      <div className="service-list">{content.services.map(({ number, title, copy, tags }) => <article key={number + title} data-reveal data-tilt><span>{number}</span><h3>{title}</h3><p>{copy}</p><small>{tags}</small><div className="service-arrow"><FaArrowRight /></div></article>)}</div>
    </section>

    <section className="feature" data-reveal>
      <div className="feature-image">
        <img className={'slide-original ' + (approachSlide === 0 ? 'slide-active' : '')} src="/neon-portrait.png" alt="Abhijeet working in a black-and-white technology setting" />
        <img className={'slide-zoom-out ' + (approachSlide === 1 ? 'slide-active' : '')} src="/approach-1.png" alt="Abhijeet's systems engineering approach" />
        <img className={approachSlide === 2 ? 'slide-active' : ''} src="/approach-2.png" alt="Abhijeet working with modern infrastructure" />
        <div className="slide-count" aria-hidden="true"><span>0{approachSlide + 1}</span><i /><span>03</span></div>
      </div>
      <div className="feature-copy"><div className="section-label"><span>( Approach )</span><span>03 — 04</span></div><h2>{content.approach.title}<br />{content.approach.accentTitle}</h2><p>{content.approach.description}</p><ul>{content.approach.principles.map(item => <li key={item}>{item}</li>)}</ul></div>
    </section>

    <section className="expertise" id="skills">
      <div className="section-label"><span>( Skills & certifications )</span><span>04 — 06</span></div>
      <div className="expertise-intro" data-reveal><h2>Depth where it<br /><i>matters.</i></h2><p>Hands-on expertise across the platforms and practices that keep enterprise technology moving.</p></div>
      <div className="skill-cloud">{content.skills.map((skill, index) => <span key={skill} style={{ '--i': index } as React.CSSProperties} data-reveal>{skill}</span>)}</div>
      <div className="cert-grid">{content.certifications.map(({ title, vendor, icon }, index) => { const Logo = ({ vmware: SiVmware, kubernetes: SiKubernetes, aws: SiAmazonwebservices, comptia: SiComptia, redhat: SiRedhat, linux: SiLinux, microsoft: FaMicrosoft, google: SiGooglecloud } as const)[icon as 'vmware'] || FaMicrosoft; return <article key={title} style={{ '--i': index } as React.CSSProperties} data-reveal data-tilt><div className="cert-logo"><Logo /></div><p>{vendor}</p><h3>{title}</h3><small>Verified learning path ↗</small></article>; })}</div>
    </section>

    <section className="experience" id="experience" data-reveal>
      <div className="section-label"><span>( Experience )</span><span>05 — 06</span></div>
      <div className="experience-title"><h2>Selected<br /><i>experience.</i></h2><div className="career-pulse" aria-hidden="true"><div className="career-track"><i /><i /><i /><i /><i /></div><div className="career-readout"><span>12+ YEARS</span><small>SYSTEMS · CLOUD · SECURITY</small></div><div className="pulse-line"><b /></div></div><p>Enterprise systems, cloud platforms and operations leadership across Bangladesh’s technology landscape.</p></div>
      <div className="roles">{content.experience.map((item, index) => <article className={openRole === index ? 'role-open' : ''} key={item.role + item.company}>
        <button className="role-head" type="button" aria-expanded={openRole === index} onClick={() => setOpenRole(openRole === index ? null : index)}>
          <span>{item.date}</span><h3>{item.role}</h3><p>{item.company}</p><FaArrowRight />
        </button>
        <div className="role-panel"><div className="role-panel-inner"><div className="role-overview"><span>{item.place}</span><p>{item.summary}</p></div><div><small>Key responsibilities</small><ul>{item.details.map(detail => <li key={detail}>{detail}</li>)}</ul></div></div></div>
      </article>)}</div>
    </section>

    <section className="education" id="education" data-reveal>
      <div className="section-label"><span>( Education )</span><span>06 — 07</span></div>
      <div className="education-card"><span>{content.education.level}</span><h2>{content.education.title} <i>{content.education.shortTitle}</i></h2><p>{content.education.subject}</p><FaArrowRight /></div>
    </section>

    <section className="contact"><p>{content.contact.prompt}</p><h2>{content.contact.title}<br /><i>{content.contact.accentTitle}</i></h2><a href={`mailto:${content.contact.email}`}>{content.contact.email} <FaArrowRight /></a><a className={'up-button ' + (showTopButton ? 'is-visible' : '')} href="#top" aria-label="Back to top"><FaArrowDown /></a></section>
    <footer><a className="logo" href="#top"><img src="/profile.jpg" alt="" /><b>AA</b><span>®</span></a><p>© {new Date().getFullYear()} Abhijeet Adhikary</p><div className="footer-icons"><a href={content.links.kubernetesCredential} aria-label="Kubernetes credential"><SiKubernetes /></a><a href={content.links.vmwareCredential} aria-label="VMware credential"><SiVmware /></a><span aria-label="GitLab"><SiGitlab /></span><a href={content.links.github} aria-label="GitHub"><FaGithub /></a><a href={content.links.linkedin} aria-label="LinkedIn"><FaLinkedinIn /></a><a href={content.links.youtube} aria-label="YouTube"><FaYoutube /></a><a href={`mailto:${content.contact.email}`} aria-label="Email"><FaEnvelope /></a></div></footer>
  </main>;
}
