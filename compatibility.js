// Pairfect - Compatibility Analysis
class CompatibilityAnalyzer {
    
    // Generate complete compatibility report
    static generateCompatibilityReport(person1Data, person2Data) {
        // Calculate individual profiles
        const person1Numerology = NumerologyCalculator.generateProfile(person1Data.name, person1Data.dob);
        const person2Numerology = NumerologyCalculator.generateProfile(person2Data.name, person2Data.dob);
        
        const person1Astrology = ZodiacCalculator.generateProfile(person1Data.name, person1Data.dob);
        const person2Astrology = ZodiacCalculator.generateProfile(person2Data.name, person2Data.dob);
        
        // Calculate compatibility scores
        const numerologyCompatibility = NumerologyCalculator.calculateNumerologyCompatibility(
            person1Numerology, person2Numerology
        );
        
        const sunSignCompatibility = ZodiacCalculator.calculateZodiacCompatibility(
            person1Astrology.sunSign, person2Astrology.sunSign
        );
        
        const moonSignCompatibility = ZodiacCalculator.calculateZodiacCompatibility(
            person1Astrology.moonSign, person2Astrology.moonSign
        );
        
        // Overall compatibility score (weighted average)
        const overallScore = Math.round(
            (numerologyCompatibility * 0.4 + sunSignCompatibility * 0.35 + moonSignCompatibility * 0.25)
        );
        
        // Generate insights and advice
        const insights = this.generateCompatibilityInsights(
            person1Numerology, person2Numerology, person1Astrology, person2Astrology, overallScore
        );
        
        const strengths = this.identifyRelationshipStrengths(
            person1Numerology, person2Numerology, person1Astrology, person2Astrology
        );
        
        const challenges = this.identifyRelationshipChallenges(
            person1Numerology, person2Numerology, person1Astrology, person2Astrology
        );
        
        const advice = this.generateRelationshipAdvice(
            person1Numerology, person2Numerology, person1Astrology, person2Astrology, overallScore
        );
        
        return {
            compatibilityScore: overallScore,
            person1: {
                name: person1Data.name,
                lifePathNumber: person1Numerology.lifePathNumber,
                sunSign: person1Astrology.sunSign,
                moonSign: person1Astrology.moonSign,
                summary: this.generatePersonSummary(person1Numerology, person1Astrology)
            },
            person2: {
                name: person2Data.name,
                lifePathNumber: person2Numerology.lifePathNumber,
                sunSign: person2Astrology.sunSign,
                moonSign: person2Astrology.moonSign,
                summary: this.generatePersonSummary(person2Numerology, person2Astrology)
            },
            strengths: strengths,
            challenges: challenges,
            compatibilityInsights: insights,
            relationshipAdvice: advice,
            numerologyScore: numerologyCompatibility,
            sunSignScore: sunSignCompatibility,
            moonSignScore: moonSignCompatibility
        };
    }

    // Generate person summary for compatibility report
    static generatePersonSummary(numerology, astrology) {
        const lifePathTraits = this.getLifePathTraits(numerology.lifePathNumber);
        const sunSignTraits = this.getSunSignTraits(astrology.sunSign);
        
        return `A ${astrology.sunSign} with Life Path ${numerology.lifePathNumber}, bringing ${lifePathTraits} energy and ${sunSignTraits} qualities to relationships.`;
    }

    // Get simplified life path traits for summaries
    static getLifePathTraits(number) {
        const traits = {
            1: "independent and pioneering",
            2: "cooperative and diplomatic",
            3: "creative and expressive",
            4: "practical and reliable",
            5: "adventurous and versatile",
            6: "nurturing and responsible",
            7: "analytical and spiritual",
            8: "ambitious and authoritative",
            9: "humanitarian and compassionate",
            11: "intuitive and inspirational",
            22: "visionary and practical",
            33: "healing and teaching"
        };
        return traits[number] || "unique and meaningful";
    }

    // Get simplified sun sign traits for summaries
    static getSunSignTraits(sign) {
        const traits = {
            'Aries': "bold and energetic",
            'Taurus': "stable and sensual",
            'Gemini': "curious and communicative",
            'Cancer': "nurturing and intuitive",
            'Leo': "confident and creative",
            'Virgo': "practical and helpful",
            'Libra': "harmonious and diplomatic",
            'Scorpio': "intense and transformative",
            'Sagittarius': "adventurous and philosophical",
            'Capricorn': "ambitious and disciplined",
            'Aquarius': "innovative and independent",
            'Pisces': "compassionate and intuitive"
        };
        return traits[sign] || "unique and special";
    }

