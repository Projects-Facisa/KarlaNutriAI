
export function generateNutritionalDataPhrase(data) {
    const {
        birthDate,
        height,
        weight,
        allergy,
        profession,
        bodyFatPercentage,
        metabolicRate,
        goal
    } = data;

    const age = new Date().getFullYear() - new Date(birthDate).getFullYear();
    const allergyString = allergy.length > 0 ? allergy.join(', ') : 'Sem alergias alimentares';
    const phrase = `Idade: ${age} anos. Altura: ${height} cm. Peso: ${weight} kg. ${profession}. Composição corporal: ${bodyFatPercentage}. Taxa metabólica: ${metabolicRate}. Objetivo: ${goal}. Alergias alimentares: ${allergyString}.`;

    return phrase;
}

export function generateMealPhrase(meal) {
    const { 
        date,
        type, 
        description
    } = meal;
    
    const formattedDate = date.toLocaleDateString('pt-BR');
    const phrase = `${formattedDate} - ${type}: ${description}.`;

    return phrase;
}