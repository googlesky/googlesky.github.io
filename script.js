// Terminal Commands and Interactive Functionality
class TerminalEmulator {
    constructor() {
        this.terminalOutput = document.getElementById('terminal-output');
        this.terminalInput = document.getElementById('terminal-input');
        this.currentTimeElement = document.getElementById('current-time');
        this.terminalContainer = document.querySelector('.interactive-terminal');
        
        // Get profile data from Jekyll
        this.profileData = this.getProfileData();
        
        this.commands = {
            help: () => this.showHelp(),
            about: () => this.showAbout(),
            skills: () => this.showSkills(),
            experience: () => this.showExperience(),
            achievements: () => this.showAchievements(),
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
            sudo: (args) => this.sudo(args),
            analytics: () => this.showAnalytics()
        };

        this.commandHistory = [];
        this.historyIndex = -1;
        this.startTime = new Date();
        this.sessionId = this.generateSessionId();
        this.commandCount = 0;

        this.init();
    }

    getProfileData() {
        const dataElement = document.getElementById('profile-data');
        if (dataElement) {
            return JSON.parse(dataElement.textContent);
        }
        return null;
    }

    init() {
        this.setupEventListeners();
        this.updateTime();
        this.showWelcomeMessage();
        setInterval(() => this.updateTime(), 1000);
        
        // Track initial session
        this.trackEvent('User_Session', 'Session_Started', 'terminal_loaded');
        
        // Track user behavior every 30 seconds
        setInterval(() => this.trackUserBehavior(), 30000);
    }

