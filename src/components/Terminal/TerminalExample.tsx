import React, { useState, useEffect } from 'react';
import Terminal, { TerminalLine } from './Terminal';

const TerminalExample: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [completed, setCompleted] = useState(false);

  // Example terminal lines
  const exampleLines: TerminalLine[] = [
    {
      id: 1,
      cmd: true,
      prompt: 'juan@portfolio:~$ ',
      text: 'ls -la',
      current: false,
    },
    {
      id: 2,
      cmd: false,
      text: 'total 42',
      color: '#00ff00',
    },
    {
      id: 3,
      cmd: false,
      text: 'drwxr-xr-x  5 juan juan 4096 Nov 15 10:30 projects',
      color: '#00ff00',
    },
    {
      id: 4,
      cmd: false,
      text: '-rw-r--r--  1 juan juan 1234 Nov 15 10:30 portfolio.js',
      color: '#00ff00',
    },
    {
      id: 5,
      cmd: true,
      prompt: 'juan@portfolio:~$ ',
      text: 'npm run dev',
      current: false,
    },
    {
      id: 6,
      cmd: false,
      text: '> portfolio@1.0.0 dev',
      color: '#00ff00',
    },
    {
      id: 7,
      cmd: false,
      text: '> next dev',
      color: '#00ff00',
    },
    {
      id: 8,
      cmd: false,
      text: '✓ Ready on http://localhost:3000',
      color: '#00ff00',
    },
  ];

  // Simulate typing animation
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < exampleLines.length) {
        setLines(prev => [...prev, exampleLines[currentIndex]]);
        currentIndex++;
      } else {
        setCompleted(true);
        clearInterval(interval);
      }
    }, 800);

    return () => clearInterval(interval);
  }, []);

  const handleReplay = () => {
    setLines([]);
    setCompleted(false);
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Terminal Example</h2>
      
      {/* Interactive Terminal */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Interactive Terminal</h3>
        <Terminal
          lines={lines}
          completed={completed}
          onReplay={handleReplay}
          height={300}
        />
      </div>

      {/* Code Terminal */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Code Terminal</h3>
        <Terminal code height={200}>
          {`const portfolio = {
  name: "Juan Ceresa",
  role: "Developer",
  skills: ["React", "TypeScript", "Next.js"]
};

console.log(portfolio);`}
        </Terminal>
      </div>

      {/* White Theme Terminal */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">White Theme Terminal</h3>
        <Terminal
          white
          lines={[
            {
              id: 1,
              cmd: true,
              prompt: '$ ',
              text: 'echo "Hello World"',
            },
            {
              id: 2,
              cmd: false,
              text: 'Hello World',
              color: '#333',
            },
          ]}
        />
      </div>
    </div>
  );
};

export default TerminalExample;