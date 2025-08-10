// Pairfect - Premium Spiritual Web App
// Lead UI/UX Engineer Implementation

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    setupEventListeners();
    initializeFormSteps();
    updateOrderSummary();
    addScrollAnimations();
}

function setupEventListeners() {
    // Report type toggle
    const reportTypeInputs = document.querySelectorAll('input[name="reportType"]');
    reportTypeInputs.forEach(input => {
        input.addEventListener('change', handleReportTypeChange);
    });

    // File upload handler
    const screenshotInput = document.getElementById('screenshot');
    screenshotInput.addEventListener('change', handleFileSelect);

    // Form submission
    const form = document.getElementById('reportForm');
    form.addEventListener('submit', handleFormSubmit);

    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

function initializeFormSteps() {
    // Show first step by default
    showStep(1);
}

function handleReportTypeChange() {
    const reportType = document.querySelector('input[name="reportType"]:checked').value;
    const partnerSections = document.querySelectorAll('.partner-section');
    const partnerName = document.getElementById('partnerName');
    const partnerDob = document.getElementById('partnerDob');
    const partnerGender = document.getElementById('partnerGender');

    if (reportType === 'couple') {
        partnerSections.forEach(section => {
            section.style.display = 'block';
        });
        partnerName.required = true;
        partnerDob.required = true;
        partnerGender.required = true;
    } else {
        partnerSections.forEach(section => {
            section.style.display = 'none';
        });
        partnerName.required = false;
        partnerDob.required = false;
        partnerGender.required = false;
    }

    updateOrderSummary();
}

function updateOrderSummary() {
    const reportType = document.querySelector('input[name="reportType"]:checked').value;
    const orderType = document.getElementById('orderType');
    const orderPrice = document.getElementById('orderPrice');
    const orderTotal = document.getElementById('orderTotal');
    const displayAmount = document.getElementById('displayAmount');
    const verifyAmount = document.getElementById('verifyAmount');

    if (reportType === 'couple') {
        orderType.textContent = 'Couple Compatibility Report (Single Report)';
        orderPrice.textContent = '₹100';
        orderTotal.textContent = '₹100';
        if (displayAmount) displayAmount.textContent = '₹100';
        if (verifyAmount) verifyAmount.textContent = '₹100';
    } else if (reportType === 'future') {
        orderType.textContent = '5-Year Future Report with Remedies (Single Report)';
        orderPrice.textContent = '₹200';
        orderTotal.textContent = '₹200';
        if (displayAmount) displayAmount.textContent = '₹200';
        if (verifyAmount) verifyAmount.textContent = '₹200';
    } else {
        orderType.textContent = 'Individual Report (Single Report)';
        orderPrice.textContent = '₹50';
        orderTotal.textContent = '₹50';
        if (displayAmount) displayAmount.textContent = '₹50';
        if (verifyAmount) verifyAmount.textContent = '₹50';
    }
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    const fileNameDiv = document.getElementById('fileName');
    
    if (file) {
        fileNameDiv.textContent = `Selected: ${file.name}`;
        fileNameDiv.style.color = '#4CAF50';
        fileNameDiv.style.fontWeight = '600';
    } else {
        fileNameDiv.textContent = '';
    }
}

function showStep(stepNumber) {
    // Hide all steps
    document.querySelectorAll('.form-step').forEach(step => {
        step.classList.remove('active');
    });

    // Show current step
    const currentStep = document.getElementById(`step${stepNumber}`);
    if (currentStep) {
        currentStep.classList.add('active');
    }

    // Update step indicators
    updateStepIndicators(stepNumber);
}

function updateStepIndicators(currentStep) {
    const indicators = document.querySelectorAll('.step-indicator');
    indicators.forEach((indicator, index) => {
        const stepNumber = indicator.querySelector('.step-number');
        const stepText = indicator.querySelector('.step-text');
        
        if (index + 1 < currentStep) {
            stepNumber.style.background = '#4CAF50';
            stepText.style.color = '#4CAF50';
        } else if (index + 1 === currentStep) {
            stepNumber.style.background = 'var(--primary-gradient)';
            stepText.style.color = 'var(--text-primary)';
        } else {
            stepNumber.style.background = '#e2e8f0';
            stepText.style.color = '#718096';
        }
    });
}

function nextStep() {
    const currentStep = getCurrentStep();
    const nextStepNumber = currentStep + 1;
    
    if (validateCurrentStep(currentStep)) {
        showStep(nextStepNumber);
        
        // Hide landing sections when moving to step 2 (entering details)
        if (nextStepNumber === 2) {
            hideLandingSections();
        }
        
        scrollToTop();
    }
}

function prevStep() {
    const currentStep = getCurrentStep();
    const prevStepNumber = currentStep - 1;
    
    if (prevStepNumber >= 1) {
        showStep(prevStepNumber);
        
        // Show landing sections when going back to step 1
        if (prevStepNumber === 1) {
            showLandingSections();
        }
        
        scrollToTop();
    }
}

function getCurrentStep() {
    const activeStep = document.querySelector('.form-step.active');
    return parseInt(activeStep.id.replace('step', ''));
}

function validateCurrentStep(stepNumber) {
    switch (stepNumber) {
        case 1:
            // Step 1 validation - report type selection
            const selectedType = document.querySelector('input[name="reportType"]:checked');
            if (!selectedType) {
                showError('Please select a report type');
                return false;
            }
            return true;
            
        case 2:
            // Step 2 validation - personal details
            const name = document.getElementById('name').value.trim();
            const dob = document.getElementById('dob').value;
            const gender = document.getElementById('gender').value;
            const reportType = document.querySelector('input[name="reportType"]:checked').value;
            
            if (!name) {
                showError('Please enter your full name');
                return false;
            }
            
            if (!dob) {
                showError('Please enter your date of birth');
                return false;
            }
            
            if (!gender) {
                showError('Please select your gender');
                return false;
            }
            
            if (reportType === 'couple') {
                const partnerName = document.getElementById('partnerName').value.trim();
                const partnerDob = document.getElementById('partnerDob').value;
                const partnerGender = document.getElementById('partnerGender').value;
                
                if (!partnerName) {
                    showError('Please enter your partner\'s full name');
                    return false;
                }
                
                if (!partnerDob) {
                    showError('Please enter your partner\'s date of birth');
                    return false;
                }
                
                if (!partnerGender) {
                    showError('Please select your partner\'s gender');
                    return false;
                }
            }
            
            return true;
            
        case 3:
            // Step 3 validation - payment confirmation
            // No validation needed since user confirms payment completion
            return true;
            
        default:
            return true;
    }
}

function showError(message) {
    // Remove existing error messages
    const existingError = document.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Create new error message
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message error';
    errorDiv.textContent = message;
    
    // Insert error message after current step
    const currentStep = document.querySelector('.form-step.active');
    currentStep.appendChild(errorDiv);
    
    // Auto-remove error after 5 seconds
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.remove();
        }
    }, 5000);
}

async function handleFormSubmit(event) {
    event.preventDefault();
    
    const submitBtn = document.querySelector('.submit-btn');
    const btnText = document.querySelector('.btn-text');
    const loading = document.querySelector('.loading');
    
    // Show loading state
    submitBtn.disabled = true;
    btnText.style.display = 'none';
    loading.style.display = 'inline';
    
    try {
        const formData = collectFormData();
        
        if (!validateFormData(formData)) {
            throw new Error('Please fill in all required fields');
        }
        
        // Hide landing sections immediately when form is submitted
        hideLandingSections();
        
        // Simulate processing delay with progress
        await simulateProcessing();
        
        // Generate report locally
        const result = generateReportLocally(formData);
        
        if (result.success) {
            displayReport(result.report, formData.reportType);
            showSuccessMessage();
        } else {
            displayMessage(result.message, 'error');
        }
        
    } catch (error) {
        displayMessage(error.message, 'error');
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        loading.style.display = 'none';
    }
}

