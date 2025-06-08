#!/usr/bin/env python3
"""
Portfolio Generator Script
Generates HTML and JavaScript files from YAML configuration
Usage: python generate.py
"""

import yaml
import json
from pathlib import Path

def load_data():
    """Load data from YAML file"""
    with open('data.yaml', 'r', encoding='utf-8') as file:
        return yaml.safe_load(file)

def generate_ascii_art(name):
    """Generate ASCII art for the name"""
    # Generate ASCII art based on the actual name from YAML
    if "Lê Hiếu" in name or "Le Hieu" in name:
        return """██╗     ███████╗    ██╗  ██╗██╗███████╗██╗   ██╗
██║     ██╔════╝    ██║  ██║██║██╔════╝██║   ██║
██║     █████╗      ███████║██║█████╗  ██║   ██║
██║     ██╔══╝      ██╔══██║██║██╔══╝  ██║   ██║
███████╗███████╗    ██║  ██║██║███████╗╚██████╔╝
╚══════╝╚══════╝    ╚═╝  ╚═╝╚═╝╚══════╝ ╚═════╝"""
    else:
        # Fallback for other names - generate a simple ASCII banner
        clean_name = name.upper().replace("Ê", "E").replace("Ế", "E").replace("Ề", "E").replace("Ệ", "E").replace("Ể", "E")
        return f"""
   ╔══════════════════════════════════╗
   ║          {clean_name.center(20)}          ║
   ╚══════════════════════════════════╝
        """

def generate_skills_html(skills):
    """Generate skills section HTML"""
    skills_html = ""
    skill_categories = {
        'programming': 'Programming Languages',
        'cicd_automation': 'CI/CD & Automation',
        'operating_systems': 'Operating Systems',
        'containers_virtualization': 'Containers/Virtualization',
        'databases': 'Databases',
        'cloud_platforms': 'Cloud Platforms',
        'networking': 'Networking',
        'monitoring_logging': 'Monitoring/Logging',
        'security': 'Security',
        'registry_proxy': 'Registry & Proxy'
    }
    
    for category, title in skill_categories.items():
        if category in skills:
            skills_html += f'''
                        <div class="skill-category">
                            <h3 class="category-title">// {title}</h3>
                            <div class="skill-items">'''
            for skill in skills[category]:
                skills_html += f'\n                                <span class="skill-item">{skill}</span>'
            skills_html += '''
                            </div>
                        </div>
'''
    return skills_html

def generate_experience_html(experience):
    """Generate experience section HTML"""
    experience_html = ""
    for exp in experience:
        experience_html += f'''
                        <div class="log-entry">
                            <div class="log-timestamp">[{exp['period']}]</div>
                            <div class="log-content">
                                <h3 class="company">{exp['company']} — {exp['position']}</h3>
                                <p>{exp['description']}</p>
                            </div>
                        </div>
'''
    return experience_html

def generate_achievements_html(achievements):
    """Generate achievements section HTML"""
    achievements_text = ' • '.join([f'<strong>{achievement}</strong>' for achievement in achievements])
    return f'''
                        <div class="log-entry">
                            <div class="log-timestamp">[Achievements & Certifications]</div>
                            <div class="log-content">
                                <h3 class="company">Professional Achievements</h3>
                                <p>{achievements_text}</p>
                            </div>
                        </div>
'''

def generate_social_links_html(social):
    """Generate social links HTML"""
    social_icons = {
        'linkedin': ('💼', 'LinkedIn/googlesky'),
        'github': ('🐙', 'GitHub/googlesky'),
        'telegram': ('✈️', 'Telegram/googlesky'),
        'gitlab': ('🦊', 'GitLab/googlesky'),
        'bitbucket': ('🪣', 'Bitbucket/googlesky'),
        'stackoverflow': ('📚', 'StackOverflow/zu-vn')
    }
    
    social_html = ""
    for platform, (icon, text) in social_icons.items():
        if platform in social:
            social_html += f'''
                                <a href="{social[platform]}" target="_blank" class="social-link">
                                    <span class="social-icon">{icon}</span> {text}
                                </a>'''
    return social_html

