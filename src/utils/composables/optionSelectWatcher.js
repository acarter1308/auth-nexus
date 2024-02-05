import { ref, onMounted, onUnmounted } from 'vue';

export function watchOptionSelect(selectRef) {
  const optionsOpen = ref(false);
  const selectElementRef = selectRef;

  function toggleOptionsPanel() {
    optionsOpen.value = !optionsOpen.value;
  }

  function closeOptionPanel() {
    optionsOpen.value = false;
  }

  function checkForOptionToggle(event) {
    if (selectElementRef.value.contains(event.target)) {
      toggleOptionsPanel();
    } else if (optionsOpen.value) {
      closeOptionPanel();
    }
  }

  onMounted(() => window.addEventListener('click', checkForOptionToggle));
  onUnmounted(() => window.removeEventListener('click', checkForOptionToggle));

  return { optionsOpen };
}