async function simulateProcessing() {
    const steps = [
        'Processing your information...',
        'Calculating numerology patterns...',
        'Analyzing astrological influences...',
        'Generating personalized insights...',
        'Preparing your spiritual report...'
    ];
    
    const loading = document.querySelector('.loading');
    
    for (let i = 0; i < steps.length; i++) {
        loading.textContent = `✨ ${steps[i]}`;
        await new Promise(resolve => setTimeout(resolve, 800));
    }
}

function collectFormData() {
    const reportType = document.querySelector('input[name="reportType"]:checked').value;
    const name = document.getElementById('name').value.trim();
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;
    const timeOfBirth = document.getElementById('timeOfBirth').value;
    const partnerName = document.getElementById('partnerName').value.trim();
    const partnerDob = document.getElementById('partnerDob').value;
    const partnerGender = document.getElementById('partnerGender').value;
    const partnerTimeOfBirth = document.getElementById('partnerTimeOfBirth').value;
    
    return {
        reportType,
        name,
        dob,
        gender,
        timeOfBirth,
        partnerName: reportType === 'couple' ? partnerName : '',
        partnerDob: reportType === 'couple' ? partnerDob : '',
        partnerGender: reportType === 'couple' ? partnerGender : '',
        partnerTimeOfBirth: reportType === 'couple' ? partnerTimeOfBirth : ''
    };
}

function validateFormData(data) {
    if (!data.name || !data.dob || !data.gender) return false;
    if (data.reportType === 'couple' && (!data.partnerName || !data.partnerDob || !data.partnerGender)) return false;
    
    return true;
}

function generateReportLocally(formData) {
    // For demo purposes, we'll generate reports locally
    // In production, this would be handled by the Apps Script backend
    
    if (formData.reportType === 'individual') {
        const report = generateIndividualReport(formData.name, formData.dob, formData.gender, formData.timeOfBirth);
        return {
            success: true,
            report: report,
            usageInfo: {
                usageCount: 1,
                status: 'Premium'
            }
        };
    } else if (formData.reportType === 'future') {
        const report = generateFutureReport(formData.name, formData.dob, formData.gender, formData.timeOfBirth);
        return {
            success: true,
            report: report,
            usageInfo: {
                usageCount: 1,
                status: 'Premium'
            }
        };
    } else {
        const report = generateCoupleReport(formData.name, formData.dob, formData.gender, formData.timeOfBirth, formData.partnerName, formData.partnerDob, formData.partnerGender, formData.partnerTimeOfBirth);
        return {
            success: true,
            report: report,
            usageInfo: {
                usageCount: 1,
                status: 'Premium'
            }
        };
    }
}

function generateIndividualReport(name, dob, gender, timeOfBirth) {
    // Use the NumerologyCalculator and ZodiacCalculator classes
    const numerology = NumerologyCalculator.generateProfile(name, dob);
    const astrology = ZodiacCalculator.generateProfile(name, dob);
    
    // Calculate Destiny Number and Birth Number
    const destinyNumber = NumerologyCalculator.calculateDestinyNumber(name);
    const birthNumber = NumerologyCalculator.calculateBirthNumber(dob);
    
    // Generate time-based insights if time of birth is provided
    const timeInsights = timeOfBirth ? NumerologyCalculator.generateTimeInsights(timeOfBirth, gender) : null;
    
    return {
        lifePathNumber: numerology.lifePathNumber,
        lifePathDescription: numerology.lifePathDescription,
        nameNumber: numerology.nameNumber,
        nameDescription: numerology.nameDescription,
        destinyNumber: destinyNumber.number,
        destinyDescription: destinyNumber.description,
        birthNumber: birthNumber.number,
        birthDescription: birthNumber.description,
        sunSign: astrology.sunSign,
        sunSignDescription: astrology.sunSignDescription,
        moonSign: astrology.moonSign,
        moonSignDescription: astrology.moonSignDescription,
        keyTraits: numerology.personalityTraits,
        spiritualGuidance: numerology.spiritualGuidance,
        timeInsights: timeInsights,
        futurePredictions: generateFuturePredictions(numerology.lifePathNumber, astrology.sunSign)
    };
}

function generateCoupleReport(name1, dob1, gender1, time1, name2, dob2, gender2, time2) {
    // Use the CompatibilityAnalyzer class
    const person1Data = { name: name1, dob: dob1, gender: gender1, timeOfBirth: time1 };
    const person2Data = { name: name2, dob: dob2, gender: gender2, timeOfBirth: time2 };
    
    const compatibilityReport = CompatibilityAnalyzer.generateCompatibilityReport(person1Data, person2Data);
    
    // Add future predictions for couple
    compatibilityReport.futurePredictions = generateCoupleFuturePredictions(
        person1Data, person2Data, compatibilityReport.compatibilityScore
    );
    
    // Add remedies and affirmations for low compatibility
    if (compatibilityReport.compatibilityScore < 70) {
        compatibilityReport.remedies = generateCoupleRemedies(compatibilityReport.compatibilityScore);
        compatibilityReport.affirmations = generateCoupleAffirmations();
    }
    
    return compatibilityReport;
}

function generateFutureReport(name, dob, gender, timeOfBirth) {
    // Use the NumerologyCalculator and ZodiacCalculator classes
    const numerology = NumerologyCalculator.generateProfile(name, dob);
    const astrology = ZodiacCalculator.generateProfile(name, dob);
    
    // Calculate Destiny Number and Birth Number
    const destinyNumber = NumerologyCalculator.calculateDestinyNumber(name);
    const birthNumber = NumerologyCalculator.calculateBirthNumber(dob);
    
    // Generate time-based insights if time of birth is provided
    const timeInsights = timeOfBirth ? NumerologyCalculator.generateTimeInsights(timeOfBirth, gender) : null;
    
    return {
        lifePathNumber: numerology.lifePathNumber,
        lifePathDescription: numerology.lifePathDescription,
        nameNumber: numerology.nameNumber,
        nameDescription: numerology.nameDescription,
        destinyNumber: destinyNumber.number,
        destinyDescription: destinyNumber.description,
        birthNumber: birthNumber.number,
        birthDescription: birthNumber.description,
        sunSign: astrology.sunSign,
        sunSignDescription: astrology.sunSignDescription,
        moonSign: astrology.moonSign,
        moonSignDescription: astrology.moonSignDescription,
        keyTraits: numerology.personalityTraits,
        spiritualGuidance: numerology.spiritualGuidance,
        timeInsights: timeInsights,
        futurePredictions: generateDetailedFuturePredictions(numerology.lifePathNumber, astrology.sunSign),
        remedies: generatePersonalizedRemedies(numerology.lifePathNumber, astrology.sunSign, astrology.moonSign),
        affirmations: generateDailyAffirmations(numerology.lifePathNumber, astrology.sunSign),
        gemstones: generateGemstoneRecommendations(astrology.sunSign),
        timing: generatePowerfulTiming(numerology.lifePathNumber)
    };
}

