
export const foodDatabase = {
  foods: [
    {
      name: 'Salmon',
      calories: 208,
      protein: 20,
      carbs: 0,
      fat: 13,
      nutrients: 'Omega-3, Vitamin D, Vitamin B12',
      geneticMatches: ['MTHFR', 'APOE']
    },
    {
      name: 'Chicken Breast',
      calories: 165,
      protein: 31,
      carbs: 0,
      fat: 3.6,
      nutrients: 'Vitamin B6, Niacin',
      geneticMatches: ['MTHFR', 'FTO']
    },
    {
      name: 'Quinoa',
      calories: 222,
      protein: 8.1,
      carbs: 39.4,
      fat: 3.6,
      nutrients: 'Magnesium, Phosphorus, Manganese',
      geneticMatches: ['FTO', 'TCF7L2']
    },
    {
      name: 'Blueberries',
      calories: 84,
      protein: 1.1,
      carbs: 21.4,
      fat: 0.5,
      nutrients: 'Vitamin C, Vitamin K, Manganese',
      geneticMatches: ['GSTP1', 'SOD2']
    },
    {
      name: 'Greek Yogurt',
      calories: 100,
      protein: 10,
      carbs: 7.5,
      fat: 2.5,
      nutrients: 'Calcium, Vitamin B12, Potassium',
      geneticMatches: ['APOA2', 'TCF7L2']
    }
  ] as const
};

export interface Food {
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  nutrients: string;
  geneticMatches: string[];
}

export const geneticVariants = {
  MTHFR: 'Folate metabolism - affects how you process B vitamins',
  APOE: 'Fat metabolism - influences response to dietary fats',
  FTO: 'Hunger regulation - associated with appetite control',
  TCF7L2: 'Blood sugar regulation - affects insulin response',
  CYP1A2: 'Caffeine metabolism - determines caffeine processing',
  COMT: 'Neurotransmitter metabolism - affects stress response',
  VDR: 'Vitamin D receptor - impacts vitamin D absorption',
  GSTP1: 'Detoxification - influences toxin processing',
  SOD2: 'Antioxidant capacity - affects cellular protection',
  NOS3: 'Nitric oxide production - impacts blood vessel health'
} as const;