    // Generate compatibility insights
    static generateCompatibilityInsights(person1Num, person2Num, person1Astro, person2Astro, overallScore) {
        const insights = [];
        
        // Score-based insights
        if (overallScore >= 85) {
            insights.push("You have exceptional spiritual and cosmic alignment, suggesting a deep soul connection.");
        } else if (overallScore >= 75) {
            insights.push("Your compatibility is strong with great potential for a harmonious relationship.");
        } else if (overallScore >= 65) {
            insights.push("You have good compatibility with some areas requiring understanding and compromise.");
        } else {
            insights.push("Your relationship may face challenges but can grow stronger through mutual understanding.");
        }

        // Numerology insights
        const lifePath1 = person1Num.lifePathNumber;
        const lifePath2 = person2Num.lifePathNumber;
        
        if (lifePath1 === lifePath2) {
            insights.push("Sharing the same Life Path number indicates you're on similar spiritual journeys.");
        } else if (Math.abs(lifePath1 - lifePath2) === 1) {
            insights.push("Your consecutive Life Path numbers suggest complementary energies that support each other's growth.");
        }

        // Astrology insights
        const zodiacInsights = ZodiacCalculator.getCompatibilityInsights(
            person1Astro.sunSign, person2Astro.sunSign, 
            person1Astro.moonSign, person2Astro.moonSign
        );
        insights.push(zodiacInsights);

        // Master number insights
        if ([11, 22, 33].includes(lifePath1) || [11, 22, 33].includes(lifePath2)) {
            insights.push("The presence of master numbers suggests this relationship has spiritual significance and karmic connections.");
        }

        return insights.join(' ');
    }

    // Identify relationship strengths
    static identifyRelationshipStrengths(person1Num, person2Num, person1Astro, person2Astro) {
        const strengths = [];
        
        // Numerology strengths
        const lifePath1 = person1Num.lifePathNumber;
        const lifePath2 = person2Num.lifePathNumber;
        
        // Complementary numbers
        const complementaryPairs = {
            1: [2, 8], 2: [1, 6], 3: [5, 9], 4: [8, 22], 5: [3, 7], 
            6: [2, 9], 7: [5, 11], 8: [1, 4], 9: [3, 6], 
            11: [7, 22], 22: [4, 11], 33: [6, 9]
        };
        
        if (complementaryPairs[lifePath1]?.includes(lifePath2)) {
            strengths.push("Your Life Path numbers create a perfect balance of energies");
        }

        // Astrology strengths
        const element1 = ZodiacCalculator.getSignElement(person1Astro.sunSign);
        const element2 = ZodiacCalculator.getSignElement(person2Astro.sunSign);
        
        if (element1 === element2) {
            strengths.push(`Both being ${element1} signs, you share similar approaches to life and values`);
        } else if (ZodiacCalculator.areCompatibleElements(element1, element2)) {
            strengths.push(`Your ${element1} and ${element2} elements create dynamic and supportive energy`);
        }

        // Moon sign emotional compatibility
        if (person1Astro.moonSign === person2Astro.moonSign) {
            strengths.push("Matching moon signs indicate deep emotional understanding and compatibility");
        }

        // Default strengths if none found
        if (strengths.length === 0) {
            strengths.push("Your unique combination brings diverse perspectives that can enrich both your lives");
        }

        return strengths.join(', ');
    }

    // Identify relationship challenges
    static identifyRelationshipChallenges(person1Num, person2Num, person1Astro, person2Astro) {
        const challenges = [];
        
        // Numerology challenges
        const lifePath1 = person1Num.lifePathNumber;
        const lifePath2 = person2Num.lifePathNumber;
        
        // Challenging combinations
        const challengingPairs = {
            1: [4, 7], 4: [1, 5], 5: [4, 6], 7: [1, 8], 8: [7, 9]
        };
        
        if (challengingPairs[lifePath1]?.includes(lifePath2)) {
            challenges.push("Your Life Path numbers may create different approaches to achieving goals");
        }

        // Astrology challenges
        const element1 = ZodiacCalculator.getSignElement(person1Astro.sunSign);
        const element2 = ZodiacCalculator.getSignElement(person2Astro.sunSign);
        
        const opposingElements = {
            'Fire': 'Water', 'Water': 'Fire', 'Earth': 'Air', 'Air': 'Earth'
        };
        
        if (opposingElements[element1] === element2) {
            challenges.push(`${element1} and ${element2} elements may create tension but also passionate dynamics`);
        }

        // Communication style differences
        if (this.hasCommunicationChallenges(person1Astro.sunSign, person2Astro.sunSign)) {
            challenges.push("Different communication styles may require patience and understanding");
        }

        // Default if no specific challenges identified
        if (challenges.length === 0) {
            challenges.push("Minor differences in perspective that can be resolved through open communication");
        }

        return challenges.join(', ');
    }

    // Check for communication challenges between signs
    static hasCommunicationChallenges(sign1, sign2) {
        const directSigns = ['Aries', 'Leo', 'Sagittarius', 'Capricorn'];
        const indirectSigns = ['Cancer', 'Scorpio', 'Pisces', 'Libra'];
        
        return (directSigns.includes(sign1) && indirectSigns.includes(sign2)) ||
               (indirectSigns.includes(sign1) && directSigns.includes(sign2));
    }

