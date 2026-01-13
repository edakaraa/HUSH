/**
 * Profile Page - Tab Navigation
 */
(function () {
  'use strict';

  const tabs = document.querySelectorAll('.profile-tab');
  const contents = document.querySelectorAll('.profile-tab-content');

  if (!tabs.length || !contents.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      // Remove active from all
      tabs.forEach(t => t.classList.remove('active'));
      contents.forEach(c => c.classList.remove('active'));

      // Add active to clicked
      tab.classList.add('active');
      const targetContent = document.getElementById(targetTab);
      if (targetContent) {
        targetContent.classList.add('active');
      }
    });
  });
})();

