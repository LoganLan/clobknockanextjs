"use client"; // This enables client-side rendering

import { FC, useState } from 'react';

const Help: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  // Sample FAQ data with separate colors for questions and answers
  const faqData = [
    {
      question: 'How do I reset my password?',
      answer: 'You can reset your password by clicking on the "Forgot Password" link on the login page.',
      questionColor: 'text-Yellow_Colors-Golden-brown', // Red color for the question
      answerColor: 'text-Cyan_Colors-Dark_Cyan',  // Green color for the answer
    },
    {
      question: 'Where can I update my account details?',
      answer: 'You can update your account details from the "Account Settings" page after logging in.',
      questionColor: 'text-Cyan_Colors-Dark_Cyan', // Blue color for the question
      answerColor: 'text-yellow-600', // Yellow color for the answer
    },
    {
      question: 'How do I contact support?',
      answer: 'You can contact support by emailing us at support@example.com.',
      questionColor: 'text-purple-600', // Purple color for the question
      answerColor: 'text-orange-600', // Orange color for the answer
    },
    {
        question: 'Can I use your service on my mobile device?',
        answer: 'Yes you can! Simply go to our website on your phone and it will work perfectly! ',
        questionColor: 'text-purple-600', // Purple color for the question
        answerColor: 'text-orange-600', // Orange color for the answer
      },
      {
        question: 'What should I do if the website is down?',
        answer: 'If the website is down, please  email us at support@example.com.',
        questionColor: 'text-purple-600', // Purple color for the question
        answerColor: 'text-orange-600', // Orange color for the answer
      },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 p-4 text-white text-center">
        <h1 className="text-3xl font-bold">Help Page</h1>
      </header>

      {/* Main content */}
      <main className="container mx-auto py-8 px-4">
        {/* FAQ Section */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-White_Colors-outer-space">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index}>
                <button
                  className={`text-lg font-semibold w-full text-left px-4 py-2 rounded ${faq.questionColor}`}
                  onClick={() => toggleFAQ(index)}
                >
                  {faq.question}
                </button>
                {activeIndex === index && (
                  <div className={`bg-White_Colors-platinum p-4 border border-gray-300 rounded mt-2 ${faq.answerColor}`}>
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Troubleshooting Section */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-White_Colors-outer-space">Troubleshooting</h2>
          <ul className="list-disc list-inside space-y-2">
            <p className="text-White_Colors-outer-space">If the site does not load, try refreshing the page.</p>
            <li className="text-White_Colors-outer-space">Clear your browser`s cache if you experience issues.</li>
            <li className="text-White_Colors-outer-space">Check your internet connection.</li>
          </ul>
        </section>

        {/* Contact Information */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-White_Colors-outer-space">Contact Us</h2>
          <p className="text-White_Colors-outer-space">
            If you need further assistance, feel free to reach out to us at:
            <br />
            <span className="font-semibold text-Blue_Colors-Cornflower_Blue">support@example.com</span>
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 p-4 text-white text-center mt-8">
        <p>&copy; 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Help;

