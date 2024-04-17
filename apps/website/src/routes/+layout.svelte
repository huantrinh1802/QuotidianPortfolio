<script lang="ts">
  import '../app.postcss';
  import '@skeletonlabs/skeleton/styles/all.css';
  import '../theme.postcss';
  import { AppShell } from '@skeletonlabs/skeleton';
  import Header from '$lib/layout/Header.svelte';
  import { browser } from '$app/environment';
  import { base } from '$app/paths';
  import { storePopup } from '@skeletonlabs/skeleton';
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
  const callback = function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fadeIn');
      } else {
        entry.target.classList.remove('animate-fadeIn');
      }
    });
  };
  if (browser) {
    const observer = new IntersectionObserver(callback);
    const targets = document.querySelectorAll('.show-on-scroll');
    targets.forEach(function (target) {
      target.classList.add('opacity-0');
      observer.observe(target);
    });
  }
  const menuItems = [
    { name: 'Home', href: `${base}/` },
    { name: 'My Resume', href: `${base}/resume` },
    // { name: 'Blogs', href: '/blogs' },
  ];
</script>

<AppShell slotPageContent="print:bg-white">
  <svelte:fragment slot="header">
    <div class="print:hidden">
      <Header {menuItems} />
    </div>
  </svelte:fragment>
  <!-- <svelte:fragment slot="sidebarLeft">Sidebar Left</svelte:fragment> -->
  <!-- <svelte:fragment slot="sidebarRight">Sidebar Right</svelte:fragment> -->
  <!-- <svelte:fragment slot="pageHeader">Page Header</svelte:fragment> -->
  <!-- Router Slot -->
  <slot />
  <!-- ---- / ---- -->
  <!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
  <!-- <svelte:fragment slot="footer">Footer</svelte:fragment> -->
</AppShell>
