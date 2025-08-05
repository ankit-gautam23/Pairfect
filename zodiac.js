// Pairfect - Astrology Calculations
class ZodiacCalculator {
    
    // Zodiac sign date ranges
    static zodiacSigns = [
        { name: 'Capricorn', start: [12, 22], end: [1, 19], element: 'Earth', quality: 'Cardinal' },
        { name: 'Aquarius', start: [1, 20], end: [2, 18], element: 'Air', quality: 'Fixed' },
        { name: 'Pisces', start: [2, 19], end: [3, 20], element: 'Water', quality: 'Mutable' },
        { name: 'Aries', start: [3, 21], end: [4, 19], element: 'Fire', quality: 'Cardinal' },
        { name: 'Taurus', start: [4, 20], end: [5, 20], element: 'Earth', quality: 'Fixed' },
        { name: 'Gemini', start: [5, 21], end: [6, 20], element: 'Air', quality: 'Mutable' },
        { name: 'Cancer', start: [6, 21], end: [7, 22], element: 'Water', quality: 'Cardinal' },
        { name: 'Leo', start: [7, 23], end: [8, 22], element: 'Fire', quality: 'Fixed' },
        { name: 'Virgo', start: [8, 23], end: [9, 22], element: 'Earth', quality: 'Mutable' },
        { name: 'Libra', start: [9, 23], end: [10, 22], element: 'Air', quality: 'Cardinal' },
        { name: 'Scorpio', start: [10, 23], end: [11, 21], element: 'Water', quality: 'Fixed' },
        { name: 'Sagittarius', start: [11, 22], end: [12, 21], element: 'Fire', quality: 'Mutable' }
    ];

    // Calculate Sun Sign from date of birth
    static calculateSunSign(dob) {
        const date = new Date(dob);
        const month = date.getMonth() + 1;
        const day = date.getDate();

        for (let sign of this.zodiacSigns) {
            if (this.isDateInRange(month, day, sign.start, sign.end)) {
                return {
                    name: sign.name,
                    element: sign.element,
                    quality: sign.quality
                };
            }
        }
        
        return { name: 'Unknown', element: 'Unknown', quality: 'Unknown' };
    }

    // Calculate Moon Sign (simplified - based on birth date cycle)
    static calculateMoonSign(dob) {
        const date = new Date(dob);
        const totalDays = Math.floor((date - new Date('1900-01-01')) / (1000 * 60 * 60 * 24));
        
        // Moon moves approximately every 2.5 days through each sign
        const moonCycle = 29.5; // Moon cycle in days
        const signIndex = Math.floor((totalDays % (moonCycle * 12)) / moonCycle);
        
        const moonSigns = [
            'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
            'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
        ];
        
        const signName = moonSigns[signIndex] || 'Aries';
        const signData = this.zodiacSigns.find(s => s.name === signName) || this.zodiacSigns[0];
        
        return {
            name: signName,
            element: signData.element,
            quality: signData.quality
        };
    }

    // Helper function to check if date is in range
    static isDateInRange(month, day, start, end) {
        const [startMonth, startDay] = start;
        const [endMonth, endDay] = end;
        
        if (startMonth === endMonth) {
            return month === startMonth && day >= startDay && day <= endDay;
        } else {
            return (month === startMonth && day >= startDay) || 
                   (month === endMonth && day <= endDay);
        }
    }

    // Get Sun Sign description
    static getSunSignDescription(signName) {
        const descriptions = {
            'Aries': "Bold and ambitious, you're a natural pioneer who loves to lead and take initiative. Your fiery energy drives you to tackle challenges head-on with courage and determination.",
            'Taurus': "Practical and determined, you value stability and comfort. Your earthy nature makes you reliable and persistent, with a deep appreciation for beauty and sensual pleasures.",
            'Gemini': "Curious and adaptable, you're a natural communicator who loves to learn and share ideas. Your quick wit and versatility help you connect with people from all walks of life.",
            'Cancer': "Nurturing and intuitive, you're deeply connected to emotions and family. Your protective nature and strong intuition guide you in caring for those you love.",
            'Leo': "Confident and creative, you shine brightly with natural charisma and leadership abilities. Your generous heart and dramatic flair inspire others to follow your vision.",
            'Virgo': "Analytical and helpful, you have a keen eye for detail and a desire to serve others. Your practical wisdom and methodical approach help bring order to chaos.",
            'Libra': "Diplomatic and artistic, you seek harmony and balance in all aspects of life. Your natural charm and fair-minded approach make you an excellent mediator and partner.",
            'Scorpio': "Intense and transformative, you possess deep emotional wisdom and magnetic presence. Your ability to see beneath the surface helps you understand life's mysteries.",
            'Sagittarius': "Adventurous and philosophical, you're always seeking truth and new experiences. Your optimistic outlook and love of freedom inspire others to expand their horizons.",
            'Capricorn': "Ambitious and disciplined, you have the determination to climb any mountain. Your practical approach and strong work ethic help you achieve lasting success.",
            'Aquarius': "Independent and innovative, you're a visionary who thinks outside the box. Your humanitarian nature and unique perspective help you create positive change.",
            'Pisces': "Compassionate and intuitive, you're deeply connected to the emotional and spiritual realms. Your empathetic nature and artistic soul help heal and inspire others."
        };
        
        return descriptions[signName] || "Your unique astrological signature brings special gifts to the world.";
    }

