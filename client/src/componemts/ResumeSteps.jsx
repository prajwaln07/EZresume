import resumeStepsData from './resumeStepsData';
import  SingleResumeStep from '../componemts/SingleResumeStep';
  

  export default function ResumeSteps() {
    return (
      <div>
        {resumeStepsData.map((step, index) => (
          <SingleResumeStep
            key={index}
            direction={step.direction}
            numberCnt={step.numberCnt}
            title={step.title}
            desc={step.desc}
            imageLink={step.imageLink}
          />
        ))}
      </div>
    );
  }
  