function generateFuturePredictions(lifePathNumber, sunSign) {
    const currentYear = new Date().getFullYear();
    const predictions = [];
    
    for (let i = 1; i <= 5; i++) {
        const year = currentYear + i;
        const prediction = generateYearPrediction(year, lifePathNumber, sunSign);
        // Add remedies to each prediction
        prediction.remedies = generateYearRemedies(year, lifePathNumber, sunSign, prediction.type);
        predictions.push(prediction);
    }
    
    return predictions;
}

function generateYearPrediction(year, lifePathNumber, sunSign) {
    const predictionTypes = ['great', 'good', 'bad', 'worst'];
    const weights = [0.3, 0.4, 0.2, 0.1]; // Favor positive predictions
    
    // Generate weighted random prediction
    const random = Math.random();
    let cumulativeWeight = 0;
    let predictionType = 'good';
    
    for (let i = 0; i < weights.length; i++) {
        cumulativeWeight += weights[i];
        if (random <= cumulativeWeight) {
            predictionType = predictionTypes[i];
            break;
        }
    }
    
    const predictions = {
        great: [
            `This will be a breakthrough year for you! Your ${sunSign} energy combined with Life Path ${lifePathNumber} creates perfect conditions for success.`,
            `Expect major achievements in your career and personal life. Your spiritual growth will accelerate significantly.`,
            `This year brings exceptional opportunities for growth and expansion. Trust your intuition and take bold steps.`
        ],
        good: [
            `A positive and productive year ahead. Your ${sunSign} traits will help you navigate challenges with grace.`,
            `Steady progress in all areas of life. Your Life Path ${lifePathNumber} energy supports your goals.`,
            `Good fortune in relationships and career. Focus on maintaining balance and harmony.`
        ],
        bad: [
            `This year may bring some challenges, but your ${sunSign} resilience will help you overcome them.`,
            `Patience and perseverance will be key. Your Life Path ${lifePathNumber} lessons will guide you through difficulties.`,
            `Focus on self-care and spiritual practices to navigate this challenging period.`
        ],
        worst: [
            `A challenging year that will test your strength. Your ${sunSign} determination will be crucial.`,
            `This period requires extra care and attention. Lean on your spiritual practices and support systems.`,
            `Difficult times ahead, but remember that challenges often lead to the greatest growth.`
        ]
    };
    
    const yearPredictions = predictions[predictionType];
    const randomPrediction = yearPredictions[Math.floor(Math.random() * yearPredictions.length)];
    
    return {
        year: year,
        type: predictionType,
        prediction: randomPrediction,
        focus: getYearFocus(year, lifePathNumber, sunSign)
    };
}

function getYearFocus(year, lifePathNumber, sunSign) {
    const focuses = [
        'Career and Professional Growth',
        'Relationships and Love',
        'Health and Wellness',
        'Spiritual Development',
        'Financial Abundance',
        'Personal Transformation',
        'Creative Expression',
        'Family and Home'
    ];
    
    // Use year and life path to determine focus
    const focusIndex = (year + lifePathNumber) % focuses.length;
    return focuses[focusIndex];
}

function generateCoupleFuturePredictions(person1, person2, compatibilityScore) {
    const currentYear = new Date().getFullYear();
    const predictions = [];
    
    for (let i = 1; i <= 5; i++) {
        const year = currentYear + i;
        const prediction = generateCoupleYearPrediction(year, person1, person2, compatibilityScore);
        predictions.push(prediction);
    }
    
    return predictions;
}

function generateCoupleYearPrediction(year, person1, person2, compatibilityScore) {
    let predictionType = 'good';
    
    if (compatibilityScore >= 85) {
        predictionType = Math.random() > 0.2 ? 'great' : 'good';
    } else if (compatibilityScore >= 70) {
        predictionType = Math.random() > 0.3 ? 'good' : 'bad';
    } else {
        predictionType = Math.random() > 0.4 ? 'bad' : 'worst';
    }
    
    const predictions = {
        great: [
            `Your relationship will reach new heights of harmony and understanding. This year brings deep spiritual connection.`,
            `Expect major milestones in your relationship. Your compatibility creates perfect conditions for growth.`,
            `This year will strengthen your bond in remarkable ways. Trust in your shared journey.`
        ],
        good: [
            `A positive year for your relationship with steady growth and deepening connection.`,
            `Your compatibility supports a harmonious year ahead with good communication and understanding.`,
            `Expect positive developments in your relationship with opportunities for growth and joy.`
        ],
        bad: [
            `This year may bring challenges to your relationship, but they can strengthen your bond if handled with care.`,
            `Patience and communication will be essential this year. Focus on understanding each other's needs.`,
            `Some difficulties may arise, but they present opportunities for growth and deeper connection.`
        ],
        worst: [
            `This year will test your relationship significantly. Extra effort and understanding will be required.`,
            `Challenging times ahead for your relationship. Focus on open communication and mutual support.`,
            `This period requires careful attention to your relationship dynamics and may need professional guidance.`
        ]
    };
    
    const yearPredictions = predictions[predictionType];
    const randomPrediction = yearPredictions[Math.floor(Math.random() * yearPredictions.length)];
    
    return {
        year: year,
        type: predictionType,
        prediction: randomPrediction,
        focus: 'Relationship Growth and Harmony'
    };
}

function displayReport(reportData, reportType) {
    // Hide landing page sections but keep form visible during processing
    hideLandingSections();
    
    const resultSection = document.getElementById('resultSection');
    const resultContent = document.getElementById('resultContent');
    
    let html = '';
    
    if (reportType === 'individual') {
        html = generateIndividualReportHTML(reportData);
    } else if (reportType === 'future') {
        html = generateFutureReportHTML(reportData);
    } else {
        html = generateCoupleReportHTML(reportData);
    }
    
    resultContent.innerHTML = html;
    resultSection.style.display = 'block';
    resultSection.classList.add('fade-in');
    
    // Now hide the form section after report is ready
    const formSection = document.querySelector('.form-section');
    if (formSection) formSection.style.display = 'none';
    
    // Scroll to results
    resultSection.scrollIntoView({ behavior: 'smooth' });
    
    // Add download and share functionality
    setupReportActions();
}

function hideLandingSections() {
    // Hide hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) heroSection.style.display = 'none';
    
    // Hide pricing section
    const pricingSection = document.querySelector('.pricing-section');
    if (pricingSection) pricingSection.style.display = 'none';
    
    // Hide trust section
    const trustSection = document.querySelector('.trust-section');
    if (trustSection) trustSection.style.display = 'none';
    
    // Hide footer
    const footer = document.querySelector('.premium-footer');
    if (footer) footer.style.display = 'none';
}

function hideOtherSections() {
    // Hide all sections including form
    hideLandingSections();
    
    // Hide form section
    const formSection = document.querySelector('.form-section');
    if (formSection) formSection.style.display = 'none';
}

function showLandingSections() {
    // Show landing page sections
    const sections = [
        '.hero-section',
        '.pricing-section', 
        '.trust-section',
        '.premium-footer'
    ];
    
    sections.forEach(selector => {
        const section = document.querySelector(selector);
        if (section) section.style.display = 'block';
    });
}

function showAllSections() {
    // Show all sections again
    const sections = [
        '.hero-section',
        '.pricing-section', 
        '.form-section',
        '.trust-section',
        '.premium-footer'
    ];
    
    sections.forEach(selector => {
        const section = document.querySelector(selector);
        if (section) section.style.display = 'block';
    });
}

