import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  Download, 
  Smartphone, 
  Database, 
  Cpu, 
  Zap,
  BookOpen,
  GitBranch,
  Terminal,
  Package,
  Lightbulb,
  CheckCircle
} from "lucide-react";

const TechnicalGuide = () => {
  const implementationSteps = [
    {
      phase: "Phase 1: Core Setup",
      duration: "Week 1-2",
      items: [
        "Set up React/Vite development environment",
        "Implement responsive mobile-first UI design",
        "Add Web Speech API for voice recognition",
        "Integrate navigator.mediaDevices for camera access",
        "Implement Geolocation API for GPS functionality",
        "Create basic routing and navigation"
      ]
    },
    {
      phase: "Phase 2: AI Integration", 
      duration: "Week 3-4",
      items: [
        "Integrate TensorFlow.js for client-side image recognition",
        "Connect to Wikipedia API for information retrieval",
        "Implement text summarization using Hugging Face models",
        "Add Google Maps API for location services",
        "Create trip optimization algorithms",
        "Add text-to-speech functionality"
      ]
    },
    {
      phase: "Phase 3: Advanced Features",
      duration: "Week 5-6", 
      items: [
        "Implement offline functionality with service workers",
        "Add Progressive Web App (PWA) capabilities",
        "Integrate real-time data synchronization",
        "Add user preferences and personalization",
        "Implement advanced route optimization",
        "Add comprehensive error handling and fallbacks"
      ]
    }
  ];

  const technicalRequirements = [
    {
      category: "Frontend Technologies",
      icon: <Code className="w-5 h-5" />,
      items: [
        "React 18+ with TypeScript",
        "Vite for fast development and building",
        "Tailwind CSS for responsive styling",
        "Web Speech API for voice recognition",
        "MediaDevices API for camera access",
        "Geolocation API for GPS integration"
      ]
    },
    {
      category: "AI/ML Libraries",
      icon: <Cpu className="w-5 h-5" />,
      items: [
        "TensorFlow.js for image recognition",
        "@tensorflow-models/mobilenet for landmark detection",
        "Hugging Face Transformers.js for text processing",
        "Web Speech API for speech-to-text",
        "Speech Synthesis API for text-to-speech",
        "OpenCV.js for advanced image processing (optional)"
      ]
    },
    {
      category: "APIs & Services", 
      icon: <Database className="w-5 h-5" />,
      items: [
        "Wikipedia API for landmark information",
        "Google Maps API for location services",
        "OpenWeatherMap API for weather data",
        "REST Countries API for cultural information",
        "Unsplash API for high-quality images",
        "Firebase for real-time data sync (optional)"
      ]
    },
    {
      category: "Mobile Features",
      icon: <Smartphone className="w-5 h-5" />,
      items: [
        "Responsive design for all screen sizes",
        "Touch-friendly interface elements",
        "Progressive Web App (PWA) support",
        "Offline functionality with service workers",
        "Push notifications for travel alerts",
        "Device orientation and motion sensors"
      ]
    }
  ];

  const codeExamples = {
    speechRecognition: `// Voice Recognition Implementation
const startSpeechRecognition = () => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';
  
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    processQuery(transcript);
  };
  
  recognition.start();
};`,
    
    imageRecognition: `// Image Recognition with TensorFlow.js
import * as mobilenet from '@tensorflow-models/mobilenet';

const recognizeLandmark = async (imageElement) => {
  const model = await mobilenet.load();
  const predictions = await model.classify(imageElement);
  
  return {
    landmark: predictions[0].className,
    confidence: predictions[0].probability
  };
};`,
    
    locationServices: `// GPS and Location Services
const getCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => reject(error),
      { 
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000 
      }
    );
  });
};`
  };

  return (
    <div className="py-16 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <Badge variant="outline" className="mb-4 px-4 py-2">
          <BookOpen className="w-4 h-4 mr-2" />
          Technical Implementation Guide
        </Badge>
        <h2 className="text-4xl font-bold mb-4">Complete Development Roadmap</h2>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Step-by-step guide to implement your Multimodal AI Tourist Guide project with detailed technical specifications and code examples.
        </p>
      </div>

      <Tabs defaultValue="roadmap" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
          <TabsTrigger value="technical">Tech Stack</TabsTrigger>
          <TabsTrigger value="code">Code Examples</TabsTrigger>
          <TabsTrigger value="deployment">Deployment</TabsTrigger>
        </TabsList>

        <TabsContent value="roadmap" className="space-y-6 mt-8">
          <div className="space-y-6">
            {implementationSteps.map((phase, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="bg-gradient-card">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <GitBranch className="w-5 h-5 text-primary" />
                      {phase.phase}
                    </CardTitle>
                    <Badge variant="secondary">{phase.duration}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    {phase.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="technical" className="space-y-6 mt-8">
          <div className="grid md:grid-cols-2 gap-6">
            {technicalRequirements.map((req, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {req.icon}
                    {req.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {req.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-2">
                        <Package className="w-3 h-3 text-primary mt-1 flex-shrink-0" />
                        <span className="text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="code" className="space-y-6 mt-8">
          <div className="space-y-6">
            {Object.entries(codeExamples).map(([title, code], index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Terminal className="w-5 h-5 text-primary" />
                    {title.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="bg-black text-green-400 p-4 rounded-lg overflow-x-auto text-sm">
                    <code>{code}</code>
                  </pre>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-6 mt-8">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="w-5 h-5 text-primary" />
                  Development Setup
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">1. Clone and Install</h4>
                  <pre className="bg-muted p-2 rounded text-sm">
                    <code>{`npm create vite@latest ai-tourist-guide --template react-ts
cd ai-tourist-guide
npm install`}</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">2. Install Dependencies</h4>
                  <pre className="bg-muted p-2 rounded text-sm">
                    <code>{`npm install @tensorflow/tfjs @tensorflow-models/mobilenet
npm install @huggingface/transformers
npm install lucide-react tailwindcss`}</code>
                  </pre>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">3. Development Server</h4>
                  <pre className="bg-muted p-2 rounded text-sm">
                    <code>npm run dev</code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5 text-secondary" />
                  Production Deployment
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">1. Build for Production</h4>
                  <pre className="bg-muted p-2 rounded text-sm">
                    <code>npm run build</code>
                  </pre>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-2">2. Deploy Options</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      Vercel (recommended for React apps)
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      Netlify (great for static sites)
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      GitHub Pages (free hosting)
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">3. PWA Configuration</h4>
                  <pre className="bg-muted p-2 rounded text-sm">
                    <code>npm install @vite-pwa/vite-plugin</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-accent" />
                Best Practices & Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="font-semibold mb-3">Performance</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Use lazy loading for AI models</li>
                    <li>• Implement image compression</li>
                    <li>• Cache API responses locally</li>
                    <li>• Optimize bundle size with code splitting</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">User Experience</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Add loading states for AI processing</li>
                    <li>• Implement offline functionality</li>
                    <li>• Provide clear error messages</li>
                    <li>• Test on various mobile devices</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold mb-3">Security</h4>
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    <li>• Secure API keys in environment variables</li>
                    <li>• Implement proper CORS policies</li>
                    <li>• Validate user inputs thoroughly</li>
                    <li>• Use HTTPS for all communications</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TechnicalGuide;