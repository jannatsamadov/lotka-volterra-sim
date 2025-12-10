class LotkaVolterraSimulation {
    constructor() {
        this.isRunning = false;
        this.time = 0;
        this.dt = 0.01;
        
        // Parameters
        this.params = {
            a: 1.0,  // prey growth rate
            b: 0.1,  // predation rate
            c: 1.0,  // predator death rate
            d: 0.075 // predator efficiency
        };
        
        // Initial populations
        this.populations = {
            prey: 10,
            predator: 5
        };
        
        // Data storage for charts
        this.timeData = [];
        this.preyData = [];
        this.predatorData = [];
        this.phaseSpaceData = [];
        
        // Chart instances
        this.populationChart = null;
        this.phaseSpaceChart = null;
        
        this.initCharts();
        this.setupEventListeners();
        this.updateDisplay();
    }
    
    initCharts() {
        // Population chart
        const popCtx = document.getElementById('populationChart').getContext('2d');
        this.populationChart = new Chart(popCtx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [
                    {
                        label: 'Qurban',
                        data: [],
                        borderColor: '#4caf50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        tension: 0.4
                    },
                    {
                        label: 'Yırtıcı',
                        data: [],
                        borderColor: '#f44336',
                        backgroundColor: 'rgba(244, 67, 54, 0.1)',
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#fff',
                            font: { size: 14 }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#fff' },
                        title: {
                            display: true,
                            text: 'Vaxt',
                            color: '#fff'
                        }
                    },
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#fff' },
                        title: {
                            display: true,
                            text: 'Populyasiya',
                            color: '#fff'
                        }
                    }
                }
            }
        });
        
        // Phase space chart
        const phaseCtx = document.getElementById('phaseSpaceChart').getContext('2d');
        this.phaseSpaceChart = new Chart(phaseCtx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Faza fəzası',
                    data: [],
                    backgroundColor: '#64b5f6',
                    borderColor: '#64b5f6',
                    pointRadius: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#fff',
                            font: { size: 14 }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#fff' },
                        title: {
                            display: true,
                            text: 'Qurban',
                            color: '#fff'
                        }
                    },
                    y: {
                        grid: { color: 'rgba(255, 255, 255, 0.1)' },
                        ticks: { color: '#fff' },
                        title: {
                            display: true,
                            text: 'Yırtıcı',
                            color: '#fff'
                        }
                    }
                }
            }
        });
    }
    
    setupEventListeners() {
        // Parameter sliders
        const sliders = ['preyGrowth', 'predationRate', 'predatorDeath', 'predatorEfficiency'];
        sliders.forEach(param => {
            const slider = document.getElementById(param);
            const valueSpan = document.getElementById(param + 'Value');
            
            slider.addEventListener('input', (e) => {
                const value = parseFloat(e.target.value);
                valueSpan.textContent = value;
                
                switch(param) {
                    case 'preyGrowth': this.params.a = value; break;
                    case 'predationRate': this.params.b = value; break;
                    case 'predatorDeath': this.params.c = value; break;
                    case 'predatorEfficiency': this.params.d = value; break;
                }
            });
        });
        
        // Population sliders
        document.getElementById('preyInitial').addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            document.getElementById('preyInitialValue').textContent = value;
            this.populations.prey = value;
            this.updateDisplay();
        });
        
        document.getElementById('predatorInitial').addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            document.getElementById('predatorInitialValue').textContent = value;
            this.populations.predator = value;
            this.updateDisplay();
        });
        
        // Control buttons
        document.getElementById('startBtn').addEventListener('click', () => this.start());
        document.getElementById('pauseBtn').addEventListener('click', () => this.pause());
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.simulate();
        }
    }
    
    pause() {
        this.isRunning = false;
    }
    
    reset() {
        this.isRunning = false;
        this.time = 0;
        this.timeData = [];
        this.preyData = [];
        this.predatorData = [];
        this.phaseSpaceData = [];
        
        // Reset populations to initial values
        this.populations.prey = parseInt(document.getElementById('preyInitial').value);
        this.populations.predator = parseInt(document.getElementById('predatorInitial').value);
        
        this.updateCharts();
        this.updateDisplay();
    }
    
    simulate() {
        if (!this.isRunning) return;
        
        // Lotka-Volterra equations
        const { prey, predator } = this.populations;
        const { a, b, c, d } = this.params;
        
        // Calculate derivatives
        const dPrey = a * prey - b * prey * predator;
        const dPredator = d * b * prey * predator - c * predator;
        
        // Update populations using Euler's method
        this.populations.prey += dPrey * this.dt;
        this.populations.predator += dPredator * this.dt;
        
        // Ensure populations don't go negative
        this.populations.prey = Math.max(0, this.populations.prey);
        this.populations.predator = Math.max(0, this.populations.predator);
        
        // Store data for visualization
        this.time += this.dt;
        this.timeData.push(this.time);
        this.preyData.push(this.populations.prey);
        this.predatorData.push(this.populations.predator);
        this.phaseSpaceData.push({
            x: this.populations.prey,
            y: this.populations.predator
        });
        
        // Limit data points to prevent memory issues
        const maxDataPoints = 1000;
        if (this.timeData.length > maxDataPoints) {
            this.timeData.shift();
            this.preyData.shift();
            this.predatorData.shift();
            this.phaseSpaceData.shift();
        }
        
        this.updateCharts();
        this.updateDisplay();
        
        // Continue simulation
        requestAnimationFrame(() => this.simulate());
    }
    
    updateCharts() {
        // Update population chart
        this.populationChart.data.labels = this.timeData;
        this.populationChart.data.datasets[0].data = this.preyData;
        this.populationChart.data.datasets[1].data = this.predatorData;
        this.populationChart.update('none');
        
        // Update phase space chart
        this.phaseSpaceChart.data.datasets[0].data = this.phaseSpaceData;
        this.phaseSpaceChart.update('none');
    }
    
    updateDisplay() {
        document.getElementById('timeDisplay').textContent = this.time.toFixed(2);
        document.getElementById('preyCount').textContent = Math.round(this.populations.prey);
        document.getElementById('predatorCount').textContent = Math.round(this.populations.predator);
    }
}

// Initialize simulation when page loads
window.addEventListener('DOMContentLoaded', () => {
    new LotkaVolterraSimulation();
});

