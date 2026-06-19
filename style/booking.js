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
