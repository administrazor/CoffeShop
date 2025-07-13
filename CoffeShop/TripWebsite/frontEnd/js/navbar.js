
 
// Load the navbar dynamically
 fetch('navbar.html')
 .then((response) => response.text())
 .then((html) => {
   document.getElementById('navbar').innerHTML = html;

   //to handle user login/logout state
   const user = JSON.parse(localStorage.getItem('user')); //
   if (user) {
     document.getElementById('login-link').style.display = 'none';
     document.getElementById('account-link').style.display = 'block';
     document.getElementById('logout-link').style.display = 'block';
   } else {
     document.getElementById('login-link').style.display = 'block';
     document.getElementById('account-link').style.display = 'none';
     document.getElementById('logout-link').style.display = 'none';
   }

     // Dispatch event to notify that navbar has been loaded
     document.dispatchEvent(new CustomEvent('navbarLoaded'));
 })
 .catch((error) => console.error('Error loading navbar:', error));