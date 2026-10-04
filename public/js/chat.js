(() => {
  const panel = document.getElementById('ai-chat-panel');
  const toggle = document.querySelector('.ai-chat-toggle');
  const close = document.querySelector('.ai-chat-close');
  const form = document.getElementById('ai-chat-form');
  const input = document.getElementById('ai-chat-query');
  const messages = document.getElementById('ai-chat-messages');
  if (!panel || !toggle || !form || !input || !messages) return;

  const setOpen = (open) => {
    panel.hidden = !open;
    toggle.setAttribute('aria-expanded', String(open));
    if (open) input.focus();
  };

  const addMessage = (text, role, isError = false) => {
    const message = document.createElement('p');
    message.className = `ai-chat-message ${role}${isError ? ' error' : ''}`;
    message.textContent = text;
    messages.appendChild(message);
    messages.scrollTop = messages.scrollHeight;
    return message;
  };

  toggle.addEventListener('click', () => setOpen(panel.hidden));
  close?.addEventListener('click', () => setOpen(false));

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = input.value.trim();
    if (!query || query.length > 1000) return;

    addMessage(query, 'user');
    input.value = '';
    input.disabled = true;
    form.querySelector('button').disabled = true;
    const pending = addMessage('Thinking…', 'assistant');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'The assistant is unavailable right now.');
      pending.textContent = data.answer || 'I could not create an answer. Please try again.';
    } catch (error) {
      pending.textContent = error.message || 'The assistant is unavailable right now.';
      pending.classList.add('error');
    } finally {
      input.disabled = false;
      form.querySelector('button').disabled = false;
      input.focus();
      messages.scrollTop = messages.scrollHeight;
    }
  });
})();
