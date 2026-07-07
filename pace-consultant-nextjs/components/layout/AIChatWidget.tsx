'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCommentDots, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { siteConfig } from '@/lib/data/site';

interface Message {
  id: number;
  sender: 'user' | 'bot';
  text: string;
}

export function AIChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const welcomeSent = useRef(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle first open event to send bot greeting
  useEffect(() => {
    if (isOpen && !welcomeSent.current) {
      welcomeSent.current = true;
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        setMessages([
          {
            id: Date.now(),
            sender: 'bot',
            text: 'Hello! I’m the PACE AI Assistant. How can I help you today?',
          },
        ]);
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    // Add user message
    const userMsgId = Date.now();
    setMessages((prev) => [
      ...prev,
      { id: userMsgId, sender: 'user', text },
    ]);
    setInputValue('');

    // Simulate bot thinking
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botResponse = getBotResponse(text);
      setMessages((prev) => [
        ...prev,
        { id: Date.now(), sender: 'bot', text: botResponse },
      ]);
    }, 1200);
  };

  const getBotResponse = (query: string): string => {
    const q = query.toLowerCase();

    // Check for greetings
    if (/\b(hi|hello|hey|namaste|greetings|good morning|good afternoon)\b/.test(q)) {
      return 'Hello! I am the PACE AI Assistant. How can I help you today?';
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
              You can check out our featured work details directly on our <a href="/projects" class="text-primary hover:text-secondary font-semibold underline">Projects Page</a>!`;
    }

    // Check for contact / location / email
    if (/\b(contact|email|phone|number|address|location|where|office|map|hours|time|reach)\b/.test(q)) {
      return `Here are our contact and location details:<br><br>
              📍 <strong>Address</strong>: ${siteConfig.address.street}, ${siteConfig.address.city}, Nepal (Opposite President's Residence area)<br>
              📞 <strong>Phone</strong>: <a href="tel:${siteConfig.phone.office.replace(/-/g, '')}" class="text-primary hover:text-secondary font-semibold underline">${siteConfig.phone.office}</a><br>
              ✉️ <strong>Email</strong>: <a href="mailto:${siteConfig.email}" class="text-primary hover:text-secondary font-semibold underline">${siteConfig.email}</a><br>
              ⏰ <strong>Office Hours</strong>: Sun–Fri, 9:00 AM – 6:00 PM<br><br>
              You can also send us a direct message via the contact form on our <a href="/contact" class="text-primary hover:text-secondary font-semibold underline">Contact Page</a>!`;
    }

    // Check for pricing / cost
    if (/\b(price|cost|quote|charge|fee|fees|estimate|payment)\b/.test(q)) {
      return `We tailor our consultancy fees based on the scope, scale, and complexity of your project. 
              To receive a customized cost estimate or quote, please reach out to us at 
              <a href="mailto:${siteConfig.email}" class="text-primary hover:text-secondary font-semibold underline">${siteConfig.email}</a> or call 
              <a href="tel:${siteConfig.phone.office.replace(/-/g, '')}" class="text-primary hover:text-secondary font-semibold underline">${siteConfig.phone.office}</a>. We'd be happy to discuss details!`;
    }

    // Fallback response
    return `Thank you for your message! I'm still learning about some details. 
            For any specific project inquiries, technical requests, or quotes, 
            please get in touch with our team at <a href="mailto:${siteConfig.email}" class="text-primary hover:text-secondary font-semibold underline">${siteConfig.email}</a> 
            or call <a href="tel:${siteConfig.phone.office.replace(/-/g, '')}" class="text-primary hover:text-secondary font-semibold underline">${siteConfig.phone.office}</a>. We'll be glad to help!`;
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-[13rem] right-4 md:bottom-[13.5rem] md:right-6 z-[998] group flex items-center justify-center"
        aria-label="Open PACE AI Assistant"
        aria-expanded={isOpen}
      >
        {/* Tooltip */}
        <span className="absolute right-16 scale-0 group-hover:scale-100 transition-all duration-200 origin-right bg-primary text-white text-xs font-semibold px-3 py-2 rounded-md shadow-card whitespace-nowrap font-sans">
          AI Assistant
        </span>

        {/* Ripple/Ping ring when chat is closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-primary/40 animate-ping opacity-75 group-hover:animate-none" />
        )}

        {/* Circular button */}
        <div className="relative flex h-12 w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-primary text-white shadow-card transition-all duration-300 group-hover:bg-secondary group-hover:scale-110 group-hover:shadow-card-hover group-active:scale-95">
          <FaCommentDots className="h-6 w-6 md:h-7 md:w-7 transition-transform duration-300 group-hover:rotate-12" />
        </div>
      </button>

      {/* Chat Window Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed bottom-[16.5rem] right-4 md:bottom-[17.5rem] md:right-6 z-[999] flex flex-col w-[calc(100vw-2rem)] md:w-[340px] h-[420px] md:h-[450px] max-h-[70vh] bg-white border border-gray-200 rounded-2xl shadow-card-hover overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-start justify-between bg-primary p-4 text-white">
              <div className="flex-1 pr-2">
                <h3 className="font-heading font-semibold text-base leading-snug">
                  PACE AI Assistant
                </h3>
                <p className="mt-1 font-sans text-[11px] leading-normal text-white/80">
                  Ask us about engineering consultancy, services, projects, or contact details.
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-secondary hover:scale-110 active:scale-95 transition-all p-1"
                aria-label="Close chat"
              >
                <FaTimes className="h-4 w-4" />
              </button>
            </div>

            {/* Message History */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-3 scroll-smooth">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-sm leading-relaxed ${
                    msg.sender === 'user'
                      ? 'self-end bg-primary text-white rounded-br-none shadow-sm'
                      : 'self-start bg-white text-text-dark border border-gray-200 rounded-bl-none shadow-xs'
                  }`}
                >
                  {msg.sender === 'bot' ? (
                    <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                  ) : (
                    msg.text
                  )}
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="self-start bg-white text-text-dark border border-gray-200 rounded-2xl rounded-bl-none px-3.5 py-2.5 shadow-xs flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <span className="w-1.5 h-1.5 bg-muted rounded-full animate-bounce" />
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 p-3 bg-white border-t border-gray-150"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all text-text-dark bg-white"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="flex items-center justify-center bg-secondary text-white rounded-full h-9 w-9 hover:bg-secondary-dark active:scale-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shrink-0"
                aria-label="Send message"
              >
                <FaPaperPlane className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
