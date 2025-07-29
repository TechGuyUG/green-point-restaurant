// Service Tab Functionality
const serviceTabs = document.querySelectorAll('.service-tab');
const serviceContents = document.querySelectorAll('.service-content');

serviceTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        serviceTabs.forEach(t => t.classList.remove('active'));
        serviceContents.forEach(c => c.classList.remove('active'));
                
        // Add active class to clicked tab
        tab.classList.add('active');
                
        // Show corresponding content
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});