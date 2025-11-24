
const calculateBmi = (height: number, weight: number,) : string => {  
    const result = weight / (height*0.01)**2;
    if(result < 16.0) return 'Underweight (Severe thinness)';
        else if (16.0 < result && result < 17.0) return 'Underweight (Moderate thinness)';
        else if (17.0 < result && result < 18.5) return 'Underweight (Mild thinness)';
        else if (18.5 < result && result < 25.0) return 'Normal range';
        else if (25.0 < result && result < 30.0) return 'Overweight (Pre-obese)';
        else if (30.0 < result && result < 35.0) return 'Obese (Class I)';
        else if (35.0 < result && result < 40.0) return 'Obese (Class II) ';
        else if (40.0 < result) return 'Obese (Class III) ';
        else throw new Error('Promblem with calculating BMI');  
};


if (require.main === module) {
    const arseBarguments = (args: string[]): { height: number; weight: number } => {
        if (args.length != 4) throw new Error('wrong amount of arguments');

        
        if (!isNaN(Number(args[2])) || !isNaN(Number(args[3])) || Number(args[2])<= 0 || Number(args[3])<= 0) {
            return { height: Number(args[2]), weight: Number(args[3])};
        } else {
            throw new Error('Provided values were not numbers!');
        }
    };
    const {height, weight } = arseBarguments(process.argv);
    console.log(calculateBmi(height, weight));

  };

export default calculateBmi;


