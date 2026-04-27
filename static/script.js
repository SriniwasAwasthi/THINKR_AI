document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('getStartedBtn');
    const orb = document.querySelector('.orb');

    if (btn && orb) {
        // Interactive hover effect for the CTA button
        btn.addEventListener('mouseenter', () => {
            orb.style.filter = 'blur(60px)';
            orb.style.transform = 'scale(1.1)';
            orb.style.opacity = '0.8';
        });

        btn.addEventListener('mouseleave', () => {
            orb.style.filter = 'blur(40px)';
            orb.style.transform = 'scale(1)';
            orb.style.opacity = '0.6';
        });

        // Smooth click animation on CTA button
        btn.addEventListener('click', () => {
            btn.textContent = 'Initializing...';
            btn.style.opacity = '0.8';
            setTimeout(() => {
                btn.textContent = 'Get Started';
                btn.style.opacity = '1';
                window.location.href = 'signup.html';
            }, 600);
        });
    }
    
    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href'))?.scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Active Nav Link Highlighting ---
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('nav a').forEach(link => {
        const href = link.getAttribute('href');
        if (href && currentPage === href) {
            link.classList.add('nav-active');
        }
    });

    // --- AI Agent Logic ---
    const agentTrigger = document.getElementById('agentTrigger');
    const agentChatWindow = document.getElementById('agentChatWindow');
    const closeAgentBtn = document.getElementById('closeAgentBtn');
    const agentMessages = document.getElementById('agentMessages');

    if (agentTrigger && agentChatWindow) {
        let hasOpened = false;

        agentTrigger.addEventListener('click', () => {
            agentChatWindow.classList.add('active');
            agentTrigger.style.display = 'none';
            
            if (!hasOpened) {
                hasOpened = true;
                simulateAgentGreeting();
            }
        });

        closeAgentBtn.addEventListener('click', () => {
            agentChatWindow.classList.remove('active');
            setTimeout(() => {
                agentTrigger.style.display = 'flex';
            }, 300);
        });

        function addMessage(html, isUser = false) {
            const msgDiv = document.createElement('div');
            msgDiv.className = 'agent-message';
            if (isUser) {
                msgDiv.style.background = 'rgba(99, 102, 241, 0.2)';
                msgDiv.style.border = '1px solid rgba(99, 102, 241, 0.4)';
                msgDiv.style.alignSelf = 'flex-end';
                msgDiv.style.borderTopLeftRadius = '12px';
                msgDiv.style.borderTopRightRadius = '2px';
                // Use textContent for user messages to prevent XSS
                msgDiv.textContent = html;
            } else {
                // Use innerHTML for AI messages (already sanitized by renderMarkdown)
                msgDiv.innerHTML = html;
            }
            agentMessages.appendChild(msgDiv);
            agentMessages.scrollTop = agentMessages.scrollHeight;
        }

        function showTyping() {
            const typingDiv = document.createElement('div');
            typingDiv.className = 'agent-message agent-typing';
            typingDiv.id = 'agentTyping';
            typingDiv.innerHTML = '<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
            agentMessages.appendChild(typingDiv);
            agentMessages.scrollTop = agentMessages.scrollHeight;
        }

        function removeTyping() {
            const typingDiv = document.getElementById('agentTyping');
            if (typingDiv) typingDiv.remove();
        }

        function simulateAgentGreeting() {
            showTyping();
            
            setTimeout(() => {
                removeTyping();
                const pagePath = window.location.pathname;
                let greeting = "Hello! I'm THINKR Core. I'm here to analyze your workflow and optimize your intelligence tasks.";
                
                if (pagePath.includes('study-plan')) {
                    greeting = "Welcome to the Study Plan generator! Tell me what you need to learn, and my neural networks will build an optimal cognitive pathway for you.";
                } else if (pagePath.includes('profile')) {
                    greeting = "Welcome back to your Dashboard! I've been tracking your progress. You're doing great on your current streak. 🔥";
                } else if (pagePath.includes('signup')) {
                    greeting = "Creating an account is the first step to unlocking true next-gen intelligence. Need help filling this out?";
                }
                
                addMessage(greeting);
                
                // Add follow up after a moment
                setTimeout(() => {
                    showTyping();
                    setTimeout(() => {
                        removeTyping();
                        addMessage("Let me know if you need any assistance exploring the UI.");
                    }, 1500);
                }, 2000);
                
            }, 1200);
        }

        const agentInput = document.getElementById('agentInput');
        const agentSendBtn = document.getElementById('agentSendBtn');
        const OPENAI_API_KEY = 'YOUR_GROQ_API_KEY_HERE'; // Replace with your actual Groq API key

        let conversationHistory = [
            { role: "system", content: `You are THINKR Core, an elite AI study assistant on the THINKR AI platform. Follow these STRICT formatting rules for EVERY response:
- Always respond using bullet points (•) or numbered lists
- Use **bold** for key terms or headings
- Keep each bullet point SHORT (max 1 line)
- Use relevant emojis at the start of each point to make it visual (📚 🎯 ✅ 💡 ⚡ 🔥 🧠 📌)
- Never write long paragraphs — break everything into scannable points
- Start with a one-line bold summary, then list the key points
Example format:
**Here's your study breakdown:**
📚 Focus on core concepts first
🎯 Practice 5 problems per topic
⚡ Take a 10-min break every hour` }
        ];

        async function handleSend() {
            if (!agentInput || !agentSendBtn) return;
            const text = agentInput.value.trim();
            if (!text) return;

            addMessage(text, true);
            agentInput.value = '';
            showTyping();

            conversationHistory.push({ role: "user", content: text });

            try {
                const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${OPENAI_API_KEY}`
                    },
                    body: JSON.stringify({
                        model: "llama-3.1-8b-instant",
                        messages: conversationHistory
                    })
                });

                removeTyping();

                if (!response.ok) {
                    throw new Error(`API Error: ${response.status}`);
                }

                const data = await response.json();
                const aiResponse = data.choices[0].message.content;
                conversationHistory.push({ role: "assistant", content: aiResponse });
                addMessage(renderMarkdown(aiResponse));

            } catch (error) {
                removeTyping();
                addMessage(renderMarkdown("**Connection Issue** ⚡\n- Could not reach the AI right now\n- Check your internet connection\n- The API key may need to be refreshed"));
                console.error('Groq API Error:', error);
            }
        }

        // ✅ Markdown-to-HTML renderer for attractive chat formatting
        function renderMarkdown(text) {
            return text
                // Bold: **text** → <strong>
                .replace(/\*\*(.+?)\*\*/g, '<strong style="color:#a5b4fc;">$1</strong>')
                // Headings: ## text
                .replace(/^#{1,3}\s+(.+)$/gm, '<div style="font-weight:700;color:#818cf8;margin:0.6rem 0 0.3rem;">$1</div>')
                // Bullet points: - or • item
                .replace(/^[\-•]\s+(.+)$/gm, '<div style="display:flex;gap:0.4rem;margin:0.25rem 0;"><span style="color:#6366f1;flex-shrink:0;">›</span><span>$1</span></div>')
                // Numbered list: 1. item
                .replace(/^(\d+)\.\s+(.+)$/gm, '<div style="display:flex;gap:0.4rem;margin:0.25rem 0;"><span style="color:#6366f1;font-weight:600;flex-shrink:0;">$1.</span><span>$2</span></div>')
                // Line breaks
                .replace(/\n{2,}/g, '<br>')
                .replace(/\n/g, '<br>');
        }

        if (agentSendBtn && agentInput) {
            agentSendBtn.addEventListener('click', handleSend);
            agentInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') handleSend();
            });
        }
    }
});
