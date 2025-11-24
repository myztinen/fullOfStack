interface Result {
  periodLength: number;
  trainingDays: number;
  target: number;
  average: number;
  success:boolean;
  rating: number;
  ratingDescription: string
}

const parseArguments = (args: string[]): { target: number; exerArray: number[] } => {
  if (args.length < 4) throw new Error('wrong amount of arguments');

  if (args.slice(2).every(arg => !isNaN(Number(arg)) && Number(arg) >= 0)) {
    return { target: Number(args[2]), exerArray: args.slice(3).map(arg => Number(arg))};
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateExercises = (target:number, results:number[]): Result => {
  const amountOfDays = results.length;
  const trainingDays = results.filter(day => day > 0).length;
  const average = Number(results.reduce(((a:number,b:number) => a+b), 0))/ amountOfDays;
  const isSuccess = average>=target;
  let theRating:number; 
  if (average > target-(0.1*target) && (average < target+(0.1*target))) {
    theRating = 2;
  } else if (average > target+(0.1*target)) {
    theRating = 3;
  } else theRating = 1;
  let theRatingRant:string; 
  if (theRating == 2) {
    theRatingRant = 'not too bad but could be better';
  } else if (theRating == 3) {
    theRatingRant = 'Great joB!';
  } else theRatingRant = 'You suck!';
  
  return { 
    periodLength: amountOfDays,
    trainingDays: trainingDays,
    success: isSuccess,
    rating: theRating,
    ratingDescription: theRatingRant,
    target: target,
    average: average
    };
};



if (require.main === module) {
  try {
    const {target, exerArray} = parseArguments(process.argv);
    console.log(calculateExercises(target, exerArray));
  //console.log(calculateExercises(2, [3, 0, 2, 4.5, 0, 3, 1]));

  } catch (error: unknown) {
      let errorMessage = 'Something bad happened.';
      if (error instanceof Error) {
          errorMessage += ' Error: ' + error.message;
      }
      console.log(errorMessage);
  }

};

export default calculateExercises;


