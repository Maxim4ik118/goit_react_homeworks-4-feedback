import { useState } from 'react';

import {
  FeedbackOptions,
  Notification,
  Section,
  Statistics,
} from './components';

const INITIAL_FEEDBACK_STATE = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const App = () => {
  const [feedbackData, setFeedbackData] = useState(INITIAL_FEEDBACK_STATE);

  const handleLeaveFeedback = event => {
    const {
      target: { name, value },
    } = event;

    setFeedbackData(prevState => ({
      ...prevState,
      [name]: Number.parseInt(value) + 1,
    }));
  };

  const countTotalFeedback = () => {
    return feedbackData.good + feedbackData.neutral + feedbackData.bad;
  };

  const countPositiveFeedbackPercentage = () => {
    return Math.round((feedbackData.good * 100) / countTotalFeedback());
  };

  const showStatistics = countTotalFeedback() > 0;

  return (
    <div className="app">
      <Section title="Please leave feedback">
        <FeedbackOptions
          options={{
            good,
            bad,
            neutral,
          }}
          onLeaveFeedback={handleLeaveFeedback}
        />
      </Section>
      <Section title="Statistics">
        {showStatistics ? (
          <Statistics
            good={good}
            bad={bad}
            neutral={neutral}
            total={countTotalFeedback()}
            positivePercentage={countPositiveFeedbackPercentage}
          />
        ) : (
          <Notification message="There is no feedback given" />
        )}
      </Section>
    </div>
  );
};

export default App;
