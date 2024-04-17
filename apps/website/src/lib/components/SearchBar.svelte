<script>
  import { popup } from '@skeletonlabs/skeleton';
  import { storePopup } from '@skeletonlabs/skeleton';
  import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';
  storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });
  const popupCombobox = {
    event: 'click',
    target: 'popupCombobox',
    placement: 'bottom',
  };
</script>

<div>
  <button
    class="btn variant-filled w-48 justify-between"
    use:popup={{
      event: 'click',
      target: 'popupCombobox',
      placement: 'bottom',
    }}>
    <span>↓</span>
  </button>
  <div
    class="card w-48 py-2 shadow-xl"
    data-popup="popupCombobox">
    <p>HI</p>
    <div class="arrow bg-surface-100-800-token" />
  </div>
</div>
