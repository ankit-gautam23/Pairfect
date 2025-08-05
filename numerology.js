// Pairfect - Numerology Calculations
class NumerologyCalculator {
    
    // Pythagorean numerology chart
    static letterValues = {
        'A': 1, 'B': 2, 'C': 3, 'D': 4, 'E': 5, 'F': 6, 'G': 7, 'H': 8, 'I': 9,
        'J': 1, 'K': 2, 'L': 3, 'M': 4, 'N': 5, 'O': 6, 'P': 7, 'Q': 8, 'R': 9,
        'S': 1, 'T': 2, 'U': 3, 'V': 4, 'W': 5, 'X': 6, 'Y': 7, 'Z': 8
    };

    // Calculate Life Path Number from date of birth
    static calculateLifePathNumber(dob) {
        const date = new Date(dob);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        
        // Sum all digits
        let total = this.sumDigits(day) + this.sumDigits(month) + this.sumDigits(year);
        
        // Reduce to single digit (except master numbers 11, 22, 33)
        while (total > 9 && total !== 11 && total !== 22 && total !== 33) {
            total = this.sumDigits(total);
        }
        
        return total;
    }

    // Calculate Name Number using Pythagorean system
    static calculateNameNumber(name) {
        const cleanName = name.toUpperCase().replace(/[^A-Z]/g, '');
        let total = 0;
        
        for (let char of cleanName) {
            total += this.letterValues[char] || 0;
        }
        
        // Reduce to single digit (except master numbers)
        while (total > 9 && total !== 11 && total !== 22 && total !== 33) {
            total = this.sumDigits(total);
        }
        
        return total;
    }

    // Calculate Destiny Number (same as Name Number but with full name)
    static calculateDestinyNumber(name) {
        const destinyNumber = this.calculateNameNumber(name);
        
        const descriptions = {
            1: "Your destiny is to be a pioneer and leader. You're meant to inspire others with your courage and determination.",
            2: "Your destiny is to be a peacemaker and diplomat. You're meant to bring harmony and balance to relationships.",
            3: "Your destiny is to be a creative communicator. You're meant to inspire others through art, writing, or speaking.",
            4: "Your destiny is to be a builder and organizer. You're meant to create solid foundations and lasting structures.",
            5: "Your destiny is to be an adventurer and freedom seeker. You're meant to explore new horizons and embrace change.",
            6: "Your destiny is to be a nurturer and caregiver. You're meant to care for others and create beautiful environments.",
            7: "Your destiny is to be a spiritual seeker and analyst. You're meant to uncover hidden truths and share wisdom.",
            8: "Your destiny is to be an achiever and authority figure. You're meant to accomplish great things and lead others.",
            9: "Your destiny is to be a humanitarian and teacher. You're meant to serve humanity and share universal wisdom.",
            11: "Your destiny is to be an intuitive visionary. You're meant to inspire others with your spiritual insights.",
            22: "Your destiny is to be a master builder. You're meant to turn grand visions into practical reality.",
            33: "Your destiny is to be a master teacher and healer. You're meant to embody unconditional love and compassion."
        };
        
        return {
            number: destinyNumber,
            description: descriptions[destinyNumber] || "Your destiny carries unique significance in your spiritual journey."
        };
    }

    // Calculate Birth Number (day of birth)
    static calculateBirthNumber(dob) {
        const date = new Date(dob);
        const day = date.getDate();
        let birthNumber = this.sumDigits(day);
        
        // Reduce to single digit (except master numbers)
        while (birthNumber > 9 && birthNumber !== 11 && birthNumber !== 22 && birthNumber !== 33) {
            birthNumber = this.sumDigits(birthNumber);
        }
        
        const descriptions = {
            1: "You were born to lead and take initiative. Your birth energy gives you natural authority and independence.",
            2: "You were born to cooperate and support others. Your birth energy makes you naturally diplomatic and sensitive.",
            3: "You were born to express yourself creatively. Your birth energy gives you natural artistic and communication talents.",
            4: "You were born to build and organize. Your birth energy makes you naturally practical and reliable.",
            5: "You were born to explore and experience freedom. Your birth energy gives you natural curiosity and adaptability.",
            6: "You were born to nurture and care for others. Your birth energy makes you naturally loving and responsible.",
            7: "You were born to seek truth and wisdom. Your birth energy gives you natural analytical and spiritual gifts.",
            8: "You were born to achieve and succeed. Your birth energy makes you naturally ambitious and authoritative.",
            9: "You were born to serve and teach. Your birth energy gives you natural compassion and universal understanding.",
            11: "You were born with heightened intuition. Your birth energy gives you natural spiritual awareness and insight.",
            22: "You were born with master builder energy. Your birth energy gives you the power to manifest grand visions.",
            33: "You were born with master teacher energy. Your birth energy gives you natural healing and teaching abilities."
        };
        
        return {
            number: birthNumber,
            description: descriptions[birthNumber] || "Your birth number carries special significance in your life path."
        };
    }