    // Get Moon Sign description
    static getMoonSignDescription(signName) {
        const descriptions = {
            'Aries': "Your emotions are direct and passionate. You need excitement and new challenges to feel emotionally fulfilled, and you process feelings quickly and intensely.",
            'Taurus': "Your emotions are steady and grounded. You find comfort in routine, beauty, and physical pleasures, and you need security to feel emotionally stable.",
            'Gemini': "Your emotions are changeable and mentally-oriented. You need variety and intellectual stimulation to feel fulfilled, and you express feelings through communication.",
            'Cancer': "Your emotions run deep and are strongly tied to home and family. You're highly intuitive and need emotional security and nurturing relationships to thrive.",
            'Leo': "Your emotions are warm and dramatic. You need appreciation and creative expression to feel emotionally satisfied, and you give and receive love generously.",
            'Virgo': "Your emotions are practical and service-oriented. You find emotional fulfillment through helping others and creating order, though you may be self-critical.",
            'Libra': "Your emotions seek harmony and partnership. You need beautiful surroundings and peaceful relationships to feel emotionally balanced and content.",
            'Scorpio': "Your emotions are intense and transformative. You experience feelings deeply and need authentic, meaningful connections to feel emotionally secure.",
            'Sagittarius': "Your emotions are optimistic and freedom-loving. You need adventure and philosophical exploration to feel emotionally satisfied and inspired.",
            'Capricorn': "Your emotions are controlled and goal-oriented. You find emotional security through achievement and structure, though you may suppress feelings.",
            'Aquarius': "Your emotions are detached and humanitarian. You need independence and intellectual connection to feel fulfilled, sometimes prioritizing ideals over personal feelings.",
            'Pisces': "Your emotions are fluid and compassionate. You're highly empathetic and intuitive, needing spiritual connection and creative expression for emotional well-being."
        };
        
        return descriptions[signName] || "Your emotional nature is unique and brings special insights to your relationships.";
    }

    // Calculate zodiac compatibility
    static calculateZodiacCompatibility(sign1, sign2) {
        const compatibilityMatrix = {
            'Fire': { 'Fire': 85, 'Earth': 65, 'Air': 90, 'Water': 60 },
            'Earth': { 'Fire': 65, 'Earth': 80, 'Air': 70, 'Water': 85 },
            'Air': { 'Fire': 90, 'Earth': 70, 'Air': 85, 'Water': 75 },
            'Water': { 'Fire': 60, 'Earth': 85, 'Air': 75, 'Water': 90 }
        };

        const element1 = this.getSignElement(sign1);
        const element2 = this.getSignElement(sign2);
        
        return compatibilityMatrix[element1]?.[element2] || 75;
    }

    // Get element for a sign
    static getSignElement(signName) {
        const sign = this.zodiacSigns.find(s => s.name === signName);
        return sign ? sign.element : 'Air';
    }