function generateIndividualReportHTML(data) {
    return `
        <h2>✨ Your Premium Spiritual Profile (Single Report)</h2>
        
        <div class="profile-summary">
            <div class="summary-card">
                <h3>🔢 Numerology Analysis</h3>
                <div class="number-highlight">
                    <span class="number">${data.lifePathNumber}</span>
                    <span class="label">Life Path Number</span>
                </div>
                <p>${data.lifePathDescription}</p>
                
                <div class="number-highlight">
                    <span class="number">${data.nameNumber}</span>
                    <span class="label">Name Number</span>
                </div>
                <p>${data.nameDescription}</p>
                
                <div class="number-highlight">
                    <span class="number">${data.destinyNumber}</span>
                    <span class="label">Destiny Number</span>
                </div>
                <p>${data.destinyDescription}</p>
                
                <div class="number-highlight">
                    <span class="number">${data.birthNumber}</span>
                    <span class="label">Birth Number</span>
                </div>
                <p>${data.birthDescription}</p>
            </div>
        </div>
        
        ${data.timeInsights ? `
            <div class="time-insights-section">
                <h3>⏰ Time of Birth Insights</h3>
                <div class="time-insights-card">
                    <p>${data.timeInsights}</p>
                </div>
            </div>
        ` : ''}
        
        <div class="astrology-section">
            <h3>⭐ Astrological Profile</h3>
            <div class="sign-cards">
                <div class="sign-card">
                    <h4>☉ Sun Sign: ${data.sunSign}</h4>
                    <p>${data.sunSignDescription}</p>
                </div>
                <div class="sign-card">
                    <h4>☽ Moon Sign: ${data.moonSign}</h4>
                    <p>${data.moonSignDescription}</p>
                </div>
            </div>
        </div>
        
        <div class="personality-section">
            <h3>🎯 Key Personality Traits</h3>
            <p>${data.keyTraits}</p>
        </div>
        
        <div class="future-predictions">
            <h3>🔮 5-Year Future Predictions</h3>
            ${data.futurePredictions.map(pred => `
                <div class="prediction-year ${pred.type}">
                    <h4>${pred.year} - ${pred.focus}</h4>
                    <p class="prediction-text">${pred.prediction}</p>
                    ${pred.remedies ? `
                        <div class="year-remedies">
                            <h5>🛡️ Remedies for ${pred.year}:</h5>
                            <ul>
                                ${pred.remedies.map(remedy => `<li>${remedy}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        </div>
        
        <div class="basic-remedies-section">
            <h3>🛡️ Basic Remedies & Guidance</h3>
            <div class="remedies-grid">
                <div class="remedy-card">
                    <h4>🧘 Daily Spiritual Practices</h4>
                    <ul>
                        <li>Meditate for 10-15 minutes daily during sunrise or sunset</li>
                        <li>Practice gratitude journaling to attract positive energy</li>
                        <li>Chant your Life Path number mantra: "Om" + your Life Path number</li>
                        <li>Use positive affirmations aligned with your ${data.sunSign} energy</li>
                    </ul>
                </div>
                <div class="remedy-card">
                    <h4>💎 Gemstone Recommendations</h4>
                    <ul>
                        <li>Wear colors that complement your ${data.sunSign} sign</li>
                        <li>Consider wearing a protective gemstone for your sign</li>
                        <li>Use crystals in your meditation space for enhanced energy</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="spiritual-guidance">
            <h3>💫 Spiritual Guidance</h3>
            <p>${data.spiritualGuidance}</p>
        </div>
    `;
}

function generateCoupleReportHTML(data) {
    return `
        <h2>💕 Premium Couple Compatibility Report (Single Report)</h2>
        
        <div class="compatibility-score">
            <span class="score">${data.compatibilityScore}%</span>
            <span class="label">Compatibility Score</span>
        </div>
        
        <div class="couple-profiles">
            <div class="profile-card">
                <h3>👤 ${data.person1.name}'s Profile</h3>
                <p><strong>Life Path:</strong> ${data.person1.lifePathNumber} | <strong>Sun Sign:</strong> ${data.person1.sunSign}</p>
                <p>${data.person1.summary}</p>
            </div>
            
            <div class="profile-card">
                <h3>👤 ${data.person2.name}'s Profile</h3>
                <p><strong>Life Path:</strong> ${data.person2.lifePathNumber} | <strong>Sun Sign:</strong> ${data.person2.sunSign}</p>
                <p>${data.person2.summary}</p>
            </div>
        </div>
        
        <div class="relationship-dynamics">
            <h3>💖 Relationship Dynamics</h3>
            <div class="dynamics-grid">
                <div class="dynamic-card positive">
                    <h4>🌟 Strengths</h4>
                    <p>${data.strengths}</p>
                </div>
                <div class="dynamic-card challenge">
                    <h4>⚡ Challenges</h4>
                    <p>${data.challenges}</p>
                </div>
            </div>
        </div>
        
        <div class="future-predictions">
            <h3>🔮 5-Year Future Predictions</h3>
            ${data.futurePredictions.map(pred => `
                <div class="prediction-year ${pred.type}">
                    <h4>${pred.year} - ${pred.focus}</h4>
                    <p>${pred.prediction}</p>
                </div>
            `).join('')}
        </div>
        
        ${data.compatibilityScore < 70 ? `
            <div class="remedies-section">
                <h3>🛡️ Relationship Remedies & Solutions</h3>
                <div class="remedies-grid">
                    <div class="remedy-card">
                        <h4>💕 Couple Remedies</h4>
                        <ul>
                            ${data.remedies.map(remedy => `<li>${remedy}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
            
            <div class="affirmations-section">
                <h3>🧘 Couple Affirmations & Mantras</h3>
                <div class="affirmations-grid">
                    <div class="affirmation-card">
                        <h4>⏰ Powerful Timing Affirmations</h4>
                        <ul>
                            <li><strong>11:11:</strong> ${data.affirmations["11:11"]}</li>
                            <li><strong>12:12:</strong> ${data.affirmations["12:12"]}</li>
                            <li><strong>01:11:</strong> ${data.affirmations["01:11"]}</li>
                        </ul>
                    </div>
                    <div class="affirmation-card">
                        <h4>💕 Daily Couple Affirmations</h4>
                        <ul>
                            ${data.affirmations.daily.map(affirmation => `<li>${affirmation}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        ` : ''}
        
        <div class="relationship-advice">
            <h3>💡 Relationship Advice</h3>
            <p>${data.relationshipAdvice}</p>
        </div>
    `;
}

function generateFutureReportHTML(data) {
    return `
        <h2>🔮 Your Premium 5-Year Future Report with Remedies (Single Report)</h2>
        
        <div class="profile-summary">
            <div class="summary-card">
                <h3>🔢 Numerology Analysis</h3>
                <div class="number-highlight">
                    <span class="number">${data.lifePathNumber}</span>
                    <span class="label">Life Path Number</span>
                </div>
                <p>${data.lifePathDescription}</p>
                
                <div class="number-highlight">
                    <span class="number">${data.nameNumber}</span>
                    <span class="label">Name Number</span>
                </div>
                <p>${data.nameDescription}</p>
                
                <div class="number-highlight">
                    <span class="number">${data.destinyNumber}</span>
                    <span class="label">Destiny Number</span>
                </div>
                <p>${data.destinyDescription}</p>
                
                <div class="number-highlight">
                    <span class="number">${data.birthNumber}</span>
                    <span class="label">Birth Number</span>
                </div>
                <p>${data.birthDescription}</p>
            </div>
        </div>
        
        ${data.timeInsights ? `
            <div class="time-insights-section">
                <h3>⏰ Time of Birth Insights</h3>
                <div class="time-insights-card">
                    <p>${data.timeInsights}</p>
                </div>
            </div>
        ` : ''}
        
        <div class="astrology-section">
            <h3>⭐ Astrological Profile</h3>
            <div class="sign-cards">
                <div class="sign-card">
                    <h4>☉ Sun Sign: ${data.sunSign}</h4>
                    <p>${data.sunSignDescription}</p>
                </div>
                <div class="sign-card">
                    <h4>☽ Moon Sign: ${data.moonSign}</h4>
                    <p>${data.moonSignDescription}</p>
                </div>
            </div>
        </div>
        
        <div class="personality-section">
            <h3>🎯 Key Personality Traits</h3>
            <p>${data.keyTraits}</p>
        </div>
        
        <div class="future-predictions">
            <h3>🔮 Detailed 5-Year Future Predictions</h3>
            ${data.futurePredictions.map(pred => `
                <div class="prediction-year ${pred.type}">
                    <h4>${pred.year} - ${pred.focus}</h4>
                    <p class="prediction-text">${pred.prediction}</p>
                    ${pred.remedies ? `
                        <div class="year-remedies">
                            <h5>🛡️ Remedies for ${pred.year}:</h5>
                            <ul>
                                ${pred.remedies.map(remedy => `<li>${remedy}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        </div>
        
        <div class="remedies-section">
            <h3>🛡️ Personalized Remedies & Solutions</h3>
            <div class="remedies-grid">
                <div class="remedy-card">
                    <h4>🧘 Daily Practices</h4>
                    <ul>
                        ${data.remedies.general.map(remedy => `<li>${remedy}</li>`).join('')}
                    </ul>
                </div>
                <div class="remedy-card">
                    <h4>🔢 Life Path ${data.lifePathNumber} Remedies</h4>
                    <ul>
                        ${data.remedies.lifePath.map(remedy => `<li>${remedy}</li>`).join('')}
                    </ul>
                </div>
                <div class="remedy-card">
                    <h4>⭐ ${data.sunSign} Remedies</h4>
                    <ul>
                        ${data.remedies.sunSign.map(remedy => `<li>${remedy}</li>`).join('')}
                    </ul>
                </div>
                <div class="remedy-card">
                    <h4>🌙 ${data.moonSign} Remedies</h4>
                    <ul>
                        ${data.remedies.moonSign.map(remedy => `<li>${remedy}</li>`).join('')}
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="affirmations-section">
            <h3>🧘 Daily Affirmations & Mantras</h3>
            <div class="affirmations-grid">
                <div class="affirmation-card">
                    <h4>🎯 Life Path ${data.lifePathNumber} Affirmations</h4>
                    <ul>
                        ${data.affirmations.lifePath.map(affirmation => `<li>${affirmation}</li>`).join('')}
                    </ul>
                </div>
                <div class="affirmation-card">
                    <h4>⭐ ${data.sunSign} Affirmations</h4>
                    <ul>
                        ${data.affirmations.sunSign.map(affirmation => `<li>${affirmation}</li>`).join('')}
                    </ul>
                </div>
                <div class="affirmation-card">
                    <h4>⏰ Powerful Timing Affirmations</h4>
                    <ul>
                        <li><strong>11:11:</strong> ${data.affirmations.timing["11:11"]}</li>
                        <li><strong>12:12:</strong> ${data.affirmations.timing["12:12"]}</li>
                        <li><strong>01:11:</strong> ${data.affirmations.timing["01:11"]}</li>
                    </ul>
                </div>
            </div>
        </div>
        
        <div class="gemstones-section">
            <h3>💎 Gemstone & Color Recommendations</h3>
            <div class="gemstone-card">
                <h4>Primary Gemstone: ${data.gemstones.primary}</h4>
                <p>Wear this gemstone to enhance your ${data.sunSign} energy and attract positive vibrations.</p>
                <h4>Secondary Gemstone: ${data.gemstones.secondary}</h4>
                <p>This gemstone will provide additional support and balance to your energy field.</p>
                <h4>Lucky Colors: ${data.gemstones.colors.join(', ')}</h4>
                <p>Incorporate these colors in your clothing, home decor, and daily life for enhanced luck and protection.</p>
            </div>
        </div>
        
        <div class="timing-section">
            <h3>⏰ Powerful Timing for Manifestation</h3>
            <div class="timing-grid">
                ${Object.entries(data.timing).map(([time, description]) => `
                    <div class="timing-card">
                        <h4>${time}</h4>
                        <p>${description}</p>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="spiritual-guidance">
            <h3>💫 Spiritual Guidance</h3>
            <p>${data.spiritualGuidance}</p>
        </div>
    `;
}

function setupReportActions() {
    // Download functionality
    const downloadBtn = document.querySelector('.download-btn');
    downloadBtn.addEventListener('click', () => {
        generateAndDownloadPDF();
    });
    
    // Share functionality
    const shareBtn = document.querySelector('.share-btn');
    shareBtn.addEventListener('click', () => {
        if (navigator.share) {
            navigator.share({
                title: 'My Spiritual Report from Pairfect',
                text: 'Check out my personalized spiritual compatibility report!',
                url: window.location.href
            });
        } else {
            // Fallback for browsers that don't support Web Share API
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                alert('Link copied to clipboard!');
            });
        }
    });
}

function generateAndDownloadPDF() {
    // Create a simple PDF using canvas and jsPDF
    const reportContent = document.getElementById('resultContent');
    const reportTitle = reportContent.querySelector('h2').textContent;
    
    // Create a temporary div for PDF content
    const pdfDiv = document.createElement('div');
    pdfDiv.style.position = 'absolute';
    pdfDiv.style.left = '-9999px';
    pdfDiv.style.top = '0';
    pdfDiv.style.width = '800px';
    pdfDiv.style.background = 'white';
    pdfDiv.style.padding = '40px';
    pdfDiv.style.fontFamily = 'Arial, sans-serif';
    pdfDiv.style.fontSize = '12px';
    pdfDiv.style.lineHeight = '1.4';
    pdfDiv.style.color = '#333';
    
    // Clone the report content
    const clonedContent = reportContent.cloneNode(true);
    
    // Clean up the cloned content for PDF
    const elementsToRemove = clonedContent.querySelectorAll('.prediction-year, .sign-cards, .dynamics-grid, .couple-profiles');
    elementsToRemove.forEach(el => {
        const parent = el.parentNode;
        if (parent) {
            parent.removeChild(el);
        }
    });
    
    // Simplify styling for PDF
    const allElements = clonedContent.querySelectorAll('*');
    allElements.forEach(el => {
        el.style.margin = '10px 0';
        el.style.padding = '0';
        el.style.border = 'none';
        el.style.background = 'none';
        el.style.boxShadow = 'none';
        el.style.borderRadius = '0';
    });
    
    pdfDiv.appendChild(clonedContent);
    document.body.appendChild(pdfDiv);
    
    // Use html2canvas to capture the content
    html2canvas(pdfDiv, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
    }).then(canvas => {
        // Remove the temporary div
        document.body.removeChild(pdfDiv);
        
        // Create PDF using jsPDF
        const imgData = canvas.toDataURL('image/png');
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const imgWidth = 210;
        const pageHeight = 295;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        
        // Add title
        pdf.setFontSize(20);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Pairfect - Spiritual Report', 105, 20, { align: 'center' });
        pdf.setFontSize(12);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, 105, 30, { align: 'center' });
        
        // Add content
        pdf.addImage(imgData, 'PNG', 0, 40, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        // Add additional pages if needed
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        // Download the PDF
        const fileName = `pairfect-report-${new Date().getTime()}.pdf`;
        pdf.save(fileName);
        
        // Show success message
        showDownloadSuccess();
    }).catch(error => {
        console.error('Error generating PDF:', error);
        // Fallback: simple text-based PDF
        generateSimplePDF();
    });
}

function generateSimplePDF() {
    const reportContent = document.getElementById('resultContent');
    const reportTitle = reportContent.querySelector('h2').textContent;
    
    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    const lineHeight = 7;
    let yPosition = 30;
    
    // Add title
    pdf.setFontSize(20);
    pdf.setFont('helvetica', 'bold');
    pdf.text('Pairfect - Spiritual Report', pageWidth/2, yPosition, { align: 'center' });
    yPosition += 15;
    
    // Add date
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    pdf.text(`Generated on: ${new Date().toLocaleDateString()}`, pageWidth/2, yPosition, { align: 'center' });
    yPosition += 20;
    
    // Add report title
    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.text(reportTitle, margin, yPosition);
    yPosition += 15;
    
    // Add content sections
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'normal');
    
    const sections = reportContent.querySelectorAll('h3');
    sections.forEach(section => {
        const sectionTitle = section.textContent;
        const sectionContent = section.nextElementSibling;
        
        // Check if we need a new page
        if (yPosition > 250) {
            pdf.addPage();
            yPosition = 30;
        }
        
        // Add section title
        pdf.setFontSize(14);
        pdf.setFont('helvetica', 'bold');
        pdf.text(sectionTitle, margin, yPosition);
        yPosition += 10;
        
        // Add section content
        if (sectionContent && sectionContent.tagName === 'P') {
            pdf.setFontSize(12);
            pdf.setFont('helvetica', 'normal');
            
            const text = sectionContent.textContent;
            const lines = pdf.splitTextToSize(text, pageWidth - 2 * margin);
            
            lines.forEach(line => {
                if (yPosition > 250) {
                    pdf.addPage();
                    yPosition = 30;
                }
                pdf.text(line, margin, yPosition);
                yPosition += lineHeight;
            });
        }
        
        yPosition += 10;
    });
    
    // Download the PDF
    const fileName = `pairfect-report-${new Date().getTime()}.pdf`;
    pdf.save(fileName);
    
    showDownloadSuccess();
}

function showDownloadSuccess() {
    const successMessage = document.createElement('div');
    successMessage.className = 'download-success success';
    successMessage.innerHTML = `
        <h3>📥 PDF Downloaded Successfully!</h3>
        <p>Your spiritual report has been saved to your device.</p>
    `;
    
    const resultSection = document.getElementById('resultSection');
    resultSection.insertBefore(successMessage, resultSection.firstChild);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.remove();
        }
    }, 3000);
}

function showSuccessMessage() {
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message success';
    successMessage.innerHTML = `
        <h3>🎉 Report Generated Successfully!</h3>
        <p>Your premium spiritual report is ready. Scroll down to explore your cosmic insights.</p>
    `;
    
    const resultSection = document.getElementById('resultSection');
    resultSection.insertBefore(successMessage, resultSection.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.remove();
        }
    }, 5000);
}

function displayMessage(message, type) {
    const resultSection = document.getElementById('resultSection');
    const resultContent = document.getElementById('resultContent');
    
    const messageClass = type === 'error' ? 'error' : 'success';
    const icon = type === 'error' ? '❌' : '✅';
    
    resultContent.innerHTML = `
        <div class="${messageClass}">
            ${icon} ${message}
        </div>
    `;
    
    resultSection.style.display = 'block';
    resultSection.classList.add('fade-in');
}

function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Add toast styles
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        font-size: 14px;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

function resetForm() {
    // Reset form
    document.getElementById('reportForm').reset();
    document.getElementById('fileName').textContent = '';
    
    // Reset partner section
    const partnerSections = document.querySelectorAll('.partner-section');
    partnerSections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('partnerName').required = false;
    document.getElementById('partnerDob').required = false;
    document.getElementById('partnerGender').required = false;
    
    // Reset to first step
    showStep(1);
    
    // Hide result section
    document.getElementById('resultSection').style.display = 'none';
    
    // Show all sections again
    showAllSections();
    
    // Update order summary
    updateOrderSummary();
    
    // Scroll to top
    scrollToTop();
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function addScrollAnimations() {
    // Add intersection observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.pricing-card, .trust-item, .form-wrapper').forEach(el => {
        observer.observe(el);
    });
}

// Utility functions
function generateUserID(name, dob) {
    const combined = (name + dob).toLowerCase().replace(/\s+/g, '');
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
        const char = combined.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Global functions for form navigation
window.nextStep = nextStep;
window.prevStep = prevStep;
window.goToHome = goToHome;
window.copyUPI = copyUPI;
window.openUPI = openUPI;

function copyUPI() {
    const upiId = 'ankit.gautam42@ybl';
    navigator.clipboard.writeText(upiId).then(() => {
        // Show success message
        const copyBtn = document.querySelector('.copy-btn');
        const originalText = copyBtn.textContent;
        copyBtn.textContent = '✅ Copied!';
        copyBtn.style.background = '#4CAF50';
        copyBtn.style.color = 'white';
        
        setTimeout(() => {
            copyBtn.textContent = originalText;
            copyBtn.style.background = '';
            copyBtn.style.color = '';
        }, 2000);
        
        // Show toast notification
        showToast('UPI ID copied to clipboard!', 'success');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = upiId;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        showToast('UPI ID copied to clipboard!', 'success');
    });
}

function openUPI() {
    const amount = document.getElementById('displayAmount').textContent.replace('₹', '');
    const upiId = 'ankit.gautam42@ybl';
    
    // Show instructions first
    const instructions = `
UPI Payment Instructions:
1. Open your UPI app (GPay, PhonePe, Paytm, etc.)
2. Send ₹${amount} to: ${upiId}
3. Add note: "Spiritual Report"
4. Complete payment
5. Return here and click "Generate Report"

Click OK to open your UPI app (if available)
        `;
    
    if (confirm(instructions)) {
        // Create UPI deep link with better parameters
        const upiLink = `upi://pay?pa=${upiId}&pn=Pairfect&am=${amount}&cu=INR&tn=Spiritual Report&mc=0000&tr=${Date.now()}`;
        
        // Try multiple UPI app schemes for better compatibility
        const upiSchemes = [
            upiLink,
            `googleplay://upi?pa=${upiId}&pn=Pairfect&am=${amount}&cu=INR&tn=Spiritual Report`,
            `phonepe://pay?pa=${upiId}&pn=Pairfect&am=${amount}&cu=INR&tn=Spiritual Report`,
            `paytm://pay?pa=${upiId}&pn=Pairfect&am=${amount}&cu=INR&tn=Spiritual Report`
        ];
        
        // Try to open UPI app
        let opened = false;
        for (let scheme of upiSchemes) {
            try {
                window.location.href = scheme;
                opened = true;
                break;
            } catch (error) {
                console.log(`Failed to open scheme: ${scheme}`);
                continue;
            }
        }
        
        // If no scheme worked, show manual instructions
        if (!opened) {
            alert(`Please manually open your UPI app and send ₹${amount} to ${upiId}\n\nNote: Spiritual Report`);
        }
    }
}

function goToHome() {
    // Reset form
    document.getElementById('reportForm').reset();
    document.getElementById('fileName').textContent = '';
    
    // Reset partner sections
    const partnerSections = document.querySelectorAll('.partner-section');
    partnerSections.forEach(section => {
        section.style.display = 'none';
    });
    document.getElementById('partnerName').required = false;
    document.getElementById('partnerDob').required = false;
    document.getElementById('partnerGender').required = false;
    
    // Reset to first step
    showStep(1);
    
    // Hide result section
    document.getElementById('resultSection').style.display = 'none';
    
    // Show all sections again
    showAllSections();
    
    // Update order summary
    updateOrderSummary();
    
    // Scroll to top
    scrollToTop();
}

function generateDetailedFuturePredictions(lifePathNumber, sunSign) {
    const currentYear = new Date().getFullYear();
    const predictions = [];
    
    for (let i = 1; i <= 5; i++) {
        const year = currentYear + i;
        const prediction = generateDetailedYearPrediction(year, lifePathNumber, sunSign);
        predictions.push(prediction);
    }
    
    return predictions;
}

function generateDetailedYearPrediction(year, lifePathNumber, sunSign) {
    const predictionTypes = ['great', 'good', 'bad', 'worst'];
    const weights = [0.3, 0.4, 0.2, 0.1]; // Favor positive predictions
    
    // Generate weighted random prediction
    const random = Math.random();
    let cumulativeWeight = 0;
    let predictionType = 'good';
    
    for (let i = 0; i < weights.length; i++) {
        cumulativeWeight += weights[i];
        if (random <= cumulativeWeight) {
            predictionType = predictionTypes[i];
            break;
        }
    }
    
    const predictions = {
        great: [
            `This will be a breakthrough year for you! Your ${sunSign} energy combined with Life Path ${lifePathNumber} creates perfect conditions for success. Expect major achievements in career, relationships, and spiritual growth. This is the year to take bold steps and trust your intuition completely.`,
            `A year of exceptional opportunities and expansion. Your natural ${sunSign} leadership qualities will shine, and your Life Path ${lifePathNumber} lessons will manifest in remarkable ways. Financial abundance and personal fulfillment are highly likely.`,
            `This year brings unprecedented growth and transformation. Your ${sunSign} determination combined with Life Path ${lifePathNumber} wisdom will guide you to new heights. Expect breakthroughs in all areas of life.`
        ],
        good: [
            `A positive and productive year ahead. Your ${sunSign} traits will help you navigate challenges with grace and wisdom. Your Life Path ${lifePathNumber} energy supports steady progress toward your goals. Focus on maintaining balance and harmony.`,
            `Good fortune in relationships and career. Your ${sunSign} nature combined with Life Path ${lifePathNumber} insights will create favorable conditions for growth. Trust the process and stay committed to your path.`,
            `Steady progress in all areas of life. Your ${sunSign} resilience and Life Path ${lifePathNumber} guidance will help you overcome any obstacles. This is a year of building strong foundations for future success.`
        ],
        bad: [
            `This year may bring some challenges, but your ${sunSign} resilience will help you overcome them. Your Life Path ${lifePathNumber} lessons will be crucial in navigating difficulties. Focus on self-care and spiritual practices.`,
            `Patience and perseverance will be key this year. Your ${sunSign} determination combined with Life Path ${lifePathNumber} wisdom will guide you through challenging times. Remember that growth often comes through adversity.`,
            `A period of testing and transformation. Your ${sunSign} strength and Life Path ${lifePathNumber} insights will be essential. Focus on inner work and trust that challenges are opportunities for growth.`
        ],
        worst: [
            `A challenging year that will test your strength. Your ${sunSign} determination will be crucial in overcoming obstacles. Your Life Path ${lifePathNumber} lessons will provide guidance through difficult times.`,
            `This period requires extra care and attention. Your ${sunSign} resilience and Life Path ${lifePathNumber} wisdom will help you navigate through challenges. Focus on spiritual practices and seek support when needed.`,
            `Difficult times ahead, but remember that challenges often lead to the greatest growth. Your ${sunSign} courage and Life Path ${lifePathNumber} insights will be your greatest allies.`
        ]
    };
    
    const yearPredictions = predictions[predictionType];
    const randomPrediction = yearPredictions[Math.floor(Math.random() * yearPredictions.length)];
    
    return {
        year: year,
        type: predictionType,
        prediction: randomPrediction,
        focus: getYearFocus(year, lifePathNumber, sunSign),
        remedies: generateYearRemedies(year, lifePathNumber, sunSign, predictionType)
    };
}

function generateYearRemedies(year, lifePathNumber, sunSign, predictionType) {
    const remedies = {
        great: [
            "Continue your positive practices and maintain gratitude",
            "Share your abundance with others to multiply blessings",
            "Document your achievements for future reference"
        ],
        good: [
            "Maintain your current positive habits and routines",
            "Focus on building stronger relationships",
            "Invest in personal development and learning"
        ],
        bad: [
            "Practice daily meditation and prayer for inner strength",
            "Wear protective gemstones and use positive affirmations",
            "Perform charity work to reduce negative karma"
        ],
        worst: [
            "Daily spiritual practices are essential for protection",
            "Wear protective talismans and practice intense meditation",
            "Seek guidance from spiritual mentors and perform special prayers"
        ]
    };
    
    return remedies[predictionType] || remedies.good;
}

function generatePersonalizedRemedies(lifePathNumber, sunSign, moonSign) {
    const remedies = {
        general: [
            "Chant your Life Path number mantra daily",
            "Meditate during sunrise and sunset",
            "Practice gratitude journaling",
            "Use positive affirmations regularly"
        ],
        lifePath: {
            1: ["Wear red or orange colors", "Practice leadership exercises", "Chant 'Om Namah Shivaya'"],
            2: ["Wear white or light blue", "Practice peace meditation", "Chant 'Om Shanti'"],
            3: ["Wear yellow or orange", "Express creativity daily", "Chant 'Om Saraswati'"],
            4: ["Wear green or brown", "Practice grounding exercises", "Chant 'Om Ganeshaya'"],
            5: ["Wear blue or purple", "Practice freedom meditation", "Chant 'Om Hanumate'"],
            6: ["Wear pink or rose", "Practice love meditation", "Chant 'Om Namo Narayana'"],
            7: ["Wear violet or indigo", "Practice spiritual meditation", "Chant 'Om Namah Shivaya'"],
            8: ["Wear gold or yellow", "Practice abundance meditation", "Chant 'Om Lakshmi'"],
            9: ["Wear white or rainbow colors", "Practice universal love", "Chant 'Om Vasudevaya'"]
        },
        sunSign: {
            'Aries': ["Wear red coral", "Practice fire meditation", "Chant 'Om Mangalam'"],
            'Taurus': ["Wear white pearl", "Practice earth meditation", "Chant 'Om Shukraya'"],
            'Gemini': ["Wear emerald", "Practice air meditation", "Chant 'Om Budhaya'"],
            'Cancer': ["Wear white pearl", "Practice water meditation", "Chant 'Om Somaya'"],
            'Leo': ["Wear ruby", "Practice sun meditation", "Chant 'Om Suryaya'"],
            'Virgo': ["Wear emerald", "Practice earth meditation", "Chant 'Om Budhaya'"],
            'Libra': ["Wear diamond", "Practice balance meditation", "Chant 'Om Shukraya'"],
            'Scorpio': ["Wear red coral", "Practice transformation meditation", "Chant 'Om Mangalam'"],
            'Sagittarius': ["Wear yellow sapphire", "Practice wisdom meditation", "Chant 'Om Gurave'"],
            'Capricorn': ["Wear blue sapphire", "Practice discipline meditation", "Chant 'Om Shanaye'"],
            'Aquarius': ["Wear amethyst", "Practice innovation meditation", "Chant 'Om Shanaye'"],
            'Pisces': ["Wear yellow sapphire", "Practice compassion meditation", "Chant 'Om Gurave'"]
        }
    };
    
    return {
        general: remedies.general,
        lifePath: remedies.lifePath[lifePathNumber] || remedies.lifePath[1],
        sunSign: remedies.sunSign[sunSign] || remedies.sunSign['Aries'],
        moonSign: remedies.sunSign[moonSign] || remedies.sunSign['Aries']
    };
}

function generateDailyAffirmations(lifePathNumber, sunSign) {
    const affirmations = {
        lifePath: {
            1: [
                "I am a natural leader with unlimited potential",
                "I trust my intuition and make confident decisions",
                "I am worthy of success and recognition"
            ],
            2: [
                "I create harmony and peace in all situations",
                "I trust my intuition and inner wisdom",
                "I am a bridge of understanding between people"
            ],
            3: [
                "I express my creativity freely and joyfully",
                "I inspire others with my words and actions",
                "I am a channel for divine inspiration"
            ],
            4: [
                "I build strong foundations for lasting success",
                "I am reliable and trustworthy in all matters",
                "I create order and stability in my life"
            ],
            5: [
                "I embrace change and adventure with courage",
                "I am free to explore and discover new possibilities",
                "I trust the journey of life completely"
            ],
            6: [
                "I am a loving and nurturing presence",
                "I create beauty and harmony in my environment",
                "I am responsible and caring in all relationships"
            ],
            7: [
                "I am deeply connected to divine wisdom",
                "I trust my spiritual insights and intuition",
                "I am a seeker of truth and understanding"
            ],
            8: [
                "I am capable of achieving great success",
                "I use my power wisely and ethically",
                "I attract abundance and prosperity"
            ],
            9: [
                "I am a channel for universal love and compassion",
                "I serve humanity with wisdom and grace",
                "I am connected to the divine source of all"
            ]
        },
        sunSign: {
            'Aries': ["I am bold, courageous, and unstoppable", "I lead with confidence and determination"],
            'Taurus': ["I am stable, reliable, and abundant", "I create beauty and value in everything I do"],
            'Gemini': ["I am curious, adaptable, and communicative", "I learn and grow every day"],
            'Cancer': ["I am nurturing, intuitive, and protective", "I create a safe and loving home"],
            'Leo': ["I am confident, creative, and magnetic", "I shine my light and inspire others"],
            'Virgo': ["I am practical, helpful, and perfect", "I serve others with skill and dedication"],
            'Libra': ["I am balanced, diplomatic, and harmonious", "I create peace and beauty in the world"],
            'Scorpio': ["I am powerful, transformative, and deep", "I uncover truth and create positive change"],
            'Sagittarius': ["I am adventurous, philosophical, and free", "I expand horizons and share wisdom"],
            'Capricorn': ["I am ambitious, disciplined, and successful", "I achieve my goals with determination"],
            'Aquarius': ["I am innovative, independent, and humanitarian", "I create positive change in the world"],
            'Pisces': ["I am compassionate, intuitive, and spiritual", "I connect with divine love and wisdom"]
        }
    };
    
    return {
        lifePath: affirmations.lifePath[lifePathNumber] || affirmations.lifePath[1],
        sunSign: affirmations.sunSign[sunSign] || affirmations.sunSign['Aries'],
        timing: {
            "11:11": "I am aligned with divine timing and purpose",
            "12:12": "I am centered and balanced in all aspects of life",
            "01:11": "I am manifesting my highest potential and dreams"
        }
    };
}

function generateGemstoneRecommendations(sunSign) {
    const gemstones = {
        'Aries': { primary: "Red Coral", secondary: "Ruby", colors: ["Red", "Orange"] },
        'Taurus': { primary: "White Pearl", secondary: "Emerald", colors: ["Green", "Pink"] },
        'Gemini': { primary: "Emerald", secondary: "Yellow Sapphire", colors: ["Yellow", "Light Blue"] },
        'Cancer': { primary: "White Pearl", secondary: "Moonstone", colors: ["White", "Silver"] },
        'Leo': { primary: "Ruby", secondary: "Yellow Sapphire", colors: ["Gold", "Orange"] },
        'Virgo': { primary: "Emerald", secondary: "White Pearl", colors: ["Green", "Brown"] },
        'Libra': { primary: "Diamond", secondary: "White Pearl", colors: ["Pink", "Light Blue"] },
        'Scorpio': { primary: "Red Coral", secondary: "Ruby", colors: ["Red", "Black"] },
        'Sagittarius': { primary: "Yellow Sapphire", secondary: "Ruby", colors: ["Yellow", "Purple"] },
        'Capricorn': { primary: "Blue Sapphire", secondary: "Black Onyx", colors: ["Black", "Brown"] },
        'Aquarius': { primary: "Amethyst", secondary: "Blue Sapphire", colors: ["Purple", "Blue"] },
        'Pisces': { primary: "Yellow Sapphire", secondary: "Aquamarine", colors: ["Sea Green", "Purple"] }
    };
    
    return gemstones[sunSign] || gemstones['Aries'];
}

function generatePowerfulTiming(lifePathNumber) {
    return {
        "11:11": "Gateway of manifestation - Focus on your desires",
        "12:12": "Portal of balance - Meditate on harmony",
        "01:11": "New beginnings - Set intentions for the day",
        "22:22": "Master number activation - Connect with higher wisdom",
        "03:33": "Divine protection - Call upon spiritual guides",
        "07:07": "Spiritual awakening - Deep meditation time",
        "09:09": "Completion and release - Let go of what no longer serves"
    };
}

function generateCoupleRemedies(compatibilityScore) {
    const remedies = {
        low: [
            "Practice daily meditation together to strengthen your bond",
            "Wear complementary gemstones to enhance compatibility",
            "Perform joint spiritual practices and prayers",
            "Practice active listening and open communication",
            "Seek guidance from relationship counselors or spiritual mentors"
        ],
        medium: [
            "Focus on understanding each other's communication styles",
            "Practice patience and compromise in daily interactions",
            "Engage in shared activities that bring joy to both partners",
            "Practice gratitude for each other's unique qualities",
            "Work on building trust and emotional intimacy"
        ]
    };
    
    if (compatibilityScore < 50) {
        return remedies.low;
    } else {
        return remedies.medium;
    }
}

function generateCoupleAffirmations() {
    return {
        "11:11": "We are perfectly aligned in love and harmony",
        "12:12": "We are balanced and united in our relationship",
        "01:11": "We are manifesting our perfect relationship together",
        "daily": [
            "We communicate with love and understanding",
            "We support each other's growth and dreams",
            "We create a loving and harmonious home together",
            "We trust and respect each other completely",
            "Our love grows stronger every day"
        ]
    };
}