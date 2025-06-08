// Terminal Commands and Interactive Functionality
class TerminalEmulator {
    constructor() {
        this.terminalOutput = document.getElementById('terminal-output');
        this.terminalInput = document.getElementById('terminal-input');
        this.currentTimeElement = document.getElementById('current-time');
        
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
            sudo: (args) => this.sudo(args)
        };

        this.commandHistory = [];
        this.historyIndex = -1;
        this.startTime = new Date();

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
    }

    setupEventListeners() {
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
        document.addEventListener('click', () => {
            this.terminalInput.focus();
        });

        // Initial focus
        this.terminalInput.focus();
    }

    processCommand() {
        const input = this.terminalInput.value.trim();
        if (!input) return;

        this.addToHistory(input);
        this.displayCommand(input);

        const [command, ...args] = input.toLowerCase().split(' ');
        
        if (this.commands[command]) {
            this.commands[command](args);
        } else {
            this.displayOutput(`Command not found: ${command}. Type 'help' for available commands.`, 'error');
        }

        this.terminalInput.value = '';
        this.scrollToBottom();
    }

    displayCommand(command) {
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
                <p style="color: #00ffff;">Welcome to ${this.profileData?.personal?.name || 'Lê Hiếu'}'s Interactive Terminal!</p>
                <p>Type <span style="color: #ffff00;">'help'</span> to see available commands.</p>
                <p style="color: #888; font-style: italic;">Tip: Use Tab for autocompletion, ↑↓ arrows for command history.</p>
            </div>
        `);
    }

    showHelp() {
        this.displayOutput(`
            <div class="help-content">
                <h3 style="color: #00ffff; margin-bottom: 15px;">Available Commands:</h3>
                <div style="display: grid; grid-template-columns: 150px 1fr; gap: 8px; color: #cccccc;">
                    <span style="color: #00ff00;">help</span><span>Show this help message</span>
                    <span style="color: #00ff00;">about</span><span>Display profile information</span>
                    <span style="color: #00ff00;">skills</span><span>Show technical skills</span>
                    <span style="color: #00ff00;">experience</span><span>Display work experience</span>
                    <span style="color: #00ff00;">achievements</span><span>Show achievements & certifications</span>
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
    }

    showAbout() {
        const profile = this.profileData?.personal || {};
        this.displayOutput(`
            <div class="about-content">
                <h3 style="color: #00ffff; margin-bottom: 15px;">About ${profile.name || 'Lê Hiếu'}</h3>
                <p><span style="color: #00ff00;">Name:</span> ${profile.name || 'Lê Hiếu'}</p>
                <p><span style="color: #00ff00;">Title:</span> ${profile.title || 'Senior DevOps/SRE'}</p>
                <p><span style="color: #00ff00;">Email:</span> ${profile.email || 'HIEULP@1DEVOPS.IO'}</p>
                <p><span style="color: #00ff00;">Phone:</span> ${profile.phone || '(084) 975-669-775'}</p>
                <p><span style="color: #00ff00;">Location:</span> ${profile.location || 'Thu Duc, Ho Chi Minh City, Vietnam'}</p>
                <p><span style="color: #00ff00;">Experience:</span> 8+ years in DevOps, SRE, and System Administration</p>
                <p style="margin-top: 15px; color: #cccccc;">
                    ${this.profileData?.tagline || 'Passionate about cloud infrastructure, automation, AI/ML platforms, security, and building reliable systems at scale. Experienced with AWS, Azure, Kubernetes, Docker, Terraform, Golang, Python, and various cloud technologies.'}
                </p>
            </div>
        `);
    }

    showSkills() {
        const skills = this.profileData?.skills || {};
        this.displayOutput(`
            <div class="skills-content">
                <h3 style="color: #00ffff; margin-bottom: 15px;">Technical Skills</h3>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">Programming Languages:</h4>
                    <p style="color: #cccccc;">${(skills.programming || []).join(', ')}</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">CI/CD & Automation:</h4>
                    <p style="color: #cccccc;">${(skills.cicd_automation || []).join(', ')}</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">Operating Systems:</h4>
                    <p style="color: #cccccc;">${(skills.operating_systems || []).join(', ')}</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">Containers/Virtualization:</h4>
                    <p style="color: #cccccc;">${(skills.containers_virtualization || []).join(', ')}</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">Databases:</h4>
                    <p style="color: #cccccc;">${(skills.databases || []).join(', ')}</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">Cloud Platforms:</h4>
                    <p style="color: #cccccc;">${(skills.cloud_platforms || []).join(', ')}</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">Networking:</h4>
                    <p style="color: #cccccc;">${(skills.networking || []).join(', ')}</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">Monitoring/Logging:</h4>
                    <p style="color: #cccccc;">${(skills.monitoring_logging || []).join(', ')}</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">Security:</h4>
                    <p style="color: #cccccc;">${(skills.security || []).join(', ')}</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">Registry & Proxy:</h4>
                    <p style="color: #cccccc;">${(skills.registry_proxy || []).join(', ')}</p>
                </div>
            </div>
        `);
    }

    showExperience() {
        const experience = this.profileData?.experience || [];
        let experienceHtml = `
            <div class="experience-content">
                <h3 style="color: #00ffff; margin-bottom: 15px;">Professional Experience</h3>
        `;
        
        experience.forEach(job => {
            experienceHtml += `
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">${job.company} — ${job.position} (${job.period})</h4>
                    <p style="color: #cccccc;">${job.description}</p>
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
                <h3 style="color: #00ffff; margin-bottom: 15px;">🏆 Professional Achievements & Certifications</h3>
        `;
        
        achievements.forEach(achievement => {
            achievementsHtml += `
                <div class="achievement-item">
                    <span class="achievement-date">${achievement.date}</span> 🌟 <span class="achievement-title">${achievement.title}</span>
                </div>
            `;
        });
        
        achievementsHtml += '</div>';
        this.displayOutput(achievementsHtml);
    }

    showProjects() {
        const projects = this.profileData?.projects || [];
        let projectsHtml = `
            <div class="projects-content">
                <h3 style="color: #00ffff; margin-bottom: 15px;">Notable Projects</h3>
        `;
        
        projects.forEach(project => {
            projectsHtml += `
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">${project.title}</h4>
                    <p style="color: #cccccc;">${project.description}</p>
                </div>
            `;
        });
        
        projectsHtml += '</div>';
        this.displayOutput(projectsHtml);
    }

    showContact() {
        const profile = this.profileData?.personal || {};
        const availableFor = this.profileData?.available_for || [];
        
        this.displayOutput(`
            <div class="contact-content">
                <h3 style="color: #00ffff; margin-bottom: 15px;">Contact Information</h3>
                <p><span style="color: #00ff00;">📧 Email:</span> <a href="mailto:${profile.email}" style="color: #ffff00;">${profile.email}</a></p>
                <p><span style="color: #00ff00;">📞 Phone:</span> <a href="tel:${profile.phone?.replace(/[^\d+]/g, '')}" style="color: #ffff00;">${profile.phone}</a></p>
                <p><span style="color: #00ff00;">🌍 Location:</span> ${profile.location}</p>
                <p><span style="color: #00ff00;">📄 Resume:</span> <a href="${profile.resume_file}" target="_blank" style="color: #ffff00;">Download PDF</a></p>
                <br>
                <p style="color: #00ffff;">💡 Available for:</p>
                <ul style="color: #cccccc; margin-left: 20px;">
                    ${availableFor.map(item => `<li>${item}</li>`).join('')}
                </ul>
            </div>
        `);
    }

    showSocial() {
        const social = this.profileData?.social || {};
        this.displayOutput(`
            <div class="social-content">
                <h3 style="color: #00ffff; margin-bottom: 15px;">Social Networks</h3>
                <p><span style="color: #00ff00;">💼 LinkedIn:</span> <a href="${social.linkedin}" target="_blank" style="color: #ffff00;">${social.linkedin}</a></p>
                <p><span style="color: #00ff00;">🐙 GitHub:</span> <a href="${social.github}" target="_blank" style="color: #ffff00;">${social.github}</a></p>
                <p><span style="color: #00ff00;">✈️ Telegram:</span> <a href="${social.telegram}" target="_blank" style="color: #ffff00;">${social.telegram}</a></p>
                <p><span style="color: #00ff00;">🦊 GitLab:</span> <a href="${social.gitlab}" target="_blank" style="color: #ffff00;">${social.gitlab}</a></p>
                <p><span style="color: #00ff00;">🪣 Bitbucket:</span> <a href="${social.bitbucket}" target="_blank" style="color: #ffff00;">${social.bitbucket}</a></p>
                <p><span style="color: #00ff00;">📚 Stack Overflow:</span> <a href="${social.stackoverflow}" target="_blank" style="color: #ffff00;">${social.stackoverflow}</a></p>
            </div>
        `);
    }

    downloadResume() {
        const profile = this.profileData?.personal || {};
        this.displayOutput(`
            <div class="resume-content">
                <p style="color: #00ffff;">📄 Opening resume download...</p>
                <p style="color: #cccccc;">File: ${profile.resume_file}</p>
                <p><a href="${profile.resume_file}" target="_blank" style="color: #ffff00;">Click here if download doesn't start automatically</a></p>
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
        
        let hireHtml = `
            <div class="hire-content">
                <h3 style="color: #00ffff; margin-bottom: 15px;">Why Hire ${profile.name || 'Lê Hiếu'}?</h3>
                <ul style="color: #cccccc; margin-left: 20px;">
        `;
        
        hireReasons.forEach(reason => {
            hireHtml += `<li>${reason}</li>`;
        });
        
        hireHtml += `
                </ul>
                <br>
                <p style="color: #00ff00;">${conclusion}</p>
                <p style="color: #ffff00;">Contact: ${profile.email} | ${profile.phone}</p>
            </div>
        `;
        
        this.displayOutput(hireHtml);
    }

    clearTerminal() {
        this.terminalOutput.innerHTML = '';
        this.showWelcomeMessage();
    }

    whoAmI() {
        this.displayOutput('<span style="color: #00ff00;">visitor</span>');
    }

    printWorkingDirectory() {
        const username = this.profileData?.personal?.username || 'hieule';
        this.displayOutput(`<span style="color: #00ffff;">/home/${username}/portfolio</span>`);
    }

    listDirectory() {
        const username = this.profileData?.personal?.username || 'hieule';
        const resumeFile = this.profileData?.personal?.resume_file || 'LePhuongHieu_DevOps_Resume_v3.pdf';
        
        this.displayOutput(`
            <div style="color: #cccccc;">
                <div style="color: #00ffff;">drwxr-xr-x 2 ${username} ${username} 4096 Dec  7 16:10 <span style="color: #ffff00;">about/</span></div>
                <div style="color: #00ffff;">drwxr-xr-x 2 ${username} ${username} 4096 Dec  7 16:10 <span style="color: #ffff00;">skills/</span></div>
                <div style="color: #00ffff;">drwxr-xr-x 2 ${username} ${username} 4096 Dec  7 16:10 <span style="color: #ffff00;">experience/</span></div>
                <div style="color: #00ffff;">drwxr-xr-x 2 ${username} ${username} 4096 Dec  7 16:10 <span style="color: #ffff00;">achievements/</span></div>
                <div style="color: #00ffff;">drwxr-xr-x 2 ${username} ${username} 4096 Dec  7 16:10 <span style="color: #ffff00;">projects/</span></div>
                <div style="color: #00ffff;">-rw-r--r-- 1 ${username} ${username} 2048 Dec  7 16:10 <span style="color: #ffffff;">README.md</span></div>
                <div style="color: #00ffff;">-rw-r--r-- 1 ${username} ${username} 1024 Dec  7 16:10 <span style="color: #ffffff;">contact.txt</span></div>
                <div style="color: #00ffff;">-rw-r--r-- 1 ${username} ${username} 4096 Dec  7 16:10 <span style="color: #ff0000;">${resumeFile}</span></div>
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
            this.displayOutput(`<pre style="color: #cccccc; white-space: pre-wrap;">${files[filename]}</pre>`);
        } else {
            this.displayOutput(`cat: ${args[0]}: No such file or directory`, 'error');
        }
    }

    echo(args) {
        if (!args || args.length === 0) {
            this.displayOutput('');
        } else {
            this.displayOutput(`<span style="color: #cccccc;">${args.join(' ')}</span>`);
        }
    }

    showDate() {
        const now = new Date();
        this.displayOutput(`<span style="color: #00ffff;">${now.toString()}</span>`);
    }

    showUptime() {
        const now = new Date();
        const uptime = Math.floor((now - this.startTime) / 1000);
        const hours = Math.floor(uptime / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = uptime % 60;
        
        this.displayOutput(`<span style="color: #00ffff;">up ${hours}h ${minutes}m ${seconds}s, load average: 0.15, 0.12, 0.08</span>`);
    }

    showNeofetch() {
        const profile = this.profileData?.personal || {};
        const skills = this.profileData?.skills || {};
        
        this.displayOutput(`
            <div class="neofetch-content" style="display: flex; gap: 20px;">
                <pre style="color: #00ffff; font-size: 10px;">
     .-.-.   .-.-.   .-.-.   .-.-.   .-.-.
    ( H | L )( I | E )( U | . )( L | E )
     \`-'\`   \`-'\`   \`-'\`   \`-'\`   \`-'\`
                </pre>
                <div style="color: #cccccc;">
                    <p><span style="color: #00ff00;">User:</span> ${profile.name || 'Lê Hiếu'}</p>
                    <p><span style="color: #00ff00;">Title:</span> ${profile.title || 'Senior DevOps/SRE'}</p>
                    <p><span style="color: #00ff00;">OS:</span> Linux Terminal Environment</p>
                    <p><span style="color: #00ff00;">Shell:</span> Interactive Portfolio Terminal</p>
                    <p><span style="color: #00ff00;">Languages:</span> ${(skills.programming || []).join(', ')}</p>
                    <p><span style="color: #00ff00;">Cloud:</span> ${(skills.cloud_platforms || []).join(', ')}</p>
                    <p><span style="color: #00ff00;">DevOps:</span> ${(skills.containers_virtualization || []).join(', ')}</p>
                    <p><span style="color: #00ff00;">Status:</span> Available for hire</p>
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
                <div style="color: #ff0000;">
                    <p>[sudo] password for visitor: ••••••••</p>
                    <p style="color: #00ff00;">Access granted! Executing privileged hire command...</p>
                    <p style="color: #ffff00;">🚨 ALERT: Exceptional DevOps engineer detected!</p>
                    <p style="color: #00ffff;">Contact ${profile.email} immediately for interview.</p>
                </div>
            `);
        } else {
            this.displayOutput(`sudo: ${command}: command not found`, 'error');
        }
    }
}

// Initialize terminal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TerminalEmulator();
});

