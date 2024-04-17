<script>
  import SearchBar from '$lib/components/SearchBar.svelte';
  const items = [
    { type: 'list', name: 'Group 1', items: [{ type: 'item', name: 'Item 1.1', href: '' }] },
    { type: 'list', name: 'Group 2', items: [{ type: 'list', name: 'Group 2.1', items: [{ type: 'item', name: 'Eagle' }] }] },
  ];
</script>

<SearchBar {items} />
