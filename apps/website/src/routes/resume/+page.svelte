<script lang="ts">
  import History from '$lib/components/History.svelte';
  import type { PageData } from './$types';
  import Email from '~icons/material-symbols/attach-email-rounded';
  import GitHub from '~icons/skill-icons/github-dark';
  import LinkedIn from '~icons/skill-icons/linkedin';
  import { base } from '$app/paths';
  import ProgressBar from '$lib/components/ProgressBar.svelte';
  import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';
  const contacts = [
    { href: 'mailto:huantrinh1802@gmail.com', icon: Email, text: 'huantrinh1802@gmail.com' },
    { href: 'https://www.github.com/huantrinh1802', icon: GitHub, text: 'gh/huantrinh1802' },
    { href: 'https://www.linkedin.com/in/huantrinh1802', icon: LinkedIn, text: 'in/huantrinh1802' },
  ];
  const experiences = [
    {
      title: 'Full-stack Software Developer',
      subtitle: 'Data Analytics Holdings (FA as Fonto)',
      timeline: '12/2021 - Present',
      location: 'Lavender Bay NSW, Australia',
      summary:
        'At Fonto, I work primarily as Full-stack software developer, but I am also required to perform tasks in the IT department. I daily work with the CTO and PTO to develop and test high quality and secure code to all the projects.',
      tasks: [
        'Maintaining and developing new features for hybrid applications using Python, PostgreSQL, GraphQL, Ionic and VueJS',
        'Maintaining 3rd parties’ APIs including but not limited banking, survey panel and survey scripting',
        'Using Figma to transfer the designs into the applications',
        'Maintaining the company’s websites using WordPress',
        'Developing an internal application using Flask, Starlette, Jinja2 and PostgreSQL',
        'Using AWS services – including but not limited to Elastic Beanstalk, ECS, S3, Lambda functions',
        'Collaborating with teammates across departments using Bitbucket, Jira and Confluence',
        'Analyse and evaluate system program needs, maintain technical program, end user documentation and operational procedures',
      ],
    },
    {
      title: 'Lead Software Developer',
      subtitle: 'PIT-M3D Pty Ltd',
      timeline: '08/2019 - 11/2021',
      location: 'Double Bay NSW, Australia',
      summary:
        'During the time at PIT-M3D, I managed a diverse software development team of 8 Python developers, front-end developers, data engineers and data scientists. Alongside other duties, I was responsible for hiring, managing, planning, structuring, the timely delivery, and the documentation of all development-related activities of our team, which focused on the development of transparent diagnostic decision-making tools.',
      tasks: [
        'Designed and implemented scalable solutions for data extraction, analysis, retrieval and indexing',
        'Prepared detailed reports on updates to project specifications, progress, identified conflicts and team activities',
        'Revised, modulated and updated old code bases to modern development standards, reducing operating costs and improving functionality',
        'Reviewed requirements, specifications and technical design documents to provide timely and meaningful feedback',
      ],
    },
    {
      title: 'Barista',
      subtitle: 'Motown Coffee Brewer',
      timeline: '08/2019 - 11/2021',
      location: 'Sydney NSW, Australia',
      summary:
        'The part-time job as Barista during my IT studies at Macquarie University taught me valuable socialising and customer-relationship skills, and further taught me how to self-manage resources and time. To this day, I value a good coffee.',
      tasks: [
        'Educated co-workers and customers about new products and best practices',
        'Prioritized drink requests while managing interruptions',
        'Educated staff by sharing knowledge and expertise of coffees, teas and merchandise',
        'Constantly expanded personal knowledge about coffee varieties',
      ],
    },
  ];
  const educations = [
    {
      title: 'Bachelor of Information Technology (Software Development) - Macquarie University',
      timeline: '03/2015 - 06/2021',
      location: 'North Ryde NSW, Australia',
    },
    {
      title: 'HSC - Fairvale High School',
      timeline: '09/2012 - 11/2014',
      location: 'Fairfield NSW, Australia',
    },
  ];
  const skills = [
    { title: 'Python', percentage: 90 },
    { title: 'JavaScript', percentage: 85 },
    { title: 'SQL/PostgreSQL', percentage: 85 },
    { title: 'SvelteJS/SvelteKit', percentage: 85 },
    { title: 'VueJS', percentage: 80 },
    { title: 'Docker', percentage: 75 },
    { title: 'ReactJS', percentage: 70 },
    { title: 'GraphQL', percentage: 70 },
    { title: 'AWS', percentage: 70 },
  ];
  const languages = [
    { title: 'Vietnamese', percentage: 95 },
    { title: 'English', percentage: 85 },
  ];
  window.onbeforeprint = (event) => {
    document.getElementById('page').scrollTo(0, 0);
  };
</script>