    setupEventListeners() {
        if (!this.terminalInput || !this.terminalOutput) {
            console.warn('Interactive terminal elements are missing. Skipping terminal setup.');
            return;
        }

        this.terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.processCommand();
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.navigateHistory('up');
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.navigateHistory('down');
            } else if (e.key === 'Tab') {
                e.preventDefault();
                this.autoComplete();
            }
        });

        // Focus input when clicking anywhere in terminal
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href) {
                const linkType = this.getLinkType(link.href);
                this.trackEvent('External_Links', 'Link_Clicked', linkType);
                
                // Track specific high-value actions
                if (link.href.includes('mailto:')) {
                    this.trackEvent('Lead_Generation', 'Email_Clicked', 'contact_attempt');
                } else if (link.href.includes('tel:')) {
                    this.trackEvent('Lead_Generation', 'Phone_Clicked', 'contact_attempt');
                } else if (link.href.includes('.pdf')) {
                    this.trackEvent('Lead_Generation', 'Resume_PDF_Clicked', 'document_download');
                }
            }

            if (this.terminalContainer && this.terminalContainer.contains(e.target)) {
                this.terminalInput.focus();
            }
        });

        // Initial focus
        this.terminalInput.focus();

        // Track page exit
        window.addEventListener('beforeunload', () => {
            const finalSessionTime = Math.floor((new Date() - this.startTime) / 1000);
            this.trackEvent('User_Session', 'Session_Ended', 'page_exit', finalSessionTime);
        });
    }

    processCommand() {
        const input = this.terminalInput.value.trim();
        if (!input) return;

        this.addToHistory(input);
        this.displayCommand(input);

        const [command, ...args] = input.toLowerCase().split(' ');
        
        // Track command usage with Google Analytics
        this.trackCommand(command, args, input);
        
        if (this.commands[command]) {
            this.commands[command](args);
        } else {
            this.displayOutput(`Command not found: ${command}. Type 'help' for available commands.`, 'error');
            // Track invalid commands
            this.trackEvent('Terminal', 'Invalid_Command', command);
        }

        this.terminalInput.value = '';
        this.scrollToBottom();
    }

    displayCommand(command) {
        if (!this.terminalOutput) {
            return;
        }
        const commandLine = document.createElement('div');
        commandLine.className = 'terminal-command-line';
        commandLine.innerHTML = `
            <span class="prompt-output">
                <span class="user">visitor@${this.profileData?.personal?.username || 'hieule'}-terminal</span><span class="separator">:</span><span class="path">~</span><span class="dollar">$</span>
            </span>
            <span class="command-text">${command}</span>
        `;
        this.terminalOutput.appendChild(commandLine);
    }

    displayOutput(content, type = 'normal') {
        if (!this.terminalOutput) {
            return;
        }
        const output = document.createElement('div');
        output.className = `terminal-output-line ${type}`;

        if (typeof content === 'string') {
            output.innerHTML = content;
        } else {
            output.appendChild(content);
        }
        
        this.terminalOutput.appendChild(output);
    }

    addToHistory(command) {
        this.commandHistory.push(command);
        this.historyIndex = this.commandHistory.length;
    }

    navigateHistory(direction) {
        if (direction === 'up' && this.historyIndex > 0) {
            this.historyIndex--;
            this.terminalInput.value = this.commandHistory[this.historyIndex];
        } else if (direction === 'down' && this.historyIndex < this.commandHistory.length - 1) {
            this.historyIndex++;
            this.terminalInput.value = this.commandHistory[this.historyIndex];
        } else if (direction === 'down' && this.historyIndex === this.commandHistory.length - 1) {
            this.historyIndex++;
            this.terminalInput.value = '';
        }
    }

    autoComplete() {
        const input = this.terminalInput.value.toLowerCase();
        const availableCommands = Object.keys(this.commands);
        const matches = availableCommands.filter(cmd => cmd.startsWith(input));
        
        if (matches.length === 1) {
            this.terminalInput.value = matches[0];
        } else if (matches.length > 1) {
            this.displayOutput(`Available commands: ${matches.join(', ')}`);
        }
    }

    scrollToBottom() {
        this.terminalOutput.scrollTop = this.terminalOutput.scrollHeight;
    }

    updateTime() {
        const now = new Date();
        if (this.currentTimeElement) {
            this.currentTimeElement.textContent = now.toLocaleTimeString();
        }
    }

    // Command implementations
    showWelcomeMessage() {
        this.displayOutput(`
            <div class="welcome-msg">
                <p style="color: #0a84ff;">Welcome to ${this.profileData?.personal?.name || 'Lê Hiếu'}'s Interactive Terminal!</p>
                <p>Type <span style="color: #ff9f0a;">'help'</span> to see available commands.</p>
                <p style="color: rgba(255, 255, 255, 0.6); font-style: italic;">Tip: Use Tab for autocompletion, ↑↓ arrows for command history.</p>
            </div>
        `);
    }

    showHelp() {
        this.displayOutput(`
            <div class="help-content">
                <h3 class="terminal-inline-label" style="margin-bottom: 15px;">Available Commands</h3>
                <div class="help-grid">
                    <span class="terminal-inline-highlight">help</span><span class="terminal-inline-muted">Show this help message</span>
                    <span class="terminal-inline-highlight">about</span><span class="terminal-inline-muted">Display profile information</span>
                    <span class="terminal-inline-highlight">skills</span><span class="terminal-inline-muted">Show technical skills</span>
                    <span class="terminal-inline-highlight">experience</span><span class="terminal-inline-muted">Display work experience</span>
                    <span class="terminal-inline-highlight">achievements</span><span class="terminal-inline-muted">Show achievements & certifications</span>
                    <span class="terminal-inline-highlight">projects</span><span class="terminal-inline-muted">Show project portfolio</span>
                    <span class="terminal-inline-highlight">contact</span><span class="terminal-inline-muted">Get contact information</span>
                    <span class="terminal-inline-highlight">social</span><span class="terminal-inline-muted">Show social media links</span>
                    <span class="terminal-inline-highlight">resume</span><span class="terminal-inline-muted">Download resume</span>
                    <span class="terminal-inline-highlight">hire</span><span class="terminal-inline-muted">Why you should hire me</span>
                    <span class="terminal-inline-highlight">clear</span><span class="terminal-inline-muted">Clear terminal screen</span>
                    <span class="terminal-inline-highlight">whoami</span><span class="terminal-inline-muted">Display current user</span>
                    <span class="terminal-inline-highlight">pwd</span><span class="terminal-inline-muted">Print working directory</span>
                    <span class="terminal-inline-highlight">ls</span><span class="terminal-inline-muted">List directory contents</span>
                    <span class="terminal-inline-highlight">date</span><span class="terminal-inline-muted">Show current date and time</span>
                    <span class="terminal-inline-highlight">uptime</span><span class="terminal-inline-muted">Show system uptime</span>
                    <span class="terminal-inline-highlight">neofetch</span><span class="terminal-inline-muted">Display system information</span>
                    <span class="terminal-inline-highlight">cat [file]</span><span class="terminal-inline-muted">Display file contents</span>
                    <span class="terminal-inline-highlight">echo [text]</span><span class="terminal-inline-muted">Display text</span>
                    <span class="terminal-inline-highlight">analytics</span><span class="terminal-inline-muted">Show current session analytics</span>
                </div>
            </div>
        `);
    }

    showAbout() {
        const profile = this.profileData?.personal || {};
        this.trackPageInteraction('about_section');
        this.displayOutput(`
            <div class="about-content">
                <h3 class="terminal-inline-label" style="margin-bottom: 15px;">About ${profile.name || 'Lê Hiếu'}</h3>
                <p><span class="terminal-inline-label">Name:</span> ${profile.name || 'Lê Hiếu'}</p>
                <p><span class="terminal-inline-label">Title:</span> ${profile.title || 'Senior DevOps/SRE'}</p>
                <p><span class="terminal-inline-label">Email:</span> ${profile.email || 'HIEULP@1DEVOPS.IO'}</p>
                <p><span class="terminal-inline-label">Phone:</span> ${profile.phone || '(084) 975-669-775'}</p>
                <p><span class="terminal-inline-label">Location:</span> ${profile.location || 'Thu Duc, Ho Chi Minh City, Vietnam'}</p>
                <p><span class="terminal-inline-label">Experience:</span> 8+ years in DevOps, SRE, and System Administration</p>
                <p class="terminal-inline-muted" style="margin-top: 15px;">
                    ${this.profileData?.tagline || 'Passionate about cloud infrastructure, automation, AI/ML platforms, security, and building reliable systems at scale. Experienced with AWS, Azure, Kubernetes, Docker, Terraform, Golang, Python, and various cloud technologies.'}
                </p>
            </div>
        `);
    }

    showSkills() {
        const skills = this.profileData?.skills || {};
        this.trackPageInteraction('skills_section');
        this.displayOutput(`
            <div class="skills-content">
                <h3 class="terminal-inline-label" style="margin-bottom: 15px;">Technical Skills</h3>
                <div style="margin-bottom: 15px;">
                    <h4 class="terminal-inline-highlight">Programming Languages:</h4>
                    <p class="terminal-inline-muted">${(skills.programming || []).join(', ')}</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 class="terminal-inline-highlight">CI/CD & Automation:</h4>
                    <p class="terminal-inline-muted">${(skills.cicd_automation || []).join(', ')}</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 class="terminal-inline-highlight">Operating Systems:</h4>
                    <p class="terminal-inline-muted">${(skills.operating_systems || []).join(', ')}</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 class="terminal-inline-highlight">Containers/Virtualization:</h4>
                    <p class="terminal-inline-muted">${(skills.containers_virtualization || []).join(', ')}</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 class="terminal-inline-highlight">Databases:</h4>
                    <p class="terminal-inline-muted">${(skills.databases || []).join(', ')}</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 class="terminal-inline-highlight">Cloud Platforms:</h4>
                    <p class="terminal-inline-muted">${(skills.cloud_platforms || []).join(', ')}</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 class="terminal-inline-highlight">Networking:</h4>
                    <p class="terminal-inline-muted">${(skills.networking || []).join(', ')}</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 class="terminal-inline-highlight">Monitoring/Logging:</h4>
                    <p class="terminal-inline-muted">${(skills.monitoring_logging || []).join(', ')}</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 class="terminal-inline-highlight">Security:</h4>
                    <p class="terminal-inline-muted">${(skills.security || []).join(', ')}</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 class="terminal-inline-highlight">Registry & Proxy:</h4>
                    <p class="terminal-inline-muted">${(skills.registry_proxy || []).join(', ')}</p>
                </div>
            </div>
        `);
    }

    showExperience() {
        const experience = this.profileData?.experience || [];
        let experienceHtml = `
            <div class="experience-content">
                <h3 class="terminal-inline-label" style="margin-bottom: 15px;">Professional Experience</h3>
        `;
        
        experience.forEach(job => {
            experienceHtml += `
                <div style="margin-bottom: 18px;">
                    <p class="terminal-inline-highlight" style="margin: 0;">${job.company} — ${job.position}</p>
                    <p class="terminal-inline-muted" style="margin: 2px 0 8px;">${job.period}</p>
                    <p class="terminal-inline-text" style="margin: 0;">${job.description}</p>
                </div>
            `;
        });
        
        experienceHtml += '</div>';
        this.displayOutput(experienceHtml);
    }

    showAchievements() {
        const achievements = this.profileData?.achievements || [];
        let achievementsHtml = `
            <div class="achievements-content">
                <h3 class="terminal-inline-label" style="margin-bottom: 15px;">🏆 Professional Achievements & Certifications</h3>
        `;
        
        achievements.forEach(achievement => {
            achievementsHtml += `
                <p class="terminal-inline-text" style="margin-bottom: 10px;">
                    <span class="terminal-inline-label">${achievement.date}</span> · <span>${achievement.title}</span>
                </p>
            `;
        });
        
        achievementsHtml += '</div>';
        this.displayOutput(achievementsHtml);
    }

    showProjects() {
        const projects = this.profileData?.projects || [];
        let projectsHtml = `
            <div class="projects-content">
                <h3 class="terminal-inline-label" style="margin-bottom: 15px;">Notable Projects</h3>
        `;
        
        projects.forEach(project => {
            projectsHtml += `
                <div style="margin-bottom: 15px;">
                    <p class="terminal-inline-highlight" style="margin: 0;">${project.title}</p>
                    <p class="terminal-inline-text" style="margin: 4px 0 0;">${project.description}</p>
                </div>
            `;
        });
        
        projectsHtml += '</div>';
        this.displayOutput(projectsHtml);
    }

    showContact() {
        const profile = this.profileData?.personal || {};
        const availableFor = this.profileData?.available_for || [];
        
        this.trackPageInteraction('contact_section');
        this.trackEvent('Lead_Generation', 'Contact_Viewed', 'potential_lead');
        this.displayOutput(`
            <div class="contact-content">
                <h3 class="terminal-inline-label" style="margin-bottom: 15px;">Contact Information</h3>
                <p><span class="terminal-inline-label">📧 Email:</span> <a href="mailto:${profile.email}" class="terminal-inline-highlight">${profile.email}</a></p>
                <p><span class="terminal-inline-label">📞 Phone:</span> <a href="tel:${profile.phone?.replace(/[^\d+]/g, '')}" class="terminal-inline-highlight">${profile.phone}</a></p>
                <p><span class="terminal-inline-label">🌍 Location:</span> <span class="terminal-inline-text">${profile.location}</span></p>
                <p><span class="terminal-inline-label">📄 Resume:</span> <a href="${profile.resume_file}" target="_blank" class="terminal-inline-highlight">Download PDF</a></p>
                <br>
                <p class="terminal-inline-label">💡 Available for:</p>
                <ul class="terminal-inline-text" style="margin-left: 20px;">
                    ${availableFor.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `);
    }

    showSocial() {
        const social = this.profileData?.social || {};
        this.displayOutput(`
            <div class="social-content">
                <h3 class="terminal-inline-label" style="margin-bottom: 15px;">Social Networks</h3>
                <p><span class="terminal-inline-label">💼 LinkedIn:</span> <a href="${social.linkedin}" target="_blank" class="terminal-inline-highlight">${social.linkedin}</a></p>
                <p><span class="terminal-inline-label">🐙 GitHub:</span> <a href="${social.github}" target="_blank" class="terminal-inline-highlight">${social.github}</a></p>
                <p><span class="terminal-inline-label">✈️ Telegram:</span> <a href="${social.telegram}" target="_blank" class="terminal-inline-highlight">${social.telegram}</a></p>
                <p><span class="terminal-inline-label">🦊 GitLab:</span> <a href="${social.gitlab}" target="_blank" class="terminal-inline-highlight">${social.gitlab}</a></p>
                <p><span class="terminal-inline-label">🪣 Bitbucket:</span> <a href="${social.bitbucket}" target="_blank" class="terminal-inline-highlight">${social.bitbucket}</a></p>
                <p><span class="terminal-inline-label">📚 Stack Overflow:</span> <a href="${social.stackoverflow}" target="_blank" class="terminal-inline-highlight">${social.stackoverflow}</a></p>
            </div>
        `);
    }

    downloadResume() {
        const profile = this.profileData?.personal || {};
        if (!profile.resume_file) {
            this.displayOutput('<div class="resume-content">Resume is currently unavailable. Please check back soon.</div>', 'error');
            return;
        }
        this.trackPageInteraction('resume_download');
        this.trackEvent('Lead_Generation', 'Resume_Downloaded', 'high_intent_action');
        this.displayOutput(`
            <div class="resume-content">
                <p class="terminal-inline-label">📄 Opening resume download...</p>
                <p class="terminal-inline-text">File: ${profile.resume_file}</p>
                <p><a href="${profile.resume_file}" target="_blank" class="terminal-inline-highlight">Click here if download doesn't start automatically</a></p>
            </div>
        `);
        
        // Simulate download
        setTimeout(() => {
            window.open(profile.resume_file, '_blank');
        }, 1000);
    }

    hireMe() {
        const hireReasons = this.profileData?.hire_reasons || [];
        const profile = this.profileData?.personal || {};
        const conclusion = this.profileData?.hire_conclusion || '';
        
        this.trackPageInteraction('hire_section');
        this.trackEvent('Lead_Generation', 'Hire_Page_Viewed', 'very_high_intent_action');
        
        let hireHtml = `
            <div class="hire-content">
                <h3 class="terminal-inline-label" style="margin-bottom: 15px;">Why Hire ${profile.name || 'Lê Hiếu'}?</h3>
                <ul class="terminal-inline-text" style="margin-left: 20px;">
        `;
        
        hireReasons.forEach(reason => {
            hireHtml += `<li>${reason}</li>`;
        });
        
        hireHtml += `
                </ul>
                <br>
                <p class="terminal-inline-label">${conclusion}</p>
                <p class="terminal-inline-highlight">Contact: ${profile.email} | ${profile.phone}</p>
            </div>
        `;
        
        this.displayOutput(hireHtml);
    }

    clearTerminal() {
        this.terminalOutput.innerHTML = '';
        this.showWelcomeMessage();
    }

    whoAmI() {
        this.displayOutput('<span class="terminal-inline-highlight">visitor</span>');
    }

    printWorkingDirectory() {
        const username = this.profileData?.personal?.username || 'hieule';
        this.displayOutput(`<span class="terminal-inline-path">/home/${username}/portfolio</span>`);
    }

    listDirectory() {
        const username = this.profileData?.personal?.username || 'hieule';
        const resumeFile = this.profileData?.personal?.resume_file || 'LePhuongHieu_DevOps_Resume_v3.pdf';
        
        this.displayOutput(`
            <div class="terminal-inline-text">
                <div><span class="terminal-inline-path">drwxr-xr-x</span> 2 ${username} ${username} 4096 Dec  7 16:10 <span class="terminal-inline-highlight">about/</span></div>
                <div><span class="terminal-inline-path">drwxr-xr-x</span> 2 ${username} ${username} 4096 Dec  7 16:10 <span class="terminal-inline-highlight">skills/</span></div>
                <div><span class="terminal-inline-path">drwxr-xr-x</span> 2 ${username} ${username} 4096 Dec  7 16:10 <span class="terminal-inline-highlight">experience/</span></div>
                <div><span class="terminal-inline-path">drwxr-xr-x</span> 2 ${username} ${username} 4096 Dec  7 16:10 <span class="terminal-inline-highlight">achievements/</span></div>
                <div><span class="terminal-inline-path">drwxr-xr-x</span> 2 ${username} ${username} 4096 Dec  7 16:10 <span class="terminal-inline-highlight">projects/</span></div>
                <div><span class="terminal-inline-path">-rw-r--r--</span> 1 ${username} ${username} 2048 Dec  7 16:10 <span>README.md</span></div>
                <div><span class="terminal-inline-path">-rw-r--r--</span> 1 ${username} ${username} 1024 Dec  7 16:10 <span>contact.txt</span></div>
                <div><span class="terminal-inline-path">-rw-r--r--</span> 1 ${username} ${username} 4096 Dec  7 16:10 <span class="terminal-inline-danger">${resumeFile}</span></div>
            </div>
        `);
    }

    catFile(args) {
        if (!args || args.length === 0) {
            this.displayOutput('cat: missing file operand', 'error');
            return;
        }

        const filename = args[0].toLowerCase();
        const profile = this.profileData?.personal || {};
        
        const files = {
            'readme.md': `Welcome to ${profile.name || 'Lê Hiếu'}'s Professional Portfolio\n\nA passionate DevOps and SRE professional with expertise in cloud infrastructure, automation, AI/ML platforms, and security.`,
            'contact.txt': `Email: ${profile.email}\nPhone: ${profile.phone}\nLocation: ${profile.location}\nLinkedIn: ${this.profileData?.social?.linkedin}\nGitHub: ${this.profileData?.social?.github}`,
            'about.txt': `${profile.name || 'Lê Hiếu'} - ${profile.title || 'Senior DevOps/SRE'}\n8+ years of experience in DevOps, SRE, and System Administration`
        };

        if (files[filename]) {
            this.displayOutput(`<pre class="terminal-inline-text" style="white-space: pre-wrap;">${files[filename]}</pre>`);
        } else {
            this.displayOutput(`cat: ${args[0]}: No such file or directory`, 'error');
        }
    }

    echo(args) {
        if (!args || args.length === 0) {
            this.displayOutput('');
        } else {
            this.displayOutput(`<span class="terminal-inline-text">${args.join(' ')}</span>`);
        }
    }

    showDate() {
        const now = new Date();
        this.displayOutput(`<span class="terminal-inline-path">${now.toString()}</span>`);
    }

    showUptime() {
        const now = new Date();
        const uptime = Math.floor((now - this.startTime) / 1000);
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = uptime % 60;
        
        this.displayOutput(`<span class="terminal-inline-path">up ${hours}h ${minutes}m ${seconds}s, load average: 0.15, 0.12, 0.08</span>`);
    }

    showNeofetch() {
        const profile = this.profileData?.personal || {};
        const skills = this.profileData?.skills || {};
        
        this.displayOutput(`
            <div class="neofetch-content" style="display: flex; gap: 20px;">
                <pre class="terminal-inline-path" style="font-size: 10px;">
     .-.-.   .-.-.   .-.-.   .-.-.   .-.-.
    ( H | L )( I | E )( U | . )( L | E )
     \`-'\`   \`-'\`   \`-'\`   \`-'\`   \`-'\`
                </pre>
                <div class="terminal-inline-text">
                    <p><span class="terminal-inline-label">User:</span> ${profile.name || 'Lê Hiếu'}</p>
                    <p><span class="terminal-inline-label">Title:</span> ${profile.title || 'Senior DevOps/SRE'}</p>
                    <p><span class="terminal-inline-label">OS:</span> macOS-style Portfolio Terminal</p>
                    <p><span class="terminal-inline-label">Shell:</span> Interactive Profile Shell</p>
                    <p><span class="terminal-inline-label">Languages:</span> ${(skills.programming || []).join(', ')}</p>
                    <p><span class="terminal-inline-label">Cloud:</span> ${(skills.cloud_platforms || []).join(', ')}</p>
                    <p><span class="terminal-inline-label">DevOps:</span> ${(skills.containers_virtualization || []).join(', ')}</p>
                    <p><span class="terminal-inline-label">Status:</span> Available for hire</p>
                </div>
            </div>
        `);
    }

    sudo(args) {
        if (!args || args.length === 0) {
            this.displayOutput('sudo: command not specified', 'error');
            return;
        }

        const command = args[0];
        const profile = this.profileData?.personal || {};
        
        if (command === 'hire') {
            this.displayOutput(`
                <div>
                    <p class="terminal-inline-danger">[sudo] password for visitor: ••••••••</p>
                    <p class="terminal-inline-label">Access granted! Executing privileged hire command...</p>
                    <p class="terminal-inline-highlight">🚨 ALERT: Exceptional DevOps engineer detected!</p>
                    <p class="terminal-inline-path">Contact ${profile.email} immediately for interview.</p>
                </div>
            `);
        } else {
            this.displayOutput(`sudo: ${command}: command not found`, 'error');
        }
    }

    // Analytics Tracking Methods
    generateSessionId() {
        return 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    }

    trackEvent(category, action, label = null, value = null) {
        // Check if gtag is available
        if (typeof gtag !== 'undefined') {
            const eventData = {
                event_category: category,
                event_label: label,
                custom_parameter_session_id: this.sessionId
            };
            
            if (value !== null) {
                eventData.value = value;
            }
            
            gtag('event', action, eventData);
        }
    }

    trackCommand(command, args, fullInput) {
        this.commandCount++;
        
        // Track the specific command
        this.trackEvent('Terminal', 'Command_Executed', command);
        
        // Track command with arguments if present
        if (args && args.length > 0) {
            this.trackEvent('Terminal', 'Command_With_Args', `${command} ${args.join(' ')}`);
        }
        
        // Track user engagement metrics
        const sessionTime = Math.floor((new Date() - this.startTime) / 1000);
        this.trackEvent('User_Engagement', 'Command_Count', command, this.commandCount);
        this.trackEvent('User_Engagement', 'Session_Duration', 'seconds', sessionTime);
        
        // Track specific command categories for analysis
        this.trackCommandCategory(command);
        
        // Track full command for detailed analysis (be careful with privacy)
        this.trackEvent('Terminal', 'Full_Command', fullInput.substring(0, 100)); // Limit to 100 chars
    }

    trackCommandCategory(command) {
        const categories = {
            'info_commands': ['about', 'skills', 'experience', 'achievements', 'whoami', 'neofetch'],
            'portfolio_commands': ['projects', 'resume', 'social', 'contact'],
            'system_commands': ['help', 'clear', 'pwd', 'ls', 'date', 'uptime'],
            'interactive_commands': ['cat', 'echo', 'sudo'],
            'action_commands': ['hire', 'resume']
        };

        for (const [category, commands] of Object.entries(categories)) {
            if (commands.includes(command)) {
                this.trackEvent('Command_Category', category, command);
                break;
            }
        }
    }

    trackUserBehavior() {
        // Track when user starts interacting
        const sessionTime = Math.floor((new Date() - this.startTime) / 1000);
        
        if (sessionTime > 30) { // Engaged user (30+ seconds)
            this.trackEvent('User_Engagement', 'Engaged_User', 'session_30_plus_seconds');
        }
        
        if (this.commandCount >= 5) { // Active user (5+ commands)
            this.trackEvent('User_Engagement', 'Active_User', 'commands_5_plus');
        }
        
        if (sessionTime > 120) { // Highly engaged (2+ minutes)
            this.trackEvent('User_Engagement', 'Highly_Engaged', 'session_2_plus_minutes');
        }
    }

    trackPageInteraction(section) {
        this.trackEvent('Page_Interaction', 'Section_Viewed', section);
    }

    getLinkType(url) {
        if (url.includes('mailto:')) return 'email';
        if (url.includes('tel:')) return 'phone';
        if (url.includes('linkedin.com')) return 'linkedin';
        if (url.includes('github.com')) return 'github';
        if (url.includes('gitlab.com')) return 'gitlab';
        if (url.includes('bitbucket.org')) return 'bitbucket';
        if (url.includes('stackoverflow.com')) return 'stackoverflow';
        if (url.includes('telegram')) return 'telegram';
        if (url.includes('.pdf')) return 'resume_pdf';
        return 'other';
    }

    showAnalytics() {
        const sessionTime = Math.floor((new Date() - this.startTime) / 1000);
        const minutes = Math.floor(sessionTime / 60);
        const seconds = sessionTime % 60;
        
        this.trackPageInteraction('analytics_dashboard');
        this.displayOutput(`
            <div class="analytics-content">
                <h3 class="terminal-inline-label" style="margin-bottom: 15px;">📊 Current Session Analytics</h3>
                <div class="terminal-inline-text">
                    <p><span class="terminal-inline-label">Session ID:</span> ${this.sessionId}</p>
                    <p><span class="terminal-inline-label">Time on Site:</span> ${minutes}m ${seconds}s</p>
                    <p><span class="terminal-inline-label">Commands Executed:</span> ${this.commandCount}</p>
                    <p><span class="terminal-inline-label">Start Time:</span> ${this.startTime.toLocaleString()}</p>
                </div>
                
                <h4 class="terminal-inline-highlight" style="margin-top: 15px;">What We Track:</h4>
                <ul class="terminal-inline-text" style="margin-left: 20px;">
                    <li>Every command you run in the terminal</li>
                    <li>Which sections you explore (about, skills, experience, etc.)</li>
                    <li>Time spent on the site and engagement level</li>
                    <li>External link clicks (LinkedIn, GitHub, email, phone)</li>
                    <li>Resume downloads and contact actions</li>
                    <li>Command categories and usage patterns</li>
                </ul>
                
                <h4 class="terminal-inline-highlight" style="margin-top: 15px;">Analytics Categories:</h4>
                <ul class="terminal-inline-text" style="margin-left: 20px;">
                    <li><span class="terminal-inline-label">Terminal:</span> All command executions</li>
                    <li><span class="terminal-inline-label">User_Engagement:</span> Session duration, command frequency</li>
                    <li><span class="terminal-inline-label">Page_Interaction:</span> Section views</li>
                    <li><span class="terminal-inline-label">Lead_Generation:</span> High-value actions (contact, hire, resume)</li>
                    <li><span class="terminal-inline-label">External_Links:</span> Social media and external clicks</li>
                    <li><span class="terminal-inline-label">Command_Category:</span> Grouped command analysis</li>
                </ul>
                
                <p class="terminal-inline-muted" style="margin-top: 15px; font-style: italic;">
                    All data is used to improve user experience and understand visitor behavior.
                    Check Google Analytics for detailed insights!
                </p>
            </div>
        `);
    }
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TerminalEmulator();
});