def generate_html(data):
    """Generate HTML content"""
    personal = data['personal']
    skills = data['skills']
    experience = data['experience']
    achievements = data['achievements']
    social = data['social']
    
    ascii_art = generate_ascii_art(personal['name'])
    skills_html = generate_skills_html(skills)
    experience_html = generate_experience_html(experience)
    achievements_html = generate_achievements_html(achievements)
    social_links_html = generate_social_links_html(social)
    
    html_template = f'''<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{personal['name']} - {personal['title']}</title>
    <meta name="description" content="{personal['name']} - {personal['title']} professional with expertise in AWS, Azure, Kubernetes, Golang, Python, and cloud infrastructure.">
    <meta name="keywords" content="DevOps, SRE, Site Reliability Engineering, AWS, Azure, Kubernetes, Golang, Python, Docker, Terraform, CI/CD">
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <div class="terminal-container">
        <!-- Terminal Window Header -->
        <div class="terminal-header">
            <div class="terminal-controls">
                <span class="control close"></span>
                <span class="control minimize"></span>
                <span class="control maximize"></span>
            </div>
            <div class="terminal-title">{personal['username']}@{personal['terminal_name']}-terminal:~$ Professional Profile</div>
        </div>

        <!-- Terminal Content -->
        <div class="terminal-content">
            <!-- Welcome Section -->
            <section id="welcome" class="terminal-section">
                <div class="prompt">
                    <span class="user">{personal['username']}@{personal['terminal_name']}</span><span class="separator">:</span><span class="path">~</span><span class="dollar">$</span>
                </div>
                <div class="command-output">
                    <pre class="ascii-art">
{ascii_art}
                    </pre>
                    <div class="typing-text">
                        <p>{data['welcome_message']}</p>
                        <p>I'm {personal['name']}, a {personal['title']}</p>
                        <p>{data['tagline']}</p>
                        <p class="hint">Type 'help' to see available commands<span class="cursor">_</span></p>
                    </div>
                </div>
            </section>

            <!-- About Section -->
            <section id="about" class="terminal-section">
                <div class="prompt">
                    <span class="user">{personal['username']}@{personal['terminal_name']}</span><span class="separator">:</span><span class="path">~</span><span class="dollar">$</span>
                    <span class="command">cat about.txt</span>
                </div>
                <div class="command-output">
                    <div class="info-card">
                        <h2 class="section-title"># Professional Profile</h2>
                        <div class="profile-info">
                            <p><span class="label">Name:</span> {personal['name']}</p>
                            <p><span class="label">Title:</span> {personal['title']}</p>
                            <p><span class="label">Location:</span> {personal['location']}</p>
                            <p><span class="label">Email:</span> <a href="mailto:{personal['email']}">{personal['email']}</a></p>
                            <p><span class="label">Phone:</span> <a href="tel:+84975669775">{personal['phone']}</a></p>
                            <p><span class="label">Resume:</span> <a href="{personal['resume_file']}" target="_blank">{personal['resume_file']}</a></p>
                        </div>
                        <div class="social-links">
                            <h3>// Social Networks</h3>
                            <div class="social-grid">{social_links_html}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <!-- Skills Section -->
            <section id="skills" class="terminal-section">
                <div class="prompt">
                    <span class="user">{personal['username']}@{personal['terminal_name']}</span><span class="separator">:</span><span class="path">~</span><span class="dollar">$</span>
                    <span class="command">cat skills.json | jq '.'</span>
                </div>
                <div class="command-output">
                    <div class="skills-matrix">
                        <h2 class="section-title"># Technical Skills Matrix</h2>
                        {skills_html}
                    </div>
                </div>
            </section>

            <!-- Experience Section -->
            <section id="experience" class="terminal-section">
                <div class="prompt">
                    <span class="user">{personal['username']}@{personal['terminal_name']}</span><span class="separator">:</span><span class="path">~</span><span class="dollar">$</span>
                    <span class="command">tail -f /var/log/career.log</span>
                </div>
                <div class="command-output">
                    <div class="experience-timeline">
                        <h2 class="section-title"># Professional Experience</h2>
                        {experience_html}{achievements_html}
                    </div>
                </div>
            </section>

            <!-- Interactive Terminal -->
            <section id="terminal" class="terminal-section">
                <div class="interactive-terminal">
                    <h2 class="section-title"># Interactive Terminal</h2>
                    <div class="terminal-output" id="terminal-output"></div>
                    <div class="terminal-input-line">
                        <span class="prompt-inline">
                            <span class="user">visitor@{personal['username']}-terminal</span><span class="separator">:</span><span class="path">~</span><span class="dollar">$</span>
                        </span>
                        <input type="text" id="terminal-input" class="terminal-input" autocomplete="off" spellcheck="false">
                        <span class="terminal-cursor">_</span>
                    </div>
                </div>
            </section>

            <!-- Contact Section -->
            <section id="contact" class="terminal-section">
                <div class="prompt">
                    <span class="user">{personal['username']}@{personal['terminal_name']}</span><span class="separator">:</span><span class="path">~</span><span class="dollar">$</span>
                    <span class="command">echo "Ready for opportunities!"</span>
                </div>
                <div class="command-output">
                    <div class="contact-info">
                        <h2 class="section-title"># Let's Connect</h2>
                        <p class="cta-text">{data['cta_text']}</p>
                        <p class="cta-text">{data['cta_description']}</p>
                        
                        <div class="contact-methods">
                            <a href="mailto:{personal['email']}" class="contact-button">
                                📧 Send Email
                            </a>
                            <a href="tel:+84975669775" class="contact-button">
                                📞 Call Me
                            </a>
                            <a href="{personal['resume_file']}" target="_blank" class="contact-button">
                                📄 Download Resume
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- Terminal Footer -->
        <div class="terminal-footer">
            <div class="status-bar">
                <span class="status-item">Online</span>
                <span class="status-item">Available for hire</span>
                <span class="status-item" id="current-time"></span>
            </div>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>'''
    
    return html_template

