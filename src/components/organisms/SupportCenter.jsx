import { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Card from '@/components/atoms/Card';
import Button from '@/components/atoms/Button';
import FormField from '@/components/molecules/FormField';
import ApperIcon from '@/components/ApperIcon';

const SupportCenter = () => {
  const [activeTab, setActiveTab] = useState('help');
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const helpArticles = [
    {
      id: 1,
      title: 'Getting Started with MetricFlow',
      description: 'Learn how to set up your dashboard and start tracking metrics',
      category: 'Getting Started',
      readTime: '5 min'
    },
    {
      id: 2,
      title: 'Managing Team Members',
      description: 'How to invite, manage, and assign roles to team members',
      category: 'Team Management',
      readTime: '3 min'
    },
    {
      id: 3,
      title: 'Understanding Your Analytics',
      description: 'Deep dive into the metrics and charts available in your dashboard',
      category: 'Analytics',
      readTime: '8 min'
    },
    {
      id: 4,
      title: 'Notification Settings',
      description: 'Configure how and when you receive notifications',
      category: 'Settings',
      readTime: '2 min'
    }
  ];

  const faqs = [
    {
      id: 1,
      question: 'How do I add team members?',
      answer: 'Go to the Team section and click "Invite Member". Enter their email address and select their role.'
    },
    {
      id: 2,
      question: 'Can I export my data?',
      answer: 'Yes, you can export your data in CSV or PDF format from the Analytics section.'
    },
    {
      id: 3,
      question: 'How do I change my notification preferences?',
      answer: 'Visit the Settings page and scroll to the Notification Preferences section.'
    },
    {
      id: 4,
      question: 'What metrics can I track?',
      answer: 'You can track revenue, user growth, conversion rates, and custom metrics specific to your business.'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    toast.success('Your message has been sent! We\'ll get back to you soon.');
    setContactForm({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  const HelpArticles = () => (
    <div className="space-y-4">
      {helpArticles.map((article) => (
        <motion.div
          key={article.id}
          whileHover={{ scale: 1.01 }}
          className="cursor-pointer"
        >
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">{article.title}</h4>
                <p className="text-gray-600 text-sm mb-3">{article.description}</p>
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-primary bg-primary/10 px-2 py-1 rounded">
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-500">{article.readTime} read</span>
                </div>
              </div>
              <ApperIcon name="ChevronRight" className="h-5 w-5 text-gray-400" />
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );

  const FAQs = () => (
    <div className="space-y-4">
      {faqs.map((faq) => (
        <Card key={faq.id} className="p-6">
          <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
          <p className="text-gray-600">{faq.answer}</p>
        </Card>
      ))}
    </div>
  );

  const ContactForm = () => (
    <Card className="p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Contact Support</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Your Name"
            name="name"
            value={contactForm.name}
            onChange={handleInputChange}
            required
          />
          
          <FormField
            label="Email Address"
            name="email"
            type="email"
            value={contactForm.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <FormField
          label="Subject"
          name="subject"
          value={contactForm.subject}
          onChange={handleInputChange}
          required
        />

        <FormField
          label="Message"
          name="message"
          required
        >
          <textarea
            name="message"
            value={contactForm.message}
            onChange={handleInputChange}
            rows={6}
            className="flex w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="Describe your issue or question..."
            required
          />
        </FormField>

        <Button type="submit" className="w-full">
          Send Message
        </Button>
      </form>
    </Card>
  );

  const tabs = [
    { id: 'help', label: 'Help Articles', icon: 'Book' },
    { id: 'faq', label: 'FAQ', icon: 'HelpCircle' },
    { id: 'contact', label: 'Contact Us', icon: 'MessageSquare' }
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Support Center</h2>
        <p className="text-gray-600">Find answers to common questions or get in touch with our support team.</p>
      </Card>

      <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-white text-primary shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <ApperIcon name={tab.icon} className="h-4 w-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <motion.div
        key={activeTab}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'help' && <HelpArticles />}
        {activeTab === 'faq' && <FAQs />}
        {activeTab === 'contact' && <ContactForm />}
      </motion.div>
    </div>
  );
};

export default SupportCenter;