// Add CSS for terminal command styling
const additionalStyles = `
    .terminal-command-line {
        margin-bottom: 8px;
        display: flex;
        align-items: baseline;
        gap: 8px;
        font-family: var(--font-mono, 'JetBrains Mono', monospace);
        color: rgba(243, 245, 250, 0.82);
    }

    .prompt-output .user {
        color: rgba(107, 176, 255, 0.9);
    }

    .prompt-output .separator,
    .prompt-output .dollar {
        color: rgba(149, 160, 185, 0.7);
    }

    .prompt-output .path {
        color: rgba(133, 196, 255, 0.92);
    }

    .command-text {
        color: #ff9f0a;
        font-weight: 600;
    }

    .terminal-output-line {
        margin-bottom: 12px;
        padding-left: 18px;
        border-left: 2px solid rgba(107, 176, 255, 0.3);
        color: rgba(243, 245, 250, 0.82);
    }

    .terminal-output-line.error {
        color: #ff6b6b;
        border-left-color: rgba(255, 107, 107, 0.45);
    }

    .terminal-output-line.success {
        color: #4cd964;
        border-left-color: rgba(76, 217, 100, 0.45);
    }

    .welcome-msg p {
        margin-bottom: 8px;
        color: var(--text-secondary, #a9b6d8);
    }

    .welcome-msg p span {
        color: var(--text-primary, #f7fbff);
    }

    .help-content h3 {
        border-bottom: 1px dashed rgba(88, 166, 255, 0.3);
        padding-bottom: 6px;
        color: var(--accent, #57f1c1);
        margin-bottom: 16px;
    }

    .neofetch-content {
        align-items: flex-start;
        gap: 18px;
    }

    @media (max-width: 768px) {
        .neofetch-content {
            flex-direction: column;
        }
    }

    .help-grid {
        display: grid;
        grid-template-columns: 150px 1fr;
        gap: 8px;
        color: rgba(243, 245, 250, 0.82);
    }

    .terminal-inline-label {
        color: rgba(107, 176, 255, 0.9);
        font-weight: 600;
    }

    .terminal-inline-highlight {
        color: #ff9f0a;
        font-weight: 600;
    }

    .terminal-inline-muted {
        color: rgba(255, 255, 255, 0.65);
    }

    .terminal-inline-text {
        color: rgba(243, 245, 250, 0.82);
    }

    .terminal-inline-path {
        color: rgba(133, 196, 255, 0.92);
        font-weight: 600;
    }

    .terminal-inline-danger {
        color: #ff453a;
        font-weight: 600;
    }
`;

// Add the additional styles to the document
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Smooth scrolling for navigation links (if any are added later)
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Add terminal typing sound effect (optional)
function playTypingSound() {
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
}

// Performance optimization: Lazy load animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe all terminal sections for performance
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.terminal-section');
    sections.forEach(section => {
        section.style.animationPlayState = 'paused';
        observer.observe(section);
    });
});
