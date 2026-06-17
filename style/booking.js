<<<<<<< HEAD
const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("formMessage");
const bookingEndpoint = "https://script.google.com/macros/s/AKfycbxqXPG0dLvwSCWYFJzoJnGPyv4dNIdXlaSc8SpZMrEswL08p2s4u2m-HUG71VSVK04J/exec";

function setBookingStatus(message, type) {
  if (!bookingMessage) return;
  bookingMessage.textContent = message;
  bookingMessage.dataset.state = type;
}

if (bookingForm) {
  bookingForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    if (!bookingForm.checkValidity()) {
      bookingForm.reportValidity();
      setBookingStatus("Please complete the required fields before submitting.", "error");
      return;
    }

    const name = document.getElementById("fullname").value.trim();
    const tel = document.getElementById("tel").value.trim();
    const email = document.getElementById("email").value.trim();
    const func = document.getElementById("function").value;
    const people = document.getElementById("people").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;
    const requests = document.getElementById("requests").value.trim() || "None";

    if (!name || !tel || !email || !func || !people || !date || !time) {
      setBookingStatus("Please fill all required fields.", "error");
      return;
    }

    setBookingStatus("Sending booking request...", "pending");

    try {
      const payload = new URLSearchParams({
        name,
        tel,
        email,
        function: func,
        people,
        date,
        time,
        requests,
        source: "green-point-website",
        _subject: "New Green Point booking request"
      });

      const response = await fetch(bookingEndpoint, {
        method: "POST",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
        },
        body: payload.toString()
      });

      if (response.ok) {
        setBookingStatus("Booking request received. We will confirm your reservation shortly and email you a confirmation.", "success");
        bookingForm.reset();
      } else {
        setBookingStatus("Unable to submit booking online. Please try again or contact us directly.", "error");
      }
    } catch (error) {
      setBookingStatus("Unable to reach the booking service. Please check your connection or contact us on WhatsApp.", "error");
    }
  });
}

=======
document.getElementById("bookingForm").addEventListener("submit", function(e) {
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
    document.getElementById("formMessage").textContent = " Please fill all required fields.";
    document.getElementById("formMessage").style.color = "red";
    return;
  }
  let message = 
    `New Booking Request:\n` +
    `Name: ${name}\n` +
    `Tel: ${tel}\n` +
    `Email: ${email}\n` +
    `Function: ${func}\n` +
    `People: ${people}\n` +
    `Date: ${date}\n` +
    `Time: ${time}\n` +
    `Requests: ${requests}`;

    // Open WhatsApp chat with pre-filled message
    const whatsappNumber = "256787150374"; // Uganda code without leading 0
    const url = `https://wa.me/${whatsappNumber}?text=${message}`;
    window.open(url, "_blank");

    // Show confirmation on page
    document.getElementById("formMessage").textContent = "Redirecting you to WhatsApp to complete booking...";
    document.getElementById("formMessage").style.color = "green";

    document.getElementById("bookingForm").reset();
});
>>>>>>> d776868aadaa6e266795fab241414ade24b1fa21
