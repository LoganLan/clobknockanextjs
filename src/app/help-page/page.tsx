"use client"; // This enables client-side rendering

import Link from "next/link"
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
      questionColor: 'text-Blue_Colors-Palatinate_Blue', // Red color for the question
      answerColor: 'text-White_Colors-Jet',  // Green color for the answer
    },
    {
      question: 'Where can I update my account details?',
      answer: 'You can update your account details from the "Account Settings" page after logging in.',
      questionColor: 'text-Blue_Colors-Palatinate_Blue', // Blue color for the question
      answerColor: 'text-White_Colors-Jet', // Yellow color for the answer
    },
    {
      question: 'How do I contact support?',
      answer: 'You can contact support by emailing us at support@example.com.',
      questionColor: 'text-Blue_Colors-Palatinate_Blue', // Purple color for the question
      answerColor: 'text-White_Colors-Jet', // Orange color for the answer
    },
    {
        question: 'Can I use your service on my mobile device?',
        answer: 'Yes you can! Simply go to our website on your phone and it will work perfectly! ',
        questionColor: 'text-Blue_Colors-Palatinate_Blue', // Purple color for the question
        answerColor: 'text-White_Colors-Jet', // Orange color for the answer
      },
      {
        question: 'What should I do if the website is down?',
        answer: 'If the website is down, please  email us at support@example.com.',
        questionColor: 'text-Blue_Colors-Palatinate_Blue', // Purple color for the question
        answerColor: 'text-White_Colors-Jet', // Orange color for the answer
      },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <header className="bg-blue-600 p-4 text-white text-center">
        <h1 className="text-3xl font-bold">Help Page</h1>

        <div className="flex space-x-4 ml-4">
                <div>
                    <Link href="/landing-page" className="text-lg text-Blue_Colors-Palatinate_Blue bg-White_Colors-platinum hover:bg-White_Colors-Jet hover:text-Red_Colors-Red px-2 py-1 rounded-md">
                    Home
                    </Link>
                </div>

                <div>
                <Link href="/deck-builder" className="text-lg text-White_Colors-Jet bg-White_Colors-anti-flash-white hover:text-Red_Colors-Red hover:bg-Green_Colors-Pakistan_Green px-2 py-1 rounded-md">
                     Explore
                </Link>
                </div>
        </div>



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
          <h2 className="text-2xl font-bold mb-4 text-White_Colors-Battleship-grey">Troubleshooting</h2>
          <ul className="list-disc list-inside space-y-2">
            <p className="text-Blue_Colors-Palatinate_Blue">If the site does not load, try refreshing the page.</p>
            <li className="text-White_Colors-Jet">Clear your browser`s cache if you experience issues.</li>
            <li className="text-White_Colors-Jet">Check your internet connection.</li>
          </ul>
        </section>

        {/* Contact Information */}
        <section className="mt-8">
          <h2 className="text-2xl font-bold mb-4 text-White_Colors-Battleship-grey">Contact Us</h2>
          <p className="text-White_Colors-Jet">
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

