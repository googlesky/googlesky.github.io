// Terminal Commands and Interactive Functionality
class TerminalEmulator {
    constructor() {
        this.terminalOutput = document.getElementById('terminal-output');
        this.terminalInput = document.getElementById('terminal-input');
        this.currentTimeElement = document.getElementById('current-time');
        
        this.commands = {
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
        };

        this.commandHistory = [];
        this.historyIndex = -1;
        this.startTime = new Date();

        this.init();
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
                <span class="user">visitor@hieulephuong-terminal</span><span class="separator">:</span><span class="path">~</span><span class="dollar">$</span>
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
        this.currentTimeElement.textContent = now.toLocaleTimeString();
    }

    // Command implementations
    showWelcomeMessage() {
        this.displayOutput(`
            <div class="welcome-msg">
                <p style="color: #00ffff;">Welcome to Lê Phương Hiếu's Interactive Terminal!</p>
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
        this.displayOutput(`
            <div class="about-content">
                <h3 style="color: #00ffff; margin-bottom: 15px;">About Lê Phương Hiếu</h3>
                <p><span style="color: #00ff00;">Name:</span> Lê Phương Hiếu</p>
                <p><span style="color: #00ff00;">Title:</span> Senior DevOps/SRE</p>
                <p><span style="color: #00ff00;">Email:</span> HIEULP@1DEVOPS.IO</p>
                <p><span style="color: #00ff00;">Phone:</span> (084) 975-669-775</p>
                <p><span style="color: #00ff00;">Location:</span> Thu Duc, Ho Chi Minh City, Vietnam</p>
                <p><span style="color: #00ff00;">Experience:</span> 8+ years in DevOps, SRE, and System Administration</p>
                <p style="margin-top: 15px; color: #cccccc;">
                    Passionate about cloud infrastructure, automation, AI/ML platforms, security, and building reliable systems at scale.
                    Experienced with AWS, Azure, Kubernetes, Docker, Terraform, Golang, Python, and various cloud technologies.
                </p>
            </div>
        `);
    }

    showSkills() {
        this.displayOutput(`
            <div class="skills-content">
                <h3 style="color: #00ffff; margin-bottom: 15px;">Technical Skills</h3>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">Programming Languages:</h4>
                    <p style="color: #cccccc;">Golang (1 year), Python (3 years), PHP (5 years), Shell Script</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">CI/CD & Automation:</h4>
                    <p style="color: #cccccc;">Jenkins, Gitlab-CI, Github, Ansible, Terraform, Helm/Helmfile</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">Operating Systems:</h4>
                    <p style="color: #cccccc;">Linux (Arch, CentOS/RHEL7, Ubuntu), Windows, Unix</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">Containers/Virtualization:</h4>
                    <p style="color: #cccccc;">Docker, Kubernetes, Openshift</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">Databases:</h4>
                    <p style="color: #cccccc;">TiDB, MySQL/MariaDB, PostgreSQL, Oracle</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">Cloud Platforms:</h4>
                    <p style="color: #cccccc;">AWS (EC2, S3, RDS, EKS, IAM, SecurityHub), Azure (AKS, PostgreSQL, Alert, WAF), IBM, Oracle Cloud</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">Networking:</h4>
                    <p style="color: #cccccc;">Network Design, Troubleshooting, CCNA, PfSense, OpenWRT, DD-WRT</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">Monitoring/Logging:</h4>
                    <p style="color: #cccccc;">Grafana, Prometheus, ELK, Exporter</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">Security:</h4>
                    <p style="color: #cccccc;">DockerSec, Prowler, Trivy, Falco, CrowdSec</p>
                </div>
                <div>
                    <h4 style="color: #ffff00;">Registry & Proxy:</h4>
                    <p style="color: #cccccc;">Nexus, JFrog, Maven, Docker registry, HaProxy, Nginx, Cloudflare</p>
                </div>
            </div>
        `);
    }

    showExperience() {
        this.displayOutput(`
            <div class="experience-content">
                <h3 style="color: #00ffff; margin-bottom: 15px;">Professional Experience</h3>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">CONFIDENTIAL (HCMC/Thailand) — Senior DevOps (Dec 2022–Present)</h4>
                    <p style="color: #cccccc;">Setup/maintain CI/CD for AI models/apps (Jenkins, GitLab-CI). Managed Azure DevOps services (AKS, Storage, VMs, PostgreSQL, MySQL). Migrated AWS to Azure, optimized resources. Led DevOps team, built scalable deployments (Helm, ArgoCD). Enhanced security (DockerSec), managed MongoDB Atlas. Integrated Llama, GPT-4, LLMs. Trained models (YoloV8, lgbm, lstm) for fraud detection, food supply forecasting.</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">ParcelPerform — Senior DevOps (Jul 2022–Dec 2022)</h4>
                    <p style="color: #cccccc;">CI/CD with GitLab-CI, GitOps, AWS services, Terraform, Helm. Security with Prowler, Trivy, Falco, OPA, DockerSec. Automated tasks with Bash, Spark/Flink for real-time data.</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">HomeCredit — Senior DevOps (Jul 2021–Jul 2022)</h4>
                    <p style="color: #cccccc;">CI/CD for sales systems, Azure services, PostgreSQL, Oracle, WAF. Automated deployments (Python, Golang), managed AKS clusters.</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">VNG-ZaloPay — Senior DevOps/SRE/SO (Jun 2020–Jul 2021)</h4>
                    <p style="color: #cccccc;">Managed K8s, TiDB, MySQL, CI/CD (Jenkins), Ansible, Python, Golang. Managed caching/message brokers (Memcache, Redis, Kafka).</p>
                </div>
                <div>
                    <h4 style="color: #ffff00;">Achievements & Certifications</h4>
                    <p style="color: #cccccc;"><strong>CCNA (05-2013)</strong> • <strong>ACMICPC 2nd Open Source (08-12-2017)</strong> • <strong>Promoted to DevOps (12-2018)</strong> • <strong>Developed KBTG CI/CD Framework (09-2019)</strong> • <strong>Developed ZaloPay CI/CD Framework - Saved ~90% TTM (01-2020)</strong> • <strong>Promoted to Senior DevOps (04-2021)</strong> • <strong>SLA Keeper 99.95% HomeCredit Salers App (04-2022)</strong> • <strong>30% AWS Cost Reduction ParcelPerform (11-2022)</strong> • <strong>Migrated AWS to Azure in 3M (10-2023)</strong></p>
                </div>
            </div>
        `);
    }

    showProjects() {
        this.displayOutput(`
            <div class="projects-content">
                <h3 style="color: #00ffff; margin-bottom: 15px;">Notable Projects</h3>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">🚀 Cloud Infrastructure Automation</h4>
                    <p style="color: #cccccc;">Designed and implemented Infrastructure as Code using Terraform for multi-cloud environments (AWS, Azure). Automated provisioning, scaling, and monitoring of cloud resources.</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">🔒 Security-First CI/CD Pipeline</h4>
                    <p style="color: #cccccc;">Built comprehensive DevSecOps pipelines with integrated security scanning (Trivy, Prowler), vulnerability assessment, and compliance checks. Reduced security incidents by 80%.</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">📊 Kubernetes Monitoring Platform</h4>
                    <p style="color: #cccccc;">Deployed enterprise-grade monitoring solution using Prometheus, Grafana, and custom dashboards. Improved system observability and reduced MTTR by 60%.</p>
                </div>
                <div style="margin-bottom: 15px;">
                    <h4 style="color: #ffff00;">🗄️ Database Performance Optimization</h4>
                    <p style="color: #cccccc;">Optimized TiDB and MySQL clusters for high-traffic applications. Implemented automated backup strategies and disaster recovery procedures.</p>
                </div>
                <div>
                    <h4 style="color: #ffff00;">🔧 GitOps Workflow Implementation</h4>
                    <p style="color: #cccccc;">Established GitOps practices for application deployment and configuration management. Improved deployment reliability and rollback capabilities.</p>
                </div>
            </div>
        `);
    }

    showContact() {
        this.displayOutput(`
            <div class="contact-content">
                <h3 style="color: #00ffff; margin-bottom: 15px;">Contact Information</h3>
                <p><span style="color: #00ff00;">📧 Email:</span> <a href="mailto:HIEULP@1DEVOPS.IO" style="color: #ffff00;">HIEULP@1DEVOPS.IO</a></p>
                <p><span style="color: #00ff00;">📞 Phone:</span> <a href="tel:+84975669775" style="color: #ffff00;">(084) 975-669-775</a></p>
                <p><span style="color: #00ff00;">🌍 Location:</span> Thu Duc, Ho Chi Minh City, Vietnam</p>
                <p><span style="color: #00ff00;">📄 Resume:</span> <a href="LePhuongHieu_DevOps_Resume_v3.pdf" target="_blank" style="color: #ffff00;">Download PDF</a></p>
                <br>
                <p style="color: #00ffff;">💡 Available for:</p>
                <ul style="color: #cccccc; margin-left: 20px;">
                    <li>DevOps Engineering positions</li>
                    <li>Site Reliability Engineering roles</li>
                    <li>Cloud Infrastructure consulting</li>
                    <li>AI/ML Platform engineering</li>
                    <li>Technical architecture discussions</li>
                </ul>
            </div>
        `);
    }

    showSocial() {
        this.displayOutput(`
            <div class="social-content">
                <h3 style="color: #00ffff; margin-bottom: 15px;">Social Networks</h3>
                <p><span style="color: #00ff00;">💼 LinkedIn:</span> <a href="https://linkedin.com/in/googlesky" target="_blank" style="color: #ffff00;">linkedin.com/in/googlesky</a></p>
                <p><span style="color: #00ff00;">🐙 GitHub:</span> <a href="https://github.com/googlesky" target="_blank" style="color: #ffff00;">github.com/googlesky</a></p>
                <p><span style="color: #00ff00;">✈️ Telegram:</span> <a href="https://t.me/googlesky" target="_blank" style="color: #ffff00;">t.me/googlesky</a></p>
                <p><span style="color: #00ff00;">🦊 GitLab:</span> <a href="https://gitlab.com/googlesky" target="_blank" style="color: #ffff00;">gitlab.com/googlesky</a></p>
                <p><span style="color: #00ff00;">🪣 Bitbucket:</span> <a href="https://bitbucket.org/googlesky" target="_blank" style="color: #ffff00;">bitbucket.org/googlesky</a></p>
                <p><span style="color: #00ff00;">📚 Stack Overflow:</span> <a href="https://stackoverflow.com/users/9845363/zu-vn" target="_blank" style="color: #ffff00;">stackoverflow.com/users/9845363/zu-vn</a></p>
            </div>
        `);
    }

    downloadResume() {
        this.displayOutput(`
            <div class="resume-content">
                <p style="color: #00ffff;">📄 Opening resume download...</p>
                <p style="color: #cccccc;">File: LePhuongHieu_DevOps_Resume_v3.pdf</p>
                <p><a href="LePhuongHieu_DevOps_Resume_v3.pdf" target="_blank" style="color: #ffff00;">Click here if download doesn't start automatically</a></p>
            </div>
        `);
        
        // Simulate download
        setTimeout(() => {
            window.open('LePhuongHieu_DevOps_Resume_v3.pdf', '_blank');
        }, 1000);
    }

    hireMe() {
        this.displayOutput(`
            <div class="hire-content">
                <h3 style="color: #00ffff; margin-bottom: 15px;">Why Hire Lê Phương Hiếu?</h3>
                <ul style="color: #cccccc; margin-left: 20px;">
                    <li>🚀 <strong>8+ years</strong> of hands-on DevOps and SRE experience</li>
                    <li>☁️ <strong>Multi-cloud expertise</strong> (AWS, Azure, IBM, Oracle Cloud)</li>
                    <li>🔒 <strong>Security-first mindset</strong> with modern security tools</li>
                    <li>📈 <strong>Proven track record</strong> of improving system reliability (99.95% SLA)</li>
                    <li>🛠️ <strong>Full-stack automation</strong> from infrastructure to AI/ML deployment</li>
                    <li>📊 <strong>Monitoring & observability</strong> expertise</li>
                    <li>🤖 <strong>AI/ML Platform experience</strong> with modern frameworks</li>
                    <li>💰 <strong>Cost optimization specialist</strong> (30% AWS cost reduction)</li>
                    <li>🎯 <strong>Problem solver</strong> with strong analytical skills</li>
                    <li>🤝 <strong>Collaborative team leader</strong> with mentorship experience</li>
                </ul>
                <br>
                <p style="color: #00ff00;">Ready to bring reliability, security, and efficiency to your infrastructure!</p>
                <p style="color: #ffff00;">Contact: HIEULP@1DEVOPS.IO | (084) 975-669-775</p>
            </div>
        `);
    }

    clearTerminal() {
        this.terminalOutput.innerHTML = '';
        this.showWelcomeMessage();
    }

    whoAmI() {
        this.displayOutput('<span style="color: #00ff00;">visitor</span>');
    }

    printWorkingDirectory() {
        this.displayOutput('<span style="color: #00ffff;">/home/hieu/portfolio</span>');
    }

    listDirectory() {
        this.displayOutput(`
            <div style="color: #cccccc;">
                <div style="color: #00ffff;">drwxr-xr-x 2 hieu hieu 4096 Dec  7 16:10 <span style="color: #ffff00;">about/</span></div>
                <div style="color: #00ffff;">drwxr-xr-x 2 hieu hieu 4096 Dec  7 16:10 <span style="color: #ffff00;">skills/</span></div>
                <div style="color: #00ffff;">drwxr-xr-x 2 hieu hieu 4096 Dec  7 16:10 <span style="color: #ffff00;">experience/</span></div>
                <div style="color: #00ffff;">drwxr-xr-x 2 hieu hieu 4096 Dec  7 16:10 <span style="color: #ffff00;">projects/</span></div>
                <div style="color: #00ffff;">-rw-r--r-- 1 hieu hieu 2048 Dec  7 16:10 <span style="color: #ffffff;">README.md</span></div>
                <div style="color: #00ffff;">-rw-r--r-- 1 hieu hieu 1024 Dec  7 16:10 <span style="color: #ffffff;">contact.txt</span></div>
                <div style="color: #00ffff;">-rw-r--r-- 1 hieu hieu 4096 Dec  7 16:10 <span style="color: #ff0000;">LePhuongHieu_DevSecOps_Resume_v2.pdf</span></div>
            </div>
        `);
    }

    catFile(args) {
        if (!args || args.length === 0) {
            this.displayOutput('cat: missing file operand', 'error');
            return;
        }

        const filename = args[0].toLowerCase();
        const files = {
            'readme.md': 'Welcome to Hieu Le\'s Professional Portfolio\n\nA passionate DevSecOps and SRE professional with expertise in cloud infrastructure, automation, and security.',
            'contact.txt': 'Email: phuonghieuag@gmail.com\nPhone: 0975 669 775\nLinkedIn: linkedin.com/in/googlesky\nGitHub: github.com/googlesky',
            'about.txt': 'Hieu Le - Senior DevSecOps Engineering / Site Reliability Engineering\n8+ years of experience in DevOps, SRE, and System Administration'
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
        this.displayOutput(`
            <div class="neofetch-content" style="display: flex; gap: 20px;">
                <pre style="color: #00ffff; font-size: 10px;">
     .-.-.   .-.-.   .-.-.   .-.-.   .-.-.
    ( H | L )( I | E )( U | . )( L | E )
     \`-'\`   \`-'\`   \`-'\`   \`-'\`   \`-'\`
                </pre>
                <div style="color: #cccccc;">
                    <p><span style="color: #00ff00;">User:</span> Hieu Le</p>
                    <p><span style="color: #00ff00;">Title:</span> Senior DevSecOps Engineer</p>
                    <p><span style="color: #00ff00;">OS:</span> Linux Terminal Environment</p>
                    <p><span style="color: #00ff00;">Shell:</span> Interactive Portfolio Terminal</p>
                    <p><span style="color: #00ff00;">Languages:</span> Python, Go, JavaScript, C++</p>
                    <p><span style="color: #00ff00;">Cloud:</span> AWS, Azure, OpenShift</p>
                    <p><span style="color: #00ff00;">DevOps:</span> Docker, Kubernetes, Terraform</p>
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
        if (command === 'hire') {
            this.displayOutput(`
                <div style="color: #ff0000;">
                    <p>[sudo] password for visitor: ••••••••</p>
                    <p style="color: #00ff00;">Access granted! Executing privileged hire command...</p>
                    <p style="color: #ffff00;">🚨 ALERT: Exceptional DevSecOps engineer detected!</p>
                    <p style="color: #00ffff;">Contact phuonghieuag@gmail.com immediately for interview.</p>
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

// Add typing sound to input (optional - uncomment if desired)
// document.addEventListener('keydown', (e) => {
//     if (e.target.matches('.terminal-input')) {
//         playTypingSound();
//     }
// });

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