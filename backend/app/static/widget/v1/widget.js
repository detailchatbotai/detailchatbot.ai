/**
 * DetailChatbot.ai Widget v1.0
 * Professional auto detailing chatbot widget
 */
(function() {
  'use strict';

  // Widget configuration
  const config = {
    ...{
      position: 'bottom-right',
      theme: 'light',
      primaryColor: '#3B82F6',
      greeting: 'Hi! How can we help you with your detailing services?',
      placeholder: 'Ask about pricing, packages, or booking...',
      showBranding: true,
      apiUrl: window.location.protocol === 'https:' ? 'https://' : 'http://' + 'localhost:8000'
    },
    ...window.ChatbotAiConfig
  };

  // Widget state
  let isOpen = false;
  let messages = [];
  let widgetContainer = null;

  // Create widget HTML structure
  function createWidget() {
    // Main container
    widgetContainer = document.createElement('div');
    widgetContainer.id = 'detailchatbot-widget';
    widgetContainer.className = 'dcb-widget-container';
    
    // Chat button
    const chatButton = createChatButton();
    
    // Chat window
    const chatWindow = createChatWindow();
    
    widgetContainer.appendChild(chatButton);
    widgetContainer.appendChild(chatWindow);
    
    // Add styles
    injectStyles();
    
    // Add event listeners
    attachEventListeners();
    
    document.body.appendChild(widgetContainer);
    
    // Initialize with greeting
    addMessage(config.greeting, false);
  }

  function createChatButton() {
    const button = document.createElement('div');
    button.className = 'dcb-chat-button';
    button.innerHTML = `
      <svg class="dcb-chat-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
      </svg>
      <div class="dcb-notification-dot"></div>
    `;
    return button;
  }

  function createChatWindow() {
    const window = document.createElement('div');
    window.className = 'dcb-chat-window';
    window.innerHTML = `
      <div class="dcb-chat-header">
        <div class="dcb-header-info">
          <div class="dcb-avatar">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 3.5L9 7V9L15 6.5L21 9ZM16 12C16 13.1 15.1 14 14 14S12 13.1 12 12 12.9 10 14 10 16 10.9 16 12ZM12 13.5C10.5 13.5 9 14 9 14V16H15V14S13.5 13.5 12 13.5Z"/>
            </svg>
          </div>
          <div class="dcb-bot-info">
            <div class="dcb-bot-name">DetailChatbot</div>
            <div class="dcb-bot-status">Online now</div>
          </div>
        </div>
        <button class="dcb-close-button">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>
      </div>
      <div class="dcb-messages-container">
        <div class="dcb-messages"></div>
      </div>
      <div class="dcb-input-container">
        <div class="dcb-input-wrapper">
          <input type="text" class="dcb-message-input" placeholder="${config.placeholder}" maxlength="500">
          <button class="dcb-send-button">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
            </svg>
          </button>
        </div>
        ${config.showBranding ? `
          <div class="dcb-branding">
            Powered by <strong>DetailChatbot.ai</strong>
          </div>
        ` : ''}
      </div>
    `;
    return window;
  }

  function attachEventListeners() {
    const chatButton = widgetContainer.querySelector('.dcb-chat-button');
    const closeButton = widgetContainer.querySelector('.dcb-close-button');
    const messageInput = widgetContainer.querySelector('.dcb-message-input');
    const sendButton = widgetContainer.querySelector('.dcb-send-button');

    chatButton.addEventListener('click', toggleChat);
    closeButton.addEventListener('click', closeChat);
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', handleKeyPress);
    messageInput.addEventListener('input', handleInput);

    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isOpen) {
        closeChat();
      }
    });
  }

  function toggleChat() {
    isOpen = !isOpen;
    const chatWindow = widgetContainer.querySelector('.dcb-chat-window');
    const notificationDot = widgetContainer.querySelector('.dcb-notification-dot');
    
    if (isOpen) {
      chatWindow.classList.add('dcb-open');
      notificationDot.style.display = 'none';
      focusInput();
    } else {
      chatWindow.classList.remove('dcb-open');
    }
  }

  function closeChat() {
    isOpen = false;
    const chatWindow = widgetContainer.querySelector('.dcb-chat-window');
    chatWindow.classList.remove('dcb-open');
  }

  function focusInput() {
    setTimeout(() => {
      const input = widgetContainer.querySelector('.dcb-message-input');
      if (input && window.innerWidth > 768) { // Don't auto-focus on mobile
        input.focus();
      }
    }, 300);
  }

  function handleKeyPress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  function handleInput(e) {
    const sendButton = widgetContainer.querySelector('.dcb-send-button');
    sendButton.disabled = !e.target.value.trim();
  }

  async function sendMessage() {
    const input = widgetContainer.querySelector('.dcb-message-input');
    const message = input.value.trim();
    
    if (!message) return;

    // Add user message
    addMessage(message, true);
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
      const response = await sendToAPI(message);
      hideTypingIndicator();
      addMessage(response, false);
    } catch (error) {
      hideTypingIndicator();
      addMessage('Sorry, I\'m having trouble right now. Please try again later.', false);
      console.error('Chat error:', error);
    }
  }

  async function sendToAPI(message) {
    const chatMessages = [
      ...messages.slice(-10), // Keep last 10 messages for context
      { role: 'user', content: message }
    ];

    const response = await fetch(`${config.apiUrl}/api/v1/chat/${config.shopId}/public`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: chatMessages
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();
    return data.reply;
  }

  function addMessage(content, isUser) {
    const messagesContainer = widgetContainer.querySelector('.dcb-messages');
    const messageEl = document.createElement('div');
    messageEl.className = `dcb-message ${isUser ? 'dcb-user-message' : 'dcb-bot-message'}`;
    
    messageEl.innerHTML = `
      <div class="dcb-message-content">${escapeHtml(content)}</div>
      <div class="dcb-message-time">${formatTime(new Date())}</div>
    `;
    
    messagesContainer.appendChild(messageEl);
    scrollToBottom();
    
    // Store in messages array
    messages.push({
      role: isUser ? 'user' : 'assistant',
      content: content
    });
  }

  function showTypingIndicator() {
    const messagesContainer = widgetContainer.querySelector('.dcb-messages');
    const typingEl = document.createElement('div');
    typingEl.className = 'dcb-message dcb-bot-message dcb-typing';
    typingEl.innerHTML = `
      <div class="dcb-message-content">
        <div class="dcb-typing-dots">
          <div class="dcb-dot"></div>
          <div class="dcb-dot"></div>
          <div class="dcb-dot"></div>
        </div>
      </div>
    `;
    messagesContainer.appendChild(typingEl);
    scrollToBottom();
  }

  function hideTypingIndicator() {
    const typing = widgetContainer.querySelector('.dcb-typing');
    if (typing) {
      typing.remove();
    }
  }

  function scrollToBottom() {
    const container = widgetContainer.querySelector('.dcb-messages-container');
    container.scrollTop = container.scrollHeight;
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function injectStyles() {
    if (document.getElementById('dcb-widget-styles')) return;
    
    const style = document.createElement('style');
    style.id = 'dcb-widget-styles';
    style.textContent = `
      .dcb-widget-container {
        position: fixed;
        ${config.position.includes('right') ? 'right: 20px;' : 'left: 20px;'}
        ${config.position.includes('bottom') ? 'bottom: 20px;' : 'top: 20px;'}
        z-index: 9999;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        font-size: 14px;
        line-height: 1.4;
      }

      .dcb-chat-button {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        background: linear-gradient(135deg, ${config.primaryColor}, ${adjustColor(config.primaryColor, -20)});
        box-shadow: 0 4px 20px ${config.primaryColor}40;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
        position: relative;
        border: none;
      }

      .dcb-chat-button:hover {
        transform: scale(1.1);
        box-shadow: 0 6px 25px ${config.primaryColor}60;
      }

      .dcb-chat-icon {
        width: 24px;
        height: 24px;
        color: white;
      }

      .dcb-notification-dot {
        position: absolute;
        top: 8px;
        right: 8px;
        width: 12px;
        height: 12px;
        background: #EF4444;
        border-radius: 50%;
        border: 2px solid white;
        animation: dcb-pulse 2s infinite;
      }

      @keyframes dcb-pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }

      .dcb-chat-window {
        position: absolute;
        bottom: 70px;
        ${config.position.includes('right') ? 'right: 0;' : 'left: 0;'}
        width: 350px;
        height: 500px;
        background: white;
        border-radius: 16px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.15);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transform: translateY(10px) scale(0.95);
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        border: 1px solid #E5E7EB;
      }

      .dcb-chat-window.dcb-open {
        transform: translateY(0) scale(1);
        opacity: 1;
        visibility: visible;
      }

      .dcb-chat-header {
        background: linear-gradient(135deg, ${config.primaryColor}, ${adjustColor(config.primaryColor, -15)});
        color: white;
        padding: 16px;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }

      .dcb-header-info {
        display: flex;
        align-items: center;
      }

      .dcb-avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: rgba(255,255,255,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 12px;
      }

      .dcb-avatar svg {
        width: 18px;
        height: 18px;
      }

      .dcb-bot-name {
        font-weight: 600;
        font-size: 14px;
        margin-bottom: 2px;
      }

      .dcb-bot-status {
        font-size: 12px;
        opacity: 0.9;
      }

      .dcb-close-button {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 4px;
        border-radius: 4px;
        transition: background 0.2s;
      }

      .dcb-close-button:hover {
        background: rgba(255,255,255,0.1);
      }

      .dcb-close-button svg {
        width: 20px;
        height: 20px;
      }

      .dcb-messages-container {
        flex: 1;
        overflow-y: auto;
        background: #F8FAFC;
        padding: 0;
      }

      .dcb-messages {
        padding: 16px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }

      .dcb-message {
        display: flex;
        flex-direction: column;
      }

      .dcb-user-message {
        align-items: flex-end;
      }

      .dcb-bot-message {
        align-items: flex-start;
      }

      .dcb-message-content {
        padding: 12px 16px;
        border-radius: 18px;
        max-width: 80%;
        word-wrap: break-word;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
      }

      .dcb-user-message .dcb-message-content {
        background: ${config.primaryColor};
        color: white;
        border-bottom-right-radius: 4px;
      }

      .dcb-bot-message .dcb-message-content {
        background: white;
        color: #1F2937;
        border-bottom-left-radius: 4px;
      }

      .dcb-message-time {
        font-size: 11px;
        color: #64748B;
        margin-top: 4px;
        padding: 0 8px;
      }

      .dcb-typing-dots {
        display: flex;
        gap: 4px;
        padding: 8px 0;
      }

      .dcb-dot {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: #64748B;
        animation: dcb-typing 1.4s infinite;
      }

      .dcb-dot:nth-child(2) { animation-delay: 0.2s; }
      .dcb-dot:nth-child(3) { animation-delay: 0.4s; }

      @keyframes dcb-typing {
        0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
        30% { opacity: 1; transform: translateY(-4px); }
      }

      .dcb-input-container {
        padding: 16px;
        background: white;
        border-top: 1px solid #E5E7EB;
      }

      .dcb-input-wrapper {
        display: flex;
        gap: 8px;
        margin-bottom: ${config.showBranding ? '12px' : '0'};
      }

      .dcb-message-input {
        flex: 1;
        padding: 12px 16px;
        border: 1px solid #E5E7EB;
        border-radius: 20px;
        outline: none;
        font-size: 14px;
        transition: border-color 0.2s;
      }

      .dcb-message-input:focus {
        border-color: ${config.primaryColor};
      }

      .dcb-send-button {
        width: 40px;
        height: 40px;
        background: ${config.primaryColor};
        border: none;
        border-radius: 50%;
        color: white;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s;
      }

      .dcb-send-button:hover {
        background: ${adjustColor(config.primaryColor, -10)};
        transform: scale(1.05);
      }

      .dcb-send-button:disabled {
        opacity: 0.5;
        cursor: not-allowed;
        transform: none;
      }

      .dcb-send-button svg {
        width: 16px;
        height: 16px;
      }

      .dcb-branding {
        text-align: center;
        font-size: 11px;
        color: #64748B;
      }

      /* Mobile responsive styles */
      @media (max-width: 480px) {
        .dcb-widget-container {
          right: 10px !important;
          left: 10px !important;
          bottom: 10px !important;
        }

        .dcb-chat-window {
          width: calc(100vw - 20px);
          height: calc(100vh - 100px);
          max-height: 600px;
          ${config.position.includes('right') ? 'right: -10px;' : 'left: -10px;'}
        }

        .dcb-chat-button {
          right: 0 !important;
        }
      }

      @media (max-height: 600px) {
        .dcb-chat-window {
          height: calc(100vh - 80px);
        }
      }
    `;
    
    document.head.appendChild(style);
  }

  // Helper function to adjust color brightness
  function adjustColor(hex, percent) {
    const num = parseInt(hex.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  }

  // Initialize widget when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWidget);
  } else {
    createWidget();
  }

  // Cleanup function for SPA compatibility
  window.DetailChatbotWidget = {
    destroy: function() {
      if (widgetContainer) {
        widgetContainer.remove();
        const styles = document.getElementById('dcb-widget-styles');
        if (styles) styles.remove();
      }
    }
  };

})();