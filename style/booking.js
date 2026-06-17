const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("formMessage");
const bookingEndpoint = "https://script.google.com/macros/s/AKfycbxqXPG0dLvwSCWYFJzoJnGPyv4dNIdXlaSc8SpZMrEswL08p2s4u2m-HUG71VSVK04J/exec";

if (bookingForm) {
  bookingForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const name = document.getElementById("fullname").value.trim();
    const tel = document.getElementById("tel").value.trim();
    const email = document.getElementById("email").value.trim();
    const func = document.getElementById("function").value;
    const people = document.getElementById("people").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const requests = document.getElementById("requests").value.trim() || "None";

    if (!name || !tel || !email || !func || !people || !date || !time) {
      bookingMessage.textContent = "Please fill all required fields.";
      bookingMessage.style.color = "red";
      return;
    }

    bookingMessage.textContent = "Sending booking request...";
    bookingMessage.style.color = "black";

    try {
      const response = await fetch(bookingEndpoint, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          tel,
          email,
          function: func,
          people,
          date,
          time,
          requests,
          _subject: "New Green Point booking request"
        })
      });

      if (response.ok) {
        bookingMessage.textContent = "Booking request received. We will confirm your reservation shortly.";
        bookingMessage.style.color = "green";
        bookingForm.reset();
      } else {
        bookingMessage.textContent = "Unable to submit booking online. Please try again or contact us directly.";
        bookingMessage.style.color = "red";
      }
    } catch (error) {
      bookingMessage.textContent = "Unable to reach the booking service. Please check your connection or contact us on WhatsApp.";
      bookingMessage.style.color = "red";
    }
  });
}