    // Generate relationship advice
    static generateRelationshipAdvice(person1Num, person2Num, person1Astro, person2Astro, score) {
        const advice = [];
        
        // Score-based advice
        if (score >= 85) {
            advice.push("Your high compatibility suggests a natural flow in your relationship. Focus on maintaining this harmony through continued appreciation and support for each other.");
        } else if (score >= 75) {
            advice.push("Your strong compatibility provides a solid foundation. Work on deepening your connection through shared experiences and open communication.");
        } else if (score >= 65) {
            advice.push("Your moderate compatibility shows potential for growth. Focus on understanding and appreciating your differences while building on your strengths.");
        } else {
            advice.push("Your relationship may require extra effort but can become very rewarding. Practice patience, compromise, and celebrate what makes each of you unique.");
        }

        // Specific numerology advice
        const lifePath1 = person1Num.lifePathNumber;
        const lifePath2 = person2Num.lifePathNumber;
        
        if (lifePath1 === 1 || lifePath2 === 1) {
            advice.push("The Life Path 1 energy needs freedom to lead, while their partner can provide support and collaboration.");
        }
        
        if (lifePath1 === 2 || lifePath2 === 2) {
            advice.push("The Life Path 2 energy needs harmony and cooperation, so avoid aggressive confrontation and focus on gentle communication.");
        }
        
        if ([11, 22, 33].includes(lifePath1) || [11, 22, 33].includes(lifePath2)) {
            advice.push("Master number energy requires understanding and support for spiritual growth and heightened sensitivity.");
        }

        // Astrological advice
        const astroAdvice = ZodiacCalculator.getRelationshipAdvice(
            { sunSign: person1Astro.sunSign, moonSign: person1Astro.moonSign },
            { sunSign: person2Astro.sunSign, moonSign: person2Astro.moonSign }
        );
        advice.push(astroAdvice);

        // General relationship wisdom
        advice.push("Remember that true compatibility grows through understanding, respect, and the willingness to support each other's spiritual and personal evolution.");

        return advice.join(' ');
    }

    // Calculate love compatibility percentage
    static calculateLoveCompatibility(person1Data, person2Data) {
        const report = this.generateCompatibilityReport(person1Data, person2Data);
        return {
            score: report.compatibilityScore,
            category: this.getCompatibilityCategory(report.compatibilityScore),
            summary: this.getCompatibilitySummary(report.compatibilityScore)
        };
    }

    // Get compatibility category
    static getCompatibilityCategory(score) {
        if (score >= 90) return "Soulmate Connection";
        if (score >= 80) return "Excellent Match";
        if (score >= 70) return "Great Potential";
        if (score >= 60) return "Good Compatibility";
        if (score >= 50) return "Moderate Match";
        return "Challenging but Possible";
    }

    // Get compatibility summary
    static getCompatibilitySummary(score) {
        if (score >= 90) return "You share an extraordinary spiritual connection with natural harmony and deep understanding.";
        if (score >= 80) return "Your relationship has excellent potential with strong compatibility across multiple dimensions.";
        if (score >= 70) return "You have great compatibility with good potential for a fulfilling relationship.";
        if (score >= 60) return "Your compatibility is solid with room for growth through understanding and compromise.";
        if (score >= 50) return "You have moderate compatibility that can improve with effort and mutual respect.";
        return "While challenging, your differences can lead to growth and learning if approached with patience and love.";
    }

    // Generate quick compatibility check (for preview)
    static quickCompatibilityCheck(name1, dob1, name2, dob2) {
        const lifePath1 = NumerologyCalculator.calculateLifePathNumber(dob1);
        const lifePath2 = NumerologyCalculator.calculateLifePathNumber(dob2);
        const sunSign1 = ZodiacCalculator.calculateSunSign(dob1).name;
        const sunSign2 = ZodiacCalculator.calculateSunSign(dob2).name;
        
        const numScore = NumerologyCalculator.calculateNumerologyCompatibility(
            { lifePathNumber: lifePath1, nameNumber: NumerologyCalculator.calculateNameNumber(name1) },
            { lifePathNumber: lifePath2, nameNumber: NumerologyCalculator.calculateNameNumber(name2) }
        );
        
        const astroScore = ZodiacCalculator.calculateZodiacCompatibility(sunSign1, sunSign2);
        const quickScore = Math.round((numScore + astroScore) / 2);
        
        return {
            score: quickScore,
            category: this.getCompatibilityCategory(quickScore),
            lifePaths: `${lifePath1} & ${lifePath2}`,
            sunSigns: `${sunSign1} & ${sunSign2}`
        };
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CompatibilityAnalyzer;
}