    // Get zodiac compatibility insights
    static getCompatibilityInsights(sunSign1, sunSign2, moonSign1, moonSign2) {
        const element1 = this.getSignElement(sunSign1);
        const element2 = this.getSignElement(sunSign2);
        const moonElement1 = this.getSignElement(moonSign1);
        const moonElement2 = this.getSignElement(moonSign2);

        let insights = [];

        // Sun sign compatibility
        if (element1 === element2) {
            insights.push(`Your ${element1} sun signs create natural understanding and shared values.`);
        } else if (this.areCompatibleElements(element1, element2)) {
            insights.push(`Your ${element1} and ${element2} sun signs complement each other beautifully.`);
        } else {
            insights.push(`Your ${element1} and ${element2} sun signs may face challenges but can learn much from each other.`);
        }

        // Moon sign compatibility
        if (moonElement1 === moonElement2) {
            insights.push(`Your matching ${moonElement1} moon signs indicate deep emotional compatibility.`);
        } else if (this.areCompatibleElements(moonElement1, moonElement2)) {
            insights.push(`Your ${moonElement1} and ${moonElement2} moon signs support each other's emotional needs.`);
        }

        // Special combinations
        if (sunSign1 === moonSign2 || sunSign2 === moonSign1) {
            insights.push("One person's sun sign matches the other's moon sign, creating a special soul connection.");
        }

        return insights.join(' ');
    }

    // Check if elements are compatible
    static areCompatibleElements(element1, element2) {
        const compatible = {
            'Fire': ['Air'],
            'Air': ['Fire'],
            'Earth': ['Water'],
            'Water': ['Earth']
        };
        
        return compatible[element1]?.includes(element2) || false;
    }

    // Generate complete astrological profile
    static generateProfile(name, dob) {
        const sunSign = this.calculateSunSign(dob);
        const moonSign = this.calculateMoonSign(dob);

        return {
            name: name,
            dob: dob,
            sunSign: sunSign.name,
            sunSignElement: sunSign.element,
            sunSignQuality: sunSign.quality,
            sunSignDescription: this.getSunSignDescription(sunSign.name),
            moonSign: moonSign.name,
            moonSignElement: moonSign.element,
            moonSignQuality: moonSign.quality,
            moonSignDescription: this.getMoonSignDescription(moonSign.name),
            personalityInsights: this.getPersonalityInsights(sunSign.name, moonSign.name)
        };
    }

    // Get personality insights based on sun and moon signs
    static getPersonalityInsights(sunSign, moonSign) {
        const combinations = {
            'Aries-Aries': "You're pure fire energy - bold, direct, and passionate in everything you do.",
            'Aries-Taurus': "You balance impulsiveness with practicality, creating a dynamic yet grounded personality.",
            'Aries-Gemini': "You're quick-thinking and adaptable, with the courage to pursue multiple interests simultaneously.",
            'Leo-Leo': "You radiate confidence and creativity, naturally drawing others to your magnetic personality.",
            'Cancer-Pisces': "You're deeply intuitive and empathetic, with natural healing and nurturing abilities.",
            'Scorpio-Cancer': "You combine emotional depth with protective instincts, creating intense and loyal relationships.",
            'Sagittarius-Aquarius': "You're a freedom-loving visionary who inspires others with your progressive ideas.",
            'Capricorn-Virgo': "You're incredibly practical and organized, with the ability to turn any vision into reality.",
            'Libra-Gemini': "You're charming and intellectually stimulating, excelling in social and artistic pursuits.",
            'Pisces-Scorpio': "You possess profound emotional and spiritual insights, with transformative healing abilities."
        };

        const key = `${sunSign}-${moonSign}`;
        return combinations[key] || 
               `Your ${sunSign} sun and ${moonSign} moon create a unique blend of ${this.getSignElement(sunSign)} and ${this.getSignElement(moonSign)} energies, giving you both ${sunSign.toLowerCase()} drive and ${moonSign.toLowerCase()} emotional wisdom.`;
    }

    // Get relationship advice based on zodiac signs
    static getRelationshipAdvice(person1Signs, person2Signs) {
        const advice = [];

        // Based on sun sign elements
        const element1 = this.getSignElement(person1Signs.sunSign);
        const element2 = this.getSignElement(person2Signs.sunSign);

        if (element1 === 'Fire' && element2 === 'Water') {
            advice.push("Fire and Water can create steam! Balance passion with emotional sensitivity.");
        } else if (element1 === 'Earth' && element2 === 'Air') {
            advice.push("Ground Air's ideas with Earth's practicality while letting Earth's dreams take flight.");
        } else if (element1 === element2) {
            advice.push(`Both being ${element1} signs, you understand each other but may need to introduce variety.`);
        }

        // General relationship advice
        advice.push("Communicate openly about your different approaches to life and find ways to complement each other's strengths.");
        advice.push("Respect each other's unique perspective and use your differences as opportunities for growth.");

        return advice.join(' ');
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ZodiacCalculator;
}