// Add CSS for terminal command styling
const additionalStyles = `
    .terminal-command-line {
        margin-bottom: 5px;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .prompt-output .user {
        color: #00ff00;
        text-shadow: 0 0 5px rgba(0, 255, 0, 0.7);
    }

    .prompt-output .separator {
        color: #ffffff;
    }

    .prompt-output .path {
        color: #00ffff;
        text-shadow: 0 0 5px rgba(0, 255, 255, 0.7);
    }

    .prompt-output .dollar {
        color: #ffffff;
    }

    .command-text {
        color: #ffff00;
        text-shadow: 0 0 5px rgba(255, 255, 0, 0.5);
    }

    .terminal-output-line {
        margin-bottom: 10px;
        padding-left: 20px;
        border-left: 2px solid rgba(0, 255, 0, 0.2);
    }

    .terminal-output-line.error {
        color: #ff6b6b;
        border-left-color: rgba(255, 107, 107, 0.5);
    }

    .terminal-output-line.success {
        color: #51cf66;
        border-left-color: rgba(81, 207, 102, 0.5);
    }

    .welcome-msg p {
        margin-bottom: 8px;
    }

    .help-content h3 {
        border-bottom: 1px solid rgba(0, 255, 255, 0.3);
        padding-bottom: 5px;
    }

    .neofetch-content {
        align-items: flex-start;
    }

    @media (max-width: 768px) {
        .neofetch-content {
            flex-direction: column;
            gap: 10px;
        }
        
        .neofetch-content pre {
            font-size: 8px;
        }
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