<div class="flex p-2 print:hidden">
  <button
    class="btn variant-filled-primary ml-auto"
    on:click={() => {
      document.getElementById('page').scrollTo(0, 0);
      window.print();
    }}>
    Print
  </button>
</div>
<div class="kcp-layout overflow-over flex h-full flex-col print:grid md:grid">
  <div class="kcp-profile flex flex-col items-center print:flex-row md:flex-row">
    <div
      style={`background-image: url('${base}/images/hero_no_filter.png')`}
      class="kcp-profile-photo z-10 flex h-60 w-60 flex-shrink-0 items-center justify-center rounded-full border-4 border-white bg-primary-700 p-8 print:h-40 print:w-40" />
    <div class="z-0 -mt-8 flex h-40 w-full items-center justify-center rounded-md bg-primary-700 print:-ml-10 print:mt-0 print:h-32 md:-ml-10 md:mt-0">
      <div>
        <h1 class="text-white print:!text-lg">Cong Anh Huan Trinh</h1>
        <h2 class="text-white print:!text-base">Software Engineer</h2>
      </div>
    </div>
  </div>
  <div class="kcp-summary flex flex-col gap-4">
    <Accordion class="print:hidden">
      <AccordionItem>
        <svelte:fragment slot="summary">Contacts</svelte:fragment>
        <svelte:fragment slot="content">
          {#each contacts as contact}
            <a
              class="flex items-center gap-2 break-all !text-primary-900-50-token print:!text-xs print:!text-teal-900"
              href={contact.href}>
              <svelte:component
                this={contact.icon}
                class="text-2xl print:!text-sm" />
              <p class="print:!text-xs">{contact.text}</p>
            </a>
          {/each}
        </svelte:fragment>
      </AccordionItem>
    </Accordion>
    <Accordion class="print:hidden">
      <AccordionItem>
        <svelte:fragment slot="summary">Skills</svelte:fragment>
        <svelte:fragment slot="content">
          {#each skills as skill}
            <ProgressBar
              title={skill.title}
              percentage={skill.percentage} />
          {/each}
        </svelte:fragment>
      </AccordionItem>
    </Accordion>
    <Accordion class="print:hidden">
      <AccordionItem>
        <svelte:fragment slot="summary">Languages</svelte:fragment>
        <svelte:fragment slot="content">
          {#each languages as language}
            <ProgressBar
              title={language.title}
              percentage={language.percentage} />
          {/each}
        </svelte:fragment>
      </AccordionItem>
    </Accordion>
    <div class="hidden flex-col gap-4 rounded-md border border-slate-200 px-10 py-4 print:flex print:py-1 print:px-1">
      <h2 class="text-center print:!text-lg print:text-black">Contacts</h2>
      {#each contacts as contact}
        <a
          class="flex items-center gap-2 break-all !text-white print:!text-xs print:!text-teal-900"
          href={contact.href}>
          <svelte:component
            this={contact.icon}
            class="text-2xl print:!text-sm" />
          <p class="print:!text-xs">{contact.text}</p>
        </a>
      {/each}
      <div class="kcp-history" />
    </div>
    <div class="hidden flex-col gap-4 rounded-md border border-slate-200 px-10 print:px-2 py-4 print:flex">
      <h2 class="text-center print:!text-lg print:text-black">Skills</h2>
      <div>
        {#each skills as skill}
          <ProgressBar
            title={skill.title}
            percentage={skill.percentage} />
        {/each}
      </div>
    </div>
    <div class="hidden flex-col gap-4 rounded-md border border-slate-200 px-10 print:px-2 py-4 print:flex">
      <h2 class="text-center print:!text-lg print:text-black">Languages</h2>
      <div>
        {#each languages as language}
          <ProgressBar
            title={language.title}
            percentage={language.percentage} />
        {/each}
      </div>
    </div>
  </div>
  <div class="kcp-history flex flex-col justify-center gap-2 px-6 print:gap-1 print:px-0 print:text-black">
    <div class="flex flex-col">
      <h2 class="py-2 text-center print:!text-lg print:text-black">Experiences</h2>
      {#each experiences as content}
        <History {content} />
        <hr class="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700 print:my-1" />
      {/each}
    </div>
    <div class="flex flex-col">
      <h2 class="py-2 text-center print:!text-lg print:text-black">Educations</h2>
      {#each educations as content}
        <History {content} />
        <hr class="my-8 h-px border-0 bg-gray-200 dark:bg-gray-700 print:my-1" />
      {/each}
    </div>
  </div>
</div>

<style lang="postcss">
  .kcp-profile-photo {
    background-size: cover;
    background-position: 20% 20%;
  }
  .kcp-layout {
    @apply gap-4 p-4;
    grid-template-areas:
      'profile profile'
      'history summary';
    grid-template-columns: 1fr;
  }
  .kcp-profile {
    grid-area: profile;
  }
  .kcp-summary {
    grid-area: summary;
  }
</style>
