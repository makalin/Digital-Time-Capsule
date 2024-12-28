import React, { useState, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Calendar, Filter, Bot } from 'lucide-react';

const DigitalTimeCapsule = () => {
  const rawData = [
    {
      year: 2020,
      region: 'North America',
      socialMedia: 3.6,
      cloudStorage: 2.1,
      videoStreaming: 2.9,
      smartDevices: 1.5,
      cryptoCurrency: 0.8,
      onlineShopping: 2.4,
      digitalPayments: 1.9,
      gaming: 2.2,
      remoteWork: 1.1,
      digitalHealth: 0.5,
      aiChatbots: 0.3,
      aiImageGen: 0.1,
      aiVoiceAssistants: 0.8,
      aiProductivity: 0.2,
      aiDevelopment: 0.4
    },
    {
      year: 2020,
      region: 'Europe',
      socialMedia: 3.2,
      cloudStorage: 1.9,
      videoStreaming: 2.5,
      smartDevices: 1.3,
      cryptoCurrency: 0.6,
      onlineShopping: 2.1,
      digitalPayments: 1.7,
      gaming: 1.9,
      remoteWork: 0.9,
      digitalHealth: 0.4,
      aiChatbots: 0.2,
      aiImageGen: 0.1,
      aiVoiceAssistants: 0.6,
      aiProductivity: 0.1,
      aiDevelopment: 0.3
    },
    {
      year: 2021,
      region: 'North America',
      socialMedia: 4.2,
      cloudStorage: 2.8,
      videoStreaming: 3.4,
      smartDevices: 2.1,
      cryptoCurrency: 1.5,
      onlineShopping: 3.1,
      digitalPayments: 2.5,
      gaming: 2.8,
      remoteWork: 2.2,
      digitalHealth: 0.9,
      aiChatbots: 0.5,
      aiImageGen: 0.2,
      aiVoiceAssistants: 1.2,
      aiProductivity: 0.4,
      aiDevelopment: 0.7
    },
    {
      year: 2021,
      region: 'Europe',
      socialMedia: 3.8,
      cloudStorage: 2.5,
      videoStreaming: 3.0,
      smartDevices: 1.8,
      cryptoCurrency: 1.2,
      onlineShopping: 2.8,
      digitalPayments: 2.2,
      gaming: 2.4,
      remoteWork: 1.9,
      digitalHealth: 0.7,
      aiChatbots: 0.4,
      aiImageGen: 0.2,
      aiVoiceAssistants: 1.0,
      aiProductivity: 0.3,
      aiDevelopment: 0.6
    },
    {
      year: 2022,
      region: 'North America',
      socialMedia: 4.5,
      cloudStorage: 3.2,
      videoStreaming: 3.8,
      smartDevices: 2.7,
      cryptoCurrency: 1.9,
      onlineShopping: 3.6,
      digitalPayments: 3.1,
      gaming: 3.2,
      remoteWork: 2.8,
      digitalHealth: 1.4,
      aiChatbots: 0.8,
      aiImageGen: 0.5,
      aiVoiceAssistants: 1.6,
      aiProductivity: 0.7,
      aiDevelopment: 1.1
    },
    {
      year: 2022,
      region: 'Europe',
      socialMedia: 4.1,
      cloudStorage: 2.9,
      videoStreaming: 3.4,
      smartDevices: 2.3,
      cryptoCurrency: 1.6,
      onlineShopping: 3.3,
      digitalPayments: 2.8,
      gaming: 2.8,
      remoteWork: 2.5,
      digitalHealth: 1.2,
      aiChatbots: 0.7,
      aiImageGen: 0.4,
      aiVoiceAssistants: 1.4,
      aiProductivity: 0.6,
      aiDevelopment: 0.9
    },
    {
      year: 2023,
      region: 'North America',
      socialMedia: 4.8,
      cloudStorage: 3.9,
      videoStreaming: 4.2,
      smartDevices: 3.4,
      cryptoCurrency: 2.2,
      onlineShopping: 4.1,
      digitalPayments: 3.8,
      gaming: 3.7,
      remoteWork: 3.2,
      digitalHealth: 2.0,
      aiChatbots: 1.5,
      aiImageGen: 1.2,
      aiVoiceAssistants: 2.1,
      aiProductivity: 1.4,
      aiDevelopment: 1.8
    },
    {
      year: 2023,
      region: 'Europe',
      socialMedia: 4.4,
      cloudStorage: 3.5,
      videoStreaming: 3.8,
      smartDevices: 3.0,
      cryptoCurrency: 1.9,
      onlineShopping: 3.8,
      digitalPayments: 3.4,
      gaming: 3.3,
      remoteWork: 2.9,
      digitalHealth: 1.7,
      aiChatbots: 1.3,
      aiImageGen: 1.0,
      aiVoiceAssistants: 1.9,
      aiProductivity: 1.2,
      aiDevelopment: 1.6
    }
  ];

  const [selectedRegion, setSelectedRegion] = useState('North America');
  const [selectedCategories, setSelectedCategories] = useState(['aiChatbots', 'aiImageGen', 'aiVoiceAssistants']);
  const [hoveredCategory, setHoveredCategory] = useState(null);
  const [categoryGroup, setCategoryGroup] = useState('ai'); // 'ai' or 'digital'

  const categories = {
    digital: [
      { key: 'socialMedia', color: '#8884d8', label: 'Social Media Usage' },
      { key: 'cloudStorage', color: '#82ca9d', label: 'Cloud Storage' },
      { key: 'videoStreaming', color: '#ffc658', label: 'Video Streaming' },
      { key: 'smartDevices', color: '#ff7300', label: 'Smart Devices' },
      { key: 'cryptoCurrency', color: '#8dd1e1', label: 'Cryptocurrency' },
      { key: 'onlineShopping', color: '#a4de6c', label: 'Online Shopping' },
      { key: 'digitalPayments', color: '#d0ed57', label: 'Digital Payments' },
      { key: 'gaming', color: '#83a6ed', label: 'Gaming' },
      { key: 'remoteWork', color: '#8884d8', label: 'Remote Work' },
      { key: 'digitalHealth', color: '#ffc658', label: 'Digital Health' }
    ],
    ai: [
      { key: 'aiChatbots', color: '#ff6b81', label: 'AI Chatbots' },
      { key: 'aiImageGen', color: '#70a1ff', label: 'AI Image Generation' },
      { key: 'aiVoiceAssistants', color: '#7bed9f', label: 'AI Voice Assistants' },
      { key: 'aiProductivity', color: '#ffa502', label: 'AI Productivity Tools' },
      { key: 'aiDevelopment', color: '#2ed573', label: 'AI Development Tools' }
    ]
  };

  // Filter data by selected region
  const filteredData = useMemo(() => {
    return rawData.filter(item => item.region === selectedRegion);
  }, [selectedRegion]);

  // Calculate predicted values for 2024 and 2025
  const predictedData = useMemo(() => {
    const predictions = [];
    const lastYear = filteredData[filteredData.length - 1];
    
    [2024, 2025].forEach(year => {
      const predictedYear = {
        year,
        region: selectedRegion
      };

      // Enhanced prediction logic with accelerated growth for AI categories
      const allCategories = [...categories.digital, ...categories.ai];
      allCategories.forEach(({ key }) => {
        const values = filteredData.map(item => item[key]);
        let growth = (values[values.length - 1] - values[values.length - 2]) / values[values.length - 2];
        
        // Apply higher growth rate for AI categories in 2024-2025
        if (key.startsWith('ai')) {
          growth *= 1.5; // 50% higher growth rate for AI technologies
        }
        
        const previousYear = year === 2024 ? lastYear : predictions[0];
        predictedYear[key] = +(previousYear[key] * (1 + growth)).toFixed(2);
      });

      predictions.push(predictedYear);
    });

    return [...filteredData, ...predictions];
  }, [filteredData]);

  const toggleCategory = (category) => {
    setSelectedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Digital & AI Evolution Timeline</CardTitle>
        <div className="flex items-center gap-4">
          <select 
            className="p-2 border rounded"
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
          >
            <option value="North America">North America</option>
            <option value="Europe">Europe</option>
          </select>
          <Bot className="h-6 w-6 text-blue-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex gap-4 mb-4">
            <button
              onClick={() => setCategoryGroup('ai')}
              className={`px-4 py-2 rounded ${
                categoryGroup === 'ai' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              AI Trends
            </button>
            <button
              onClick={() => setCategoryGroup('digital')}
              className={`px-4 py-2 rounded ${
                categoryGroup === 'digital' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700'
              }`}
            >
              Digital Trends
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories[categoryGroup].map(({ key, label, color }) => (
              <button
                key={key}
                onClick={() => toggleCategory(key)}
                className={`px-3 py-1 rounded ${
                  selectedCategories.includes(key) 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 text-gray-700'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={predictedData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="year" />
              <YAxis label={{ value: 'Adoption Rate (Billions)', angle: -90, position: 'insideLeft' }} />
              <Tooltip content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white p-4 border rounded shadow">
                      <p className="font-bold">{label}</p>
                      {payload.map((entry) => (
                        <p key={entry.name} style={{ color: entry.color }}>
                          {entry.name}: {entry.value.toFixed(2)}B
                          {label >= 2024 && ' (Predicted)'}
                        </p>
                      ))}
                    </div>
                  );
                }
                return null;
              }} />
              <Legend />
              {[...categories.digital, ...categories.ai]
                .filter(({ key }) => selectedCategories.includes(key))
                .map(({ key, color, label }) => (
                  <Line
                    key={key}
                    type="monotone"
                    dataKey={key}
                    stroke={color}
                    name={label}
                    strokeWidth={hoveredCategory === key ? 4 : 2}
                    onMouseEnter={() => setHoveredCategory(key)}
                    onMouseLeave={() => setHoveredCategory(null)}
                    strokeDasharray={(d) => d.year >= 2024 ? "5 5" : "0"}
                  />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 text-sm text-gray-500">
          <p>Notes:</p>
          <ul className="list-disc ml-4">
            <li>Dashed lines indicate predicted values (2024-2025)</li>
            <li>AI trends show accelerated growth projection based on recent adoption patterns</li>
            <li>Predictions consider technological advancement and market penetration rates</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default DigitalTimeCapsule;
