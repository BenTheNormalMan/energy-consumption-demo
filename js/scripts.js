document.getElementById('logo').onclick = () => showPage('home');
document.getElementById('nav-home').onclick = () => showPage('home');
document.getElementById('nav-televisions').onclick = () => showPage('televisions');
document.getElementById('nav-about').onclick = () => showPage('about');

function showPage(page) {
  const contentDiv = document.getElementById('content');
  
  // Add loading animation
  contentDiv.classList.add('loading');
  contentDiv.style.opacity = '0.5';
  
  // Map page names to file names
  const pageMap = {
    home: 'home.html',
    televisions: 'televisions.html',
    about: 'aboutus.html'
  };
  
  // Fetch page content with enhanced error handling
  fetch(pageMap[page])
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      // Smooth transition effect
      setTimeout(() => {
        contentDiv.innerHTML = html;
        contentDiv.style.opacity = '1';
        contentDiv.classList.remove('loading');
        
        // Update active nav link with smooth transition
        document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
        });
        document.getElementById('nav-' + page).classList.add('active');
        
        // Scroll to top smoothly
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        
        // Update page title
        const titles = {
          home: 'PowerHub - Energy Efficient Appliances Australia',
          televisions: 'TV Energy Guide - PowerHub',
          about: 'About Us - PowerHub'
        };
        document.title = titles[page] || 'PowerHub';
        
      }, 150);
    })
    .catch(error => {
      console.error('Error loading page:', error);
      contentDiv.innerHTML = `
        <div style="text-align: center; padding: 40px;">
          <h2>Oops! Something went wrong</h2>
          <p>We're having trouble loading this page. Please try again.</p>
        </div>
      `;
      contentDiv.style.opacity = '1';
      contentDiv.classList.remove('loading');
    });
}

// Add smooth scroll behavior for better UX
document.addEventListener('DOMContentLoaded', function() {
  // Initialize with home page
  showPage('home');
  
  // Add keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.altKey) {
      switch(e.key) {
        case '1':
          e.preventDefault();
          showPage('home');
          break;
        case '2':
          e.preventDefault();
          showPage('televisions');
          break;
        case '3':
          e.preventDefault();
          showPage('about');
          break;
      }
    }
  });
});