def generate_skills_js(skills):
    """Generate skills content for JavaScript"""
    skills_content = []
    skill_categories = {
        'programming': 'Programming Languages',
        'cicd_automation': 'CI/CD & Automation',
        'operating_systems': 'Operating Systems',
        'containers_virtualization': 'Containers/Virtualization',
        'databases': 'Databases',
        'cloud_platforms': 'Cloud Platforms',
        'networking': 'Networking',
        'monitoring_logging': 'Monitoring/Logging',
        'security': 'Security',
        'registry_proxy': 'Registry & Proxy'
    }
    
    for category, title in skill_categories.items():
        if category in skills:
            skill_items = ', '.join(skills[category])
            skills_content.append(f'''                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">{title}:</h4>
                    <p style="color: #cccccc;">{skill_items}</p>
                </div>''')
    
    return '\n'.join(skills_content)

def generate_experience_js(experience, achievements):
    """Generate experience content for JavaScript"""
    experience_content = []
    for exp in experience:
        experience_content.append(f'''                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">{exp['company']} — {exp['position']} ({exp['period']})</h4>
                    <p style="color: #cccccc;">{exp['description']}</p>
                </div>''')
    
    # Add achievements
    achievements_text = ' • '.join([f'<strong>{achievement}</strong>' for achievement in achievements])
    experience_content.append(f'''                <div>
                    <h4 style="color: #ffff00;">Achievements & Certifications</h4>
                    <p style="color: #cccccc;">{achievements_text}</p>
                </div>''')
    
    return '\n'.join(experience_content)

def generate_projects_js(projects):
    """Generate projects content for JavaScript"""
    projects_content = []
    for project in projects:
        projects_content.append(f'''                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">{project['title']}</h4>
                    <p style="color: #cccccc;">{project['description']}</p>
                </div>''')
    
    return '\n'.join(projects_content[:-1]) + f'''                <div>
                    <h4 style="color: #ffff00;">{projects[-1]['title']}</h4>
                    <p style="color: #cccccc;">{projects[-1]['description']}</p>
                </div>'''

def generate_available_for_js(available_for):
    """Generate available for list for JavaScript"""
    items = '\n'.join([f'                    <li>{item}</li>' for item in available_for])
    return f'''                <ul style="color: #cccccc; margin-left: 20px;">
{items}
                </ul>'''

def generate_hire_reasons_js(hire_reasons):
    """Generate hire reasons for JavaScript"""
    items = '\n'.join([f'                    <li>{reason}</li>' for reason in hire_reasons])
    return f'''                <ul style="color: #cccccc; margin-left: 20px;">
{items}
                </ul>'''

