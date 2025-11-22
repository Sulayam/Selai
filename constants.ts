import { Lead } from './types';

export const MOCK_LEADS: Lead[] = [
  { id: 'l1', name: 'John Davis', company: 'Metro Warehousing', phone: '+1 (555) 123-4567', industry: 'Logistics', painPoints: ['Theft at night', 'Large perimeter'], interestLevel: 0 },
  { id: 'l2', name: 'Sarah Miller', company: 'Miller Retail', phone: '+1 (555) 987-6543', industry: 'Retail', painPoints: ['Employee theft', 'Liability'], interestLevel: 0 },
  { id: 'l3', name: 'Mike Chen', company: 'Tech Park Solutions', phone: '+1 (555) 456-7890', industry: 'Commercial Real Estate', painPoints: ['Access control', 'Visitor tracking'], interestLevel: 0 },
  { id: 'l4', name: 'Emily Wilson', company: 'Wilson Auto Body', phone: '+1 (555) 234-5678', industry: 'Automotive', painPoints: ['Vandalism', 'Insurance premiums'], interestLevel: 0 },
  { id: 'l5', name: 'Robert Taylor', company: 'SecureStorage Inc.', phone: '+1 (555) 876-5432', industry: 'Storage', painPoints: ['Gate access', '24/7 monitoring'], interestLevel: 0 },
];

export const AI_SCRIPTS = [
  "Hello, this is Alex from SecureView. I noticed your facility works with high-value inventory.",
  "We specialize in AI-powered CCTV that detects threats before they happen.",
  "Would you be open to a quick demo of our night-vision capabilities?",
  "I can connect you with our security specialist right now to discuss pricing."
];

export const LEAD_RESPONSES_INTERESTED = [
  "Actually, yes. We had a break-in last month.",
  "How does the night vision compare to standard infrared?",
  "I am looking for something with cloud storage.",
  "Sure, I have a few minutes. What's the cost?"
];

export const LEAD_RESPONSES_REJECTED = [
  "Not interested, thanks.",
  "We already have a system.",
  "Please take me off your list.",
  "I'm busy right now."
];
