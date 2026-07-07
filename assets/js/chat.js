/**
 * PACE Consultant (P). Ltd. — AI Chat Widget Controller
 * Interactive chatbot with typing animation and custom keyword response matching.
 */

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('ai-chat-toggle');
  const closeBtn = document.getElementById('ai-chat-close');
  const chatWindow = document.getElementById('ai-chat-window');
  const chatMessages = document.getElementById('ai-chat-messages');
  const chatForm = document.getElementById('ai-chat-form');
  const chatInput = document.getElementById('ai-chat-input');

  if (!toggleBtn || !closeBtn || !chatWindow || !chatMessages || !chatForm || !chatInput) {
    console.warn('PACE AI Chat elements not found. Initialization skipped.');
    return;
  }

  let isFirstOpen = true;

  // Toggle Chat window
  const openChat = () => {
    chatWindow.classList.add('is-open');
    chatWindow.hidden = false;
    chatWindow.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    chatInput.focus();

    // Trigger initial bot message on first open
    if (isFirstOpen) {
      isFirstOpen = false;
      showTypingIndicator();
      setTimeout(() => {
        removeTypingIndicator();
        appendBotMessage("Hello! I’m the PACE AI Assistant. How can I help you today?");
      }, 800);
    }
  };

  const closeChat = () => {
    chatWindow.classList.remove('is-open');
    chatWindow.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    // Set hidden after transition
    setTimeout(() => {
      if (!chatWindow.classList.contains('is-open')) {
        chatWindow.hidden = true;
      }
    }, 300);
  };

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = chatWindow.classList.contains('is-open');
    isOpen ? closeChat() : openChat();
  });

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeChat();
  });

  // Close chat on click outside
  document.addEventListener('click', (e) => {
    const isOpen = chatWindow.classList.contains('is-open');
    if (isOpen && !chatWindow.contains(e.target) && !toggleBtn.contains(e.target)) {
      closeChat();
    }
  });

  // Handle message sending
  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const messageText = chatInput.value.trim();
    if (!messageText) return;

    // Append user message
    appendUserMessage(messageText);
    chatInput.value = '';

    // Simulate bot response
    showTypingIndicator();
    setTimeout(() => {
      removeTypingIndicator();
      const response = getBotResponse(messageText);
      appendBotMessage(response);
    }, 1200);
  });

  // Append user message
  function appendUserMessage(text) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'ai-chat-msg ai-chat-msg--user';
    msgDiv.textContent = text;
    chatMessages.appendChild(msgDiv);
    scrollToBottom();
  }

  // Append bot message (supports HTML for rich formatting)
  function appendBotMessage(html) {
    const msgDiv = document.createElement('div');
    msgDiv.className = 'ai-chat-msg ai-chat-msg--bot';
    msgDiv.innerHTML = html;
    chatMessages.appendChild(msgDiv);
    scrollToBottom();
  }

  // Show typing indicator
  function showTypingIndicator() {
    // Prevent duplicate indicators
    if (document.getElementById('ai-chat-typing')) return;

    const typingDiv = document.createElement('div');
    typingDiv.id = 'ai-chat-typing';
    typingDiv.className = 'ai-chat-msg ai-chat-msg--bot ai-chat-msg__typing';
    typingDiv.innerHTML = `
      <span class="ai-chat-msg__typing-dot"></span>
      <span class="ai-chat-msg__typing-dot"></span>
      <span class="ai-chat-msg__typing-dot"></span>
    `;
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
  }

  // Remove typing indicator
  function removeTypingIndicator() {
    const indicator = document.getElementById('ai-chat-typing');
    if (indicator) {
      indicator.remove();
    }
  }

  // Auto scroll to bottom
  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Keyword-matching chatbot knowledge base
  function getBotResponse(query) {
    const q = query.toLowerCase();

    // Check for greetings
    if (/\b(hi|hello|hey|namaste|greetings|good morning|good afternoon)\b/.test(q)) {
      return "Hello! I am the PACE AI Assistant. How can I help you today?";
    }

    // Check for services
    if (/\b(service|services|do you do|architect|architecture|structural|engineering|infrastructure|supervision|design|interior|management|feasibility|valuation)\b/.test(q)) {
      return `PACE Consultant offers expert services in:<br><br>
              • <strong>Architectural Design</strong> (Residential & Commercial)<br>
              • <strong>Structural Engineering</strong> (Seismic design & retrofitting)<br>
              • <strong>Infrastructure Supervision</strong> (Roads, water supply, bridges)<br>
              • <strong>Project Management</strong> & Feasibility Studies<br>
              • <strong>Interior Design</strong> & Property Valuation.<br><br>
              Which of these services are you interested in?`;
    }

    // Check for projects
    if (/\b(project|projects|work|portfolio|done|complete|track record|examples|experience)\b/.test(q)) {
      return `Since 2001, we have successfully delivered over 200 projects across Nepal! Some notable examples include:<br><br>
              • <strong>Residential</strong>: Multi-unit housing & private villa engineering reviews.<br>
              • <strong>Institutional</strong>: Public facilities and building structural safety support.<br>
              • <strong>Commercial</strong>: High-rise building design packages & site supervision.<br><br>
              You can check out our featured work details directly on our <a href="projects.html">Projects Page</a>!`;
    }

    // Check for contact / location / email
    if (/\b(contact|email|phone|number|address|location|where|office|map|hours|time|reach)\b/.test(q)) {
      return `Here are our contact and location details:<br><br>
              📍 <strong>Address</strong>: Maharajgunj, Kathmandu, Nepal (Opposite area of President's Residence)<br>
              📞 <strong>Phone</strong>: <a href="tel:+97714720565">+977-1-4720565</a><br>
              ✉️ <strong>Email</strong>: <a href="mailto:paceconsultant@gmail.com">paceconsultant@gmail.com</a><br>
              ⏰ <strong>Office Hours</strong>: Sun–Fri, 9:00 AM – 6:00 PM<br><br>
              You can also send us a direct message via the contact form on our <a href="contact.html">Contact Page</a>!`;
    }

    // Check for pricing / cost
    if (/\b(price|cost|quote|charge|fee|fees|estimate|payment)\b/.test(q)) {
      return `We tailor our consultancy fees based on the scope, scale, and complexity of your project. 
              To receive a customized cost estimate or quote, please reach out to us at 
              <a href="mailto:paceconsultant@gmail.com">paceconsultant@gmail.com</a> or call 
              <a href="tel:+97714720565">+977-1-4720565</a>. We'd be happy to discuss details!`;
    }

    // Fallback response
    return `Thank you for your message! I'm still learning about some details. 
            For any specific project inquiries, technical requests, or quotes, 
            please get in touch with our team at <a href="mailto:paceconsultant@gmail.com">paceconsultant@gmail.com</a> 
            or call <a href="tel:+97714720565">+977-1-4720565</a>. We'll be glad to help!`;
  }
});