def generate_javascript(data):
    """Generate JavaScript content"""
    personal = data['personal']
    skills = data['skills']
    experience = data['experience']
    projects = data['projects']
    available_for = data['available_for']
    hire_reasons = data['hire_reasons']
    
    skills_js = generate_skills_js(skills)
    experience_js = generate_experience_js(experience, data['achievements'])
    projects_js = generate_projects_js(projects)
    available_for_js = generate_available_for_js(available_for)
    hire_reasons_js = generate_hire_reasons_js(hire_reasons)
    
    js_template = f'''// Terminal Commands and Interactive Functionality
class TerminalEmulator {{
    constructor() {{
        this.terminalOutput = document.getElementById('terminal-output');
        this.terminalInput = document.getElementById('terminal-input');
        this.currentTimeElement = document.getElementById('current-time');
        
        this.commands = {{
            help: () => this.showHelp(),
            about: () => this.showAbout(),
            skills: () => this.showSkills(),
            experience: () => this.showExperience(),
            contact: () => this.showContact(),
            projects: () => this.showProjects(),
            clear: () => this.clearTerminal(),
            whoami: () => this.whoAmI(),
            pwd: () => this.printWorkingDirectory(),
            ls: () => this.listDirectory(),
            cat: (args) => this.catFile(args),
            echo: (args) => this.echo(args),
            date: () => this.showDate(),
            uptime: () => this.showUptime(),
            neofetch: () => this.showNeofetch(),
            social: () => this.showSocial(),
            resume: () => this.downloadResume(),
            hire: () => this.hireMe(),
            sudo: (args) => this.sudo(args)
        }};

        this.commandHistory = [];
        this.historyIndex = -1;
        this.startTime = new Date();

        this.init();
    }}

    init() {{
        this.setupEventListeners();
        this.updateTime();
        this.showWelcomeMessage();
        setInterval(() => this.updateTime(), 1000);
    }}

    setupEventListeners() {{
        this.terminalInput.addEventListener('keydown', (e) => {{
            if (e.key === 'Enter') {{
                this.processCommand();
            }} else if (e.key === 'ArrowUp') {{
                e.preventDefault();
                this.navigateHistory('up');
            }} else if (e.key === 'ArrowDown') {{
                e.preventDefault();
                this.navigateHistory('down');
            }} else if (e.key === 'Tab') {{
                e.preventDefault();
                this.autoComplete();
            }}
        }});

        // Focus input when clicking anywhere in terminal
        document.addEventListener('click', () => {{
            this.terminalInput.focus();
        }});

        // Initial focus
        this.terminalInput.focus();
    }}

    processCommand() {{
        const input = this.terminalInput.value.trim();
        if (!input) return;

        this.addToHistory(input);
        this.displayCommand(input);

        const [command, ...args] = input.toLowerCase().split(' ');
        
        if (this.commands[command]) {{
            this.commands[command](args);
        }} else {{
            this.displayOutput(`Command not found: ${{command}}. Type 'help' for available commands.`, 'error');
        }}

        this.terminalInput.value = '';
        this.scrollToBottom();
    }}

    displayCommand(command) {{
        const commandLine = document.createElement('div');
        commandLine.className = 'terminal-command-line';
        commandLine.innerHTML = `
            <span class="prompt-output">
                <span class="user">visitor@{personal['username']}-terminal</span><span class="separator">:</span><span class="path">~</span><span class="dollar">$</span>
            </span>
            <span class="command-text">${{command}}</span>
        `;
        this.terminalOutput.appendChild(commandLine);
    }}

    displayOutput(content, type = 'normal') {{
        const output = document.createElement('div');
        output.className = `terminal-output-line ${{type}}`;
        
        if (typeof content === 'string') {{
            output.innerHTML = content;
        }} else {{
            output.appendChild(content);
        }}
        
        this.terminalOutput.appendChild(output);
    }}

    addToHistory(command) {{
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;
    }}

    navigateHistory(direction) {{
        if (direction === 'up' && this.historyIndex > 0) {{
            this.historyIndex--;
            this.terminalInput.value = this.commandHistory[this.historyIndex];
        }} else if (direction === 'down' && this.historyIndex < this.commandHistory.length - 1) {{
            this.historyIndex++;
            this.terminalInput.value = this.commandHistory[this.historyIndex];
        }} else if (direction === 'down' && this.historyIndex === this.commandHistory.length - 1) {{
            this.historyIndex++;
            this.terminalInput.value = '';
        }}
    }}

    autoComplete() {{
        const input = this.terminalInput.value.toLowerCase();
        const availableCommands = Object.keys(this.commands);
        const matches = availableCommands.filter(cmd => cmd.startsWith(input));
        
        if (matches.length === 1) {{
            this.terminalInput.value = matches[0];
        }} else if (matches.length > 1) {{
            this.displayOutput(`Available commands: ${{matches.join(', ')}}`);
        }}
    }}

    scrollToBottom() {{
        this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
    }}

    updateTime() {{
        const now = new Date();
        this.currentTimeElement.textContent = now.toLocaleTimeString();
    }}

    // Command implementations
    showWelcomeMessage() {{
        this.displayOutput(`
            <div class="welcome-msg">
                <p style="color: #00ffff;">Welcome to {personal['name']}'s Interactive Terminal!</p>
                <p>Type <span style="color: #ffff00;">'help'</span> to see available commands.</p>
                <p style="color: #888; font-style: italic;">Tip: Use Tab for autocompletion, ↑↓ arrows for command history.</p>
            </div>
        `);
    }}

    showHelp() {{
        this.displayOutput(`
            <div class="help-content">
                <h3 style="color: #00ffff; margin-bottom: 15px;">Available Commands:</h3>
                <div style="display: grid; grid-template-columns: 150px 1fr; gap: 8px; color: #cccccc;">
                    <span style="color: #00ff00;">help</span><span>Show this help message</span>
                    <span style="color: #00ff00;">about</span><span>Display profile information</span>
                    <span style="color: #00ff00;">skills</span><span>Show technical skills</span>
                    <span style="color: #00ff00;">experience</span><span>Display work experience</span>
                    <span style="color: #00ff00;">projects</span><span>Show project portfolio</span>
                    <span style="color: #00ff00;">contact</span><span>Get contact information</span>
                    <span style="color: #00ff00;">social</span><span>Show social media links</span>
                    <span style="color: #00ff00;">resume</span><span>Download resume</span>
                    <span style="color: #00ff00;">hire</span><span>Why you should hire me</span>
                    <span style="color: #00ff00;">clear</span><span>Clear terminal screen</span>
                    <span style="color: #00ff00;">whoami</span><span>Display current user</span>
                    <span style="color: #00ff00;">pwd</span><span>Print working directory</span>
                    <span style="color: #00ff00;">ls</span><span>List directory contents</span>
                    <span style="color: #00ff00;">date</span><span>Show current date and time</span>
                    <span style="color: #00ff00;">uptime</span><span>Show system uptime</span>
                    <span style="color: #00ff00;">neofetch</span><span>Display system information</span>
                    <span style="color: #00ff00;">cat [file]</span><span>Display file contents</span>
                    <span style="color: #00ff00;">echo [text]</span><span>Display text</span>
                </div>
            </div>
        `);
    }}

    showAbout() {{
        this.displayOutput(`
            <div class="about-content">
                <h3 style="color: #00ffff; margin-bottom: 15px;">About {personal['name']}</h3>
                <p><span style="color: #00ff00;">Name:</span> {personal['name']}</p>
                <p><span style="color: #00ff00;">Title:</span> {personal['title']}</p>
                <p><span style="color: #00ff00;">Email:</span> {personal['email']}</p>
                <p><span style="color: #00ff00;">Phone:</span> {personal['phone']}</p>
                <p><span style="color: #00ff00;">Location:</span> {personal['location']}</p>
                <p><span style="color: #00ff00;">Experience:</span> 8+ years in DevOps, SRE, and System Administration</p>
                <p style="margin-top: 15px; color: #cccccc;">
                    Passionate about cloud infrastructure, automation, AI/ML platforms, security, and building reliable systems at scale.
                    Experienced with AWS, Azure, Kubernetes, Docker, Terraform, Golang, Python, and various cloud technologies.
                </p>
            </div>
        `);
    }}

    showSkills() {{
        this.displayOutput(`
            <div class="skills-content">
                <h3 style="color: #00ffff; margin-bottom: 15px;">Technical Skills</h3>
{skills_js}
            </div>
        `);
    }}

    showExperience() {{
        this.displayOutput(`
            <div class="experience-content">
                <h3 style="color: #00ffff; margin-bottom: 15px;">Professional Experience</h3>
{experience_js}
            </div>
        `);
    }}

    showProjects() {{
        this.displayOutput(`
            <div class="projects-content">
                <h3 style="color: #00ffff; margin-bottom: 15px;">Notable Projects</h3>
{projects_js}
            </div>
        `);
    }}

    showContact() {{
        this.displayOutput(`
            <div class="contact-content">
                <h3 style="color: #00ffff; margin-bottom: 15px;">Contact Information</h3>
                <p><span style="color: #00ff00;">📧 Email:</span> <a href="mailto:{personal['email']}" style="color: #ffff00;">{personal['email']}</a></p>
                <p><span style="color: #00ff00;">📞 Phone:</span> <a href="tel:+84975669775" style="color: #ffff00;">{personal['phone']}</a></p>
                <p><span style="color: #00ff00;">🌍 Location:</span> {personal['location']}</p>
                <p><span style="color: #00ff00;">📄 Resume:</span> <a href="{personal['resume_file']}" target="_blank" style="color: #ffff00;">Download PDF</a></p>
                <br>
                <p style="color: #00ffff;">💡 Available for:</p>
{available_for_js}
            </div>
        `);
    }}

    showSocial() {{
        this.displayOutput(`
            <div class="social-content">
                <h3 style="color: #00ffff; margin-bottom: 15px;">Social Networks</h3>
                <p><span style="color: #00ff00;">💼 LinkedIn:</span> <a href="{data['social']['linkedin']}" target="_blank" style="color: #ffff00;">linkedin.com/in/googlesky</a></p>
                <p><span style="color: #00ff00;">🐙 GitHub:</span> <a href="{data['social']['github']}" target="_blank" style="color: #ffff00;">github.com/googlesky</a></p>
                <p><span style="color: #00ff00;">✈️ Telegram:</span> <a href="{data['social']['telegram']}" target="_blank" style="color: #ffff00;">t.me/googlesky</a></p>
                <p><span style="color: #00ff00;">🦊 GitLab:</span> <a href="{data['social']['gitlab']}" target="_blank" style="color: #ffff00;">gitlab.com/googlesky</a></p>
                <p><span style="color: #00ff00;">🪣 Bitbucket:</span> <a href="{data['social']['bitbucket']}" target="_blank" style="color: #ffff00;">bitbucket.org/googlesky</a></p>
                <p><span style="color: #00ff00;">📚 Stack Overflow:</span> <a href="{data['social']['stackoverflow']}" target="_blank" style="color: #ffff00;">stackoverflow.com/users/9845363/zu-vn</a></p>
            </div>
        `);
    }}

    downloadResume() {{
        this.displayOutput(`
            <div class="resume-content">
                <p style="color: #00ffff;">📄 Opening resume download...</p>
                <p style="color: #cccccc;">File: {personal['resume_file']}</p>
                <p><a href="{personal['resume_file']}" target="_blank" style="color: #ffff00;">Click here if download doesn't start automatically</a></p>
            </div>
        `);
        
        // Simulate download
        setTimeout(() => {{
            window.open('{personal['resume_file']}', '_blank');
        }}, 1000);
    }}

    hireMe() {{
        this.displayOutput(`
            <div class="hire-content">
                <h3 style="color: #00ffff; margin-bottom: 15px;">Why Hire {personal['name']}?</h3>
{hire_reasons_js}
                <br>
                <p style="color: #00ff00;">{data['hire_conclusion']}</p>
                <p style="color: #ffff00;">Contact: {personal['email']} | {personal['phone']}</p>
            </div>
        `);
    }}

    clearTerminal() {{
        this.terminalOutput.innerHTML = '';
        this.showWelcomeMessage();
    }}

    whoAmI() {{
        this.displayOutput('<span style="color: #00ff00;">visitor</span>');
    }}

    printWorkingDirectory() {{
        this.displayOutput('<span style="color: #00ffff;">/home/{personal['username']}/portfolio</span>');
    }}

    listDirectory() {{
        this.displayOutput(`
            <div style="color: #cccccc;">
                <div style="color: #00ffff;">drwxr-xr-x 2 {personal['username']} {personal['username']} 4096 Dec  7 16:10 <span style="color: #ffff00;">about/</span></div>
                <div style="color: #00ffff;">drwxr-xr-x 2 {personal['username']} {personal['username']} 4096 Dec  7 16:10 <span style="color: #ffff00;">skills/</span></div>
                <div style="color: #00ffff;">drwxr-xr-x 2 {personal['username']} {personal['username']} 4096 Dec  7 16:10 <span style="color: #ffff00;">experience/</span></div>
                <div style="color: #00ffff;">drwxr-xr-x 2 {personal['username']} {personal['username']} 4096 Dec  7 16:10 <span style="color: #ffff00;">projects/</span></div>
                <div style="color: #00ffff;">-rw-r--r-- 1 {personal['username']} {personal['username']} 2048 Dec  7 16:10 <span style="color: #ffffff;">README.md</span></div>
                <div style="color: #00ffff;">-rw-r--r-- 1 {personal['username']} {personal['username']} 1024 Dec  7 16:10 <span style="color: #ffffff;">contact.txt</span></div>
                <div style="color: #00ffff;">-rw-r--r-- 1 {personal['username']} {personal['username']} 4096 Dec  7 16:10 <span style="color: #ff0000;">{personal['resume_file']}</span></div>
            </div>
        `);
    }}

    catFile(args) {{
        if (!args || args.length === 0) {{
            this.displayOutput('cat: missing file operand', 'error');
            return;
        }}

        const filename = args[0].toLowerCase();
        const files = {{
            'readme.md': 'Welcome to {personal['name']}\\'s Professional Portfolio\\n\\nA passionate DevOps and SRE professional with expertise in cloud infrastructure, automation, AI/ML platforms, and security.',
            'contact.txt': 'Email: {personal['email']}\\nPhone: {personal['phone']}\\nLocation: {personal['location']}\\nLinkedIn: linkedin.com/in/googlesky\\nGitHub: github.com/googlesky',
            'about.txt': '{personal['name']} - {personal['title']}\\n8+ years of experience in DevOps, SRE, and System Administration'
        }};

        if (files[filename]) {{
            this.displayOutput(`<pre style="color: #cccccc; white-space: pre-wrap;">${{files[filename]}}</pre>`);
        }} else {{
            this.displayOutput(`cat: ${{args[0]}}: No such file or directory`, 'error');
        }}
    }}

    echo(args) {{
        if (!args || args.length === 0) {{
            this.displayOutput('');
        }} else {{
            this.displayOutput(`<span style="color: #cccccc;">${{args.join(' ')}}</span>`);
        }}
    }}

    showDate() {{
        const now = new Date();
        this.displayOutput(`<span style="color: #00ffff;">${{now.toString()}}</span>`);
    }}

    showUptime() {{
        const now = new Date();
        const uptime = Math.floor((now - this.startTime) / 1000);
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = uptime % 60;
        
        this.displayOutput(`<span style="color: #00ffff;">up ${{hours}}h ${{minutes}}m ${{seconds}}s, load average: 0.15, 0.12, 0.08</span>`);
    }}

    showNeofetch() {{
        this.displayOutput(`
            <div class="neofetch-content" style="display: flex; gap: 20px;">
                <pre style="color: #00ffff; font-size: 10px;">
     .-.-.   .-.-.   .-.-.   .-.-.   .-.-.
    ( H | L )( I | E )( U | . )( L | E )
     \\`-'\\`   \\`-'\\`   \\`-'\\`   \\`-'\\`   \\`-'\\`
                </pre>
                <div style="color: #cccccc;">
                    <p><span style="color: #00ff00;">User:</span> {personal['name']}</p>
                    <p><span style="color: #00ff00;">Title:</span> {personal['title']}</p>
                    <p><span style="color: #00ff00;">OS:</span> Linux Terminal Environment</p>
                    <p><span style="color: #00ff00;">Shell:</span> Interactive Portfolio Terminal</p>
                    <p><span style="color: #00ff00;">Languages:</span> Golang, Python, PHP, Shell Script</p>
                    <p><span style="color: #00ff00;">Cloud:</span> AWS, Azure, IBM, Oracle Cloud</p>
                    <p><span style="color: #00ff00;">DevOps:</span> Docker, Kubernetes, Terraform</p>
                    <p><span style="color: #00ff00;">AI/ML:</span> LLMs, YoloV8, lgbm, lstm</p>
                    <p><span style="color: #00ff00;">Status:</span> Available for hire</p>
                </div>
            </div>
        `);
    }}

    sudo(args) {{
        if (!args || args.length === 0) {{
            this.displayOutput('sudo: command not specified', 'error');
            return;
        }}

        const command = args[0];
        if (command === 'hire') {{
            this.displayOutput(`
                <div style="color: #ff0000;">
                    <p>[sudo] password for visitor: ••••••••</p>
                    <p style="color: #00ff00;">Access granted! Executing privileged hire command...</p>
                    <p style="color: #ffff00;">🚨 ALERT: Exceptional DevOps engineer detected!</p>
                    <p style="color: #00ffff;">Contact {personal['email']} immediately for interview.</p>
                </div>
            `);
        }} else {{
            this.displayOutput(`sudo: ${{command}}: command not found`, 'error');
        }}
    }}
}}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {{
    new TerminalEmulator();
}});

// Add CSS for terminal command styling
const additionalStyles = `
    .terminal-command-line {{
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        gap: 5px;
    }}

    .prompt-output .user {{
        color: #00ff00;
        text-shadow: 0 0 5px rgba(0, 255, 0, 0.7);
    }}

    .prompt-output .separator {{
        color: #ffffff;
    }}

    .prompt-output .path {{
        color: #00ffff;
        text-shadow: 0 0 5px rgba(0, 255, 255, 0.7);
    }}

    .prompt-output .dollar {{
        color: #ffffff;
    }}

    .command-text {{
        color: #ffff00;
        text-shadow: 0 0 5px rgba(255, 255, 0, 0.5);
    }}

    .terminal-output-line {{
        margin-bottom: 10px;
        padding-left: 20px;
        border-left: 2px solid rgba(0, 255, 0, 0.2);
    }}

    .terminal-output-line.error {{
        color: #ff6b6b;
        border-left-color: rgba(255, 107, 107, 0.5);
    }}

    .terminal-output-line.success {{
        color: #51cf66;
        border-left-color: rgba(81, 207, 102, 0.5);
    }}

    .welcome-msg p {{
        margin-bottom: 8px;
    }}

    .help-content h3 {{
        border-bottom: 1px solid rgba(0, 255, 255, 0.3);
        padding-bottom: 5px;
    }}

    .neofetch-content {{
        align-items: flex-start;
    }}

    @media (max-width: 768px) {{
        .neofetch-content {{
            flex-direction: column;
            gap: 10px;
        }}
        
        .neofetch-content pre {{
            font-size: 8px;
        }}
    }}
`;

// Add the additional styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Smooth scrolling for navigation links (if any are added later)
document.addEventListener('click', (e) => {{
    if (e.target.matches('a[href^="#"]')) {{
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {{
            targetElement.scrollIntoView({{
                behavior: 'smooth',
                block: 'start'
            }});
        }}
    }}
}});

// Add terminal typing sound effect (optional)
function playTypingSound() {{
    // Create a subtle typing sound using Web Audio API
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.01, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
}}

// Performance optimization: Lazy load animations
const observerOptions = {{
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
}};

const observer = new IntersectionObserver((entries) => {{
    entries.forEach(entry => {{
        if (entry.isIntersecting) {{
            entry.target.style.animationPlayState = 'running';
        }}
    }});
}}, observerOptions);

// Observe all terminal sections for performance
document.addEventListener('DOMContentLoaded', () => {{
    const sections = document.querySelectorAll('.terminal-section');
    sections.forEach(section => {{
        section.style.animationPlayState = 'paused';
        observer.observe(section);
    }});
}});'''
    
    return js_template

def main():
    """Main function to generate HTML and JS files"""
    global data
    data = load_data()
    
    # Generate HTML
    html_content = generate_html(data)
    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    # Generate JavaScript
    js_content = generate_javascript(data)
    with open('script.js', 'w', encoding='utf-8') as f:
        f.write(js_content)
    
    print("✅ Generated files successfully!")
    print("📄 index.html - Updated with latest data")
    print("📄 script.js - Updated with latest data")
    print("\n🚀 To view your portfolio: open index.html in your browser")
    print("📝 To edit information: modify data.yaml and run python generate.py again")

if __name__ == "__main__":
    main()