    // Generate time-based insights
    static generateTimeInsights(timeOfBirth, gender) {
        const [hours, minutes] = timeOfBirth.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes;
        
        // Calculate time-based numerology
        const timeNumber = this.sumDigits(totalMinutes);
        let finalTimeNumber = timeNumber;
        while (finalTimeNumber > 9 && finalTimeNumber !== 11 && finalTimeNumber !== 22 && finalTimeNumber !== 33) {
            finalTimeNumber = this.sumDigits(finalTimeNumber);
        }
        
        const timeInsights = {
            1: "Your birth time indicates strong leadership energy. You're most powerful during the early hours of the day.",
            2: "Your birth time shows diplomatic energy. You're most effective during peaceful, quiet moments.",
            3: "Your birth time reveals creative energy. You're most inspired during social and expressive times.",
            4: "Your birth time indicates practical energy. You're most productive during structured, organized periods.",
            5: "Your birth time shows adventurous energy. You're most alive during dynamic, changing moments.",
            6: "Your birth time reveals nurturing energy. You're most loving during family and relationship times.",
            7: "Your birth time indicates spiritual energy. You're most connected during quiet, meditative moments.",
            8: "Your birth time shows achievement energy. You're most successful during focused, goal-oriented periods.",
            9: "Your birth time reveals humanitarian energy. You're most fulfilled during service and teaching moments.",
            11: "Your birth time indicates intuitive energy. You're most perceptive during spiritual and mystical times.",
            22: "Your birth time shows master builder energy. You're most powerful during manifestation and creation periods.",
            33: "Your birth time reveals master teacher energy. You're most effective during healing and guidance moments."
        };
        
        const genderSpecific = gender === 'male' ? 
            "As a male, your birth time enhances your natural masculine energy and leadership qualities." :
            gender === 'female' ? 
            "As a female, your birth time amplifies your natural feminine energy and intuitive gifts." :
            "Your birth time enhances your unique energy signature and spiritual gifts.";
        
        return `${timeInsights[finalTimeNumber] || "Your birth time carries unique spiritual significance."} ${genderSpecific} The time ${timeOfBirth} aligns with your soul's purpose and enhances your natural abilities.`;
    }

    // Helper function to sum digits of a number
    static sumDigits(num) {
        return num.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
    }

    // Generate complete numerology profile
    static generateProfile(name, dob) {
        const lifePathNumber = this.calculateLifePathNumber(dob);
        const nameNumber = this.calculateNameNumber(name);
        
        return {
            name: name,
            dob: dob,
            lifePathNumber: lifePathNumber,
            nameNumber: nameNumber,
            lifePathDescription: this.getLifePathDescription(lifePathNumber),
            nameDescription: this.getNameDescription(nameNumber),
            personalityTraits: this.getPersonalityTraits(lifePathNumber, nameNumber),
            spiritualGuidance: this.getSpiritualGuidance(lifePathNumber, nameNumber)
        };
    }

    // Get Life Path Number description
    static getLifePathDescription(number) {
        const descriptions = {
            1: "You are a natural leader with strong independence and pioneering spirit. Your path involves learning to lead with confidence while maintaining humility.",
            2: "You are a natural peacemaker with exceptional diplomatic skills. Your life path involves learning to balance cooperation with maintaining your own identity.",
            3: "You are a creative communicator with natural artistic talents. Your path involves expressing your authentic self while learning discipline.",
            4: "You are a practical builder with strong organizational skills. Your path involves learning to balance hard work with flexibility.",
            5: "You are a freedom-loving adventurer with a curious mind. Your path involves learning to balance freedom with responsibility.",
            6: "You are a natural caregiver with strong nurturing instincts. Your path involves learning to care for others while honoring your own needs.",
            7: "You are a spiritual seeker with analytical and intuitive gifts. Your path involves balancing intellectual pursuits with emotional connection.",
            8: "You are a natural achiever with strong business acumen. Your path involves learning to use power responsibly and ethically.",
            9: "You are a humanitarian with a broad perspective on life. Your path involves learning to let go and trust in the bigger picture.",
            11: "You are an intuitive visionary with heightened spiritual awareness. Your master number path involves learning to channel your sensitivity constructively.",
            22: "You are a master builder with the ability to turn dreams into reality. Your path involves learning to ground your visions in practical action.",
            33: "You are a master teacher with exceptional compassion and healing abilities. Your path involves learning to embody unconditional love."
        };
        
        return descriptions[number] || "Your unique number carries special significance in your spiritual journey.";
    }

    // Get Name Number description
    static getNameDescription(number) {
        const descriptions = {
            1: "Your name vibrates with leadership energy. You're meant to be a pioneer and innovator in your chosen field.",
            2: "Your name carries the energy of cooperation and sensitivity. You're meant to be a bridge-builder and diplomat.",
            3: "Your name resonates with creative expression. You're meant to inspire others through art, communication, or entertainment.",
            4: "Your name vibrates with stability and hard work. You're meant to build lasting foundations and create order.",
            5: "Your name carries the energy of freedom and adventure. You're meant to explore new horizons and embrace change.",
            6: "Your name resonates with nurturing and responsibility. You're meant to care for others and create harmony.",
            7: "Your name vibrates with spiritual seeking and analysis. You're meant to uncover hidden truths and share wisdom.",
            8: "Your name carries the energy of material success and authority. You're meant to achieve significant accomplishments.",
            9: "Your name resonates with universal love and service. You're meant to contribute to the greater good of humanity.",
            11: "Your master name vibrates with intuitive insight. You're meant to be a spiritual messenger and inspire others.",
            22: "Your master name carries the energy of the master builder. You're meant to create something of lasting value.",
            33: "Your master name resonates with the master teacher. You're meant to heal and uplift others through service."
        };
        
        return descriptions[number] || "Your name carries a unique vibration that influences your life path.";
    }

