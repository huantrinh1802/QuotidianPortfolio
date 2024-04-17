<script>
  import { popup } from '@skeletonlabs/skeleton';
  import Fuse from 'fuse.js';
  import GroupList from './GroupList.svelte';
  /**
   * @type any[]
   */
  export let items = [];
  let filteredItems = items;
  /**
   * @type {import('@skeletonlabs/skeleton').PopupSettings} PopupSettings
   */
  const popupCombobox = {
    event: 'click',
    target: 'popupSearch',
    placement: 'bottom',
    closeQuery: '.listbox-item',
  };
  let searchString = '';
  const fuseOptions = {
    // isCaseSensitive: false,
    // includeScore: false,
    shouldSort: false,
    // includeMatches: false,
    // findAllMatches: false,
    // minMatchCharLength: 1,
    // location: 0,
    // threshold: 0.6,
    // distance: 100,
    useExtendedSearch: true,
    // ignoreLocation: false,
    // ignoreFieldNorm: false,
    // fieldNormWeight: 1,
    keys: ['name', 'items.name', 'items.items.name'],
  };
  const fuse = new Fuse(items, fuseOptions);
  $: {
    filteredItems = fuse.search(searchString).map((item) => item['item']);
    // if (searchString === '') {
    //   filteredItems = items;
    // } else {
    //   let result = [];
    //   items.map((item) => {});
    // }
  }
</script>

{JSON.stringify(filteredItems)}
<div class="relative w-1/2">
  <input
    bind:value={searchString}
    class="input px-4"
    use:popup={popupCombobox}
    placeholder="Search..." />

  <div
    class="card w-full py-2 shadow-xl"
    data-popup="popupSearch">
    <GroupList list={filteredItems} />
  </div>
</div>
