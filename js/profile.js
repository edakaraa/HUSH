/**
 * Profile Page - Tab Navigation
 */
(function () {
  'use strict';

  const tabs = document.querySelectorAll('.profile-tab');
  const contents = document.querySelectorAll('.profile-tab-content');

  if (!tabs.length || !contents.length) return;

  const setActiveTab = (targetTab) => {
    if (!targetTab) return;

    tabs.forEach(t => t.classList.remove('active'));
    contents.forEach(c => c.classList.remove('active'));

    const targetContent = document.getElementById(targetTab);
    const targetButton = Array.from(tabs).find(t => t.getAttribute('data-tab') === targetTab);

    if (targetButton) {
      targetButton.classList.add('active');
    }

    if (targetContent) {
      targetContent.classList.add('active');
    }
  };

  const initialTab = window.location.hash.replace('#', '');
  if (initialTab) {
    setActiveTab(initialTab);
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      setActiveTab(targetTab);
      if (targetTab) {
        history.replaceState(null, '', `#${targetTab}`);
      }
    });
  });
})();