    // Get personality traits based on numbers
    static getPersonalityTraits(lifePathNumber, nameNumber) {
        const traits = [];
        
        // Life path traits
        const lifePathTraits = {
            1: ["Independent", "Ambitious", "Original"],
            2: ["Cooperative", "Sensitive", "Diplomatic"],
            3: ["Creative", "Optimistic", "Expressive"],
            4: ["Practical", "Reliable", "Organized"],
            5: ["Adventurous", "Curious", "Versatile"],
            6: ["Nurturing", "Responsible", "Compassionate"],
            7: ["Analytical", "Spiritual", "Introspective"],
            8: ["Ambitious", "Authoritative", "Goal-oriented"],
            9: ["Humanitarian", "Generous", "Idealistic"],
            11: ["Intuitive", "Inspirational", "Visionary"],
            22: ["Practical", "Ambitious", "Influential"],
            33: ["Compassionate", "Healing", "Teaching"]
        };
        
        traits.push(...(lifePathTraits[lifePathNumber] || []));
        
        // Add name number traits if different from life path
        if (nameNumber !== lifePathNumber) {
            const nameTraits = lifePathTraits[nameNumber] || [];
            traits.push(...nameTraits);
        }
        
        return traits.join(', ');
    }

    // Get spiritual guidance based on life path number
    static getSpiritualGuidance(lifePathNumber, nameNumber) {
        const guidance = {
            1: "Focus on developing authentic leadership while remaining humble. Your spiritual growth comes through learning to lead by example.",
            2: "Embrace your role as a peacemaker and trust your intuition. Your spiritual path involves creating harmony in relationships.",
            3: "Express your creativity fearlessly and use your gifts to uplift others. Find joy in authentic self-expression.",
            4: "Build strong foundations while remaining flexible. Your spiritual growth comes through patient, consistent effort.",
            5: "Embrace change as a pathway to growth while learning commitment. Your evolution happens through diverse experiences.",
            6: "Learn to serve others while maintaining healthy boundaries. Balance giving with receiving on your spiritual path.",
            7: "Trust your inner wisdom and continue seeking deeper truths. Connect the mystical with the practical.",
            8: "Use your success to benefit others and remain ethically grounded. Your growth comes through responsible use of power.",
            9: "Release attachments and trust in the universal plan. Learn to give without expecting returns.",
            11: "Trust your intuitive gifts and use them to inspire others. Be a beacon of higher consciousness.",
            22: "Ground your visions in practical action to create positive change. Manifest dreams into reality.",
            33: "Embody unconditional love and use your healing gifts to serve humanity. Be a living example of compassion."
        };
        
        return guidance[lifePathNumber] || "Your spiritual journey is unique and meaningful. Trust your inner guidance.";
    }

    // Calculate numerology compatibility between two people
    static calculateNumerologyCompatibility(person1, person2) {
        const lifePath1 = person1.lifePathNumber;
        const lifePath2 = person2.lifePathNumber;
        
        const compatibilityMatrix = {
            1: {1: 75, 2: 85, 3: 90, 4: 70, 5: 80, 6: 85, 7: 60, 8: 85, 9: 75},
            2: {1: 85, 2: 80, 3: 85, 4: 90, 5: 70, 6: 95, 7: 85, 8: 75, 9: 85},
            3: {1: 90, 2: 85, 3: 85, 4: 70, 5: 95, 6: 80, 7: 75, 8: 80, 9: 90},
            4: {1: 70, 2: 90, 3: 70, 4: 85, 5: 65, 6: 85, 7: 80, 8: 90, 9: 70},
            5: {1: 80, 2: 70, 3: 95, 4: 65, 5: 80, 6: 75, 7: 85, 8: 75, 9: 85},
            6: {1: 85, 2: 95, 3: 80, 4: 85, 5: 75, 6: 90, 7: 80, 8: 80, 9: 95},
            7: {1: 60, 2: 85, 3: 75, 4: 80, 5: 85, 6: 80, 7: 85, 8: 70, 9: 80},
            8: {1: 85, 2: 75, 3: 80, 4: 90, 5: 75, 6: 80, 7: 70, 8: 80, 9: 75},
            9: {1: 75, 2: 85, 3: 90, 4: 70, 5: 85, 6: 95, 7: 80, 8: 75, 9: 85}
        };
        
        return compatibilityMatrix[lifePath1]?.[lifePath2] || 75;
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = NumerologyCalculator;
}