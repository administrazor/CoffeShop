
 
function printoffre() {
  const out = document.getElementById("offreoutput");
  const now = new Date();
  const hours = now.getHours(); // Call getHours() as a method
 
  if (hours >= 7 && hours < 12) { // Adjust to < 12 for morning
    out.textContent = "Kickstart your day with our Morning Boost special! Any Medium Coffee + Croissant for just $5! Buy One, Get One 50% Off on all breakfast sandwiches.";
  } else if (hours >= 14 && hours < 17) { // Adjust to < 17 for afternoon
    out.textContent = "Take a break and recharge with our Afternoon Delight! Any Large Iced Coffee + Slice of Cake for only $6! Happy Hour: Enjoy 20% off all pastries from 3 PM to 5 PM.";
  } else {
    out.textContent = "Join us for our next special! Check back in the morning or afternoon!";
  }
}
 
  